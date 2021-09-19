import React from 'react'
import ReactTooltip from 'react-tooltip';

import ErrorBoundary from './utils/ErrorBoundary'
import Logo from './assets/img/logo.png';
import Logout from './assets/icons/logout.svg';


const App = (props) => {

  return (
    <ErrorBoundary>
      <div className="main">
        <div className="navbar">

          <div className="row px-5">
            <img src={Logo} alt="HydroPi logo" />
            <h1 className="title"> HydroPi </h1>
          </div>

          <a href="/logout">
            <img className="icon" src={Logout} alt="HydroPi logo" width="50px" />
          </a>
        </div>

        <div className="container text-center my-auto">
          <p className="text-center"> Nothing to show yet! </p>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
