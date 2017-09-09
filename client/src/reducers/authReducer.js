const defaultState = {
  logInModalOpen: false,
  loggingIn: false,
  loggedIn: false,
  logInError: false
};

const authReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'OPEN_LOGIN_MODAL':
      return {...state, logInModalOpen: action.payload};
    case 'CLOSE_LOGIN_MODAL':
      return {...state, logInModalOpen: action.payload};
    case 'AUTH_USER_REQUEST':
      return {...state, loggingIn: true, loggedIn: false, logInError: false};
    case 'AUTH_USER_SUCCESS':
      return {...state, loggingIn: false, loggedIn: true, logInError: false};
    case 'AUTH_USER_ERROR':
      return {...state, loggingIn: false, loggedIn: false, logInError: true};
    case 'USER_LOGOUT' :
      return {...state, loggingIn: false, loggedIn: false, logInError: false};
    default:
      return state;
  }
}

export default authReducer;