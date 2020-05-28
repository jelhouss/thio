import { INVALID_HTML5_DOCTYPE_DECLARATION } from '../constants/errors'

export default ({ input, cursor, tokens }) => {
  const HTML_FIVE_DTD = 'html'
  let doctype = ''

  /**
   *
   * we skip the first space existed after "<!DOCTYPE"
   * e.g. <!DOCTYPE html>
   */
  cursor++

  while (input[cursor] !== '>' && input[cursor] !== undefined) {
    doctype += input[cursor]
    cursor++
  }
  if (input[cursor] === undefined || doctype !== HTML_FIVE_DTD) {
    throw new TypeError(INVALID_HTML5_DOCTYPE_DECLARATION)
  }

  cursor++
  return cursor
}
