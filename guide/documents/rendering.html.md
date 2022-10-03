---
title: Rendering content
layout: page.html.njk
---

The `@akashacms/renderers` package renders content that you've already read into memory.  It does not support your application supplying a file name, reading the file, and rendering it.  Your application is responsible for reading the source file, and supplying the data to the rendering package.

The overall rendering process is:

* Your application locates the input file, and reads it into memory
* Your application asks the `@akashacms/renderers` package for the Renderer class for this type of input file
* Your application uses the Renderer class to parse the metadata, or perhaps your application parses the metadata itself
* Your application constructs a RenderingContext object
* Your application calls either `render` or `renderSync` method
* Your application does whatever it is supposed to do with the rendered data

Asking for the Renderer object:

```js
const renderer = renderers.findRenderPath(fspath);
```

Each Renderer class contains one or more regular expressions that match against the file system path for the input file.  For the built-in Renderers a dual file extension is used like `example.html.ejs`.  The `.ejs` portion says the Renderer supports EJS templates, and the `.html` portion says the input file will be converted to HTML.

The `findRenderPath` does not reach out to disk to check that the file exists.  It simply matches regular expressions against `fspath`.

To determine the file name for the rendered output:

```js
const fnOutput = renderer.filePath(fspath);
```

Using the file name pattern above, `example.html.ejs`, this function uses the regular expression to extract the `example.html` portion.

The `RenderingContext` type is defined this way:

```js
export type RenderingContext = {
    fspath?: string;   // Pathname that can be given to template engines for error messages
    content: string;   // Content to render
    body?: string;     // Content body after parsing frontmatter
    metadata: any;  // Data to be used for satisfying variables in templates
};
```
As you can see this is a simple object with sensible fields.  Typically your application will start this object as so:

```js
let context = {
    fspath: 'path/to/example.html.ejs',
    content: await fsp.readFile('path/to/example.html.ejs', 'utf-8')
}
```

The `fsp` name refers to what you get when importing `node:fs/promises` like this:

```js
import { promises as fsp } from 'fs';
import fs from 'fs';
```

This way `fsp` is clearly the promisified version of `fs`.

The Renderer instance includes a function, `parseMetadata` for parsing metadata, with each instance providing a function suitable for the type of input file.  For example the `LESSCSSRenderer.parseMetadata` does nothing since there is no usefulness to metadata in a CSS file.

```js
context = renderer.parseMetadata(context);
```

It takes a RenderingContext object, parses the metadata, assigning two results.  The `body` element contains the portion of `content` which does not include the metadata.  The `metadata` element is an object containing the data.

Most of the built-in Renderer instances support a _frontmatter_ block for storing metadata.

```html
---
title: Page title goes here
layout: layout-template-file-name.html.ejs
---

Input content body
```

The first portion, between `---` lines, is the frontmatter, and is in YAML format.  You can use the full panoply of YAML features, if desired.  The remainder of the file is what is assigned to the `body`, and the parsed form of the frontmatter block is assigned to `metadata`.

At this point your application is ready to render the content.  There are two methods, `render` and `renderSync`.  The latter is available for contexts requiring synchronous execution, and does not make any async calls.  The `render` method supports asynchronous execution and returns a `Promise` which resolves to the rendered content.

```js
const rendered = await renderer.render(context);
// OR
const rendered = renderer.renderSync(context);
```

## Complete example of rendering content

That was a lot of explanation, so let's look at a concrete example:

```js
const renderer = renderers.findRendererPath(fspath);
if (!renderer) {
    const copyTo = path.join(renderedOutput, fspath);
    console.log(`COPY ${fspath} to ${copyTo}`);
    await fsp.mkdir(path.dirname(copyTo), { recursive: true });
    await fsp.copyFile(fspath, copyTo);
    return;
}
let context = {
    fspath: fspath,
    content: await fsp.readFile(fspath, 'utf-8')
};
context = renderer.parseMetadata(context);
// console.log(`vpath ${fspath}`, context);
let rendered;
try {
    rendered = await renderer.render(context);
} catch (err) {
    throw new Error(`Failed to render ${fspath} because ${err}`);
}

const renderTo = path.join(renderedOutput, renderer.filePath(fspath));
await fsp.mkdir(path.dirname(renderTo), { recursive: true });
console.log(`RENDER ${fspath} ==> ${renderTo}`);
await fsp.writeFile(renderTo, rendered, 'utf-8');
```

In this example `fspath` is a file system path which can be read to get the content.  The variable `renderedOutput` is a file system path for the directory into which website content is rendered.

If no Renderer is found, then your application can consider this to be a file that requires no processing, and should be copied to the output directory.

Otherwise a `context` is created, `parseMetadata` called, and then the content is rendered.  Afterward an output file name, `renderTo` is constructed, and the rendered content is written to that file.

## Rendering content into a layout template

It is convenient to design a template for the page structure used on your site.  You can then take any rendered output, render it into the template, and your website will have a consistent page structure.

