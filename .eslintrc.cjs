const { resolve } = require("node:path")

const project = resolve(process.cwd(), "tsconfig.json")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "prettier", "only-warn"],
  globals: {
    React: true,
    JSX: true
  },
  env: {
    node: false,
    browser: true
  },
  settings: {
    "tailwindcss": {
      callees: ["cn"],
      config: "tailwind.config.js"
    }
  },
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": "off",
    "semi": "off",
    "indent": "off",
    "@typescript-eslint/semi": "off",
    "tailwindcss/no-custom-classname": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "react/no-unknown-property": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ]
  },
  ignorePatterns: [
    ".*.js", // Existing pattern
    ".eslintrc.cjs", // Add this line
    "node_modules/"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project
  },
  overrides: [
    {
      files: ["./**/*.js", "*.js"]
    }
  ],
  root: true
}
