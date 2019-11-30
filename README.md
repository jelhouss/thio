<h1 align="center">THiO—Turn HTML into Objects</h1>

<p align="center"><img src="https://github.com/jelhouss/thio/blob/master/thio_pixelart_readme_img.png"></p>

<h5 align="center">Simple implementation of a HTML compiler-like, works on Node and the browser.</h5>

```javascript
const thio = require("thio");

thio("<p>I love Heath Ledger!</p>").then(tree => {
  // { tag: "ROOT", children: [
  //     tag: "p",
  //     props: { dataAttributes: [], attributes: [], events: [] },
  //     children: [{ Text: "I love Heath Ledger!" }]
  // ] }
});
```

## Why?

I just wanted to. No seriously, I wanted to understand how Vue.js virtual DOM works and it is actually about compiling HTML templates into tree of objects but more complicated than this because they depend on it to render a fully functional DOM. If you're curious about it [read the source code of the oldest version I found on GitHub](https://github.com/vuejs/vue/tree/0.10/src) I tried to follow with it for nights and nights but then I gave up.
For Thio, I found myself building something a bit different. Thio is not like that, it's just a small compiler that takes HTML and turn it into plain JavaScript objects without the full metadata of it, simple! and you would likely use it in cases where you want to scrap data from HTML pages and have a readable tree of it, or if you want to build an online HTML editor, where you would read the input of the user, compile it and then build real DOM nodes based on the input. More scenarios maybe? I don't know, you may need it anyway.

## Install (not available yet! soon!)

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install thio
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import thio from "thio";

// using CommonJS modules
const thio = require("thio");
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/thio/dist/thio.umd.js"></script>
```

You can find the library on `window.thio`.

## Testing

To run the test suite, download the repository, then within the thio directory, run:

```shell
gulp build
npm test
```

This will run the tests located in `test` folder. The test cases are really not that solid, but they reflect the core of the project, and if you have better test suites, please open a PR.

## License

MIT

## Want to share with us?

Great! [Contribute](https://github.com/jelhouss/thio/blob/master/CONTRIBUTING.md)
