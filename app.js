/*-------------------------------- Constants --------------------------------*/
let score = 0;
let color=["green","red","yellow","blue"]
let colournumber = [];
let playerIndex = 0;
/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/

const levelButtons = document.querySelectorAll(".level");
const getname = document.getElementById("nameSubmit");
const startgame = document.getElementById("start-game-button")
const resetgame = document.getElementById("reset-btn")
const gameButtons = document.querySelectorAll(".btn");
const start = document.getElementById("start-color-button");
/*-------------------------------- Functions --------------------------------*/
function handleLevelClick() {
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
}

function handlereset(){
  document.getElementById("enteredname").textContent= "";
  document.getElementById("welcomeScreen").classList.remove("hide");
  document.getElementById("gamescreen").classList.add("hide");
  document.getElementById("status").classList.add("hide");
  document.getElementById("start-color-button").classList.remove("hide")
}
function highlightButton(colorId) {
  const btn = document.getElementById(colorId);
  btn.classList.add("active");

  setTimeout(() => {
    btn.classList.remove("active");      //https://stackoverflow.com/questions/63908648/settimeout-classlist-add-remove-very-erratic
  }, 500); 
}

function coloursequence(){
  for(let i=0;i<color.length;i++){
    const randomNumber = Math.floor(Math.random() * 4); //https://www.w3schools.com/js/js_random.asp
    colournumber[i] = randomNumber
  }
}
function sequencehighlight(){
  for(let i=0; i<colournumber.length; i++){
    let x = color[colournumber[i]];
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
}

function handleGameButtonClick(colorId){
  highlightButton(colorId);
  const clickedIndex = color.indexOf(colorId);
  if (clickedIndex !== colournumber[playerIndex]) {
    document.getElementById("status").textContent = "Status: You lose";
    return;
  }
  playerIndex++;
  if (playerIndex === colournumber.length) {
    document.getElementById("status").textContent = "Status: You win!";
    score = score+1;
    document.getElementById("score").textContent = `Score: ${score}`;
  }
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
  gameButtons[i].addEventListener("click", function () {
    handleGameButtonClick(gameButtons[i].id);
  });
} 
resetgame.addEventListener("click",handlereset);
