import parseTag from 'tags'
import parseText from 'text'

import { BAD_HTML_HIERARCHY } from '../constants/errors'

export default (tokens) => {
  const stack = [{ children: [] }]
  let parent

  tokens.forEach((token) => {
    parent = stack[stack.length - 1]

    if (token.openTag) {
      const element = parseTag({ token })
      parent.children.push(element)
      stack.push(element)
    } else if (token.closeTag) {
      const startTagRef = stack.pop()
      if (startTagRef.tag !== token.closeTag) {
        throw new TypeError(BAD_HTML_HIERARCHY)
      }
    } else if (token.voidElement) {
      const element = parseTag({ token, IS_VOID: true })
      parent.children.push(element)
    } else {
      const element = parseText(token)
      parent.children.push(element)
    }
  })

  return parent
}
