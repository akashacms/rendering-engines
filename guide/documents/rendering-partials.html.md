---
title: Rendering partial templates
layout: page-partials.html.njk
---

Before reading this, [read the overview on rendering](./rendering.html)

In that overview we included a layout template where it would be excellent if some of the code snippets were reusable between multiple layouts:

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

There is a section for rendering CSS stylesheet links, JavaScript links in both the header and page bottom, and a navigation sidebar.  In a large complex site there will likely be multiple layout templates, with lots of common elements in use across the site.

In other words, it's desirable to have code reuse between layout templates.  That's what partial templates support.

We've talked about partial templates, but have not shown how how to implement them.  This is a powerful tool for sharing code snippets from one page to another, or for dynamically computing the layout of some data.

Let's example how to implement support for partial templates.  By the bottom of this page that layout template will be much cleaner by using several partials.

## Partial template support in the Renderers package

The Renderers package supports two functions, `renderers.partial` and `renderers.partialSync`.  These functions are given a template file name, and a metadata structure, and locate the template, then call either `render` or `renderSync`.

The difference is, as the function names imply, to use synchronous operations or not.  Some execution contexts require synchronous execution, while others can deal with asynchronous.

There is a default implementation for these functions that works out of the box.  However, your application may require a custom implementation, such as a custom algorithm for finding partial templates.  For that purpose you can assign a custom function like so:his:

```js
renderers.partialFunc = 
    async (fname: string, metadata: any): Promise<string> => {
        // custom function code
    };
    
renderers.partialSyncFunc = 
    (fname: string, metadata: any): string => {
        // custom function code
    };
```

After making this assignment, the application-provided functions will be used instead of the default functions.

## Using partials from a typical template engine

Most of the template engines support invoking an function supplied by the application in the metadata.  Therefore, a simple way to use `partial` and `partialSync` from such a template engine is to assign functions to the metadata.

In GuideCMS, that is done as so:

```js
context.metadata.partial = async (fname, metadata) => {
    return renderers.partial(fname, metadata);
};
context.metadata.partialSync = (fname, metadata) => {
    return renderers.partialSync(fname, metadata);
};
```

In AkashaCMS, it is done roughly the same way.

Once this is set up in your application, a template can do this:

```html
<section class="col-2">
    {{ partialSync('sidebar.html') }}
</section>
```

This example uses Nunjucks syntax.  Of course each template engine has its own syntax for rendering values, and further each has its own behavior around this feature.  Finally, some of the template engines have built-in support for rendering templates that must be considered.

## Support for partial templates in every engine

The Renderers package tries to implement the same experience in every template engine.  However, this was not possible in regards to rendering partial template.  Additionally, Renderers provides configuration to accommodate template engines innate ability to render templates.

### Using partials in EJS templates

The EJS engine supports writing JavaScript code inside the template, and therefore can call application-provided functions, but those functions can only use synchronous execution.  Additionally it has a built-in function, `include`, that can render EJS templates.

```html
<%- partialSync('sidebar.html') %>
<%- partialSync('example.html.njk') %>
<%- partialSync('example.html.njk', {
    data: 'value'
}) %>
```

These examples show calling the `partialSync` function either with arguments, or without arguments.

```html
<%- include('sidebar.html') %>
<%- include('to-include.html.ejs') %>
<%- include('to-include.html.ejs', {
    data: 'value'
}) %>
```

These examples show the equivalent using `include`.  Note that `include` only supports EJS templates, while `partialSync` can use any supported template format.

For passing data, EJS has a `locals` variable which is the data provided to the template execution.  In this case we have instead constructed custom data objects.

### Using partials in LiquidJS templates

The LiquidJS engine does not support the `partial` or `partialSync` functions.  This means we cannot implement full `partialSync` support.

There is a built-in `render` function which supports either `.html` or `.liquid` templates.  This allows values to be passed.

```
{% render 'hello-world.html' %}
{% render 'example.html.liquid', message: 'Hello World' %}
```

### Using partials in Handlebars templates

The Handlebars engine does not support calling `partial` or `partialSync` functions.  It does have a syntax for partials, but that feature requires pre-registering each partial making it useless for use by the Renderers package.

To fix those two issues, the Renderers package implements a so-called _Helper_ to support calling `partialSync`.

