'use strict';

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');

const meta = require('./metadata.json');

Metalsmith(__dirname)
  .metadata(meta)                   // Pass our 'metadata' along the build chain.
  .source('./src')
  .destination('./build')
  .clean(true)                      // Clean destination directory before new build?
  .use(markdown())                  // Use the markdown source file format.
  .use(layouts({                    // Use the handlebars templating engine.
      engine: 'handlebars',
  }))
  .use(watch({                      // Rebuild static files on change (during development).
      paths: {
          'src/**/*': true,
          'layouts/**/*': '**/*.md',
      },
  }))
  .use(serve({                      // Serve generated static files (during development).
      port: 8080,
      verbose: true,
  }))
  .build((err) => {                 // Build the static files ;-).
      if (err) throw err;
      console.info('Build finished!');
  });
