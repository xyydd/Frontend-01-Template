<map>
		<node ID="root" TEXT="04｜类型">		<node TEXT="JS Atom 原子，组成js最小的元素" ID="1361733e19528411c" STYLE="bubble" POSITION="right">
		</node>
		<node TEXT="Grammar" ID="374173293c090517f" STYLE="bubble" POSITION="right">
		<node TEXT="Literal " ID="178173293cc84b0b4" STYLE="fork">
		</node>
		<node TEXT="Variable" ID="3d5173293ce0cb0e8" STYLE="fork">
		</node>
		<node TEXT="Keywords" ID="1ae173293cf68b14d" STYLE="fork">
		</node>
		<node TEXT="Whitespace" ID="145173293d0880052" STYLE="fork">
		</node>
		<node TEXT="Line Terminator" ID="153173293d1871155" STYLE="fork">
		</node>
		</node>
		<node TEXT="Runtime" ID="1d4173293d3df600f" STYLE="bubble" POSITION="left">
		<node TEXT="types" ID="69173293d4ca4157" STYLE="fork">
		</node>
		<node TEXT="Execution Context" ID="2ff173293d69e90df" STYLE="fork">
		</node>
		</node>
		<node TEXT="Types(前五种常用)" ID="1c4173293da44906e" STYLE="bubble" POSITION="left">
		<node TEXT="Number" ID="1ea173293eb24d09f" STYLE="fork">
		<node TEXT="实际为Double Float，IEEE754标准中定义" ID="20a1732940c884046" STYLE="fork">
		</node>
		<node TEXT="范围：一个符号(正负)和11个指数位和52个精度位（每一位是一个bit表示0或者1，二进制）" ID="17a17329428b890fa" STYLE="fork">
		</node>
		<node TEXT="精度位*指数位*2的指数次方" ID="cf173296687f509b" STYLE="fork">
		</node>
		<node TEXT="指数位有基准值：01111111111，0十个1代表2的0次方，大于基准值为正数，小于为负数" ID="104173296768170b" STYLE="fork">
		</node>
		<node TEXT="最大数 2的2048次方 - 1即2的2的11次方 - 1" ID="ad173294582e901f" STYLE="fork">
		</node>
		<node TEXT="1 = 2的0次方 * 2的0次" ID="1b9173294fe5b3034" STYLE="fork">
		</node>
		<node TEXT="2：指数位：10000000000；精度位1000.....;即2的1次方 * 2的0次" ID="395173296e92f00fa" STYLE="fork">
		</node>
		<node TEXT="4：指数位：10000000001；精度位1000.....;即：2的2次方 * 2的0次" ID="4b173296f2b5b113" STYLE="fork">
		</node>
		<node TEXT="8: 指数位：10000000010；精度位1000....." ID="801732970fad6001" STYLE="fork">
		</node>
		<node TEXT="16: 指数位：10000000011；精度位1000....." ID="217173297165d00b6" STYLE="fork">
		</node>
		<node TEXT="6：指数位：10000000001；精度位1100....;即：2的2次方 * 2的1次" ID="d01732972cf050d7" STYLE="fork">
		</node>
		<node TEXT="问题：0.1 = 2的-4次方 * 多少？" ID="2db17329897abc156" STYLE="fork">
		</node>
		<node TEXT="在指数位中011111111111代表0，分割正负数。" ID="c5173294fe67c097" STYLE="fork">
		</node>
		<node TEXT="10000000000代表1，2为100000000001" ID="1261732950c5f10dd" STYLE="fork">
		</node>
		<node TEXT="0.toString()会把0.当成0，所以需要在.后面加空格：0. toString()" ID="253173294cc6d00f4" STYLE="fork">
		</node>
		</node>
		<node TEXT="String" ID="15d173293ebb85128" STYLE="fork">
		<node TEXT="&quot;&quot;/''/``" ID="2721733bc51760091" STYLE="fork">
		</node>
		<node TEXT="双引号和单引号正则匹配" ID="16d1733bc83af10f4" STYLE="fork">
		<node TEXT="&quot;(?:[^&quot;\n\\\r\u2028\u2029]|\\(?:['&quot;\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\)&quot;" ID="2651733bc88c7e05a" STYLE="fork">
		</node>
		</node>
		<node TEXT="``下面都是一个一个的不同的字符串词法 " ID="1461733bcb7e460ed" STYLE="fork">
		<node TEXT="`ab${" ID="2be1733bcb8b1f0f8" STYLE="fork">
		</node>
		<node TEXT="}abc${" ID="5f1733bcba3c603d" STYLE="fork">
		</node>
		<node TEXT="}dbc`" ID="1411733bcbb491108" STYLE="fork">
		</node>
		</node>
		<node TEXT="Character字符" ID="2131733bb16b2d084" STYLE="fork">
		</node>
		<node TEXT="code point码点" ID="3921733bb1d41c17" STYLE="fork">
		</node>
		<node TEXT="encoding编码方式" ID="14f1733bb1e22903" STYLE="fork">
		<node TEXT="ascII只有英文" ID="2e01733bb45146105" STYLE="fork">
		</node>
		<node TEXT="Unicode // 各种语言联合编码集" ID="461733bb46544013" STYLE="fork">
		</node>
		<node TEXT="UCS // 0000-FFFF" ID="1a41733bb4787f084" STYLE="fork">
		</node>
		<node TEXT="ISO-8859 // 东欧国家，没有中文版本" ID="2211733bb4d938006" STYLE="fork">
		</node>
		<node TEXT="BIG5 // 台湾" ID="3301733bb5022713c" STYLE="fork">
		</node>
		<node TEXT="GB // 国标，和unicode中的码点不一致都会兼容ASCII" ID="3991733bb47fcf0a9" STYLE="fork">
		<node TEXT="GB2312" ID="dc1733bb48756002" STYLE="fork">
		</node>
		<node TEXT="GBK(GB13000)" ID="c41733bb4983a038" STYLE="fork">
		</node>
		<node TEXT="GB18030" ID="3011733bb4bdd4139" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="编码UTF。ASC不存在编码问题，其他都存在" ID="2d1733bba659e132" STYLE="fork">
		<node TEXT="UTF-8 8个bit表示一个字节，默认一个字节表示一个字符，ASCII编码的一定是UTF8编码的" ID="1fa1733bbb8bbf051" STYLE="fork">
		</node>
		<node TEXT="UTF-16 16个bit表示一个字符，就是两个字节表示一个字符，比如‘a’：在UTF8中01100001，但是在UTF-16中：00000000 01100001，会在前面补8个0" ID="3671733bbd0e180f8" STYLE="fork">
		</node>
		<node TEXT="比如'一'：" ID="2411733bbf1ae10be" STYLE="fork">
		<node TEXT="UTF8: " ID="11a1733bbf4b0d07" STYLE="fork">
		<node TEXT="1110 0100    10 111000   10 000000" ID="1af1733bbfb7fd172" STYLE="fork">
		</node>
		<node TEXT="前面是1110开头，表示占3个字节，后面每个字节以10开头" ID="1a1733bc0107d0bb" STYLE="fork">
		</node>
		<node TEXT="有效位数：4 + 6 +6，再算上前面的控制位，一共2个字节" ID="2fc1733bc15e7704d" STYLE="fork">
		</node>
		</node>
		<node TEXT="UTF16，也有控制字符。" ID="601733bc3277c171" STYLE="fork">
		</node>
		</node>
		</node>
		</node>
		<node TEXT="Boolean" ID="26f173293ec182086" STYLE="fork">
		</node>
		<node TEXT="Object" ID="145173293ec81a095" STYLE="fork">
		<node TEXT="原型" ID="33c1733ccc539f048" STYLE="fork">
		</node>
		<node TEXT="属性" ID="3ba1733cf5fba6196" STYLE="fork">
		<node TEXT="获取属性是沿着原型往上找，原型链，一直找到null" ID="24c1733cf6d636042" STYLE="fork">
		</node>
		</node>
		<node TEXT="K-V" ID="b91733cf78872073" STYLE="fork">
		<node TEXT="K 有两种类型" ID="3b81733cf794c3076" STYLE="fork">
		<node TEXT="String" ID="891733cf7a19e147" STYLE="fork">
		</node>
		<node TEXT="Symbol" ID="2a1733cf7ac56121" STYLE="fork">
		</node>
		</node>
		<node TEXT="V 形态" ID="3451733cf7d6a605e" STYLE="fork">
		<node TEXT="数据属性 Data， 任何类型的值" ID="3e41733cf89e6c024" STYLE="fork">
		<node TEXT="value" ID="3391733cf9137f063" STYLE="fork">
		</node>
		<node TEXT="writable 是否可写" ID="f31733cf9268b129" STYLE="fork">
		</node>
		<node TEXT="enumerable 是否可枚举" ID="1e71733cf945d10f" STYLE="fork">
		</node>
		<node TEXT="configurable 是否可改变" ID="2021733cf955d90c9" STYLE="fork">
		</node>
		</node>
		<node TEXT="访问器属性 Accessor" ID="1991733cf8ba2b0de" STYLE="fork">
		<node TEXT="get" ID="2611733cfa2d25051" STYLE="fork">
		</node>
		<node TEXT="set" ID="32e1733cfa336a031" STYLE="fork">
		</node>
		<node TEXT="enumerable 是否可枚举" ID="1fb1733cfa621d0b7" STYLE="fork">
		</node>
		<node TEXT="configurable 是否可改变" ID="da1733cfa48f115" STYLE="fork">
		</node>
		</node>
		</node>
		</node>
		<node TEXT="原型机制" ID="2e81733dfa89b205d" STYLE="fork">
		<node TEXT="当访问属性时，如果当前对象没有，则会沿着原型找原型对象时都有此名称的属性，而原型对象还可能有原型，因此会有“原型链”这一说法。这一算法保证了每个对象只需要描述自己和原型的区别即可。" ID="2c51733dfb03430b4" STYLE="fork">
		</node>
		</node>
		<node TEXT="语法和api" ID="691733dfd28c308d" STYLE="fork">
		<node TEXT="{} . [] Object.defineProperty" ID="db1733dfd36da002" STYLE="fork">
		<node TEXT="提供基本对象机制，通过语法创建对象，访问属性和定义新的属性，改变属性的特征值" ID="1981733dfe62dc01e" STYLE="fork">
		</node>
		</node>
		<node TEXT="Object.create/Object.setPrototypeOf/Object.getPrototypeOf" ID="1961733dfd7c0a081" STYLE="fork">
		<node TEXT="原型相关" ID="421733dff504e13a" STYLE="fork">
		</node>
		<node TEXT="Object.create指定原型的创建对象" ID="1241733dff934f0f1" STYLE="fork">
		</node>
		<node TEXT="Object.setPrototypeOf/Object.getPrototypeOf修改获取原型" ID="2441733dffbbb605b" STYLE="fork">
		</node>
		</node>
		<node TEXT="new/class/extends" ID="2131733dfddb090a1" STYLE="fork">
		</node>
		<node TEXT="new/function/prototype 不推荐" ID="2f71733dfdfcf8091" STYLE="fork">
		</node>
		</node>
		<node TEXT="Function Object" ID="3d31733e02e945121" STYLE="fork">
		<node TEXT="Object[[call]]，没办法访问" ID="3d41733e0246820f" STYLE="fork">
		</node>
		</node>
		<node TEXT="Host Object" ID="3cd1733e040f330ba" STYLE="fork">
		<node TEXT="宿主环境定义的Object" ID="12f1733e042e65033" STYLE="fork">
		</node>
		</node>
		</node>
		<node TEXT="Null typeof:Object 定义为空" ID="133173293ecf8a124" STYLE="fork">
		<node TEXT="关键字" ID="2b31733cc43fff13a" STYLE="fork">
		</node>
		<node TEXT="void 0" ID="a11733cc555d304d" STYLE="fork">
		</node>
		</node>
		<node TEXT="Undefined 没有定义" ID="2f3173293ed428034" STYLE="fork">
		<node TEXT="是个变量，可以赋值 undefined = 1" ID="2821733cc4623d049" STYLE="fork">
		</node>
		</node>
		<node TEXT="Symbol" ID="278173293edffb006" STYLE="fork">
		</node>
		</node>
</node>
</map>