import React from 'react'

import PhDial from './dials/PhDial'
import StatusLevel from './StatusLevel'

const StatusDisplay = (props) => {

  const { status } = props

  return (
    <div className="status-display">
      <StatusLevel status={status} />
    </div>
  )
}

export default StatusDisplay
