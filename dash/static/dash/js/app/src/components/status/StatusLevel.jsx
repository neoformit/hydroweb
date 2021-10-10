import React from 'react'

import { STATUSCOLORMAP } from 'utils/status'
import PhDial from './dials/PhDial'

const StatusLevel = (props) => {

  const { status } = props
  const depthColor = STATUSCOLORMAP[status.params.depth.status]

  return (
    <div className='status-level'>
      <div
        className="depth"
        style={{
          backgroundColor: depthColor.background,
        }}
      >
        <p
          style={{ color: depthColor.font }}
        >
          { status.params.depth.value}{ status.params.depth.unit }
        </p>
      </div>

      <div className="dials">
      <PhDial data={status.params.ph} />
      </div>
    </div>
  )
}

export default StatusLevel
