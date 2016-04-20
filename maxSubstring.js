/* 给一个浮点数序列，取最大乘积连续子串的值，
 * 例如 -2.5，4，0，3，0.5，8，-1，
 * 则取出的最大乘积连续子串为3，0.5，8
 */


//方法一 穷举

var nums = [-2.5, 4, 0, 3, 0.5, 8, -1]
var max = 0
var start = 0
var end = 0
for (var i = 0; i < nums.length; i++) {
  var temp = nums[i]
  for (var j = i + 1; j < nums.length; j++) {
    temp *= nums[j]
    if (temp > max) {
      max = temp
      start = nums[i]
      end = nums[j]
    }
  }
}


//方法二
