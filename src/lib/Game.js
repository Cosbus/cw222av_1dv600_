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

  async startGame () {
    await this.displayMainMenu().then(async choice => {
      switch (choice.choice) {
        case 'Play Game!':
          this.playAWord()
          break
        case 'Quit game.':
          let ans = await this.terminateGame()
          if (ans === 'y') {
            process.exit()
          } else {
            clear()
            this.startGame()
          }
          break
        default:
          clear()
          console.log('Not implemented yet')
          this.startGame()
          break
      }
    })
  }

  /**
   * A function which displays the main menu of the game and returns a promise of the user choice.
   *
   * @return {[promise]} the promise containing the user choice.
   * @memberof Game
   */
  async displayMainMenu () {
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
      console.log('Remember, you can always quit by writing "q-t"')
      await this.getUserInput('Please provide a letter')
        .then(async answer => {
          if (answer.answer === 'q-t') {
            await this.terminateGame()
          } else if (word.hasLetter(answer.answer)) {
            console.log('Correct!')
            if (word.getNoOfLetters() === 0) {
              console.log(`Yes, the word was "${word.getWord()}"!`)
              console.log('You won!')
              await this.getUserInput('Do you want to solve a new word [y/n]?')
                .then(answer => {
                  if (answer.answer === 'y') {
                    this.playAWord()
                  } else {
                    console.log('Ok, quitting...')
                    process.exit()
                  }
                })
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
   * A function which querys the user if the game really is to be terminated
   * and then responds accordingly.
   *
   * @memberof Game
   */
  async terminateGame () {
    await this.getUserInput('Are you sure you want to quit [y/n]?').then(answer => {
      if (answer.answer === 'y') {
        process.exit()
      } else {
        console.log('Ok, continuing.')
      }
    })
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
          if ((value.length === 1) || (value === 'q-t')) { return true } else { return 'Please provide one letter.' }
        }
      }]
    return inquirer.prompt(questions)
  }
}

module.exports = Game
