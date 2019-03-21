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
 *
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

/**
 * Setting up a new word object
 */
word.setWord('hangman')

/**
 * Testing the generateWordString method
 */
describe('Word:generateWordString', function () {
  context('when called with the array ["s","t","u","d","i","o"] and ["s","u","o"]', function () {
    it('should return "_t_di_"', function () {
      let actual = word.generateWordString(['s', 't', 'u', 'd', 'i', 'o'], ['s', 'u', 'o'])
      assert.equal(actual, ' _ t _ d i _')
    })
  })
})

describe('Word:generateWordString', function () {
  context('when called with the array ["s","t","u","d","i","o"] and [""]', function () {
    it('should return " s t u d i o"', function () {
      let actual = word.generateWordString(['s', 't', 'u', 'd', 'i', 'o'], [''])
      assert.equal(actual, ' s t u d i o')
    })
  })
})

describe('Word:generateWordString', function () {
  context('when called with the array ["s","t","u","d","i","o"] and ["s","t","u","d","i","o"]', function () {
    it('should return " _ _ _ _ _ _"', function () {
      let actual = word.generateWordString(['s', 't', 'u', 'd', 'i', 'o'], ['s', 't', 'u', 'd', 'i', 'o'])
      assert.equal(actual, ' _ _ _ _ _ _')
    })
  })
})
