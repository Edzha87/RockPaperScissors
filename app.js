const userChoices = document.querySelectorAll(
    '.game-field .user-side .choices .choice'
);
const computerChoices = [
    {
        id: 1,
        type: 'rock',
        icon: 'fa-hand-back-fist',
    },
    {
        id: 2,
        type: 'paper',
        icon: 'fa-hand',
    },
    {
        id: 3,
        type: 'scissors',
        icon: 'fa-hand-scissors',
    },
];

let usersField = document.querySelector('.game-field .user-side .play-area i');
let computersField = document.querySelector(
    '.game-field .computer-side .play-area i'
);

let userWins = 0;
let computerWins = 0;

const userResults = document.querySelector(
    '.game-field .user-side .result span'
);
const computerResults = document.querySelector(
    '.game-field .computer-side .result span'
);

const roundResult = document.querySelector('#main-box h2');
const globalResult = document.querySelector('#main-box h1');

userChoices.forEach((choice) => {
    choice.addEventListener('click', startPlaying);
});

const result = document.querySelectorAll('.result');
console.log(result);
result.forEach(
    (item) => ((item.style.color = 'red'), (item.style.fontWeight = 'normal'))
);

const playArea = document.querySelectorAll('.play-area');
playArea.forEach((item) =>
    item.addEventListener('click', function () {
        alert('Clicked');
    })
);

function startPlaying() {
    const userChoiceType = this.getAttribute('data-type');
    const userChoiceIcon = this.querySelector('i').classList[1];

    if (usersField.classList.length === 1) {
        usersField.classList.add(userChoiceIcon);
    } else {
        usersField.classList.remove(usersField.classList[1]);
        usersField.classList.add(userChoiceIcon);
    }

    const computerChoiceType = generateComputersChoice();
    getWinner(userChoiceType, computerChoiceType);
    calculateResults();
}

function generateComputersChoice() {
    const rand = Math.floor(Math.random() * 3);

    const computerChoiceType = computerChoices[rand].type;
    const computerChoiceIcon = computerChoices[rand].icon;

    if (computersField.classList.length === 1) {
        computersField.classList.add(computerChoiceIcon);
    } else {
        computersField.classList.remove(computersField.classList[1]);
        computersField.classList.add(computerChoiceIcon);
    }

    return computerChoiceType;
}

function getWinner(userChoiceType, computerChoiceType) {
    if (userChoiceType === 'rock') {
        switch (computerChoiceType) {
            case 'rock':
                roundResult.innerHTML = 'Draw!';
                break;
            case 'paper':
                roundResult.innerHTML = 'You lost!';
                computerWins++;
                break;
            case 'scissors':
                roundResult.innerHTML = 'You won!';
                userWins++;
                break;
        }
    } else if (userChoiceType === 'paper') {
        switch (computerChoiceType) {
            case 'rock':
                roundResult.innerHTML = 'You won!';
                userWins++;
                break;
            case 'paper':
                roundResult.innerHTML = 'Draw!';
                break;
            case 'scissors':
                roundResult.innerHTML = 'You lost!';
                computerWins++;
                break;
        }
    } else if (userChoiceType === 'scissors') {
        switch (computerChoiceType) {
            case 'rock':
                roundResult.innerHTML = 'You lost!';
                computerWins++;
                break;
            case 'paper':
                roundResult.innerHTML = 'You won!';
                userWins++;
                break;
            case 'scissors':
                roundResult.innerHTML = 'Draw!';
                break;
        }
    }
}

function calculateResults() {
    userResults.innerHTML = userWins;
    computerResults.innerHTML = computerWins;

    if (userWins == 5 || computerWins == 5) {
        if (userWins === 5) {
            globalResult.innerHTML = 'You won everything!';
        }
        if (computerWins == 5) {
            globalResult.innerHTML = 'You lost everything!';
        }
        userChoices.forEach((choice) => {
            choice.removeEventListener('click', startPlaying);
        });
    }
}
