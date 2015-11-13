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
  * 可以直接设置length值, 设置更大的length不会分配更多的空间, 设下会把超过length部分的属性删除
  * 把下标指定为length, 可以把元素加到数组的尾部, 也可以直接用`push()`方法
* 删除数组中的元素
  * 数组也是对象, 可以用delete运算符来移除元素, 不过后面元素的属性不会变, 也就是数组里会留下一个空洞
  * 可以用`splice()`方法, 删除或者替换元素
* 因为数组是对象, 所以可以用for in来遍历一个数组的所有属性, 不过无法保证属性的顺序也有可能得到原型链的属性, 所以可以用for语句来枚举
* 如何区分数组和对象
  * `typeof`检测数组返回object
  * 

