module.exports = {
  extends: [
    "airbnb",
    "plugin:prettier/recommended",
  ],
  plugins: [
      "react",
      "jsx-a11y",
      "import",
      "prettier",
  ],
  env: {
      browser: true,
      es6: true,
  },
  parserOptions: {
      ecmaFeature: {
          jsx: true
      },
      ignorePatterns: ["node_modules/", "package.json", "package-lock.json"],
  },
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": "off"
  }
}; 