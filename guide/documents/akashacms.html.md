---
title: What is AkashaCMS
layout: page-partials.html.njk
---

The `@akashacms/renderers` package is part of AkashaCMS.  You might be wondering, what is AkashaCMS?

[AkashaCMS](https://akashacms.com) is a static website generator that has been in use since 2014.  It is implemented in Node.js, and has a number of interesting and powerful features.

It has always contained a version of what is now `@akashacms/renderers`.  One of the founding ideas of AkashaCMS was to support several rendering engines behind a common API.  The _Consolidate_ package was an inspiration for this, but there was a vision for a differnet approach.

The features of AkashaCMS are:

* Rendering Markdown, AsciiDoctor, LESS, EJS, Handlebars, Nunjucks, LiquidJS files to website content
* Ability to bring multiple input directories into a virtual filespace
* Ability to be used for dynamic rebuilding of changed files, and supporting live reload using a 3rd party server
* Internal indexing of, and searching for, content files using a MongoDB-like API provided by LokiJS
* Server-side DOM processing using a jQuery-like API, provided by Mahabhuta and Cheerio
* Ability to be reconfigured for the XHTML output required by EPUB v3, and supporting bundling files for EPUB
* Ability to post content structured for EPUB onto a website

To learn more see https://akashacms.com
