# 每周总结

## 表达式

### 成员访问

对于a.b或a[b]这样的成员访问，返回的是一个应用类型reference

reference包含两个部分：一个值对象，一个key（String，Symbol）,因为在delete和assign中会用到整个reference。

### **乘方

乘方是js中唯一一个右结合运算

3\*\*2 \*\* 3 ==> 3\*\*(2\*\*3)

### unboxing 拆箱转换

对应依次执行的方法：

1. ToPremitive
2. valueOf 
3. toString

在没有ToPremitive的前提下，所有与Number有关，比如加法，都会执行valueOf ，所有与String有关，比如成员访问会优先执行toString

## 语句，运行时

### 声明

- 前五个作用范围只认function body 没有前后关系，永远会被当作出现在函数第一行，var比较特殊，声明作用在函数头部，但是赋值是在之后发生的。
- function declaration 函数声明 function
- generator declaration (function *)
- asyncFucntion declaration ()
- AsyncGenerator declaration
- VariableStatement var变量声明被归类到语句里
- 下面两个当声明之前去使用会报错，有作用域死区
- Class declaration
- Lexical declaration (const和let)

### 预处理

- 在运行之前，js引擎会先预先处理
- 会提前找到Var ，把变量声明到函数作用域级别
- 所有声明都有预处理机制，const也会，区别是const会在声明之前抛错
- var a = 2;void function () {a = 1;return;var a}();console.log(a);//2
- var a = 2;void function () {a = 1;return;const a}();console.log(a);//抛错，但是把函数用try抱住，还是会打印出2
- 上面两个执行结果都说明，函数中第一行a=1都不会改变外面的a因为不管是var 还是const ,都会被预处理，区别是const会在声明之前抛错

## 宏任务和微任务

- js执行颗粒度，在运行时的表示
  - 宏任务
  - 微任务（promise）
  - 函数调用
  - 语句/声明（completion record）
  - 表达式
  - 直接量/变量/this...
- 宏观任务
  - 宿主环境给js引擎一段代码，引擎把代码执行，这个任务就是宿主发起的任务叫宏观任务
- 微观任务
  - 在ES5引入promise之后，即在宿主发起执行任务后，由引擎自己发起并执行的任务叫微观任务，在js里面只有Promise会产生微任务
- 事件循环本身不属于js语言本身的内容
- 为什么Promise 里的代码比setTimeout先执行
  - Promise永远往队列尾部添加微观任务
  - setTImeout等宿主API则会直接添加宏观任务

## 函数调用

- js 每个函数都会生成闭包
- js里面每个函数都会带一个它定义时的Environment Record,保存在自己对象身上，变成一个属性
- var y = 2;
- function foo2 () {
- console.log(y)
- }
- export foo2
- 不管foo2会被传到哪里去，都会带上y
- 闭包分成两个部分
  - 代码部分
  - 环境部分
    - Object
    - 变量序列

### Realms

在掘金写了篇文章，写错或写得不好的地方希望得到指正，[文章](https://juejin.im/post/5f10ffb3f265da22ac25ab72)。

