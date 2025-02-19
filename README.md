# ekreb
Ekreb is a word-scrambling game that tests a player's ability to guess a word from its scrambled form. Players will be prompted to enter a number between 2 and 15, which determines the length of the scrambled word. The longer the word, the more challenging it will be to unscramble. The score reflects the number of correct guesses, but it resets to zero if the player makes three consecutive incorrect guesses.

Here is a link to the game: https://taekim0508.github.io/ekreb/

## design 
**Languages Used**: JavaScript, CSS, HTML 

This project consists of 4 files: _index.html, loading.html, styles.css, script.js._

_**loading.html**_ serves as the introduction page, providing visitors with a brief description of the game and instructions on how to play. After reading the description, visitors are prompted to either start playing or defer. If they choose to proceed, they will be directed to index.html.

_**index.html**_ is where visitors play **ekreb**. They are asked to enter a number representing the length of the scrambled word. The input type is strictly numeric, prohibiting any unnecessary text, symbols, or characters. The word length must be between 2 and 15 characters. The longer the word, the more challenging it is to unscramble. Once the player enters a valid length, the game fetches a word of that length from the Random Word API. This API not only provides random words but also allows users to specify the number of words, desired word length, and language preferences.

Once a word is retrieved, _script.js_ scrambles it, and _index.html_ displays the scrambled version. The player has three attempts to correctly unscramble the word. If they guess correctly, their score increases, and they can continue playing. Otherwise, the game ends. When the game is over, all input fields and buttons are disabled, except for the "Restart Game" button. By selecting "Restart Game," players can start over with a score of 0.

_**style.css**_ defines the game's visual design. I explored CSS effects and animations, which led me to add glowing borders for the scrambled word output. The @keyframes glow animation creates a glowing text effect using the text-shadow property. The transition effect allows the text to subtly pulse by growing more radiant and then fading.

```css
/* Intensifies the glow by adding layered shadows for a brighter, more pronounced effect. */
text-shadow: 0 0 20px #1e90ff, 0 0 30px #1e90ff;
```

_**script.js**_ runs ekreb, enabling players to guess the correct word from a scrambled version. Players input a desired word length, and the game fetches, scrambles, and displays a word of that length. This script also tracks the number of attempts a player has made and determines whether they can continue or must restart. The game offers options to continue playing with new words, restart (resetting all scores and inputs), and display the correct solution when the player fails. The code ensures a user-friendly experience with clear error handling, disabled inputs to prevent unintended actions, and interactive elements for seamless gameplay.
