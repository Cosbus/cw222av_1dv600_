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
const Game = require('./lib/Game.js')

// Instantiate objects
let game = new Game()

const run = async () => {
  await game.goMainMenu()
}

run()
