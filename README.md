# 🧰 Simple Production Level TypeScript and Node js Setup | 2024

> We talk about a lot of **advanced Node.js and TypeScript**, particularly focused around Domain-Driven Design and large-scale enterprise application patterns. However, I received a few emails from readers that were interested in seeing what a basic TypeScript starter project looks like. So I've put together just that.


### Linting Setup
- You can modify these settings as you need to. Check out the full list of supported compiler options, and you can play around in the TypeScript playground:
```js
// tsconfig.json
{
  "compilerOptions": {
    "outDir": "dist", // where to put the compiled JS files
    "target": "ES2020", // which level of JS support to target
    "module": "CommonJS", // which system for the program AMD, UMD, System, CommonJS

    // Recommended: Compiler complains about expressions implicitly typed as 'any'
    "noImplicitAny": true, 
  },
  "include": ["src"], // which files to compile
  "exclude": ["node_modules"], // which files to skip
}
```
---
- First, install the following dependencies to your devDependencies:
```javascript
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```
- eslint: ESLint core library
- @typescript-eslint/parser: A parser that allows ESLint to understand TypeScript code
- @typescript-eslint/eslint-plugin: Plugin with a set of recommended TypeScript rule
---



---
- When we add an ESLint rule, it overrides the configuration defined in the extends list. Let’s add a couple of rules to see how it works:
```js
// .eslintrc
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],

  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    // to enforce using type for object type definitions, can be type or interface 
    "@typescript-eslint/consistent-type-definitions": ["error", "type"], 
  },

  "env": {
    "browser": true,
    "es2021": true
  }
}
```
- off or 0: Turn off the rule completely
- warn or 1: Treat the rule as a warning, but it won’t fail when running a linter
- error or 2: Treat the rule as an error. It will fail when running a linter
---

- You’ll find that some files don’t need to be linted at all, such as your dist folder, so you can prevent linting by creating a **.eslintignore** file and adding the folders or files you want to ignore:

```
node_modules
dist
```
---

- This often matches with your .gitignore file content, so to have a single source of truth, you can update the lint script to use the --ignore-path flag:

```js
// package.json
{
  // ...
  "scripts": {
    "lint": "eslint --ignore-path .eslintignore --ext .js,.ts ."
   },
  // ...
}
```
---
- command that will tell ESLint to fix what it can:
```
eslint --fix
```
---

-  let’s add Prettier to our project. Run the following command in the terminal:
```
yarn add prettier --dev
```
---

- you will need to create a file called .prettierrc.json in the project’s root directory, where you can define your format options :
``` js
// .prettierrc.json
{
  "semi": false, // Specify if you want to print semicolons at the end of statements
  "singleQuote": true, // If you want to use single quotes
  "arrowParens": "avoid", // Include parenthesis around a sole arrow function parameter
}
```
---

- we are going to start formatting our code using Prettier in the command line:
```
prettier --write .
```

---

- Let’s add the Prettier command to our scripts, just as we did for TypeScript and ESLint :
```js
{
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\""
}
```
---

- The best solution here is to use the eslint-config-prettier plugin to disable all ESLint rules that are irrelevant to code formatting, as Prettier is already good at it:
```
yarn add eslint-config-prettier --dev
```
---


- With that installed, let’s go to the .eslintrc file, and add prettier at the end of your extends list to disable any other previous rules from other plugins:
```js
// .eslintrc
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": ["@typescript-eslint"],
  // HERE
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },

  "env": {
    "browser": true,
    "es2021": true
  }
}
```
---

- Add these settings to your workspace settings :
```js
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  }
}
```
---

- Add Husky to automatically check your lint :
```js
yarn add husky --dev
yarn husky install
yarn husky add .husky/pre-commit "yarn lint-staged"
```
---


- Add Lint Stage for staged files :
```js
yarn add lint-staged --dev
```
---

- Add this to your package.json :
```js
 "lint-staged": {
    "src/**/*.ts": "yarn lint-prettier"
  },
```
---

### Conclusion
 Using TypeScript and ESLint together can boost our confidence in our code. It helps us prevent bugs and can save us time in the long run. Try using TypeScript and ESLint for an enhanced development experience, benefitting your and your team in your upcoming projects.

### Features

- Minimal
- TypeScript v4
- Linting with Eslint and Prettier
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with ts-node-dev

### Scripts

Starts the application in development using `ts-node-dev` to do hot reloading.

#### `yarn dev`

###

If you want to use it do these steps

- First clone the repo.
- now you need to add your GitHub origin by using this command
  `git remote set-url origin https://git-repo/new-repository.git`
- then push it to your GitHub
- And now you are ready to use it 🚀👍
