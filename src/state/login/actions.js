import actionCreator from '../actionCreator'

const LOGIN_SUCCESSFULL = 'LOGIN_SUCCESSFULL'

const login = payload => actionCreator(LOGIN_SUCCESSFULL, payload)

export {
  LOGIN_SUCCESSFULL,
  login,
}
