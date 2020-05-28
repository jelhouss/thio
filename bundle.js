const { resolve, extname, dirname } = require('path')

const resolver = {
  resolveId (importee, importer) {
    return extname(importee) === ''
      ? resolve(dirname(importer), importee) + '.js'
      : importee
  }
}

export default {
  input: 'src/main.js',
  plugins: [resolver],
  output: [{
    file: './dist/thio-umd.js',
    name: 'thio',
    format: 'umd',
    sourcemap: true
  }, {
    file: './dist/thio-esm.js',
    name: 'thio',
    format: 'esm',
    sourcemap: true
  }]
}

// Keep it simple!
