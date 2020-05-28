export default ({ input, cursor, tokens }) => {
  while (
    input.slice(cursor, cursor + 3) !== '-->' &&
    input[cursor] !== undefined
  ) {
    // skip comments
    cursor++
  }
  if (input.slice(cursor, cursor + 3) === '-->') {
    cursor += 3
  }

  return cursor
}