```handlebars
{{partialSync template="showmessage.html.njk" message="non-block helper"}}
{{partialSync template='showtitle.html.ejs'}}
```

The `template` parameter must be given so that it is known which template to render.  Other data may be passed using the `varname=value` syntax.

```handlebars
{{partialSync template='hello-world.html'}}
```

We can also include a simple HTML file.

Handlebars also supports a "_block_" mode, where there is an opening and closing tag, and the content in-between is the partial body.

```handlebars
{{#partialSync template='partial-body.html.njk'}}
PARTIAL BODY
{{/partialSync}}

{{#partialSync template='partial-body.html.njk'}}
Before nested message {{#partialSync template="showmessage.html.njk" message="NESTED MESSAGE"}}
{{/partialSync}}
{{/partialSync}}
```

The body of the `partialSync` block is available to the template as `partialBody`.  THat means, `partial-body.html.njk` could be this:

```html
<strong id="strong">{{ partialBody }}</strong>
```

The syntax also supports nesting `partialSync` invocations.

### Using partials in Nunjucks templates

The Nunjucks engine supports calling an application-specified function.  It does not support executing asyncronous functions.  It provides its own `include` function.  Therefore, the result is that usage is very similar to what we discussed with EJS templates:

```html
{{ partialSync('sidebar.html') }}
{{ partialSync('example.html.ejs') }}
{{ partialSync('example.html.ejs', {
    data: 'value'
}) }}

{{ include('sidebar.html') }}
{{ include('to-include.html.ejs') }}
{{ include('to-include.html.ejs', {
    data: 'value'
}) }}
```


## Simplifying the page layout template shown at the top

After all that discussion, let's look at a concrete example:

```html
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ title | escape }}</title>
        {{ partialSync('stylesheets.html.njk', {
            stylesheets: stylesheets
        }) }}
        {{ partialSync('jshead.html.njk', {
            jshead: jshead
        }) }}
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
                    {{ partialSync('sidebar.html') }}
                </section>
            </div>
        </div>
        {% include 'jsbottom.njk' %}
        {% include 'hljs-init.html' %}
    </body>
</html>
```

This is a Nunjucks template with nearly identical functionality to the template at the top.  But it uses both `partialSync` and `include` as discussed earlier.  We added another template including a JavaScript snippet required by HighlightJS.

This is `stylesheets.html.njk`:

```html
{% for style in stylesheets %}
<link rel="stylesheet" type="text/css"
    href="{{ style | escape }}"/>
{% endfor %}
```

In testing it was found that, with Nunjucks, we have to explicitly pass any required data to the template.  This template has the same code as the original template.

This is `jshead.html.njk`:

```html
{% for js in jshead %}
<script src="{{ js | escape }}"></script>
{% endfor %}
```

The exact same is said here.

This is `sidebar.html`:

```html
<div class="btn-group-vertical" role="group"
            aria-label="Navigation sidebar">
    <a href="index.html" class="btn btn-primary">Overview</a>
    <a href="setup.html" class="btn btn-primary">Getting Started</a>
    <a href="rendering.html" class="btn btn-primary">Rendering</a>
    <a href="renderers.html" class="btn btn-primary">Renderers</a>
    <a href="configuration.html" class="btn btn-primary">Configuration</a>
    <a href="configuring-markdown.html" class="btn btn-primary">Configuring Markdown</a>
    <a href="guidecms.html" class="btn btn-primary">GuideCMS</a>
    <a href="api/index.html" class="btn btn-primary">API</a>
</div>
```

This uses Bootstrap v5 classes to make a nice-looking sidebar.

This is `jsbottom.njk`:

```html
{% for js in jsbottom %}
<script src="{{ js | escape }}"></script>
{% endfor %}
```

In this case the template used `include` rather than `partialSync`.  If `partialSync` had been used, the file name would have to be named with a double-extension.  Instead we could use a simple `.njk` file extension.

This is `hljs-init.html`:

```html
<script>
    try {
        hljs.initHighlightingOnLoad();
    } catch (err) { }
</script>
```

We're often given JavaScript blocks to add to a page, such as this.  This is allows us to easily use the same snippet on every page, while easily updating it if any changes are required.
