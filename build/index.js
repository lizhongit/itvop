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

const monthFullsName = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
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
        return `<pre class="hljs"><code class="${lang}">${hljs.highlight(lang, str, true).value}</code></pre>`
      } catch (e) {
        console.error(e);
      }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

const getHighlightCss = () => {
  return fs.readFileSync(path.join(`${__dirname}/../node_modules/highlight.js/styles/github.css`), 'utf8')
}

const intro = (str) => {
  const list = str.split('\n')
  const preReg = /^```(.*)/im
  const arr = []

  let isInPre = false
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

const formatDate = (txt) => {
  const arr = txt.split('-')
  return `${monthFullsName[arr[1]]} ${arr[2]}, ${arr[0]}`
};

const colorMap = {}

// const prehandleTags = (str) => {
//   let list = []

//   str.trim().split(' ').forEach(tag => {
//     if (tag) {
//       let color = colorMap[tag]
//       if (!color) {
//         color = randColor()
//         colorMap[tag] = color
//       }
//       list.push({
//         tagName: tag,
//         color
//       })
//     }
//   })

//   return list
// }

const cleanCss = new CleanCSS()
const cssText = fs.readFileSync(path.join(conf.CSS_PATH, 'app.stylus'), 'utf8')
const style = [cleanCss.minify(stylus.render(cssText)).styles, cleanCss.minify(getHighlightCss()).styles].join('\n')

const files = fs.readdirSync(conf.ARCHIVES_PATH)
const list = []
const recommendList = []
const archiveMap = {}
const tagMap = {}
const arr = []
const arr1 = files.filter(fileName => {
  // console.log(fileName, Number(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0]) >= 1)
  return fileName.indexOf(conf.ARCHIVES_NO_SEPARATOR) >= 1 && fileName.split('.')[1] === conf.ARCHIVES_EXTENSION_NAME && parseInt(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0]) >= 1
})

const len = arr1.length

arr1.forEach(f => {
  arr[len - f.split(conf.ARCHIVES_NO_SEPARATOR)[0]] = f
})

arr.forEach(fileName => {
  const content = fs.readFileSync(path.join(conf.ARCHIVES_PATH, fileName), 'utf8')
  const reg = /\-\-\-(([\s\S])*?)\-\-\-/gim

  const result = reg.exec(content)
  if (result) {
    const reg1 = /\-\-\-/gim
    let i = reg1.exec(content)
    i = reg1.exec(content)
    // console.log(i)
    const properties = {}

    result[1].split('\n').forEach(item => {
      const index = item.indexOf(':')

      if (index >= 1) {
        const key = item.substring(0, index).trim()
        const value = item.substring(index + 1, 10000).trim()

        if (key === 'tags') {
          // properties[key] = prehandleTags(value)
        } else if (key === 'recommend') {
          properties[key] = value === 'true'
        } else if (key === 'date')  {
          properties[key] = value
          properties.formatDate = formatDate(value);
        } else {
          properties[key] = value
        }
      }
    })

    const map = {
      properties,
      title: properties.title,
      content: content.substr(i.index + 3),
      introHTML: md.render(intro(content.substr(i.index + 3))),
      html: md.render(content.substr(i.index + 3)),
      link: `${conf.URL_PREFIX}/${fileName.split('.')[0].replace(/[ ]/g, '_').toLowerCase()}.html`,
      path: `${fileName.split('.')[0].replace(/[ ]/g, '_').toLowerCase()}.html`,
      // tagsHTML: createTagsHTML(properties.tags),
      fileName
    }

    list.push(map)
    if (properties.recommend) {
      recommendList.push(map)
    }

    const tmp = properties.date.split('-')
    const month = Number(tmp[1])
    const key = `${tmp[0]}${month >= 10 ? month : '0' + String(month)}`

    if (!archiveMap[key]) {
      archiveMap[key] = []
    }

    archiveMap[key].push(map)

    // properties.tags.forEach(item => {
    //   let t = item.tagName
    //   if (!Array.isArray(tagMap[t])) {
    //     tagMap[t] = []
    //   }

    //   tagMap[t].push(map)
    // })
    // archives
  } else {
    console.error(`Error: ${path.join(conf.ARCHIVES_PATH, fileName)} can't parse!`)
  }
})

const archiveList = Object.keys(archiveMap)
    .sort((v1, v2) => {
      return v1 === v2 ? 1 : Number(v2) - Number(v1)
    })
    .map(key => {
      const o = archiveMap[key]
      const year = key.substring(0, 4)
      const month = monthName[key.substr(4)]
      return {
        title: `${month}, ${year} (${o.length})`,
        link: `${conf.URL_PREFIX}/archive_${month.toLowerCase()}_${year}_1.html`,
        path: `archive_${month.toLowerCase()}_${year}_1.html`,
      }
    })

// let tagList = Object.keys(tagMap)
//   .sort((v1, v2) => tagMap[v2].length - tagMap[v1].length)
//   .splice(0, 10)
//   .map(key => {
//   return {
//     title: `${key} (${ tagMap[key].length })`,
//     link: `tag_${key.toLowerCase()}_1.html`
//   }
// })

const singles = files.filter(fileName => {
  // console.log(fileName, Number(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0]) >= 1)
  return fileName.split('.')[1] === conf.ARCHIVES_EXTENSION_NAME && isNaN(fileName.split(conf.ARCHIVES_NO_SEPARATOR)[0])
})


