const conf = require('./config')
const Handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')

let content = fs.readFileSync(path.join(conf.TEMPLATES_PATH, conf.TPL_PAGE), 'utf8')
let template = Handlebars.compile(content)

Handlebars.registerHelper('equal', function (v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

module.exports = (key, pages, activeNumber) => {
  let list = []
  for (let i = 1; i <= pages; i++) {
    list.push(i)
  }

  return template({
    key: key.toLowerCase(),
    list,
    activeNumber
  })
}