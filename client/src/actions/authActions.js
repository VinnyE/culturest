import axios from 'axios';

export const openLogInModal = () => {
  return { type: 'OPEN_LOGIN_MODAL', payload: true };
}

export const closeLogInModal = () => {
  return { type: 'CLOSE_LOGIN_MODAL', payload: false };
}

export const logInToSocialMedia = (name) => {
  // return async dispatch => {
  //   try {
  //     dispatch({ type: 'LOGIN_REQUEST' });

  //     const { data } = await axios.get(`http://localhost:3001/auth/${name}`);
  //     dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  //   } catch(err) {
  //     dispatch({ type: 'LOGIN_ERROR', payload: err });
  //   }
  // }
  
}

