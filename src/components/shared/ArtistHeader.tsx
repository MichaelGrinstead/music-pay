import React, {FC, ReactElement, useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import Home from "./Home"
import ArtistContext from '../../context/ArtistContext'


type props = {
		displayUpdateAboutMe : () => void
		displayBookings : () => void
}
const ArtistHeader : FC<props> = ({
		displayUpdateAboutMe,
		displayBookings,  
	}) : ReactElement => {

		const {
			artistAddress, 
			artistProfileAddress, 
			artistLoggedIn, 
			createArtistProfileInstance,
			getArtistConnected
		} = useContext(ArtistContext)


		const [name, setName] = useState("")


		const getArtistName = async () => {
			const artistProfile = createArtistProfileInstance(artistProfileAddress)
			const name = await artistProfile.artistName()
			console.log(name)
			setName(name)
		}

			useEffect(() => {
				getArtistConnected()
			},[artistLoggedIn])

			useEffect(() => {
				getArtistName()
			},[artistProfileAddress])

			console.log(artistProfileAddress)

		return(
			
			<header className='Header'>
				<div className='HomeHeader'>
					<Home/>
				</div>
				<Link
				className='About' 
				to= "/Login"
				>
				About
				</Link>
				<Link
				className='Create' 
				to= "/CreateNew"
				>
				Create
				</Link>
				{artistLoggedIn 
				? 
				<h1 className='ArtistName'>{name}</h1>
				: 
				<Link
				className='Login' 
				to= "/Login"
				>
				Login
				</Link>
				}
				{artistLoggedIn 
				?
				<h4  
				className='UpdateAboutMe'
				onClick= {displayUpdateAboutMe} 
				>
					Update
				</h4>
				:
				<></>
				}
				{artistLoggedIn 
				?
				<h4
				className='DisplayBookings'
				onClick={displayBookings}
				>
					Bookings
				</h4>
				:
				<></>
				}
			</header>
		)
}

export default ArtistHeader



/////figure out logged in conditions!