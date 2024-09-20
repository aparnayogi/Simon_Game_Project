const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerSequence = [];
let level = 0;

const startButton = document.getElementById('start-button');
const colorButtons = document.querySelectorAll('.color-button');

startButton.addEventListener('click', startGame);

colorButtons.forEach(button => {
    button.addEventListener('click', event => {
        const color = event.target.id;
        playerSequence.push(color);
        playSound(color);
        checkPlayerSequence();
    });
});

function startGame() {
    level = 0;
    sequence = [];
    playerSequence = [];
    nextLevel();
}

function nextLevel() {
    level++;
    playerSequence = [];
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    playSequence();
}

function playSequence() {
    let delay = 0;
    sequence.forEach((color, index) => {
        setTimeout(() => {
            playSound(color);
            animateButton(color);
        }, delay);
        delay += 1000;
    });
}

function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function animateButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

function checkPlayerSequence() {
    const currentLevel = playerSequence.length;
    if (playerSequence[currentLevel - 1] !== sequence[currentLevel - 1]) {
        alert('Game Over! You reached level ' + level);
        startGame();
        return;
    }
    if (playerSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
    }
}
