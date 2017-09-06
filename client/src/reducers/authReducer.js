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
    case 'LOGIN_REQUEST':
      return {...state, loggingIn: true};
    case 'LOGIN_SUCESS':
      return {...state, loggingIn: false, loggedIn: true, logInError: false};
    case 'LOGIN_ERROR':
      return {...state, loggingIn: false, loggedIn: false, logInError: true}
    default:
      return state;
  }
}

export default authReducer;