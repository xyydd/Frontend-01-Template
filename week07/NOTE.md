# 每周总结

### 基线

不同文字的基线不一样，所以产生了vertical-align

### float

会先把元素当成正常流处理，然后发现float之后，把元素往定义的方向去挤。再之后会根据float元素的位置，调整行盒模型的位置比如文字。

会影响生产的行盒模型的尺寸

clear：在当前空间内，找一个不会被上面元素影响的空间执行浮动

### margin

主要是要求周围有那么多的留白，而不是一定要求和别的元素的边距差那么多。所以产生了margin collapse 留白折叠

只会发生在BFC里。flex grid 等都没有。

### BFC

产生条件：

1. float
2. absolute
3. Block container但不是block box
4. Overflow 不是visible

Block container 里面有BFC：block inline-block table-cell table-caption flexd的item grid的item

Block-level box 外面有BFC

Block box 里面都有BFC

BFC合并：[BFC合并与float](./BFC合并与float.html)、[BFC合并与边距折叠](./BFC合并与边距折叠.html)

