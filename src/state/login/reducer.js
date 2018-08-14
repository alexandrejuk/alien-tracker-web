import { LOGIN_SUCCESSFULL } from './actions'

const login = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESSFULL:
      return payload
    default:
      return state
  }
}

export default login
