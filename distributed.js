var a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var b = []

function distribute(source, destination, length) {
  for (var x in source) {
    var key = x % length
    if (x - length < 0) {
      destination[key] = []
      destination[key].push(source[x])
    } else {
      destination[key].push(source[x])
    }
  }
}
distribute(a, b, 4)
console.log(b)

//
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var b = [
  [],
  [],
  [],
  []
]
var length = a.length

function distribute2(source, destination) {
  var key = i % destination.length
  var index = parseInt(Math.random() * source.length)
  var temp = source[index]
  source.splice(index, 1)
  destination[key].push(temp)
}
for (var i = 0; i < length; i++) {
  distribute2(a, b)
}
console.log(b)
