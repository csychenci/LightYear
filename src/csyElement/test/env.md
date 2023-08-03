---
title: 项目环境搭建
date: 2021-10-16 14:45:12
categories: JavaScript
tags:
  - JavaScript
  - 三贱客
  - React
description:
---

# 项目环境

---

## 环境搭建

---

1. 使用 _create-react-app_

```bash
npx create-react-app my-app --template typescript
```

2. 手动方式搭建

- 安装 _react_、_react-dom_、_react-redux_、_typescript_ 相关库

```bash
npm i react react-dom react-redux typescript --save
```

3. 为相关库安装声明文件

```bash
npm i @types/react @types/react-dom @types/react-redux --save-dev
```

- 创建 _`tsconfig.json`_，它是存放编译 _ts_ 的配置文件

```json
{
  "compilerOptions": {
    "target": "es5", // 编译的目标
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "preserve",
    // jsx: 这个配置是在tsx中支持jsx，可选参数preserve，react和react-native；这些模式只在代码生成阶段起作用 - 类型检查并不受影响。 在preserve模式下生成代码中会保留JSX以供后续的转换操作使用（比如：Babel）。 另外，输出文件会带有.jsx扩展名。 react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js。 react-native相当于preserve，它也保留了所有的JSX，但是输出文件的扩展名是.js
    "baseUrl": "./",
    // baseUrl：TS编译器需要编译模块的地址
    "paths": {
      // paths:基于baseUrl的路径，指定模块和路径的映射关系
      "@": ["src/"]
    }
  },
  "include": ["./src/**/*"]
  //   include: 需要编译的目标文件夹
}
```

4. 安装 webpack，并创建相应的配置文件

```sh
npm i webpack webpack-cli --save-dev
```

```diff
+ webpack.commom.js
# 存放公共的配置
+ webpack.dev.js
# 存放开发环境的配置
+ webpack.prod.js
# 存放生产环境的配置
```

5. 统一代码风格

- 安装完之后可以声明两个文件，.prettierignore 表示 prettier 忽略不需要去检查的目录），而.prettierrc.js 就是我们的 prettier 规则定义的

```sh
npm install prettier -D
```

```diff
# prettierignore
# Ignore artifacts:
+ node_modules
+ dist
+ .vscode
+ .prettierignore
```

```js
// .prettierrc.js
module.exports = {
  printWidth: 140,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  useTabs: false,
};
```

- 还可以通过安装 _vscode_ 的插件 _prettier_，但它的配置是全局的，如果我们希望使用当前的项目 _prettier_ 配置的话，需要在项目根目录下新建 _`.vscode`_ 文件夹并创建 _`settings.json`_ 文件，并设置配置优先级高于编辑器的全局配置

```json
{
  // prettier规则使用当前目录的.prettierrc.js
  "prettier.configPath": ".prettierrc.js",
  // 保存的时候自动格式化
  "editor.formatOnSave": true
}
```

6. 解决代码质量

- 通过 _`eslint`_ 来解决代码质量，首先声明一个 *`eslintrc.js`*文件，配置如下

```sh
npm i eslint -D
```

```js
// eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  extends: ['plugin:prettier/recommended'], //定义文件继承的子规范
  plugins: ['@typescript-eslint', 'react-hooks', 'eslint-plugin-react'], //定义了该eslint文件所依赖的插件
  env: {
    //指定代码的运行环境
    browser: true,
    node: true,
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // 自定义的一些规则
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'error',
    'valid-typeof': [
      'warn',
      {
        requireStringLiterals: false,
      },
    ],
  },
};
```

- parser 配置：插件@typescript-eslint/parser 让 ESLint 对 TypeScript 的进行解析

```sh
npm i @typescript-eslint/parser -D
```

- extends 配置：为了防止 eslint 和 prettier 的规则发生冲突，我们需要集成两者则设置为['plugin:prettier/recommended']

```sh
npm i eslint-config-prettier eslint-plugin-prettier -D
```

- plugins 配置: _`@typescript-eslint`_：包含了各类定义好的检测 Typescript 代码的规范。_`react-hooks`_：为了检测和规范 `React hooks` 的代码规范检查的插件。_`eslint-plugin-react`_：为了检测和规范 React 代码的书写的插件

```sh
npm i eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin -D
```

- 最后再对 _settings.json_ 进行修改

```json
{
  "prettier.configPath": ".prettierrc.js",
  "eslint.options": {
    "extensions": [".js", ".ts", ".tsx", "jsx", "html"]
  },
  "editor.codeActionsOnSave": {
    // 保存时使用eslint进行格式化
    "source.fixAll.eslint": true
  }
}
```

7. 规范 Git 提交

- 在将代码提交到仓库之前我们希望我们的代码全部进行代码格式化和代码质量检查，为此我们需要使用到一个工具对我们 git 缓存区最新改动过的文件进行格式化和 lint 规则校验

```sh
npm install husky lint-staged -D
```

- 修改 _pakeage.json_ 文件

```json
// pakeage.json
"husky": {
   "hooks": {
     "pre-commit": "lint-staged",
   }
 },
 "lint-staged": {
   "*.{ts,tsx,js,jsx}": [
     "eslint --config .eslintrc.js"
   ],
   "**/*": "prettier --write ."
 }
//  这样我们使用ESlint针对ts,tsx,js,jsx结尾的文件进行代码质量检查，并且使用prettier对所有的文件进行代码格式化
```

- 规范 _git commit_ 信息。具体可查看这一篇配置 --> [[前端项目规范]知晓 git commit 提交规范以及通晓 commitlint](https://juejin.cn/post/6878592895499108365#heading-15)

```js
npm i @commitlint/cli @commitlint/config-angular -D
```

- 创建 _commitlint.config.js_ 文件

```js
module.exports = { extends: ['@commitlint/config-angular'] };
// 使用angular的commit的规范，所以不需要编写更多的配置信息
```

- 配置 pre-commit 之后，增加下面的信息

```json
// pakeage.json
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      // commit信息
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
      //   HUSKY_GIT_PARAMS 为我们commit的信息 ，然后 commitlint 去会对这些信息进行 lint 校验
    }
  },
```
