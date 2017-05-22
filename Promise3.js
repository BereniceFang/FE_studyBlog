try {
  module.exports = Promise
} catch (e) {}

function Promise(executor) {
  var self = this

  self.status = 'pending'
  self.resolvedFn = []
  self.rejectedFn = []

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.resolvedFn.length; i++) {
          self.resolvedFn[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function() {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.rejectedFn.length; i++) {
          self.rejectedFn[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

function resolvePromise(promise, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false

  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') { //because x could resolved by a Promise Object
      x.then(function(v) {
        resolvePromise(promise, v, resolve, reject)
      }, reject)
    } else { //but if it is resolved, it will never resolved by a Promise Object but a static value;
      x.then(resolve, reject)
    }
    return
  }

  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then //because x.then could be a getter
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise, y, resolve, reject)
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function(resolvedFn, rejectedFn) {
  var self = this
  var promise2
  resolvedFn = typeof resolvedFn === 'function' ? resolvedFn : function(v) {
    return v
  }
  rejectedFn = typeof rejectedFn === 'function' ? rejectedFn : function(r) {
    throw r
  }

  if (self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = resolvedFn(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = rejectedFn(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      // setTimeout(function() { //because status is pending, thus not need to run in next event loop
      self.resolvedFn.push(function(value) {
        try {
          var x = resolvedFn(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })

      self.rejectedFn.push(function(reason) {
          try {
            var x = rejectedFn(reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (r) {
            reject(r)
          }
        })
        // })
    })
  }
}

Promise.deferred = Promise.defer = function() {
  var dfd = {}
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
