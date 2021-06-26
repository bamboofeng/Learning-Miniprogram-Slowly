# 基于阿里巴巴图标网站 iconfont 实现自定义高清无损图标

#慢慢学小程序#

> 展示环境：
>
> - 电脑型号：战神 Z7M-SL7D2
> - 操作系统：Windows 10 
> - 系统版本：18363.1440

**本节摘要：学习配置 iconfont 网站项目。了解小程序目录树。将 icon 图标放于首页。**

小程序的原生图标只有九个，可以利用阿里巴巴的图标网站实现图标的自定义化，满足你的丰富要求。

# icon组件介绍

```xml
<icon type="success" size="93" color="green"></icon>
```

属性 `type` 表示图标类型。

可填值只有九种：success, success_no_circle, info, warn, waiting, cancel, download, search, clear。即原生图标只有九种。

属性 `size` 表示大小，支持 rpx 和 px 两种单位。

> 小科普——RPX单位和PX单位
>
> RPX（Responsive Pixel）：屏幕自适应单位，把屏幕分为750单位。每个单位对应PX单位是（1/750）*屏幕宽度。
>
> PX：**属性内值为无单位数值，则默认选择该单位。**

属性 `color` 表示颜色。icon图标由函数绘制，没有颜色的地方为无像素点。改变颜色只改变有像素点的位置。

