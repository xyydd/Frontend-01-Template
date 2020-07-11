# 每周总结可以写在这里

## 1.产生式

	#### BNF

1. 用尖括号括起来的名称来表示语法结构名

2. 语法结构分成基础结构和需要用其他语法结构定义的复合结构
   1. 基础结构称 终结符
   2. 复合结构称 非终结符
3. 引号和中间的字符表示终结符
4. 可以有括号 代表终结符，非终结符的需要"(" ")"
5. *表示可以重复多次
6. |表示或
7. +表示至少一次

## 2.编程语言的性质

#### 图灵完备性

命令式语言---图灵机：goto、if和while

声明式语言---lambda演算：递归

#### 动态

1. 在用户设备上运行、在线服务器上运行
2. 产品实际运行时
3. runtime

#### 静态

1. 在程序员的设备上
2. 产品开发时
3. Compiletime 编译时

## 3.类型

JS Atom 原子，组成js最小的元素

### Grammar

1. Literal
2. Variable
3. Keywords
4. Whitespace
5. Line Terminator

### Runtime

1. types
2. Execution Context

### Types(前五种常用)

JS Atom 原子，组成js最小的元素

### Grammar

1. Literal
2. Variable
3. Keywords
4. Whitespace
5. Line Terminator

### Runtime

1. types
2. Execution Context

### Types(前五种常用)

JS Atom 原子，组成js最小的元素

### Grammar

1. Literal
2. Variable
3. Keywords
4. Whitespace
5. Line Terminator

### Runtime

1. types
2. Execution Context

### Types(前五种常用)

#### Number

实际为Double Float，IEEE754标准中定义
范围：一个符号(正负)和11个指数位和52个精度位（每一位是一个bit表示0或者1，二进制）
精度位*指数位*2的指数次方
指数位有基准值：01111111111，0十个1代表2的0次方，大于基准值为正数，小于为负数
最大数 2的2048次方 - 1即2的2的11次方 - 1
1 = 2的0次方 * 2的0次
2：指数位：10000000000；精度位1000.....;即2的1次方 * 2的0次
4：指数位：10000000001；精度位1000.....;即：2的2次方 * 2的0次
8: 指数位：10000000010；精度位1000.....
16: 指数位：10000000011；精度位1000.....
6：指数位：10000000001；精度位1100....;即：2的2次方 * 2的1次
问题：0.1 = 2的-4次方 * 多少？
在指数位中011111111111代表0，分割正负数。
10000000000代表1，2为100000000001
0.toString()会把0.当成0，所以需要在.后面加空格：0. toString()

#### String

```
""    ''  ``
```

1. 双引号和单引号正则匹配

```
"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\)"
```

  2. 下面都是一个一个的不同的字符串词法

```
`ab${
}abc${
}dbc`
```



3. code point码点

4. encoding编码方式

   1. ascII只有英文
   2. Unicode // 各种语言联合编码集
   3. UCS // 0000-FFFF
   4. ISO-8859 // 东欧国家，没有中文版本
   5. BIG5 // 台湾
   6. GB // 国标，和unicode中的码点不一致都会兼容ASCII
      1. GB2312
      2. GBK(GB13000)
      3. GB18030

5. 编码UTF。ASC不存在编码问题，其他都存在

   1. UTF-8 8个bit表示一个字节，默认一个字节表示一个字符，ASCII编码的一定是UTF8编码的

   2. UTF-16 16个bit表示一个字符，就是两个字节表示一个字符，比如‘a’：在UTF8中01100001，但是在UTF-16中：00000000 01100001，会在前面补8个0

   3. 比如'一'：

      1. UTF8:1110 0100 10 111000 10 000000

      > 前面是1110开头，表示占3个字节，后面每个字节以10开头
      > 有效位数：4 + 6 +6，再算上前面的控制位，一共2个字节

#### Boolean

#### Object

+ 原型

+ 属性

  + 获取属性是沿着原型往上找，原型链，一直找到null

+ K-V

  + K 有两种类型
    + String
    + Symbol
  + V 形态
    + 数据属性 Data， 任何类型的值
      + value
      + writable 是否可写
      + enumerable 是否可枚举
      + configurable 是否可改变
    + 访问器属性 Accessor
    + get
    + set
    + enumerable 是否可枚举
    + configurable 是否可改变
  + 原型机制

  > 当访问属性时，如果当前对象没有，则会沿着原型找原型对象时都有此名称的属性，而原型对象还可能有原型，因此会有“原型链”这一说法。这一算法保证了每个对象只需要描述自己和原型的区别即可。

  + 语法和api

    + {} . [] Object.defineProperty

      > 提供基本对象机制，通过语法创建对象，访问属性和定义新的属性，改变属性的特征值

    + Object.create/Object.setPrototypeOf/Object.getPrototypeOf

      + 原型相关
      + Object.create指定原型的创建对象
      + Object.setPrototypeOf/Object.getPrototypeOf修改获取原型
      + new/class/extends
      + new/function/prototype 不推荐

  + Function Object.    Object[[call]]，没办法访问

  + Host Object.  宿主环境定义的Object

#### Null typeof:Object 定义为空

+ 关键字
+ void 0

#### Undefined 没有定义

是个变量，可以赋值 undefined = 1

#### Symbol

返回唯一值，只有通过创建时给的值能访问到，可用在Object key中，增加唯一性和隐私性。