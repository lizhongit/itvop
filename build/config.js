let path = require('path')
let srcPath = './src'

let f = (new Date()).getFullYear() - 2011

module.exports = {
  TOP_AD_TEXT: '11.11狂欢 - 领取阿里云5折优惠券',
  TOP_AD_LINK: 'https://www.aliyun.com/1111/2019/group-buying-share?ptCode=50F42EFBE38737F7B87AA3988DA26E39647C88CF896EF535&userCode=qvfav0tc&share_source=copy_link',
  BRAND_TEXT: 'Hot For Coding',
  TITLE: 'Nicholas Lee',
  DESCRIPTION: `Hi，这是一个专注编程技术的个人日志，从事研发${f}+年，这里记录工作学习中遇到的技术问题与解决方式`,
  DESCRIPTION_LENG: 300,
  KEYWORDS: 'Rust,Electron,Web,TypeScript,JavaScript,Python,Golang,NodeJS',
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