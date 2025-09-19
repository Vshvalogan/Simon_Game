# Simon Game

# ScreenShort

1. Welcome Screen 

![" Welcome Screen "](/pics/image.png)

2. Name Screen

!["Name Screen"](/pics/image-1.png)

3. Start Screen

!["Start Screen"](/pics/image-2.png)

4. Game Screen

!["Game Screen"](/pics/image-3.png)

#  Game Name & Description

Simon Game is a classic memory-based challenge where players repeat a sequence of colors and sounds displayed by the computer.

#  Gameplay

1. The sequence becomes longer and more complex as you progress.

2. Choose between Easy, Difficult, and Hard levels.

3. Each level changes the number of colors, sequence length, and lives available.

4. The game tracks your score and gives options to play again or quit to return to the welcome screen.

💡 Why I Built This Game
I chose to create this project because Simon Game is fun, nostalgic, and engaging. It also gave me the chance to practice JavaScript event handling, DOM manipulation, and game logic, making it a great learning experience.

# Getting Started

🔗 Play the Game Here
GitHub Pages Link : 

Instructions:

1. Choose a difficulty level.

2. Enter your name.

3. Click Start to begin.

4. Watch the sequence carefully.

5. Repeat the sequence by clicking the colored buttons.

6. You have a limited number of lives based on your difficulty.

7. Survive all 3 rounds to win!

# Planning

# (I) Simon Game – User Stories
1. Choose a Level

As a player I can choose a difficulty level (Easy, Difficult, or Hard) from the welcome screen.

Each level sets a different number of colors and lives:

Easy → 4 colors, 2 lives

Difficult → 6 colors, 3 lives

Hard → 8 colors, 4 lives

As a player I know that I need to complete 3 rounds of my chosen level to win the game.

2. Enter Player Name

As a player I must enter my name in the text box.

After entering my name, I can continue to the start screen.

3. Start the Game

As a player I press the Start Game button to begin.

When I start, my score resets to 0.

The game screen is shown with the score, lives, and color buttons.

4. See the Sequence

As a player I see the sequence of colors highlighted one by one.

The sequence length depends on the chosen level.

After the sequence finishes, the status changes to "Your Turn".

5. Repeat the Sequence

As a player I must click the buttons in the same order as shown.

Each click is instantly checked against the sequence.

Each correct click plays a beep sound.

A Mute button on the top right allows me to toggle sound on/off.

6. Mistakes and Lives

As a player if I click the wrong button:

I lose one life and hear the wrong sound.

The status shows my remaining lives.

The same sequence is replayed for me to try again.

If all lives are lost:

The game ends with “Life Over – Game Ends”.

A lose sound plays.

7. Winning a Round

As a player when I complete the sequence correctly:

I win the round, my score increases based on difficulty:

Easy → +1

Difficult → +2

Hard → +3

I hear the next level sound.

A Next Round button appears to continue.

After winning 3 rounds in a row, I win the game:

The status shows “🎉 You won the game!”.

A win sound plays.

8. Restart and Quit

As a player I can click Play Again to restart from the start screen with score reset.

As a player I can click Quit Game to return to the welcome screen and choose a level again.

# (II) Wire Frame

## 1) Welcome Screen

