// Provide access for all config variables

import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../aux/Modal'
import useModal from 'utils/useModal'
import Spinner from '../aux/Spinner'
import { requestGetConfig } from 'utils/requests/config'
import ConfigTable from './ConfigTable'
import SettingsIcon from 'assets/icons/settings.png'


const FullConfig = (props) => {

  const { modal, toggle } = useModal()
  const [data, setData] = useState({})
  const [loading, setLoading ] = useState(1)

  useEffect( () => {
    // Fetch all config grouped by device
    requestGetConfig().then( r => {
      setData(r.data)
      console.log("GetConfig data:")
      console.log(r.data)
      setLoading(0)
    })
  }, [])

  // Make sure 'general' group is at the top and others alphabetical
  const configGroupOrder = ['general'].concat(
    Object.keys(data).filter( x => x !== 'general' ).sort()
  )

  const setConfigGroup = (k, i, d) => {
    const newData = { ...data }
    newData[k][i].value = d.value
    setData(newData)
  }

  const configTables = Object.keys(data) ? configGroupOrder.map( g => (
    <ConfigTable
      key={`config_${g}`}
      title={g}
      data={data[g]}
      setConfig={(i, d) => setConfigGroup(g, i, d)}
    />
  )) : null

  return (
    <div>
      <button className="btn-config" onClick={toggle}>
        <img src={SettingsIcon} alt="Edit configuration" />
      </button>

      <Modal isOpen={modal} contentLabel="Configuration">
      <h3> Configuration </h3>
      <br />

      <div className="modal-scrollbox">
        { loading ?
          <Spinner />
          : configTables
        }
      </div>

      <br />

      <button className="button" onClick={toggle}>Close</button>
      </Modal>
    </div>
  )

}

export default FullConfig
