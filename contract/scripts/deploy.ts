import { ethers } from 'hardhat'
import { Airdrop__factory } from '../typechain'

const signer = ''

async function main() {
  const C = new Airdrop__factory((await ethers.getSigners())[0])
  const c = await C.deploy(signer)
  await c.deployed()

  console.log('Airdrop deployed to:', c.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
