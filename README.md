# md-blog

A simple blogging system written in Markdown format, build a static HTML website. running on Nginx, Using DISQUS for comments

## feature

- Support tags
- Support archiving by date
- Support recommend
- Auto split less article chars for intro in all the list page
- Code highlight when build finished
- Using stylus for styles develop

## Create a article

All the article files put in folders "src/archives", Each article file name must be "number_title.md", like below list

- 1_Hello_World.md
- 2_How_to_using_MD_BLOG.md

Single page first char not a number, like below list

- About_me.md
- Contact.md

## Written

- Properties at first

```md
---
title: Hello world
date: 2018-02-28
tags: Welcome
recommend: true
---
```

- Article content

Writing by Markdown format, support table, code

## Build and deploy

It's so easy

```sh
npm run build
```

Will auto create a folder 'dist' in root, you just put it on Nginx finished the deploy
