> router name 属性是做什么的？

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。跳转、链接的时候可以使用名称来指定即将前往的路由

```JavaScript
<router-link :to="{ name: 'user', params: { userId: 123 }}">
  User
</router-link>

router.push({ name: 'user', params: { userId: 123 }})
```

> 如何改变 document.title?

> 动画消失问题 - Nav 组件

> <transition></transition> 组件的实现

> 组件的 name 属性有什么用处？

允许组件模板递归的调用自身