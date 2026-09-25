import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import expressSecurityPlugin from "eslint-plugin-browser-security";
import { importX } from "eslint-plugin-import-x";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      "express-security": expressSecurityPlugin,
      importX: importX,
    },
    extends: ["js/recommended", "import-x/flat/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "express-security/no-permissive-cors": "warn",
      "no-process-exit": "error",
    },
  },
  eslintConfigPrettier,
]);
