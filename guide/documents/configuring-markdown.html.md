---
title: Confuring Markdown
layout: page.html.njk
---

The Renderers package uses [markdown-it](https://www.npmjs.com/package/markdown-it), a CommonMark-compliant package for rendering Markdown to HTML.  It is a solid and capable Markdown package, that is also highly configurable, and supports a range of plugins.

The MarkdownRenderer class gives us access to configure the Markdown-IT package, and to install plugins.

In GuideCMS you will find this block of code:

```js
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
...

const rendererMarkdown = renderers.findRendererName('.html.md');

rendererMarkdown.configuration({
    html:         true,    // Enable html tags in source
    xhtmlOut:     false,   // Use '/' to close single tags (<br />)
    breaks:       false,   // Convert '\n' in paragraphs into <br>
    linkify:      true,    // Autoconvert url-like texts to links
    typographer:  false,   // Enable smartypants and other sweet transforms
})
.use(require('markdown-it-highlightjs'), { auto: true, code: true })
.use(require('markdown-it-expand-tabs'), { tabWidth: 4 });
```

First, we use the Node.js API to create a version of the `require` function that works within the ES6 context.  We need this because Markdown-IT plugins are loaded as CommonJS packages.

Next, we use `findRendererName` to retrieve the MarkdownRenderer instance.  To the `configuration` method we pass a Markdown-IT configuration object.

The `.use` method lets us install Markdown-IT plugins.  The first parameter is the package, loaded using `require`, and the second parameter is the options object for the plugin.   The `createRequire` function configures the package lookup to be sourced from the filesystem location of `guidecms.mjs`.  This is because of passing `import.meta.url` to the `createRequire` function.

The plugins used are [markdown-it-highlightjs](https://www.npmjs.com/package/markdown-it-highlightjs), which integrates the Highlight.JS package to do syntax highlighting.  The second, [markdown-it-expand-tabs](https://www.npmjs.com/package/markdown-it-expand-tabs), does some things with leading spaces in code blocks.

In the `guidecms` directory we ran these commands:

```
$ npm install markdown-it-highlightjs --save
$ npm install markdown-it-expand-tabs --save
```

This installs the two plugins in the correct location to be found by the GuideCMS code.

Next we need to make a couple changes to the configuration file, to load the CSS and JavaScript related to Highlight.JS.  It used to be that the required files were included in the `highlight.js` package on NPM, but that is no longer the case.  What we can do instead is to borrow some code from the Highlight.JS website, and download the CSS/JS files from their CDN.

For the configuration file used in GuideCMS, we can add this to the metadata:

```yaml

metadata:
    stylesheets:
        ...
        - https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/default.min.css
    jsbottom:
        ...
        - https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js
```

This will be picked up by `page.html.njk` and cause the correct `<link>` and `<script>` tags to be generated.  Another tag is required in the HTML to run the browser-side JavaScript:

```html
<script>
    try {
        hljs.initHighlightingOnLoad();
    } catch (err) { }
</script>
```

These steps result in two things.  First, Markdown-IT rendering on the server will include HTML classes for syntax highlighting.  Next, on the browser side the required code to make the syntax highlighting visible is executed.

