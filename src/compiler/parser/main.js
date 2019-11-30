import parse_tag from "tags";
import parse_text from "text";

import { BAD_HTML_HIERARCHY } from "../constants/errors";

export default tokens => {
  let stack = [{ children: [] }];
  let parent;

  tokens.forEach(token => {
    parent = stack[stack.length - 1];

    if (token.openTag) {
      let element = parse_tag({ token });
      parent.children.push(element);
      stack.push(element);
    } else if (token.closeTag) {
      let startTagRef = stack.pop();
      if (startTagRef.tag !== token.closeTag) {
        throw new TypeError(BAD_HTML_HIERARCHY);
      }
    } else if (token.voidElement) {
      let element = parse_tag({ token, IS_VOID: true });
      parent.children.push(element);
    } else {
      let element = parse_text(token);
      parent.children.push(element);
    }
  });

  return parent;
};
