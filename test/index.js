const fs = require("fs");
const should = require("should");
const thio = require("../dist/thio-umd.js");

/**
 *
 * Errors
 */
const BAD_HTML_HIERARCHY = "BAD_HTML_HIERARCHY";
const VOID_ELEMENT_NOT_VALID = "VOID_ELEMENT_NOT_VALID";
const UNKNOWN_TOKEN = "UNKNOWN_TOKEN";
const START_TAG_EMPTY_OR_NOT_CLOSED = "START_TAG_EMPTY_OR_NOT_CLOSED";
const END_TAG_EMPTY_OR_NOT_CLOSED = "END_TAG_EMPTY_OR_NOT_CLOSED";
const LESSER_THAN_SIGN_DUPLICATED = "LESSER_THAN_SIGN_DUPLICATED";
const END_TAG_NO_SPACES = "END_TAG_NO_SPACES";
const EMPTY_EVENT_LISTENER = "EMPTY_EVENT_LISTENER";
const ATTRIBUTE_NOT_WRAPPED_IN_QUOTES = "ATTRIBUTE_NOT_WRAPPED_IN_QUOTES";
const INVALID_TAG_NAME = "INVALID_TAG_NAME";
const INVALID_ATTTRIBUTE_NAME = "INVALID_ATTTRIBUTE_NAME";
const INVALID_ATTTRIBUTE_VALUE = "INVALID_ATTTRIBUTE_VALUE";
const INVALID_DATA_ATTRIBUTE_NAME = "INVALID_DATA_ATTRIBUTE_NAME";
const INVALID_DATA_ATTRIBUTE_VALUE = "INVALID_DATA_ATTRIBUTE_VALUE";
const INVALID_EVENT_HANDLER = "INVALID_EVENT_HANDLER";

/**
 *
 * Handling errors test suite
 *
 * TODO: add UNKNOWN_TOKEN test cases
 */
