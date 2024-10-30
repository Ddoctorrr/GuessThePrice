const items = [
    { image: 'image1.jpg', price: 27600000 },
    { image: 'image2.jpg', price: 30900000 },
    { image: 'image3.jpg', price: 30900000 },
    { image: 'image4.jpg', price: 78400000 },
    { image: 'image5.jpg', price: 1920000 },
    { image: 'image6.jpg', price: 400000000 },
    { image: 'image7.jpg', price: 200000000 },
    { image: 'image8.jpg', price: 88605000 },
    { image: 'image9.jpg', price: 90312500 },
    { image: 'image10.jpg', price: 110487500 },
    { image: 'image11.jpg', price: 1500000 },
    { image: 'image12.jpg', price: 135000000 },
    { image: 'image13.jpg', price: 259000000 },
    { image: 'image14.jpg', price: 148600000 },
    { image: 'image15.jpg', price: 128200000 },
];

let currentIndex = 0;
let totalScore = 0;
let playerName = '';
const currentScoreElement = document.getElementById('current-score');
const itemImageElement = document.getElementById('item-image');
const feedbackContainer = document.getElementById('feedback-container');
const leaderboardElement = document.getElementById('leaderboard');


function resetLeaderboard() {
    localStorage.removeItem('scores'); // Clear stored scores
    leaderboardElement.innerHTML = ''; // Clear leaderboard display
}

document.getElementById('start-game').addEventListener('click', () => {
    playerName = document.getElementById('player-name').value.trim();
    if (playerName) {
        startGame();
    } else {
        alert("Please enter your name!");
    }
});

function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    loadImage();
}

function loadImage() {
    itemImageElement.src = items[currentIndex].image;
}

document.getElementById('submit-guess').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('price-guess').value, 10);
    if (isNaN(guess)) {
        guess = 0;
    }
    const actualPrice = items[currentIndex].price;
    const score = Math.abs(guess - actualPrice);
    totalScore += score;
    currentScoreElement.textContent = totalScore;

    feedbackContainer.textContent = `Your guess: ${guess}, Actual price: ${actualPrice}, Score: ${score}`;

    currentIndex++;
    if (currentIndex < items.length) {
        loadImage();
        document.getElementById('price-guess').value = '';
    } else {
        storeScore(totalScore);
        displayLeaderboard();
        feedbackContainer.textContent += ' Game Over! Check the leaderboard for results.';
    }
});

// Store the player's score in localStorage
function storeScore(points) {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name: playerName, points });
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Display the leaderboard from localStorage
function displayLeaderboard() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => a.points - b.points);
    leaderboardElement.innerHTML = scores
        .map(score => `<li>${score.name}: ${score.points}</li>`)
        .join('');
}

// Load the leaderboard on page load
window.addEventListener('load', displayLeaderboard);

loadImage();

























// const items = [
//     { image: 'image1.jpg', price: 27600000 },
//     { image: 'image2.jpg', price: 30900000 },
//     { image: 'image3.jpg', price: 30900000 },
//     { image: 'image4.jpg', price: 78400000 },
//     { image: 'image5.jpg', price: 1920000 },
//     { image: 'image6.jpg', price: 400000000 },
//     { image: 'image7.jpg', price: 200000000 },
//     { image: 'image8.jpg', price: 88605000 },
//     { image: 'image9.jpg', price: 90312500 },
//     { image: 'image10.jpg', price: 110487500 },
//     { image: 'image11.jpg', price: 1500000 },
//     { image: 'image12.jpg', price: 135000000 },
//     { image: 'image13.jpg', price: 259000000 },
//     { image: 'image14.jpg', price: 148600000 },
//     { image: 'image15.jpg', price: 128200000 },
// ];

// let currentIndex = 0;
// let totalScore = 0;
// let playerName = '';
// const currentScoreElement = document.getElementById('current-score');
// const itemImageElement = document.getElementById('item-image');
// const feedbackContainer = document.getElementById('feedback-container');
// const leaderboardElement = document.getElementById('leaderboard');

// document.getElementById('start-game').addEventListener('click', () => {
//     playerName = document.getElementById('player-name').value.trim();
//     if (playerName) {
//         startGame();
//     } else {
//         alert("Please enter your name!");
//     }
// });

// function startGame() {
//     document.getElementById('start-container').style.display = 'none';
//     document.getElementById('game-section').style.display = 'block';
//     loadImage();
// }

// function loadImage() {
//     itemImageElement.src = items[currentIndex].image;
// }

// document.getElementById('submit-guess').addEventListener('click', () => {
//     const guess = parseInt(document.getElementById('price-guess').value, 10);
//     const actualPrice = items[currentIndex].price;
//     const score = Math.abs(guess - actualPrice);
//     totalScore += score;
//     currentScoreElement.textContent = totalScore;

//     feedbackContainer.textContent = `Your guess: ${guess}, Actual price: ${actualPrice}, Score: ${score}`;

//     currentIndex++;
//     if (currentIndex < items.length) {
//         loadImage();
//         document.getElementById('price-guess').value = '';
//     } else {
//         displayLeaderboard();
//     }
// });

// function displayLeaderboard() {
//     const newEntry = document.createElement('li');
//     newEntry.textContent = `Player: ${playerName}, Total Score: ${totalScore}`;
//     leaderboardElement.appendChild(newEntry);
//     feedbackContainer.textContent += ' Game Over! Check the leaderboard for results.';
// }

// loadImage();
