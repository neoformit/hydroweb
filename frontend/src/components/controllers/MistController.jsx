import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../aux/Modal'
import Spinner from '../aux/Spinner'
import { getControllerData } from 'utils/requests/controllers'
import Controls from './Controls'
import ConfigTable from './ConfigTable'


const MistController = props => {

  const { modal, toggle } = props
  const [data, setData ] = useState({})
  const [loading, setLoading ] = useState(1)

  useEffect( () => {
    getControllerData('mist').then( data => {
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
    <Modal isOpen={modal} contentLabel="Mist">
    <h3> Mix </h3>
    <br />

    { loading ?
      <Spinner />
      : (
        <>
          <ConfigTable
            name="mist"
            data={data.config}
            setConfig={setConfig}
          />

          <hr />

          <Controls
            name="mist"
            toggleable={true}
            methods={['mist']}
          />
        </>
      )
    }

    <button className="button" onClick={toggle}>Close</button>
    </Modal>
  )
}

export default MistController
