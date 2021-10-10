import React from 'react'

import { STATUSCOLORMAP } from 'utils/status'

const StatusItem = (props) => {

  const { name, data } = props
  const color = STATUSCOLORMAP[data.status]

  return (
    <div
      className="status-item"
      style={{
        color: color.font,
        backgroundColor: color.background,
      }}
    >
      <span className="name">
        { data.text }:
      </span>
      <span className="value">{ data.value }{data.unit}</span>
    </div>
  )
}

export default StatusItem
