import React from 'react'
import { Link } from 'react-router-dom'

const MetamaskNotDetected = () => {
  return (
    <div className='LoadingScreen'>
      <h1 className='HeaderText'>Please install Metamask to continue</h1>
      <br></br>
      <br></br>
      <Link
      to={"/"}
      className= 'Link'
      >
      Back
      </Link>

    </div>
  )
}

export default MetamaskNotDetected