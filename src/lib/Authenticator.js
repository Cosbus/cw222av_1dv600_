/**
 * Module for Authenticator.
 *
 * @module src/lib/Authenticator.js
 * @author Claes Weyde
 * @version 1.0.0
 */

/**
 * A class which handles the logic for authentication.
 *
 * @class Authenticator
 * */
class Authenticator {
  /**
   * Creates an instance of Authenticator.
   *
   * @memberof Authenticator
   * @constructor
   */
  constructor (num1 = 0, num2 = 0) {
    this._numberOne = num1
    this._numberTwo = num2
  }

  /**
   * A function which randomizes two numbers.
   *
   * @param {number} ceiling - the top of the interval to which the numbers may be randomized
   * @return {[number]} two randomized numbers in an array
   * @memberof Authenticator
   */
  determineNumbers (ceiling) {
    try {
      this._numberOne = Math.ceil(ceiling * Math.random())
      this._numberTwo = Math.ceil(ceiling * Math.random())
    } catch (error) {
      console.log(error)
    }
    return [this._numberOne, this._numberTwo]
  }

  /**
   * A function which given two numbers, returns the sum and an appropriate question
   *
   * @param {number} numberOne - the first number.
   * @param {number} numberTwo - the second number.
   * @return {object} an object containing the sum in theSum property and the question in theQuestion property
   * @memberof Authenticator
   */
  getSumAndQ (numberOne, numberTwo) {
    let numOne = 0
    let numTwo = 0
    if (numberOne) {
      numOne = numberOne
    }
    if (numberTwo) {
      numTwo = numberTwo
    }
    let sum = numOne + numTwo
    let question = `What is ${numOne}+${numTwo}?`
    return { theSum: sum, theQuestion: question }
  }
}

module.exports = Authenticator
