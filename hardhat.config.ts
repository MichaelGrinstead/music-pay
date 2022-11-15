import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-deploy";

const config: HardhatUserConfig = {

	networks: {
		hardhat: {
		  	// allowUnlimitedContractSize: true,

		},

		goerli: {
			url: "https://eth-goerli.g.alchemy.com/v2/Gw-Mfv6jFIx2Tqa2YnudVC0CiR2aXuJc",
			accounts: ["7363382128d3c7fa0aa2226fc650586b55c5a70d1401fff1e0f43c97f49a15d1"]
		}
	},

	solidity: {
		version: "0.8.17",
		settings: {
			optimizer: {
				enabled: true,
				runs: 1
			}
		}
	},

	namedAccounts: {
		deployer: 0,
		alice: 1,
		bob: 2,
		carol: 3,
		derrick: 4,
	},
};

export default config;