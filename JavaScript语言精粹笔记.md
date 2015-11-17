JavaScript语言精粹笔记

# 对象

* JavaScript简单数据类型: number string null undefined boolean; 其余所有值都是对象
  * `typeof([1,2,3])`或`typeof(null)`时返回object
  * `typeof()`返回值包括: number string boolean undefined function object
* 对象是属性的容器
  * 属性的名字可以包括空字符串, 如果是保留字要用引号括住
  * 属性的值可以是undefined以外的任何值
* 检索时,可以用"."找到对象的属性,如果是不存在的属性,将返回"undefined"
  * 可以用"||"填充默认值, eg: `var a = obj.a || "unkown"`
  * 可以用"&&"来避免错误, eg: `obj.a.b // TypeError`而`obj.a && obj.a.b // undefined`
* 通过引用来传递, 不会被复制
* 每个对象都连接到一个原型对象,通过对象字面量创建的对象连接Object.prototype
  * 原型链只有在检索的时候才被用到, 如果我们想获取的值没有在对象中找到, 则会尝试通过原型链向上寻找, 知道最后找到Object.prototype, 这个过程叫做委托
  * 原型关系是动态的, 如果把新的属性添加到原型中, 它的实例化对象也都可以用这个新添加的方法
* 检查对象有什么属性可以通过操作符判断类型
  * `typeof()`, 原型链中的属性也会产生值, eg: `typeof(a.toString) // 'function'`
  * `hasOwnProperty()`, 这个方法不会检查原型链, 如果是对象的独有属性会返回'true'
* 可以用 for in 枚举对象中的属性, 如果不关心原型中的属性可以用hasOwnProperty方法过滤
  * for in 可能是不按顺序的枚举, 考虑顺序要用原始的for, 而且不用担心会有原型链中的属性 
* 可以用delete运算符删除对象的某个属性,是原型链上的这个属性透现出来
* 对象可以用来减少全局变量污染, 把全局性资源都纳入到一个名称空间里, 会降低与其他应用程序、组建之间发生冲突的可能
  
```js
var MyApp = {}
MyApp.a = {}
MyApp.b = {}
```



# 函数

* 函数对象连接到Function.prototype, 这个原型对象连接到Object.prototype
* 函数被创建是会附加两个隐藏属性: 函数上下文和"调用"属性(调用函数时可以理解为在调用这个"调用"属性)
* 函数的prototype属性的值是一个对象, 这个对象包括一个constructor属性, constructor属性的值是该函数本身
* 因为函数是对象所以可以保存在变量、对象、数组中, 可以当做参数传递给其他函数, 也可以被其他函数返回, 也可以用有自己的方法; 与对象不同的地方在于可以被调用
* 当一个函数被定义在其他函数内部, 他可以访问自己的与父函数的参数与变量; 通过字面量创建的函数包含一个连接到外部的上下文, 即闭包
* 调用函数会暂停当前函数的执行, 传递控制权和参数给新函数
  * 除了声明定义的形参,函数还接受 this和arguments
    * this取决于调用模式: 方法调用 函数调用 构造器调用 apply调用
      * 方法调用
        * 函数被保存为对象的一个属性时称为方法
        * 方法被调用时, this被绑定到该对象,可以从对象中取值或修改对象的值
        * this到对象的绑定发生在调用的时候
        * 通过this取到所属对象的上下文的方法叫公共方法
      * 函数调用
        * 不是对象的属性, 它就是被当做函数调用的
        * this绑定全局对象
      * 构造器调用
        * 在函数前带上new来调用, 将会创建一个连接到这个函数的prototype的新对象
        * this会绑定到新对象上
      * apply调用
        * apply方法接收两个参数, 一个绑定给this的值, 一个参数数组 
  * 实际参数与形参个数不匹配时, 如果形参多, 则会用undefined代替缺失的值; 实参多, 超出的会被忽略
    * tips: 虽然没有重载, 但是可以通过传不同数量的参数模拟重载
  * 函数可以通过arguments访问它被调用时的参数列表
    * arguments不是数组, 是类似数组的对象, 拥有一个length属性, 没有任何数组的方法
