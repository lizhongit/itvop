let path = require('path')
let srcPath = './src'

let f = (new Date()).getFullYear() - 2011

module.exports = {
  TOP_AD_TEXT: 'Twitter',
  TOP_AD_LINK: 'https://twitter.com/lizhongit',
  BRAND_TEXT: 'Hot For Coding',
  TITLE: 'ITVOP',
  DESCRIPTION: `Hi, this is Nicholas Lee, this site is my personal blog, I'm a Full-Stack developer over ${f} years, I'd like to sharing more and more anything here.`,
  DESCRIPTION_LENG: 300,
  KEYWORDS: 'Rust,Electron,Web,TypeScript,JavaScript,Python,Golang,NodeJS,Kubernetes,Docker',
  TITLE_SEPARATOR: '-', 
  ARTICLES_PER_PAGE: 10,
  DIST_PATH: './docs',
  SRC_PATH: './src',
  INTRO_LENG: 300,
  ASSERTS_PATH: path.join(srcPath, 'asserts'),
  CSS_PATH: path.join(srcPath, 'css'),
  ARCHIVES_EXTENSION_NAME: 'md',
  ARCHIVES_NO_SEPARATOR: '_',
  ARCHIVES_PATH: path.join(srcPath, 'archives'),
  TEMPLATES_PATH: path.join(srcPath, 'templates'),
  URL_PREFIX: 'https://itvop.com',
  MAIN_HOST: 'itvop.com',
  TPL_LIST: 'list.tpl',
  TPL_PAGE: 'page.tpl',
  TPL_TAGS: 'tags.tpl',
  TPL_LISTPAGE: 'list-page.tpl',
  TPL_TITLELIST: 'title-list.tpl',
  TPL_ARTICLE: 'article.tpl',
  TPL_HEADER: 'header.tpl',
  TPL_FOOTER: 'footer.tpl',
  TPL_DISQUS: 'disqus.tpl',
  TPL_GOOGLE_ANALYTICS: 'google-analytics.tpl',
  TPL_RANDOM: 'random.tpl',
  TPL_NAV: 'nav.tpl',
  TPL_SINGLE: 'single.tpl'
}