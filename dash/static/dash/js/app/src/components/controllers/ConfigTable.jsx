// Allow user to view and edit device configuration

import React from 'react'
import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash'
import { useAlert } from 'react-alert'
import { requestPostConfig } from 'utils/requests/config'
import Spinner from '../aux/Spinner'


const ConfigTable = (props) => {

  // Data should be an object of config k:v pairs to expose

  const { title, data, setConfig } = props
  const alert = useAlert()

  console.log(`ConfigTable data for ${title}:`);
  console.log(data);

  const debouncedConfigUpdate = useCallback(debounce(
    d => requestPostConfig(d)
      .then(() => alert.show('Config updated', {type: 'success'}))
      .catch(() => alert.show('Error updating config', {type: 'error'}))
  , 1000), [])

  const handleInput = (event, i) => {
    if (event.target.value === null) return
    const data = { [event.target.name]: event.target.value }
    setConfig(i, data)
    debouncedConfigUpdate(data)
  }

  const configRows = data ? data.map( (item, i) =>
    <tr key={item.key}>
      <td>
        {item.key}
        <br />
        <small>{item.help}</small>
      </td>

      <td className="value">
        <input
          name={item.key}
          type={item.type}
          value={data[i].value}
          onChange={event => handleInput(event, i)}
        />
      </td>
    </tr>
  ) : <tr><td colspan="2" className="text-center"> Nothing to show </td></tr>

  return (
    <div className="config-table">
      <h5 className="font-weight-bold" style={{ textTransform: 'capitalize' }}>
        {title || "Configuration"}
      </h5>

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
