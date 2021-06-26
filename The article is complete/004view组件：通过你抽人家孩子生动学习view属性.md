# 004 view 组件：通过你抽人家孩子生动学习 view 属性

#慢慢学小程序#

> 展示环境：
> 电脑型号：战神 Z7M-SL7D2
> 操作系统：Windows 10 
> 系统版本：18363.1440

**本节摘要：了解小程序语法和前端开发的不同；初识 view 视图组件；学习冒泡机制以及 CSS 中的盒子模型。**

# 前言

view 组件类似于 HTML 的 div 标签，但是有一些地方的不同。

[教程丨《小程序开发指南》](https://developers.weixin.qq.com/ebook?action=get_post_info&volumn=1&lang=zh_CN&book=miniprogram&docid=0006a2289c8bb0bb0086ee8c056c0a)的「6.1.2 管控与安全」和「6.2 组件系统」两部分介绍了小程序为什么不用前端开发的 CSS、HTML。而去自己设计了双线程模型和 Exparser 框架。

**[一句话总结就是为了管控和安全，建立一套自己的生态体系，以提供最大限度的控制，遇到问题，处理起来也会更及时。](https://developers.weixin.qq.com/community/develop/doc/00024606acc1403c17c8875a351000)**

在 WXML 中编写 HTML 标签不会报错。像码下 `<div>测试</div>` 这段代码。开发者工具还会为你自动补全。因为 WXML 的一些功能在底层也是翻译为 HTML 标签，进行功能实现。

需谨慎，两者相似并不意味着两者相同。有些功能在小程序内是无法实现，但又不会报错。这样在问题溯源中会很麻烦。

推荐在开发者工具内优先使用微信官方提供的标签。

因为基于 CSS、HTML、JavaScript 设计而成，本教程讲解的部分组件，其实现机理都要用这三种语言的实现机制进行解释。

下面先从 view 的基本属性开始了解。

> tips：
>
> ① 以后代码会在首行注释代码来源，让读者知道这段代码要写在哪个文件中。不额外花费篇幅用文字或图片展示代码编写位置。读者也要在阅读中学会区分。不同文件代码的编写格式是不一样的。
>
> ② 在编译器中添加注释的快捷键：`ctrl+？`。随着代码量的增加，各个组件之间的互相关联变多。需要开始做注释，在后续维护过程中方便了解这部分起到什么功能。

# 属性介绍

> 参考 [view丨微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)、[极客时间丨微信小程序全栈开发实战](https://time.geekbang.org/course/intro/100052401?utm_source=time_web&utm_medium=menu&utm_term=timewebmenu)进行编写。

#### hover-class

指定按下去的样式类，让容器有一个单击持续效果，松开界面就会恢复如初。

默认值为 `none` ，没有点击态效果。

以下面代码为例。

```
<!-- 代码来源：004view.wxml -->
<view hover-class="bc_red">content</view>
```

未点击时文字没有样式，点击时文字样式为 `bc_red` 。样式效果如下。

![点击态效果](https://gitee.com/findingjack/write-picture/raw/master/20210420111318.png)

查看我们在 wxss 文件中定义的 bc_red 样式。点击后的效果和预设的样式是一模一样的。

```
/* 代码来源：004view.wxss */
.bc_red {
  background: red;
  width: 100px;
  height: 120px;
}
```

#### hover-stop-propagation

指定是否阻止本节点的祖先节点出现点击态。默认为 flase。

这是一个布尔属性，布尔属性只有真或假两种选择。在标签内写上该属性、不赋值，它的布尔值隐性的修改为 true。

当然你也可以像上个属性一样显性设置，将参数修改为 `true`。

为什么祖先节点会出现点击态，就要了解小程序的冒泡机制。

冒泡机制有点像你去别人家做客，你抽了人家孩子一巴掌，那孩子肯定是要哭，将他被欺负的这件事上传给他爸。他爸就会知道这件事。然后响应事件做出反馈。

设置了这个属性就相当于与你把小孩嘴捂上，不让孩子出声，这样他爸就不知道这件事，不会做反馈行为。

实际的事件流程会分为三个阶段，但是本节没有实际应用，等到后续用到再详细解释三个流程。

![小程序捕捉、目标、冒泡阶段](https://gitee.com/findingjack/write-picture/raw/master/20210420165827.png)

首先来测试下如果不设置 `hover-stop-propagation` 会是什么效果。

先在 WXSS 中定义三种样式：

```
/* 代码来源：004view.wxss */
.section{
 padding: 20px;
}

.bc_green {
  background: green;
  width: 100px;
  height: 140px;
}
/* bc_red上面展示过，就不再复制粘贴占用篇幅 */
```

在 WXML 中引用。

```
<!-- 代码来源：004view.wxml -->
<view class="section">
 <!-- 不阻止父节点出现hover状态 -->
 <view hover-class="bc_red">
  parent
  <view hover-class="bc_green">
   child view
  </view>
 </view>
</view>
```

在模拟器中点击 child view，看到父子组件都会显示 hover-class。**（没有设置 hover-class 样式就不会出现 hover 样式，注意区分，是父节点的 hover 样式被拦截了，还是你没有设置）**

![不阻止父节点出现单击态](https://gitee.com/findingjack/write-picture/raw/master/20210425232001.gif)

之后给子节点加上 hover-stop-propagation 属性。点击下子组件，会发现父组件就不会变红了。

```
<view class="section">
 <!-- 阻止父节点出现hover状态 -->
 <view hover-class="bc_red">
  parent
  <view hover-stop-propagation hover-class="bc_green">
   child view
  </view>
 </view>
</view>
```

![阻止父节点出现单击态](https://gitee.com/findingjack/write-picture/raw/master/20210425232229.gif)

#### hover- start- time

按住后多久出现点击态，单位毫秒，默认50毫秒，最小推荐设置为17毫秒。(这是因为一般手机屏幕刷新率为60Hz，也就相当于17ms更换一帧。再小无意义，因为效果和17ms一样。)

我们给示例二的子节点安排上 `hover-start-class` 属性，实操中可以看到，点击 child view 后，父节点立马出现点击态，但是子节点等到一秒钟后才出现点击态。

```
<view class="section">
 <!-- 不阻止父节点出现hover状态 -->
 <view hover-class="bc_red">
  parent
  <view hover-class="bc_green" hover-start-time="1000">
   child view
  </view>
 </view>
</view>
```

![单击态一秒后出现](https://gitee.com/findingjack/write-picture/raw/master/20210425232405.gif)

#### hover- stay- time

手指松开后，单击态保留多久。单位毫秒。

`hover- start- time `和 `hover- stay- time` 就像技能施法的前摇和后摇。一个是多久后这个动作会执行，一个是多久后动作取消。

我们给示例2 的父节点加上 `hover- stay- time` 属性。设置为1000ms。单击 child view的过程中，发现父节点点击态持续一秒之后，子节点的点击态刚好出现。

![stay和start属性同时展示](https://gitee.com/findingjack/write-picture/raw/master/20210425232419.gif)

# [CSS盒子模型](https://www.runoob.com/css/css-boxmodel.html)

从示例2开始，之后文字都和周围界面有一定距离。这只效果不是通过在文字左边插入空格实现的。是利用祖先节点的 `section` 样式实现的。

在CSS中首末空格会被忽略。文字间插入超过一个空格就会被忽略，只显示出一个空格的效果。所以想像word文档中插入多个空格对其排版是无法实现的。

我们就要使用CSS中的布局排版属性。布局排版涉及到CSS的盒子模型。盒子模型涉及到四个属性。

![CSS box-model](https://gitee.com/findingjack/write-picture/raw/master/20210425142649.gif)

- **Margin(外边距)** - 清除边框外的区域，外边距是透明的。
- **Border(边框)** - 围绕在内边距和内容外的边框。
- **Padding(内边距)** - 清除内容周围的区域，内边距是透明的。
- **Content(内容)** - 盒子的内容，显示文本和图像。

![以画框类比盒子模型](https://gitee.com/findingjack/write-picture/raw/master/20210425233228.png)

这是很术语的解释，用画框来类比：

`Margin`就是设置画框之间的空白；

`Border`就是设置画框的宽度；

`Padding`就是显示内容和边框之间的空白。一般画框内容都是紧贴边框，那么Padding的设置值就是0；

`content`区域就是中间显示区域。我们在 `bc_red` 和 `bc_green` 中设置的 width、height ，就是控制此区域的长宽的。

![盒子模型效果](https://gitee.com/findingjack/write-picture/raw/master/20210426142458.jpeg)

[margin始终是透明的](https://www.jb51.net/css/154193.html)。margin可以使用单独的属性，对上、右、下、左的外边距进行设置。

即：margin-top、margin-right、margin-bottom、margin-left。

也可以使用简写的外边距属性同时改变所有的外边距：`margin: top right bottom left；`(eg: `margin:10px 20px 30px 40px`) 。

记忆方式是从元素的正上方开始，顺时针「上右下左」。

![内外边距参数](https://gitee.com/findingjack/write-picture/raw/master/20210426161253.png)

并且还可以省略数值写法，如下：

1. 如果 margin 只有一个值，表示上右下左的 margin 同为这个值。例如：`margin:10px;` 就等于 `margin:10px 10px 10px 10px；`
2. 如果 margin 只有两个值，第一个值表示上下 margin 值，第二个值为左右 margin 的值。例如：`margin:10px 20px;` 就等于 `margin:10px 20px 10px 20px;`
3. 如果 margin 有三个值，第一个值表示上 margin 值，第二个值表示左右 margin 的值，第三个值表示下 margin 的值。例如：`margin:10px 20px 30px;` 就等于 `margin:10px 20px 30px 20px;`
4. 如果 margin 有四个值，那这四个值分别对应上右下左这四个 margin 值。例如：`margin:10px 20px 30px 40px;`

实际使用中，不推荐使用三个值的 margin。

1. 是容易记错；

2. 是不容易日后修改。

一开始如果写成 `margin:10px 20px 30px;` 日后要改动为 `上10px，右30px，下30px，左20px`。

还得把这个margin拆开为 `margin:10px 30px 30px 20px;` 费力不讨好，不如一开始就老老实实的写成 `margin:10px 20px 30px 20px;` 来的实在。

padding 和 margin 属性、参数设置基本一样。将上面教程内容 margin 替换为padding 即可。

> 预告：
>
> 下节课更新004.5 利用新学的组件设置一个有点击态的按键。