describe("Error Catching Test Cases", function() {
  /**
   *
   * BAD_HTML_HIERARCHY test cases
   */
  context("When the HTML template is not well written", function() {
    describe('#thio("<p>I love Heath Ledger</span>")', function() {
      it("Should throw a TypeError of BAD_HTML_HIERARCHY", function() {
        thio("<p>I love Heath Ledger</span>").should.be.rejectedWith(
          TypeError,
          { message: BAD_HTML_HIERARCHY }
        );
      });
    });
  });

  /**
   *
   * VOID_ELEMENT_NOT_VALID test cases
   */
  context("When the HTML template contain false void element", function() {
    describe('#thio("<p/>")', function() {
      it("Should throw a TypeError of VOID_ELEMENT_NOT_VALID", function() {
        thio("<p/>").should.be.rejectedWith(TypeError, {
          message: VOID_ELEMENT_NOT_VALID
        });
      });
    });
  });

  /**
   *
   * START_TAG_EMPTY_OR_NOT_CLOSED test cases
   * END_TAG_EMPTY_OR_NOT_CLOSED test cases
   */
  context("When an HTML tag is empty or not closed", function() {
    describe('#thio("<p")', function() {
      it("Should throw a TypeError of START_TAG_EMPTY_OR_NOT_CLOSED", function() {
        thio("<p").should.be.rejectedWith(TypeError, {
          message: START_TAG_EMPTY_OR_NOT_CLOSED
        });
      });
    });

    describe('#thio("</p")', function() {
      it("Should throw a TypeError of END_TAG_EMPTY_OR_NOT_CLOSED", function() {
        thio("</p").should.be.rejectedWith(TypeError, {
          message: END_TAG_EMPTY_OR_NOT_CLOSED
        });
      });
    });

    describe('#thio("<")', function() {
      it("Should throw a TypeError of START_TAG_EMPTY_OR_NOT_CLOSED", function() {
        thio("<").should.be.rejectedWith(TypeError, {
          message: START_TAG_EMPTY_OR_NOT_CLOSED
        });
      });
    });

    describe('#thio("</")', function() {
      it("Should throw a TypeError of END_TAG_EMPTY_OR_NOT_CLOSED", function() {
        thio("</").should.be.rejectedWith(TypeError, {
          message: END_TAG_EMPTY_OR_NOT_CLOSED
        });
      });
    });
  });

  /**
   *
   * END_TAG_NO_SPACES test cases
   */
  context("When an HTML end tag contain a space", function() {
    describe('#thio("</sp an>")', function() {
      it("Should throw a TypeError of END_TAG_NO_SPACES", function() {
        thio("</sp an>").should.be.rejectedWith(TypeError, {
          message: END_TAG_NO_SPACES
        });
      });
    });

    describe('#thio("</ >")', function() {
      it("Should throw a TypeError of END_TAG_NO_SPACES", function() {
        thio("</ >").should.be.rejectedWith(TypeError, {
          message: END_TAG_NO_SPACES
        });
      });
    });
  });

  /**
   *
   * LESSER_THAN_SIGN_DUPLICATED test cases
   */
  context("When an HTML tag has a duplicated lesser-than sign", function() {
    describe('#thio("<<p")', function() {
      it("Should throw a TypeError of LESSER_THAN_SIGN_DUPLICATED", function() {
        thio("<<p").should.be.rejectedWith(TypeError, {
          message: LESSER_THAN_SIGN_DUPLICATED
        });
      });
    });

    describe('#thio("<span<")', function() {
      it("Should throw a TypeError of LESSER_THAN_SIGN_DUPLICATED", function() {
        thio("<span<").should.be.rejectedWith(TypeError, {
          message: LESSER_THAN_SIGN_DUPLICATED
        });
      });
    });

    describe('#thio("</<span")', function() {
      it("Should throw a TypeError of LESSER_THAN_SIGN_DUPLICATED", function() {
        thio("</<span").should.be.rejectedWith(TypeError, {
          message: LESSER_THAN_SIGN_DUPLICATED
        });
      });
    });

    describe('#thio("</sp<an")', function() {
      it("Should throw a TypeError of LESSER_THAN_SIGN_DUPLICATED", function() {
        thio("</sp<an").should.be.rejectedWith(TypeError, {
          message: LESSER_THAN_SIGN_DUPLICATED
        });
      });
    });
  });

  /**
   *
   * EMPTY_EVENT_LISTENER test cases
   * INVALID_EVENT_HANDLER test cases
   */
  context(
    "When an HTML event attribute has an invalid event handler. Also when the event listener is empty or not valid.",
    function() {
      describe('#thio("<a onClick="">Empty listener on click</a>")', function() {
        it("Should throw a TypeError of EMPTY_EVENT_LISTENER", function() {
          thio(
            '<a onClick="">Empty listener on click</a>'
          ).should.be.rejectedWith(TypeError, {
            message: EMPTY_EVENT_LISTENER
          });
        });
      });

      describe('#thio("<a onSomeWeirdEvent="doThis()">Weird event handler</a>")', function() {
        it("Should throw a TypeError of INVALID_EVENT_HANDLER", function() {
          thio(
            '<a onSomeWeirdEvent="doThis()">Weird event handler</a>'
          ).should.be.rejectedWith(TypeError, {
            message: INVALID_EVENT_HANDLER
          });
        });
      });
    }
  );

  /**
   *
   * ATTRIBUTE_NOT_WRAPPED_IN_QUOTES test cases
   */
  context("When an HTML attribute is not quoted", function() {
    describe('#thio("<a onClick=visit()>Hip-hop is cool</a>")', function() {
      it("Should throw a TypeError of ATTRIBUTE_NOT_WRAPPED_IN_QUOTES", function() {
        thio("<a onClick=visit()>Hip-hop is cool</a>").should.be.rejectedWith(
          TypeError,
          {
            message: ATTRIBUTE_NOT_WRAPPED_IN_QUOTES
          }
        );
      });
    });

    describe('#thio("<a style=>Bules is lovely</a>")', function() {
      it("Should throw a TypeError of ATTRIBUTE_NOT_WRAPPED_IN_QUOTES", function() {
        thio("<a style=>Bules is lovely</a>").should.be.rejectedWith(
          TypeError,
          { message: ATTRIBUTE_NOT_WRAPPED_IN_QUOTES }
        );
      });
    });

    describe('#thio("<a style="color: red;>Talal Maddah is great</a>")', function() {
      it("Should throw a TypeError of ATTRIBUTE_NOT_WRAPPED_IN_QUOTES", function() {
        thio(
          "<a style='color: red;>Talal Maddah is great</a>"
        ).should.be.rejectedWith(TypeError, {
          message: ATTRIBUTE_NOT_WRAPPED_IN_QUOTES
        });
      });
    });
  });

  /**
   *
   * INVALID_TAG_NAME test cases
   */
  context("When an HTML tag is not valid", function() {
    describe('#thio("<component><div>HTML does not have a tag called component</div></component>")', function() {
      it("Should throw a TypeError of INVALID_TAG_NAME", function() {
        thio(
          "<component><div>HTML does not have a tag called component</div></component>"
        ).should.be.rejectedWith(TypeError, {
          message: INVALID_TAG_NAME
        });
      });
    });
  });

  /**
   *
   * INVALID_ATTTRIBUTE_NAME test cases
   * INVALID_ATTTRIBUTE_VALUE test cases
   */
  context(
    "When an HTML tag has unknown attribute name, or an invalid attribute value; an attribute value is invalid when it contains a lesser-than sign",
    function() {
      describe('#thio("<img src="valid/attribute" cry="bruh_wtf" />")', function() {
        it("Should throw a TypeError of INVALID_ATTTRIBUTE_NAME", function() {
          thio(
            "<img src='valid/attribute' cry='bruh_wtf' />"
          ).should.be.rejectedWith(TypeError, {
            message: INVALID_ATTTRIBUTE_NAME
          });
        });
      });

      describe('#thio("<img alt="1 < 2" />")', function() {
        it("Should throw a TypeError of INVALID_ATTTRIBUTE_VALUE", function() {
          thio("<img alt='1 < 2' />").should.be.rejectedWith(TypeError, {
            message: INVALID_ATTTRIBUTE_VALUE
          });
        });
      });
    }
  );

  /**
   *
   * INVALID_DATA_ATTRIBUTE_NAME test cases
   * INVALID_DATA_ATTRIBUTE_VALUE test cases
   */
  context(
    "When an HTML tag has invalid data attribute names or values. Data attributes should contain only letters separated by a dash, and values must be either letters only or numbers only.",
    function() {
      describe('#thio("<img data-safe="1" data--not-safe-="something" data-also?not.safe="somethingElse" />")', function() {
        it("Should throw a TypeError of INVALID_DATA_ATTRIBUTE_NAME", function() {
          thio(
            "<img data-safe='1' data--not-safe-='something' data-also?not.safe='somethingElse' />"
          ).should.be.rejectedWith(TypeError, {
            message: INVALID_DATA_ATTRIBUTE_NAME
          });
        });
      });

      describe('#thio("<img data-bad="something123" />")', function() {
        it("Should throw a TypeError of INVALID_DATA_ATTRIBUTE_VALUE", function() {
          thio("<img data-bad='something123' />").should.be.rejectedWith(
            TypeError,
            {
              message: INVALID_DATA_ATTRIBUTE_VALUE
            }
          );
        });
      });
    }
  );
});

