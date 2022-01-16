// Requests for interacting with controllers

import ROUTES from './routes'
import axios from './axios'
import errorSwal from '../errorSwal'


export const getControllerData = name =>
  axios.get(ROUTES.controllers[name])
    .then( r => {
      console.log(`API getControllerData(${name}):`)
      console.log(r.data)
      return r.data
    })
    .catch( (err) => errorSwal(err.response.text) )


export const postTriggerControllerMethod = (name, method, args) => {
  axios.post(ROUTES.controllers[name], {
    method: method,
    args: args,
  }).then( r => {
    console.log(`API postTriggerControllerMethod(${name}):`)
    console.log(r.data)
    return r.data
  })
  .catch( (err) => errorSwal(err.response.text) )
}
