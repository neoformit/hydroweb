import React from 'react'

import { getStatus } from 'utils/status'

const StatusBar = (props) => {

  const currentStatus = props.status.text

  return (
    <div className={"status-bar " + currentStatus}>
      <p>
        <span> Status </span>
        <span>
          { currentStatus }
        </span>
      </p>
    </div>
  )

}

export default StatusBar
