import _ from 'lodash';
import CategoriaConfig from "./CategoriaConfig";

export default class CategoriaService {


    static fetchAllCategorias() {
        return new Promise( async (resolve, reject) => {
            try {
                const endpoint = CategoriaConfig.fetchAllCategorias;
                const response = await CategoriaConfig.APIConnector.get(endpoint);
                resolve(response);
                console.log('SERVICE >>>> fetchAllCategorias >>>> ', response)
            } catch (err) {
                reject(err)
            }
        });
    }
    static createNoticia(props) {
        const body = JSON.stringify(props);
        console.log('REGISTER SERVICE >> BODY QUE ENVIO', body)
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const endpoint = ClientesConfig.endpointGetAllClientes;
        //         const response = await ClientesConfig.APIConnector.get(endpoint);
        //         resolve(response);
        //         console.log("SERVICE >>> getAllClientes: ", response)
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
    }

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