![image-20210414091639207](https://gitee.com/findingjack/write-picture/raw/master/20210414091647.png)

想要了解更多可以访问[官方文档对icon组件的介绍](https://developers.weixin.qq.com/miniprogram/dev/component/icon.html)


# 配置iconfont网站项目资源

首先打开[阿里巴巴矢量图标库](https://www.iconfont.cn/)网站。页面如下：
![image-20210414134621518](https://gitee.com/findingjack/write-picture/raw/master/20210414134624.png)

矢量图标库有图标和插画两种类型。且支持你想要的图标主题进行检索。

因为本教程更关注功能实现，就不仔细挑选。随便点开一个图标库。选择第三个笑脸添加进购物车内。

![image-20210414135211899](https://gitee.com/findingjack/write-picture/raw/master/20210414135212.png)

此时右上角的购物车内数字就会`＋1`。点开购物车就会发现我们想要的图标已经在其中了。

![image-20210414135418424](https://gitee.com/findingjack/write-picture/raw/master/20210414135418.png)

贪心的我又多加了几个图标。之后点击 `添加至项目` 按钮。会要求你登录。用github和微博都可以。

![image-20210414135548766](https://gitee.com/findingjack/write-picture/raw/master/20210414135548.png)

登陆完之后就蹦出 `加入项目` 弹窗。可将图标加入到已有项目中，或新建一个项目加入其中。

![image-20210414140107559](https://gitee.com/findingjack/write-picture/raw/master/20210414140107.png)

添加后页面会自动跳转到项目详情界面。刚刚选的几个图标已经添加到其中。

![image-20210414140514782](https://gitee.com/findingjack/write-picture/raw/master/20210414140514.png)

点击中间 `查看在线链接` 。如果提示暂无代码，点击它生成一下即可。

![image-20210414141055091](https://gitee.com/findingjack/write-picture/raw/master/20210414141055.png)

下图生成了这个图标字体库代码。图标底下除了图标名还多了一串代码，这是字体编号。就像字体库一样，填写相应编码出现相应字体。编写小程序时，要填写这个编号，才能引用指定的图标。

![image-20210414141242025](https://gitee.com/findingjack/write-picture/raw/master/20210414141242.png)

复制字体库代码，随后我们回到开发者工具。

# 了解目录树，配置相关文件

想要编写小程序，那我们就要先知道哪个文件是需要编写的。接下来讲解下目录树，对组成小程序的文件有个基本了解。

上面的 cloudfunctions 是云配置文件。现阶段不需要用到，折叠起来。

下面的 miniprogram 文件夹就是所有有关小程序的文件，之后的操作集中修改这里的文件。

pages 文件夹存放的是小程序一个个页的配置文件。我们先右键pages文件夹，新建一个文件夹，来存放新建页的文件。

![image-20210414170814862](https://gitee.com/findingjack/write-picture/raw/master/20210414170816.png)

我将新文件夹命名为 `002` 。右键 `002` 文件夹，选择新建Page选项。之后就会自动新建四个文件。

![image-20210414214832447](https://gitee.com/findingjack/write-picture/raw/master/20210414214833.png)

可以看到跟页面相关的四个文件已经出现。我将新页的名称也设置为002。

![image-20210414215022151](https://gitee.com/findingjack/write-picture/raw/master/20210414215022.png)

新页文件已经创建。接下来我们就需要将它添加到全局配置里。就像你有一章的新内容，要先添加到目录中，这样读者才能知道它的准确位置，进而访问到它。

将目录树拉到最底部。可以看到三个命名为 app 的文件。这就是小程序的全局配置文件。

打开`app.json`，可以看到位于最上面的pages组件。这是小程序初始加载页面顺序。放在第一个的就是小程序的首页。

在最后一个的就是我们新建的页。这就是开发者工具的人性之处。点击`新建Page`，新建成功后新页路径就会自动添加到配置文件中。

而我们使用新建文件一个个创建新页文件时，路径就不会自动添加到全局配置中，此时记得手动添加。

![image-20210414222945417](https://gitee.com/findingjack/write-picture/raw/master/20210414222945.png)

接下来我们点击 index 文件夹的 index.wxss 文件。 在首页添加 icon 图标。

# 添加icon图标

首先将在 iconfont 网站复制的字体库链接复制到 `index.wxss`文件内。

```css
@font-face {
  font-family: 'iconfont';  /* project id 2486634 */
  src: url('//at.alicdn.com/t/font_2486634_pf7mqix0fga.eot');
  src: url('//at.alicdn.com/t/font_2486634_pf7mqix0fga.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2486634_pf7mqix0fga.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2486634_pf7mqix0fga.woff') format('woff'),
  url('//at.alicdn.com/t/font_2486634_pf7mqix0fga.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2486634_pf7mqix0fga.svg#iconfont') format('svg');
}
```

![image-20210414224922707](https://gitee.com/findingjack/write-picture/raw/master/20210414224922.png)

> 代码详解：
>
> @font-face是一个CSS模块。可以将我们自定义的Web字体嵌入到应用中。
>
> font-family指定这个字体名为iconfont，该名称可自定义。
>
> url是字体源，链接这么多字体源是为了兼容不同浏览器宿主环境。

接下来在WXSS文件添加对类样式的定义。

类样式名称 iconfont 可自己起。font-family是指定我们插入字体的名称。但是要注意和上面代码的font-family要保持一致。

```css
.iconfont {  
    font-family: "iconfont" !important;  
    font-size: 16px;  
    font-style: normal;  
    -webkit-font-smoothing: antialiased;  
    -moz-osx-font-smoothing: grayscale;
}
```

最后是定义具体图标样式。要使用伪样式 before。content 要使用 Unicode编码。也就是前面提到的，图标底下的编号`&#xe60b`。将前面的`&#x`替换为`\`即是我们需要的 Unicode编码，然后复制到 content 内。选了多个图标那么要做多个图标定义。

```css
.icon-smile:before {  
  content: "\e60b";   
  font-size: 70px;
}

.icon-ok:before {  
  content: "\e60c";   
  font-size: 70px;
}
```

我在底下定义了微笑和OK两个图标。接下来我们在WXML文件中使用它。

![image-20210414225425351](https://gitee.com/findingjack/write-picture/raw/master/20210414225425.png)



点击 `index.wxml` 文件

将两个图标都在WXML中引用，代码和效果如下：

```html
<icon class="iconfont icon-smile"></icon>
<icon class="iconfont icon-ok"></icon>
```

![image-20210414230036829](https://gitee.com/findingjack/write-picture/raw/master/20210414230036.png)



细心的小伙伴可能会发现，为什么彩色的图标在使用中就变成了黑色。那就请听下回分解吧！🤭

抓耳挠腮、痛苦不堪的小伙伴可以自行百度搜索，有相关教程，解决起来并不麻烦。希望各个小伙伴发挥自己的主观能动性，解决这个小问题。



整体回顾：

该图标实现方案使用的是矢量字体。icon图标为了不损失细节、方便适配多种机型使用的都是矢量图。字体包括点阵字体和矢量字体。矢量字体每个字符的描述信息是一个几何矢量绘图描述信息。这和图标的描述信息是一致的。将图标作为矢量字体实时绘制出来，可以实时填充任何颜色，可以无级缩放而没有锯齿。



课程方向：

问题驱动是最好的学习方式。接下来的教程我尽量在每一节提出一个小功能，在本节实现它，然后在最末尾讲解原理。这样以问题驱动的方式增加大家的学习效率。



~~家里的猫连着两天在床上拉屎，我好难啊。今天熬到这么晚才写完。/(ㄒoㄒ)/\~\~太难了，明天努力接着肝。~~