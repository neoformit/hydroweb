import React from 'react'
import { useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import Modal from '../aux/Modal'
import useModal from 'utils/useModal'
import { getServiceControllerData, postServiceController } from '../../utils/requests/controllers'
import ServiceIcon from '../../assets/icons/services.png'
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
      <p>Start/pause the HydroPi service.</p>
      {
        state.loading ? <Spinner /> : renderButton(state.paused)
      }
      <br />
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
        { dialog }
      </Modal>
    </div>
  )
}

export default ServiceController
