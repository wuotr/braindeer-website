'use strict';

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .clean(true)                   // clean destination directory before new build?
  .use(markdown())               // use the markdown source file format.
  .use(layouts({
      engine: 'handlebars',
  }))
  .build((err) => {
      if (err) throw err;
      console.info('Build finished!');
  });
