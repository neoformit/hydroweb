// Allow user to view and edit device configuration

import React from 'react'
import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { useAlert } from 'react-alert'
import { requestConfigUpdate } from 'utils/requests/config'
import Spinner from '../aux/Spinner'


const ConfigTable = (props) => {

  const { data, setData } = props
  const alert = useAlert()

  // const debouncedConfigUpdate = data => useCallback(
  //   debounce( () => requestConfigUpdate(data), 1000 ),
  // []) // Should be persistent across renders

  // This will not debounce yet due to re-renders
  const debouncedConfigUpdate = useCallback(debounce(
    d => requestConfigUpdate(d)
      .then(() => alert.show('Config updated', {type: 'success'}))
      .catch(() => alert.show('Error updating config', {type: 'error'}))
  , 1000), [])

  const handleInput = (event, i) => {
    if (event.target.value === null) return
    let newData = { ...data };
    newData.config[i].value = event.target.value
    setData(newData)
    debouncedConfigUpdate({
      key: event.target.name,
      value: event.target.value,
    })
  }

  const configRows = data.config.map( (item, i) =>
    <tr key={item.key}>
      <td>
        {item.key}
        <br />
        <small>{item.help}</small>
      </td>

      <td>
        <input
          name={item.key}
          type={item.type}
          value={data.config[i].value}
          onChange={event => handleInput(event, i)}
        />
      </td>
    </tr>
  )

  return (
    <div className="config-table">
      <h5 className="font-weight-bold"> Configuration </h5>

      <br />

      <table className="table">
        <thead>
          <tr>
            <th> Key </th>
            <th> Value </th>
          </tr>
        </thead>

        <tbody>
          { configRows }
        </tbody>
      </table>
    </div>
  )
}

export default ConfigTable
