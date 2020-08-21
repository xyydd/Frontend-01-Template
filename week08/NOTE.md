# 每周总结

### DOM API

DocumentFragment文档片段，往里面append不会对真实dom有影响，最后在真实dom中append时，只会把里面的dom加进去。

appendChild和insertBefore，在插入dom时，如果插入的dom原先存在于dom树，则会先移除后插入。

捕获：从外到内，计算事件发生在哪个节点上

冒泡：在已经知道事件发生在哪个节点上之后，层层向外触发。

#### Range API

操作批量 或半个节点

`document.getSelection`是鼠标选中。

### CSSOM 

`document.styleSheets`

`getComputedStyle`

### 新输出文章

[css选择器优先级](https://juejin.im/post/6861821239170695175)

[css属性哪些可以被继承](https://juejin.im/post/6861772550972801031)

