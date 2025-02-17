// Selecting elements from the DOM
const button1 = document.getElementById("submitLen"),
      input1 = document.getElementById("length"),
      output = document.getElementById("output"),
      button2 = document.getElementById("check"),
      input2 = document.getElementById("guess"),
      rightOrWrong = document.getElementById("correct"),
      solution = document.getElementById("solution"),
      scoreDisplay = document.getElementById("scoreDisplay"),
      continueGame = document.getElementById("continue"),
      restartButton = document.getElementById("restart"); // Restart button

let score = 0; // Initialize score
let wrongGuesses = 0; // Track wrong guesses
let word = ""; // Stores the original word

// Function to update score display
const updateScore = () => {
    scoreDisplay.textContent = `Score: ${score}`;
};

// Function to update game state when max wrong guesses reached
const gameOver = () => {
    rightOrWrong.textContent = "❌ Game Over!";
    rightOrWrong.style.color = "red";
    solution.textContent = `Solution: ${word}`; // Show the correct word
    input1.disabled = true;
    input2.disabled = true; // Disable input
    button2.disabled = true; // Disable check button
    continueGame.disabled = true;
};

// Function to restart the game
const restartGame = () => {
    score = 0;
    wrongGuesses = 0;
    word = "";
    input1.value="";
    input2.value = "";
    output.textContent = "";
    rightOrWrong.textContent = "";
    solution.textContent = "";
    input1.disabled = false;
    continueGame.disabled = false;
    input2.disabled = false;
    button2.disabled = false;
    updateScore();
};

// Function to retrieve and scramble a word
const handleSubmit = async () => {
    const length = input1.value.trim(); 

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
        output.style.color = "black"; 
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
    let userGuess = input2.value.trim().toLowerCase();

    if (!word) {
        rightOrWrong.textContent = "❌ No word generated yet!";
        rightOrWrong.style.color = "red";
        return;
    }

    if (userGuess === word.toLowerCase()) {
        rightOrWrong.textContent = "✅ That's Correct!";
        rightOrWrong.style.color = "green";
        score++; 
        updateScore();
    } else {
        rightOrWrong.textContent = "❌ That's Incorrect!";
        rightOrWrong.style.color = "red";
        wrongGuesses++;

        if (wrongGuesses >= 3) {
            gameOver(); // Stop the game
        }
    }
};

// Event Listeners
button1.addEventListener("click", (e) => {
    e.preventDefault();
    handleSubmit();
});

input1.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
    }
});

button2.addEventListener("click", (e) => {
    e.preventDefault();
    checkGuess();
});

input2.addEventListener("keydown", (e) => {
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
    input1.value="";
    input2.value = "";
    output.textContent = "";
    rightOrWrong.textContent = "";
    solution.textContent = "";
    input2.disabled = false;
    button2.disabled = false;
    updateScore();
});

// Initialize score display
updateScore();
