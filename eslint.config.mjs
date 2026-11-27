import tseslint from "typescript-eslint";
export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "vendor/**",
      "test-results/**",
      "playwright-report/**",
      "integrations/**",
      "scripts/**",
      "public/**",
    ],
  },
  {
    files: [
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
      "lib/**/*.ts",
      "content/**/*.ts",
      "tests/**/*.ts",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "no-debugger": "error",
      "no-constant-condition": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
    },
  },
];
