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
    this._wordList = WordList
    this._tries = 5
  }

  async goMainMenu () {
    await this.displayMainMenu().then(async choice => {
      switch (choice.choice) {
        case 'Play Game!':
          await this.chooseDifficulty()
            .then(ans => {
              return this.configGame(ans.difficulty)
            })
            .then(() => {
              return this.playAWord()
            })

          break
        case 'Quit game.':
          await this.terminateGame()
          clear()
          this.goMainMenu()
          break
        default:
          clear()
          console.log('Not implemented yet')
          this.goMainMenu()
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

  /**
   * A function which prompts the user for the difficulty level.
   *
   * @return {Promise} a promise containing the chosen difficulty
   * @memberof Game
   */
  async chooseDifficulty () {
    console.log('Alright, lets play! But first choose difficulty level.')
    const questions = [
      {
        type: 'list',
        name: 'difficulty',
        message: 'Make a choice:',
        choices: ['Easy', 'Moderate', 'Hard']
      }]
    return inquirer.prompt(questions)
  }

  /**
   * A function which configures the game for the next word to solve.
   *
   * @param {string} difficulty - the difficulty of the word to play.
   * @return {WordList} a wordlist containing the words of the given difficulty
   * @memberof Game
   */
  async configGame (difficulty) {
    clear()
    switch (difficulty) {
      case 'easy':
        this._tries = 7
        break
      case 'moderate':
        this._tries = 5
        break
      case 'hard':
        this._tries = 3
        break
    }
    this._wordList = new WordList(difficulty)
    await this._wordList.importWords()
  }

  /**
   * A function which lets the user solve a word.
   *
   * @param {string} difficulty - the difficulty of the word to play.
   * @memberof Game
   */
  async playAWord () {
    let word = this._wordList.getWordFromList()
    console.log(word)
    while (word.getNoOfLetters() > 0 && this._tries > 0) {
      console.log('\n---------------------------')
      console.log(`This word still contains ${chalk.blue(word.getNoOfLetters())} unsolved letters.`)
      if (this._tries > 1) {
        console.log(`You have ${chalk.red(this._tries)} tries left.`)
      } else {
        console.log(`You have ${chalk.red(this._tries)} try left.`)
      }
      console.log('Remember, you can always quit by writing "q-t"')
      console.log('---------------------------')
      await this.getUserInput('Please provide a letter')
        .then(async answer => {
          if (answer.answer === 'q-t') {
            await this.terminateGame()
          } else if (word.hasLetter(answer.answer)) {
            console.log('Correct!')
            if (word.getNoOfLetters() === 0) {
              console.log(`Yes, the word was "${chalk.green(word.getWord())}"!`)
              console.log('You won!')
              await this.solveNewWord()
            }
          } else {
            this._tries--
            console.log('Unfortunately wrong :(')
            if (this._tries === 0) {
              console.log('You lost')
              console.log(`The word was ${chalk.green(word.getWord())}.`)
              await this.solveNewWord()
            }
          }
        })
    }
  }

  /**
   * A function which querys the user if she/he wants to solve a new word
   * and then responds accordingly.
   *
   * @memberof Game
   */
  async solveNewWord () {
    if (this._wordList.getWordsLeft() > 0) {
      await this.getUserInput('Do you want to solve a new word [y/n]?')
        .then(answer => {
          if (answer.answer === 'y') {
            this.playAWord()
          }
        })
    } else {
      this.goMainMenu()
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
