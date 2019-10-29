import {
    CATEGORIA_FETCH_ALL
} from '../actions/types';

const INITIAL_STATE = {
    allCategorias: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORIA_FETCH_ALL:
            return {...state, allCategorias: action.payload};
        default:
            return state;
    }
};
