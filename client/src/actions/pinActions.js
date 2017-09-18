import axios from 'axios';

export const addPin = (pinObj) => {
  return async dispatch => {
    try {
      dispatch({ type: 'PIN_ADD_REQUEST' });
      const { data } = await axios.post('https://culturest.herokuapp.com/pin/addpin', pinObj);
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
      const { data } = await axios.get('https://culturest.herokuapp.com/pin/all');

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
      const { data } = await axios.get(`https://culturest.herokuapp.com/pin/user/${id}`);

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

export const deletePin = (id) => {
  return async dispatch => {
    try {
      dispatch({ type: 'USER_PIN_DELETE_REQUEST' });
      const { data } = await axios.delete(`https://culturest.herokuapp.com/pin/delete/${id}`);

      if (typeof data !== 'object') { // received a redirect
        throw new Error('Something went wrong.');
      }

      dispatch({ type: 'USER_PIN_DELETE_SUCCESS', payload: data });

    } catch(err) {
      dispatch({ type: 'USER_PIN_DELETE_ERROR', payload: err });
    }
  }
}