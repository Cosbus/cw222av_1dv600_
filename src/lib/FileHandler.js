/**
 * Module for FileHandler.
 *
 * @module src/lib/FileHandler.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const fse = require('fse')

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
