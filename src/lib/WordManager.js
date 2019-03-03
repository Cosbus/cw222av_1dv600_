
/**
 * Module for WordManager.
 *
 * @module src/lib/WordManager.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const WordList = require('./WordList.js')
const funcs = require('./Funcs')
const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')
const FileHandler = require('./FileHandler.js')
const clear = require('clear')

/**
 * A class which handles the managing of words.
 *
 * @class WordManager
 * */
class WordManager {
  /**
   * Creates an instance of WordManager.
   *
   * @memberof WordManager
   * @constructor
   */
  constructor () {
    this._FileHandler = new FileHandler()
  }

  /**
   * A which serves as the entry point to the manage word menu and handles the logic.
   *
   * @return {[promise]} the promise containing the user choice.
   * @memberof WordManager
   */
  async start () {
    this.displayManageMenu().then(async choice => {
      switch (choice.choice) {
        case 'Add word':
          let word = await funcs.getUserWordInput('Input a word')
          let difficultyAdd = await funcs.getDifficulty()
          await this._FileHandler.saveWordtoList(difficultyAdd.choice, word.answer)
          clear()
          this.start()
          break
        case 'Delete word':
          console.log('Remove word. Which difficulty are you interested in?')
          let difficultyRem = (await funcs.getDifficulty()).choice
          let list = await this._FileHandler.loadWordList(difficultyRem)
          console.log('Choose a word to delete.')
          let wordToRemove = (await funcs.getAnswerToPrompt(list)).choice
          let ans = await funcs.getUserInput(`Are you sure you want to remove ${wordToRemove} quit [y/n]?`)
          if (ans.answer === 'y') {
            await this._FileHandler.removeWordfromList(difficultyRem, wordToRemove)
            this.start()
          } else {
            console.log('Ok, maybe a wise choice?')
            this.start()
          }

          break
        case 'Main menu':
          break
        case 'Update word':
          break
        default:
          console.log('Not implemented yet')
          break
      }
    })
  }

  /**
   * A function which displays the word managment menu and returns a promise of the user choice.
   *
   * @return {[promise]} the promise containing the user choice.
   * @memberof WordManager
   */
  async displayManageMenu () {
    console.log(chalk.blue(figlet.textSync('Manage Word Menu', { horizontalLayout: 'full' })))

    return funcs.getAnswerToPrompt(['Add word', 'Update word', 'Delete word', 'Main menu'])
  }
}

module.exports = WordManager
