import axios from 'axios';

export const addPin = (pinObj) => {
  return async dispatch => {
    try {
      dispatch({ type: 'PIN_ADD_REQUEST' });
      console.log('requesting pin!');
      const { data } = await axios.post('http://127.0.0.1:3001/pin/addpin', pinObj);
      dispatch({ type: 'PIN_ADD_SUCCESS', payload: data });
      
      if (data) {
        console.log('SUCCESS!!!', data)
        return true;
      }
    } catch(err) {
      console.log(err);
      dispatch({ type: 'PIN_ADD_ERROR', payload: err });
    }
  }
}