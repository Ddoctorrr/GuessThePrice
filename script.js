// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuUNRLpUsvhfUhS9exTA57Y1OzRhsAyi0",
    authDomain: "guess-the-price-f7917.firebaseapp.com",
    projectId: "guess-the-price-f7917",
    storageBucket: "guess-the-price-f7917.appspot.com",
    messagingSenderId: "781413779949",
    appId: "1:781413779949:web:13d07d57e7e009aad5ffe4",
    measurementId: "G-7RVNRMFP6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const items = [
    { title: 'Image 1', price: 27600000 },
    { title: 'Image 2', price: 30900000 },
    { title: 'Image 3', price: 30900000 },
    { title: 'Image 4', price: 78400000 },
    { title: 'Image 5', price: 1920000 },
    { title: 'Image 6', price: 400000000 },
    { title: 'Image 7', price: 200000000 },
    { title: 'Image 8', price: 88605000 },
    { title: 'Image 9', price: 90312500 },
    { title: 'Image 10', price: 110487500 },
    { title: 'Image 11', price: 1500000 },
    { title: 'Image 12', price: 135000000 },
    { title: 'Image 13', price: 259000000 },
    { title: 'Image 14', price: 148600000 },
    { title: 'Image 15', price: 128200000 },
];

let currentIndex = 0;
let totalScore = 0;
let playerName = '';
const currentScoreElement = document.getElementById('current-score');
const itemTitleElement = document.getElementById('item-title'); 
const feedbackContainer = document.getElementById('feedback-container');
const leaderboardElement = document.getElementById('leaderboard');

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
    loadTitle();
}

function loadTitle() {
    itemTitleElement.textContent = items[currentIndex].title; 
}

document.getElementById('submit-guess').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('price-guess').value, 10);
    if (isNaN(guess)) {
        alert("Please enter a valid number for your guess!");
        return;
    }
    const actualPrice = items[currentIndex].price;
    const score = Math.abs(guess - actualPrice);
    totalScore += score;
    currentScoreElement.textContent = totalScore;

    feedbackContainer.textContent = `Your guess: ${guess}, Score: ${score}`;

    currentIndex++;
    if (currentIndex < items.length) {
        loadTitle();
        document.getElementById('price-guess').value = '';
    } else {
        storeScore(totalScore);
        displayLeaderboard();
        feedbackContainer.textContent += ' Game Over! Check the leaderboard for results.';
    }
});

// Store the player's score in Firebase
function storeScore(points) {
    const scoresRef = ref(database, 'scores/');
    const newScoreRef = push(scoresRef);
    set(newScoreRef, {
        name: playerName,
        points: points
    });
}

// Display the leaderboard from Firebase
function displayLeaderboard() {
    const scoresRef = ref(database, 'scores/');
    onValue(scoresRef, (snapshot) => {
        const scores = [];
        snapshot.forEach((childSnapshot) => {
            const score = childSnapshot.val();
            scores.push(score);
        });
        scores.sort((a, b) => a.points - b.points);
        leaderboardElement.innerHTML = scores
            .map(score => `<li>${score.name}: ${score.points}</li>`)
            .join('');
    });
}

// Load the leaderboard on page load
window.addEventListener('load', displayLeaderboard);
