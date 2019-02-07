/**
 * Module for Player.
 *
 * @module src/lib/Player.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which handles the logic of players within the application.
 *
 * @class Player
 */
class Player {
  /**
   * Creates an instance of Player.
   *
   * @param {string} name, the name of the player instance.
   *
   * @memberof Player
   * @constructor
   */
  constructor (name) {
    this._name = name
  }

  /**
   * A function which returns the name of the player
   *
   * @returns {string} the name of the player
   * @memberof Player
   */
  getName () {
    return this._name
  }

  /**
   * A function which sets the name of the player.
   *
   * @param {string} name, The name to set to the player instance.
   *
   * @memberof Player
   */
  setName (name) {
    this._name = name
  }
}

module.exports = Player