const navHTML = createNavHTML(singles.map(fileName => {
  const title = fileName.split('.')[0]

  return {
    link: `${conf.URL_PREFIX}/${title.replace(/[ ]/img, '_').toLowerCase()}.html`,
    path: `${title.replace(/[ ]/img, '_').toLowerCase()}.html`,
    title: title.replace(/_/img, ' ')
  }
}))

// console.log(archiveList)

// let tagHTML = createTitleListHTML(tagList)
const archiveHTML = createTitleListHTML(archiveList)
// const recommendHTML = createTitleListHTML(recommendList)

const createListPage = (list, prefix) => {
  let page = 0
  let temp = []
  
  let pages = Math.ceil(list.length / conf.ARTICLES_PER_PAGE)
  
  list.forEach((item, index) => {
    temp.push(item)
  
    if ((index + 1) % conf.ARTICLES_PER_PAGE === 0 || index === list.length - 1) {
      ++page
      const listHtml = createListHTML(temp)
      const pageHtml = createPageHTML(`${conf.URL_PREFIX}/${prefix}`, pages, page)
      let title = [prefix.replace(/_/gm, ` ${conf.TITLE_SEPARATOR} `), `Page ${page}`, conf.TITLE].join(` ${conf.TITLE_SEPARATOR} `)

      if (prefix === 'page') {
        title = page === 1 ? conf.TITLE : [`Page ${page}`, conf.TITLE].join(` ${conf.TITLE_SEPARATOR} `)
      }
  
      temp = []
      const html = createListPageHTML({
        top_ad_text: conf.TOP_AD_TEXT,
        top_ad_link: conf.TOP_AD_LINK,
        brand_text: conf.BRAND_TEXT,
        nav: navHTML,
        keywords: conf.KEYWORDS,
        description: conf.DESCRIPTION,
        // tag: tagHTML,
        archive: archiveHTML,
        // recommend: recommendHTML,
        articles: listHtml,
        pages: pageHtml,
        host_link: conf.URL_PREFIX,
        style,
        title,
      })
      fs.writeFileSync(path.join(conf.DIST_PATH, `${prefix.toLowerCase()}_${page}.html`), html, 'utf8')
      if (page === 1 && prefix === 'page') {
        fs.writeFileSync(path.join(conf.DIST_PATH, `index.html`), html, 'utf8')
      }
    }
  })
}

createListPage(list, 'page')

Object.keys(archiveMap).forEach(key => {
  const year = key.substring(0, 4)
  const month = monthName[key.substr(4)]
  createListPage(archiveMap[key], `archive_${month}_${year}`)
})

// Object.keys(tagMap).forEach(key => {
//   createListPage(tagMap[key], `tag_${key}`)
// })

list.forEach((item, index) => {
  const d = item.properties.date.split('-')
  
  const tmp = []
  for (let i = 0; i < list.length; i++) {
    if (i !== index) {
      tmp.push(i)      
    }
  }

  shuffle(tmp)
  const start = randInt(0, tmp.length - 2)
  const randomList = [list[tmp[start]], list[tmp[start + 1]]]

  const randomHTML = createRandomHTML(randomList)

  const articleHtml = createArticlePageHTML({
    top_ad_text: conf.TOP_AD_TEXT,
    top_ad_link: conf.TOP_AD_LINK,
    brand_text: conf.BRAND_TEXT,
    host_link: conf.URL_PREFIX,
    nav: navHTML,
    random: randomHTML,
    // keywords: item.properties.tags.map(item => item.tagName).join(','),
    description: description(item.content),
    date: item.properties.date,
    formatDate: item.properties.formatDate,
    style,
    tagTitle: [item.title, conf.TITLE].join(` ${conf.TITLE_SEPARATOR} `),
    title: item.title,
    link: item.link,
    articleTag: item.tagsHTML,
    article: item.html,
    // tag: tagHTML,
    archive: archiveHTML,
    // recommend: recommendHTML
  })
  fs.writeFileSync(path.join(conf.DIST_PATH, item.path), articleHtml, 'utf8')

  const id = Number(item.fileName.split('_')[0]);
  if (id <= 492) {
    fs.writeFileSync(path.join(conf.DIST_PATH, `${d[0]}${d[1]}${id}.html`), articleHtml, 'utf8')
  }
})

singles.forEach(fileName => {
  const f = `${fileName.split('.')[0].replace(/[ ]/img, '').toLowerCase()}.html`
  const text = fs.readFileSync(path.join(conf.ARCHIVES_PATH, fileName), 'utf8')

  const html = createSinglePageHTML({
    top_ad_text: conf.TOP_AD_TEXT,
    top_ad_link: conf.TOP_AD_LINK,
    brand_text: conf.BRAND_TEXT,
    nav: navHTML,
    host_link: conf.URL_PREFIX,
    keywords: conf.KEYWORDS,
    description: conf.DESCRIPTION,
    style,
    title: [fileName.split('.')[0], conf.TITLE].join(` ${conf.TITLE_SEPARATOR} `),
    article: md.render(text),
    // tag: tagHTML,
    archive: archiveHTML,
    // recommend: recommendHTML
  })

  fs.writeFileSync(path.join(conf.DIST_PATH, f), html, 'utf8')
})

fs.copyFileSync(path.join(conf.SRC_PATH, 'public/ads.txt'), path.join(conf.DIST_PATH, 'ads.txt'));
fs.copyFileSync(path.join(conf.SRC_PATH, 'public/404.html'), path.join(conf.DIST_PATH, '404.html'));
