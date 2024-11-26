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
