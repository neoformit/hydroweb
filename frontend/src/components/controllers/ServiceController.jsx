import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../aux/Modal'
import useModal from 'utils/useModal'
import { postServiceController } from '../../utils/requests/controllers'
import ServiceIcon from '../../assets/icons/services.png'

const ServiceController = props => {

  const { modal, toggle } = useModal();
  const defaultData = {
    confirm: false,
    action: null,
  }
  const [data, setData ] = useState(defaultData)

  const takeAction = action => {
    setData({
      confirm: true,
      action: action,
    })
  }

  const commitAction = () => postServiceController(data.action).then(
    data => setData(defaultData)
  )

  const cancelAction = () => setData(defaultData)

  const defaultDialog = (
    <div>
      <p>Manage the state of the HydroPi service.</p>
      <button className="button" onClick={() => takeAction('start')}>
        Start
      </button>
      <button className="button" onClick={() => takeAction('stop')}>
        Stop
      </button>
      <button className="button" onClick={() => takeAction('restart')}>
        Restart
      </button>
      <br />
      <button className="button button-muted" onClick={toggle}>Close</button>
    </div>
  )

  return (
    <div>
      <button className="btn-config service" onClick={toggle}>
        <img src={ServiceIcon} alt="Service controls" />
      </button>

      <Modal className="" isOpen={modal} contentLabel="Service controls">
        <h3> Service controls </h3>
        <br />
        {
          data.confirm ?
          <>
            <p>
              Are you sure you want to
              <span className="text-warn"> {data.action} </span>
              the HydroPi service?
            </p>
            <button className="button button-warn" onClick={commitAction}>Confirm</button>
            <button className="button" onClick={cancelAction}>Cancel</button>
          </>
          : defaultDialog
        }
      </Modal>
    </div>
  )
}

export default ServiceController
