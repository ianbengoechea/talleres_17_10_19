import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';
import NoticiaReducer from './NoticiaReducer';

const rootReducer = combineReducers({
  registerForm: RegisterReducer,
  noticias: NoticiaReducer,
});
export default rootReducer;
