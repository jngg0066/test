const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const rulesButton = document.getElementById("rules");
const introContainer = document.querySelector(".intro-container");
const gameTitle = document.getElementById("game-title");
const gameSlogan = document.getElementById("game-slogan");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const wrapper = document.querySelector(".wrapper");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
  { name: "Koala", image: "../../img/images/Koala.jpg" },
  { name: "Kangaroo", image: "../../img/images/Kangaroo.jpg" },
  { name: "Emu", image: "../../img/images/Emu.jpg" },
  { name: "Clownfish", image: "../../img/images/Clownfish.jpg" },
  { name: "Cockatooparrot", image: "../../img/images/Cockatooparrot.png" },
  { name: "Kookaburra", image: "../../img/images/Kookaburra.jpg" },
  { name: "Platypus", image: "../../img/images/Platypus.jpg" },
  { name: "Possum", image: "../../img/images/Possum.jpg" },
  { name: "TazmanianDevil", image: "../../img/images/TazmanianDevil.jpeg" },
  { name: "Wallaby", image: "../../img/images/Wallaby.jpg" },
  { name: "Wombat", image: "../../img/images/Wombat.jpg" },
  { name: "Dingo", image: "../../img/images/Dingo.jpg" },
];

let seconds = 0, minutes = 0;
let movesCount = 0, winCount = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              showGameOver();
            }
          } else {
            let tempFirst = firstCard, tempSecond = secondCard;
            firstCard = false;
            secondCard = false;
            setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

const showGameOver = () => {
  clearInterval(interval);
  result.innerHTML = `
    <h2>Game Over</h2>
    <h4>Moves: ${movesCount}</h4>
    <h4>Time: ${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}</h4>
    <button id="play-again">Play Again</button>
  `;
  result.classList.remove("hide");
  stopButton.classList.add("hide");
  document.getElementById("play-again").addEventListener("click", playAgain);
};

const startGame = () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  introContainer.classList.add("hide");
  wrapper.classList.remove("hide");
  stopButton.classList.remove("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
};

const showGameRules = () => {
  const gameRules = `
    Game Rules for "Wildlife Wonders":
    1. Objective: Match pairs of cards featuring various animals.
    2. Click "Start Game" to shuffle and start.
    3. Gameplay:
       - Flip two cards to find a pair.
       - Matching cards remain up.
       - Non-matching cards flip back.
    4. Win by matching all pairs. Fewer moves and less time are better.
    5. Timer and moves counter are tracked.
    6. Stop the game anytime with "Stop Game".
    7. Restart by clicking "Start Game" after stopping or completing a game.
  `;
  alert(gameRules);
};

document.addEventListener('DOMContentLoaded', () => {
  // Make sure the IDs match and are unique in the HTML
  const rulesButton = document.getElementById("rules"); 
  if (rulesButton) {
    rulesButton.addEventListener("click", showGameRules);
  } else {
    console.log("Rules button not found!"); // This will help identify if the button isn't found
  }
});



const stopGame = () => {
  clearInterval(interval);
  wrapper.classList.add("hide");
  introContainer.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
};

const playAgain = () => {
  result.classList.add("hide");
  startGame();
};

const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
};

document.addEventListener('DOMContentLoaded', () => {
  gameTitle.classList.add("animated-title");
  gameSlogan.classList.add("animated-slogan");
  startButton.addEventListener("click", startGame);
  rulesButton.addEventListener("click", showGameRules);
  stopButton.addEventListener("click", stopGame);
});