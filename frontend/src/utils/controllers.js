// Return a different controller for each parameter

// In the context of the frontend, a controller allows the user to update
// config parameters and manually control hardware state

import React from 'react'
import PressureController from 'components/controllers/PressureController'
// import DepthController from 'components/controllers/DepthController'
import EcController from 'components/controllers/EcController'
// import MistController from 'components/controllers/MistController'
// import PhController from 'components/controllers/PhController'
// import TemperatureController from 'components/controllers/TemperatureController'

const controllerMap = {
  pressure: PressureController,
  // depth: DepthController,
  ec: EcController,
  // mist: MistController,
  // ph: PhController,
  // temperature: TemperatureController,
}

export const getController = (name, toggle, modal) => {
  const Controller = controllerMap[name]
  console.log(`Returning controller for ${name}`);
  return (
    <Controller key={`${name}_controller`} toggle={toggle} modal={modal} />
  )
  // return React.createElement(controllerMap[name], {
  //   key: `${name}_controller`,
  //   toggle: toggle,
  //   modal: modal,
  // })
}
