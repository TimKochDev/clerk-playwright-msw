/* eslint-disable sort-keys-fix/sort-keys-fix */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/all",
    "plugin:react/jsx-runtime",
    "plugin:css-import-order/recommended",
    "plugin:vitest/recommended",
    "plugin:testing-library/react",
    "plugin:@typescript-eslint/recommended",
    "plugin:typescript-sort-keys/recommended",
  ],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["import", "react-hooks", "sort-keys-fix", "sort-destructure-keys"],
  rules: {
    "no-underscore-dangle": [
      "error",
      { allow: ["_id", "_property", "_hotel", "_agent"] },
    ],

    // Eslint Plugin React - We have enabled all rules first and disable here what we don't need
    "react/forbid-component-props": 0,
    "react/forbid-prop-types": 0,
    "react/no-set-state": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-indent": 0,
    "react/jsx-indent-props": 0,
    "react/jsx-max-depth": 0,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-newline": 0,
    "react/jsx-curly-newline": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-no-literals": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/static-property-placement": [
      1,
      "property assignment",
      { contextType: "static public field" },
    ],
    "react/destructuring-assignment": [
      1,
      "always",
      { ignoreClassFields: true },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-no-leaked-render": [
      1,
      { validStrategies: ["coerce", "ternary"] },
    ],
    "react/prefer-read-only-props": 0,
    "react/jsx-props-no-spreading": [
      1,
      {
        // react-hook-form expects spread props and this should be accepted
        exceptions: ["FormProvider", "Form.Input", "Input", "input"],
      },
    ],

    // React hooks
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

    // Import Order
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // Sort keys
    "sort-keys-fix/sort-keys-fix": "warn",

    "sort-destructure-keys/sort-destructure-keys": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