* return可以使函数提前返回, return执行时, 函数立即返回不再继续执行
  * 如果没有指定返回值, 返回undefined
  * 如果通过new调用函数, 且返回值不是一个对象, 则返回this
* throw语句中断函数执行, 抛出一个exception对象, 把exception传递给try语句的catch从句
* 通过给xxx.prototype增加方法的方式(xxx可以是Object Function Array之类的),可以给基本类型扩充功能
  * 基本类型的原型是公用结构, 要在确定没有该方法时才添加
* 递归调用是直接或间接调用自身的函数
  * 深度递归的函数可能会因为堆栈溢出而运行失败
* JS不支持块级作用域, 函数作用域使函数中的变量在外部不可见
  * 最好在函数体的顶部声明函数中可能用到的所有变量
* 返回一个函数, 使函数被调用的时候还可以访问它被创建时的上下文, 是闭包的常见的用途
  * 返回的函数被调用时访问的参数是它被创建时上下文的参数本身, 不是副本
  * 尽量避免在循环中创建函数
* 异步请求触发回调函数使客户端不会被阻塞
  * 把函数作为参数传递, 一旦接收到响应就会被调用
* 可以通过函数和闭包来构造模块提供接口, 来尽量避免全局变量的使用
  * 模块模式: 一个定义了私有变量和函数的函数, 利用闭包创建可以访问私有变量和函数的特权函数, 返回特权函数
  * 通常结合单例模式使用
    * 单例是用对象字面量创建的对象, 对象的属性值在该对象的生命周期中不会发生变化
* 让方法返回this而不是undefined就可以实现级联,也就是链式调用
* 柯里化可以把函数和传入的参数相结合产生新的函数

```js
function carry(fn){
  var args = Array.prototype.slice.call(arguments, 1)
  return function(){
    var initArgs = Array.prototype.slice.call(arguments)
    var finalArgs = args.concat(initArgs)
    return fn.call(null, finalArgs)
  }
}
```

* 记忆是指把先前操作的结果记录在对象里避免重复运算的优化方式

```js
var memoizer = function(memo, formula){
  var recur = function(n){
    var result = memo[n]
    if(typeof result !== 'number'){
      result =formula(recur, n)
      memo[n] = result
    }
    return result
  }
  return recur
}
```



# 继承

* JS基于原型, 所以对象直接从其他对象继承
* 通过构造器函数产生对象(使用new前缀调用)
  * 新函数对象被赋予了prototype属性, 它的值是一个包含constructor属性且属性值是新函数的对象
  * prototype对象事存放继承特征的地方, 每个函数都会有prototype对象
  * 构造伪类来继承a, 可以通过定义constructor函数, 并把prototype替换为a的实例
  * 弊端
    * 没有私有环境,所有的属性都是公开的
    * 如果调用构造函数时没有用new, this会被绑定到全局对象

```js
Function.method('inherits', function(Parent){
  this.prototype = new Parent()
  return this
})
``` 

* 编写构造器时接受一个JSON格式的对象说明符,会使代码容易阅读
* 原型式继承 
  * 可以实现差异化继承, 定制一个新的对象 	
```js
function(o){
	var F = function (){
		F.prototype = o
		return new F()
	} 
}
```
* 应用模块模式解决所有属性可见, 没有私有属性的问题
  * 构造生成对象的函数的步骤:
    1. 构造一个对象(可以通过各种方式) 
    2. 定义私有实例变量和方法(通过var定义的变量)
    3. 扩充新对象的方法(可以访问到参数和第2步提到的变量)
    4. 返回新的对象
* 可以通过部件组装对象



# 数组

