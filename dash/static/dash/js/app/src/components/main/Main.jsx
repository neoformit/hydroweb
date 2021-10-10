import React from 'react'
import { useState, useEffect } from 'react'

import Spinner from '../aux/Spinner'
import StatusBar from '../status/StatusBar'
import StatusDisplay from '../status/StatusDisplay'
import { getStatus, setStatusStyle } from 'utils/status'

const Main = (props) => {

  const [status, setStatus ] = useState({})
  const [loading, setLoading ] = useState(1)

  useEffect(() => {
    setLoading(1)
    const data = getStatus()
    console.log('Data:')
    console.log(data)
    setStatusStyle(data)
    setStatus(data)
    setLoading(0)
  }, [])

  return (
    <div className="main">
      {
        loading ? <Spinner />
        : (
          <>
            <StatusBar status={ status } />
            <StatusDisplay status={ status } />
          </>
        )
      }
    </div>
  )

}

export default Main
