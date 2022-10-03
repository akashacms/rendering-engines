---
title: Renderer classes
layout: page.html.njk
---

The Renderer is a base class from which one implement Renderer classes.  For example, EJSRenderer renders EJS files, MarkdownRenderer renders Markdown files, and both are subclasses of Renderer.

To create your own Renderer, you start by subclassing the Renderer class.  Doing so looks something like this:

```js
import { Renderer, parseFrontmatter } from '@akashacms/renderers';
...
export class ExampleRenderer extends Renderer {
    ...
}
```

You then fill in a few methods, and voila you have a Renderer implementation.  The methods are usually easy to code.  The `parseFrontmatter` function is made available for files which can store metadata as _frontmatter_ -- meaning a line of three dashes, a block of YAML data, and a closing line of three dashes.

The constructor method usually looks like this:

```js
constructor() {
    super(".html.example", /^(.*\.html)\.(example)$/);
}
```

The first parameter is the name for the Renderer, and typically the name will be the file extension it handles.  The second is a regular expression used in matching file names.

The pattern used in AkashaCMS, and carries over to `@akashacms/renderers`, is that input files have a double extension.  The last extension indicates the format of the output file, for example `.ejs` means it is an EJS template.  The next extension indicates the format of the output file.  So, `.html.ejs` means a Renderer which converts EJS files to HTML, and `.less.css` means a Renderer for converting LESS files to CSS.

The regular expression has sub-expressions allowing us to capture the first extension, and the output file name.  In other words, `example.html.ejs` would match as `[ 'example.html.ejs', 'example.html', '.ejs' ]`.

The `filePath` method in the Renderer class relies on this policy of structuring regular expressions in this way.  This function simply matches the regular expression against the input file name, then returns `matches[1]`.  Through the magic of judiciously constructed file names and regular expressions, that is the correct output file name.

Next, one implements the `render` and `renderSync` methods.  For these methods there must be some code which handles rendering that type of file.  For example, with EJSRenderer that is the `ejs` package, and with LESSCSSRenderer that is the `less` package.

The precise details of the rendering code is outside the scope of this conversation.  Suffice to say that there is likely to be a function which accepts a `string` as input, and produces a `string` as output.  That function may allow a metadata object.

```js
async render(context: RenderingContext): Promise<string> {
    return MODULE.render(
        context.body ? context.body : context.content,
        context.metadata);
}

renderSync(context: RenderingContext): string {
    return MODULE.renderSync(
        context.body ? context.body : context.content,
        context.metadata);
}
```

Some content rendering modules will only support asynchronous rendering.  If that's the case, then `renderSync` must instead throw an Error explaining it cannot be used in a synchronous context.

The `RenderingContext` type is defined this way:

```js
export type RenderingContext = {
    fspath?: string;   // Pathname that can be given to template engines for error messages
    content: string;   // Content to render
    body?: string;     // Content body after parsing frontmatter
    metadata: any;  // Data to be used for satisfying variables in templates
};
```

The `fspath` member is the filesystem path of the file.  Since Renderer classes do not read the file they are rendering, `fspath` is primarily used for error messages.

The `content` and `body` members contain the input content.  The `content` member contains the original content, and the `body` member contains the content left over after parsing metadata.  Typically, metadata is represented as frontmatter (described earlier) prepended to the front of the file, and the `body` is the part after the frontmatter.

The `metadata` member contains an object representing the data extracted from the file.

The Renderer class provides a default implementation of `parseMetadata` which does nothing.  Since we expect in most cases to represent metadata using frontmatter, the `parseFrontmatter` function is made available.  It parses the YAML text in the format described above.

The `parseMetadata` method which uses `parseFrontmatter` looks like this:

```js
parseMetadata(context: RenderingContext): RenderingContext {
    return parseFrontmatter(context);
}
```

Another function to implement is `renderFormat`, which indicates the format of the rendered output data.  The package provides an `enum` describing the available formats:

```js
export enum RenderingFormat {
    HTML = 'HTML',
    PHP  = 'PHP',
    JSON = 'JSON',
    CSS  = 'CSS',
    JS   = 'JS'
};
```

And a typical implementation looks like this:

```js
renderFormat(context: RenderingContext) {
    if (!this.match(context.fspath)) {
        throw new Error(`ExampleRenderer does not render files with this extension ${context.fspath}`);
    }
    return RenderingFormat.HTML;
}
```

This inspects the `fspath` to see if it matches the file extensions supported by this Renderer.  If not, the code calling this function did something wrong.  In any case, for a Renderer that produces HTML, the `RenderingFormat.HTML` field is the correct value to return.

You may need to construct an _options_ object to supply to the rendering engine.  For example, NunjucksRenderer and EJSRenderer support a template command that loads and renders other templates.  If true, you will need to supply an array of directory names where the engine can find template files, or a function that searches for the templates.  How you do this depends on the rendering engine you're interfacing with.
