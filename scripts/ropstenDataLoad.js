const { ethers } = require("hardhat");
const ethPool = require("../artifacts/contracts/ethPool.sol/ethPool.json");
require('dotenv').config();

async function main() {
	
	var provider = ethers.providers.getDefaultProvider('ropsten');
	var privateKey1 = process.env.teamkey;
	var privateKey2 = process.env.key1;
	var privateKey3 = process.env.key2;
	var teamWallet = new ethers.Wallet(privateKey1,provider);
	var wallet1 = new ethers.Wallet(privateKey2,provider);
	var wallet2 = new ethers.Wallet(privateKey3,provider);

	var contractAddress = '0x57c2d3113b5e483f8839248Da50f80eDfeb1EAD0';
	var contract = new ethers.Contract(contractAddress,ethPool.abi);
	
	/*User1 and User2 deposit 0.5 and 1 eth respectively */
	var tx1 = await contract.connect(wallet1).depositEth({ value: ethers.utils.parseEther("1.2") })
	var tx2 = await contract.connect(wallet2).depositEth({ value: ethers.utils.parseEther("0.7") })

	/*Team adds 1 eth rewards*/
	var tx3 = await contract.connect(teamWallet).addRewards({ value: ethers.utils.parseEther("0.8") })
	



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
