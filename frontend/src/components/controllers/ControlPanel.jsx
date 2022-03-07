// Expose controls not listed under a status dial

import React from 'react'
import useModal from 'utils/useModal'
import MixController from './MixController'
import MistController from './MistController'


const ControlPanel = props => {

  const {toggle: mistToggle, modal: mistModal} = useModal()
  const {toggle: mixToggle, modal: mixModal} = useModal()

  return (
    <div className="container">
      <h3 className="text-center"> Controllers </h3>
      <div className="controllers">
        <button className="button" type="button" onClick={mixToggle}> Mix </button>
        <button className="button" type="button" onClick={mistToggle}> Mist </button>
        <MixController toggle={mixToggle} modal={mixModal} />
        <MistController toggle={mistToggle} modal={mistModal} />
      </div>
    </div>
  )
}

export default ControlPanel
