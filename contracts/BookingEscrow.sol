// SPDX-License-Identifier: GPL-3.0

import "./ProofOfPayment.sol";
import "./PerformanceContract.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity 0.8.17;

contract BookingEscrow {

    ERC20 DAI;
    ProofOfPayment proofOfPayment;

    enum PaymentState {
        NO_PAYMENT_MADE, 
        DEPOSIT_PAID, 
        PERFORMANCE_FINALISED, 
        PAYMENT_FINALISED, 
        COMPLETE
        }

    PaymentState currentState;

    address public artist;
    address public bookingAgent;
    string public bookingAgentName;
    uint256 public gigNumber;
    uint256 public payment;

    bool public performanceConfirmedArtist;
    bool public performanceConfirmedAgent;

    mapping(uint => address) public gigNumberToBookingAgent;
    
    constructor(
        address _artist,
        address _bookingAgent, 
        string memory _bookingAgentName,
        uint _gigNumber, 
        uint256 _payment
        ) payable {
        artist = _artist;
        bookingAgent = _bookingAgent;
        bookingAgentName = _bookingAgentName;
        gigNumber = _gigNumber;
        payment = _payment;
        DAI = ERC20(0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60);

        currentState = PaymentState.NO_PAYMENT_MADE;
        
    }

    function payDeposit() external {
        require(msg.sender == bookingAgent);
        bool success = DAI.transferFrom(msg.sender, address(this), payment / 5);
        require(success);

        currentState = PaymentState.DEPOSIT_PAID;

    }

    function confirmPerformance() external {
        if(msg.sender == artist) {
            performanceConfirmedArtist = true;}
        else if(msg.sender == bookingAgent) {
            performanceConfirmedAgent = true;
        }if(performanceConfirmedArtist && performanceConfirmedAgent){
            currentState = PaymentState.PERFORMANCE_FINALISED;
        }
    }

    function finalisePayment() external {
        require(msg.sender == bookingAgent);

        // bool confirmed = performanceContract.confirmPerformance(gigNumber);
        bool success = DAI.transferFrom(msg.sender, address(this), payment * 4/5);
        // require(confirmed);
        require(success);

        currentState = PaymentState.PAYMENT_FINALISED;

        transferPayment();
    }

    function transferPayment() internal {
        require(currentState == PaymentState.PAYMENT_FINALISED);
        require(DAI.balanceOf(address(this)) == payment);
        DAI.transfer(artist, DAI.balanceOf(address(this)));

    }

}