!["Wire Frame Welcome Screen""](/pics/image-4.png)

Actions : 

- Click a level -> go to Name Screen.

## 2) Name Screen

![ "Wire Frame Welcome Screen"](/pics/image-5.png)

Actions:

- Enter name + Continue -> Start Screen.

## 3) Start Screen

![alt text](/pics/image-6.png)

Actions:

- Start Game -> Game Screen (score resets; lives set).

## 4) Game Screen

![alt text](/pics/image-7.png)

States:
- During sequence: Start hidden, Status = “Watch your Sequence”.
- After sequence: Status = “Your Turn”.
- On wrong click: lives--, status shows remaining lives; replay sequence.
- On round win: Next Round visible; status shows “Round (round number) complete…”.
- On game win (3 rounds): Status = “🎉 You won the game!”, Next Round hidden.


# (III). Pseducode and flow

## Key State
- score: number
- colournumber: number[]           
- playerIndex: number             
- palette: string[]                
- currentLevel: "Easy" | "Difficult" | "Hard"
- seqLen: number                  
- roundsWon: number               
- nextRoundTarget: 3
- lives: number                  
- gameOver: boolean
- isMuted: boolean

## Screen Elements (IDs)
- welcomeScreen, name, start, gamescreen
- buttons: .level, .btn, start-game-button, start-color-button, next-round-button
- play-again-btn, quit-btn
- labels: score, lives, status, enteredname
- optional: snd-beep, snd-wrong, snd-next, snd-win, snd-lose (if using <audio> tags)


## High-Level Flow

[Welcome]
  - Choose level -> set currentLevel
  - Go to Name screen

[Name]
  - Input name -> set enteredname
  - Continue -> Start screen

[Start]
  - Start Game:
    - score = 0
    - roundsWon = 0
    - gameOver = false
    - set lives by currentLevel (Easy=2, Difficult=3, Hard=4)
    - show Gamescreen
    - generate new sequence + show sequence (sequencehighlight)
    - playerIndex = 0
    - status = "Watch your Sequence"

[Gamescreen]
  - After sequence finishes -> status = "Your Turn"
  - Player clicks color buttons:
    - highlight button + beep
    - if wrong:
        - lives--
        - if lives <= 0 -> status = "Life over — Game ends", play lose sound, end
        - else: status shows remaining lives; replay same sequence; playerIndex = 0
    - if correct:
        - playerIndex++
        - if playerIndex === seqLen:
            - round won:
              - increase score by difficulty weight
              - roundsWon++
              - if roundsWon === 3 -> status "🎉 You won the game!", play win sound
              - else -> show "Next Round" button, play next sound

  - Next Round:
    - playerIndex = 0
    - generate new sequence + show it
    - status = "Watch your Sequence"

  - Play Again:
    - go to Start screen (keep name)

  - Quit Game:
    - go to Welcome screen (hide name/start/gamescreen)


## Function-Level Pseudocode

handleLevelClick(e):
  currentLevel = e.target.textContent
  hide(welcomeScreen), show(name)

handleNameSubmit():
  name = input.value
  if name not empty:
    set enteredname text
    hide(name), show(start)

handleStartgame():
  hide(start), show(gamescreen)
  roundsWon = 0
  nextRoundBtn.hide()
  set lives based on currentLevel
  update lives label
  coloursequence()
handlestart(): 
  status = "Watch your Sequence"
  show(status), hide(start-color-button)
  coloursequence()
  sequencehighlight()
  playerIndex = 0
  nextRoundBtn.hide()
  gameOver = false

coloursequence():
  hide extra color buttons initially
  palette = base 4
  if level == Difficult:
     palette = base 6
     show orange, purple
     seqLen = 6
  else if level == Hard:
     palette = base 8
     show orange, purple, pink, cyan
     seqLen = 8
  colournumber = []
  for i in 0..seqLen-1:
     colournumber.push(randomInt(0, palette.length-1))

sequencehighlight():
  for i in 0..colournumber.length-1:
     colorId = palette[colournumber[i]]
     setTimeout(i * 800) -> highlightButton(colorId)
  after total duration -> status = "Your Turn"

highlightButton(colorId):
  add .active to button
  play beep (guard by mute)
  setTimeout(500) -> remove .active

handleGameButtonClick(colorId):
  highlightButton(colorId)
  clickedIndex = palette.indexOf(colorId)
  if clickedIndex != colournumber[playerIndex]:
     if gameOver -> return
     lives--
     update lives label
     play wrong sound
     if lives <= 0:
        status = "Life over — Game ends."
        gameOver = true
        nextRoundBtn.hide()
        play lose sound
        return
     status = "Wrong! Lives left: {lives}. Watch the sequence again."
     start-color-button.hide()
     playerIndex = 0
     setTimeout(600) -> sequencehighlight()
     return

  playerIndex++
  if playerIndex == colournumber.length:
     add score by difficulty
     update score label
     roundsWon++
     if roundsWon >= nextRoundTarget:
       status = "🎉 You won the game!"
       nextRoundBtn.hide()
       play win sound
     else:
       nextRoundBtn.show()
       status = "Round {roundsWon} complete — press Next Round"
       play next sound

handleNextRound():
  gameOver = false
  playerIndex = 0
  status = "Watch your Sequence"
  nextRoundBtn.hide()
  start-color-button.hide()
  coloursequence()
  sequencehighlight()

handlePlayAgain():
  score = 0
  roundsWon = 0
  gameOver = false
  update score label
  hide(gamescreen), hide(status)
  show(start)
  set start title = "Ready to play again?"
  show(start-color-button)
  nextRoundBtn.hide()

handleQuitGame():
  score = 0
  roundsWon = 0
  gameOver = false
  update score label
  hide(gamescreen), hide(name), hide(start), hide(status)
  nextRoundBtn.hide()
  show(welcomeScreen)

playSound(audio):
  if isMuted -> return
  audio.currentTime = 0
  audio.play().catch(noop)

muteBtn click:
  toggle isMuted
  button text = "Mute"/"Unmute"

##  Attributions

Sounds: Custom MP3s for beep, wrong, win, lose, and next level.

Fonts: Google Fonts
 – Borel, Mountains of Christmas.

 ## Technologies Used

JavaScript – game logic, sequence generation, sounds

HTML5 – structure, audio, buttons

CSS3 – styling with flex, layouts

For Using Audio file in my html i did it with the help of W3Schools  

link : https://www.w3schools.com/tags/tag_audio.asp

For Highlighting the button function i did it with the help of Stackover Flow

link : https://stackoverflow.com/questions/63908648/settimeout-classlist-add-remove-very-erratic

To get a colour number i used random MATH fuction, which i refered from W3Schools

link: https://www.w3schools.com/js/js_random.asp



## Next Steps (Stretch Goals)

- Add High Score Tracking with Local Storage.

- Build a Leaderboard so multiple players can compare scores.

- Add a time challenge mode (speed-based difficulty).