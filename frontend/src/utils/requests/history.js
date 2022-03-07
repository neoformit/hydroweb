import { useAlert } from 'react-alert'
import axios from './axios'
import ROUTES from './routes'
import errorSwal from '../errorSwal'

export const getHistory = () => axios.get(ROUTES.history).then(r => r.data)
