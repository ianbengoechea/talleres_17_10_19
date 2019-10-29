import APIConnector from '../config/ApiConnector';
import Settings from '../config/Settings';

const apiConnector = new APIConnector({timeout: 50000});

export default class NoticiaConfig {
  static get fetchAllNoticias() {
    return Settings.server + '/noticia';
  }
  // static get endpointEdit() {
  //     return Settings.server + "/clientes/edit"
  // }
  // static get endpointCrear() {
  //     return Settings.server + "/clientes/add"
  // }
  // static get endpointGetEmpresa(){
  //     return Settings.server + "/empresas"
  // }
  // static get endpointDelete() {
  //     return Settings.server + "/clientes/delete"
  // }

  static get APIConnector() {
    return apiConnector;
  }
}
