var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async initPackage () {
        this.answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);


        const pkgJson = {
            "name": this.answer.name,
            "version": "1.0.0",
            "description": "",
            "main": "main.js",
            "scripts": {
                "build": "webpack",
                "test": "mocha --require @babel/register",
                "coverage": "nyc npm run test"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "devDependencies": {
            },
            "dependencies": {
            }
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(['vue'], {'save-dev': false});
        this.npmInstall(['mocha', 'nyc', '@babel/core', 'babel-loader', '@babel/preset-env', '@babel/register', 'babel-plugin-istanbul', '@istanbuljs/nyc-config-babel'], {'save-dev': true});
        this.npmInstall(['vue-loader', 'webpack', 'webpack-cli', 'vue-template-compiler', 'css-loader', 'vue-style-loader', 'copy-webpack-plugin'], {'save-dev': true});
    }

    async copyFiles() {
        this.fs.copyTpl(
          this.templatePath('.babelrc'),
          this.destinationPath('.babelrc'),
        );
        this.fs.copyTpl(
          this.templatePath('.nycrc'),
          this.destinationPath('.nycrc'),
        );
        this.fs.copyTpl(
          this.templatePath('add.test.js'),
          this.destinationPath('test/add.test.js'),
        );
        this.fs.copyTpl(
          this.templatePath('add.js'),
          this.destinationPath('src/add.js'),
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: this.answer.name }
        );
        this.fs.copyTpl(
            this.templatePath('Hello.vue'),
            this.destinationPath('src/Hello.vue')
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );
    }
};