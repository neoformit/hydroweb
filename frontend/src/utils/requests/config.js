import { useAlert } from 'react-alert'
import axios from './axios'
import ROUTES from './routes'
import errorSwal from '../errorSwal'

export const requestGetConfig = () => axios.get(ROUTES.config)
export const requestPostConfig = data => axios.post(ROUTES.config, data)
