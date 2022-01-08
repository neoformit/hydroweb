import React from 'react'
import GaugeChart from 'react-gauge-chart'
import useModal from 'utils/useModal'
import { getController } from 'utils/controllers'

import { STATUSCOLORMAP } from 'utils/status'

const StatusDial = (props) => {

  const { data, name } = props
  const { toggle, modal } = useModal()
  const controller = getController(name, toggle, modal)

  return (
    <>
      <div className="gauge" onClick={toggle}>
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

      { controller }

    </>
  )
}


export default StatusDial
