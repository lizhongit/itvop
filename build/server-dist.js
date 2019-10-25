let fs = require('fs')
let conf = require('./config')
let path = require('path')

module.exports = {
  watch: false,
  codeSync: false,
  injectChanges: false,
  port: 8000,
  files: ['./dist/**/*.{html,htm,css,js}'],
  browser: 'Google Chrome',
  server: {
    baseDir: conf.DIST_PATH
  }
}