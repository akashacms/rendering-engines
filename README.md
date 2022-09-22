# Renderers - Consolidated support for multiple website content rendering tools in Node.js

The `@akashacms/renderers` package can be used by any software, and does not have known dependencies on other AkashaCMS packages.  It was designed for use by AkashaCMS, but also designed to be potentially usable by any other software.

The purpose is to present a harmonized interface to any package whose purpose is rendering files used in website construction.  These packages fall into three categories:

* Template rendering engines like EJS, Handlebars or Nunjucks
* CSS rendering using LESS
* Document rendering using Markdown or AsciiDoctor

## Installation

```
$ npm install @akashacms/renderers --save
```

In your source code add this:

```js
// CommonJS modules
const Renderers = require('@akashacms/renderers');
// ES6 modules
import {
    Configuration as RenderersConfiguration
} from '@akashacms/renderers';
```

The `Configuration` class handles configuration and organizing access to the rendering packages.  For CommonJS modules imported as shown here, this class is referenced as `Renderers.Configuration`.

```js
import {
    Configuration as RenderersConfiguration,
    Renderer
} from '@akashacms/renderers';
```

The `Renderer` class is how we encapsulate the rendering packages.  Each encapsulated package has a matching Renderer class that interfaces with the package.

## Usage

The model is that a file to be rendered has an input file name, and an output file name.  The input file is in a pre-rendered format, such as Markdown, and the output file is in its rendered format, such as HTML.

The _Configuration_ automatically loads the Renderer implementations contained in the package.  It is easy to write your own Renderer and add them to the Configuration.

Suppose you have a content file to render.  It can be rendered with the following code:

```js
import { promises as fsp } from 'fs';

import {
    Configuration as RenderersConfiguration
} from '@akashacms/renderers';

const renderers = new RenderersConfiguration({
    // possible configuration options
});

const inputFN = '/path/to/input.html.md';
const input = await fsp.readFile(inputFN, 'utf-8');
const renderer = renderers.findRendererPath(inputFN);
const renderContext = renderer.parseMetadata({
    fspath: inputFN,
    content: input
});
// parseMetadata looks for frontmatter, and will
// modify the renderingContext to have two new fields.
// `body` will have the main body of the input
// `metadata` will have the frontmatter as an object

const rendered = await renderer.render(renderContext);

// ...
const outputFN = renderer.filePath(inputFN);
fsp.writeFile(outputFN, rendered, 'utf-8');
```

The `findRendererPath` method searches the available Renderers for one which will handle the path.  Each Renderer has a `match` method which is used for matching file names.

The double extension, `.html.md`, is meant to convey that the input is Markdown and the output is HTML.

The `parseMetadata` method will examine a file to access any metadata values.  For the Markdown renderer, and most other renderers, this turns into looking for a frontmatter block that is formatted in YAML.

The `render` method renders the content and metadata in the `RenderingContext` object.  It produces an output formatted as per the renderer.

The output file name is computed by the Renderer using the `filePath` method.

You may want to render the Markdown file into a layout template.  If so, change the final bit to this:

```js
const layoutMetadata = {};
for (const yprop in renderContext.metadata) {
    layoutMetadata[yprop] = renderContext.metadata[yprop];
}
layoutMetadata.content = rendered;

const layoutFN = '/path/to/layouts/example.html.ejs';
const layout = await fsp.readFile(layoutFN, 'utf-8');
const layoutRenderer = renderers.findRendererPath(layoutFN);
const layoutRendered = layoutRenderer.render({
    fspath: layoutFN,
    content: layout,
    metadata: layoutMetadata
});
const outputFN = renderer.filePath(inputFN);
fsp.writeFile(outputFN, layoutRendered, 'utf-8');
```

This example uses an EJS formatted template.  This follows roughly the same pattern as above.

It starts by finding the renderer for the layout template using `findRendererPath`.

In this case we assume the template does not contain any metadata values.  Your application might want to support metadata in the layout template, in which case you can call `parseMetadata`.

The layout template should receive all metadata values.  This allows those values to be substituted into the template.  The example shows us computing the metadata from the values found in the original document.  To that we add a value, `content`, which is the rendered output from the first stage.

## Supported rendering engines

The supported engines are:

Name | Extension | Description
-----|-----------|------------
AsciiDoc | `.html.adoc` | Supports AsciiDoctor documents
Markdown | `.html.md`   | Supports Markdown documents
LESS     | `.css.less`  | Supports compiling LESS files to CSS
EJS      | `.html.ejs`  | EJS
Handlebars | `.html.handlebars` | Handlebars
JSON     | `.html.json` | Supports rendering a JSON document through a template to produce HTML
Liquid   | `.html.liquid` | LiquidJS
Nunjucks | `.html.njk`  | Nunjucks

