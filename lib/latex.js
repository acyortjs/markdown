const katex = require('katex')
const { unescapes } = require('./helper')

const regex = /(\${1,2})((?:\\.|[\s\S])*?)\1/

module.exports = (text) => {
  const block = regex.exec(text)
  if (block) {
    if (block[0] === '$$') {
      return `<p>${text}</p>`
    }

    const unescaped = unescapes(block[2])
    const math = katex.renderToString(unescaped)

    if (block[1] === '$' || block[0] === block.input) {
      return `<p>${text.replace(block[0], math)}</p>`
    }

    return `<p>${text.replace(block[0], `<div style="text-align:center">${math}</div>`)}</p>`
  }
  return `<p>${text}</p>`
}