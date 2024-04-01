let finisher = 'finisher'
let signature = 'signature'

const WrestlerA = {
    name: 'Cohn Jena',
    health: 100,
    moves: [
        { name: 'Spear', damage: 45, type: signature},
        { name: 'Body Slam', damage: 20, type: signature},
        { name: 'You CAN see me', damage: 100, type: finisher}, 
    ]
};

const WrestlerB = {
    name: 'Jwayne "The Stone" Dohnson',
    health: 100,
    moves: [
        { name: 'Stone Throw', damage: 45, type: signature},
        { name: 'Drop Kick', damage: 20, type: signature },
        { name: 'The Rock Bottom', damage: 100, type: finisher}, 
    ]
};

const WrestlerC = {
    name: 'BigGreenGuy Hogan ',
    health: 100,
    moves: [
        { name: 'Spear', damage: 45, type: signature},
        { name: 'Body Slam', damage: 20, type: signature},
        { name: 'Atomic Leg Drop', damage: 100, type: finisher}, 
    ]
};

const WrestlerD = {
    name: 'The Overtaker',
    health: 100,
    moves: [
        { name: 'Powerbomb', damage: 45, type: signature},
        { name: 'Suplex', damage: 20, type: signature},
        { name: 'Tombstone Piledriver', damage: 100, type: finisher}, 
    ]
};

const wrestlers = [WrestlerA, WrestlerB, WrestlerC, WrestlerD];

/**
 * Randomizes the order of wrestlers in an array.
 *
 * @param {Array} wrestlers - The array of wrestlers to be randomized.
 * @returns {Array} - The array of wrestlers with randomized order.
 * This function is based on the Durstenfeld Shuffle algorithm.
 * source: https://stackabuse.com/shuffling-arrays-in-javascript/
 */
function randomizeWrestlers(wrestlers) {
    for (let i = wrestlers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wrestlers[i], wrestlers[j]] = [wrestlers[j], wrestlers[i]];
    }
    return wrestlers;
}


//not used. Intended for future implementation of wrestler creation
class Wrestler 
{
    constructor(name, health, moves) {
        this.name = name;
        this.health = health;
        this.moves = moves;
    }

    
}


/**
 * Chooses a random move from the given wrestler's moves array.
 * 
 * @param {Object} wrestler - The wrestler object.
 * @returns {Object} - The randomly chosen move.
 */
function chooseMove(wrestler) {
    const randomIndex = Math.floor(Math.random() * wrestler.moves.length);
    return wrestler.moves[randomIndex];
}


/**
 * Checks if a wrestler can perform a finisher move. It has a 50% chance of success.
 * @returns {boolean} Returns true if the wrestler can perform a finisher move, false otherwise.
 */
function finisherCheck() {
    return Math.random() < 0.5;
}


/**
 * Prints a message to the message box.
 * 
 * @param {string} message - The message to be printed.
 */
function printToMessageBox(message) {
    const messageBox = document.getElementById('message-box');
    const p = document.createElement('p');
    p.textContent = message;
    messageBox.appendChild(p);
}


/**
 * Prints a bold message to the message box using the h3 element
 * @param {string} message - The message to be printed.
 */
function printToMessageBoxBold(message) 
{
    const messageBox = document.getElementById('message-box');
    const h3 = document.createElement('h3');
    h3.textContent = message;
    messageBox.appendChild(h3);
}


/**
 * Sets the health bar values and labels for current two fighting wrestlers.
 * @param {Object} wrestler1 - The first wrestler object.
 * @param {Object} wrestler2 - The second wrestler object.
 */
function setHealthBar(wrestler1, wrestler2) 
{
    const wrestler1HealthBar = document.getElementById('wrestler1health');
    const wrestler2HealthBar = document.getElementById('wrestler2health');
    const wrestler1label = document.getElementById('health1label');
    const wrestler2label = document.getElementById('health2label');

    wrestler1label.textContent = wrestler1.health;
    wrestler2label.textContent = wrestler2.health;
    wrestler1HealthBar.setAttribute('value', wrestler1.health);
    wrestler2HealthBar.setAttribute('value', wrestler2.health);
    wrestler1HealthBar.style.opacity = 1;
    wrestler2HealthBar.style.opacity = 1;

}


