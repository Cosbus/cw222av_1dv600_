/**
 * Module for Game.
 *
 * @module src/lib/Game.js
 * @author Claes Weyde
 * @version 1.0.0
 */

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
    this._greeting = `***********\n* Welcome *\n***********`
  }

  /**
   * A function which displays the main menu of the game
   *
   * @memberof Game
   */
  displayMenu () {
    console.log(this._greeting)
  }
}

module.exports = Game
