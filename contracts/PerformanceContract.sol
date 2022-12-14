// SPDX-License-Identifier: GPL-3.0

import "./ArtistFactory.sol";
import "./ArtistProfile.sol";
import "./ProofOfBooking.sol";
import "./ProofOfPayment.sol";
import "./BookingEscrow.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity 0.8.17;


contract PerformanceContract {
    using Strings for uint256;

/// Types

    ArtistFactory artistFactory;

// Events

    
    event BookingFeePaid (bool _depositPaid);

// Constructor

    constructor(address _artistFactory) {
        artistFactory = ArtistFactory(_artistFactory);
    }

// Public

    // Create the Booking - intialiased by the booking agent

    function createBooking(
        address payable _artist,
        string memory _artistName,
        string memory _bookingAgentName,
        uint _payment, 
        uint _time,
        string memory _venueName,
        string memory _date 
        
        ) external {       
        require(artistFactory.doesArtistExist(_artistName));
        
        ArtistProfile artist = ArtistProfile(_artist);
        
        artist.updateBooking(
            _artist,
            _artistName,  
            msg.sender, 
            _bookingAgentName,
            _payment, 
            _time,
            _venueName, 
            _date 
            );
    }


 

    // Booking agent confirms the performance was completed

    // function confirmPerformance(uint _gigNumber) public returns(bool confirmed) {
    //     Booking storage booking = Bookings[_gigNumber];

    //     require(msg.sender == booking.bookingAgent);
    //     require(block.timestamp > booking.time);
    //     require(booking.depositPaid);
    //     require(booking.currentState == State.bookingComplete);

    //     booking.currentState = State.performanceCompleted; 

    //     return confirmed;
    // }



// View

    // Returns true if the performance time has passed 

    // function isPerformanceComplete(uint _gigNumber) external view returns(bool){
    //     Booking storage booking = Bookings[_gigNumber];

    //     bool complete;
    //     block.timestamp > booking.time ? complete =  true : complete = false;

    //     return complete;
    // }


    // Returns true if the deposit has been paid 

    // function beenPaid(uint _gigNumber) external view returns(bool) {
    //     Booking storage booking = Bookings[_gigNumber];

    //     bool paid;
    //     booking.depositPaid == true ? paid = true : paid = false;
       
    //     return paid;

    // } 

    receive() external payable {}

    fallback() external payable {}


}