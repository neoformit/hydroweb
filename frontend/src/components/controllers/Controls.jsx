import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useAlert } from 'react-alert'
import ToggleButton from 'react-toggle-button'
import { postCallControllerMethod } from 'utils/requests/controllers'
import Spinner from '../aux/Spinner'


const Controls = props => {

  // Set of device controls with defaults <on/off>
  // <string>         name: the controller identifier e.g. 'pressure'
  // <bool>     toggleable: the controller can be toggled on/off
  // <array>       methods: name of callable nullary methods (no kwargs)
  // <object> kwargMethods: name and kwargs of callable methods
  //
  // kwargMethods should be like:
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
  const kwargMethods = props.kwargMethods || {}

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
    ...Object.keys(kwargMethods).reduce( (obj, method) => {
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
  const defaultKwargs = Object.keys(kwargMethods).reduce( (obj, method) => {
    const kwargs = kwargMethods[method]
    return {
      ...obj,
      [method]: kwargs.reduce( (obj, kwarg) => {
        return {
          ...obj,
          [kwarg.name]: kwarg.value,
        }
      }, {})
    }
  }, {})
  const [methodKwargs, setmethodKwargs] = useState(defaultKwargs)
  const setmethodKwarg = (method, name, value) => setmethodKwargs({
    ...methodKwargs,
    [method]: {
      ...methodKwargs[method],
      [name]: value,
    }
  })

  const triggerMethod = method => {
    // Send request to trigger controller method (optional kwargs)
    // Check if method has kwargs. If so, they will be in state.
    const kwargs = methods.includes(method) ? null : methodKwargs[method]
    // Make request
    postCallControllerMethod(name, method, kwargs).then( () => {
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

  const kwargMethodRows = kwargMethods ?
    Object.keys(kwargMethods).map( method => {
      return (
        <tr key={`${method}_row`}>
          <td> {method} </td>
          <td style={{ textAlign: 'right' }}>
            {
              kwargMethods[method].map( kwarg => (
                <div key={`${method}_arg_${kwarg}`}>
                  <input
                    type={kwarg.type}
                    name={kwarg.name}
                    value={methodKwargs[method][kwarg.name]}
                    onChange={
                      e => setmethodKwarg(method, kwarg.name, e.target.value)
                    }
                  />
                  <label style={{ marginLeft: '1rem' }}>
                    {kwarg.name}
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
          { kwargMethodRows }
        </tbody>
      </table>
    </div>
  )

}

export default Controls
