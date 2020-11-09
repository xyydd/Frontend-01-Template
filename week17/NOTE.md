# 每周总结

单元测试中，重要的指标：code coverage

mocha中使用es6的export和import用法：

安装@babel/register @babel/preset-env @babel/core

```shell
npm i -D @babel/register @babel/preset-env @babel/core
```

在项目根目录下配置babel:`.babelrc`

```json
{
  "presets": ["@babel/preset-env"]
}
```

运行命令

```shell
./node_modules/.bin/mocha --require @babel/register
```



### code coverage

```shell
npm i -D nyc
```

```shell
nyc ./node_modules/.bin/mocha --require @babel/register
```

