# 005 view 视图容器：灵活多变的 flex 布局

#慢慢学小程序#

> 展示环境：
> 电脑型号：战神 Z7M-SL7D2
> 操作系统：Windows 10 
> 系统版本：20H2
> 开发者工具版本：1.05.2103200

**本节摘要：学习flex布局的设定和属性；学习CSS中的内联样式和外联样式。**

# 前言

在[view组件](https://mp.weixin.qq.com/s/zyQzgu4V4fgzZC-DMB7KYA)里介绍了CSS的盒子模型，但一些特殊的布局是不方便用盒子模型定位，像不同型号的手机屏幕的像素是不一样的，用px定位难以在各终端都实现垂直居中。

Flex布局（Flexbox Layout）就是为了解决这个问题，意为"弹性布局"。可适应各种显示设备和屏幕大小，「灵活」地填充可用空间。

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

~~![Flexbox-Model](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)~~

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

本篇文章参考[阮一峰-Flex布局教程语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)和[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)制作。添加个人撰写的代码，所以篇幅显得很长，觉得啰嗦的朋友可以直接看[阮一峰-Flex布局教程语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。

# Flex 属性

## 容器属性

要先利用 display 属性将容器定义为 flex 容器。

```
.container {
	display: flex; 
}
```

下面介绍首先介绍父级容器属性，这些属性决定子级项目在容器内的排列效果。

### flex-direction 属性

![flex-direction](https://gitee.com/findingjack/write-picture/raw/master/20210512213759.svg)

flex-direction 属性决定主轴方向，从而定义 Flex项目在 Flex 容器中的排列方向。

可选的值有四个：

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

#### 实操效果展示

1. 使用中要先定义子父容器样式。将父容器样式 `box` 定义为 flex 容器。子容器样式定义三种颜色的 40 px 正方形，便于区分查看效果。

``` 
/* 代码来源：005flex.wxss */
.box{
  display:flex
}

.red-box{
  background: red;
  width: 40px;
  height: 40px
}

.green-box{
  background: green;
  width: 40px;
  height: 40px
}

.blue-box{
  background: blue;
  width: 40px;
  height: 40px
}
```

将子元素放在 Flex 容器内，不设置 flex-direction 属性查看下效果。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">非 Flex 容器</view>
<view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>

<view class="section">flex-direction 属性 默认row方向</view>
<view class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

非 Flex 容器子项目呈现[文档流](http://www.manongjc.com/article/13347.html)排列，块级元素按从上到下顺序依次排列。给父容器加上 Flex 定义后，自动建立前言中介绍的主轴、交叉轴。项目在主轴上依次排列。

![Flex容器效果展示](https://gitee.com/findingjack/write-picture/raw/master/20210513220054.png)

2. 接下来我们利用内联样式给 flex-direction 重新赋值，因为内联样式的优先级是高于外联样式的，哪怕我们在 `005flex.wxss` 文件的 `box `样式定义了 flex-direction 的值，在内联样式中再定义时会被覆写。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">row-reverse 方向</view>
<view style="flex-direction:row-reverse;" class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

> 小tips：
>
> 外联样式：在 WXSS 文件里写的样式属于外联样式，定义样式名后可在多组件内引用。若遇到部分属性值变动的组件，重新定义新样式，更推荐搭配内联样式，对一些属性值进行覆写。
>
> 内联样式：在 WXML 文件内的容器标签内，以style="属性:值;属性:值;……"定位样式的属于内联样式，无法在其他组件重用样式。推荐搭配外联样式使用，对标准样式进行微调修改。

可以在效果图内看到，主轴方向颠倒，元素从右往左排列。

![row-reverse 方向](https://gitee.com/findingjack/write-picture/raw/master/20210513225216.png)

3. 分别将内联样式内的 flex-direction 的值修改为 column 或 column-reverse。查看模拟器内的展示效果。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">column 方向</view>
<view style="flex-direction:column;" class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>

<view class="section">column-reverse 方向</view>
<view style="flex-direction:column-reverse;" class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

可以看到主轴方向变为竖向，元素根据有无 reverse 呈现不同次序。

![column/column-reverse 方向展示](https://gitee.com/findingjack/write-picture/raw/master/20210513230047.png)

### flex-wrap 属性

![flex-wrap](https://gitee.com/findingjack/write-picture/raw/master/20210512222814.svg)

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap` 属性定义，如果一条轴线排不下，如何换行。

可选的值有三个：

- `nowrap`（默认）：不换行。
- `wrap`：换行，第一行在上方。
- `wrap-reverse`：换行，第一行在下方。

#### 实操效果展示

1. 在 Flex 容器内装三组红绿蓝方块，父容器样式继续选择为 `box`。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-wrap 默认：不换行（no-wrap）</view>
<view class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

可以看到九个项目都排列在一条主轴上，这不是因为设定的 40 px 正好填满模拟器屏宽，对比上面的 column-reverse 容器内方块，可以看到 flex-wrap 内的方块宽度都比上面的小。这是因为 Flex 容器为了满足 no-wrap（不换行）设定，对项目进行了压缩。

![no-wrap](https://gitee.com/findingjack/write-picture/raw/master/20210513231233.png)

2. 接下来我们利用内联样式对 flex-wrap 的值进行覆写。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-wrap:wrap（换行）</view>
<view style="flex-wrap:wrap;" class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>

<view class="section">flex-wrap:wrap-reverse（反向换行）</view>
<view style="flex-wrap:wrap-reverse;" class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

可以看到定义的小正方形有重新变得方正。

![flex-wrap 属性效果展示](https://gitee.com/findingjack/write-picture/raw/master/20210513231830.png)

### flex-flow 属性

`flex-flow` 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，相当于是一个属性可以赋两个值，默认值为 `row nowrap`。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-flow direction和wrap的简写形式</view>
<view style="flex-flow:row-reverse wrap;" class="box">
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

利用内联样式，我将主轴方向定义为自右向左，开启换行。效果展示如下。

![flex-flow 属性](https://gitee.com/findingjack/write-picture/raw/master/20210515231820.png)

### justify-content 属性

`justify-content`属性定义了项目在主轴上的对齐方式。

可选的值有5个，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`： 居中
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

![justify-content](https://gitee.com/findingjack/write-picture/raw/master/20210513233403.png)

为了显示出`space-between `和`space-around`的差别。我定义了两个长方形格子。

``` 
/* 代码来源：005flex.wxss */
.wide-red-box{
  background: red;
  width: 60px;
  height: 40px
}

.wide-blue-box{
  background: blue;
  width: 50px;
  height: 40px
}
```

#### 实操效果展示

1. 红蓝盒子采用加宽的样式，不做任何设置查看效果。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-content属性 默认flex-start</view>
<view class="box">
  <view class="wide-red-box"></view>
  <view class="green-box"></view>
  <view class="wide-blue-box"></view>
</view>
```

可以看到所有方块都靠左排列。因为没有盒子设置外边距，所以盒子间紧贴，没有空隙，不像整体效果展示图盒子间有空隙。

![默认 flex-start 布局](https://gitee.com/findingjack/write-picture/raw/master/20210514094748.png)

2. 用内联样式将 justify-content 的值修改为 flex-end

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-end</view>
<view style="justify-content:flex-end;" class="box">
  <view class="wide-red-box"></view>
  <view class="green-box"></view>
  <view class="wide-blue-box"></view>
</view>
```

项目自动向右对齐。

![flex-end](https://gitee.com/findingjack/write-picture/raw/master/20210514095037.png)

3. 接下来将 justify-content 的值依次修改为 `center`、`space-brtween`、`space-around`。查看效果。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">center</view>
<view style="justify-content:center;" class="box">
  <view class="wide-red-box"></view>
  <view class="green-box"></view>
  <view class="wide-blue-box"></view>
</view>

<view class="section">space-between</view>
<view style="justify-content:space-between;" class="box">
  <view class="wide-red-box"></view>
  <view class="green-box"></view>
  <view class="wide-blue-box"></view>
</view>

<view class="section">space-around</view>
<view style="justify-content:space-around;" class="box">
  <view class="wide-red-box"></view>
  <view class="green-box"></view>
  <view class="wide-blue-box"></view>
</view>
```

发现项目的排列方式与最开始的效果图是一模一样的。

![center、space-between、space-around](https://gitee.com/findingjack/write-picture/raw/master/20210514095452.png)

### align-items 属性

![align-items](https://gitee.com/findingjack/write-picture/raw/master/20210512222917.svg)

`align-items`属性定义项目在交叉轴上如何对齐。

可选的有 5 个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

#### 实操效果展示

为了便于区分，定义了两个长盒子。

``` 
/* 代码来源：005flex.wxss */
.high-red-box{
  background: red;
  width: 40px;
  height: 80px
}

.high-blue-box{
  background: blue;
  width: 40px;
  height: 60px
}
```

#### 实操效果展示

1. 红蓝盒子采用加长样式，不做任何设置查看效果。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">align-items 默认flex-start</view>
<view class="box">
  <view class="high-red-box"></view>
  <view class="green-box"></view>
  <view class="high-blue-box"></view>
</view>
```

这种对齐属性的默认设置都是 flex-start。前文介绍的 justify-content 是这样，后文将介绍的 align-content 属性也是这样。

![默认 flex-start 布局](https://gitee.com/findingjack/write-picture/raw/master/20210515121534.png)

2.用内联样式将 align-content 的值修改为 flex-end。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-end</view>
<view style="align-items:flex-end;" class="box">
  <view class="high-red-box"></view>
  <view class="green-box"></view>
  <view class="high-blue-box"></view>
</view>
```

项目对齐到交叉轴的终点（cross end）。

![align-content: flex end](https://gitee.com/findingjack/write-picture/raw/master/20210515125609.png)

3.之后将 align-content 的值修改为不同的值，查看效果。

```
<!-- 代码来源：005flex.wxml -->
<view class="section">center</view>
<view style="align-items:center;" class="box">
  <view class="high-red-box"></view>
  <view class="green-box"></view>
  <view class="high-blue-box"></view>
</view>

<view class="section">stretch</view>
<view style="align-items:stretch;" class="box">
  <view class="high-red-box"></view>
  <view style="height:auto;" class="green-box"></view>
  <view class="high-blue-box"></view>
</view>

<view class="section">baseline</view>
<view style="align-items:baseline;" class="box">
  <view style="padding-top:60px;" class="high-red-box">1</view>
  <view class="green-box">2</view>
  <view style="padding-top:30px;" class="high-blue-box">3</view>
</view>
```

记的将 stretch 里的盒子高度定义为 auto。拉伸设定只对高度自由的项目起作用。

baseline 中，你会发现红蓝盒子的高度都和设置的不太一样。这是因为加入 padding-top 是在背景中插入一块带背景色的区域，所以最后区域高度是原设置背景加上 padding-top 的高度。

![center、stretch、baseline](https://gitee.com/findingjack/write-picture/raw/master/20210515131651.png)

### align-content 属性

![align-content](https://gitee.com/findingjack/write-picture/raw/master/20210512222925.svg)

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。这意味着你要先设置 flex-wrap 属性，align-content 属性才能生效。

可选的有 5 个值。

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。

#### 实操效果展示

1. 为了方便看出效果，我将容器高度设置为了 200 px。另外设置上 flex-wrap 和 align-content 属性，接下来查看效果。

```
<!-- 代码来源：005flex.wxml -->
<view class="section">align-content属性 flex-start</view>
<view class="box" style="flex-wrap:wrap;align-content:flex-start;height:200px">
  <view style="width:200px;" class="red-box"></view>
  <view style="width:250px;" class="green-box"></view>
  <view style="width:100px;" class="blue-box"></view>
</view>
```

可以看到三个项目都在交叉轴的起点对齐。

![align-content 默认值 flex-start](https://gitee.com/findingjack/write-picture/raw/master/20210515162059.png)

2. 接下来将内联样式里的 flex-start 值替换为 flex-end。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">align-content属性 flex-end</view>
<view class="box" style="flex-wrap:wrap;align-content:flex-end;height:200px">
  <view style="width:200px;" class="red-box"></view>
  <view style="width:250px;" class="green-box"></view>
  <view style="width:100px;" class="blue-box"></view>
</view>
```

项目在交叉轴终点对齐。

![align-content：flex-end](https://gitee.com/findingjack/write-picture/raw/master/20210515162529.png)

3. 之后将 align-content 的值修改为不同的值，查看效果。

```
<!-- 代码来源：005flex.wxml -->
<view class="section">align-content属性 center</view>
<view class="box" style="flex-wrap:wrap;align-content:center;height:200px">
  <view style="width:200px;" class="red-box"></view>
  <view style="width:250px;" class="green-box"></view>
  <view style="width:100px;" class="blue-box"></view>
</view>

<view class="section">align-content属性 space-between</view>
<view class="box" style="flex-wrap:wrap;align-content:space-between;height:200px">
  <view style="width:200px;" class="red-box"></view>
  <view style="width:250px;" class="green-box"></view>
  <view style="width:100px;" class="blue-box"></view>
</view>

<view class="section">align-content属性 space-around</view>
<view class="box" style="flex-wrap:wrap;align-content:space-around;height:200px">
  <view style="width:200px;" class="red-box"></view>
  <view style="width:250px;" class="green-box"></view>
  <view style="width:100px;" class="blue-box"></view>
</view>

<view class="section">align-content属性 stretch：轴线占满整个交叉轴。 若设置了宽度，轴线就不会被拉伸</view>
<view class="box" style="flex-wrap:wrap;height:200px">
  <view style="width:200px;height:auto;" class="red-box"></view>
  <view style="width:250px;height:auto;" class="green-box"></view>
  <view style="width:100px;" class="blue-box"></view>
</view>
```

效果图里可以看到，红绿方块设置了可变高度，项目就被拉神。蓝方块的高度就没变。

![center、space-between、space-around、stretch](https://gitee.com/findingjack/write-picture/raw/master/20210515163955.png)

## 项目属性

### order 属性

![order](https://gitee.com/findingjack/write-picture/raw/master/20210515190416.svg)

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```
<!-- 代码来源：005flex.wxml -->
<view class="section">order属性 默认为0</view>
<view class="box">
  <view style="order:2;" class="red-box"></view>
  <view style="order:1;" class="green-box"></view>
  <view style="order:0;" class="blue-box"></view>
</view>
```

按递减的顺序为各个盒子的 order 属性赋值。查看效果，红绿蓝顺序的盒子变为了蓝绿红。

![order 属性](https://gitee.com/findingjack/write-picture/raw/master/20210515192820.png)

### flex-grow 属性

![flex-grow](https://gitee.com/findingjack/write-picture/raw/master/20210515190424.svg)

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

```
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-grow属性 默认为0</view>
<view class="box">
  <view style="flex-grow:1;" class="red-box"></view>
  <view style="flex-grow:1;" class="green-box"></view>
  <view style="flex-grow:1;" class="blue-box"></view>
</view>
<view class="box">
  <view style="flex-grow:1;" class="red-box"></view>
  <view style="flex-grow:2;" class="green-box"></view>
  <view style="flex-grow:1;" class="blue-box"></view>
</view>
```

![flex-grow 属性](https://gitee.com/findingjack/write-picture/raw/master/20210515193518.png)

### flex-shrink 属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

```
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-shrink属性 默认为1</view>
<view class="box">
  <view style="flex-shrink:2" class="red-box"></view>
  <view style="flex-shrink:0" class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
  <view class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

将第一个红方块设置为 2，第二个绿方块设置为 0。属性效果清晰地展示在下图。

![flex-shrink 属性](https://gitee.com/findingjack/write-picture/raw/master/20210515194255.png)

###  flex-basis 属性

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

``` 
<!-- 代码来源：005flex.wxml -->
<view class="section">flex-basis属性 默认为auto</view>
<view class="box">
  <view  style="flex-basis:100px;" class="red-box"></view>
  <view class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

![flex-basis 属性](https://gitee.com/findingjack/write-picture/raw/master/20210515195245.png)

### flex 属性

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

```
<!-- 代码来源：005flex.wxml -->
<view class="section">flex属性 flex属性是flex-grow, flex-shrink 和 flex-basis的简写 默认为0 1 auto</view>
<view class="box" style="flex-basis:100px">
  <view style="flex:auto;" class="red-box"></view>
  <view style="flex:none;" class="green-box"></view>
  <view class="blue-box"></view>
</view>
```

因为容器会根据项目的大小自动调整大小，所以我将容器调为固定 100 px大小，这样将红盒子调为 auto 时，就会自动拉伸适应容器。

### align-self 属性

![align-self](https://gitee.com/findingjack/write-picture/raw/master/20210515190430.svg)

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

该属性可能取 6 个值，除了 auto，其他都与 align-items 属性完全一致。

```
<view class="section">flex-end</view>
<view class="align-flex-end">
  <view class="high-red-box"></view>
  <view style="align-self:flex-start;" class="green-box"></view>
  <view class="high-blue-box"></view>
</view>
```

我将其余项目都弄为默认值，只有绿盒子设置 align-self 属性，将其设为在交叉轴终点对齐。

![align-self：flex-end](https://gitee.com/findingjack/write-picture/raw/master/20210515200018.png)

（完）