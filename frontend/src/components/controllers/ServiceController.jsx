import React from 'react'
import { useState, useEffect } from 'react'
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { FaPause, FaPlay } from 'react-icons/fa'
import Modal from '../aux/Modal'
import useModal from 'utils/useModal'
import { getServiceControllerData, postServiceController } from '../../utils/requests/controllers'
import Spinner from '../aux/Spinner'


const ServiceController = props => {

  const { modal, toggle } = useModal();
  const [state, setState] = useState({})
  useEffect(() => {
    getServiceControllerData().then( data => {
      setState({
        paused: Boolean(data.paused),
        loading: false,
      })
      console.log(`Fetched state: paused = ${data.paused}`);
    })
  }, [])

  const renderButton = is_paused => {
    const newState = !is_paused
    return (
      <button className="button" onClick={() => setPause(newState)}>
        {
          newState ? <FaPause /> : <FaPlay />
        }
      </button>
    )
  }

  const setPause = (newState) => {
    setState({
      ...state,
      loading: true,
    })
    postServiceController(+newState).then(
      data => setState({
        paused: Boolean(data.paused),
        loading: false,
      })
    )
  }

  const dialog = (
    <div>
      <p>Pause/resume the HydroPi service.</p>
      <p>
        Pausing the service will:
      </p>
      <ul>
        <li>Stop mist delivery</li>
        <li>Stop logging of data</li>
        <li>Stop maintenance actions (e.g. pressure tank refill)</li>
        <li>Trigger a telegram notification for every maintenance cycle that is skipped</li>
      </ul>
      <br />
      {
        state.loading ? <Spinner /> : renderButton(state.paused)
      }
      <br />
      <button className="button button-muted" onClick={toggle}>Close</button>
    </div>
  )

  return (
    <div>
      <button className="btn-service" onClick={toggle}>
        {
          state.paused ?
          <BsPlayCircle />
          : <BsPauseCircle />
        }
      </button>

      <Modal className="" isOpen={modal} contentLabel="Service controls">
        <h3> Service controls </h3>
        <br />
        { dialog }
      </Modal>
    </div>
  )
}

export default ServiceController
