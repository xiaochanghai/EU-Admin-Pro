// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks"; // ✅ 新增
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import { fixupConfigRules } from "@eslint/compat";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        jsxPragma: "React",
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    plugins: {
      react,
      "react-hooks": reactHooks, // ✅ 必须显式注册
      "@typescript-eslint": typescriptEslint,
      prettier
    },

    ...fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended", // 这会启用规则，但仍需插件注册
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended"
      )
    ).pop(),

    rules: {
      "no-var": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-use-before-define": "off",
      "prefer-const": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react-hooks/rules-of-hooks": "error", // ✅ 现在可用
      "react-hooks/exhaustive-deps": "off"
    }
  },

  globalIgnores([
    "**/*.sh",
    "**/node_modules/**",
    "**/*.md",
    "**/*.woff",
    "**/*.ttf",
    "**/.vscode/**",
    "**/.idea/**",
    "**/dist/**",
    "public/**",
    "docs/**",
    "**/.husky/**",
    "**/.local/**",
    "bin/**",
    "src/mock/*",
    "**/stats.html"
  ])
]);
