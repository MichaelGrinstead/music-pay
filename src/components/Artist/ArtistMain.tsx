import React, {FC, useContext, ReactElement} from 'react'
import ArtistHeader from '../shared/ArtistHeader'
import ArtistContext from '../../Context/ArtistContext'
import {motion} from 'framer-motion'
import LogOut from '../shared/LogOut'

const ArtistMain : FC = () : ReactElement => {

    const {artistLoggedIn, artistConnected} = useContext(ArtistContext)

    return (      
        <motion.div
        style={{height: "100%", overflow: "hidden"}}
        initial= {{opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}} 
        transition={{duration: 0.2}}
        >
            <ArtistHeader/>
            {artistLoggedIn === false && artistConnected === false         
            ?           
            <motion.div 
            style= {{height: "100%", textAlign: 'center', marginTop: '280px'}}       
            >
                <h3 
                className='Text'
                style= {{fontSize: '80px', letterSpacing: "3px"}}
                >Welcome to Music-Pay for Artists
                </h3>
            </motion.div>
            :
            <></>
            }
            {artistLoggedIn
            ?
            <LogOut/>
            :
            <></>   
            }
        </motion.div>
    )
}

export default ArtistMain
