let _sendAuthHeader = true;
let _env = 'Local';

//Example constans for firebase
let API_KEY = 'AIzaSyDqf7m1xjSjbL9x07OsS1al_MxiZ21e530';
let AUTH_DOMAIN = 'easy-pos.firebaseapp.com';
let DATABASE_URL = 'https://easy-pos.firebaseio.com';
let STORAGE_BUCKET = 'easy-pos.appspot.com';
let MESSAGING_SENDER_ID = '66333163548';
let server = 'http://10.255.255.83:8080';

//Example variable
const URL_PRODUCTS = 'products';

class Settings {
  static get env() {
    return _env;
  }

  static set env(value) {
    _env = value;
  }

  static get server() {
    console.log('Viene al get server');
    switch (_env) {
      case 'Local':
        server = 'http://10.255.255.83:8080';
        break;
      default:
        server = 'http://10.255.255.83:8080';
    }
    return server;
  }
  static get API_KEY() {
    switch (_env) {
      case 'Local':
        API_KEY = 'AIzaSyDqf7m1xjSjbL9x07OsS1al_MxiZ21e530';
        break;
      default:
        API_KEY = 'AIzaSyDqf7m1xjSjbL9x07OsS1al_MxiZ21e530';
    }
    return API_KEY;
  }
  static get AUTH_DOMAIN() {
    switch (_env) {
      case 'Local':
        AUTH_DOMAIN = 'easy-pos.firebaseapp.com';
        break;
      default:
        AUTH_DOMAIN = 'easy-pos.firebaseapp.com';
    }
    return AUTH_DOMAIN;
  }
  static get DATABASE_URL() {
    switch (_env) {
      case 'Local':
        DATABASE_URL = 'https://easy-pos.firebaseio.com';
        break;
      default:
        DATABASE_URL = 'https://easy-pos.firebaseio.com';
    }
    return DATABASE_URL;
  }
  static get STORAGE_BUCKET() {
    switch (_env) {
      case 'Local':
        STORAGE_BUCKET = 'easy-pos.appspot.com';
        break;
      default:
        STORAGE_BUCKET = 'easy-pos.appspot.com';
    }
    return STORAGE_BUCKET;
  }
  static get MESSAGING_SENDER_ID() {
    switch (_env) {
      case 'Local':
        MESSAGING_SENDER_ID = '66333163548';
        break;
      default:
        MESSAGING_SENDER_ID = '66333163548';
    }
    return MESSAGING_SENDER_ID;
  }

  static get sendAuthHeader() {
    return _sendAuthHeader;
  }

  static set sendAuthHeader(value) {
    _sendAuthHeader = value;
  }
  //Example getter
  static get productsEndpoint() {
    return URL_PRODUCTS;
  }
}

module.exports = Settings;
