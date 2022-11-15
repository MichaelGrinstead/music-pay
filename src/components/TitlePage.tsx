import React, {FC, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import {ArtistFactoryContract, signer, provider}from "../ContractObjects"
import ConnectWallet from './ConnectWallet'
import { unstable_createStaticHandler } from '@remix-run/router'

type props = {
  provider :  ethers.providers.Web3Provider
  notConnected : boolean
  setNotConnected : React.Dispatch<React.SetStateAction<boolean>>
}

const TitlePage : FC<props> = ({provider, notConnected, setNotConnected}) => {

 

  return (
    <div className= 'TitlePage'>
        <ConnectWallet
        provider= {provider}
        notConnected= {notConnected}
        setNotConnected= {setNotConnected}
        />


    </div>
  )
}

export default TitlePage