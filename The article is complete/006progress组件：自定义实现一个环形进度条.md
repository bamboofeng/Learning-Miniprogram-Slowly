# progress 组件：自定义实现一个环形进度条

#慢慢学小程序#

> 展示环境：
> 操作系统：Windows 10 

**本节摘要：学习 progress 组件的属性；了解小程序状态绑定语法；自定义一个环形进度条。**

# 前言

前端网络操作是异步的，需要用户等待，为了避免用户在等待的过程中退出，通常辅以进度条告知用户大概还有多久。

[小程序的原生组件](https://developers.weixin.qq.com/miniprogram/dev/component/progress.html)支持从左到右的方形进度条。这节我们来了解了解原生组件的一些属性，并试着自定义实现一个环形进度条。

# 原生代码展示，了解代码架构

```xml
<!-- 代码来源：006progress.wxml -->
<progress show-info bindtap="onTapProgressBar" stroke-width="2" precent="{{percentValue}}" backgroundColor="#f2f2f2" active-mode="forwards" active bindactiveend="onProgressActiveEnd"/>
```

- bindtap 绑定 tap 事件。所有可见的 view 组件都可以绑定 tap 事件。即使属性列表中没有显式标明。阅读[事件丨小程序开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8Fhttps://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)可了解 tap 事件解释和用法。
- stroke-width：设置进度条宽度。 从前进方向来看是宽度，从表象来看实际是高度。
- active-mode：设置动画停止后重新启动的模式。有两个设置值。backwards 表示动画从头播。 forwards 动画从上次结束点接着播。  默认值 backwards，实践中一般使用 forwards。毕竟你也不会希望进度条在中间一停，就要从头再过一遍动画。
- active：表示进度条从左往右的动画，为布尔属性，为真只需要列上属性就可以了。要显式显示，需要写成active="{{false}}"。
- show-info：在进度条右侧显示百分比。
- activeColor：已选择的进度条的颜色。
- backgroundColor：未选择的进度条的颜色。

你是否注意到了绑定进度数值时使用到的双大括号： `{{}}`。有没有一丝好奇，为什么其他属性都用双引号，就它要另外加双大括号。

这里就涉及到了小程序的[数据绑定语法](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/data.html)。

------

## 数据绑定语法

1. **变量使用双大括号包裹： `<view>{{msg}}</view>`。**

2. **组件属性使用双引号包裹： `<view id="item"></view>`。**
3. **双引号里面的内容，编译时都会将其转化成字符串，所以true,false要表达本意需要再包裹双大括号：`<checkbox checked="{{false}}"> </checkbox>`**
4. **控制属性，需要在双引号之内加双大括号，可以理解为在组件属性内绑定变量，所以形式为1、2结合： `<progress precent="{{percentValue}}" />`。**

------

`bindtap` 和 `bindactiveend` 都是事件，要搭配JavaScript 处理事件。函数就像[事件丨小程序开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8Fhttps://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)描述的那样，要放在 Pages 定义内。`percentValue` 也跟着在页面数据内定义。

下面的代码是节选的，新建的 JS 文件编译器会自动组织各个生命周期的函数，我们的只要将以下和 Pages 定义内不同的代码粘贴过去即可，记得留心大括号的一一配对关系。

```javascript
// 代码来源：006progress.js           
Page({
  data: {
    percentValue: 0
  },
  onProgressActiveEnd(e){
    console.log(e)
  },
  onTapProgressBar(e){
    console.log(e)
    let progress = this.data.percentValue
    if (progress < 100){
      progress += 5
      this.setData({percentValue: progress)})
    }
  },
```

`console.log()` 方法用于在控制台输出信息。这样你每次点击时，控制台都会返回进度条的信息。

`onTapProgressBar` 函数内的代码还是很好理解的，为块内变量赋上 `percentValue` 的值。每次点击都自加 5。

最后用 setData 回传已变动的值给 `percentValue`，同时触发视图更新。忘记这步，你会发现进度条永远不前进。

查看下效果：

![Progress](https://gitee.com/findingjack/write-picture/raw/master/GIF.gif)

# 实战：自定义一个环形进度条

## 关键组件 - conic-gradient

[圆锥渐变](https://www.mybj123.com/6302.html)（conic-gradient）是用纯 CSS 实现环形进度条的关键。

语法是：

```css
conic-gradient( [ from <angle> ]? [ at <position> ]?, <angular-color-stop-list> )
```

锥形渐变由3部分组成：

- 起始角度
- 中心位置
- 角渐变断点

其中起始角度和中心位置都是可以省略的，因此，最简单的锥形渐变用法如下：

```css
.example {
    width: 300px; height: 150px;
    background-image: conic-gradient(white, deepskyblue);
}
```

效果如下图所示：

![CSS conic-gradient()](https://gitee.com/findingjack/write-picture/raw/master/image-20210609201646421.png)

可以在颜色后面加个空格设置颜色射线的角度（或占圆百分比的位置），之后 conic-gradient 就会自动为你补齐。

## 实现原理

绘制方法参考：[利用css圆锥渐变实现环形进度条](https://developers.weixin.qq.com/community/develop/article/doc/0000aedabacfa04e058a35fa75b413)

1. **利用conic-gradient画一个圆**

conic-gradient 使用第一个颜色从上方 0° 绘制到下一个断点，那么直接利用绿色绘制到 360° 的 80% 位置。作为已加载进度，后面会将这个值和 progressValue 绑定，实现进度条的可动。

未加载部分就利用白色，从 80% 位置绘制到 100%。

```css
background-image: conic-gradient(green 80%,#fff 80% 100%);
```

![BackgroundCircle](https://gitee.com/findingjack/write-picture/raw/master/image-20210609202458578.png)

2. **利用任意元素做个内圆遮挡**

在[上节实战篇](https://mp.weixin.qq.com/s/kvCWS8G-EmwNKGzTqBsNRw)介绍了五种选择器，这次又要新学一个选择器——[伪元素选择器](https://www.w3cschool.cn/cssref/sel-before.html)。

| p::before | 在每个<p>元素之前插入内容 |
| --------- | ------------------------- |

p::before 是一种伪元素选择器，可以在元素前插入内容。

白色内圆就是在选择绘制底圆的样式，在它之前插入一个半径略小的白色圆。

![InnerCircle](https://gitee.com/findingjack/write-picture/raw/master/image-20210609231717725.png)

> 最外层的背景色原来是白色的，这里为了便于识别改成了灰色。

3. 补充：

起始颜色设置为其他，你还可以实现渐变进度条效果。像图片中是设为黄绿色起始，conic-gradient 自动绘制渐变到终点的绿色，实现渐变效果。

![gradient](https://gitee.com/findingjack/write-picture/raw/master/image-20210609204938048.png)

## 实现代码

1. wxss 文件内定义进度条占位空间、内圆和进度显示样式。

```css
/* 代码来源：006progress.wxss */
/* 定义进度条占位空间 */
.conic-progress {
  margin: 100rpx auto;
  position: relative;
  width: 500rpx;
  height: 500rpx;
  border-radius: 50%;
}

/* 定义内圆 */
.conic-progress::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background-color: #fff;
}

/* 定义进度显示 */
.progress-value {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 60rpx;
  font-weight: bolder;
  color: green;
}
```

2. wxml 文件内定义各组件位置，以及引入圆锥渐变方法。

还额外定义了按钮，为了清晰展示数据变动时进度条的改变。

```html
<!-- 代码来源：006progress.wxml -->
<view class="conic-progress" style="background-image: conic-gradient(green {{progressValue}}%,#fff {{progressValue}}% 100%);">
	<text class="progress-value">{{progressValue}}%</text>
</view>
<button bindtap="drawProgress">redraw</button>
```

3. js 文件的 Pages 内定义数据改变的逻辑，让每点击一次，进度就会自增 5%。

```javascript
// 代码来源:006progress.js
Page({
  data: {
    progressValue: 0,

  },

  drawProgress(){
    if (this.data.progressValue >= 100){
      this.setData({
        progressValue:0
      })
    }
    
    for (let i = 0; i < 5; i++) {
      this.data.progressValue++;
      this.setData({
        progressValue:this.data.progressValue
      })
    }
  }
})
```

4. 效果展示

![customer-progress](https://gitee.com/findingjack/write-picture/raw/master/customer-progress.gif)

原来打算利用小程序 setData 的机制，循环赋值让进度条显示出动画效果，但怎么设置都是几帧内就完成参数变动，无法实现像 progress 组件一样的丝滑效果。

暂时保持这样，期待自己技术进步后解决这个坑。

（完）

