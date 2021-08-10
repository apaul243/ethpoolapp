const { ethers } = require("hardhat");
const ethPool = require("../artifacts/contracts/ethPool.sol/ethPool.json");
require('dotenv').config();

var provider = ethers.providers.getDefaultProvider('ropsten');
var privateKey = process.env.key1;
var wallet = new ethers.Wallet(privateKey,provider);
var contractAddress = '0x57c2d3113b5e483f8839248Da50f80eDfeb1EAD0';
var contract = new ethers.Contract(contractAddress,ethPool.abi);

async function contractBalance() {
	console.log("Getting Contract Balance.....");
	var contractBalance = await contract.connect(wallet).getContractBalance()
	var conBalance = ethers.utils.formatEther(contractBalance)
	console.log(conBalance + " ether")	
}

async function totalDeposits() {
	console.log("Getting Total User Deposits Balance.....");
	var totalBalance = await contract.connect(wallet).getTotalBalance()
	var depositBalance = ethers.utils.formatEther(totalBalance)
	console.log(depositBalance + " ether")	
}


async function rewardsBalance() {
	console.log("Getting Total Rewards Balance.....");
	var rewardBalance = await contract.connect(wallet).getRewardBalance()
	var rewardsBalance = ethers.utils.formatEther(rewardBalance)
	console.log(rewardsBalance + " ether")	
}


async function userBalance(address) {
	console.log("Getting User Balance");
	var contractBalance = await contract.connect(wallet).getUserBalance(address)
	var userBal = ethers.utils.formatEther(contractBalance)
	console.log(userBal + " ether")	
}

contractBalance()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

