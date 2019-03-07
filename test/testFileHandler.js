/**
 * Test module for FilHandler
 *
 * @module test/testFileHandler.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const Filehandler = require('../src/lib/FileHandler.js')
const fh = new Filehandler()

/**
 * Testing the loadwordlist function of filehandler
 */
describe('FileHandler:loadWordList', function () {
  context('with "difficulty" set to "easy"', function () {
    it('should return an array with length > 1', function () {
      return fh.loadWordList('easy')
        .then(function (array) {
          expect(array).to.be.a('array').and.to.have.lengthOf.above(1)
        })
    })
  })

  context('with "difficulty" set to "moderate"', function () {
    it('should return an array with length > 1', function () {
      return fh.loadWordList('moderate')
        .then(function (array) {
          expect(array).to.be.a('array').and.to.have.lengthOf.above(1)
        })
    })
  })

  context('with "difficulty" set to "hard"', function () {
    it('should return an array with length > 1', function () {
      return fh.loadWordList('hard')
        .then(function (array) {
          expect(array).to.be.a('array').and.to.have.lengthOf.above(1)
        })
    })
  })

  context('with "difficulty" set to nothing', function () {
    it('should throw an error', async () => {
      await expect(fh.loadWordList('')).to.be.rejected
    })
  })
})
