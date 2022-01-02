// Get data on current status

import ROUTES from './routes'
import axios from './axios'
import errorSwal from '../errorSwal'
import { setStatusStyle, STATUSCOLORMAP } from '../status'


export const getStatus = () => axios.get(ROUTES.getStatus)
  .then( (r) => {

    /* Response schema:
    {
      text: 'normal',
      params: {
        depth: {
          text: 'Depth',
          status: 'normal',
          value: 30,
          percent: 0.45,
          unit: '%',
        },

        ...

        },
      },
    }
    */

    console.log("API getStatus:")
    console.log(r.data)
    setStatusStyle(r.data)
    return r.data
  })
  .catch( (err) => errorSwal(err.response.text) )


export const getLogs = () => axios.get(ROUTES.getLogs)
  .then( (r) => {
    console.log("API getLogs:")
    console.log(r.data)
    return r.data
  })
  .catch( (err) => errorSwal(err.response.text) )
