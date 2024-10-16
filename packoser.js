#!/usr/bin/env node

const fs = require("fs");

console.log("[Packoser] Reading package.json")

const packagejson = require(process.argv.packagejson || "./package.json")
const { name, version, keywords, description, homepage, author, license, display } = packagejson;
const [ owner, id ] = name.split("/");

const composerjson = {
  name: name.replace("@", ""),
  keywords,
  description,
  version,
  license,
  "type": "project",
  "minimum-stability": "stable",
  "dist": {
        "url": `https://github.com/${owner}/${id}/releases/download/${id}_${version}.zip`,
        "type": "zip"
    },
  "extra": {
    display,
    updated: new Date().toDateString()
  },
  "authors": [
    {
      "name": author,
    }
  ]
}

fs.writeFileSync("./composer.json", JSON.stringify(composerjson, null, 4));

console.log("[Packoser] File written")
