#Flex布局

* 任何容器都可以指定为Flex布局
    * `.box{display: flex;}`
    * 行内元素: `display: inline-flex;`
    * webkit内核的浏览器, 要加上`-webkit-`前缀
    `.box{
        display: -webkit-flex; /*Safiri*/
        display: flex;
    }`
    * 设为Flex后, 子元素的float, clear, vertical-align将失效
* 容器有水平主轴`main axis`, 垂直交叉轴`cross axis`, 项目占据主轴空间叫`main size`, 交叉轴空间叫`cross size`
* 容器的属性
  1. `flex-direction`决定项目的排列方向(决定主轴的方向)
      * `row`(默认)左至右
      * `row-reverse`右至左
      * `column`上至下
      * `column-reverse`下至上
  2. `flex-wrap`决定一条轴线排列不开时项目如何换行
      * `nowrap`(默认)不换行
      * `wrap`换行, 第一行在上
      * `wrap-reverse`换行, 第一行在下
  3. `flex-flow`是`flex-direction`和`flex-wrap`的简写
      * 默认值是`row nowrap`
  4. `justify-content`决定项目在主轴上的对齐方式
      * `flex-start`(默认)左对齐
      * `flex-end`右对齐
      * `center`居中
      * `space-between`两端对齐, 项目间隔相等
      * `space-around`每项两侧的间隔相等(项目间的距离比边框距离大一倍)
  5. `align-items`决定在交叉轴如何对齐
      * `stretch`(默认)项目未设高度或设为auto, 将占满整个容器
      * `flex-start`交叉轴起点对齐
      * `flex-end`交叉轴终点对齐
      * `center`交叉轴中点对齐
      * `baseline`项目第一行文字的基线对齐
  6. `align-content`多根轴线对齐方式(只有一根轴线则不起作用)
      * `stretch`(默认)轴线占满整个交叉轴
      * `flex-start`与交叉轴起点对齐
      * `flex-end`与交叉轴终点对齐
      * `center`与交叉轴中点对齐
      * `space-between`与交叉轴两端对齐, 轴线间间隔平均分布
      * `space-around`每根轴线两侧间隔都相等
* 项目的属性
  1. `order`定义项目的排列顺序, 越小越靠前, 默认为0
  2. `flex-grow`定义项目的放大比例, 默认为0(即存在剩余空间也不放大)
  3. `flex-shrink`定义项目的缩小比例, 默认为1(即空间不足自动缩小)
  4. `flex-basis`定义在分配多余空间之前, 项目占据主轴空间, 默认值为auto, 浏览器根据这个属性计算主轴是否有空余空间
  5. `flex`是`flex-grow``flex-shrink`和`flex-basis`的简写, 默认值为`0 1 auto`, 有两个快捷键值: `auto(1 1 auto)`和`none(0 0 auto)`
  6. `align-self`允许单个项目与其他有不同的对齐方式, 可覆盖`align-items`属性, 默认为auto, 表示继承父元素, 如果没有父元素, 则相当于stretch
    * `auto` `flex-start` `flex-end` `center` `baseline` `stretch`
