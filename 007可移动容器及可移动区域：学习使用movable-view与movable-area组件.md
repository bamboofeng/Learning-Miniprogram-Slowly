# 007可移动容器及可移动区域：学习使用movable-view与movable-area组件

#慢慢学小程序#

> 展示环境：
> 操作系统：Windows 10 

**本节摘要：学习 movable-view与movable-area组件；了解三种拖拽情况。**

# 前言

侧滑菜单/侧滑删除，是界面中很常看到的组件。像QQ联系人侧滑出现操作栏，APP上侧滑出现菜单栏……

小程序为我们封装了两个原生组件：可移动容器及可移动区域。可在小程序中快速实现相关功能。

![ sliding 图源：https://www.jianshu.com/p/edf012918db8](https://gitee.com/findingjack/write-picture/raw/master/sliding.gif)

接下来从基本属性开始，一步步开始自己编写出纵享丝滑的侧滑栏。

本文参考：

[movable-view丨微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/component/movable-view.html)

[movable-area](https://developers.weixin.qq.com/miniprogram/dev/component/movable-area.html)

[微信小程序 movable-view](https://blog.csdn.net/ufo00001/article/details/72637500)

[极客时间丨微信小程序全栈开发实战](https://time.geekbang.org/course/detail/100052401-241498)

# 代码结构

组件的可移动要通过两个组件实现：

- 可移动区域：规定内部可移动容器的活动范围。

- 可移动容器：就是可移动区域间的可动单元。

下面就是一个最简单的可动组件。

```html
<!-- 代码来源：007movable.wxml -->
<movable-area>
	<movable-view direction="all">text</movable-view>
</movable-area>
```

最简单的可移动视图容器，用`<movable-area>`包裹`<movable-view>`既可。

定义滑动方向`direction`为全部方向`all`。接下来你就可以看到灰色可移动区域包裹着内部绿色容器，组件只能在灰色区域滑动。（**避免文章啰嗦，下面提到可移动区域和可移动容器，会简写为区域和容器**）![movable-model](https://gitee.com/findingjack/write-picture/raw/master/movable-model.gif)

在这里`<movable-area>`和`<movable-view>`的高宽都被我定义为 100rpx 和 400rpx。如果不进行设置，默认都为10px。

```css
/* 代码来源：007movable.wxss */
movable-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  width: 100rpx;
  background: #1AAD19;
  color: #fff;
}

movable-area {
  height: 400rpx;
  width: 400rpx;
  background-color: #ccc;
  overflow: hidden;
}
```

# 属性介绍

`movable-area`只有一个`scale-area`属性，涉及缩放操作，使用的地方很少，故区域和容器涉及缩放的属性都不做介绍。

下面介绍的都是`movable-view`的属性。

`direction`属性可设置为四个值：

- `all`：全部方向；

- `vertical`：竖向；

- `horizontal`：横向；

- `none`：不可动。

`x`、`y`属性可以设置容器在区域内的初始位置，是相对于区域左上角的偏移值。

其他还有`damping`阻尼系数、`friction`摩擦系数等动画属性，会在实战中结合实战具体讲解。此处就不多啰嗦。下面结合代码看下属性效果。

```html
x <!-- 代码来源：007movable.wxml -->
<!-- direction 属性介绍 -->
<movable-area style="height: 600rpx;width: 600rpx;background: blue;">
      <!--黄色可以任意二维方向拖动内容-->
      <movable-view direction="all" style="height: 100rpx; width: 100rpx; background: yellow;border-radius:30px">
      </movable-view>
      <!--红色只能横向拖动内容-->
      <movable-view direction="horizontal" x="100" y="0" style="height: 100rpx; width: 100rpx; background: red;">
      </movable-view>
       <!--绿色只能竖向拖动内容-->
      <movable-view direction="vertical"  x="0" y="100"  style="height: 100rpx; width: 100rpx; background: #0f0;">
      </movable-view>
       <!--白色不能拖动内容-->
      <movable-view direction="none"  x="100" y="100"  style="height: 100rpx; width: 100rpx; background: #fff;border-radius:30px">
      </movable-view>
</movable-area>
```

定义了 600 rpx × 600 rpx 的可移动区域。

内部有黄色（任意移动）、红色（只可横向）、绿色（只可竖向）、白色（不可移动）四个容器。

为了不互相遮挡，给红色（100，0）、绿色（0,100）、白色（100、100）定义了初始偏移位置。

通过 JS 修改 x、y 的值，还可以实现可移动容器的移动动画。

在模拟器中查看下效果，看是不是只能按属性规定的方向移动。

![direction-property](https://gitee.com/findingjack/write-picture/raw/master/direction-property.gif)

# 三种拖拽情况

movable-area的区域和movable-view的大小都是可自定义的，根据容器和区域的相对大小就会出现三种拖拽情况。像前言提到的侧滑工具栏就是通过特殊的拖拽情况实现的。

## 1、movable-area ＞ movable-view

开头展示的情况就是 movable-area ＞ movable-view，这种情况 movable-view 可自由拖动，一直包含于movable-area。

![movable-model](https://gitee.com/findingjack/write-picture/raw/master/movable-model.gif)

## 2、 movable-area ＝ movable-view

```HTML
<movable-area>
	<movable-view style="width:400rpx;height:400rpx;" direction="all">text</movable-view>
</movable-area>
```

将`movable-view`的大小也变为 400 × 400。这种情况下是没法移动的。

![movable-area ＝ movable-view](https://gitee.com/findingjack/write-picture/raw/master/movable-area%20%EF%BC%9D%20movable-view.gif)

## 3、movable-area ＜ movable-view

```html
<movable-area>
	<movable-view style="width:500rpx;height:500rpx;" direction="all">text</movable-view>
</movable-area>
```

当movable-view＞movable-area时 ，就像上面有抠了一块的蒙版，你只能透过蒙版看到底下的一块区域。并且可以移动下方区域，看到不同部分。

![movable-area ＜ movable-view](https://gitee.com/findingjack/write-picture/raw/master/movable-area%20%EF%BC%9C%20movable-view.gif)

侧滑操作栏就是通过 movable-area ＜ movable-view 情况下的机制实现的。

下一节实战就教你怎么自定义做一个侧滑操作栏。

（完）
