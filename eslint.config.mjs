import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design references from Claude Design, not source. Prototype artefacts
    // (inline styles, ReactDOM.render) are not ours to fix.
    "design_handoff_cuva_homepage_report/**",
    "improvements/**",
  ]),
]);

export default eslintConfig;
