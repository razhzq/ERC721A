require('dotenv').config();
const { MNEMONIC } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  networks: {
    polygon: {
      networkCheckTimeout: 999999,
      provider: () => new HDWalletProvider(MNEMONIC, `https://polygon-mumbai.g.alchemy.com/v2/I9k_EQCfvzjTOKfEp7EM2PJJ0HVYiNSK`),
      network_id: '80001',
      gas: 6721975, 
      confirmations: 1,
      timeoutBlocks: 200,
      // websockets: true,
      // timeoutBlocks: 200,
       skipDryRun: true
    },
    arbitrum: {
      networkCheckTimeout: 999999,
      provider: () => new HDWalletProvider(MNEMONIC, `https://arb-mainnet.g.alchemy.com/v2/0PGHQtXYCy4Qcro4cpW-Q2lKMUfAaHR0`),
      network_id: '42161',
      gasLimit: 7721975, 
      confirmations: 2,
      networkCheckTimeout: 10000,

      // timeoutBlocks: 200,
      
    }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17" ,// Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
       enabled: true,
        runs: 200
       },
      //  evmVersion: "byzantium"
      // }
    }
  },
  api_keys: {
    polygonscan: '1451VSJYAXQ5DETUGS4AX7ZQFDE6WGBMK7',
    arbiscan: '7SZ8G2NCGSUQD27M8ST776TYPUKKJMEDE7',
  },
  plugins: ['truffle-plugin-verify'],


};
