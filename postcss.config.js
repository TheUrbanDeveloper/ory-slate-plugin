const postcssNested = require('postcss-nested')
const postcssImport = require('postcss-import');

module.exports = (ctx) => ({
  map: ctx.options.map,
  parser: ctx.options.parser,
  plugins: [
      require('postcss-nested'),
      require('postcss-import')
  ]
})
