// Return a different controller for each parameter

// In the context of the frontend, a controller allows the user to update
// config parameters and manually control hardware state

import React from 'react'
import PressureController from 'components/controllers/PressureController'
import EcController from 'components/controllers/EcController'
import PhController from 'components/controllers/PhController'
// import DepthController from 'components/controllers/DepthController'
// import MistController from 'components/controllers/MistController'
// import TemperatureController from 'components/controllers/TemperatureController'

const controllerMap = {
  pressure: PressureController,
  ph: PhController,
  ec: EcController,
  // depth: DepthController,
  // mist: MistController,
  // temperature: TemperatureController,
}

export const getController = (name, toggle, modal) => {
  const Controller = controllerMap[name]
  console.log(`Returning controller for ${name}`);
  return (
    <Controller key={`${name}_controller`} toggle={toggle} modal={modal} />
  )
}
