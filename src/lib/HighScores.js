/**
 * Module for HighScores.
 *
 * @module src/lib/HighScores.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which keep track of the high-score within the application.
 *
 * @class HighScores
 */
class HighScores {
  /**
   * Creates an instance of HighScores.
   *
   * @param {string} fileName, the fileName of the high-score list.
   *
   * @memberof HighScores
   * @constructor
   */
  constructor (fileName = 'highscores.json') {
    this._fileName = fileName
    this._path = './data' + fileName
  }

  /**
   * A function which returns the filename of the high-score
   *
   * @returns {string} the filename of the high-score
   * @memberof HighScores
   */
  getFileName () {
    return this._fileName
  }
}

module.exports = HighScores