/**
 * Sets the names of the wrestlers on the card that are currently fighting.
 * 
 * @param {Object} wrestler1 - The first wrestler object.
 * @param {Object} wrestler2 - The second wrestler object.
 */
function setCardNames(wrestler1, wrestler2)
{
    const wrestler1Name = document.getElementById('wrestler1name');
    const wrestler2Name = document.getElementById('wrestler2name');

    wrestler1Name.textContent = wrestler1.name;
    wrestler2Name.textContent = wrestler2.name;
}


/**
 * Sets the move message for a card.
 * 
 * @param {string} message - The move message to be set.
 * @param {number} num - The card number.
 */
function setCardMove(message, num)
{
    const attacklog = document.getElementById('attack' + num + 'log');
    attacklog.textContent = message;
}


/**
 * Resets the card moves by clearing the attack logs.
 */
function resetCardMoves()
{
    const attacklog1 = document.getElementById('attack1log');
    const attacklog2 = document.getElementById('attack2log');
    attacklog1.textContent = '';
    attacklog2.textContent = '';
}


/**
 * Assigns a random picture to each wrestler.
 * 
 * @param {Array} wrestlers - An array of wrestler objects.
 * @returns {Object} - An object containing wrestler names as keys and assigned pictures as values.
 */
function assignPicture(wrestlers)
{
    let assignments = {};
    let pictureList = ['assets/BlueWrestler.png', 'assets/RedWrestler.png', 'assets/GreenWrestler.png', 'assets/YellowWrestler.png', 'assets/OrangeWrestler.png', 'assets/PurpleWrestler.png'];
    for (let i = 0; i < wrestlers.length; i++) 
    {
        assignments[wrestlers[i].name] = pictureList[Math.floor(Math.random() * pictureList.length)];
        pictureList.splice(pictureList.indexOf(assignments[wrestlers[i].name]), 1);
    }
    return assignments;
}


/**
 * Sets the picture of a wrestler of the current fight.
 * 
 * @param {object} wrestler - The wrestler object.
 * @param {number} num - The number of the wrestler card.
 */
function setPicture(wrestler, num)
{
    const picture = document.getElementById('wrestler' + num + 'img');
    picture.setAttribute('src', pictureAssignments[wrestler.name]);
}


/**
 * Updates the winners list on the webpage.
 */
function updateWinnersList()
{
    const winnersList = document.getElementById('winnersList');
    winnersList.textContent = 'Current Winners: ';
    for (let i = 0; i < winners.length - 1; i++) 
    {
        winnersList.textContent += winners[i].name + ', ';
    }
    winnersList.textContent += winners[winners.length - 1].name;
}


/**
 * Updates the champion name in the HTML element.
 */
function updateChampion()
{
    const championName = document.getElementById('championName');
    championName.textContent = " THE CHAMPION IS: " + champion.name;

}

/**
 * Updates the Match and Round information.
 */
function updateMatchRound()
{
    const matchRound = document.getElementById('matchRound');
    matchRound.textContent = `Match: ${match} Round: ${round}`;
}

/**
 * Starts one round between the two given wrestlers
 * @param {object} wrestler1 
 * @param {object} wrestler2 
 * 
 */
