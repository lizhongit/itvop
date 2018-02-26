const conf = require('./config')
const Handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')

Handlebars.registerHelper('lowerCase', function (val) {
  return val.toLowerCase()
})

let content = fs.readFileSync(path.join(conf.TEMPLATES_PATH, conf.TPL_TAGS), 'utf8')
let template = Handlebars.compile(content)

module.exports = (list) => {
  return template(list)
}