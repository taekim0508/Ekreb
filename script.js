// Selecting elements from the DOM
const retrieveWord = document.getElementById("retrieveWord"),
      userLength = document.getElementById("lengthOfWord"),
      output = document.getElementById("output"),
      check = document.getElementById("check"),
      usersGuess = document.getElementById("usersGuess"),
      rightOrWrong = document.getElementById("correct"),
      solution = document.getElementById("solution"),
      scoreDisplay = document.getElementById("scoreDisplay"),
      continueGame = document.getElementById("continue"),
      restartButton = document.getElementById("restart"); // Restart button

let score = 0; // Initialize score
let wrongGuesses = 0; // Track wrong guesses
let word = ""; // Stores the original word
let hasPlayed = false;

// Function to update score display
const updateScore = () => {
    wrongGuesses = 0;
    scoreDisplay.textContent = `Score: ${score}`;
};

// Function to update game state when max wrong guesses reached
const gameOver = () => {
    rightOrWrong.textContent = "❌ Game Over!";
    rightOrWrong.style.color = "red";
    solution.textContent = `Solution: ${word}`; // Show the correct word
    userLength.disabled = true;
    usersGuess.disabled = true; // Disable input
    check.disabled = true; // Disable check button
    continueGame.disabled = true;
    retrieveWord.disabled = true;
};

// Function to restart the game
const restartGame = () => {
    score = 0;
    wrongGuesses = 0;
    word = "";
    userLength.value="";
    usersGuess.value = "";
    output.textContent = "";
    rightOrWrong.textContent = "";
    solution.textContent = "";
    userLength.disabled = false;
    continueGame.disabled = false;
    usersGuess.disabled = false;
    check.disabled = false;
    updateScore();
};

// Function to retrieve and scramble a word
const handleSubmit = async () => {
    const length = userLength.value.trim(); 

    if (!length || isNaN(length) || length < 2 || length > 15) {
        output.textContent = "❌ Enter a number between 2 and 15.";
        output.style.color = "red";
        return;
    }

    try {
        const res = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const wordArray = await res.json();
        word = wordArray[0]; // Get the word

        let scrambled = scramble(word);
        output.textContent = scrambled;
        output.style.color = "white"; 
    } catch (error) {
        console.error("Error fetching data:", error);
        output.textContent = "❌ Error fetching word.";
        output.style.color = "red";
    }
};

// Scramble function using Fisher-Yates shuffle
const scramble = (word) => {
    let arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
    return arr.join('');
};

// Check if the guessed word is correct
const checkGuess = () => {
    if (hasPlayed) return; 

    let userGuess = usersGuess.value.trim().toLowerCase();

    if (!word) {
        rightOrWrong.textContent = "❌ No word generated yet!";
        rightOrWrong.style.color = "red";
        return;
    }

    if (userGuess === word.toLowerCase()) {
        rightOrWrong.textContent = "✅ That's Correct!";
        rightOrWrong.style.color = "green";
        score++; 
        check.disabled = true;
        retrieveWord.disabled = true;
        hasPlayed = true;
        updateScore();
    } else {
        rightOrWrong.textContent = "❌ That's Incorrect!";
        rightOrWrong.style.color = "red";
        wrongGuesses++;
        retrieveWord.disabled = true;


        if (wrongGuesses >= 3) {
            gameOver(); // Stop the game
        }
    }
};

// Event Listeners
retrieveWord.addEventListener("click", (e) => {
    e.preventDefault();
    handleSubmit();
});

userLength.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
    }
});

check.addEventListener("click", (e) => {
    e.preventDefault();
    checkGuess();
});

usersGuess.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        checkGuess();
    }
});

// Restart button listener
restartButton.addEventListener("click", (e) => {
    e.preventDefault();
    restartGame();
});

continueGame.addEventListener("click", (e) => {
    e.preventDefault();
    word = "";
    userLength.value="";
    usersGuess.value = "";
    output.textContent = "";
    rightOrWrong.textContent = "";
    solution.textContent = "";
    usersGuess.disabled = false;
    check.disabled = false;
    hasPlayed = false;
    retrieveWord.disabled = false;
    updateScore();
});

function startGame() {
    window.location.href = "loading.html";
};

function loading() {
    alert("Alright! Take your time.");
}

// Initialize score display
updateScore();
