const defaultState = {
  pinAddRequested: false,
  pinAddSuccess: false,
  pinAddError: false,
  pinGetRequested: false,
  pinGetSuccess: false,
  pinGetError: false,
  pins: null,
};

const pinReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'PIN_ADD_REQUEST':
      return {...state, pinAddRequested: true, pinAddSuccess: false, pinAddError: false};
    case 'PIN_ADD_SUCCESS':
      return {...state, pinAddRequested: false, pinAddSuccess: true, pinAddError: false};
    case 'PIN_ADD_ERROR':
      return {...state, pinAddRequested: false, pinAddSuccess: false, pinAddError: true};
    case 'PIN_GET_REQUEST':
      return {...state, pinGetRequested: true, pinGetSuccess: false, pinGetError: false};
    case 'PIN_GET_SUCCESS':
      return {...state, pins: action.payload, pinGetRequested: false, pinGetSuccess: true, pinGetError: false};
    case 'PIN_GET_ERROR':
      return {...state, pinGetRequested: false, pinGetSuccess: false, pinGetError: true};
    default:
      return state;
  }
}

export default pinReducer;