import React from 'react'

import StatusLevels from './StatusLevels'

const StatusDisplay = (props) => {

  const { status } = props

  return (
    <div className="status-display">
      <StatusLevels status={status} />
    </div>
  )
}

export default StatusDisplay
