import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // This site uses `output: "export"` with `images.unoptimized`, so
      // next/image provides no optimization here. Images are pre-converted
      // to WebP and served via plain <img>, so this rule is not applicable.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
