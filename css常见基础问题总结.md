#css常见基础问题总结
1. 盒模型
    * margin - border - padding - content
2. `box-sizing`的值有哪些, 效果是什么
    * `content-box`默认值, 只包括内容的高和宽
    * `padding-box`包括内边距的高和宽
    * `border-box`包括内边距和边框的高和宽
    * `inherit`从父元素继承
3. 水平垂直居中
    * `tabel-cell`
    * `absolute`, 上左设置为0, `margin: auto;`
    * `absolute`, 上左设置为50%, `margin`设置为负值(值为宽高的一半)
    * `absolute`, 上左设置为50%, `transform: translate(-50%, -50%);`
4. a标签的伪类和顺序
    * `:link` 未被用户访问过
    * `:visited` 已被用户访问过
    * `:hover` 光标指向但还未激活
    * `:active` 被用户激活
5. 行内元素相邻的浮动元素折行(在IE中出现此问题)
  `<span>1</span>
   <span>2</span>
   <span>3</span>
   <span style="float:right">4</span>`
   * 解决方案: 
      * 把浮动的元素放到非浮动的元素前面
      * 绝对定位模拟右浮动
      * IE hack 设置负的上外边距
6. 定位问题
    * `static` `relative` `absolute` `fixed`
    * `fixed`的IE兼容方法
        1. 方法一
            * `body{height:100%;overflow-y:auto;}`
            * `#test{position: absolute;}`
            * html{overflow-y:hidden;}
            * 原理
                * `position`定位, 前面父元素没有`position`时, 该定位相对于html
                * html滚动条隐藏, 使用body模拟html滚动条
                * body层高100%, 当html不设置高时, 除IE6, body处的百分比高度无效
        2. 方法二
            * `.fixed{position:absolute;left:expression(eval(document.documentElement.scrollLeft));top:expression(eval(document.documentElement.scrollTop));}`
            * 会有振动问题, 解决方案
                * `*html, *html body{background-image:url(about:blank);background-attachment:fixed;}`
7. `display`问题
    * 行内元素设置宽高时设置`display: inline-block;`
    * `none`不显示
    * `block`块级
    * `inline`内联
    * `inline-block`行内块
    * `list-item`列表
    * `table`块级表格
    * `inline-table`内联表格
    * `table-cell`表格单元
    * `inherit`从父级继承
8. 居中问题
    * 块级水平居中 `margin: 0 auto;`
    * 文字居中 `line-height: xxpx; text-align: center;`
    * 确定宽高
        * `position: absolute; top: 50%; left: 50%;` `margin-top`和`margin-left`设置为负值
    * 不确定宽高
        * `positon: table-cell; vertical-align: middle; margin: 0 auto;`
        * `position: absolute; top: 0; rigiht: 0; bottom: 0; left:0; margin: auto;`
        * `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`
9. css选择器
    * !import > 行内样式 > id > class/伪类/属性(.test, [href], :hover) > tag > 通配符*
10. 内联样式的块级元素样式
    * 增加链接可点区域的面积, 且不加长下划线 
        * `a{display: block;}`
        * 加padding值
11. 图片作为背景
    * `background: url() no-repeat x-pos y-pos;`
12. 显示与隐藏
    * `display: none`不占空间
    * `visibility: hidden`占空间
13. css单位
    * 尺寸: % 相对, px 绝对, em 响应式
    * 颜色: 名称(red, blue), #f60, rgb(x,x,x), rgb(x%,x%,x%)
14. css预处理
    * 常用的: sass less stylus
15. BFC
    * 阻止垂直边距叠加
    * 包含内部元素的浮动
    * 阻止元素被浮动覆盖
    * 决定清除浮动的范围
16. 垂直对齐`vertical-align`的适用范围
    * 行内元素(`inline`或`inline-block`)
17. IE hack
    * 类内属性前缀
        * `background-color:blue !important;/* All browsers but IE6 */`
        * `*background-color:black; /* IE6, IE7 */`
        * `+background-color:yellow;/* IE6, IE7*/`
        * `background-color:gray\9; /* IE6, IE7, IE8, IE9, IE10 */`
        * `background-color:purple\0; /* IE8, IE9, IE10 */`
        * `background-color:orange\9\0;/*IE9, IE10*/`
        * `_background-color:green; /* Only works in IE6 */`
    * 选择器前缀
        * `*html` *前缀只对IE6生效
        * *+html *+前缀只对IE7生效
        * @media screen\9{...}只对IE6/7生效
        * @media \0screen {body { background: red; }}只对IE8有效
        * @media \0screen\,screen\9{body { background: blue; }}只对IE6/7/8有效
        * @media screen\0 {body { background: green; }} 只对IE8/9/10有效
        * @media screen and (min-width:0\0) {body { background: gray; }} 只对IE9/10有效
        * @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }} 只对IE10有效
18. css3(用到过的几种简单介绍)
    * 渐变: `gradient`
        * 线性: `-webkit-linear-gradient`(方向, 起始色, 终止色)
        * 径向: `-webkit-radial-gradient`
    * 背景透明: `rgba` (透明度值域0~1)
    * 圆角: border-radius
    * 文字阴影: `text-shadow` 水平阴影位置 垂直阴影位置 模糊的距离 阴影颜色
    * 盒阴影: `box-shadow` 水平阴影位置 垂直阴影位置 模糊的距离 阴影尺寸 颜色 外/内阴影
    * 变形, 移位, 扭曲: `transform` 旋转`rotato` 缩放`scale(x,x)`
    * 平滑过度: `transition`
        * `transition-property`指定哪个属性改变时执行transition
        * `transition-duration`元素转换过程的持续时间
        * `transition-timing-function`变换速率
            * `ease`变慢
            * `linear`匀速
            * `ease-in`加速
            * `ease-out`减速
            * `ease-in-out`加后减
            * `cubic-bezier`贝塞尔曲线
        * `transition-delay`属性变多久后才开始执行
        * `transition: <property> <duration> <animation type> <delay>
    * 动画: `animation`
        * `animation: <animation-name> <duration> <timing-function> <delay> <direction>
    * 媒体查询: `media queries`不同情况采用不同文件渲染页面
19. css引入方式
    * 链接外部样式
    * @import导入样式表单
    * 在head中用style标签
    * body内部的元素使用style
20. link和@import区别
    * link属于XHTML标签, @import是css提供的一种方式
    * 页面加载时link的css会被同时加载, 而@import是等到页面全被下载后再加载
    * link的兼容比较好, @import需要css2.1以上
    * 当使用javascript控制dom去改变样式的时候, 只能使用link标签, 因为@import不是dom可以控制的
21. css sprites
    * 优: 减少网页的HTTP请求, 提高页面性能, 减少图片字节
    * 劣: 图片合并与维护很麻烦
22. 超出文字变成省略号
    * ` width: xxpx; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        white-space: nowrap;`
23. 清浮动
    * 父元素浮动
    * 在浮动元素后加一个空标签,附上`clear: both`的属性
    * 给父元素添加`display:inline-block`或`.clearfix:after{content: ""; display: block; height: 0; clear: both; visibility: hidden;}`或者`.clearfix{overflow: auto; zoom: 1;/*兼容IE6*/}
24. 利用css隐藏一个元素
    * `visibility: hidden;`
    * `opacity: 0;`
    * `display: none;`
    * `position: absolute; left: -1000;`
