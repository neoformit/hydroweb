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
        unit: '%',
      },
      ph: {
        text: 'pH',
        status: 'normal',
        value: 6.12,
        unit: '',
      },
      ec: {
        text: 'EC',
        status: 'normal',
        value: 1.87,
        unit: 'mS',
      },
      temperature: {
        text: 'Temperature',
        status: 'normal',
        value: 21,
        unit: '°C',
      },
      pressure: {
        text: 'Pressure',
        status: 'normal',
        value: 124,
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
