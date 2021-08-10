# ethpoolapp

**VERIFIED CONTRACT** : https://ropsten.etherscan.io/address/0x57c2d3113b5e483f8839248Da50f80eDfeb1EAD0 \
**SUBGRAPH** : https://thegraph.com/studio/subgraph/ethpoolgraph/

## SMART CONTRACT DESIGN (ethPool.sol)

Design can be little tricky because of : \
**Problems:** 
1. How do we distribute rewards ? If we have many users (let's say 10,000), will we update the "Rewards Balance" of all 10k users every time the team adds rewards?
   Such operation can be very expensive storage and operation wise. My design includes calculation of rewards at the time of method call.
2. Different users have different entry point and they are not be eligible for rewards added before their entry into the pool (see challenge example) 

**Solutions:** \
Liquiduty protocols like Uniswap/Compound mint/burn 'aTokens' to solve these issues. I have come up with an innovative algorithim to overcome the above two challenges. 

 *uint256 RewardPerEth = 0 \
  mapping(address=>uint) providers // maintains total deposits of each users \
  mapping(address=>uint) rewards  // maintains RewardPerEth when the user entered the pool \
  RewardPerEth += (weeklyRewardAdded/totalPoolDeposits)* 

 Let us understand above with an example: 
  
**Let's say pool has 500 eth as deposits(userA -->300 eth, userB --> 200 eth) and team adds 50 eth as rewards. Now RewardPerEth = 50/500 = 0.1 reward per eth 
  of deposit.**
   
   *userA{providers[address]:300, rewards[address]: 0} // rewards mapping basically calculates the RewardPerEth when the user entered the pool \
   userB{providers[address]:200, rewards[address]: 0} \
   RewardPerEth = 0.1 ( after team adds rewards)*
   
**User C enters and adds 250 eth more to the pool. Team adds 150 more eth as rewards. Now RewardPerEth = 150/750 = 0.2 reward per eth**   
   
   *userC{providers[address]:250, rewards[address]: 0.1} // For userC, rewards[address] has been set to RewardPerEth when he entered the pool. \
   RewardPerEth = 0.3*
 
**How much rewards will userA , userB and userC get if they want to withdraw at end of week2 ?** \
    userA : (300)*(0.3 - 0.0) = 90 eth // formula = balance*(RewardPerEth at Pool Entry - RewardPerEth current) \
    userB : (200)*(0.3 - 0.0) = 60 eth \
    userC : (250)*(0.3 - 0.1) = 50 eth // 90+60+50 = 200 eth

## SMART CONTRACT TESTS (ethPoolTests.js)

The above smart contract has been thoroughly tested using the chai/mocha framework using the examples given in the challenge statement. 
**Command to run the tests: npx hardhat test**

## SMART CONTRACT SCRIPTS (deploy.js, ropstenDataLoad and getContractData)

Four different accounts were created using Metamask wallet @Ropsten test network and funds were loaded using test faucet. Infura node was setup to connect to Ropsten net. Config is available in hardhat.config. 

**deploy.js** \
Deploys the contract to Ropsten testnet and logs the address of the deployed contract

**ropstenDataLoad** \
This script has been used for the following: (1) Perform depositEth() from users (2) perform depositRewards() from team (3) Provide methods to query contract state using ethers.provider. In order to use this script, please setup metamask ropsten account/accounts and provide the sa

**getContractData** \
This script provides methods to : readUserBalance, readContractBalance, readTotalDeposits and readTotalRewards

**Note: In order to use these scripts and read from/write to the smart contract, please setup metamask ropsten account/accounts and provide the wallet key in the sample.env file**

## GraphQL Design
Ideal graphQL design would look like something this:

*type ethPool @entity { \
  id: ID! \
  address: Bytes!     \
  totalDeposits: BigInt! # uint256     \
  totalRewards: BigInt! # uint256     \
  Users: User   \
}   \
type User @entity {   \
  id: ID!   \
  address: Bytes!  \
  totalEthProvided: BigInt! # uint256   \
  deposits : Deposit   \
  withdrawals : Withdrawal  \
} \
type Deposit @entity {  \
  id: ID!  \
  timestamp: Int!  \
  amount: BigInt! # uint256   \
}   \
type Withdrawal @entity {  \
  id: ID!  \
  timestamp: Int!  \
  amount: BigInt! # uint256  \
}*

## HOW TO RUN PROJECT ON YOUR LOCAL

1. Pull the project using git clone {url}
2. npm update (this will download all dependencies)
3. npx hardhat compile
4. npx hardhat test
5. npx hardhat node
6. npx hardhat run scripts/deploy.js

You can modify the smart contract to make your own liquidity pool and deploy it easily using the above steps




