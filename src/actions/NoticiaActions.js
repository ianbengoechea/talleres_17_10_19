import {
  NOTICIA_CREATE,
  NOTICIA_FETCH_ALL,
  NOTICIA_FETCH_ALL_IMAGES,
} from './types';
import NoticiaService from '../provider/noticias/NoticiaService';

import {Actions} from 'react-native-router-flux';

export const fetchAllNoticias = callback => {
  return dispatch => {
    NoticiaService.fetchAllNotcias()
      .then(response => {
        console.log('<<<ACTION>>> RESPONSE >>>', response);
        dispatch({
          type: NOTICIA_FETCH_ALL,
          payload: response,
        });
      })
      //         if (callback) console.log('callback amigo');
      //     })
      .catch(err => {
        console.log(err);
      });
  };
};
