import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-deploy";
import * as dotenv from "dotenv";

dotenv.config();


const config: HardhatUserConfig = {

	networks: {
		hardhat: {
		  	// allowUnlimitedContractSize: true,

		},

		goerli: {
			url: process.env.GOERLI_URL || "",
			accounts: !!process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
			// gas: 2100000,
			// gasPrice: 8000000000,
			saveDeployments: true,
		},

		mumbai: {
			url: process.env.MUMBAI_URL || "",
			accounts: !!process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
			// gas: 2100000,
			// gasPrice: 8000000000,
			saveDeployments: true,
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
