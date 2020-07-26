# 总结

这周对我来说，状态机和nodejs中net包是新的。

## 状态机

1. 每一个状态都是一个机器（独立，解耦）

   + 在每个机器里，我们可以做计算，存储，输出等

   + 只关心本机器要处理什么，不用关系其他机器

   + 所有的这些机器接受的输入是一致的

   + 状态机本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用，机器不应该受外部输入控制,不能从外部读变量）

2. 每个机器知道下一个状态（两种状态机）

   + 每个机器都有确定的下一个状态（Moore状态机，return和input无关）

   + 每个机器根据输入确定下一个状态（Mealy状态机）

涉及到了[KMP字符串算法]([https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm](https://en.wikipedia.org/wiki/Knuth–Morris–Pratt_algorithm))

个人对状态机的认知，通过老师的代码得知，可以是`if else`也可以是`function`，当然 `function`更好维护。主要是用在处理一串字符串时，把需要的每个细微的规则都定了一个或多个状态，来控制取出需要的字符串。当使用`if else`时，可以使用常量来表示状态，这样在没有注释的情况下也可以分辨具体的状态的代表；也防止在同一个状态引用较多时改动一个状态不是很方便；还有一点是在一般的IDE中都有变量常量等提示，不会打错或认错状态。

## net

> 模块用于创建基于流的 TCP 或 [IPC](http://nodejs.cn/s/rAdYjf) 的服务器

### server类

> 用于创建 TCP 或 [IPC](http://nodejs.cn/s/rAdYjf) 服务器

### socket类

> 可以由用户创建并且直接地与服务器进行交互
>
> 也可以由 Node.js 创建，并在收到连接时传给用户

### createConnection

> 用于创建 [`net.Socket`](http://nodejs.cn/s/wsJ1o1) 的工厂函数

### createServer

> 创建一个新的 TCP 或 [IPC](http://nodejs.cn/s/rAdYjf) 服务器

### isIP

> 测试输入是否是 IP 地址

### isIPv4

> 测试输入是否是 IPv4 地址

### isIPv6

> 测试输入是否是 IPv6 地址



