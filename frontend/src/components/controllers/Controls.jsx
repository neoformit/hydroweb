import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useAlert } from 'react-alert'
import ToggleButton from 'react-toggle-button'
import { postTriggerControllerMethod } from 'utils/requests/controllers'
import Spinner from '../aux/Spinner'


const Controls = props => {

  // Set of device controls with defaults <on/off>
  // <string>         name: the controller identifier e.g. 'pressure'
  // <bool>     toggleable: the controller can be toggled on/off
  // <array>       methods: name of callable nullary methods (no args)
  // <object> paramMethods: name and args of callable methods
  //
  // paramMethods should be like:
  // {
  //   'deliver': [
  //     {
  //       'name': 'ml',
  //       'type': 'number',
  //       'value': 20,  // default
  //     },
  //     ...
  //   ],
  //   ...
  // }

  const { name, toggleable } = props
  const methods = props.methods || []
  const paramMethods = props.paramMethods || {}

  // Set state of each controller method
  // By default these are all off, but would be better if the real state is
  // fetched from hydropi.
  // state = { toggle: <bool>, [method]: <bool>, ... }
  const defaultState = {
    ...methods.reduce( (obj, method) => {
      return {
        ...obj,
        [method]: 0,
      }
    }, {}),
    ...Object.keys(paramMethods).reduce( (obj, method) => {
      return {
        ...obj,
        [method]: 0,
      }
    }, {toggle: 0}),
  }
  // Use wrappers around loading functions to capture state for each method
  const [state, setState] = useState(defaultState)
  const setMethodState = (method, newState) => {
    setState({
      ...state,
      [method]: newState,
    })
  }

  // Set method arguments as state
  const defaultParams = Object.keys(paramMethods).reduce( (obj, method) => {
    const args = paramMethods[method]
    return {
      ...obj,
      [method]: args.reduce( (obj, arg) => {
        return {
          ...obj,
          [arg.name]: arg.value,
        }
      }, {})
    }
  }, {})
  const [methodParams, setmethodParams] = useState(defaultParams)
  const setmethodParam = (method, name, value) => setmethodParams({
    ...methodParams,
    [method]: {
      ...methodParams[method],
      [name]: value,
    }
  })

  const triggerMethod = method => {
    // Send request to trigger controller method (optional params)
    // Check if method has params
    const params = methods.includes(method) ? null : methodParams[method]
    // Make request
    postTriggerControllerMethod(name, method, params).then( () => {
      ['on', 'off'].includes(method) ?
        setMethodState('toggle', method === 'on' ? 1 : 0)
        : setMethodState(method, 1)

      // While True; poll until method state==0; setMethodState(<all>, 0)
      // Hydropi backend can fulfill this by inspecting deeds

    })
  }

  const toggleRow = (
    <tr>
      <td colSpan='2'> On/Off </td>
      <td style={{ display: 'flex', justifyContent: 'center'}}>
        <ToggleButton
          value={state.toggle}
          onToggle={ v => triggerMethod(v ? 'off' : 'on') }
        />
      </td>
    </tr>
  )

  const methodRows = methods ? methods.map( method => (
    <tr key={`${method}_row`}>
      <td colSpan='2'> {method} </td>
      <td>
        {
          state[method] ? <Spinner height="45px" margin="-12px 0" />
          : (
          <button className="btn" onClick={ () => triggerMethod(method)}>
            Trigger
          </button>
          )
        }
      </td>
    </tr>
  )) : null

  const paramMethodRows = paramMethods ?
    Object.keys(paramMethods).map( method => {
      const args = paramMethods[method]
      return (
        <tr key={`${method}_row`}>
          <td> {method} </td>
          <td style={{ textAlign: 'right' }}>
            {
              args.map( arg => (
                <div key={`${method}_arg_${arg}`}>
                  <input
                    type={arg.type}
                    name={arg.name}
                    value={methodParams[method][arg.name]}
                    onChange={
                      e => setmethodParam(method, arg.name, e.target.value)
                    }
                  />
                  <label style={{ marginLeft: '1rem' }}>
                    {arg.name}
                  </label>
                </div>
              ))
            }
          </td>
          <td>
            {
              state[method] ? <Spinner height="45px" margin="-12px 0"/>
              : (
              <button className="btn" onClick={ () => triggerMethod(method)}>
                Trigger
              </button>
              )
            }
          </td>
        </tr>
      )
    })
  : null

  return (
    <div className="controls-table">
      <h5 className="font-weight-bold"> Device controls </h5>

      <br />

      <table className="table">
        <tbody>
          {
            toggleable && toggleRow
          }
          { methodRows }
          { paramMethodRows }
        </tbody>
      </table>
    </div>
  )

}

export default Controls
