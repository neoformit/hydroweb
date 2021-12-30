// Interface getLogs() request

import React from 'react'
import { useState } from 'react'

import Modal from '../../utils/Modal'
import useModal from '../../utils/useModal'
import Spinner from '../aux/Spinner'
import { getLogs } from '../../utils/requests/status'


const LogButton = (props) => {

  const { toggle, modal } = useModal()
  const [logs, setLogText ] = useState('')
  const [loading, setLoading ] = useState(1)

  const viewLogs = () => {
    toggle()
    setLoading(1)
    getLogs().then( (data) => {
      console.log('Fetching logs')
      setLogText(data.text)
      setLoading(0)
      // Scroll to bottom of log output
    })
  }

  return (
    <div>
      <button className="button" onClick={viewLogs}>
        View logs
      </button>

      <Modal isOpen={modal} contentLabel="View logs">
        <h3> Activity logs </h3>
        <div className="logs">
          <pre>{ logs }</pre>
        </div>
        <button className="button" onClick={toggle}>Close</button>
      </Modal>
    </div>
  )

}

export default LogButton
