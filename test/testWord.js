/**
 * Test module for Word
 *
 * @module test/testWord.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const Word = require('../src/lib/Word.js')
const word = new Word()

/**
 * Setting up the word object
 */
word.setWord('testing')

/**
 * Testing the hasLetter method of Word
 */
describe('Word:hasLetter', function () {
  context('when called for the first time with a letter comprised in the word', function () {
    it('should return true', function () {
      let actual = word.hasLetter('t')
      assert.isTrue(actual)
    })
  })

  context('when called a second time with the same letter which was previously comprised in the word', function () {
    it('should return false', function () {
      let actual = word.hasLetter('t')
      assert.isFalse(actual)
    })
  })

  context('when called with a letter not comprised in the word', function () {
    it('should return false', function () {
      let actual = word.hasLetter('q')
      assert.isFalse(actual)
    })
  })
})
