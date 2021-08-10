const { expect } = require("chai");

// These test cases cover almost all scenarious for our NFT Market application

describe("Exhaustive testing: NFT MarketPlace", function () {
	
	let teamaddr, addr1, addr2,addr3 
	let ethpool,ethpooladdress

	before(async function (){
		[teamaddr, addr1, addr2,addr3 ] = await ethers.getSigners();
	});
	
	
	it("Deploy ethPool Contract", async function () {
	/* Deploy the Auction Market Place*/  
		await console.log("Deploying Smart Contracts...")
		const market = await ethers.getContractFactory("ethPool")
		ethpool = await market.deploy()
		await ethpool.deployed()
		ethpooladdress = ethpool.address
		await console.log(ethpooladdress)
	});
	

    it("addr1 and addr2 deposit 50 and 100 eth respectively", async function () {
		await ethpool.connect(addr1).depositEth({ value: ethers.utils.parseEther("50") })
		await ethpool.connect(addr2).depositEth({ value: ethers.utils.parseEther("100") })
/*		var add1bal = await addr1.getBalance() // calculating previous bidder's balance
		var address1Balance = ethers.utils.formatEther(add1bal)	
		console.log(address1Balance)
		var add2bal = await addr2.getBalance() // calculating previous bidder's balance
		var address2Balance = ethers.utils.formatEther(add2bal)	
		console.log(address2Balance) */
		var add2bal = await ethpool.getContractBalance() // calculating previous bidder's balance
		var address2Balance = ethers.utils.formatEther(add2bal)	
	});
	
    it("Someone else besides the team tries to add rewards", async function () {
		await expect(ethpool.connect(addr1).addRewards({ value: ethers.utils.parseEther("50") })).to.be.revertedWith("Only team can deposit rewards")
	});	
	
    it("Team adds total of 30 eth to rewards pool", async function () {
		ethpool.connect(teamaddr).addRewards({ value: ethers.utils.parseEther("30") })
	});		
	
    it("addr2 tries to withdraw half of his liquidity : 50 eth", async function () {
		var add2bal = await addr2.getBalance() // calculating previous bidder's balance
		var address2Balance = ethers.utils.formatEther(add2bal)	
		console.log(address2Balance) 		
		console.log("addr2 should get 50 + 30*(1/3) = 60 eth")
		var num = BigInt(50000000000000000000)
		await ethpool.connect(addr2).withdrawEthBalance(num)
		var add3bal = await addr2.getBalance() // calculating previous bidder's balance
		var address3Balance = ethers.utils.formatEther(add3bal)	
		await console.log(address3Balance) 		
	});

    it("addr3 adds : 100 eth", async function () {
		await ethpool.connect(addr3).depositEth({ value: ethers.utils.parseEther("100") })
	});	
	
    it("addr3 tries to withdraw his liquidity. Shouldn't receive any bonus.", async function () {
		var add2bal = await addr3.getBalance() // calculating previous bidder's balance
		var address2Balance = ethers.utils.formatEther(add2bal)	
		console.log(address2Balance) 		
		console.log("addr3 should get 50 eth")
		var num = BigInt(50000000000000000000)
		await ethpool.connect(addr3).withdrawEthBalance(num)
		var add3bal = await addr3.getBalance() // calculating previous bidder's balance
		var address3Balance = ethers.utils.formatEther(add3bal)	
		await console.log(address3Balance) 		
	});	
	
    it("Team adds total of 30 eth to rewards pool", async function () {
		ethpool.connect(teamaddr).addRewards({ value: ethers.utils.parseEther("30") })
	});		
	
    it("addr3 tries to withdraw his liquidity. Shouldn't receive any bonus.", async function () {
		// addr1 should receive : 50 eth + 1/3rd of 30 + 1/3rd of 30 = 70 eth
		var add2bal = await addr1.getBalance() // calculating previous bidder's balance
		var address2Balance = ethers.utils.formatEther(add2bal)	
		console.log(address2Balance) 		
		console.log("addr3 should get 70 eth")
		var num = BigInt(49999990000000000000)
		await ethpool.connect(addr1).withdrawEthBalance(num)
		var add3bal = await addr1.getBalance() // calculating previous bidder's balance
		var address3Balance = ethers.utils.formatEther(add3bal)	
		await console.log(address3Balance) 		
	});		
	

 });
  
  function sleep(milliseconds) {
	  const date = Date.now();
	  let currentDate = null;
	  do {
		currentDate = Date.now();
	  } while (currentDate - date < milliseconds);
}
