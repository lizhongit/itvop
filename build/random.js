const conf = require('./config')
const Handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')

let content = fs.readFileSync(path.join(conf.TEMPLATES_PATH, conf.TPL_RANDOM), 'utf8')
let template = Handlebars.compile(content)

module.exports = (list) => {
  return template(list)
}