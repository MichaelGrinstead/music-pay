import React, {useState, FC} from 'react'
import { Contract } from 'ethers'
import {useNavigate} from 'react-router-dom'

type props = {
    artistName : string
    artistProfileAddress : string
    ArtistFactoryContract : Contract
    artistLoggedIn : boolean
    setArtistLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}

const Login : FC<props> = ({ArtistFactoryContract}) => {

    const [inputArtistName, setInputArtistName] = useState("")

    const navigate = useNavigate()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputArtistName(e.target.value)
    }  

    const handleSubmitLogIn = async () => {
        navigate("/Loading")
        try{
            const transaction = await ArtistFactoryContract.createArtist(inputArtistName)
            await transaction.wait()

            navigate("/Profile")
        }catch(e){
            navigate("/NotOwner")
        }   
    }

  return (
    <div className= 'CreateArtist'>

        <h3 className= "HeaderText">Login</h3>
        <input
        className= 'Inputs'
        placeholder= 'Artist Name' 
        onChange= {handleChange}
        >
        </input> 
        <button 
        className= 'Submit' 
        onClick= {handleSubmitLogIn}
        >
        Log In
        </button>
        
    </div>
  )
}

export default Login
