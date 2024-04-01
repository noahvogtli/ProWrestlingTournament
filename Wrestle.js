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


// These are for future plans of an implementation of wrestler creation
class Wrestler 
{
    constructor(name, health, moves) {
        this.name = name;
        this.health = health;
        this.moves = moves;
    }

    
}

class Move 
{
    constructor(name, damage, type) {
        this.name = name;
        this.damage = damage;
        this.type = type;
    }
}


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



/**
 * Chooses a random move from the given wrestler's moves array.
 * 
 * @param {Object} wrestler - The wrestler object.
 * @param {Array} wrestler.moves - An array of moves.
 * @returns {string} - The randomly chosen move.
 */
function chooseMove(wrestler) {
    const randomIndex = Math.floor(Math.random() * wrestler.moves.length);
    return wrestler.moves[randomIndex];
}



/**
 * Checks if a wrestler successfully performs a finisher move.
 * @returns {boolean} Returns true if the finisher move is successful, false otherwise.
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
 * Prints a bold message to the message box by using the h3 element.
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
 * Goes through one round of a match between two wrestlers.
 * @param {object} wrestler1 
 * @param {object} wrestler2 
 * 
 */
function startMatch(wrestler1, wrestler2) 
{
    // Wrestler 1's turn 
    const wrestler1move = chooseMove(wrestler1);
    if (wrestler1move.type === 'finisher' && wrestler2.health > 45) {
        if (finisherCheck()) {
            printToMessageBox(`${wrestler1.name} performs ${wrestler1move.name} on ${wrestler2.name}`);
            wrestler2.health -= wrestler1move.damage;
        } else {
            printToMessageBox(`${wrestler1.name} tried to perform ${wrestler1move.name} on ${wrestler2.name} but failed!`);
        }
    } else {
        printToMessageBox(`${wrestler1.name} performs ${wrestler1move.name} on ${wrestler2.name}`);
        wrestler2.health -= wrestler1move.damage;
    }

    if (wrestler2.health <= 0) {
        printToMessageBox(`${wrestler2.name}'s health is below 0. ${wrestler1.name} wins!`);
        return wrestler1;
    } else {
        printToMessageBox(`${wrestler2.name}'s health is: ${wrestler2.health}`);
    }

    // Wrestler 2's turn
    const wrestler2move = chooseMove(wrestler2);
    if (wrestler2move.type === 'finisher' && wrestler1.health > 45) {
        if (finisherCheck()) {
            printToMessageBox(`${wrestler2.name} performs ${wrestler2move.name} on ${wrestler1.name}`);
            wrestler1.health -= wrestler2move.damage;
        } else {
            printToMessageBox(`${wrestler2.name} tried to perform ${wrestler2move.name} on ${wrestler1.name} but failed!`);
        }
    } else {
        printToMessageBox(`${wrestler2.name} performs ${wrestler2move.name} on ${wrestler1.name}`);
        wrestler1.health -= wrestler2move.damage;
    }

    if (wrestler1.health <= 0) {
        printToMessageBox(`${wrestler1.name}'s health is below 0. ${wrestler2.name} wins!`);
        return wrestler2;
    } else {
        printToMessageBox(`${wrestler1.name}'s health is: ${wrestler1.health}`);
    }
}


/**
 * Starts the tournament between the list of wrestlers.
 * @param {Array} wrestlers 
 * 
 */
function startTournament(wrestlers) 
{
    let x = 0;
    let round = 1;
    let match = 1;
    let winners = [];
    if(wrestlers.length === 1)
    {
        printToMessageBoxBold(`${wrestlers[0].name} is the champion!`);
        document.getElementById('next-button').disabled = true;
        return;
    }
    if (wrestlers.length === 2)
    {
        winners.push(wrestlers[0]);
        winners.push(wrestlers[1]);
    }
    if (wrestlers.length === 3) {
        winners.push(wrestlers[2]);
    }
    while (winners.length < 2) 
    {
        printToMessageBoxBold(`Match: ${match} Round: ${round}`);
        const winner = startMatch(wrestlers[x], wrestlers[x + 1]);
        if (winner) {
            winners.push(winner);
            match += 1;
            round = 1;
            x += 2;
        } else {
            round += 1;
        }
    }
    if (winners.length === 2) 
    {
        winners[0].health = startingHealths[winners[0].name];
        winners[1].health = startingHealths[winners[1].name];
        round = 1;
        let champion;
        printToMessageBoxBold('Final Round');
        while (!champion) 
        {
            printToMessageBoxBold(`Round: ${round}`);
            champion = startMatch(winners[0], winners[1]);
            round += 1;
        }
        printToMessageBoxBold(`${champion.name} is the champion!`);
        document.getElementById('next-button').disabled = true;
    }
}

//gets the starting health of each wrestler to save for the final round
startingHealths = {};
for (let i = 0; i < wrestlers.length; i++) 
{
    startingHealths[wrestlers[i].name] = wrestlers[i].health;
}

//makes sure when the document is loaded that the wrestlers are automatically randomized
randomizeWrestlers(wrestlers);

//sets function of the back button
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
