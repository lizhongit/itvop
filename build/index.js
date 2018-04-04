'use strict'

const fs = require('fs')
const path = require('path')
const conf = require('./config')
const createListHTML = require('./list')
const createPageHTML = require('./page')
const createListPageHTML = require('./list-page')
const createArticlePageHTML = require('./article')
const createSinglePageHTML = require('./single')
const createRandomHTML = require('./random')
const createTagsHTML = require('./tags')
const createNavHTML = require('./nav')
const createTitleListHTML = require('./title-list')
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const stylus = require('stylus')
const CleanCSS = require('clean-css');

const monthName = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}

if (fs.existsSync(conf.DIST_PATH)) {
  fs.rmdirSync(conf.DIST_PATH)
}

fs.mkdirSync(conf.DIST_PATH, '0755')

const shuffle = (a) => {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
}

const md = new MarkdownIt({
  highlight (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="${lang}">` +
              hljs.highlight(lang, str, true).value +
              '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

const getHighlightCss = () => {
  // let files = fs.readdirSync(conf.ASSERTS_PATH)
  // let fileName = ''
  // for (let i = 0; i < files.length; i++) {
  //   if (path.extname(files[i]) === '.css') {
  //     fileName = files[i]
  //     break
  //   }
  // }

  // if (fileName) {
  //   return fs.readFileSync(path.join(conf.ASSERTS_PATH, fileName), 'utf8')
  // } else {
  //   return ''
  // }  

  return fs.readFileSync(path.join(conf.ASSERTS_PATH, 'github.min.css'), 'utf8')
}

const intro = (str) => {
  let list = str.split('\n')
  let preReg = /^```(.*)/im
  let isInPre = false
  let arr = []
  let count = 0
  let total = 2
  let item = null
  let isStart = false
  let leng = 0
  for (let i = 0; i < list.length; i++) {
    item = list[i]

    if ((item === '' && arr.length >= 1) || item !== '') {
      arr.push(item)
      leng += item.length 
    }
    
    if (typeof item === 'string' && item[0] !== '#' && item !== '') {
      isStart = true

      if (preReg.test(item)) {
        isInPre = item.trim().length === 3 ? false : true
      }
    }

    if (item === '' && isStart && !isInPre) {
      isStart = false
      count++
    }

    if (count === total) {
      if (conf.INTRO_LENG - leng > conf.INTRO_LENG * 0.1) {
        total++
        continue
      }
      break
    }
  }
  // console.log(arr)
  return arr.join('\n')
}

const description = (str) => {
  let list = str.split('\n')
  let preReg = /^[(```)|](.*)/im
  let codeReg = /^```(.*)/im
  let arr = []
  let item = ''
  let isInPre = false

  for (let i = 0; i < list.length; i++) {
    item = list[i]

    if (codeReg.test(item)) {
      isInPre = item.trim().length === 3 ? false : true
    }

    if (!isInPre && item.length >= 5 && !preReg.test(item)) {
      arr.push(item.replace(/(`)*(##)*(!\[([\w|\s])*\]\([A-Z|a-z|0-9|\.|\/|\s|\"]*\))*/img, ''))
    }
  }
  // console.log(arr)
  return arr.join('').substr(0, conf.DESCRIPTION_LENG)
}

const randInt = (n, m) => {
  return Math.floor(Math.random() * (m - n + 1)) + n
}

const randColor = () => {
  return `rgb(${randInt(0, 200)}, ${randInt(0, 200)}, ${randInt(0, 200)})`
}

const colorMap = {}

const prehandleTags = (str) => {
  let list = []

  str.trim().split(' ').forEach(tag => {
    if (tag) {
      let color = colorMap[tag]
      if (!color) {
        color = randColor()
        colorMap[tag] = color
      }
      list.push({
        tagName: tag,
        color
      })
    }
  })

  return list
}

let cleanCss = new CleanCSS()
let cssText = fs.readFileSync(path.join(conf.CSS_PATH, 'app.stylus'), 'utf8')
let style = [cleanCss.minify(stylus.render(cssText)).styles, getHighlightCss()].join('\n')

let files = fs.readdirSync(conf.ARCHIVES_PATH)
let list = []
let recommendList = []
let archiveMap = {}
let tagMap = {}
let arr = []
let arr1 = files.filter(fileName => {
  // console.log(fileName, Number(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0]) >= 1)
  return fileName.indexOf(conf.ARCHIVES_NO_SEPARATOR) >= 1 && fileName.split('.')[1] === conf.ARCHIVES_EXTENSION_NAME && parseInt(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0]) >= 1
})

let len = arr1.length

arr1.forEach(f => {
  arr[len - f.split(conf.ARCHIVES_NO_SEPARATOR)[0]] = f
})

arr.forEach(fileName => {
  let content = fs.readFileSync(path.join(conf.ARCHIVES_PATH, fileName), 'utf8')
  let reg = /\-\-\-(([\s\S])*?)\-\-\-/gim

  let result = reg.exec(content)
  if (result) {
    let reg1 = /\-\-\-/gim
    let i = reg1.exec(content)
    i = reg1.exec(content)
    // console.log(i)
    let properties = {}

    result[1].split('\n').forEach(item => {
      let arr = item.split(':')
      if (arr.length === 2) {
        let key = arr[0].trim()
        if (key === 'tags') {
          properties[key] = prehandleTags(arr[1].trim())
        } else if (key === 'recommend') {
          properties[key] = arr[1].trim() === 'true'
        } else {
          properties[key] = arr[1].trim() 
        }
      }
    })

    let map = {
      properties,
      title: properties.title,
      content: content.substr(i.index + 3),
      introHTML: md.render(intro(content.substr(i.index + 3))),
      html: md.render(content.substr(i.index + 3)),
      link: `${fileName.split('.')[0].replace(/[ ]/g, '_').toLowerCase()}.html`,
      tagsHTML: createTagsHTML(properties.tags),
      fileName
    }

    list.push(map)
    if (properties.recommend) {
      recommendList.push(map)
    }

    let tmp = properties.date.split('-')
    let month = Number(tmp[1])
    let key = `${tmp[0]}${month >= 10 ? month : '0' + String(month)}`

    if (!archiveMap[key]) {
      archiveMap[key] = []
    }

    archiveMap[key].push(map)

    properties.tags.forEach(item => {
      let t = item.tagName
      if (!Array.isArray(tagMap[t])) {
        tagMap[t] = []
      }

      tagMap[t].push(map)
    })
    // archives
  } else {
    console.error(`Error: ${path.join(conf.ARCHIVES_PATH, fileName)} can't parse!`)
  }
})

let archiveList = Object.keys(archiveMap)
    .sort((v1, v2) => v1 < v2)
    .map(key => {
      let o = archiveMap[key]
      let year = key.substring(0, 4)
      let month = monthName[key.substr(4)]
      return {
        title: `${month}, ${year} (${o.length})`,
        link: `archive_${month.toLowerCase()}_${year}_1.html`
      }
    })

let tagList = Object.keys(tagMap)
  .sort((v1, v2) => tagMap[v1].length < tagMap[v2].length)
  .splice(0, 10)
  .map(key => {
  return {
    title: `${key} (${ tagMap[key].length })`,
    link: `tag_${key.toLowerCase()}_1.html`
  }
})

let singles = files.filter(fileName => {
  // console.log(fileName, Number(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0]) >= 1)
  return fileName.indexOf(conf.ARCHIVES_NO_SEPARATOR) >= 1 && fileName.split('.')[1] === conf.ARCHIVES_EXTENSION_NAME && isNaN(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0])
})


let navHTML = createNavHTML(singles.map(fileName => {
  let title = fileName.split('.')[0]

  return {
    link: `/${title.replace(/[ ]/img, '_').toLowerCase()}.html`,
    title: title.replace(/_/img, ' ')
  }
}))

// console.log(archiveList)

let tagHTML = createTitleListHTML(tagList)
let archiveHTML = createTitleListHTML(archiveList)
let recommendHTML = createTitleListHTML(recommendList)

let createListPage = (list, prefix) => {
  let page = 0
  let temp = []
  
  let pages = Math.ceil(list.length / conf.ARTICLES_PER_PAGE)
  
  list.forEach((item, index) => {
    temp.push(item)
  
    if ((index + 1) % conf.ARTICLES_PER_PAGE === 0 || index === list.length - 1) {
      ++page
      let listHtml = createListHTML(temp)
      let pageHtml = createPageHTML(prefix, pages, page)
      let title = ''
      if (prefix === 'index') {
        title = page === 1 ? conf.TITLE : [conf.TITLE, `Page ${page}`].join(` ${conf.TITLE_SEPARATOR} `)
      } else {
        title = [conf.TITLE, prefix.replace(/_/gm, ` ${conf.TITLE_SEPARATOR} `), `Page ${page}`].join(` ${conf.TITLE_SEPARATOR} `)
      }
  
      temp = []
      let html = createListPageHTML({
        nav: navHTML,
        keywords: conf.KEYWORDS,
        description: conf.DESCRIPTION,
        tag: tagHTML,
        archive: archiveHTML,
        recommend: recommendHTML,
        style,
        title,
        articles: listHtml,
        pages: pageHtml
      })
      fs.writeFileSync(path.join(conf.DIST_PATH, `${prefix.toLowerCase()}_${page}.html`), html, 'utf8')
      if (page === 1 && prefix === 'index') {
        fs.writeFileSync(path.join(conf.DIST_PATH, `${prefix.toLowerCase()}.html`), html, 'utf8')
      }
    }
  })
}

createListPage(list, 'index')

Object.keys(archiveMap).forEach(key => {
  let year = key.substring(0, 4)
  let month = monthName[key.substr(4)]
  createListPage(archiveMap[key], `archive_${month}_${year}`)
})

// Object.keys(tagMap).forEach(key => {
//   createListPage(tagMap[key], `tag_${key}`)
// })

list.forEach((item, index) => {
  let d = item.properties.date.split('-')
  
  let tmp = []
  for (let i = 0; i < list.length; i++) {
    if (i !== index) {
      tmp.push(i)      
    }
  }

  shuffle(tmp)
  let start = randInt(0, tmp.length - 2)
  let randomList = [list[tmp[start]], list[tmp[++start]]]

  let randomHTML = createRandomHTML(randomList)

  let articleHtml = createArticlePageHTML({
    nav: navHTML,
    random: randomHTML,
    keywords: item.properties.tags.map(item => item.tagName).join(','),
    description: description(item.content),
    date: item.properties.date,
    style,
    tagTitle: [item.title, conf.TITLE].join(` ${conf.TITLE_SEPARATOR} `),
    title: item.title,
    link: item.link,
    articleTag: item.tagsHTML,
    article: item.html,
    tag: tagHTML,
    archive: archiveHTML,
    recommend: recommendHTML
  })
  fs.writeFileSync(path.join(conf.DIST_PATH, item.link), articleHtml, 'utf8')
  fs.writeFileSync(path.join(conf.DIST_PATH, `${d[0]}${d[1]}${item.fileName.split('_')[0]}.html`), articleHtml, 'utf8')
})

singles.forEach(fileName => {
  let f = `${fileName.split('.')[0].replace(/[ ]/img, '').toLowerCase()}.html`
  let text = fs.readFileSync(path.join(conf.ARCHIVES_PATH, fileName), 'utf8')

  let html = createSinglePageHTML({
    nav: navHTML,
    keywords: conf.KEYWORDS,
    description: conf.DESCRIPTION,
    style,
    title: conf.TITLE,
    article: md.render(text),
    tag: tagHTML,
    archive: archiveHTML,
    recommend: recommendHTML
  })

  fs.writeFileSync(path.join(conf.DIST_PATH, f), html, 'utf8')
})
