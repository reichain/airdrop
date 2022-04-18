import { NetworkToken } from 'helpers/getNetworkData'
import { TokenType } from '../types'

export const tokens: NetworkToken[] = [
    {
        type: 'native',
        name: 'REI',
        symbol: 'REI',
        address: 'native',
        wAddress: '0x7539595ebdA66096e8913a24Cc3C8c0ba1Ec79a0',
        decimals: 18,
        logoURIs: ['./images/token/REI.svg'],
    },
    {
        type: TokenType.COIN,
        name: 'BNB',
        symbol: 'BNB',
        address: '0xf8aB4aaf70cef3F3659d3F466E35Dc7ea10d4A5d',
        decimals: 18,
        logoURIs: ['./images/token/BNB.svg'],
    },
    {
        type: TokenType.COIN,
        name: 'Killswitch Token',
        symbol: 'KSW',
        address: '',
        decimals: 18,
        logoURIs: ['./images/token/KSW.svg'],
    },
]
