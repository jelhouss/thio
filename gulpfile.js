const { resolve, extname, dirname } = require("path");

const gulp = require("gulp");
const rollup = require("rollup");

const resolver = {
  resolveId(importee, importer) {
    return extname(importee) === ""
      ? resolve(dirname(importer), importee) + ".js"
      : importee;
  }
};

gulp.task("build", () => {
  return rollup
    .rollup({
      input: "src/main.js",
      plugins: [resolver]
    })
    .then(bundle => {
      bundle.write({
        file: "./dist/thio-umd.js",
        name: "thio",
        format: "umd",
        sourcemap: true
      });

      bundle.write({
        file: "./dist/thio-esm.js",
        name: "thio",
        format: "esm",
        sourcemap: true
      });

      return bundle;
    });
});
