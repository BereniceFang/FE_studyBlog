Array.prototype.slice.call(arguments)

function sum(a, b) {
  Array.prototype.slice.call(arguments)
  console.log(arguments[0])
  console.log(Object.prototype.toString.call(arguments))
  return a + b;
}
sum(3, 4)
