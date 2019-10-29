import _ from 'lodash';
import RegisterConfig from "./RegisterConfig";

export default class RegisterService {


    static createUser(props) {
      console.log('props', props)
        const body = JSON.stringify(props);
        console.log('REGISTER SERVICE >> BODY QUE ENVIO', body)
        return new Promise(async (resolve, reject) => {
            try {
                const endpoint = RegisterConfig.endpointNewUser;
                const response = await RegisterConfig.APIConnector.post(endpoint, { body });
                resolve(response);
                console.log("SERVICE >>> getAllClientes: ", response)
            } catch (error) {
                reject(error);
            }
        });
    }
    // static getEmpresa() {
    //     return new Promise( async (resolve, reject) => {
    //         try {
    //             const endpoint = ClientesConfig.endpointGetEmpresa;
    //             const response = await ClientesConfig.APIConnector.get(endpoint);
    //             resolve(response);
    //             console.log("get empresas ,", response)
    //         } catch (err) {
    //             reject(err)
    //         }
    //     });
    // }
    //
    // static addCliente(cliente) {
    //     console.log(cliente)
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const body = JSON.stringify(cliente);
    //             const endpoint = ClientesConfig.endpointCrear;
    //             const response = await ClientesConfig.APIConnector.post(endpoint, {
    //                 body: body
    //             });
    //             resolve(response);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }
    // static editCliente(id, values) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             console.log("estoy en el servicio, mi id es", id)
    //             values.id_cliente = id
    //             let body = JSON.stringify(values);
    //             console.log("este es el body que le envio al server", body)
    //             let endpoint = ClientesConfig.endpointEdit;
    //             let response = await ClientesConfig.APIConnector.put(endpoint, {
    //                 body: body
    //             });
    //             resolve(response);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }
    //
    // static deleteCliente(id) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const endpoint = ClientesConfig.endpointDelete;
    //             let idDeleteado = JSON.stringify({id: id});
    //             console.log("EN EL SERVICIO TENGO EL ID DELETEADO", idDeleteado)
    //             let response = await ClientesConfig.APIConnector.delete(endpoint, {
    //                 body: idDeleteado
    //             });
    //             resolve(response);
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

}




//Servicios para datos en duro

/*
export default class ContratistaService {

   static getClientesAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(clientes), 2000);
    });
  }

  static addCliente(cliente) {
    return new Promise((resolve, reject) => {
      cliente.id = _.size(clientes)
      clientes = clientes.slice(0);
      clientes.push(cliente);
      setTimeout(() => {
        resolve(clientes);
      }, 2000);
    });
  }

  static updateCliente(id, values) {
    return new Promise((resolve, reject) => {
      let pos = id;
      let clientesLista = _.clone(clientes)
      if (pos !== -1) {
        clientesLista[pos] = values;
        clientesLista[pos].id = id;
      }
      setTimeout(() => {
        resolve(clientesLista);
      }, 2000);
    });
  }

  static getCliente(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(clientes);
      }, 2000);
    });
  }

  static deleteCliente(index) {
    console.log("en el provider, index", index)
    return new Promise((resolve, reject) => {
      _.remove(clientes, {id: index})
      setTimeout(() => {
        resolve(clientes);
      }, 2000);
    });
  }
}
*/
