import { useAlert } from 'react-alert'
import axios from './axios'
import ROUTES from './routes'
import errorSwal from '../errorSwal'

export const requestConfigUpdate = data => axios.post(ROUTES.config, data)
