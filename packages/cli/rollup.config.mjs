// rollup.config.mjs
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import multi from "@rollup/plugin-multi-entry";

export default {
  input: "src/**/*.ts",
  external: [
    "fs",
    "path",
    "rimraf",
    "commander",
    "antlr4",
    "rollup",
    "rollup/dist/loadConfigFile.js",
    "@rollup/plugin-typescript",
    "@rollup/plugin-commonjs",
    "@rollup/plugin-multi-entry",
    "@prettier/sync",
  ],
  output: [
    {
      dir: "dist",
      format: "cjs",
      preserveModules: true,
      exports: "named",
      banner: "#!/usr/bin/env node",
    },
    {
      dir: "dist",
      format: "es",
      entryFileNames: "[name].mjs",
      preserveModules: true,
      exports: "named",
      banner: "#!/usr/bin/env node",
    },
  ],
  plugins: [
    typescript(),
    json(),
    commonjs(),
    multi({
      preserveModules: true,
    }),
  ],
};
