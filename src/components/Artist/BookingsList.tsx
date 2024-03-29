import React, {FC, ReactElement, useContext} from 'react'
import {BigNumber} from 'ethers'
import Booking from './Booking'
import ArtistContext from '../../Context/ArtistContext'
import {motion} from 'framer-motion'
import ArtistHeader from './ArtistHeader'
import LogOut from '../shared/LogOut'
import ArtistInfo from './ArtistInfo'


/**
 * Displays all current bookings for the artist user  
 */

const BookingsList :FC = () : ReactElement => {

    /// access context state variables
    const {bookings, artistLoggedIn, isHovering} = useContext(ArtistContext)

    /// map through bookings array and display each booking
    const displayBooking = bookings.map((booking : any[]) =>  
        <Booking
        gigNumber= {(BigNumber.from(booking[0])).toString()}
        payment={(BigNumber.from(booking[1])).toString()}
        time= {(BigNumber.from(booking[2])).toString()}
        date = {booking[3]}
        venue = {booking[4]}
        agreed = {booking[6]}
        completed = {booking[7]}
        />
    )

    return(
        <div
        style={{
            height: "100%", 
            width: "100%",  
        }}
        > 
            <ArtistHeader/>
            {isHovering
            ?
            <ArtistInfo/>
            :
            <></>
            }
            <motion.div 
            initial= {{opacity: 0}}
            animate= {{opacity: 1}}
            exit= {{opacity: 0}}
            style={{width: "100%",  textAlign: "center", marginTop: "5%"}}
            >
                {bookings.length === 0
                ?
                <h1 className='Text' style={{fontSize: "30px", marginTop: "18%"}}> You currently have no Bookings</h1>
                :
                <div
                className='BookingsDiv'
                style={{
                    color: "grey", 
                    fontSize: "23px",
                    borderBottom: "dotted",
                    borderColor: "grey",
                    borderWidth: "1px",
                    position: "sticky",
                    width: "80%",
                    marginLeft: "auto", 
                    marginRight: "auto",
                    
                }}
                >
                    <h4 style={{width: "7.5%"}}>Booking</h4>
                    <h4 style={{width: "7.5%"}}>Venue</h4>
                    <h4 style={{width: "7.5%"}}>Date</h4>
                    <h4 style={{width: "7.5%"}}>Payment</h4>
                    <h4 style={{width: "7.5%"}}>Time</h4>
                    <h4 style={{width: "7.5%"}}>Status</h4>
                    <h4 style={{width: "7.5%", color: "black"}}>Hidden</h4>
                    
                </div>
                }
                <motion.div
                className='BookingsList'
                style={{
                width: "80%",
                marginLeft: "auto", 
                marginRight: "auto",
                }}
                initial= {{opacity: 0}}
                animate= {{opacity: 1}}
                exit= {{opacity: 0}}
                >
                    {displayBooking}
                </motion.div>
            </motion.div>
            {artistLoggedIn
            ?
            <LogOut/>
            :
            <></>   
            }
           
        </div>
    )
}

export default BookingsList
