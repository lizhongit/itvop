{{#each this}}
<div class="app-article app-article-intro">
  <div class="app-article-header">
    <div class="app-article-property">
      <div class="app-article-date">{{ properties.formatDate }}</div>
    </div>
    <div class="app-article-title">
      <a href="{{ link }}" title="{{ properties.title }}">{{ properties.title }}</a>
    </div>
  </div>

  <div class="app-line2"></div>

  <div class="app-article-content">
    {{{ introHTML }}}
    <p>...</p>
  </div>
  <div class="app-article-list-tools">
    <p class="app-article-link"><a href="{{ link }}" title="{{ properties.title }}">READ ALL</a></p>
  </div>
</div>
{{/each}}