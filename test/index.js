import sinon from 'sinon'
import { expect } from 'chai'
import karmaConfigRentpath from '../src'

describe('karmaConfigRentpath', function () {
  it('should be defined', function () {
    expect(karmaConfigRentpath).to.exist
  })

  context('browser environment', function () {
    before(function () {
      this.jsdom = require('jsdom-global')()
    })

    after(function () {
      this.jsdom()
    })

    it('has a global window object', function () {
      expect(typeof window).to.not.equal('undefined')
    })
  })
})
