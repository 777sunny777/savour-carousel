savour-carousel
===============

carousel plugin V1.0.0

1.满足轮播图插件应该有的基本功能：向左，向右点击；下方快速导航；
2.可以自定义轮播图上的文字，链接等等所有你想要的，
  唯一要做的是自定义的css要相对定位于#list
  eg：#list .xxx{
        position: relative;
        top: -70px;
        left: 6px;
      }
3.图片路径默认是./img，需要改的话到css和html中找。
4.css,js都没有压缩，有需要，自己去看，自己去压缩。
5.第一个插件，后续会继续修改，
  有好的建议：sunnysunyan7@163.com      


对了，用法很简单，$(".test").LBT() 即可，
提供参数widthLBT,heightLBT，默认是600*400。
我又没压缩，你也可以去改源码。

===============
另外，欢迎到我的blog看看
http://777sunny777.github.io/sunnyblog/