/**
 *
 * Handling compiling result and the tree test suite
 */
describe("Reading and Compiling HTML from a File", function() {
  const FILE_ABSOLUTE_PATH = "./test/nocomment_nodoctype_noxml.html";
  const AST = {
    tag: "ROOT",
    children: [
      {
        tag: "html",
        props: { dataAttributes: [], attributes: [], events: [] },
        children: [
          { Text: "\n  " },
          {
            tag: "head",
            props: { dataAttributes: [], attributes: [], events: [] },
            children: [
              { Text: "\n    " },
              {
                tag: "meta",
                props: {
                  dataAttributes: [],
                  attributes: [{ attribute: "charset", value: "utf-8" }],
                  events: []
                }
              },
              { Text: "\n    " },
              {
                tag: "title",
                props: { dataAttributes: [], attributes: [], events: [] },
                children: [{ Text: "title" }]
              },
              { Text: "\n    " },
              {
                tag: "meta",
                props: {
                  dataAttributes: [],
                  attributes: [
                    { attribute: "name", value: "author" },
                    { attribute: "content", value: "name" }
                  ],
                  events: []
                }
              },
              { Text: "\n    " },
              {
                tag: "link",
                props: {
                  dataAttributes: [],
                  attributes: [
                    { attribute: "rel", value: "stylesheet" },
                    {
                      attribute: "href",
                      value: "//fonts.googleapis.com/css?family=font1"
                    },
                    { attribute: "type", value: "text/css" }
                  ],
                  events: []
                }
              },
              { Text: "\n  " }
            ]
          },
          { Text: "\n  " },
          {
            tag: "body",
            props: { dataAttributes: [], attributes: [], events: [] },
            children: [
              { Text: "\n      " },
              {
                tag: "p",
                props: {
                  dataAttributes: [{ dataAttribute: "article-id", value: "1" }],
                  attributes: [],
                  events: []
                },
                children: [{ Text: "something" }]
              },
              { Text: "\n      " },
              {
                tag: "button",
                props: {
                  dataAttributes: [],
                  attributes: [],
                  events: [{ event: "click", handler: "dothat()" }]
                },
                children: [{ Text: "click me" }]
              },
              { Text: "\n      " },
              {
                tag: "script",
                props: { dataAttributes: [], attributes: [], events: [] },
                children: [{ Text: 'console.log("hourai")' }]
              },
              { Text: "\n  " }
            ]
          },
          { Text: "\n" }
        ]
      }
    ]
  };

  it("Should returns a tree of a structured HTML elements", () => {
    fs.readFile(FILE_ABSOLUTE_PATH, "utf-8", (err, data) => {
      if (err) throw err;

      thio(data).should.be.fulfilledWith(AST);
    });
  });
});
