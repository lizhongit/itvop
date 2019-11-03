<!DOCTYPE html>
<html>
  <head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-151182268-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-151182268-1');
    </script>


    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <meta name="description" content="{{ description }}" />
    <meta http-equiv="X-UA-Compatible" content="edge" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="Content-Language" content="zh-CN" />
    <meta name="author" content="Nicholas Lee" />

    <title>{{ tagTitle }}</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
    <style type="text/css">
    {{{ style }}}
    </style>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-2124912095035737",
            enable_page_level_ads: true
      });
    </script>

  </head>
  <body>
    <div class="app">
      <div class="app-header">
        <div class="app-nav">
          <a class="app-logo" href="{{ host_link }}">
            <img class="app-logo-image" src="/images/logo.png" />
            <span class="app-logo-title">Nicholas Lee</span>      
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
          <div class="app-article-header">
            <div class="app-article-property">
              <div class="app-article-date">{{ formatDate }}</div>
            </div>
            <div class="app-article-title">{{ title }}</div>
          </div>

          <div class="app-line2"></div>

          <div class="app-article-content">
            {{{ article }}}
          </div>

          <div class="app-line1"></div>

          <div class="app-share">
          </div>

          <div class="app-article-notice">
            <p>TITLE: <a href="{{ link }}">{{ title }}</a></p>
            <p>LINK: <a href="{{ link }}">{{ link }}</a></p>
            <p>NOTE: 转载本站文章请注明作者和出处</p>
          </div>

          <div class="app-random">
            {{{ random }}}
          </div>

          <div class="app-line1"></div>
          
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
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://qttc.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
    </script>
  </body>
</html>