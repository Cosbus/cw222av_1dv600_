/**
 * Module for Funcs.
 *
 * Some functions to be used in the game.
 *
 * @module src/lib/funcs.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const inquirer = require('inquirer')

/**
   * A function which given a question retrieves an input from the User containing only one letter.
   *
   * @param {string} question - the question to ask the user.
   * @return {[Promise]} a promise containing the user answer.
   *
   * @memberof Funcs
   */
exports.getUserInput = async function (question) {
  const questions = [
    {
      type: 'input',
      name: 'answer',
      message: question,
      validate: function (value) {
        if ((value.length === 1) || (value === 'q-t')) { return true } else { return 'Please provide one letter.' }
      }
    }]
  return inquirer.prompt(questions)
}

/**
   * A function which given a question retrieves an input from the User containing several letters.
   *
   * @param {string} question - the question to ask the user.
   * @return {[Promise]} a promise containing the user answer.
   *
   * @memberof Funcs
   */
exports.getUserWordInput = async function (question) {
  const questions = [
    {
      type: 'input',
      name: 'answer',
      message: question
    }
  ]
  return inquirer.prompt(questions)
}

/**
   * A function which given a numnber of alternatives retrieves the users answer.
   *
   * @param {Array} alternatives - an array containing the alternatives
   * @return {[Promise]} a promise containing the user answer.
   *
   * @memberof Funcs
   */
exports.getAnswerToPrompt = async function (alternatives) {
  const questions = [
    {
      type: 'list',
      name: 'choice',
      message: 'Make a choice:',
      choices: alternatives
    }]
  return inquirer.prompt(questions)
}

/**
   * A helperfunction which gets the difficulty.
   *
   * @return {[Promise]} a promise containing the user answer.
   *
   * @memberof Funcs
   */
exports.getDifficulty = async function () {
  return this.getAnswerToPrompt(['Easy', 'Moderate', 'Hard'])
}