* js中没有数组一样的数据结构, 只有类数组特性的对象, 是把数组的下标转成字符串作为属性, 比真数组慢但方便
* 创建新数组可以用数组字面量的方法, `var arr = []`
* 数组的length是没有上届的, 不会发生越界错误
  * length的值是数组最大整数属性名加1, 不一定等于属性的个数
  * 后置下标运算符把它里面的表达式转为字符串, 这个字符串作为属性名, 如果这个字符串转为number后大于当前的length并且小于4294967295, 则length会被设置为下标加1
  * 可以直接设置length`值, 设置更大的length不会分配更多的空间, 设下会把超过length部分的属性删除
  * 把下标指定为length, 可以把元素加到数组的尾部, 也可以直接用`push()`方法
* 删除数组中的元素
  * 数组也是对象, 可以用delete运算符来移除元素, 不过后面元素的属性不会变, 也就是数组里会留下一个空洞
  * 可以用`splice()`方法, 删除或者替换元素
* 因为数组是对象, 所以可以用for in来遍历一个数组的所有属性, 不过无法保证属性的顺序也有可能得到原型链的属性, 所以可以用for语句来枚举
* 如何区分数组和对象
  * `typeof`检测数组返回object
  * `Object.prototype.toString.apply()`可以检测出
* 数组可以通过Array.prototype来扩充方法, 这样每个数组都可以继承这个方法
* 如果不给初始值, 则为undefined



# 正则表达式

* 正则表达式可以对字符串中的信息进行查找替换和提取操作
* 正则表达式难以分段阅读, 不支持注释和空白
* 正则表达式标识
  * g 全局,匹配多次
  * i 大小不敏感
  * m 多行匹配, 用^和&来匹配行结束符
* 部分转义字符
  * \f 换页符;\r 回车符;\n 换行符;\d 等同于[0-9];\D 等同于[^0-9];\w 等同于[0-9A-Z_a-z]
* 正则表达式分组
  * 捕获型: 有(前缀, 第一个捕获的(是分组1, 第二个捕获的(是分组2
  * 非捕获型: 有(?=前缀, 只做分组, 不捕获文本
  * 向前正向匹配: 有(?=前缀, 类似捕获型分组,但匹配后,文本会倒回他开始的地方
  * 向前负向匹配: 有(?!前缀, 类似于向前正向匹配分组, 只有匹配石牌才会继续向前匹配
* 正则表达式量词: ?{0, 1}; *{0,}; +{1,}



# 方法

* Array
  * `array.concat()`产生一个新的数组, 包含对array的浅复制, 把参数添加到新数组里
  * `array.join()`把array构造成用参数为分隔符的字符串
    * 如果有大量字符串片段拼接, 建议使用+, 因为浏览器对+做了特别优化(把片段放到数组里用join方法连接的情况适用于IE6/7)
  * `array.pop()`pop和push可以对数组当做栈操作, pop会移除数组的最后一个元素
  * `array.push()`把参数加到数组的最后, 返回的是数组的新长度
  * `array.reverse()`反转array里元素的顺序
  * `array.shift()`移除数组中的第一个元素, 通常shift比pop慢
  * `array.slice(start, end)`对数组中的一段做浅复制并返回
    * 如果没有第二个参数, 则默认array.length
    * 如果任何一个是负数, 则应加上array.length, 成为非负数
    * 如果start大于等于length, 得到的为空数组
  * `array.sort()`对数组按字符串排序
    * 自定义的比较函数, 如果返回-1则第一个参数排列在前, 返回1则第二个参数排列在前
    * sort方法是不稳定的排序
  * `array.splice(start, deleteCount, item)`从数组中移除一个或多个元素, 并用item替换, 返回被移除元素的数组
  * `array.unshift()`把参数添加到数组的开头, 返回数组的新length
* Function
  * `function.apply()`传递的第一个参数会被绑定到this上, 第二个参数为一个数组
* Number
  * `number.toExponential()`把number转成指数形式的字符串, 参数可控制小数点后的数字位数, 0~20位之间
  * `number.toFixed()`把number转换为一个十进制形式的字符串, 参数可控制小数点后的数字位数, 0~20位之间
  * `number.toPrecision()`把number转换为一个十进制形式的字符串, 参数可控制数字精度, 0~21位之间
  * `number.toString()`把number转换为字符串, 根据参数确定进制, 参数在2~36之间
* Object
  * `object.hasOwnProperty()`如果object包含名为参数的这个属性, 则返回true, 原型链中的同名属性不会被检测
* RegExp
  * `regexp.exec()`功能强大但是慢, 成功匹配regexp, 返回一个数组, 下标为0的是匹配的子字符串, 为1的是分组1捕获的文本, 以此类推, 匹配失败会返回null
  * `regexp.test()`简单但是快, 匹配上返回true, 失败为false, 不能用g标识
* String
  * `string.charAt()`返回参数位置处的字符, 参数小于0或大于字符串长度会返回空字符串
  * `string.charCodeAt()`和charAt相似, 只是返回的为整数形式字符码位, 小于0或大于字符串长度会返回NaN
  * `string.concat()`字符串拼接, 但是常用+来替代concat
  * `string.indexOf()`第一个参数为在字符串中需要匹配的部分, 第二个参数可选, 设置起始位置, 找到返回第一个字符的位置, 找不到返回-1
  * `string.lastIndexOf()`与indexOf相似,从字符串末尾开始查找
  * `string.localeCompare()`比较两个字符串
  * `string.match()`和正则表达式匹配, 依据g标识符, 没有g时与`regexp.exec()`结果相同, 有g时返回包含所有匹配的数组
  * `string.replace()`对字符串查找并替换, 第一个参数可以是字符串或者是一个正则, 如果是字符串只会在第一次出现的地方被替换
  * `string.search()`与indexOf类似, 接受一个正则作为参数, 找到匹配则返回第一个匹配的首字符位置, 没有则返回-1, 忽略g标识而且不支持选择开始匹配的位置
  * `string.slice(start, end)`复制一部分构造新的字符串, start如果为负的,将与length相加, end参数可选, 如果为负数也要加上length
  * `string.split()`可以把字符串按照第一个参数中的标识来分割成片段创建字符串数组
  * `string.substring()`与slice类似, 只是不能处理参数是负数的情况, 尽量用slice代替substring
  * `string.toLocaleLowerCase()`返回新的字符串, 用本地化规则把字母转化为小写格式
  * `string.toLocaleUpperCase()`返回新的字符串, 用本地化规则把字母转化为大写格式
  * `string.toLowerCase()`返回新的字符串, 把字母转化为小写格式
  * `string.toUpperCase()`返回新的字符串, 把字母转化为大写格式
  * `string.fromCharCode()`根据传入的数字编码返回字符串



# 代码风格

* if和while这类结构化语句, 使用代码块会降低出错概率
* 把{放在一行的结尾而不是下一行的开头
* 写注释可以便于他人阅读时理解代码的思路
* 谨慎使用全局变量



# 问题特性

* 全局变量
  * 声明全局变量的方式
    * 在任何函数之外`var a`
    * 直接给全局对象添加属性`window.a`
    * 在函数里不用var, 隐式的全局变量
  * 全局变量可以被程序的任何部分在任意时间修改, 难以管理
* 作用域
  * 没有块级作用域
* 自动插入分号
* 与其他语言不同的保留字
* Unicode把一对字符视为单一字符, js认为是两个不同的字符
* typeof 
  * 不能区分null和对象
  * 判断正则表达式时返回的为对象
* parseInt
  * 把字符串转换为整数, 遇到非数字时停止解析
  * 建议加上第二个参数, 也就是说明进制
* +
  * 加法运算或者字符串连接
  * 如果有一个是字符串则转为字符串, 都为数字才会做加法
* 浮点数
  * 浮点数运算不准确, 通过指定精度来尽量避免
* NaN
  * 与自身不等
  * 通过`isNaN()`判断
* 伪数组
  * 没有真正的数组, 不会越界, 不需要设置维度, 但是性能差于真正的数组
  * typeof 不能辨别数组和对象, 可以通过`Object.prototype.toString.apply()`判断
  * arguments不是一个数组, 是有这length属性的对象
* 假值
  * 0 NaN '' false null undefined 等同于假
* hasOwnProperty
  * 这是一个方法而不是属性, 可能会被替换掉
* 对象
  * 对象不会是真正的空对象, 因为他们可以从原型链中取得成员属性














