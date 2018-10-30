let path = require('path')
let srcPath = './src'

let f = (new Date()).getFullYear() - 2011

module.exports = {
  TITLE: 'Nicholas Lee - qttc.net',
  DESCRIPTION: `Hi，这是一个专注Web研发技术的个人博客，我从事WEB研发${f}+年，目前在一家小公司负责B/S架构的Web前端研发，博客记录平日工作中遇到的技术问题与解决方式。Be a crazy programer`,
  DESCRIPTION_LENG: 300,
  KEYWORDS: 'JavaScript,React,Vue,WebPack,Python,PHP,Golang,MySQL,GraphQL,NodeJS,D3js,ThreeJS',
  TITLE_SEPARATOR: '-', 
  ARTICLES_PER_PAGE: 10,
  DIST_PATH: './dist',
  SRC_PATH: './src',
  INTRO_LENG: 300,
  ASSERTS_PATH: path.join(srcPath, 'asserts'),
  CSS_PATH: path.join(srcPath, 'css'),
  ARCHIVES_EXTENSION_NAME: 'md',
  ARCHIVES_NO_SEPARATOR: '_',
  ARCHIVES_PATH: path.join(srcPath, 'archives'),
  TEMPLATES_PATH: path.join(srcPath, 'templates'),
  MAIN_HOST: 'qttc.net',
  TPL_LIST: 'list.tpl',
  TPL_PAGE: 'page.tpl',
  TPL_TAGS: 'tags.tpl',
  TPL_LISTPAGE: 'list-page.tpl',
  TPL_TITLELIST: 'title-list.tpl',
  TPL_ARTICLE: 'article.tpl',
  TPL_RANDOM: 'random.tpl',
  TPL_NAV: 'nav.tpl',
  TPL_SINGLE: 'single.tpl'
}