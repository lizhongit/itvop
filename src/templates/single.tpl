<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <meta name="keywords" content="{{ keywords }}" />
    <meta name="description" content="{{ description }}" />
    <meta http-equiv="X-UA-Compatible" content="edge" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="Content-Language" content="zh-CN" />
    <meta name="author" content="Nicholas Lee" />

    <title>{{ title }}</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
    <style type="text/css">
    {{ style }}
    </style>
  </head>
  <body>
    <div class="app">
      <div class="app-header">
        <div class="app-nav">
          <a class="app-logo" href="/">
            <img class="app-logo-image" src="/images/logo.png" />
            <span class="app-logo-title">琼台博客</span>      
          </a>

          <div class="app-nav-menu">
            <a class="ad-link" target="_blank" href="https://www.vultr.com/?ref=7073914">A high performance and more than 15 locations VPS just only $2.5/Month</a>
            {{{ nav }}}
          </div>
        </div>

        <div class="app-brand">
          Be a crazy programer
        </div>
      </div>

      <div class="app-body">

        <div class="app-container app-article">
          <div class="app-article-content">
            {{{ article }}}
          </div>
          
          <div class="app-line2"></div>
          <div>
            <div id="disqus_thread"></div>
          </div>

        </div>
        
        <div class="app-side">
          <div class="app-side-item">
            <div class="app-side-title">Recommand</div>
            <div class="app-side-list">
              {{{ recommend }}}
            </div>
          </div>

          <div class="app-side-item">
            <div class="app-side-title">Archive</div>
            <div class="app-side-list">
              {{{ archive }}}
            </div>
          </div>

          <div class="app-side-item">
            <div class="app-side-title">Tag</div>
            <div class="app-side-list">
              {{{ tag }}}
            </div>
          </div>

        </div>
      </div>
    </div>

    <script>
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://qttc.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
    </script>    
  </body>
</html>