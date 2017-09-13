const defaultState = {
  pinAddRequested: false,
  pinAddSuccess: false,
  pinAddError: false
};

const pinReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'PIN_ADD_REQUEST':
      return {...state, pinAddRequested: true, pinAddSuccess: false, pinAddError: false};
    case 'PIN_ADD_SUCCESS':
      return {...state, pinAddRequested: false, pinAddSuccess: true, pinAddError: false};
    case 'PIN_ADD_ERROR':
      return {...state, pinAddRequested: false, pinAddSuccess: false, pinAddError: true};
    default:
      return state;
  }
}

export default pinReducer;