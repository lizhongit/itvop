{{#each ./list}}
  {{#equal ../activeNumber this}}
  <a class="app-page-active" href="{{../key}}_{{this}}.html">{{this}}</a>
  {{else}}
  <a href="{{../key}}_{{this}}.html">{{ this }}</a>
  {{/equal}}
{{/each}}