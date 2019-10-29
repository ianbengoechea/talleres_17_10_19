import {
  REGISTER_SUBMIT_FORM,
  REGISTER_NAME_CHANGED,
  REGISTER_PASSWORD_CHANGED,
  REGISTER_EMAIL_CHANGED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  nombre: '',
  email: '',
  contrasenia: '',
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log('REGISTER_REDUCER >>> STATE', state);
  console.log('REGISTER_REDUCER >>> ACTIONS', action);
  switch (action.type) {
    case REGISTER_NAME_CHANGED:
      return {...state, nombre: action.payload};
    case REGISTER_EMAIL_CHANGED:
      return {...state, email: action.payload};
    case REGISTER_PASSWORD_CHANGED:
      return {...state, contrasenia: action.payload};
    case REGISTER_SUBMIT_FORM:
      return {...state, ...action.payload, loading: true, error: ''};
    case REGISTER_FAIL:
      return {...state, error: 'ERROR AL REGISTRAR', loading: false};
    case REGISTER_SUCCESS:
      return {...state, ...INITIAL_STATE};
    default:
      return state;
  }
};
