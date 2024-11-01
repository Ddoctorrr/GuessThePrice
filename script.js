// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuUNRLpUsvhfUhS9exTA57Y1OzRhsAyi0",
    authDomain: "guess-the-price-f7917.firebaseapp.com",
    projectId: "guess-the-price-f7917",
    storageBucket: "guess-the-price-f7917.firebasestorage.app",
    messagingSenderId: "781413779949",
    appId: "1:781413779949:web:13d07d57e7e009aad5ffe4",
    measurementId: "G-7RVNRMFP6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Game variables
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

// Store the player's score in Firestore and localStorage
async function storeScore(points) {
    try {
        // Store in Firestore
        await addDoc(collection(db, "scores"), {
            name: playerName,
            points: points
        });
        
        // Store in localStorage
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ name: playerName, points });
        localStorage.setItem('scores', JSON.stringify(scores));
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Display the leaderboard from Firestore and localStorage
async function displayLeaderboard() {
    try {
        // Get scores from Firestore
        const scoresCol = collection(db, 'scores');
        const scoreSnapshot = await getDocs(scoresCol);
        const firestoreScores = scoreSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Get scores from localStorage
        const localStorageScores = JSON.parse(localStorage.getItem('scores')) || [];
        
        // Combine scores from Firestore and localStorage
        const combinedScores = [...firestoreScores, ...localStorageScores];
        
        // Sort scores in ascending order
        combinedScores.sort((a, b) => a.points - b.points);
        
        // Update the leaderboard element
        leaderboardElement.innerHTML = combinedScores
            .map(score => `<li>${score.name}: ${score.points}</li>`)
            .join('');
    } catch (e) {
        console.error("Error displaying leaderboard: ", e);
    }
}

// Load the leaderboard on page load
window.addEventListener('load', displayLeaderboard);













// const items = [
//     { title: 'Image 1', price: 27600000 },
//     { title: 'Image 2', price: 30900000 },
//     { title: 'Image 3', price: 30900000 },
//     { title: 'Image 4', price: 78400000 },
//     { title: 'Image 5', price: 1920000 },
//     { title: 'Image 6', price: 400000000 },
//     { title: 'Image 7', price: 200000000 },
//     { title: 'Image 8', price: 88605000 },
//     { title: 'Image 9', price: 90312500 },
//     { title: 'Image 10', price: 110487500 },
//     { title: 'Image 11', price: 1500000 },
//     { title: 'Image 12', price: 135000000 },
//     { title: 'Image 13', price: 259000000 },
//     { title: 'Image 14', price: 148600000 },
//     { title: 'Image 15', price: 128200000 },
// ];

// let currentIndex = 0;
// let totalScore = 0;
// let playerName = '';
// const currentScoreElement = document.getElementById('current-score');
// const itemTitleElement = document.getElementById('item-title'); // Updated to the new ID
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
//     loadTitle();
// }

// function loadTitle() {
//     itemTitleElement.textContent = items[currentIndex].title; // Display the title
// }

// document.getElementById('submit-guess').addEventListener('click', () => {
//     const guess = parseInt(document.getElementById('price-guess').value, 10);
//     if (isNaN(guess)) {
//         alert("Please enter a valid number for your guess!");
//         return;
//     }
//     const actualPrice = items[currentIndex].price;
//     const score = Math.abs(guess - actualPrice);
//     totalScore += score;
//     currentScoreElement.textContent = totalScore;

//     feedbackContainer.textContent = `Your guess: ${guess}, Score: ${score}`;

//     currentIndex++;
//     if (currentIndex < items.length) {
//         loadTitle();
//         document.getElementById('price-guess').value = '';
//     } else {
//         storeScore(totalScore);
//         displayLeaderboard();
//         feedbackContainer.textContent += ' Game Over! Check the leaderboard for results.';
//     }
// });

// // Store the player's score in localStorage
// function storeScore(points) {
//     const scores = JSON.parse(localStorage.getItem('scores')) || [];
//     scores.push({ name: playerName, points });
//     localStorage.setItem('scores', JSON.stringify(scores));
// }

// // Display the leaderboard from localStorage
// function displayLeaderboard() {
//     const scores = JSON.parse(localStorage.getItem('scores')) || [];
//     scores.sort((a, b) => a.points - b.points);
//     leaderboardElement.innerHTML = scores
//         .map(score => `<li>${score.name}: ${score.points}</li>`)
//         .join('');
// }

// // Load the leaderboard on page load
// window.addEventListener('load', displayLeaderboard);
