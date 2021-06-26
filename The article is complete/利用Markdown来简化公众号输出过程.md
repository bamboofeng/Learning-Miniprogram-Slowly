> 所需工具：①Markdown Here ②Typora ③gitee账户 ④PicGo
>
> 操作系统：win10

# 前言

本文先输出个人作者常使用的简化排版手段。也是为其他想像我一样输出自己教程的人减少一些学习上的难度。

以下先来个重要提示：

**所有工具仅为个人偏好，不建议使用，毕竟工具是有学习成本的。花时间为了输出版式的美观，特意学习杂七杂八的工具，反而会阻碍你学习小程序或其他东西的进度和积极性。还不如利用想学习的蛮劲，立马开始小程序相关教程的输出，不用管自己的排版怎么样。而是关注于自己输出知识点的逻辑性和理解程度。**


简化排版的工具很多，像各种第三方公众号排版器就五花八门。例如「壹伴」、「135编辑器」。

其他个人开发者也有不少公众号排版工具。例如禅叔的[可能吧公众号排版器](https://knb.im/mp/)、[Markdown编辑器](https://tool.codermore.com/wechat/ ) 。

其实各种工具都是写作者根据自己的写文习惯自己编辑出来的。所以你**不必纠结用哪个工具**，毕竟学完小程序后，你的前端知识已经完全入门，到时再根据自己的习惯编辑自己的工具都可以。

个人想使用Markdown简化排版过程的原因：因为一直在负责公司公众号的运营。后来发现135编辑器虽然排版样式很多。但是排版的过程过于繁琐，经常要花一个小时左右的时间进行排版校正。适合对排版要求高的公号，对一些markdown语法并不支持，而且粘贴过去后还会出现格式错乱。后来读到禅叔的文章——《[可能吧的文章是如何排版的？](https://mp.weixin.qq.com/s/O_f0Mg8Js3UWYPPI0DsvyQ)》。有了简化排版，将重心放在输出和输入上。慢慢的到处网上找教程完成了自己写文输出的工具。

Typora的特点百度一下到处都是。方便对markdown语法还不熟悉的人编写。因为他有状态栏，忘记代码你可以简单的点击进行标题、加粗等版式上的更换。同时所见即所得的特性让你可以方便的查看Markdown代码和最终效果。![image-20210412135712047](https://gitee.com/findingjack/write-picture/raw/master/20210412135712.png)

现在Typora已经支持PicGo图床，相较于其他第三方编辑器的优点就在于可以实现图片拖拽上传图床，这样你复制内容到公众号时，图片是一直保持的，不用再做进一步布局修改。

Markdown Here作为Chrome插件，可以实现一键在公众号后台由Markdown转HTML。极大减少排版时间。初始设置可能要一上午。但是之后你只要专心输出就好。内容复制到公众号后台，一键排版完成。简直不要太爽。

接下来开始教学。

# 图床准备

> 所需安装包：
>
> 1. Typora安装包  下载地址[Typora官网](https://www.typora.io/)
> 2. PicGo安装包  下载地址[PicGo官网](https://github.com/PicGo/)
> 3. node.js安装包  下载地址[node.js官网](https://nodejs.org/en/)
> 4. Gitee(码云)账号（或者其他做图床的平台，例如Github或者七牛云等） 注册地址[Gitee官网](https://gitee.com/)
>
> 展示环境：
>
> - 电脑型号：战神 Z7M-SL7D2
> - 操作系统：Windows 10 
> - 系统版本：18363.1440

利用Typora其实就可以简单的完成写作，但是想要实现简单的拖拽插入图片就需要我们自己配置图床。

#### 第一步 安装node.js、安装npm

PicGo的插件需要使用npm进行安装，如果你的电脑上没有安装npm，那么你是无法安装PicGo插件的，所以在此之前先完成npm的安装。

访问node.js的[官网](https://nodejs.org/en/)，根据官网的指导下载并安装node.js。

1.在开始菜单搜索cmd，用管理员身份运行。【包括后面运行微信开发者工具，最好使用管理员身份运行。因为在Windows系统中，很多时候报错是因为你没有权限】

![image-20210412141932411](https://gitee.com/findingjack/write-picture/raw/master/20210412141932.png)

2.在控制台输入`npm -v`,如果输出`npm -v 6.14.8`确认安装成功。

![image-20210412142322049](https://gitee.com/findingjack/write-picture/raw/master/20210412142322.png)

#### 第二步 注册码云Gitee

1.在[码云](https://gitee.com/)注册账号，注册完成后，点击右上角`+`号下拉新建仓库。

![image-20210412141329169](https://gitee.com/findingjack/write-picture/raw/master/20210412141329.png)

2.填写仓库名。仓库名随意，但是必须要是公开的仓库，这样图片才能被外部访问。我创建的地址为：https://gitee.com/findingjack/test-for-pic-go。

![image-20210412143457111](https://gitee.com/findingjack/write-picture/raw/master/20210412143457.png)

3.下面的选项可以不选。但唯独**要记得初始化仓库**。之前自己搜的教程没有提醒要记的初始化操作，导致我整个配置好之后图片上传不成功。最后溯源才发现自己没初始化仓库。

![image-20210412143023660](https://gitee.com/findingjack/write-picture/raw/master/20210412143023.png)

#### 第三步 创建私人令牌

创建完成后，记住你的仓库名，然后创建你的私人令牌。私人令牌是用来允许PicGo访问并更新你的仓库的。创建Gitee私人令牌步骤如下：

设置->安全设置->生成新令牌->填写私人令牌描述->权限只勾选两项->提交复制你的私人令牌

>  **注意需要保存该`私人令牌`。因为该`私人令牌`只会出现一次，离开页面过后再不会出现。**

![image-20210412143714812](https://gitee.com/findingjack/write-picture/raw/master/20210412143714.png)

![image-20210412143911747](https://gitee.com/findingjack/write-picture/raw/master/20210412143927.png)

![image-20210412144129360](https://gitee.com/findingjack/write-picture/raw/master/20210412144129.png)

#### 第四步 安装PicGo

访问[PicGo官网](https://github.com/PicGo/)进行下载安装。

注：在安装的时候安装目录千万不能选C:\Program Files\下的任何地方，如果你不知道安装在哪里的话，选择仅为我安装，否则在设置Typora时会出现以下错误：

> failed to launch PicGo app: Command failed: C:\Program Files\PicGo\PicGo.exe
> ‘C:\Program’ �����ڲ����ⲿ���Ҳ���ǿ����еĳ���
> ���������ļ���`

如下图所示

![img](https://gitee.com/findingjack/write-picture/raw/master/20210412144657.png)

#### 第五步 设置Gitee为PicGo的图床

1.运行`PicGo`,单击`插件设置`，在搜索中输入`Github`，安装搜索结果中的`github-plus`，如下图所示。设置完成后可以在`图床设置`中看到`Github plus`这一选项,即安装成功。

![image-20210412145207906](https://gitee.com/findingjack/write-picture/raw/master/20210412145208.png)

2.点击图床设置->githubPlus,在设置中填入你新建的仓库名repo（即你gitee的用户名/仓库路径）和 token（即保存的私人令牌），并选择origin为gitee，点击确定完成设置。

其中repo要填入你gitee的用户名/新建的仓库名，例如，仓库地址为https://gitee.com/findingjack/test-for-pic-go/，则repo填入的内容为findingjack/test-for-pic-go。


![image-20210412145107351](https://gitee.com/findingjack/write-picture/raw/master/20210412145107.png)

#### 第六步 设置Typora
去[官网网站](https://www.typora.io/#download)下载安装。安装完成后安装一下步骤进行设置Typora。

1. 点击Typora左上角的`文件->偏好设置`
2. 在弹出的页面中点击`图像`，选择`插入图片时`选项为’上传图片’，并勾选`所有选项`

![image-20210412150036211](https://gitee.com/findingjack/write-picture/raw/master/20210412150036.png)

3. 选择`上传服务`为`PicGo(app)`，点击`验证图片上传选项`，如果出现如下图所示界面，说明配置已成功，然后你就可以直接在Typora中插入图片了，Typora会自动上传并替换图片地址为网络地址。

![image-20210412150204147](https://gitee.com/findingjack/write-picture/raw/master/20210412150204.png)



# Markdown Here样式配置

该公众号推文使用《[我优化了李笑来的MarkdownHere，附CSS样式代码，排版再也不用愁了](https://mp.weixin.qq.com/s/3NLttoln46ERT7uJwy8_3g )》里面的CSS样式。有能力的小伙伴可以自己编写CSS样式。但是会看我教程的估计都跟我一样完全不懂前端代码。所以前期就贯彻「拿来主义」，直接用就好。后面有能力了再自己编。

[Markdown Here官网](https://markdown-here.com/)在里头下载Chrome插件。Markdown Here是谷歌插件，需要梯子才能下载。有需要的小伙伴可以在底下评论，需求多的话我会在公众号上挂一下下载链接，解决大家这个困难。

效果图：

![135editor_04121335_6073dc1476cfd20210412133516](https://gitee.com/findingjack/write-picture/raw/master/20210412133642.jpg)

可以先看下这种格式是否符合你的审美再粘贴下面附上的CSS码。

之后就是将底下的代码复制到 `Markdown Here选项->语法高亮CSS` 框内。可以按预览框的`Markdown转化`看一下效果。

![image-20210412150541793](https://gitee.com/findingjack/write-picture/raw/master/20210412150541.png)

```css
.markdown-here-wrapper {
  font-size: 15px;
  line-height: 1.8em;
  letter-spacing: 0.1em;
}


pre, code {
  font-size: 15px;
  font-family: Roboto, 'Courier New', Consolas, Inconsolata, Courier, monospace;
  margin: auto 5px;
}

code {
  white-space: pre-wrap;
  border-radius: 2px;
  display: inline;
}

pre {
  font-size: 15px;
  line-height: 1.4em;
  display: block; !important;
}

pre code {
  white-space: pre;
  overflow: auto;
  border-radius: 3px;
  padding: 1px 1px;
  display: block !important;
}

strong, b{
  color: #a00e00;
}

em, i {
  color: #334780;
}

hr {
  border: 1px solid #ddd;
  margin: 1.5em auto;
}

p {
  margin: 1.5em 5px !important;
}

table, pre, dl, blockquote, q, ul, ol {
  margin: 10px 5px;
}

ul, ol {
  padding-left: 15px;
}

li {
  margin: 10px;
}

li p {
  margin: 10px 0 !important;
}

ul ul, ul ol, ol ul, ol ol {
  margin: 0;
  padding-left: 10px;
}

ul {
  list-style-type: circle;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 1em;
  font-weight: bold;
  font-style: italic;
}

dl dd {
  margin: 0 0 10px;
  padding: 0 10px;
}

blockquote, q {
  border-left: 5px solid #a00e00;
  padding: 0 10px;
  color: #8B8386;
  quotes: none;
  margin-left: 1em;
}

blockquote::before, blockquote::after, q::before, q::after {
  content: none;
}

h1, h2, h3{
  margin: 10px 0 10px;
  padding: 0;
  font-style: bold !important;
  color: #a00e00 !important;
  text-align: center !important;
  margin: 1.5em 5px !important;
  padding: 0.5em 1em !important;
  border-bottom: none;
}

h4, h5, h6 {
  margin: auto 0px;
  padding: 0;
  font-style: bold !important;
  color: #334780 !important;
  text-align: left !important;
  margin: 1em 0px !important;
  padding: 0.5em 1em !important;
}

h1 {
  font-size: 24px !important;
  font-style: italic;
}

h2 {
  font-size: 20px !important;
 font-style: italic;
}

h3 {
  font-size: 18px !important;
  font-style: italic;
}

h4 {
  font-size: 17px;
}

h5 {
  font-size: 15px;
}

table {
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1em;
  font: inherit;
  border: 0;
  margin: 0 auto;
}

tbody {
  margin: 0;
  padding: 0;
  border: 0;
}

table tr {
  border: 0;
  border-top: 1px solid #CCC;
  background-color: white;
  margin: 0;
  padding: 0;
}

table tr:nth-child(2n) {
  background-color: #F8F8F8;
}

table tr th, table tr td {
  font-size: 16px;
  border: 1px solid #CCC;
  margin: 0;
  padding: 5px 10px;
}

table tr th {
  font-weight: bold;
  color: #eee;
  border: 1px solid #334780;
  background-color: #334780;
}
```

 之后每次排版就只需要将在Typora内编写的文字复制到公众号后台，点击Chrome右上键的Markdown Here插件。即可实现一秒排版。

**提示：复制Typora内的内容时，记的选择源代码模式。要不然只会复制过去只有文字，相应的Markdown代码不会被粘过去**