import React from 'react'
import GaugeChart from 'react-gauge-chart'

import { STATUSCOLORMAP } from 'utils/status'

const PhDial = (props) => {

  // fetch data from db
  const { data } = props
  const value = 0.45

  return (
    <div className="gauge">
      <GaugeChart id="gauge-chart-ph"
        nrOfLevels={100}
        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
        cornerRadius={0}
        colors={[
          STATUSCOLORMAP.danger.background,
          STATUSCOLORMAP.warning.background,
          STATUSCOLORMAP.normal.background,
          STATUSCOLORMAP.warning.background,
          STATUSCOLORMAP.danger.background,
        ]}
        percent={value}
        arcPadding={0.01}
        hideText={true}
      />
      <p> {data.text}: {data.value}{data.unit} </p>
    </div>
  )
}


export default PhDial
