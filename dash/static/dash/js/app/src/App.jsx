import React from 'react'
import ReactTooltip from 'react-tooltip'

import ErrorBoundary from './utils/ErrorBoundary'
import Main from './components/main/Main'
import Logo from 'assets/img/logo.png'
import Logout from 'assets/icons/logout.svg'


const App = (props) => {

  return (
    <ErrorBoundary>
      <div className="main">
        <div className="navbar">

          <div className="row px-3">
            <img src={Logo} alt="HydroPi logo" />
            <h1 className="title"> HydroPi </h1>
          </div>

          <a href="/logout">
            <img className="icon" src={Logout} alt="HydroPi logo" width="50px" />
          </a>
        </div>

        <Main />
      </div>
    </ErrorBoundary>
  )
}

export default App
