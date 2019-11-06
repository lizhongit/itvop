<!DOCTYPE html>
<html>
  <head>

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <meta name="description" content="{{ description }}" />
    <meta http-equiv="X-UA-Compatible" content="edge" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="Content-Language" content="zh-CN" />
    <meta name="author" content="Nicholas Lee" />

    <title>{{ title }}</title>
    <style type="text/css">
    {{{ style }}}
    </style>
  </head>
  <body>
    <div class="app">
      <div class="app-header">
        <div class="app-nav">
          <a class="app-logo" href="{{ host_link }}">
            <span class="app-logo-title">ITVOP</span>      
          </a>

          <div class="app-nav-menu">
            <a class="ad-link" target="_blank" href="{{ top_ad_link }}">{{ top_ad_text }}</a>
            {{{ nav }}}
          </div>
        </div>

        <div class="app-brand">
          {{ brand_text }}
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
            <div class="app-side-title">Archivies</div>
            <div class="app-side-list">
              {{{ archive }}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      setTimeout(() => {
        var d = document, s = d.createElement('script');
        s.src = 'https://itvop.disqus.com/embed.js';
        s.async = true;
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      }, 500);
    </script>    
  </body>
</html>