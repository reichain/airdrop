import Web3Modal from 'web3modal'
import { getNetworkConnectors } from './getNetworkData'

const web3Modal = new Web3Modal(getNetworkConnectors())

export const createWeb3Modal = () => web3Modal
