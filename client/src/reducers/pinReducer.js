// Could just abstract some of these into a general server request, but being explicit is fine for now.
// There are some error hooks in here, which for the most part aren't really being handled at the moment.
// As this is just a quick side project mvp, I won't be handling all the edge cases that are possible.

const defaultState = {
  pinAddRequested: false,
  pinAddSuccess: false,
  pinAddError: false,
  pinGetRequested: false,
  pinGetSuccess: false,
  pinGetError: false,
  pins: null,
  userPins: null,
};

const pinReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'PIN_ADD_REQUEST':
      return {...state, pinAddRequested: true, pinAddSuccess: false, pinAddError: false};
    case 'PIN_ADD_SUCCESS':
      return {
        ...state,
        pins: state.pins ? [...state.pins, action.payload] : null,
        userPins: state.userPins ? [...state.userPins, action.payload] : null,
        pinAddRequested: false,
        pinAddSuccess: true,
        pinAddError: false
      };
    case 'PIN_ADD_ERROR':
      return {...state, pinAddRequested: false, pinAddSuccess: false, pinAddError: true};
    case 'PIN_GET_REQUEST':
      return {...state, pinGetRequested: true, pinGetSuccess: false, pinGetError: false};
    case 'PIN_GET_SUCCESS':
      return {...state, pins: action.payload, pinGetRequested: false, pinGetSuccess: true, pinGetError: false};
    case 'PIN_GET_ERROR':
      return {...state, pinGetRequested: false, pinGetSuccess: false, pinGetError: true};
    case 'USER_PIN_GET_REQUEST':
      return {...state, pinGetRequested: true, pinGetSuccess: false, pinGetError: false};
    case 'USER_PIN_GET_SUCCESS':
      return {...state, userPins: action.payload, pinGetRequested: false, pinGetSuccess: true, pinGetError: false};
    case 'USER_PIN_GET_ERROR':
      return {...state, pinGetRequested: false, pinGetSuccess: false, pinGetError: true};
    case 'USER_PIN_DELETE_REQUEST':
      return {...state, pinDeleteRequested: true, pinDeleteSuccess: false, pinDeleteError: false};
    case 'USER_PIN_DELETE_SUCCESS':
      return {
        ...state,
        userPins: state.userPins ? state.userPins.filter(pin => String(pin._id) !== String(action.payload._id)) : null,
        pins: state.pins ? state.pins.filter(pin => String(pin._id) !== String(action.payload._id)) : null,
        pinDeleteRequested: false,
        pinDeleteSuccess: true,
        pinDeleteError: false
      };
    case 'USER_PIN_DELETE_ERROR':
      return {...state, pinDeleteRequested: false, pinDeleteSuccess: false, pinDeleteError: true};
    default:
      return state;
  }
}

export default pinReducer;