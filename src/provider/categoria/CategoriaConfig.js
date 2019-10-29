import APIConnector from "../config/ApiConnector";
import Settings from "../config/Settings"


const apiConnector = new APIConnector({ timeout: 50000 });

export default class CategoriaConfig {

    static get fetchAllCategorias() {
        return Settings.server + "/categoria"
    }
    static get crearCategoria() {
        return Settings.server + "/categoria/new"
    }

    static get APIConnector() {
        return apiConnector;
    }
}
