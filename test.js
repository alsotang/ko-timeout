var timeout = require('./')
var sleep = require('co-sleep')

describe('test.js', function () {
  it('should timeout', function * () {
    try {
      yield timeout(function * () {
        yield sleep(50)
      }, 20)
    } catch (e) {
      e.message.should.eql('timeout: exceed 20ms')
    }
  })

  it('should not timeout', function * () {
    yield timeout(function * () {
      yield sleep(10)
    }, 20)
  })

  it('should get return value', function * () {
    var value = yield timeout(function * () {
      yield sleep(10)
      return 30;
    }, 20)

    value.should.eql(30)
  })

  it('should support human ms string', function * () {
    try {
      yield timeout(function * () {
        yield sleep(50)
      }, '20ms')
    } catch (e) {
      e.message.should.eql('timeout: exceed 20ms')
    }
  })

  it('should support number as string', function * () {
    try {
      yield timeout(function * () {
        yield sleep(50)
      }, '20')
    } catch (e) {
      e.name.should.eql('CoTimeoutError')
      e.message.should.eql('timeout: exceed 20ms')
    }
  })

  it('should catch error', function * () {
    try {
      yield timeout(function * () {
        throw new Error('err')
      }, 20)
    } catch (e) {

      e.message.should.eql('err')
    }
  })
})
