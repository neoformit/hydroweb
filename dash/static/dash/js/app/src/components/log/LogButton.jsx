// Interface getLogs() request

import React from 'react'
import { useState, useRef } from 'react'

import Modal from '../../utils/Modal'
import useModal from '../../utils/useModal'
import Spinner from '../aux/Spinner'
import { getLogs } from '../../utils/requests/status'


const LogButton = (props) => {

  const endLogRef = useRef()
  const { toggle, modal } = useModal()
  const [logs, setLogs ] = useState('')
  const [loading, setLoading ] = useState(1)

  const viewLogs = () => {
    toggle()
    setLoading(1)
    getLogs().then( (data) => {
      console.log('Fetching logs')
      setLogs(data.text)
      setLoading(0)
      endLogRef.current.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div>
      <button className="button" onClick={viewLogs}>
        View logs
      </button>

      <Modal isOpen={modal} contentLabel="View logs">
        <h3> Activity logs </h3>
        <br />
        <div className="logs">
          <pre>
            { logs }
            <span ref={endLogRef}/>
          </pre>
        </div>
        <button className="button" onClick={toggle}>Close</button>
      </Modal>
    </div>
  )

}

export default LogButton
