const defaultState = {
  logInModalOpen: false
};

const authReducer = (state = defaultState, action) => {
  switch(action.payload) {
    case 'OPEN_LOG_IN_MODAL':
      return {...state, logInModalOpen: true}
    case 'CLOSE_LOG_IN_MODAL':
      return {...state, logInModalOpen: false}
    default:
      return state;
  }
}

export default authReducer;