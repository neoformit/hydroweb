// Interface getLogs() request

import React from 'react'
import { useState, useRef } from 'react'

import Modal from '../aux/Modal'
import Spinner from '../aux/Spinner'
import useModal from 'utils/useModal'
import { getLogs } from 'utils/requests/status'


const LogButton = (props) => {

  const { toggle, modal } = useModal()
  const [logs, setLogs ] = useState('')
  const [loading, setLoading ] = useState(1)

  const viewLogs = () => {
    toggle()
    setLoading(1)
    getLogs().then( (data) => {
      setLogs(data.text)
      setLoading(0)
    })
  }

  return (
    <div>
      <button className="button" onClick={viewLogs}>
        View logs
      </button>

      <Modal isOpen={modal} contentLabel="View logs">
        <h3> Activity log </h3>
        <br />

        {
          loading ? <Spinner />
          :
          <div className="modal-scrollbox">
            <small>
              <pre>
                { logs }
              </pre>
            </small>
          </div>
        }

        <br />

        <button className="button" onClick={toggle}>Close</button>
      </Modal>
    </div>
  )

}

export default LogButton
