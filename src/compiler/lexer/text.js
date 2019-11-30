export default ({ input, cursor, tokens }) => {
  let text = "";
  while (input[cursor] !== "<" && input[cursor] !== undefined) {
    text += input[cursor];
    cursor++;
  }
  tokens.push({ text });
  return cursor;
};
