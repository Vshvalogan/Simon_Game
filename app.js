/*-------------------------------- Constants --------------------------------*/
let score = 0;
let colournumber = [];
let playerIndex = 0;
let palette = [];    
let currentLevel = "Easy";
let seqLen = 4;
let roundsWon = 0;       
const nextRoundTarget = 3; 
let lives = 1;
let gameOver = false;
const SND = {
  beep:  document.getElementById("snd-beep"),
  wrong: document.getElementById("snd-wrong"),   //https://www.w3schools.com/tags/tag_audio.asp
  next:  document.getElementById("snd-next"),
  win:   document.getElementById("snd-win"),
  lose:  document.getElementById("snd-lose"),
};


/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

const levelButtons = document.querySelectorAll(".level");
const getname = document.getElementById("nameSubmit");
const startgame = document.getElementById("start-game-button");
const gameButtons = document.querySelectorAll(".btn");
const start = document.getElementById("start-color-button");
const nextRoundBtn = document.getElementById("next-round-button");
const playAgainBtn = document.getElementById("play-again-btn");
const quitBtn = document.getElementById("quit-btn");

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

  if (currentLevel === "Hard") {
    lives = 4;
  } else if (currentLevel === "Difficult") {
    lives = 3;
  } else {
    lives = 2;
  }
  document.getElementById("lives").textContent = `Lives: ${lives}`;

  coloursequence();
}



function handlePlayAgain() {
  score = 0;
  roundsWon = 0;
  gameOver = false;

  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("gamescreen").classList.add("hide");
  document.getElementById("status").classList.add("hide");
  document.getElementById("start").classList.remove("hide");
  document.querySelector("#start h2").textContent = "Ready to play again?";
  document.getElementById("start-color-button").classList.remove("hide");
  nextRoundBtn.classList.add("hide");
}
function handleQuitGame() {
  score = 0;
  roundsWon = 0;
  gameOver = false;

  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("gamescreen").classList.add("hide");
  document.getElementById("name").classList.add("hide");
  document.getElementById("start").classList.add("hide");
  document.getElementById("status").classList.add("hide");
  nextRoundBtn.classList.add("hide");
  document.getElementById("enteredname").textContent= "";
  document.getElementById("welcomeScreen").classList.remove("hide");
}


function highlightButton(colorId) {
  const btn = document.getElementById(colorId);
  btn.classList.add("active");
  playSound(SND.beep);

  setTimeout(() => {
    btn.classList.remove("active");      //https://stackoverflow.com/questions/63908648/settimeout-classlist-add-remove-very-erratic
  }, 500); 
}

function coloursequence() {
  const extras = ["orange", "purple", "pink", "cyan"];
  for (let i = 0; i < extras.length; i++) {
    document.getElementById(extras[i]).classList.add("hide");
  }

  palette = ["green", "red", "yellow", "blue"];
  seqLen = 4;

  if (currentLevel === "Difficult") {
    palette = ["green", "red", "yellow", "blue", "orange", "purple"];
    seqLen = 6;
    const difficultExtras = ["orange", "purple"];
    for (let i = 0; i < difficultExtras.length; i++) {
      document.getElementById(difficultExtras[i]).classList.remove("hide");
    }
  } else if (currentLevel === "Hard") {
    palette = ["green", "red", "yellow", "blue", "orange", "purple", "pink", "cyan"];
    seqLen = 8;
    const hardExtras = ["orange", "purple", "pink", "cyan"];
    for (let i = 0; i < hardExtras.length; i++) {
      document.getElementById(hardExtras[i]).classList.remove("hide");
    }
  }

  colournumber = [];
  for (let i = 0; i < seqLen; i++) {
    const randomNumber = Math.floor(Math.random() * palette.length);
    colournumber.push(randomNumber);
  }

  
}


function sequencehighlight(){
  for(let i=0; i<colournumber.length; i++){
    let x = palette[colournumber[i]];
    setTimeout(() => {
      highlightButton(x); 
    }, i * 800); // https://stackoverflow.com/questions/63908648/settimeout-classlist-add-remove-very-erratic
  }
  const totalTime = colournumber.length * 800; // matches the delay used above
  setTimeout(() => {
    document.getElementById("status").textContent = "Status: Your Turn";
  }, totalTime + 100);

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
  const livesBox = document.getElementById("lives");
  if (livesBox) livesBox.textContent = `Lives: ${lives}`;

  playSound(SND.wrong);

  if (lives <= 0) {
    document.getElementById("status").textContent = "Life over — Game ends.";
    gameOver = true;
    nextRoundBtn.classList.add("hide");
    playSound(SND.lose);
    return;
  }

  document.getElementById("status").textContent = `Wrong! Lives left: ${lives}. Watch the sequence again.`;
  document.getElementById("start-color-button").classList.add("hide");
  playerIndex = 0;
  setTimeout(() => sequencehighlight(), 600);
  return;
}


  playerIndex++;
  if (playerIndex === colournumber.length) {
  document.getElementById("status").textContent = "Status: You win!";

  if (seqLen === 8) {
    score = score + 3;
  } else if (seqLen === 6) {
    score = score + 2;
  } else {
    score = score + 1;
  }
  document.getElementById("score").textContent = `Score: ${score}`;

  roundsWon += 1;

  if (roundsWon >= nextRoundTarget) {
    document.getElementById("status").textContent = "🎉 You won the game!";
    nextRoundBtn.classList.add("hide");
    playSound(SND.win);
  } else {
    nextRoundBtn.classList.remove("hide");
    document.getElementById("status").textContent = `Round ${roundsWon} complete — press Next Round`;
    playSound(SND.next);
  }
}


}

function handleNextRound() {
  gameOver = false;
  playerIndex = 0;
  document.getElementById("status").textContent = "Status: Watch your Sequence";
  nextRoundBtn.classList.add("hide");          
  document.getElementById("start-color-button").classList.add("hide"); 

  coloursequence();
  sequencehighlight();
}
function playSound(audio) {
  try {
    audio.currentTime = 0;
    const p = audio.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  } catch (_) {}
}



/*----------------------------- Event Listeners -----------------------------*/

for (let i = 0; i < levelButtons.length; i++) {
  levelButtons[i].addEventListener("click", handleLevelClick);
}
getname.addEventListener("click", handleNameSubmit);
startgame.addEventListener("click", handleStartgame);
playAgainBtn.addEventListener("click", handlePlayAgain);
quitBtn.addEventListener("click", handleQuitGame);
start.addEventListener("click",handlestart);

for (let i = 0; i < gameButtons.length; i++) {
  gameButtons[i].addEventListener("click",  () => {
    handleGameButtonClick(gameButtons[i].id);
  });
} 
nextRoundBtn.addEventListener("click", handleNextRound);

