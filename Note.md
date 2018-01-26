> 😄 router name 属性是做什么的？

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。跳转、链接的时候可以使用名称来指定即将前往的路由

```JavaScript
<router-link :to="{ name: 'user', params: { userId: 123 }}">
  User
</router-link>

router.push({ name: 'user', params: { userId: 123 }})
```

> 如何改变 document.title?

路由的相关回调中来修改，可以选择组件构建之前，也可以选址组件构建之后

> 😄 动画消失问题 - Nav 组件

Hover > Nav 的结构变成 Hover + Nav 结构

> <transition></transition> 组件的实现

> 😄 组件的 name 属性有什么用处？

允许组件模板递归的调用自身

> 路由编写的变化 children -> 优先匹配 效果 需要了解 vue-router 实现原理

> lazy-load 插件的思考

基于自定义指令来开发

主要遇到的问题：

1. 滚动容器的获取，可能是局部滚动，可能是 iScroll 类型库产生的模拟滚动
2. 滚动监听事件的兼容
3. 性能优化
  1. 元素被移除或者已经加载正常图片之后，事件监听回调中无需再判断
  2. 元素位置的计算可以尽量的避免

> 正则表达式问题 从数据中提取多个资源 会存在某些资源不存在的情况 如何编写正则表达式

> slot 的使用

具名 slot 插槽上面的属性不会被混合 会直接被忽略

*但是有的会被继承？*

有时间可以尝试阅读更新日志

https://stackoverflow.com/questions/42114188/bind-class-to-a-slot-in-vue-js-2?answertab=active#tab-top

