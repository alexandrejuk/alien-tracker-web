import actionCreator from '../actionCreator'

const LOGIN_SUCCESSFULL = 'LOGIN_SUCCESSFULL'
const LOGOUT = 'LOGOUT'


const login = payload => actionCreator(LOGIN_SUCCESSFULL, payload)
const logout = () => actionCreator(LOGOUT)

export {
  LOGIN_SUCCESSFULL,
  LOGOUT,
  login,
  logout,
}
