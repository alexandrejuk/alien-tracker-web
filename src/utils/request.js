/* eslint-disable */
import { identity, path } from 'ramda'
const { REACT_APP_API_URL } = process.env
import axios from 'axios'

export const getAxiosIntance = ({
  baseUrl,
  token
}, onUnauthorized) => {
  const baseURL = baseUrl || `${REACT_APP_API_URL}/api/`
  const instance =  axios.create({
    baseURL,
    headers: {
      authorization: `bearer ${token}`
    }
  })

  instance.interceptors.response.use(
    (response) => Promise.resolve(response.data, response),
    (error) => {
      const statusCode = path(['response', 'status'], error)

      if (statusCode === 401 || statusCode === 403) {
        onUnauthorized()
      }

      return Promise.reject(error.response);
  })

  return instance
}
