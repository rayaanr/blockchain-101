# Hardhat Setup

Get started with Hardhat for Ethereum smart contract development using this quick guide.

## Key Concepts

- **`hardhat.config.js`**: The main configuration file for your project. If you encounter issues, check this file first.
- **Artifacts Folder**: Compiled contracts (ABIs and bytecode) are stored in the `/artifacts` directory after compilation.

## Quick Setup Steps

1. **Create a Project Directory**: `mkdir hardhat-tutorial` & `cd hardhat-tutorial`
2. **Initialize `package.json`**: `bun init -y`
3. **Install Dependencies**: `bun i --save-dev hardhat dotenv`
4. **Create a `.env` File**: `touch .env` and add your environment variables (e.g., `MNEMONIC`, `PRIVATE_KEY`, `ALCHEMY_TESTNET_RPC_URL`) to this file.
5. **Initialize Hardhat**: `npx hardhat`
    - Choose "Create a basic sample project".
    - Accept defaults and confirm dependency installations.
6. **Configure `hardhat.config.js`**
    - Config accounts and networks
        
        ```jsx
        import { HardhatUserConfig } from "hardhat/config";
        import "@nomicfoundation/hardhat-toolbox";
        import { HttpNetworkAccountsUserConfig } from "hardhat/types";
        require("dotenv").config();
        
        // Set your preferred authentication method (mnemonic or private key)
        const MNEMONIC = process.env.MNEMONIC;
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        
        const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
            ? { mnemonic: MNEMONIC }
            : PRIVATE_KEY
            ? [PRIVATE_KEY]
            : undefined;
        
        if (!accounts) {
            console.warn("No MNEMONIC or PRIVATE_KEY found.");
        }
        
        // Configure networks
        const config: HardhatUserConfig = {
            solidity: "0.8.24",
            networks: {
                sepolia: {
                    url: process.env.ALCHEMY_TESTNET_RPC_URL,
                    accounts,
                },
            },
        };
        
        export default config;
        ```
        

1. **Write a Smart Contract**:
    - Create `contracts/Counter.sol`:
        
        ```solidity
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.4;
        
        contract Counter {
            uint256 public count;
        
            function inc() public {
                count += 1;
            }
        
            function dec() public {
                require(count > 0, "Counter is zero");
                count -= 1;
            }
        }
        ```
        
2. **Create a Deployment Script**:
    - Create `scripts/deploy.js`:
        
        ```jsx
        import hre from "hardhat";
        
        async function main() {
            const Counter = await hre.ethers.getContractFactory("Counter");
            const counter = await Counter.deploy();
        
            await counter.waitForDeployment();
        
            console.log("Counter deployed to:", await counter.getAddress());
        }
        
        main()
            .then(() => process.exit(0))
            .catch((error) => {
                console.error(error);
                process.exit(1);
            });
        ```
        
3. **Deploy the Contract**:
    - Compile the contracts (Optional): `npx hardhat compile`
    - Deploy locally (Hardhat Network): `npx hardhat run scripts/deploy.js`
    - Deploy to Sepolia testnet: `npx hardhat run scripts/deploy.js --network sepolia`

Now you're ready to develop and deploy smart contracts using Hardhat!