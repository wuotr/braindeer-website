'use strict';

const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');
const layouts = require('metalsmith-layouts');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');

const devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production');

const meta = require('./metadata.json');

metalsmith(__dirname)
    .clean(!devBuild)                   // Clean destination directory before new build?
    .source('./src')
    .destination('./build')
    .metadata(meta)                     // Pass our 'metadata' along the build chain.
    .use(markdown())                    // Use the markdown source file format.
    .use(sass({                         // Use the sass source file format.
        outputDir: 'css/',
    }))
    .use(layouts({                      // Use the handlebars templating engine.
        engine: 'handlebars',
        directory: './templates/',
        default: 'home.html',
    }))
    .use(watch({                        // Rebuild static files on change (during development).
        paths: {
            './src/**/*': true,
            './templates/**/*': '**/*.md',
        },
    }))
    .use(serve({                        // Serve generated static files (during development).
        port: 8080,
        verbose: true,
    }))
    .build((err) => {                   // Build the static files ;-).
        if (err) throw err;
        console.info('Build finished!');
    });
