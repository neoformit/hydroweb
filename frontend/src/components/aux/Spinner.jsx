import React from 'react'

import LoadingSpinner from 'assets/img/spinner.svg'

const Spinner = (props) => {
  return (
    <img
      className="spinner"
      src={LoadingSpinner}
      width={props.width ? props.width : 'auto'}
      height={props.height ? props.height : 'auto'}
      style={{
        margin: props.margin ? props.margin : '0',
      }}
    />
  )
}

export default Spinner
