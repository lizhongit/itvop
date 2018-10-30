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

    <title>{{ tagTitle }}</title>
    <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
    <style type="text/css">
    {{{ style }}}
    </style>
  </head>
  <body>
    <div class="app">
      <div class="app-header">
        <div class="app-nav">
          <a class="app-logo" href="/">
            <img class="app-logo-image" src="/images/logo.png" />
            <span class="app-logo-title">Nicholas Lee</span>      
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
          <div class="app-article-header">
            <div class="app-article-property">
              <div class="app-article-date">{{ date }}</div>
              <div class="app-article-tag">{{{ articleTag }}}</div>
            </div>
            <div class="app-article-title">{{ title }}</div>
          </div>

          <div class="app-line2"></div>

          <div class="app-article-content">
            {{{ article }}}
          </div>

          <div class="app-line1"></div>

          <div class="app-share">
            <!-- JiaThis Button BEGIN -->
            <div class="jiathis_style_32x32">
              <a class="jiathis_button_googleplus"></a>
              <a class="jiathis_button_twitter"></a>
              <a class="jiathis_button_pinterest"></a>
              <a class="jiathis_button_weixin"></a>
              <a class="jiathis_button_douban"></a>
              <a href="http://www.jiathis.com/share?uid=2157402" class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis" target="_blank"></a>
            </div>
            <!-- JiaThis Button END -->
          </div>

          <div class="app-article-notice">
            <p>Article title: <a href="{{ link }}">{{ title }}</a></p>
            <p>Article link: <a href="{{ link }}">http://www.qttc.net/{{ link }}</a></p>
            <p>Article forward: 转载本站文章请注明作者和出处</p>
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
            <div class="app-side-title">Recommand</div>
            <div class="app-side-list">
              {{{ recommend }}}
            </div>
          </div>

          <div class="app-side-item">
            <div class="app-side-title">Archivies</div>
            <div class="app-side-list">
              {{{ archive }}}
            </div>
          </div>

          <div class="app-side-item">
            <div class="app-side-title">Tags</div>
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

      <script type="text/javascript" >
        var jiathis_config={
          data_track_clickback:true,
          summary:'',
          shortUrl:false,
          hideMore:false
        }
      </script>

      <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=2157402" charset="utf-8"></script>      
  </body>
</html>