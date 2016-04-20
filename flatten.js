var result = []

function flattend(arr, bool) {

  for (var i = 0; i < arr.length; i++) {
    if (bool) {
      result = result.concat(arr[i])
    } else {
      if (arr[i] instanceof Array) {
        flattend(arr[i])
      } else {
        result.push(arr[i])
      }
    }
  }
  return result
}
