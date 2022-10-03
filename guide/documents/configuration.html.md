---
title: Configuring the Renderers package
layout: page.html.njk
date: September 28, 2022
---

The primary application interface to `@akashacms/renderers` is the `Renderers.Configuration` class.  It is used to find the correct Renderer instance for a given document, and to search for layout or partial templates.

This object is instantiated this way:

```js
import * as Renderers from '@akashacms/renderers';

const renderers = new Renderers.Configuration({
    // options object -- ConfigurationParams
});
```

The options object is defined by the `ConfigurationParams` type.  This is defined as so:

```js
export type ConfigurationParams = {
    partialDirs?: Array<string>;
    findPartial?: (fn) => Promise<string>;
    findPartialSync?: (fn) => string;
    layoutDirs?: Array<string>;
    findLayout?: (fn) => Promise<string>;
    findLayoutSync?: (fn) => string;

    partial?: (fn, metadata) => Promise<string>;
    partialSync?: (fn, metadata) => string;
};
```

The `partialDirs` and `layoutDirs` values are arrays containing paths for directories.  The `partialDirs` array is one or more directories containing partial templates, while the `layoutDirs` array is for layout templates.  In both cases, if a template is required, there will be a search among the named directories for a template of the given name.

There is also a method, `addPartialDir`, to add a directory to `partialDirs`, and `addLayoutDir` to add a directory to `layoutDirs`.  There are accessor methods `partialDirs`, and `layoutDirs`, to retrieve the current list of directories.

The `findPartial` and `findPartialSync` parameters specify functions to search for partial templates.  There are default functions in the package that do a simple search over the named directories.  Your application may want to supply your own search algorithm.  The `findLayout` and `findLayoutSync` parameters do the same, but for layout templates.  The `Sync` functions use only sycnhronous operations to search for templates, while the non-Sync versions are asynchronous and return a Promise.

The `partial` and `partialSync` parameters specify functions for rendering partial templates.  The `fn` parameter is the file name for the template, while the `metadata` parameter is the data to use during template rendering.  Default functions are supplied in the package.  However, your application may want to supply a different implementation.  The `Sync` function uses only synchronous operations.

To render a partial template, call either `partial` or `partialSync`.

Within the `@akashacms/renderers` package is the `Renderer` class, and several subclasses for the built-in Renderer implementations.  This class is the interface between the package and the supported rendering packages.  When the Configuration is instantiated, the built-in Renderer implementations are automatically added.

Your application may want to use other Renderers.  To do so, create a Renderer subclass, then call the `registerRenderer` method.

