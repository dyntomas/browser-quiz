import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  pluginJs.configs.recommended,
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  {languageOptions: { globals: globals.node }},
{ ignores: ["**/workbox*.js", "**/packoser.js", "**/sw.js", " public/**"] }
];