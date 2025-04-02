import { defineConfig } from "tsup";
import { resolve } from "path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "ui/index": "src/ui/index.ts",
    "types/index": "src/types/index.ts",
    "utils/index": "src/utils/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "next-auth"],
  noExternal: ["@repo/*"],
  esbuildOptions(options) {
    options.alias = {
      "@/*": resolve(__dirname, "./src/*"),
      "@shared/*": resolve(__dirname, "./src/*"),
    };
    return options;
  },
});
