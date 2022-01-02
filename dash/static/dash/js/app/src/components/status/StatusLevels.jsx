import React from 'react'

import { STATUSCOLORMAP } from 'utils/status'
import StatusDial from './StatusDial'

const StatusLevels = (props) => {

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
          height: `${100 * status.params.depth.percent}%`,
        }}
      >
        <p
          style={{
            color: depthColor.font,
            backgroundColor: depthColor.background,
            padding: '0 1rem',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        >
          { status.params.depth.value}{ status.params.depth.unit }
        </p>
      </div>

      <hr style={{
          borderTopColor: depthColor.font,
          position: 'absolute',
          left: '5rem',
          right: '0.25rem',
          bottom: `${100 * status.params.depth.targetPercent}%`,
          margin: 0,
        }}
      />

      <div className="dials">
        { statusDials }
      </div>
    </div>
  )
}

export default StatusLevels
