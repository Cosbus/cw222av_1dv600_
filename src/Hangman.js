/**
 * Module for Hangman.
 *
 * The starting point of the application
 *
 * @module src/app.js
 * @author Claes Weyde
 * @version 1.0.0
 */
'use strict'

// Import modules
const Player = require('./lib/Player.js')
const HighScores = require('./lib/HighScores.js')
const FileHandler = require('./lib/FileHandler.js')
const Game = require('./lib/Game.js')
const Word = require('./lib/Word.js')

// Instantiate objects
let player = new Player('Hangman')
let highscores = new HighScores('Highscores')
let fileHandler = new FileHandler()
let game = new Game()

console.log('Hello', player.getName())
console.log('Your scores will be saved in the file:', highscores.getFileName())
console.log('The current path of the application is:', fileHandler.getCurrentPath())
console.log('But all persistent data will be stored in the folder: ', fileHandler.getDataPath())
const run = async () => {
  await game.displayMainMenu().then(choice => {
    console.log(choice.choice)
    switch (choice.choice) {
      case 'Play Game!':
        game.playAWord()
        break
      case 'Quit game.':
        console.log('Very well...')
        break
      default:
        console.log('Not implemented yet, quitting...')
        break
    }
  })
}

run()
