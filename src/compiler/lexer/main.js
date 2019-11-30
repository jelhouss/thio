import { tokenizeStartTag, tokenizeEndTag } from "tags";
import tokenizeText from "text";
import {
  LESSER_THAN_SIGN_DUPLICATED,
  UNKNOWN_TOKEN,
  START_TAG_EMPTY_OR_NOT_CLOSED
} from "../constants/errors";

export default input => {
  const TEMPLATE_LENGTH = input.length;
  const tokens = [];
  let cursor = 0;

  if (input[0] !== "<") {
    cursor = tokenizeText({ input, cursor, tokens });
  }

  while (cursor < TEMPLATE_LENGTH) {
    if (input[cursor] === "<") {
      cursor++;
      if (input[cursor] === undefined) {
        throw new TypeError(START_TAG_EMPTY_OR_NOT_CLOSED);
      } else if (/[a-z]/.test(input[cursor])) {
        cursor = tokenizeStartTag({ input, cursor, tokens });
      } else if (input[cursor] === "/") {
        cursor = tokenizeEndTag({ input, cursor, tokens });
      } else if (input[cursor] === "<") {
        throw new TypeError(LESSER_THAN_SIGN_DUPLICATED);
      } else {
        throw new TypeError(UNKNOWN_TOKEN);
      }
    } else {
      cursor = tokenizeText({ input, cursor, tokens });
    }
  }
  return tokens;
};
