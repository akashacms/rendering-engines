---
title: GuideCMS - the example static website generator
layout: page.html.njk
---

This documentation website is built using GuideCMS, a dirt simple static website generator built using `@akashacms/renderers` and `@akashacms/stacked-dirs`.  This tool was created to serve three purposes:

* Rendering the `@akashacms/renderers` documentation
* Providing real-world testing of `@akashacms/renderers`
* Show a working example of using `@akashacms/renderers`

If you really want to use GuideCMS the first steps would be to

1. Create a project directory - using `npm init -y`
2. Copy GuideCMS source files from https://github.com/akashacms/rendering-engines/tree/main/guidecms
3. Study the Guide sources at https://github.com/akashacms/rendering-engines/tree/main/guide

Steps after setting up the project directory is:

1. Create a `documents` directory, and write documents
2. Create a `layouts` directory, adding at least one page layout
3. If you need partials templates, add a `partials` directory
4. Create a configuration file
5. The `build` and `watch` scripts in the `guide` directory show how to render the website, and how to write page content while enjoying live preview

The result is a directory, `out`, containing the HTML/JS/CSS for a website.  You can upload this to any public webserver.  Using the `gh-pages` package in the NPM repository, the website can easily be published to Github Pages.

A tricky detail is that this documentation website is at: https://akashacms.github.io/rendering-engines/ -- This means we cannot be lazy and use absolute URLs.  Instead, all content files are located in the root directory, and all URLs are relative from the content file.

A complete blog post describing GuideCMS is at: https://akashacms.com/news/2022/09/renderers-package.html.md

