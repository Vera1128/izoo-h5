module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    ignorePatterns: ["node_modules","dist", ".eslintrc.js"],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        // 禁止编码尾部增加分号
        "semi": ["error", "never"],
        "no-extra-semi": "error",
        // 禁用拖尾逗号
        "comma-dangle": ["error", "never"],
        // 大括号风格要求 允许块的开括号和闭括号在 同一行
        "brace-style": "error",
        // 要求尽可能地使用单引号
        "quotes": [4, "single", {"allowTemplateLiterals": true}],
        // 数组中的空格
        "array-bracket-spacing": "error",
        // 强制在花括号中使用一致的空格
        "object-curly-spacing": ["error", 'always'],
        // 代码最后一行空格
        "eol-last": "off",
        // 变量未使用
        "no-unused-vars": "error",
        // 分号前后有空格
        "semi-spacing": "error",
        // 不允许存在不可达的代码
        "no-unreachable": "error",
        // 不允许出现不规则的空白
        "no-irregular-whitespace": ["error", {"skipTemplates": true}],
        // 不允许多余空白行，最多允许两行
        "no-multiple-empty-lines": "error",
        // switch 必须有default
        "default-case": "error",
        // 强制使用===和!==
        "eqeqeq": "error",
        // 禁用eval
        "no-eval": "error",
        // 禁止变量在定义前使用
        "no-use-before-define": "error",
        // 对象字面量的键和值之间使用一致的空格, 前不允许有，后要有，eg. {key: value}
        "key-spacing": ["error", {"beforeColon": false, "afterColon": true}],
        // 三元表达式换行: 如果表达式跨越多个行，则在三元表达式的操作数之间强制换行
        "multiline-ternary": ["error", "always-multiline"],
        // 禁止tab和空格混用
        "no-mixed-spaces-and-tabs": "error",
        // 缩进2个空格
        "indent": ["error", 2, {"SwitchCase": 1}],
        // 要求中缀操作符周围有空格：例如：1 + 2
        "space-infix-ops": "error",
        // 箭头函数的箭头之前之后有空格，例如: const f = () => {}
        "arrow-spacing": ["error", {"before": true, "after": true}],
        // const 声明的变量不允许修改
        "no-const-assign": "error",
        // 要求使用let 或 const, 不允许使用var声明变量
        "no-var": "error"
    }
  }