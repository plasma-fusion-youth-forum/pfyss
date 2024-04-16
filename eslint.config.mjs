import globals from "globals";
import pluginJs from "@eslint/js";

const commonConfig = {
  languageOptions: {
    globals: globals.browser,
  },
  ignores: ["node_modules/**/*.js", "public/**/*.js", "resources/**/*.js", "static/vendor/**/*.js"],
};

const buildConfig = {
  files: ["build/**/*.js"],
  languageOptions: {
    globals: globals.node,
  },
};

export default [commonConfig, buildConfig, pluginJs.configs.recommended];
