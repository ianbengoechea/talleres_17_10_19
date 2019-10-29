import {
  REGISTER_EMAIL_CHANGED,
  REGISTER_NAME_CHANGED,
  REGISTER_PASSWORD_CHANGED,
  REGISTER_SUBMIT_FORM,
    REGISTER_SUCCESS
} from './types';
import RegisterService from '../provider/register/RegisterService';
import {Actions} from 'react-native-router-flux';

export const registerEmailChanged = text => {
  return {
    type: REGISTER_EMAIL_CHANGED,
    payload: text,
  };
};
export const registerPasswordChanged = text => {
  return {
    type: REGISTER_PASSWORD_CHANGED,
    payload: text,
  };
};
export const registerNameChanged = text => {
  return {
    type: REGISTER_NAME_CHANGED,
    payload: text,
  };
};
export const registerSubmitForm = ({nombre, email, contrasenia}, callback) => {
  console.log('contrasena', contrasenia)
  const props = { nombre, email, contrasenia}
    return dispatch => {
      RegisterService.createUser(props)
          .then( () => {
              dispatch({
                  type: REGISTER_SUCCESS,
              })})
      //         if (callback) console.log('callback amigo');
      //     })
      // .catch(err => {
      //     console.log(err)
      // })
  };
};
