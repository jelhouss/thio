import tokenize from 'compiler/lexer/main'
import parse from 'compiler/parser/main'

export default (template) =>
  new Promise((resolve, reject) => {
    try {
      const tokens = tokenize(template.toLowerCase())
      const tree = parse([
        { openTag: 'ROOT', attrs: [] },
        ...tokens,
        { closeTag: 'ROOT' }
      ])
      resolve(tree)
    } catch (error) {
      reject(error)
    }
  })
