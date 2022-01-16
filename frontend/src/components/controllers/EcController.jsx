import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../aux/Modal'
import Spinner from '../aux/Spinner'
import { getControllerData } from 'utils/requests/controllers'
import Controls from './Controls'
import ConfigTable from './ConfigTable'

const PARAM_METHODS = {
  // Methods
  'deliver': [
      // Arguments
      {
        name: 'ml',
        type: 'number',
        value: 20,  // default
      },
    ],
}


const EcController = props => {

  const { modal, toggle } = props
  const [data, setData ] = useState({})
  const [loading, setLoading ] = useState(1)

  useEffect( () => {
    getControllerData('ec').then( data => {
      setData(data)
      setLoading(0)
    })
  }, [])

  const setConfig = (i, d) => {
    let newData = { ...data }
    newData.config[i].value = d.value
    setData(newData)
  }

  return (
    <Modal isOpen={modal} contentLabel="EC">
    <h3> EC </h3>
    <br />

    { loading ?
      <Spinner />
      : (
        <>
          <ConfigTable
            name="ec"
            data={data.config}
            setConfig={setConfig}
          />

          <hr />

          <Controls
            name="ec"
            toggleable={true}
            paramMethods={PARAM_METHODS}
          />
        </>
      )
    }

    <button className="button" onClick={toggle}>Close</button>
    </Modal>
  )
}

export default EcController
