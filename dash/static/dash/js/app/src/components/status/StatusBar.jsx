import React from 'react'

const StatusBar = (props) => {

  const currentStatus = props.status.text

  return (
    <div className={"status-bar " + currentStatus}>
      <p>
        <span> Status </span>
        <span>
          { currentStatus }
        </span>
      </p>
    </div>
  )

}

export default StatusBar
