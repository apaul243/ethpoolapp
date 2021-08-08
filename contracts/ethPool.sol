// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract ethPool {
    
    using SafeMath for uint;
    
    
    event rewardamount(uint256 amt);
    
    address private teamAddress;
    uint256 rewardBalance;
    uint256 totalBalance;
    uint256 rewardPerEth;
    uint256 totalRewardPerEth;
    uint multiplier;

    constructor(address addr){
        teamAddress = addr;
        rewardBalance = 0;
        multiplier = 100000000;
    }
    
    mapping(address=>uint) providers;
    mapping(address=>uint) rewards;

    
    function depositEth() public payable {
        require(msg.value >0,"Deposit amount has to be more than 0");  
        providers[msg.sender] += msg.value;
        rewards[msg.sender] = totalRewardPerEth;
        totalBalance += msg.value;
    }
    
    function addRewards() public payable {
        require(msg.sender == teamAddress,"Only team can deposit rewards"); 
        require(msg.value > 0,"Deposit amount has to be more than 0");  
        rewardBalance += msg.value;
        rewardPerEth = ((msg.value*multiplier)/totalBalance); 
        emit rewardamount(rewardPerEth);
        totalRewardPerEth += rewardPerEth; 
        
    }
    
    function withdrawEthBalance(uint256 amount) public payable {
        require(amount > 0,"Deposit amount has to be more than 0");  
        require(amount < providers[msg.sender],"Cannot withdraw more than you have");
        uint256 rewardAmount = ((totalRewardPerEth - rewards[msg.sender])*amount/multiplier);
        emit rewardamount(rewardAmount);
        uint256 withdrawAmount = amount + rewardAmount;
        emit rewardamount(withdrawAmount);
        providers[msg.sender] -= amount;
        totalBalance -= amount;
        rewardBalance-= rewardAmount;
        payable(msg.sender).transfer(withdrawAmount);
    }
    
    
    function getRewardBalance() public view returns (uint) {
         return address(this).balance;
    }

}