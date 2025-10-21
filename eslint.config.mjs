import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
      },
    },
    rules: {
      // Code quality rules
      "@typescript-eslint/naming-convention": "warn",
      curly: "warn",
      eqeqeq: "warn",
      "no-throw-literal": "warn",

      // Disable formatting rules (handled by Prettier)
      semi: "off",
      "@typescript-eslint/semi": "off",
      "prettier/prettier": "off",

      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Additional helpful rules
      "prefer-const": "warn",
    },
  },
  {
    ignores: ["out/**", "dist/**", "node_modules/**", "**/*.js"],
  }
);
