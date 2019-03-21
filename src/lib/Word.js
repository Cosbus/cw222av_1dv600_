
/**
 * Module for Word.
 *
 * @module src/lib/Word.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which models a single word.
 *
 * @class Word
 * */
class Word {
  /**
   * Creates an instance of Word.
   *
   * @param {string} [word="placeholder"] - the word
   * @param {string} [difficulty="moderate"] - the difficulty of the word (easy, moderate, hard)
   * @memberof Word
   * @constructor
   */
  constructor (word = 'placeholder', difficulty = 'moderate') {
    this._word = word
    this._difficulty = difficulty

    // The letter of the word
    this._lettersFull = []

    // The letters of the word remaining
    this._lettersRemaining = []

    this._setLettersOfWord()
  }

  /**
   * A function which generates a string showing the known letters and the unknown letters as '_'
   *
   * @param {[string]} word - the full word in an array
   * @param {[string]} lettersLeft - the letters remaining in the word
   * @return {string} the string showing the letters and the unknown letters as '_'
   * @memberof Word
   */
  generateWordString (word, lettersLeft) {
    let temp = [...word]
    let hangingWord = ''
    lettersLeft.forEach(lElement => {
      temp.forEach((hElement, index) => {
        if (hElement === lElement) {
          temp.splice(index, 1, '_')
        }
      })
    })
    temp.forEach(element => {
      hangingWord = hangingWord + ' ' + element
    })
    return hangingWord
  }

  /**
   * A function which returns the letters remaining
   *
   * @returns {[string]} An array containing the letters remaining
   * @memberof Word
   */
  getLettersRemaining () {
    return this._lettersRemaining
  }

  /**
   * A function which returns the letters of the full word
   *
   * @returns {[string]} An array containing the letters of the full word
   * @memberof Word
   */
  getLettersFull () {
    return this._lettersFull
  }

  /**
   * A function which returns the word
   *
   * @returns {string} the word
   * @memberof Word
   */
  getWord () {
    return this._word
  }

  /**
   * A function which returns the difficulty
   *
   * @returns {string} the difficulty of the word
   * @memberof Word
   */
  getWordDifficulty () {
    return this._difficulty
  }

  /**
   * A function which sets the word
   *
   * @param {string} word - the word
   * @memberof Word
   */
  setWord (word) {
    this._word = word
    this._setLettersOfWord()
  }

  /**
   * A function which sets the difficulty of the word
   *
   * @param {string} difficulty - the difficulty of the word
   * @memberof Word
   */
  setWordDifficulty (difficulty) {
    this._difficulty = difficulty
  }

  /**
   * A function which returns the number of letters remaining in the word.
   *
   * @return {number} the number of letters remaining.
   * @memberof Word
   */
  getNoOfLetters () {
    return this._lettersRemaining.length
  }

  /**
   * A function which puts the letters of the word in an Array. It also fills the "lettersRemaining" array.
   *
   * @memberof Word
   */
  _setLettersOfWord () {
    this._lettersFull = [...this._word]
    this._lettersRemaining = [...this._word]
  }

  /**
   * A function which determines if a given letter is included in the word.
   * If it does it removes the letter from the "letters Remaining array" and returns true. Otherwise
   * it returns false.
   *
   * @param {string} letter - the letter which is compared to the array
   * @return {boolean} true if the letter was found, false otherwise
   * @memberof Word
   */
  hasLetter (letter) {
    let hasLetter = false
    let tempArray = []
    this._lettersRemaining.map(arrayLetter => {
      if (arrayLetter === letter) {
        hasLetter = true
      } else {
        tempArray.push(arrayLetter)
      }
    })
    this._lettersRemaining = tempArray
    return hasLetter
  }
}

module.exports = Word
