/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@components/ui/(.*)$",
    "^@components/(.*)$",
    "^src/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderMergeDuplicateImports: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
