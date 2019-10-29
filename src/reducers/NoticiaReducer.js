import {NOTICIA_FETCH_ALL, NOTICIA_CREATE} from '../actions/types';

const INITIAL_STATE = {
  allNoticias: [],
  allImages: [],
};

export default (state = INITIAL_STATE, action) => {
  console.log('NOTICIA_REDUCER >>> STATE', state);
  console.log('NOTICIA_REDUCER >>> action', action.payload);
  switch (action.type) {
    case NOTICIA_FETCH_ALL:
      return {...state, allNoticias: action.payload};
    default:
      return state;
  }
};
