const defaultState = {
  logInModalOpen: false
};

const authReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'OPEN_LOG_IN_MODAL':
      return {...state, logInModalOpen: action.payload}
    case 'CLOSE_LOG_IN_MODAL':
      return {...state, logInModalOpen: action.payload}
    default:
      return state;
  }
}

export default authReducer;