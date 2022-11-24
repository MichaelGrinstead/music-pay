import React, {FC, useState, ReactElement} from 'react'
import { Link } from 'react-router-dom'
import Home from "./Home"
import SearchArtist from "../shared/SearchArtist"

type props = {
    // search : (e: React.ChangeEvent<HTMLInputElement>) => void
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    // submitSearch : (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>
    // searchArtist :  React.FC<props>
}

const ArtistHeader : FC<props> = ({setArtistAddress}) : ReactElement => {

    const [searchClicked, setSearchClicked] = useState(false)
  
  return(
    
    <header className='Header'>
      <Home/>
      <Link
      className='About' 
      to= "/Login"
      >
      About
      </Link>
      <div className='Search'>
        <h3
        className='SearchText'
        onClick= {() => setSearchClicked(!searchClicked)}
        >
        Search
        </h3>
        {searchClicked 
          ? 
        <SearchArtist
        setArtistAddress={setArtistAddress}
        />
          :
        <></>
        }
      </div>
    </header>
  )
}

export default ArtistHeader