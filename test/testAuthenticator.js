/**
 * Test module for Authenticator
 *
 * @module test/testAuthenticator.js
 * @author Claes Weyde
 * @version 1.0.0
 */

const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const Authenticator = require('../src/lib/Authenticator.js')
const auth = new Authenticator()

/**
 * Testing the comparePassword method of Authenticator
 */

describe('Authenticator:comparePassword', function () {
  context('for no input', function () {
    it('should return "false"', function () {
      let actual = auth.comparePassword('')
      assert.isFalse(actual)
    })
  })
})

describe('Authenticator:comparePassword', function () {
  context('for wrong string input', function () {
    it('should return "false"', function () {
      let actual = auth.comparePassword('tjhoh')
      assert.isFalse(actual)
    })
  })
})

describe('Authenticator:comparePassword', function () {
  context('for number input', function () {
    it('should return "false"', function () {
      let actual = auth.comparePassword(0)
      assert.isFalse(actual)
      actual = auth.comparePassword(10)
      assert.isFalse(actual)
      actual = auth.comparePassword(543)
      assert.isFalse(actual)
    })
  })
})

describe('Authenticator:comparePassword', function () {
  context('for "deconstructor" ', function () {
    it('should return "true"', function () {
      let actual = auth.comparePassword('deconstructor')
      assert.isTrue(actual)
    })
  })
})

/* Testing the determineNumbers method of Authenticator
 *
describe('Authenticator:determineNumbers', function () {
  context('for any valid number', function () {
    it('should return an array of length 2', function () {
      expect(auth.determineNumbers(4)).to.be.a('array').and.to.have.lengthOf(2)
    })
  })

  context('for any valid ceiling number', function () {
    it('should return two numbers below or equal to the ceiling number', function () {
      expect(auth.determineNumbers(15)[0]).to.be.below(16)
      expect(auth.determineNumbers(15)[1]).to.be.below(16)
    })
  })
})

/**
 * Testing the getSumAndQ method of Authenticator
 *
describe('Authenticator:getSumAndQ', function () {
  context('without arguments', function () {
    it('should return 0', function () {
      expect(auth.getSumAndQ().theSum).to.equal(0)
    })
  })

  context('with only one argument', function () {
    it('should return that argument', function () {
      expect(auth.getSumAndQ(5).theSum).to.equal(5)
    })
  })

  context('for any two numbers', function () {
    it('should return the sum of the numbers', function () {
      expect(auth.getSumAndQ(2, 2).theSum).to.equal(4)
    })
  })
})
*/
