import axios from 'axios';

export const addPin = (pinObj) => {
  return async dispatch => {
    try {
      dispatch({ type: 'PIN_ADD_REQUEST' });
      const { data } = await axios.post('http://127.0.0.1:3001/pin/addpin', pinObj);
      dispatch({ type: 'PIN_ADD_SUCCESS', payload: data });

      if (data) {
        return true;
      }
    } catch(err) {
      dispatch({ type: 'PIN_ADD_ERROR', payload: err });
    }
  }
}

export const getAllPins = () => {
  return async dispatch => {
    try {
      dispatch({ type: 'PIN_GET_REQUEST' });
      const { data } = await axios.get('http://127.0.0.1:3001/pin/all');

      if (typeof data !== 'object') { // received a redirect
        throw new Error('Something went wrong.');
      }

      dispatch({ type: 'PIN_GET_SUCCESS', payload: data });
      
      if (data) {
        return true;
      }
    } catch(err) {
      dispatch({ type: 'PIN_GET_ERROR', payload: err });
    }
  }
}

export const getUserPins = (id) => {
  return async dispatch => {
    try {
      dispatch({ type: 'USER_PIN_GET_REQUEST' });
      const { data } = await axios.get(`http://127.0.0.1:3001/pin/user/${id}`);
      if (typeof data !== 'object') { // received a redirect
        throw new Error('Something went wrong.');
      }

      dispatch({ type: 'USER_PIN_GET_SUCCESS', payload: data });
      if (data) {
        return true;
      }
    } catch(err) {
      dispatch({ type: 'USER_PIN_GET_ERROR', payload: err });
    }
  }
}

export const resetPins = () => {
  return { type: 'RESET_PIN_STATE' };
}