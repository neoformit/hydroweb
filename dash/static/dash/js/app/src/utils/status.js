// Status utilities

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


export const setStatusStyle = (data) => {
  const color = STATUSCOLORMAP[data.text]
  const root = document.documentElement
  root.style.setProperty('--status-font', color.font)
  root.style.setProperty('--status-shadow', color.shadow)
  root.style.setProperty('--status-bg', color.background)
}
