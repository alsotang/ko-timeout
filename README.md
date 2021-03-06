# ko-timeout

**deprecated please use https://github.com/sindresorhus/delay**

[![Build Status](https://travis-ci.org/alsotang/ko-timeout.svg?branch=master)](https://travis-ci.org/alsotang/ko-timeout)

## usage

```js
timeout(gen, ms)
```

`gen` - a genarator function

`ms` - millisecond. can use '3s' or '200ms', which https://www.npmjs.com/package/ms support

if timeout, `err.name` will be `CoTimeoutError`

## example

### should timeout

```js
try {
  yield timeout(function * () {
    yield sleep(50)
  }, 20)
} catch (e) {
  e.name.should.eql('CoTimeoutError')
  e.message.should.eql('timeout: exceed 20ms')
}
```

### should get return value


```js
var value = yield timeout(function * () {
  yield sleep(10)
  return 30;
}, 20)

value.should.eql(30)
```

## license

MIT
