module.exports = {
  include: [
    {
      src: '{{SRC}}/assets/',
      dest: '{{WWW}}/assets/'
    },
    {
      src: '{{SRC}}/index.html',
      dest: '{{WWW}}/index.html'
    },
    {
      src: '{{SRC}}/manifest.json',
      dest: '{{WWW}}/manifest.json'
    },
    {
      src: '{{SRC}}/service-worker.js',
      dest: '{{WWW}}/service-worker.js'
    },
    {
      src: 'node_modules/ionic-angular/polyfills/polyfills.js',
      dest: '{{BUILD}}/polyfills.js'
    },
    {
      src: 'node_modules/ionicons/dist/fonts/',
      dest: '{{WWW}}/assets/fonts/'
    },

    {
      src: 'node_modules/omh-web-visualizations/dist/omh-web-visualizations-all.min.css',
      dest: '{{WWW}}/assets/lib/omh-web-visualizations.min.css'
    },
    {
      src: 'node_modules/omh-web-visualizations/dist/omh-web-visualizations-all.min.js',
      dest: '{{WWW}}/assets/lib/omh-web-visualizations.min.js'
    },
    {
      src: 'node_modules/d3-tip/index.js',
      dest: '{{WWW}}/assets/lib/d3-tip.js'
    },
    {
      src: 'node_modules/d3/d3.min.js',
      dest: '{{WWW}}/assets/lib/d3.min.js'
    },
    {
      src: 'node_modules/moment/min/moment.min.js',
      dest: '{{WWW}}/assets/lib/moment.min.js'
    },
    {
      src: 'node_modules/plottable/plottable.min.js',
      dest: '{{WWW}}/assets/lib/plottable.min.js'
    },
    {
      src: 'node_modules/plottable/plottable.css',
      dest: '{{WWW}}/assets/lib/plottable.css'
    }

  ]
};
