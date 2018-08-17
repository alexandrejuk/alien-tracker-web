import { LOGIN_SUCCESSFULL, LOGOUT } from './actions'

const logoutState = {}

const login = (state = logoutState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESSFULL:
      return payload
    case LOGOUT:
      return logoutState
    default:
      return state
  }
}

export default login
