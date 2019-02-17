/**
 * Module for Game.
 *
 * @module src/lib/Game.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const figlet = require('figlet')
const clear = require('clear')
const chalk = require('chalk')
const inquirer = require('inquirer')
const Word = require('./Word.js')

const WordList = require('./WordList.js')

/**
 * A class which handles the Game.
 *
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   *
   * @memberof Game
   * @constructor
   */
  constructor () {
    this._userInput = ''
    this._words = []
    this._wordList = new WordList()
    this._tries = 5
  }

  /**
   * A function which displays the main menu of the game and returns a promise of the user choice.
   *
   * @return {[promise]} the promise containing the user choice.
   * @memberof Game
   */
  async displayMainMenu () {
    clear()
    console.log(chalk.yellow(figlet.textSync('The Marvelous', { horizontalLayout: 'full' })))
    console.log(chalk.yellow(figlet.textSync('Hanging Man', { horizontalLayout: 'full' })))
    console.log(chalk.blue(figlet.textSync('Main Menu', { horizontalLayout: 'full' })))

    const questions = [
      {
        type: 'list',
        name: 'choice',
        message: 'Make a choice:',
        choices: ['Play Game!', 'Manage words.', 'See high-scores.', 'Quit game.']
      }]
    return inquirer.prompt(questions)
  }

  async playAWord () {
    clear()
    let word = this._wordList.getWordFromList()
    while (word.getNoOfLetters() > 0 && this._tries > 0) {
      console.log(`This word still contains ${word.getNoOfLetters()} unsolved letters.`)
      if (this._tries > 1) {
        console.log(`You have ${this._tries} tries left.`)
      } else {
        console.log(`You have ${this._tries} try left.`)
      }
      await this.getUserInput('Please provide a letter')
        .then(answer => {
          if (word.hasLetter(answer.answer)) {
            console.log('Correct!')
            if (word.getNoOfLetters() === 0) {
              console.log(`Yes, the word was "${word.getWord()}"!`)
              console.log('You won!')
              return true
            }
          } else {
            this._tries--
            console.log('Unfortunately wrong :(')
            if (this._tries === 0) {
              console.log('You lost')
              return false
            }
          }
        })
    }
  }

  /**
   * A function which given a question retrieves an input from the User.
   *
   * @param {string} question - the question to ask the user.
   * @return {[Promise]} a promise containing the user answer.
   *
   * @memberof Game
   */
  async getUserInput (question) {
    const questions = [
      {
        type: 'input',
        name: 'answer',
        message: question,
        validate: function (value) {
          if (value.length === 1) { return true } else { return 'Please provide one letter.' }
        }
      }]
    return inquirer.prompt(questions)
  }
}

module.exports = Game
