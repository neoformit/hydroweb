import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../aux/Modal'
import Spinner from '../aux/Spinner'
import { getControllerData } from 'utils/requests/controllers'
import Controls from './Controls'
import ConfigTable from './ConfigTable'

const KWARG_METHODS = {
  // Methods
  'deliver': [
      // Arguments
      {
        name: 'ml',
        type: 'number',
        value: 2,  // default
      },
    ],
}


const PhController = props => {

  const name = 'ph'
  const { modal, toggle } = props
  const [data, setData ] = useState({})
  const [loading, setLoading ] = useState(1)

  useEffect( () => {
    getControllerData(name).then( data => {
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
    <Modal isOpen={modal} contentLabel={name}>
    <h3> pH </h3>
    <br />

    { loading ?
      <Spinner />
      : (
        <>
          <ConfigTable
            name={name}
            data={data.config}
            setConfig={setConfig}
          />

          <hr />

          <Controls
            name={name}
            toggleable={true}
            kwargMethods={KWARG_METHODS}
          />
        </>
      )
    }

    <button className="button" onClick={toggle}>Close</button>
    </Modal>
  )
}

export default PhController