function startRound(wrestler1, wrestler2)
{
    setPicture(wrestler1, 1);
    setPicture(wrestler2, 2);

    let message = '';
    //wrestler 1's move
    const wrestler1move = chooseMove(wrestler1);
    if (wrestler1move.type === 'finisher' && wrestler2.health > 45) 
    {
        if (finisherCheck()) 
        {
            message = `${wrestler1.name} performs ${wrestler1move.name} on ${wrestler2.name}`
            printToMessageBox(message);
            setCardMove(message, 1)
            wrestler2.health -= wrestler1move.damage;
    
        } else {
            message = `${wrestler1.name} tried to perform ${wrestler1move.name} on ${wrestler2.name} but failed!`
            printToMessageBox(message);
            setCardMove(message, 1)
        }
    } else {
        message = `${wrestler1.name} performs ${wrestler1move.name} on ${wrestler2.name}`;
        printToMessageBox(message);
        setCardMove(message, 1)
        wrestler2.health -= wrestler1move.damage;

    }

    if (wrestler2.health <= 0) 
    {
        wrestler2.health = 0;
        message = `${wrestler2.name}'s health is below 0. ${wrestler1.name} wins!`
        printToMessageBox(message);
        setHealthBar(wrestler1, wrestler2);
        return wrestler1;
    } 
    else {
        message = `${wrestler2.name}'s health is: ${wrestler2.health}`
        printToMessageBox(message);
    }

    // Wrestler 2's move
    const wrestler2move = chooseMove(wrestler2);
    if (wrestler2move.type === 'finisher' && wrestler1.health > 45) {
        if (finisherCheck()) 
        {
            message = `${wrestler2.name} performs ${wrestler2move.name} on ${wrestler1.name}`
            printToMessageBox(message);
            setCardMove(message, 2);
            wrestler1.health -= wrestler2move.damage;
        } 
        else {
            message = `${wrestler2.name} tried to perform ${wrestler2move.name} on ${wrestler1.name} but failed!`
            printToMessageBox(message);
            setCardMove(message, 2);
        }
    } 
    else {
        message = `${wrestler2.name} performs ${wrestler2move.name} on ${wrestler1.name}`
        printToMessageBox(message);
        setCardMove(message, 2);
        wrestler1.health -= wrestler2move.damage;
    }

    if (wrestler1.health <= 0) 
    {
        wrestler1.health = 0;
        printToMessageBox(`${wrestler1.name}'s health is below 0. ${wrestler2.name} wins!`);
        setHealthBar(wrestler1, wrestler2);
        return wrestler2;
    } else {
        printToMessageBox(`${wrestler1.name}'s health is: ${wrestler1.health}`);
    }

    setHealthBar(wrestler1, wrestler2);
}

winners = [];
var champion;
let x = 0;
let match = 1;
let round = 1;

/**
 * Starts the tournament between the array of given wrestlers
 * @param {Array} wrestlers 
 * @returns 
 */

function startTournament(wrestlers) 
{
    updateMatchRound();
    if (wrestlers.length === 3 && winners.length === 0)
    {
        winners.push(wrestlers[2]);
    }
    resetCardMoves();
    setCardNames(wrestlers[x], wrestlers[x + 1]);
    nextButton = document.getElementById('next-button');
    nextButton.innerHTML = 'Next Round >';
    printToMessageBoxBold(`Match ${match} Round ${round}: ${wrestlers[x].name} vs. ${wrestlers[x + 1].name}`);
    if (wrestlers.length === 1)
    {
        printToMessageBox(`${wrestlers[0].name} is the winner!`);
    }
    if (wrestlers.length === 2) 
    {
        champion = startRound(wrestlers[0], wrestlers[1]);
        if (champion) 
        {
            printToMessageBox(`${champion.name} is the champion!`);
            updateChampion();
            nextButton.disabled = true;
            winners.push(champion);
            updateWinnersList();
        }
        round += 1;
        return;
    }
    if (winners.length === 2) 
    {
        if (round === 1)
        {
            winners[0].health = startingHealths[winners[0].name];
            winners[1].health = startingHealths[winners[1].name];
        }
        setCardNames(winners[0], winners[1]);
        champion = startRound(winners[0], winners[1]);
        if (champion) 
        {
            printToMessageBox(`${champion.name} is the champion!`);
            updateChampion();
            nextButton.disabled = true;
        }
    }
    if (winners.length < 2 && wrestlers.length != 3)
    {
        isWinner = startRound(wrestlers[x], wrestlers[x + 1]);
        if (isWinner) 
        {
            winners.push(isWinner);
            if (winners.length < 2) 
            {
                x += 2;
            }
            match += 1;
            round = 0;
            updateWinnersList();
        }
    }
    round += 1;

}

//This gets and stores the wrestlers starting health to save for the final round
startingHealths = {};
for (let i = 0; i < wrestlers.length; i++) 
{
    startingHealths[wrestlers[i].name] = wrestlers[i].health;
}

//this makes sure the wrestlers array is automatically randomized when the document is loaded
randomizeWrestlers(wrestlers)

//this assigns a random picture to each wrestler when the document is loaded
let pictureAssignments = assignPicture(wrestlers);

//this sets the function of the back button
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html';
  });