The package is designed to support two template directories:  `partials` and `layouts`.  For each you can have multiple directories, so that your project can bring together templates from multiple sources.  This was discussed [in the configuration section](configuration.html).

A simple way to specify the layout template is with a `layout` field in the frontmatter, as shown in the example above.

In the GuideCMS example code, you will find this function for rendering pages with a layout template:

```js

async function render(info) {

    // Read file content
    // Find the renderer
    // Ask the renderer to parse metadata
    // render content
    // If the metadata includes a layout
    //     read the layout file
    //     duplicate the previous metadata
    //     add rendered content to new metadata
    //     render
    // Write rendered content to a file 
    // whose name is computed from input file

    const renderer = renderers.findRendererPath(info.vpath);
    if (!renderer) {
        const copyTo = path.join(renderedOutput, info.vpath);
        console.log(`COPY ${info.vpath} to ${copyTo}`);
        await fsp.mkdir(path.dirname(copyTo), { recursive: true });
        await fsp.copyFile(info.fspath, copyTo);
        return;
    }
    let context = {
        fspath: info.fspath,
        content: await fsp.readFile(info.fspath, 'utf-8')
    };
    context = renderer.parseMetadata(context);
    if (context.metadata) {
        context.metadata = copyMetadataProperties(context.metadata, metadata);
    }
    // console.log(`vpath ${info.vpath}`, context);
    let rendered;
    try {
        rendered = await renderer.render(context);
    } catch (err) {
        throw new Error(`Failed to render ${info.vpath} because ${err}`);
    }

    // console.log(`rendered`, rendered);

    let layoutRendered;
    if (!context.metadata || !context.metadata.layout) {
        layoutRendered = rendered;
    } else {
        const layoutFN = await renderers.findLayout(context.metadata.layout);
        let layoutContext = {
            fspath: layoutFN,
            content: await fsp.readFile(layoutFN, 'utf-8'),
            metadata: copyMetadataProperties({}, context.metadata)
        };
        layoutContext.metadata = copyMetadataProperties(
            layoutContext.metadata, metadata
        );
        delete layoutContext.metadata.layout;
        layoutContext.metadata.content = rendered;
        const layoutRenderer = renderers.findRendererPath(layoutFN);
        // console.log(`layout context `, layoutContext);
        try {
            layoutRendered = await layoutRenderer.render(layoutContext);
        } catch (err) {
            throw new Error(`Failed to render ${layoutFN} with ${info.vpath} because ${err}`);
        }
    }
    
    const renderTo = path.join(renderedOutput, renderer.filePath(info.vpath));
    await fsp.mkdir(path.dirname(renderTo), { recursive: true });
    console.log(`RENDER ${info.vpath} ==> ${renderTo}`);
    await fsp.writeFile(renderTo, layoutRendered, 'utf-8');
}
```

The `info` object contains several fields describing the file.  The `vpath` field is a virtual pathname that is not guaranteed to refer to a file on the filesystem.  The `fspath` field is a concrete pathname, that is guaranteed to refer to an actual file.

The code is largely the same as what was shown earlier for simple rendering.  There is an added section if `context.metadata` contains `context.metadata.layout`.  That field is taken to be the filename of a layout template.

Layout templates are found using the `findLayout` method.  This method searches the layout directories for a matching template.

The `copyMetadataProperties` supports the possibility of a global metadata object.  Your project might want some metadata to be available on every page.  This function makes a duplicate of an existing object, then applies whatever fields are in the second object.

For the layout template rendering, the code first duplicates the data in `context.metadata`.  It then applies the data in the global metadata object.  It then removes any `layout` object in the resulting object.  Finally, `layoutContext.metadata.content` is assigned from the `rendered` data from the first stage.  That means the template should incorporate this `content` value wherever the rendered content should appear.

This is an abbreviated version of the `page.html.njk` layout template that was used for rendering this page you're reading.  By its file extension the template is in Nunjucks format:

```html
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ title | escape }}</title>
        {% for style in stylesheets %}
        <link rel="stylesheet" type="text/css" href="{{ style | escape }}"/>
        {% endfor %}
        {% for js in jshead %}
        <script src="{{ js | escape }}"></script>
        {% endfor %}
    </head>
    <body>
        <head class="container-fluid">
        <h1>{{ title | escape }}</h1>
        </head>
        <div class="container-md">
            <div class="row">
                <article class="col">
                    {{ content }}
                </article>
                <section class="col-2">
                    <!-- Navigation sidebar goes here -->
                </section>
            </div>
        </div>
        {% for js in jsbottom %}
        <script src="{{ js | escape }}"></script>
        {% endfor %}
    </body>
</html>
```

In this case the global metadata is expected to contain three arrays, `stylesheets`, `jshead` and `jsbottom`.  These contain URLs or pathnames for CSS or JavaScript files that you wish to be included in the HTML of your website.  Also, this example uses Bootstrap v5 classes to handle layout.




