# ethpoolapp

The ethpoolapp enables users to deposit funds in the eth pool and receive proportionate rewards for the same.


This problem can be a little tricky because of these questions ?

-- Let's say our ethPool has 10,000 eth providers. Now, ethTeam adds 100 Eth to the rewards pool which have to be distributed among these 10,000 users.
-- Big question is - will we update 10,000 entries everytime the team adds rewards? That can be a very costly operation
-- Since no of users and the weekly reward amount keeps changing,, the reward share of each user is also changing and its not possible to come up with a one simple equation which can give us a user's reward share at any given time.

To solve these issues, I have come up with a simple algorithim. This would avoid the need of updating every user's book at each reward addition. This calculation will only be done when user requests to see his balance or withdraw his share. 

High Level Overview

--> Contract will maintain a 'rewardPerEth' counter, everytime it adds rewards. For ex, let's say at end of week 5, we have total of 5,000 eth as deposits and team adds 500 eth as rewards. For that week, rewardPerEth = 500/5000 = 0.1 reward per eth
--> Let us assume Mark deposits 10 eth in the pool before week 5 and Jana deposits 20 eth after week 5.
--> End of week 6, let us assume total deposits have gone upto 6000 eth and reward added have been 300 eth. Reward per eth --> 300/6000 = 0.05 eth
How much would be mark's total rewards = (0.1 + 0.05)*10 = (0.15*10) = 1.5 eth. Jana's total rewards = (0.05*20) = 1 eth
--> How do we maintain 
