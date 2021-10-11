// Status functions

export const STATUSCOLORMAP = {
  'normal': {
    font: 'darkgreen',
    shadow: 'forestgreen',
    background: 'lime',
  },
  'warning': {
    font: 'saddlebrown',
    shadow: 'orange',
    background: 'yellow',
  },
  'danger': {
    font: 'firebrick',
    shadow: 'red',
    background: 'salmon',
  },
}

export const getStatus = () => {
  return {
    text: 'normal',
    params: {
      depth: {
        text: 'Depth',
        status: 'normal',
        value: 30,
        percent: 0.45,
        unit: '%',
      },
      ph: {
        text: 'pH',
        status: 'normal',
        value: 6.12,
        percent: 0.45,
        unit: '',
      },
      ec: {
        text: 'EC',
        status: 'normal',
        value: 1.87,
        percent: 0.45,
        unit: 'mS',
      },
      temperature: {
        text: 'Temp',
        status: 'normal',
        value: 21,
        percent: 0.45,
        unit: '°C',
      },
        pressure: {
        text: 'Pressure',
        status: 'normal',
        value: 124,
        percent: 0.45,
        unit: 'psi',
      },
    },
  }
}

export const setStatusStyle = (data) => {
  const color = STATUSCOLORMAP[data.text]
  const root = document.documentElement
  root.style.setProperty('--status-font', color.font)
  root.style.setProperty('--status-shadow', color.shadow)
  root.style.setProperty('--status-bg', color.background)
  root.style.setProperty(
    '--depth', `${data.params.depth.value}%`)
}
