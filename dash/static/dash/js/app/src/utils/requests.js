import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios
