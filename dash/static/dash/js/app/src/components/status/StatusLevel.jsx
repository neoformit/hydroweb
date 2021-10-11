import React from 'react'

import { STATUSCOLORMAP } from 'utils/status'
import StatusDial from './StatusDial'

const StatusLevel = (props) => {

  const { status } = props
  const depthColor = STATUSCOLORMAP[status.params.depth.status]

  const statusDials = Object.keys(status.params).map( (k) => {
    if ( k !== 'depth' ) {
      return (
        <StatusDial data={status.params[k]} name={k} key={k} />
      )
    }
  })

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
        { statusDials }
      </div>
    </div>
  )
}

export default StatusLevel
