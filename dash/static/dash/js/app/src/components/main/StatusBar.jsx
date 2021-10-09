import React from 'react'

import { getStatus } from 'utils/status'

const StatusBar = (props) => {

  const currentStatus = getStatus()

  return (
    <div>
      <p> Status:
        <span className="{ currentStatus }">
          { currentStatus }
        </span>
      </p>
    </div>
  )

}

export default StatusBar
