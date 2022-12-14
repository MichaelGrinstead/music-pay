import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"
import MockDaiABI from "../ABI/MockDai"

declare var window: any

//Goerli

// const MockDaiAddress = "0xa73BD0bB26b0587C004A95D3FB2B655c86685CC0"
// const ArtistFactoryAddress = "0xA2a3DC7c94CEC1916cf68ADCE526987E3caA4A22"
// const PerformanceContractAddress = "0x2284036b628CF910B708893BB8590B2842752200"

///Mumbai

const MockDaiAddress = "0x1023acA55D6aA1A8Dd0AcA62C6d559EdD09486F8"
const ArtistFactoryAddress = "0x41A68550EcE02B3D223C4c168e045b335B2A098f"
const PerformanceContractAddress = "0x9E86c84A90744F774f54aD51273E7B6f38082910"

let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let MockDai : Contract
let ArtistFactoryContract : Contract 
let PerformanceContract : Contract



if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    MockDai = new ethers.Contract(MockDaiAddress, MockDaiABI, signer);
    ArtistFactoryContract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer); 
    PerformanceContract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
}   

export {provider, signer, ArtistFactoryContract, PerformanceContract, MockDai}
