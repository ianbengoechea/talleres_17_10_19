import {isFunction} from 'lodash';
import Logger from './Logger';
/*import Util, { ERROR, WARNING } from '../../common/Util';*/

const logger = new Logger('api-connector');
const Methods = {
  HEAD: 'HEAD',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Variable privada
let _defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
// variable privada con logout function
let _actionLogOut;

const Errors = {
  NO_CONNECTION: '000',
  NO_CONNECTION_MSG: 'Network request failed',

  TIMEOUT: '001',
  TIMEOUT_MSG: 'Request Timeout',

  SERVER_ERROR: '503',
  SERVER_ERROR_MSG: 'Internal Server Error',

  REQUEST_ENTITY_TOO_LARGE: 413,
  REQUEST_ENTITY_TOO_LARGE_MSG: 'Request entity too large',

  UNAUTHORIZED_ERROR: 403,
  UNAUTHORIZED_ERROR_MSG: 'Acceso no autorizado',

  ID_DUPLICATED: 400,
  ID_DUPLICATED_MSG: 'Nombre Duplicado',
  DUPLICATED_LAT_LONG: 414,
  DUPLICATED_LAT_LONG_MSG: 'Ya existe una localización registrada',
};

export default class APIConnector {
  constructor(options = {}) {
    // vars
    const {apikey = '', timeout = 0} = options;
    if (timeout) {
      this._timeout = timeout;
    }

    if (apikey) {
      logger.info(`APIConnector instance created for:  ${apikey}`);
    }
  }

  /*
   * Setter/getter for default headers
   */

  static set defaultHeaders(value) {
    _defaultHeaders = value;
  }
  static get defaultHeaders() {
    return _defaultHeaders;
  }

  static setActionLogOut(actionLogOut) {
    _actionLogOut = actionLogOut;
  }

  /*
   * getters
   */

  static get Methods() {
    return Methods;
  }

  static get Errors() {
    return Errors;
  }

  static get s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  static get generateUUID() {
    return (
      APIConnector.s4 +
      APIConnector.s4 +
      '-' +
      APIConnector.s4 +
      '-' +
      APIConnector.s4 +
      '-' +
      APIConnector.s4 +
      '-' +
      APIConnector.s4 +
      APIConnector.s4 +
      APIConnector.s4
    );
  }

  /*
   * All supported methods below
   */

  head(uri, args = {}) {
    return this._request(uri, {...args, method: Methods.HEAD});
  }

  get(uri, args = {}) {
    return this._request(uri, {...args, method: Methods.GET});
  }

  post(uri, args = {}) {
    return this._request(uri, {...args, method: Methods.POST});
  }

  put(uri, args = {}) {
    return this._request(uri, {...args, method: Methods.PUT});
  }

  patch(uri, args = {}) {
    return this._request(uri, {...args, method: Methods.PATCH});
  }

  delete(uri, args = {}) {
    return this._request(uri, {...args, method: Methods.DELETE});
  }

  /*
   * Log funtions below
   */

  createRequestLog(uri, options) {
    let logs = [];
    // method log
    logs.push(`Request ${options.method}: "${uri}"`);
    // header log
    let headers = Object.assign({}, options.headers);
    if (headers.Authorization) {
      console.log(headers.Authorization);
      headers.Authorization = 'Bearer [removed]';
    }
    logs.push('Headers: ' + JSON.stringify(headers));
    // body log
    if (options.body) {
      let logBody = 'Body: ' + JSON.stringify(options.body).substr(0, 80);
      if (options.body.length > 80) {
        logBody += '...';
      }
      logs.push(logBody);
    }
    // implode all array's element into a string and log it
    logger.info(logs.join(', '));
  }

  createResponseLog(method, uri, time) {
    logger.info(
      `Response ${method}: ${uri} completed, took: ${+new Date() - time}ms`,
    );
  }

  readResponse(response, downloadFlag) {
    return new Promise(function(resolve, reject) {
      if (downloadFlag) {
        resolve(response.blob());
      } else {
        response.text().then(text => {
          try {
            let json = JSON.parse(text);
            resolve(json);
          } catch (e) {
            let json = {
              header: {status: response.status, message: text},
              body: '',
            };
            resolve(json);
          }
        });
      }
    });
  }

  /**
   * Internal method that make (and handle) the request
   *
   * @param string uri
   * @param object args
   * @return Promise
   */
  _request(uri, args = {}) {
    let time = new Date();
    let {
      method,
      headers = {},
      body,
      // emptyResponse,
      uploadFormData,
      multiPartFlag,
      downloadFlag,
    } = args;

    // uri validation
    if (!uri || uri instanceof String) {
      return logger.error(`No valid uri given for method ${method}`) && this;
    }

    // populate options with default data + user data
    let options = {};
    options.method = method;
    if (multiPartFlag) {
      let defaultHeaders = {..._defaultHeaders};
      delete defaultHeaders['Content-Type'];
      delete defaultHeaders.Accept;
      options.headers = {...defaultHeaders, ...headers};
    } else {
      options.headers = {..._defaultHeaders, ...headers};
    }
    if (body) {
      options.body = body;
    }

    // create a log for the request
    this.createRequestLog(uri, options);

    // Si es de tipo UPLOAD no lo llama a traves de FETCH
    if (uploadFormData) {
      return this._requestUpload(uri, options, uploadFormData);
    }

    return new Promise((resolve, reject) => {
      let request = fetch(uri, options);
      let timeoutReached = false;
      let requestDone = false;

      // timeout feature...
      if (this._timeout) {
        setTimeout(() => {
          if (requestDone) {
            return;
          }
          timeoutReached = true;
          let err = new TypeError(Errors.TIMEOUT_MSG);
          err.code = Errors.TIMEOUT;
          logger.info(
            `request ${method}: ${uri} timeout after ${+new Date() - time}ms`,
          );
          reject(err);
        }, this._timeout);
      }

      // manage the request
      request.then(response => {
        requestDone = true;
        if (timeoutReached) {
          return;
        }
        this.createResponseLog(method, uri, time);

        this.readResponse(response, downloadFlag).then(json => {
          // generic error handler
          if (response.status >= 400) {
            // is session expired?
            if (response.status === 401 || response.status === 403) {
              // Automatic logout is handled in src/Actions/AppAction.js
              if (isFunction(_actionLogOut)) {
                _actionLogOut();
              }
              reject(json);
            } else {
              //if (json.isWarning) Util.showNoty(WARNING, json.message);
              //else Util.showNoty(ERROR, json.message);
              reject(json);
            }
          } else {
            resolve(json);
          }
        });
      });

      // manage request errors
      request.catch(err => {
        requestDone = true;
        if (timeoutReached) {
          return;
        }
        logger.error(
          `request ${method}: ${uri} raised error: ${err}, took ${+new Date() -
            time}ms`,
        );
        if (err.message === Errors.NO_CONNECTION_MSG) {
          err.code = Errors.NO_CONNECTION;
        }
        reject(err);
      });
    });
  }

  _requestUpload(uri, options, uploadFormData) {
    // let { method, headers = {} } = options;
    let formData = uploadFormData;
    let time = +new Date();

    //      uploadFormData
    // Como mando el upload

    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(options.method, uri);

      /*Object.keys(options.headers).forEach(function(key,index) {
                      xhr.setRequestHeader(key, options.headers[key]);
                  });*/

      if (options.headers['X-Session']) {
        xhr.setRequestHeader('X-Session', options.headers['X-Session']);
      }
      xhr.setRequestHeader('X-ApiKey', options.headers['X-ApiKey']);
      xhr.setRequestHeader('X-RequestId', options.headers['X-RequestId']);
      xhr.setRequestHeader('X-TrackingId', options.headers['X-TrackingId']);

      xhr.onload = () => {
        // Controlar todas las situaciones de error.
        logger.info(
          `request ${options.method}: ${uri} completed, took: ${+new Date() -
            time}ms`,
        );
        if (xhr.status !== 200) {
          reject({code: xhr.status, message: xhr.responseText});
        }
        if (!xhr.responseText) {
          reject({code: 500, message: xhr.responseText});
        }
        var index = xhr.responseText.indexOf('arcor.com');
        if (index !== -1) {
          reject({code: 500, message: xhr.responseText});
        }

        resolve(xhr.responseText);
      };

      if (xhr.upload) {
        xhr.upload.onprogress = event => {
          if (event.lengthComputable) {
          }
        };
      }
      xhr.send(formData);
    });

    //return promise;
  }
}
