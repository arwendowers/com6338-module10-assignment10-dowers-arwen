const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

    guessLetter(letter) {
      // returns if letter has already been guessed
      if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)) {
        return
      }
      
      if (this.word.includes(letter)) {
        this.displayWord = this.displayWord
          .split("")
          .map((char, index) => (this.word[index] === letter ? letter : char))
          .join("")
        this.correctLetters.push(letter)
      } else {
        this.remainingGuesses -= 1
        this.incorrectLetters.push(letter)
      }
    }

    updateScreen() {
      const guessesLeft = document.getElementById('remaining-guesses')
      guessesLeft.textContent = this.remainingGuesses

      const wrongLetters = document.getElementById('incorrect-letters')
      wrongLetters.textContent = this.incorrectLetters

      const currentWord = document.getElementById('word-to-guess')
      currentWord.textContent = this.displayWord
    }

    isGameOver() {
      if (this.remainingGuesses <= 0 || this.word === this.displayWord) {
        return true
      } else {
        return false
      }
    }

    getWinOrLoss() {
      if (this.word === this.displayWord && this.remainingGuesses > 0) {
        return 'win'
      }
      else if (this.word != this.displayWord && this.remainingGuesses <= 0) {
        return 'loss'
      }
      else {
        return null
      }
    }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()