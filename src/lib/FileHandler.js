/**
 * Module for FileHandler.
 *
 * @module src/lib/FileHandler.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const fse = require('fs-extra')
const path = require('path')

/**
 * A class which handles the files within the application.
 *
 * @class FileHandler
 */
class FileHandler {
  /**
   * Creates an instance of FileHandler.
   *
   * @memberof FileHandler
   * @constructor
   */
  constructor () {
    this._currentPath = __dirname
    this._dataPath = './data'
    this._hardWordsPath = path.join(path.join(this._currentPath, this._dataPath), 'hardWords.txt')
    this._easyWordsPath = path.join(path.join(this._currentPath, this._dataPath), 'easyWords.txt')
    this._moderateWordsPath = path.join(path.join(this._currentPath, this._dataPath), 'moderateWords.txt')
  }

  /**
   * A function which given a difficulty returns an array of words.
   *
   * @param {string} difficulty - the difficulty of the words to return
   * @returns {[promise]} an array containing a promise of strings of words.
   * @memberof FileHandler
   */
  async loadWordList (difficulty) {
  /**
   * A helper function which loads a list of words given a specific path.
   *
   * @param {string} path - the path of the file of the words to return
   * @returns {[promise]} an array containing a promise of strings of words.
   * @memberof loadWordList
   */
    const rf = async function (path) {
      return fse.readFile(path, 'utf8')
        .then(words => {
          return words.split(', ')
        })
    }

    switch (difficulty.toLowerCase()) {
      case 'easy':
        return rf(this._easyWordsPath)
      case 'moderate':
        return rf(this._moderateWordsPath)
      case 'hard':
        return rf(this._hardWordsPath)
      default:
        console.log('Something went wrong')
        break
    }
  }

  /**
   * A function which removes a word from a given list.
   *
   * @param {string} difficulty - the difficulty of the word to remove (to find the file)
   * @param {string} word - the word to remove
   * @memberof FileHandler
   */
  async removeWordfromList (difficulty, word) {
  /**
   * A helper function which removes a word given a specific path and the word.
   *
   * @param {string} path - the path of the file to remove the word from
   * @param {string} word - the word to remove
   * @memberof removeWordfromList
   */
    const rw = async function (path, content) {
      let words = await fse.readFile(path, 'utf8')
      let str = words.replace(', ' + content, '')
      fse.writeFile(path, str, function (err) {
        if (err) throw err
        console.log(`${content} successfully removed!`)
      })
    }

    switch (difficulty.toLowerCase()) {
      case 'easy':
        rw(this._easyWordsPath, word)
        break
      case 'moderate':
        rw(this._moderateWordsPath, word)
        break
      case 'hard':
        rw(this._hardWordsPath, word)
        break
      default:
        console.log('Something went wrong')
        break
    }
  }

  /**
   * A function which given a difficulty saves a word to the list.
   *
   * @param {string} difficulty - the difficulty of the words to return
   * @param {string} word - the word to save
   * @memberof FileHandler
   */
  async saveWordtoList (difficulty, word) {
  /**
   * A helper function which saves a word given a specific path and the word.
   *
   * @param {string} path - the path of the file to save in
   * @param {string} word - the word to save
   * @returns {string} - succesfully saved
   * @memberof saveWordtoList
   */
    const sf = async function (path, content) {
      console.log(content)
      await fse.appendFile(path, ', ' + content, function (err) {
        if (err) throw err
        console.log('Succesfully saved')
      })
    }

    switch (difficulty.toLowerCase()) {
      case 'easy':
        sf(this._easyWordsPath, word)
        break
      case 'moderate':
        sf(this._moderateWordsPath, word)
        break
      case 'hard':
        sf(this._hardWordsPath, word)
        break
      default:
        console.log('Something went wrong')
        break
    }
  }

  /**
   * A function which returns the current path
   *
   * @returns {string} the current path of the application
   * @memberof FileHandler
   */
  getCurrentPath () {
    return this._currentPath
  }

  /**
   * A function which returns the path where the data of the application is stored.
   *
   * @returns {string} the path to the data directory of the application
   * @memberof FileHandler
   */
  getDataPath () {
    return this._dataPath
  }
}

module.exports = FileHandler
