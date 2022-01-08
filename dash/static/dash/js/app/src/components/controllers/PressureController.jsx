// Control pressure state and configuration

import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../aux/Modal'
import Spinner from '../aux/Spinner'
import { getControllerData } from 'utils/requests/controllers'
import Controls from './Controls'
import ConfigTable from './ConfigTable'


const PressureController = (props) => {

  const { modal, toggle } = props
  const [data, setData] = useState({})
  const [loading, setLoading ] = useState(1)

  useEffect( () => {
    getControllerData('pressure').then( data => {
      setData(data)
      setLoading(0)
    })
  }, [])

  return (
    <Modal isOpen={modal} contentLabel="Pressure">
    <h3> Pressure </h3>
    <br />

    { loading ?
      <Spinner />
      : (
        <>
          <ConfigTable
            name="pressure"
            data={data}
            setData={setData}
          />

          <hr />

          <Controls
            toggleable={true}
            methods={['refill']}
            paramMethods={[]}
            data={data}
            setLoading={setLoading}
            setData={setData}
          />
        </>
      )
    }

    <button className="button" onClick={toggle}>Close</button>
    </Modal>
  )
}

export default PressureController
