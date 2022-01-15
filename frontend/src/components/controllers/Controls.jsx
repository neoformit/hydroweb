import React from 'react'
import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { useAlert } from 'react-alert'
import { requestPostControl } from 'utils/requests/controllers'
import Spinner from '../aux/Spinner'


const Controls = props => {

  // Set of device controls with defaults <on/off>
  // <string>         name: the controller identifier e.g. 'pressure'
  // <bool>     toggleable: the controller can be toggled on/off
  // <array>       methods: name of callable nullary methods (no args)
  // <object> paramMethods: name and args of callable methods
  //
  // ... data: Current state of the controls?

  // paramMethods should be like:
  // {
  //   'deliver': [
  //     {
  //       'name': 'ml',
  //       'type': 'number',
  //       'default': 20,
  //     },
  //     ...
  //   ],
  //   ...
  // }

  const { name, toggleable, methods, paramMethods, data } = props

  const triggerMethod = method => {
    // Send request to trigger controller method
  }
  const triggerParamMethod = method => {
    // Send request to trigger controller method with arguments
  }

  const toggleRow = (
    <tr>
      <td colSpan='2'> On/Off </td>
      <td>
        (insert toggle switch here)
      </td>
    </tr>
  )

  const methodRows = methods ? methods.map( method => (
    <tr>
      <td colSpan='2'> {method} </td>
      <td>
        <button className="btn" onClick={ () => triggerMethod(method)}>
          Trigger
        </button>
      </td>
    </tr>
  )) : null

  const paramMethodRows = paramMethods ? Object.keys(paramMethods).map( method => {
    const args = paramMethods[method]
    return (
      <tr>
        <td> {method} </td>
        <td style={{ textAlign: 'right' }}>
          {
            args.map( arg => (
              <>
                <input
                  type={arg.type}
                  name={arg.name}
                  value={arg.default}
                />
                <label style={{ marginLeft: '1rem' }}>
                  {arg.name}
                </label>
              </>
            ))
          }
        </td>
        <td>
          <button className="btn" onClick={ () => triggerParamMethod(method)}>
            Trigger
          </button>
        </td>
      </tr>
    )
  }) : null

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
