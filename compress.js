const fs = require('fs')
const Terser = require('terser')

fs.writeFileSync('dist/thio-umd.min.js', Terser.minify({ 'thio-umd.js': fs.readFileSync('dist/thio-umd.js', 'utf8') }, {
  sourceMap: {
    content: fs.readFileSync('dist/thio-umd.js.map', 'utf8'),
    url: 'dist/thio-umd.js.map'
  }
}).code, 'utf8')

fs.writeFileSync('dist/thio-esm.min.js', Terser.minify({ 'thio-esm.js': fs.readFileSync('dist/thio-esm.js', 'utf8') }, {
  sourceMap: {
    content: fs.readFileSync('dist/thio-esm.js.map', 'utf8'),
    url: 'dist/thio-esm.js.map'
  }
}).code, 'utf8')
