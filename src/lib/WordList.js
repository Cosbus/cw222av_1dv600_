
/**
 * Module for WordList.
 *
 * @module src/lib/WordList.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const Word = require('./Word.js')
const FileHandler = require('./FileHandler.js')

/**
 * A class which handles a list of words
 *
 * @class WordList
 * */
class WordList {
  /**
   * Creates an instance of WordList.
   *
   * @param {string} [difficulty = easy] - the difficulty level
   * @memberof WordList
   * @constructor
   */
  constructor (difficulty = 'easy') {
    this._list = []
    this._difficulty = difficulty
    this._fileHandler = new FileHandler()
  }

  /**
   * A function which imports a set of words to use for the game.
   *
   * @memberof WordList
   */
  async importWords () {
    let words = await this._fileHandler.loadWordList(this._difficulty).then(wordlist => {
      return wordlist
    })
    words.forEach(word => {
      this._list.push(new Word(word, this._difficulty))
    })
    this._shuffleList()
  }

  /**
   * A function which shuffles the words in the list using the Fisher-Yates algorithm.
   *
   * @memberof WordList
   */
  _shuffleList () {
    let m = this._list.length
    let t
    let i

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--)

      // And swap it with the current element.
      t = this._list[m]
      this._list[m] = this._list[i]
      this._list[i] = t
    }
  }

  /**
   * A function which returns the number of words left in the list.
   *
   * @return {number} the number of words left in the list
   * @memberof WordList
   */
  getWordsLeft () {
    return this._list.length
  }

  /**
   * A function which returns a word from the current list, meanwhile removing
   * that word from the list.
   *
   * @return {Word} the word from the list
   * @memberof WordList
   */
  getWordFromList () {
    return this._list.pop()
  }
}

module.exports = WordList
