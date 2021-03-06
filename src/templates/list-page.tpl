<!DOCTYPE html>
<html>
  <head>
    {{> header }}
  </head>
  <body>
    <div class="app">
      <div class="app-header">
        <div class="app-nav">
          <a class="app-logo" href="{{ host_link }}">
            <img class="app-logo-image" src="/images/logo.png" />
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

        <div class="app-container">
          <div class="app-article-list">{{{ articles }}}</div>
          <div class="app-page">{{{ pages }}}</div>
        </div>
        
        <div class="app-side">
          <div class="app-side-item">
            <div class="app-side-title">Archives</div>
            <div class="app-side-list">
              {{{ archive }}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="app-footer">
      {{> footer }}
    </div>

  </body>
</html>