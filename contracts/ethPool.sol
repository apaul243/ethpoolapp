// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract ethPool {
    
    using SafeMath for uint;
    
    struct ethProvider {
        uint256 balance;
        uint256 rewardsTillNow;
    }
    
    event rewardamount(uint256 amt);
    
    address private teamAddress;
    uint256 rewardBalance;
    uint256 totalBalance;
    uint256 rewardPerEth;
    uint256 totalRewardPerEth;

    constructor(){
        teamAddress = msg.sender;
        rewardBalance = 0;
    }
    
    mapping(address=>ethProvider) providers;

    
    function depositEth() public payable {
        require(msg.value >0,"Deposit amount has to be more than 0");  
        providers[msg.sender].balance += msg.value;
        providers[msg.sender].rewardsTillNow = totalRewardPerEth;
        totalBalance += msg.value;
    }
    
    function addRewards() public payable {
      //  require(msg.sender == teamAddress,"Only team can deposit rewards"); 
        require(msg.value > 0,"Deposit amount has to be more than 0");  
        rewardBalance += msg.value;
        rewardPerEth = msg.value/totalBalance;
        emit rewardamount(rewardPerEth);
        totalRewardPerEth += rewardPerEth;
        
      /*  for(uint memory i=0;i<users.length;i++) {
            uint256 rewardToBeAdded = (rewardBalance - providers[users[i]].rewardsTillNow)*(providers[users[i]].deposit)/totalBalance;  
            providers[users[i]].rewardsAccrued = providers[users[i]].rewardsAccrued + rewardToBeAdded;
        } */
    }
    
    function withdrawEthBalance(uint256 amount) public payable {
        require(amount > 0,"Deposit amount has to be more than 0");  
        require(amount < providers[msg.sender].balance,"Cannot withdraw more than you have");
        uint256 rewardAmount = (totalRewardPerEth - providers[msg.sender].rewardsTillNow)*amount;
        emit rewardamount(rewardAmount);
        uint256 withdrawAmount = amount + rewardAmount;
        emit rewardamount(withdrawAmount);
        providers[msg.sender].balance -= amount;
        totalBalance -= amount;
        rewardBalance-= rewardAmount;
        payable(msg.sender).transfer(withdrawAmount);
    }
    
    
    function getRewardBalance() public view returns (uint) {
         return address(this).balance;
    }
        
    
    
}