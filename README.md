<p align="center"><img src="https://raw.githubusercontent.com/jelhouss/thio/master/thio_pixelart_readme_img.png"></p>

Thio (pronounced /thēō/ and stands for Turn HTML into Objects) is a simple implementation of an HTML compiler-like, it works on Node and the browser.\
I wanted to understand how Vue.js virtual DOM works and it is actually about compiling HTML templates into tree of objects but more complicated than this because they depend on it to render a fully functional DOM. If you're curious about it [read the source code of the oldest version I found on GitHub](https://github.com/vuejs/vue/tree/0.10/src) I tried to follow with the code for nights and nights but then I gave up.\
For Thio, I found myself building something a bit different. Thio is not like that, it's just a small compiler that takes HTML and turn it into plain JavaScript objects without the full metadata of it, simple! and you would likely use it in cases where you want to scrape data from HTML pages and have a readable tree of it, or if you want to build an online HTML editor, where you would read the input of the user, compile it and then build real HTML elements based on the input using the DOM API. More scenarios maybe? I don't know, you may need it anyway.

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```shell
$ npm install thio
```

```javascript
const thio = require("thio");
```

With a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), you can use ES6 modules.

```javascript
import thio from "thio";
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/thio/dist/thio-umd.js"></script>
```

You can find the library on `window.thio`.

## API Documentation

```javascript
const tree = thio("<p>I love Heath Ledger!</p>").then(tree => tree);
```

`tree` will contain an object with the initial or parent element that we call `ROOT` and an array of children.

```javascript
console.log(tree);
// { tag: "ROOT", children: [
//     tag: "p",
//     props: { dataAttributes: [], attributes: [], events: [] },
//     children: [{ Text: "I love Heath Ledger!" }]
// ] }
```

The children array will contain all children of each element, and if any nested element has children, it becomes the parent of these children. Note that void elements does not have children, only props metadata.\
Each tag except the `ROOT` has metadata that consist of giving more information about the tag (e.g. events, attributes, etc).

- Data attributes follows the HTML specs on how to validate a data attribute. If the element has any data attribtues the `dataAttributes` array will be populated with objects depending on how many data attributes are there, and each object is a key-value pair of the attribute and its data value.
- Attributes does the same, it follow the HTML specs and it's a key-value object
- Events are also the same.

I wrote a good example that has a good tree (see `test` folder).\
The API documentation will be updated with more brief explanation if it has to be, because what the lib offers currently is not complicated. We will update the docs on every addition or significant change.

## Testing

To run the test suite, download the repository, then within the thio directory, run:

```shell
gulp build
npm test
```

This will run the tests located in `test` folder. The test cases are really not that solid, but they reflect the core of the project, and if you have better test suites, please open a PR.

## Security

If you find any security issues with this, please contact me. I want this project to be really efficient, also if you hany more ideas and code changes to prevent security issues feel free to mention it too. All PRs are welcome.

## License

MIT

## Want to share with us?

Great! [Contribute](https://github.com/jelhouss/thio/blob/master/CONTRIBUTING.md)
