import axios from 'axios';

export const openLogInModal = () => {
  return { type: 'OPEN_LOGIN_MODAL', payload: true };
}

export const closeLogInModal = () => {
  return { type: 'CLOSE_LOGIN_MODAL', payload: false };
}

export const logInToSocialMedia = () => {
  return async dispatch => {
    try {
      console.log('dispatching');
      dispatch({ type: 'AUTH_USER_REQUEST' });

      const { data } = await axios.get('http://127.0.0.1:3001/auth/me');
      console.log(data, 'data');
      dispatch({ type: 'AUTH_USER_SUCCESS', payload: data });
    } catch(err) {
      console.log(err, 'err');
      dispatch({ type: 'AUTH_USER_ERROR', payload: err });
    }
  }
  
}

