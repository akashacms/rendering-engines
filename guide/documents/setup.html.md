---
title: Getting started with the Renderers package
layout: page.html.njk
date: September 28, 2022
---

The first step is to have a Node.js project, for example:

```
$ mkdir project
$ cd project
$ npm init -y
```

This sets up a blank directory with a default `package.json`.  Yarn can be used the same way, if you prefer that package manager.

Next you install the `@akashacms/renderers` package as so:

```
$ npm install @akashacms/renderers --save
```

Since the package is used solely by its API, you must have some code.  Somewhere in that code you must initialize the a Configuration object.  An example is:

```js
import * as Renderers from '@akashacms/renderers';

const renderers = new Renderers.Configuration({
    partialDirs: partialsDir ? [ partialsDir ] : undefined,
    layoutDirs: layoutsDir ? [ layoutsDir ] : undefined
});
```

The `renderers` object is then used to find and use Renderer instances, as well as to find files.
