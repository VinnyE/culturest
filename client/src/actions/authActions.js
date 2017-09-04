export const openLogInModal = () => {
  return {
    type: 'OPEN_LOG_IN_MODAL',
    payload: true
  }
}

export const closeLogInModal = () => {
  return {
    type: 'CLOSE_LOG_IN_MODAL',
    payload: false
  }
}

