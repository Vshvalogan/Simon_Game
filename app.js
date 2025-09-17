/*-------------------------------- Constants --------------------------------*/
let score = 0;
let colournumber = [];
let playerIndex = 0;
let palette = [];    
let currentLevel = "Easy";
let seqLen = 4;
let roundsWon = 0;        // how many rounds won in this game (0..3)
const nextRoundTarget = 3; // win after 3 rounds
let lives = 1;
let gameOver = false;


/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

const levelButtons = document.querySelectorAll(".level");
const getname = document.getElementById("nameSubmit");
const startgame = document.getElementById("start-game-button")
const resetgame = document.getElementById("reset-btn")
const gameButtons = document.querySelectorAll(".btn");
const start = document.getElementById("start-color-button");
const nextRoundBtn = document.getElementById("next-round-button");

/*-------------------------------- Functions --------------------------------*/
function handleLevelClick(e) {
  currentLevel = e.target.textContent; // "Easy" | "Difficult" | "Hard"
  document.getElementById("welcomeScreen").classList.add("hide");
  document.getElementById("name").classList.remove("hide");
}

function handleNameSubmit() {
  const text = document.querySelector("#input-box").value;
  document.getElementById("enteredname").textContent= text;
  
  if (text !== "") {
    document.getElementById("name").classList.add("hide");
    document.getElementById("start").classList.remove("hide");
  }
}
function handleStartgame() {
  document.getElementById("start").classList.add("hide");
  document.getElementById("gamescreen").classList.remove("hide");
  roundsWon = 0;
  nextRoundBtn.classList.add("hide");
  coloursequence();
}


function handlereset(){
  const name = document.getElementById("enteredname").textContent;
  score = 0;
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("gamescreen").classList.add("hide");
  document.getElementById("status").classList.add("hide");
  document.getElementById("welcomeScreen").classList.add("hide");
  document.getElementById("start").classList.remove("hide");
  document.querySelector("#start h2").textContent = "Ready to play again?";
  document.getElementById("start-color-button").classList.remove("hide");
  document.getElementById("enteredname").textContent = name;
  roundsWon = 0;
  nextRoundBtn.classList.add("hide");

}

function highlightButton(colorId) {
  const btn = document.getElementById(colorId);
  btn.classList.add("active");

  setTimeout(() => {
    btn.classList.remove("active");      //https://stackoverflow.com/questions/63908648/settimeout-classlist-add-remove-very-erratic
  }, 500); 
}

function coloursequence(){
  // Hide all extras first
  ["orange","purple","pink","cyan"].forEach(id =>
    document.getElementById(id).classList.add("hide")
  );

  // Base 4
  palette = ["green","red","yellow","blue"];

  if (currentLevel === "Difficult") {
    // 6 colours, 8 steps
    palette = ["green","red","yellow","blue","orange","purple"];
    seqLen = 6;
    ["orange","purple"].forEach(id =>
      document.getElementById(id).classList.remove("hide")
    );
  } else if (currentLevel === "Hard") {
    // 8 colours, 10 steps
    palette = ["green","red","yellow","blue","orange","purple","pink","cyan"];
    seqLen = 8;
    ["orange","purple","pink","cyan"].forEach(id =>
      document.getElementById(id).classList.remove("hide")
    );
              
  }

  colournumber = [];
  for (let i = 0; i < seqLen; i++) {
    const randomNumber = Math.floor(Math.random() * palette.length);
    colournumber.push(randomNumber);
  }
  if (currentLevel === "Hard") {
  lives = 3;
  } else if (currentLevel === "Difficult") {
  lives = 2;
  } else {
  lives = 1; // Easy
  }

}



function sequencehighlight(){
  for(let i=0; i<colournumber.length; i++){
    let x = palette[colournumber[i]];
    setTimeout(() => {
      highlightButton(x); 
    }, i * 800); // https://stackoverflow.com/questions/63908648/settimeout-classlist-add-remove-very-erratic
  }

}

function handlestart(){
  document.getElementById("status").textContent="Status: Watch your Sequence";
  document.getElementById("status").classList.remove("hide");
  document.getElementById("start-color-button").classList.add("hide")   
  coloursequence();
  sequencehighlight();
  playerIndex = 0;
  nextRoundBtn.classList.add("hide");
  gameOver = false;

}

function handleGameButtonClick(colorId){
  highlightButton(colorId);
  const clickedIndex = palette.indexOf(colorId);
  if (clickedIndex !== colournumber[playerIndex]) {
    if (gameOver) return;

    lives -= 1;
    document.getElementById("lives").textContent = `Lives: ${lives}`;
    if (lives <= 0) {
      document.getElementById("status").textContent = "Life over — Game ends.";
      gameOver = true;
      nextRoundBtn.classList.add("hide");
      return;
    }

    // still have lives: inform and replay same sequence
    document.getElementById("status").textContent = `Wrong! Lives left: ${lives}. Watch the sequence again.`;
    playerIndex = 0;               
    setTimeout(() => sequencehighlight(), 600); 
    return;
  }

  playerIndex++;
  if (playerIndex === colournumber.length) {
  document.getElementById("status").textContent = "Status: You win!";

  // Score by difficulty
  if (seqLen === 8) {
    score = score + 3;
  } else if (seqLen === 6) {
    score = score + 2;
  } else {
    score = score + 1;
  }
  document.getElementById("score").textContent = `Score: ${score}`;

  // also show score under the name
  
  // Round progression
  roundsWon += 1;

  if (roundsWon >= nextRoundTarget) {
    document.getElementById("status").textContent = "🎉 You won the game!";
    nextRoundBtn.classList.add("hide"); // no more rounds
  } else {
    // show Next Round button
    nextRoundBtn.classList.remove("hide");
    document.getElementById("status").textContent = `Round ${roundsWon} complete — press Next Round`;
  }
}

}

function handleNextRound() {
  // prepare next round in same level
  gameOver = false;
  playerIndex = 0;
  document.getElementById("status").textContent = "Status: Watch your Sequence";
  nextRoundBtn.classList.add("hide");          // hide the button while playing
  document.getElementById("start-color-button").classList.add("hide"); // keep Start hidden

  // new sequence, same level
  coloursequence();
  sequencehighlight();
}


/*----------------------------- Event Listeners -----------------------------*/

for (let i = 0; i < levelButtons.length; i++) {
  levelButtons[i].addEventListener("click", handleLevelClick);
}
getname.addEventListener("click", handleNameSubmit);
startgame.addEventListener("click", handleStartgame);
resetgame.addEventListener("click",handlereset);
start.addEventListener("click",handlestart);

for (let i = 0; i < gameButtons.length; i++) {
  gameButtons[i].addEventListener("click",  () => {
    handleGameButtonClick(gameButtons[i].id);
  });
} 
resetgame.addEventListener("click",handlereset);
nextRoundBtn.addEventListener("click", handleNextRound);

