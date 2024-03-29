import React, {useState, FC, ReactElement} from 'react'
import {useNavigate} from 'react-router-dom'
import {ArtistFactoryContract, signer} from "../../Contracts/ContractObjects"
import {motion} from 'framer-motion'
import Home from '../shared/Home'

/*
 * A form for logging in to an existing artist profile.
 */

const Login : FC = () : ReactElement => {

    const navigate = useNavigate()

    /// state
    const [inputArtistName, setInputArtistName] = useState("")

/// User Actions

    /* 
    checks if the artist exists and if the user is the owner of the artist
    profile before logging in and navigating to the artist profile page 
    */
    const handleSubmitLogIn = async () => {
        const address = await ArtistFactoryContract.artistNameToAddress(inputArtistName)
            const user = await signer.getAddress()
            if(await ArtistFactoryContract.doesArtistExist(inputArtistName) === false){
                navigate("/ProfileDoesNotExist")
            }else if(await ArtistFactoryContract.ownerToArtist(user) === address){
                navigate("/ArtistProfile")
            }else{
                navigate("/NotOwner")
            }  
    }

/// Event Handlers

    /// handles the change of the name input field
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
    }  

    /// handles the keydown event of the name input field
    const handleKeyDownLogIn = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){

            const address = await ArtistFactoryContract.artistNameToAddress(inputArtistName)
            const user = await signer.getAddress()
            if(await ArtistFactoryContract.doesArtistExist(inputArtistName) === false){
                navigate("/ProfileDoesNotExist")
            }else if(await ArtistFactoryContract.ownerToArtist(user) === address){
                navigate("/ArtistProfile")
            }else{
                navigate("/NotOwner")
            }             
        }
    }



  return (
    <div
    style={{height: "100%"}}
    >
        <div
        style={{height: "80px", display: "flex", alignItems: "center"}}
        >
            <Home/>
        </div>
        <motion.div
        className= 'CreateOrLogInArtist'
        style={{textAlign: "center", height: "100%"}} 
        initial= {{opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}}
        >
            <h3 
            className= "Text"
            style={{fontSize: "40px", marginTop: "50%", marginBottom: "0"}}
            >Log in to Music-Pay</h3>
            <input
            className= 'Input'
            style={{
                width: "70%",
                borderBottom: "solid",
                borderWidth: "1px",
                borderColor: "grey"
            }} 
            placeholder= 'Artist Name' 
            onChange= {handleChange}
            onKeyDown= {handleKeyDownLogIn}
            />
            
            <button 
            className= 'Submit'
            style={{width: "91%"}}
            onClick= {handleSubmitLogIn}
            >
            LOG IN
            </button>
        </motion.div>

        
    </div>
  )
}

export default Login
