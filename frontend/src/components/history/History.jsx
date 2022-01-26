// Display historical data with plotly chart

import React from 'react'
import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';

import { getHistory } from 'utils/requests/history'
import Spinner from '../aux/Spinner'


const mobile = window.innerWidth < 576;

const colorMap = {
  ec: '#7ed321',         // green
  ph: '#d52fb3',         // pink
  volume: '#007bff',     // blue
  pressure: '#cc3300',   // goldenrod
  temperature: '#000000',
}


const History = props => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(1)

  useEffect( () => {
    getHistory().then( data => {
      console.log('API getHistory:')
      console.log(data)
      setData(data)
      setLoading(0)
    })
  }, [])

  const plots = data ? Object.keys(data).filter( k => k !== 'date' ).map( key => {
    console.log(`Create plot data for ${key}`);
    return (
      <Plot
        key={key}
        data={[{
          x: data.date.data,
          y: data[key].data,
          name: data[key].text,
          type: 'scatter',
          mode: 'lines',
          line: {
            color: colorMap[key],
            shape: 'spline',
          },
        }]}
        layout={{
          autosize: false,
          width: mobile ? 400 : 650,
          height: mobile ? 250 : 400,
          margin: {
            l: 25,
            r: 25,
            b: 25,
            t: 25,
            pad: 3
          },
          xaxis: {
            type: 'date',
            automargin: true,
          },
          yaxis: {
            title: `${data[key].text} ${data[key].unit}`,
            automargin: true,
          },
          plot_bgcolor: `${colorMap[key]}10`,
        }}
      />
    )
  }) : null

  return (
    loading ? <Spinner /> :
    <>
      <h3>History</h3>

      <div className="history">
        {plots}
      </div>
    </>
  )
}

export default History
