let fs = require('fs')
let conf = require('./build/config')
let path = require('path')
let reg = /\/css\/[a-zA-Z0-9]+\.stylus/
let stylus = require('stylus')

let cssPreprocessor = (req, res, next) => {
  if (reg.test(req.url)) {
    let content = fs.readFileSync(path.join(conf.SRC_PATH, req.url), 'utf8')
    
    stylus.render(content, { filename: `${req.url.split('/').pop().split('.')[0]}.css` }, (err, css) => {
      if (err) {
        throw err
      }
      
      res.setHeader('Content-Type', 'text/css')      
      res.end(css)
    })
  } else {
    next()
  }
}

module.exports = {
  port: 8001,
  files: ['./src/**/*.{html,htm,css,js,stylus}'],
  browser: 'Google Chrome',
  server: {
    baseDir: conf.SRC_PATH,
    middleware: {
      1: cssPreprocessor
    }
  }
}