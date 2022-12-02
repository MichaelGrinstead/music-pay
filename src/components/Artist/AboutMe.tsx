import React, {FC, useEffect, useState} from 'react'
import {ethers, Contract} from 'ethers'

type props = {
    // artistProfileContract : Contract | undefined
    clicked: boolean
    setClicked : React.Dispatch<React.SetStateAction<boolean>>
    createInstance : (artist: string) => ethers.Contract
    artistProfileAddress : string
}

const AboutMe : FC<props> = ({createInstance, artistProfileAddress, clicked, setClicked}) => {

    const [aboutArtist, setAboutArtist] = useState("")
    const [update, setUpdate] = useState("")

    const getAboutMe = async () => {
        const artistProfileContract = createInstance(artistProfileAddress)
        const about = await artistProfileContract.aboutMe()
        console.log(about)
        setAboutArtist(about)
    }

    const updateAboutMe = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdate(e.target.value)
    }

    const handleSubmit = async (e : React.KeyboardEvent<HTMLElement>) => {
        const artistProfileContract = createInstance(artistProfileAddress)
        if(e.key === 'Enter'){
            try{
                const updated = await artistProfileContract.updateAboutMe(update)
                await updated.wait()
            }catch(error){

            }finally{
                getAboutMe()
                setClicked(!clicked)
                console.log("submitted")
            }
        }
    }

    useEffect(() => {
        getAboutMe()
    },[])

  return (
    <div>
        <div className='AboutMe'>
            <div className='AboutMeBox' >
                <h4>
                    {aboutArtist}
                </h4>
                <br></br>
                <br></br>
                
                <br></br>
                <br></br>
                { clicked
                
                ?

                <div className='AboutMeUpdate'>
                    <textarea
                    className='AboutMeUpdateBox'
                    placeholder='About...'
                    onChange= {updateAboutMe}
                    onKeyDown= {handleSubmit}
                    >
                    </textarea> 
                </div>
                
                :

                <div></div>}
            
            </div>
        </div>
    </div>
  )
}

export default AboutMe
