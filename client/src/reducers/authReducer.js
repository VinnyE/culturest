const defaultState = {
  logInModalOpen: false,
  loggingIn: false,
  loggedIn: false,
  logInError: false,
  user: null
};

const authReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'OPEN_LOGIN_MODAL':
      return {...state, logInModalOpen: action.payload};
    case 'CLOSE_LOGIN_MODAL':
      return {...state, logInModalOpen: action.payload};
    case 'AUTH_USER_REQUEST':
      return {...state, user: null, loggingIn: true, loggedIn: false, logInError: false};
    case 'AUTH_USER_SUCCESS':
      return {...state, user: action.payload, loggingIn: false, loggedIn: true, logInError: false};
    case 'AUTH_USER_ERROR':
      return {...state, user: null, loggingIn: false, loggedIn: false, logInError: true};
    case 'USER_LOGIN' :
      return {...state, user: action.payload, loggingIn: false, loggedIn: true, logInError: false};
    case 'USER_LOGOUT' :
      return {...state, user: null, loggingIn: false, loggedIn: false, logInError: false};
    default:
      return state;
  }
}

export default authReducer;