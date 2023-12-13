#import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import random

# Roll a 100 sided die, 49% chance to win. Make it a little more interesting than 50/50
def rollDice():
    roll = random.randint(1,100)
    # 50-99 is a win
    if 50 < roll < 100:
        return True
    else:
        return False


# Martingale Method, but uses a random multiple instead of 2
# Plotting commented out to speed up program, may be re-implemented
def multipleGambler(initialFunds, initialWager, numWagers):
    funds = initialFunds
    wager = initialWager
    #wagerX = []
    #valueY = []
    global multipleProfiteers
    global multipleBrokes
    global randomMultiple
    global endFunds
    wagerCount = 1

    while wagerCount <= numWagers:
        if wager > funds: #You can't bet more than you have
            wager = funds
        if rollDice(): # On win
            funds += wager
            #wagerX.append(wagerCount)
            #valueY.append(funds)
            wager = initialWager #if Win, reset the wager
        else: #On loss
            funds -= wager
            #wagerX.append(wagerCount)
            #valueY.append(funds)
            wager *= randomMultiple #if Loss, double the wager
            # If broke, log it and stop simulating
            if funds <= 0: # Only check on losses
                multipleBrokes += 1
                break
        wagerCount += 1
    if funds > initialFunds:
        multipleProfiteers += 1
        endFunds += funds

    #plt.plot(wagerX, valueY, 'c')

# D'Alambert Method, like Martingale but increments on losses instead of multiplies
# Plotting commented out to speed up program, may be re-implemented
def dalambertGambler(initialFunds, initialWager, numWagers):
    funds = initialFunds
    wager = initialWager
    #wagerX = []
    #valueY = []
    global dalambertProfiteers
    global dalambertBrokes
    global endFunds
    wagerCount = 1

    while wagerCount <= numWagers:
        if wager > funds: #You can't bet more than you have
            wager = funds
        if rollDice(): # On win
            funds += wager
            #wagerX.append(wagerCount)
            #valueY.append(funds)
            wager = initialWager #if Win, reset the wager
        else: #On loss
            funds -= wager
            #wagerX.append(wagerCount)
            #valueY.append(funds)
            wager += initialWager #if Loss, increment the wager
            # If broke, log it and stop simulating
            if funds <= 0: # Only check on losses
                multipleBrokes += 1
                break
        wagerCount += 1
    if funds > initialFunds:
        multipleProfiteers += 1
        endFunds = funds

    #plt.plot(wagerX, valueY, 'c')

# *** TESTING TO FIND THE OPTIMAL WAGER MUTLIPLE ***

sampleSize = 1000 # Number of gamblers to be simulated
# Starting funds and wager size  didn't affect the outcome when randomized, so reverted to a static amount.
# Bigger proportions of funds to wager size just gets you the same place faster or slower
startingFunds = 10000 # Starting amount of money

globalProfiteers = 0
globalBrokes = 0

# Starting points for rates
lowerBust = 50
higherProfit = 40

# How many values to check
numMultipleChecks = 10000

endFunds = 0


# Initial amount of money wagered, no real impact changing this for mutipleGambler
wagerSize = 100

for i in range(numMultipleChecks):
    # Set Up
    randomMultiple = random.uniform(0.1, 3)
    wagerCount = random.randint(10,1000) # Number of wagers to try until broke
    numSims = 0
    multipleProfiteers = 0
    multipleBrokes = 0
    # Run sim with random number
    while numSims<sampleSize:
        multipleGambler(startingFunds, wagerSize, wagerCount)
        numSims += 1
    # If its better than the current best, it's the new best
    #   Have to decide if just setting bust rate = 0 to only select values that are more or less guaranteed profit
    if ((multipleBrokes/sampleSize)*100 <= lowerBust) and ((multipleProfiteers/sampleSize)*100 > higherProfit):
        lowerBust = (multipleBrokes/sampleSize)*100
        higherProfit = (multipleProfiteers/sampleSize)*100
        print('Multiple: ', randomMultiple)
        print('Number of Wagers: ', wagerCount)
        print('New Bust rate: ', lowerBust)
        print('New Profit Rate: ', higherProfit)
        print('Profit Amount: ', endFunds-startingFunds)
print('Multiple Complete')


# *** Testing to find the optimal D'Alambert Wager ***
for i in range(numMultipleChecks):
    # Set Up
    randomWager = random.uniform(100, 2000) # Test 1-20% of initial funds
    wagerCount = random.randint(10,1000) # Number of wagers to try until broke
    numSims = 0
    multipleProfiteers = 0
    multipleBrokes = 0
    # Run sim with random number
    while numSims<sampleSize:
        multipleGambler(startingFunds, randomWager, wagerCount)
        numSims += 1
    # If its better than the current best, it's the new best
    #   Have to decide if just setting bust rate = 0 to only select values that are more or less guaranteed profit
    if ((multipleBrokes/sampleSize)*100 <= lowerBust) and ((multipleProfiteers/sampleSize)*100 > higherProfit):
        lowerBust = (multipleBrokes/sampleSize)*100
        higherProfit = (multipleProfiteers/sampleSize)*100
        print('Multiple: ', randomMultiple)
        print('New Bust rate: ', lowerBust)
        print('New Profit Rate: ', higherProfit)
        print('Profit Amount: ', endFunds-startingFunds)
print('DAlambert Complete')

#plt.ylabel('Funds')
#plt.xlabel('Wager Count')
#plt.show()



