import tokenize_attrs from "attrs";
import {
  END_TAG_EMPTY_OR_NOT_CLOSED,
  END_TAG_NO_SPACES,
  START_TAG_EMPTY_OR_NOT_CLOSED,
  LESSER_THAN_SIGN_DUPLICATED
} from "../constants/errors";

export const tokenizeEndTag = ({ input, cursor, tokens }) => {
  cursor++;
  let closeTag = "";
  while (
    input[cursor] !== ">" &&
    input[cursor] !== "<" &&
    input[cursor] !== undefined &&
    input[cursor] !== " "
  ) {
    closeTag += input[cursor];
    cursor++;
  }

  if (input[cursor] === undefined) {
    throw new TypeError(END_TAG_EMPTY_OR_NOT_CLOSED);
  } else if (input[cursor] === "<") {
    throw new TypeError(LESSER_THAN_SIGN_DUPLICATED);
  } else if (input[cursor] === " ") {
    throw new TypeError(END_TAG_NO_SPACES);
  } else {
    tokens.push({ closeTag });
    cursor++;
  }
  return cursor;
};

export const tokenizeStartTag = ({ input, cursor, tokens }) => {
  let openTag = "";
  let FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG = "";
  let attrs = [];
  let IS_VOID_ELEMENT = false;
  let voidElement;

  while (input[cursor] !== ">") {
    while (
      input[cursor] !== " " &&
      input[cursor] !== ">" &&
      input[cursor] !== "<" &&
      input[cursor] !== undefined
    ) {
      openTag += input[cursor];
      cursor++;
    }

    if (input[cursor] === ">") {
      cursor--;
      if (input[cursor] === "/") {
        voidElement = openTag.slice(0, -1);
        IS_VOID_ELEMENT = true;
      }
      cursor++;
      break;
    } else if (input[cursor] === "<") {
      throw new TypeError(LESSER_THAN_SIGN_DUPLICATED);
    } else if (input[cursor] === undefined) {
      throw new TypeError(START_TAG_EMPTY_OR_NOT_CLOSED);
    } else {
      cursor++;
      while (input[cursor] !== ">" && input[cursor] !== undefined) {
        FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG += input[cursor];
        cursor++;
      }
      if (input[cursor] === undefined) {
        throw new TypeError(START_TAG_EMPTY_OR_NOT_CLOSED);
      } else {
        cursor--;
        if (input[cursor] === "/") {
          voidElement = openTag;
          IS_VOID_ELEMENT = true;
        }
        cursor++;
      }
    }
  }

  if (FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG !== "") {
    if (IS_VOID_ELEMENT) {
      let FOR_VOID_ELEMENT = FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG.slice(0, -1);

      attrs = tokenize_attrs({
        FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG: FOR_VOID_ELEMENT,
        attrs
      });
    } else {
      attrs = tokenize_attrs({ FULL_STRING_OF_ALL_ATTRS_WITHIN_TAG, attrs });
    }
  }

  if (IS_VOID_ELEMENT) {
    tokens.push({ voidElement, attrs });
  } else {
    tokens.push({ openTag, attrs });
  }

  cursor++;
  return cursor;
};
