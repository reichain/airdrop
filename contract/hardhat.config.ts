import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'solidity-coverage'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.13',
  networks: {
    rei: {
      url: 'https://rei-rpc.moonrhythm.io',
      chainId: 55555,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: ':D',
    customChains: [
      {
        network: 'rei',
        chainId: 55555,
        urls: {
          apiURL: 'https://reiscan.com/api',
          browserURL: 'https://reiscan.com/'
        }
      }
    ]
  }
}

export default config
