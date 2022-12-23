import React from 'react'
import { useState, useEffect } from 'react'

import Spinner from '../aux/Spinner'
import StatusBar from '../status/StatusBar'
import StatusDisplay from '../status/StatusDisplay'
import LogButton from '../log/LogButton'
import History from '../history/History'
import FullConfig from '../controllers/FullConfig'
import ServiceController from '../controllers/ServiceController'
import ControlPanel from '../controllers/ControlPanel'
import { getStatus, setStatusStyle } from 'utils/requests/status'

const Main = (props) => {

  const [status, setStatus ] = useState({})
  const [loading, setLoading ] = useState(1)

  useEffect(() => {
    setLoading(1)
    getStatus().then( (data) => {
      setStatus(data)
      setLoading(0)
    })
  }, [])

  return (
    <div className="main">
      {
        loading ? <Spinner />
        : (
          <>
            <StatusBar status={ status } />
            <StatusDisplay status={ status } />
            <ServiceController />
            <LogButton />
            <FullConfig />

            <hr style={{ width: '90vw', margin: '3rem 0' }}/>

            <ControlPanel />

            <hr style={{ width: '90vw', margin: '3rem 0' }}/>

            <History />
          </>
        )
      }
    </div>
  )

}

export default Main
