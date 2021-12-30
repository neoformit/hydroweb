import React from 'react'
import GaugeChart from 'react-gauge-chart'

import { STATUSCOLORMAP } from 'utils/status'

const StatusDial = (props) => {

  const { data, name } = props

  const handler = (event) => {
    // Handle click event - display modal with settings/functions?
  }

  return (
    <div className="gauge" onClick={handler}>
      <GaugeChart id={`gauge-chart-${name}`}
        nrOfLevels={5}
        cornerRadius={1}
        colors={[
          STATUSCOLORMAP.danger.background,
          STATUSCOLORMAP.warning.background,
          STATUSCOLORMAP.normal.background,
          STATUSCOLORMAP.warning.background,
          STATUSCOLORMAP.danger.background,
        ]}
        percent={data.percent}
        arcPadding={0.01}
        hideText={true}
        needleColor="#aaa"
      />
      <p>
        <b>{data.text}</b>
        <br />
        {data.value}{data.unit}
      </p>
    </div>
  )
}


export default StatusDial
