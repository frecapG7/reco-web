import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    ignores: ["dist", "build", "plugins"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-refresh/only-export-components": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];
