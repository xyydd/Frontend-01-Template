# 每周总结

## Yeoman

1. 安装

```shell
npm i -g yo
```

2. 新建目录

```shell
mkdir generator-toolchain && cd generator-toolchain
```

3. 初始化（项目名必须generator开头）

```shell
npm init -y
```

4. 安装yeoman-generator

```shell
npm install yeoman-generator
```

5. 创建目录结构

```she
mkdir generator
cd generator
mkdir app
cd app
```

6. 在app中新建文件index.js

```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }
};
```

`method1`和`method2`会  依次执行

7. 连接

```shell
npm link
```

8. 运行工具链

```shell
yo toolchain
// 会依次打印‘method 1 just ran’、 ‘method 2 just ran’
```

9. 需要用户输入(index.js文件)

```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    ]);

    this.log("app name", answers.name);
    this.log("cool feature", answers.cool);
  }
};
```

10. 安装依赖包（还是在index.js）

```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  installing() {
    this.npmInstall(['lodash'], { 'save-dev': true });
  }
};
```

或者是直接写入`package.json`

```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install() {
    this.npmInstall();
  }
};
```

11. 可以写一些模版文件

在目录中新建`templates`文件夹，在`templates`中新建index.html

```html
<html>
  <head>
    <title><%= title %></title>
  </head>
</html>
```

`index.js`:

```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: 'html title' }
    );
  }
};
```

## Babel

`@babel/core`，`@babel/cli`，`@babel-preset-env`，`@babel/polyfill`

webpack相关：`babel-loader`