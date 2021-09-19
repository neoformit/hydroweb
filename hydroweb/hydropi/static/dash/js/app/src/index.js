import React from 'react'
import ReactDOM from 'react-dom'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import App from './App'
import reactErrorModal from './utils/reactErrorModal'


// Alert configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: 'fade',
}


try {
  ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>,
    document.getElementById('react-root')
  )
}
catch(err) {
  reactErrorModal(err);
}
