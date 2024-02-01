import control from './abis/control'
import BNBU from './abis/BNBU'

export default {
  rpc: 'https://bsc-dataseed1.bnbchain.org',
  browser: 'https://bscscan.com',
  chainId: 56,
  netErrorTxt: 'Please change network to then BSC main network',
  contracts: {
    control: {
      address: "0xDA5E0B6adb78f44e69e643b3BeD91ff1F6225fbA",
      abi: control
    },
    BNBU: {
      address: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
      abi: BNBU
    }
  }
}
