import axios from 'axios';

export const isAuthenticated = (credentials) => {
  return { type: 'USER_LOGIN', payload: credentials }
}

export const logOut = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('https://culturest.herokuapp.com/user/logout');
      dispatch({ type: 'USER_LOGOUT', payload: true });
      
      if (data.success) {
        return true;
      }
    } catch(err) {
      dispatch({ type: 'LOGOUT_ERROR', payload: err });
    }
  }
};

export const logInToSocialMedia = () => {
  return async dispatch => {
    try {
      dispatch({ type: 'AUTH_USER_REQUEST' });

      const { data } = await axios.get('https://culturest.herokuapp.com/auth/me');
      if (data) {
        dispatch({ type: 'AUTH_USER_SUCCESS', payload: data });
      }
    } catch(err) {
      dispatch({ type: 'AUTH_USER_ERROR', payload: err });
    }
  }
  
}

