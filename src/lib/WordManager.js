
/**
 * Module for WordManager.
 *
 * @module src/lib/WordManager.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const funcs = require('./Funcs')
const figlet = require('figlet')
const chalk = require('chalk')
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
    this.again = true
  }

  /**
   * A function which serves as the entry point to the manage word menu and handles the logic.
   *
   *  @memberof WordManager
   */
  async start () {
    clear()
    await this.displayManageMenu().then(async choice => {
      switch (choice.choice) {
        case 'Add word':
          while (this.again) {
            try {
              let word = await funcs.getUserWordInput('Input a word:')
              let difficultyAdd = await funcs.getDifficulty()
              await this._FileHandler.saveWordtoList(difficultyAdd.choice, word.answer)
              console.log(chalk.green('Successfully saved'))
              if ((await funcs.getUserInput('Add another word? [y/n]')).answer === 'n') { this.again = false }
            } catch (error) {
              console.log(error)
            }
          }
          this.start()
          break
        case 'Delete word':
          this.again = true
          while (this.again) {
            console.log('Remove word. Which difficulty are you interested in?')
            let difficultyRem = (await funcs.getDifficulty()).choice
            let listRemove = await this._FileHandler.loadWordList(difficultyRem)
            console.log('Choose a word to delete.')
            let wordToRemove = (await funcs.getAnswerToPrompt(listRemove)).choice
            let ansRemove = await funcs.getUserInput(`Are you sure you want to remove "${wordToRemove}" [y/n]?`)
            if (ansRemove.answer === 'y') {
              try {
                await this._FileHandler.removeWordfromList(difficultyRem, wordToRemove)
                console.log(chalk.green(`${wordToRemove} successfully removed!`))
                if ((await funcs.getUserInput('Delete another word? [y/n]')).answer === 'n') { this.again = false }
              } catch (error) {
                console.error(error)
              }
            } else {
              console.log('Ok, maybe a wise choice?')
              this.again = false
            }
          }
          this.start()
          break
        case 'Main menu':
          break
        case 'Update word':
          this.again = true
          while (this.again) {
            try {
              console.log('Update word. Which difficulty are you interested in?')
              let difficultyUpdate = (await funcs.getDifficulty()).choice
              let listUpdate = await this._FileHandler.loadWordList(difficultyUpdate)
              console.log('Choose a word to update.')
              let wordToUpdate = (await funcs.getAnswerToPrompt(listUpdate)).choice
              console.log(`What word do you want to update "${wordToUpdate}" to?`)
              let wordToUpdateTo = (await funcs.getUserWordInput('Input the word:')).answer
              let ansUpdate = await funcs.getUserInput(`Are you sure you want to update "${wordToUpdate}" to "${wordToUpdateTo}" [y/n]?`)
              if (ansUpdate.answer === 'y') {
                await this._FileHandler.updateWordfromList(difficultyUpdate, wordToUpdate, wordToUpdateTo)
                console.log(chalk.green(`${wordToUpdate} successfully updated to ${wordToUpdateTo}`))
                if ((await funcs.getUserInput('Update another word? [y/n]')).answer === 'n') { this.again = false }
              } else {
                console.log('Ok, maybe a wise choice?')
                this.again = false
              }
            } catch (error) {
              console.log(error)
            }
          }
          this.start()
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
