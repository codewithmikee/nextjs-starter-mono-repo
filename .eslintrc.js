// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@shared/eslint-config"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
