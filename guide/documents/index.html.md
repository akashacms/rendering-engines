---
title: Renderers - Overview
layout: page.html.njk
date: September 28, 2022
---

The package `@akashacms/renderers` consolidates several packages for rendering files used for publishing websites.  The package supports a simple API for content rendering, and it interfaces with the API of each supported package.

This package was created to support [AkashaRender](https://github.com/akashacms/akasharender), the main component of AkashaCMS.  But, it was designed to support being used by any other application.

Supported rendering engines are:

<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Extension</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>AsciiDoc</td>
        <td><code>.html.adoc</code></td>
        <td>Supports AsciiDoctor documents</td>
    </tr>
    <tr>
        <td>Markdown</td>
        <td><code>.html.md</code></td>
        <td>Supports Markdown documents</td>
    </tr>
    <tr>
        <td>LESS</td>
        <td><code>.less.css</code></td>
        <td>Supports compiling LESS files to CSS</td>
    </tr>
    <tr>
        <td>EJS</td>
        <td><code>.html.ejs</code></td>
        <td>EJS</td>
    </tr>
    <tr>
        <td>Handlebars</td>
        <td><code>.html.handlebars</code></td>
        <td>Handlebars</td>
    </tr>
    <tr>
        <td>JSON</td>
        <td><code>.html.json</code></td>
        <td>Supports rendering a JSON document through a template to produce HTML</td>
    </tr>
    <tr>
        <td>Liquid</td>
        <td><code>.html.liquid</code></td>
        <td>LiquidJS</td>
    </tr>
    <tr>
        <td>Nunjucks</td>
        <td><code>.html.njk</code></td>
        <td>Nunjucks</td>
    </tr>
  </tbody>
</table>

The package source is at: https://github.com/akashacms/rendering-engines

The repository contains files for this website.  The website is rendered by GuideCMS, also in the repository, which is a simple static website generation tool.  Together they serve as a demonstration of using `@akashacms/renderers` in a real website project.  See:

* https://github.com/akashacms/rendering-engines/tree/main/guide
* https://github.com/akashacms/rendering-engines/tree/main/guidecms
