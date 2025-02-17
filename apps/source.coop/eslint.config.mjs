import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});
const config = [...compat.extends("next/core-web-vitals", "next/typescript")];
config.push({
    // TODO(SL): enable these rules and fix the errors
    // TODO(SL): use the same rules in the whole project (other workspaces, use ../eslint.config.mjs)
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "react/no-unescaped-entities": "off",
        "no-var": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react-hooks/rules-of-hooks": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/jsx-key": "off",
        "prefer-const": "off"
    }
})
export default config