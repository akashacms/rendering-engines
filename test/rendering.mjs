
import * as assert from 'node:assert';

import * as path from 'node:path';
import * as url from 'url';
import { promises as fsp } from 'fs';
import * as fs from 'fs';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Configuration } from '../dist/index.js';
// import { describe, it } from 'node:test';

const config = new Configuration({
    partialDirs: [ path.join(__dirname, 'partials1') ],
    layoutDirs:  [ path.join(__dirname, 'layouts1') ]
});

async function doRender(fn, metadata) {
    const docfn = path.join('documents', fn);
    const doc = await fsp.readFile(docfn, 'utf-8');
    const renderer = config.findRendererPath(fn);
    const rc = renderer.parseMetadata({
        fspath: docfn,
        content: doc,
    });
    if (!rc.metadata) rc.metadata = {};
    for (const yprop in metadata) {
        rc.metadata[yprop] = metadata[yprop];
    }

    rc.metadata.partial = async (fname, metadata) => {
        return config.partial(fname, metadata);
    };
    rc.metadata.partialSync = (fname, metadata) => {
        // console.log(`partialSync ${fname}`);
        const ret = config.partialSync(fname, metadata);
        // console.log(`partialSync ${fname} ==> ${ret}`);
        return ret;
    };
    return await renderer.render(rc);
}

function doRenderSync(fn, metadata) {
    const docfn = path.join('documents', fn);
    const doc = fs.readFileSync(docfn, 'utf-8');
    const renderer = config.findRendererPath(fn);
    const rc = renderer.parseMetadata({
        fspath: docfn,
        content: doc,
    });
    for (const yprop in metadata) {
        rc.metadata[yprop] = metadata[yprop];
    }
    rc.metadata.partial = async (fname, metadata) => {
        throw new Error(`partial ${fname} not allowed in sync context`);
    };
    rc.metadata.partialSync = (fname, metadata) => {
        // console.log(`partialSync ${fname}`);
        const ret = config.partialSync(fname, metadata);
        // console.log(`partialSync ${fname} ==> ${ret}`);
        return ret;
    };
    return renderer.renderSync(rc);
}

function parseMetadata(fn) {
    const docfn = path.join('documents', fn);
    const doc = fs.readFileSync(docfn, 'utf-8');
    const renderer = config.findRendererPath(fn);
    return renderer.parseMetadata({
        fspath: docfn,
        content: doc,
    });
}

describe('Rendering', function() {

describe('Markdown', function() {

    it('should render Markdown markdown-test.html.md', async function() {
        let rendered;
        try {
            rendered = await doRender('markdown-test.html.md', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /.*code class="language-bash".echo &\quot;hello, \${WORLD}\&quot;/);
        assert.match(rendered, /.*.code.how are you.*/)
    });

    it('should render Sync Markdown markdown-test.html.md', function() {
        let rendered;
        try {
            rendered = doRenderSync('markdown-test.html.md', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /.*code class="language-bash".echo &\quot;hello, \${WORLD}\&quot;/);
        assert.match(rendered, /.*.code.how are you.*/)
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.html.md';
        const renderer = config.findRenderer('.html.md');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'HTML');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.html.md');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should parse frontmatter', function() {
        const rc = parseMetadata('meta1.html.md');
        assert.ok(rc);
        assert.ok(rc.metadata);
        assert.ok(rc.body);
        assert.ok(rc.content);
        assert.equal(rc.metadata.title, 'Metadata test for Markdown');
        assert.equal(rc.metadata.layout, 'foo.html.ejs');
        assert.match(rc.fspath, /meta1.html.md$/);
        assert.match(rc.body, /Hello, World!/);
    });

    it('should render Markdown meta1.html.md', async function() {
        let rendered;
        try {
            rendered = await doRender('meta1.html.md', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /This is the body/);
        assert.match(rendered, /Hello, World/);
        assert.doesNotMatch(rendered, /Metadata test for Markdown/);
    });

    it('should render Markdown meta-empty.html.md', async function() {
        let rendered;
        try {
            rendered = await doRender('meta-empty.html.md', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.doesNotMatch(rendered, /title: Metadata test for Markdown/);
        assert.doesNotMatch(rendered, /layout: foo.html.ejs/);
        assert.doesNotMatch(rendered, /hello: world/);

    });

});

describe('AsciiDoctor', function() {

    it('should render AsciiDoctor asciidoctor-test.html.adoc', async function() {
        let rendered;
        try {
            rendered = await doRender('asciidoctor-test.html.adoc', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /.*\<p\>Preamble paragraph.\<\/p\>/);
        assert.match(rendered, /.*h3 id="id_section_a_subsection".Section A Subsection..h3.*/)
    });

    it('should render Sync AsciiDoctor asciidoctor-test.html.adoc', function() {
        let rendered;
        try {
            rendered = doRenderSync('asciidoctor-test.html.adoc', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /.*\<p\>Preamble paragraph.\<\/p\>/);
        assert.match(rendered, /.*h3 id="id_section_a_subsection".Section A Subsection..h3.*/)
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.html.adoc';
        const renderer = config.findRenderer('.html.adoc');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'HTML');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.html.adoc');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should parse frontmatter', function() {
        const rc = parseMetadata('meta1.html.adoc');
        assert.ok(rc);
        assert.ok(rc.metadata);
        assert.ok(rc.body);
        assert.ok(rc.content);
        assert.equal(rc.metadata.title, 'Metadata test for AsciiDoctor');
        assert.equal(rc.metadata.layout, 'foo.html.ejs');
        assert.match(rc.fspath, /meta1.html.adoc$/);
        assert.match(rc.body, /Hello, World!/);
    });

    it('should render AsciiDoctor meta1.html.adoc', async function() {
        let rendered;
        try {
            rendered = await doRender('meta1.html.adoc', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /This is the body/);
        assert.match(rendered, /Hello, World/);
        assert.doesNotMatch(rendered, /Metadata test for AsciiDoctor/);
    });

    it('should render Markdown meta-empty.html.adoc', async function() {
        let rendered;
        try {
            rendered = await doRender('meta-empty.html.adoc', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.doesNotMatch(rendered, /title: Metadata test for AsciiDoctor/);
        assert.doesNotMatch(rendered, /layout: foo.html.ejs/);
        assert.doesNotMatch(rendered, /hello: world/);

    });

});

describe('EJS', function() {

    it('should render EJS doc1.html.ejs', async function() {
        let rendered;
        try {
            rendered = await doRender('doc1.html.ejs', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
    });

    it('should render Sync EJS doc1.html.ejs', function() {
        let rendered;
        try {
            rendered = doRenderSync('doc1.html.ejs', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.html.ejs';
        const renderer = config.findRenderer('.html.ejs');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'HTML');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.html.ejs');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should parse frontmatter', function() {
        const rc = parseMetadata('meta1.html.ejs');
        assert.ok(rc);
        assert.ok(rc.metadata);
        assert.ok(rc.body);
        assert.ok(rc.content);
        assert.equal(rc.metadata.title, 'Metadata test for EJS');
        assert.equal(rc.metadata.layout, 'foo.html.ejs');
        assert.match(rc.fspath, /meta1.html.ejs$/);
        assert.match(rc.body, /<p>Hello, World!<\/p>/);
    });

    it('should render EJS meta1.html.ejs', async function() {
        let rendered;
        try {
            rendered = await doRender('meta1.html.ejs', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        // console.log(rendered);
        assert.ok(rendered);
        assert.match(rendered, /<h1>Metadata test for EJS<\/h1>/);
        assert.match(rendered, /message:.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<p>hello: world<\/p>/);
        assert.doesNotMatch(rendered, /layout\: foo.html.ejs/);
    });

    it('should render Sync EJS meta1.html.ejs', function() {
        let rendered;
        try {
            rendered = doRenderSync('meta1.html.ejs', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /<h1>Metadata test for EJS<\/h1>/);
        assert.match(rendered, /message:.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<p>hello: world<\/p>/);
        assert.doesNotMatch(rendered, /layout\: foo.html.ejs/);

    });

    it('should render Markdown meta-empty.html.ejs', async function() {
        let rendered;
        try {
            rendered = await doRender('meta-empty.html.ejs', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.doesNotMatch(rendered, /title: Metadata test for EJS/);
        assert.doesNotMatch(rendered, /layout: foo.html.ejs/);
        assert.doesNotMatch(rendered, /hello: world/);

    });

    it('should render partial templates', async function() {

        let rendered;
        try {
            rendered = await doRender('partial1.html.ejs', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<strong id="strong">PARTIAL BODY<\/strong>/);
    });

});

describe('Liquid', function() {

    it('should render Liquid doc1.html.liquid', async function() {
        let rendered;
        try {
            rendered = await doRender('doc1.html.liquid', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
    });

    it('should FAIL TO render Sync Liquid doc1.html.liquid', function() {
        let rendered;
        let caughtError = false;
        try {
            rendered = doRenderSync('doc1.html.liquid', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            // console.error(e);
            caughtError = true;
            rendered = undefined;
        }
        assert.ok(typeof rendered === 'undefined' || rendered === null);
        assert.ok(caughtError);
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.html.liquid';
        const renderer = config.findRenderer('.html.liquid');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'HTML');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.html.liquid');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should parse frontmatter', function() {
        const rc = parseMetadata('meta1.html.liquid');
        assert.ok(rc);
        assert.ok(rc.metadata);
        assert.ok(rc.body);
        assert.ok(rc.content);
        assert.equal(rc.metadata.title, 'Metadata test for LiquidJS');
        assert.equal(rc.metadata.layout, 'foo.html.ejs');
        assert.match(rc.fspath, /meta1.html.liquid$/);
        assert.match(rc.body, /<p>Hello, World!<\/p>/);
    });

    it('should render Liquid meta1.html.liquid', async function() {
        let rendered;
        try {
            rendered = await doRender('meta1.html.liquid', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /<h1>Metadata test for LiquidJS<\/h1>/);
        assert.match(rendered, /message:.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<p>hello: world<\/p>/);
        assert.doesNotMatch(rendered, /layout\: foo.html.ejs/);

    });

    it('should FAIL TO render Sync Liquid meta1.html.liquid', function() {
        let rendered;
        let caughtError = false;
        try {
            rendered = doRenderSync('meta1.html.liquid', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            // console.error(e);
            caughtError = true;
            rendered = undefined;
        }
        assert.ok(typeof rendered === 'undefined' || rendered === null);
        assert.ok(caughtError);
    });

    it('should render Markdown meta-empty.html.liquid', async function() {
        let rendered;
        try {
            rendered = await doRender('meta-empty.html.liquid', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.doesNotMatch(rendered, /title: Metadata test for LiquidJS/);
        assert.doesNotMatch(rendered, /layout: foo.html.ejs/);
        assert.doesNotMatch(rendered, /hello: world/);

    });

    it('should render partial templates', async function() {

        /*
    LiquidJS doesn't seem to support calling a function
    that is included in the "globals".  Hence, the
    partial and partialSync functions do not seem callable.

    The render tag in LiquidJS does a similar thing.
    It can render a simple .html
    It can render a .liquid file, and variables
    can be passed

    But it would be unable to render a partial implemented
    with a different template format.
        */

        let rendered;
        try {
            rendered = await doRender('partial1.html.liquid', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<strong id="strong">PARTIAL BODY<\/strong>/);
    });

});

describe('Nunjucks', function() {

    it('should render Nunjucks doc1.html.njk', async function() {
        let rendered;
        try {
            rendered = await doRender('doc1.html.njk', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
    });

    it('should render Sync Nunjucks doc1.html.njk', function() {
        let rendered;
        try {
            rendered = doRenderSync('doc1.html.njk', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.html.njk';
        const renderer = config.findRenderer('.html.njk');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'HTML');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.html.njk');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should parse frontmatter', function() {
        const rc = parseMetadata('meta1.html.njk');
        assert.ok(rc);
        assert.ok(rc.metadata);
        assert.ok(rc.body);
        assert.ok(rc.content);
        assert.equal(rc.metadata.title, 'Metadata test for Nunjucks');
        assert.equal(rc.metadata.layout, 'foo.html.ejs');
        assert.match(rc.fspath, /meta1.html.njk$/);
        assert.match(rc.body, /<p>Hello, World!<\/p>/);
    });

    it('should render Nunjucks meta1.html.njk', async function() {
        let rendered;
        try {
            rendered = await doRender('meta1.html.njk', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /<h1>Metadata test for Nunjucks<\/h1>/);
        assert.match(rendered, /message:.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<p>hello: world<\/p>/);
        assert.doesNotMatch(rendered, /layout\: foo.html.ejs/);

    });

    it('should render Sync Nunjucks meta1.html.njk', function() {
        let rendered;
        try {
            rendered = doRenderSync('meta1.html.njk', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /<h1>Metadata test for Nunjucks<\/h1>/);
        assert.match(rendered, /message:.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<p>hello: world<\/p>/);
        assert.doesNotMatch(rendered, /layout\: foo.html.ejs/);

    });

    it('should render Markdown meta-empty.html.njk', async function() {
        let rendered;
        try {
            rendered = await doRender('meta-empty.html.njk', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.doesNotMatch(rendered, /title: Metadata test for Nunjucks/);
        assert.doesNotMatch(rendered, /layout: foo.html.ejs/);
        assert.doesNotMatch(rendered, /hello: world/);

    });

    it('should render partial templates', async function() {

        let rendered;
        try {
            rendered = await doRender('partial1.html.njk', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<strong id="strong">PARTIAL BODY<\/strong>/);
    });

});

describe('Handlebars', function() {

    it('should render Handlebars doc1.html.handlebars', async function() {
        let rendered;
        try {
            rendered = await doRender('doc1.html.handlebars', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
    });

    it('should render Sync Handlebars doc1.html.handlebars', function() {
        let rendered;
        try {
            rendered = doRenderSync('doc1.html.handlebars', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.html.handlebars';
        const renderer = config.findRenderer('.html.handlebars');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'HTML');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.html.handlebars');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should parse frontmatter', function() {
        const rc = parseMetadata('meta1.html.handlebars');
        assert.ok(rc);
        assert.ok(rc.metadata);
        assert.ok(rc.body);
        assert.ok(rc.content);
        assert.equal(rc.metadata.title, 'Metadata test for Handlebars');
        assert.equal(rc.metadata.layout, 'foo.html.ejs');
        assert.match(rc.fspath, /meta1.html.handlebars$/);
        assert.match(rc.body, /<p>Hello, World!<\/p>/);
    });

    it('should render Handlebars meta1.html.handlebars', async function() {
        let rendered;
        try {
            rendered = await doRender('meta1.html.handlebars', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /<h1>Metadata test for Handlebars<\/h1>/);
        assert.match(rendered, /message:.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<p>hello: world<\/p>/);
        assert.doesNotMatch(rendered, /layout\: foo.html.ejs/);

    });

    it('should render Sync Handlebars meta1.html.handlebars', function() {
        let rendered;
        try {
            rendered = doRenderSync('meta1.html.handlebars', {
                    message: 'Heaven sent'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /<h1>Metadata test for Handlebars<\/h1>/);
        assert.match(rendered, /message:.*Heaven sent.*/);
        assert.match(rendered, /.*Hello.*World.*/);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<p>hello: world<\/p>/);
        assert.doesNotMatch(rendered, /layout\: foo.html.ejs/);

    });


    it('should render Markdown meta-empty.html.handlebars', async function() {
        let rendered;
        try {
            rendered = await doRender('meta-empty.html.handlebars', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.doesNotMatch(rendered, /title: Metadata test for Handlebars/);
        assert.doesNotMatch(rendered, /layout: foo.html.ejs/);
        assert.doesNotMatch(rendered, /hello: world/);

    });

    // In Handlebars, it seems that functions cannot be
    // called therefore the Renderers partial functions
    // cannot be used.
    //
    // Further the {{> partial}} syntax is useless since
    // one has to jump so many hoops to register a partial.


    it('should render partial templates', async function() {

        let rendered;
        try {
            rendered = await doRender('partial1.html.handlebars', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.equal(typeof rendered, 'string');
        // console.log(rendered);
        assert.match(rendered, /<p>Hello, World!<\/p>/);
        assert.match(rendered, /<span id="message">See this message<\/span>/);
        assert.match(rendered, /<span id="message">non-block helper<\/span>/);
        assert.match(rendered, /PARTIAL BODY/);
        assert.match(rendered, /<strong id="strong">Before nested message <span id="message">NESTED MESSAGE<\/span>/);
        assert.match(rendered, /<span id="title">Partial test for Handlebars<\/span>/);
    });

});

describe('LESS', function() {

    it('should render LESS style.css.less', async function() {
        let rendered;
        try {
            rendered = await doRender('style.css.less', { });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // assert.ok(rendered.css);
        // console.log(rendered);
        assert.match(rendered, /width: 10px;/);
        assert.match(rendered, /height: 20px;/);
        assert.match(rendered, /border-top: dotted 1px black;/);
        assert.match(rendered, /border-bottom: solid 2px black;/);
        assert.match(rendered, /#header .navigation/);
        assert.match(rendered, /#header .logo/);
        // assert.ok(rendered.imports);
        // assert.ok(Array.isArray(rendered.imports));
        // assert.equal(rendered.imports.length, 0);
    });

    it('should FAIL TO render Sync LESS style.css.less', function() {
        let rendered;
        let caughtError = false;
        try {
            rendered = doRenderSync('style.css.less', { });
        } catch (e) {
            caughtError = true;
            rendered = undefined;
        }
        assert.ok(typeof rendered === 'undefined' || rendered === null);
        assert.ok(caughtError === true);
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.css.less';
        const renderer = config.findRenderer('.css.less');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'CSS');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.css.less');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should NOT parse frontmatter', function() {
        const rc = parseMetadata('style.css.less');
        assert.ok(rc);
        assert.equal(typeof rc.metadata, 'undefined');
        assert.equal(typeof rc.body, 'undefined');
        assert.ok(rc.content);
    });

});

describe('JSON', function() {

    // The JSON rendering engine is a little different than the others.
    // There is a partial template path passed in the frontmatter of
    // the document file.  This partial will be given JS/JSON data
    // in the `data` metadata object.

    it('should render JSON partial json-format.html.ejs', async function() {
        let rendered;
        try {
            rendered = await config.partial('json-format.html.ejs', {
                data: {
                    "Row1": "value 1",
                    "Row2": "value 2",
                    "Row3": "value 3"
                }
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /Row1 :- value 1/);
        assert.match(rendered, /Row2 :- value 2/);
        assert.match(rendered, /Row3 :- value 3/);
    });

    it('should render Sync JSON partial json-format.html.ejs', function() {
        let rendered;
        try {
            rendered = config.partialSync('json-format.html.ejs', {
                data: {
                    "Row1": "value 1",
                    "Row2": "value 2",
                    "Row3": "value 3"
                }
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        // console.log(rendered);
        assert.match(rendered, /Row1 :- value 1/);
        assert.match(rendered, /Row2 :- value 2/);
        assert.match(rendered, /Row3 :- value 3/);
    });

    it('should show correct renderFormat', function() {
        const fspath = 'path/to/foo.html.json';
        const renderer = config.findRenderer('.html.json');
        const format = renderer.renderFormat({
            fspath: fspath
        });

        assert.ok(format);
        assert.equal(typeof format, 'string');
        assert.equal(format, 'HTML');
    });

    it('should fail on bad fspath for renderFormat', function() {
        const fspath = 'path/to/foo.html';
        const renderer = config.findRenderer('.html.json');
        // console.log(renderer);
        let format;
        let caughtError = false;
        try {
            format = renderer.renderFormat({
                fspath: fspath
            });
        } catch (err) {
            caughtError = true;
            format = undefined;
        }

        // console.log(`caughtError ${caughtError} format ${format}`);

        assert.equal(typeof format, 'undefined');
        assert.equal(caughtError, true);
    });

    it('should parse frontmatter', function() {
        const rc = parseMetadata('meta1.html.json');
        assert.ok(rc);
        assert.ok(rc.metadata);
        assert.ok(rc.body);
        assert.ok(rc.content);
        assert.equal(rc.metadata.title, 'Metadata test for JSON');
        assert.equal(rc.metadata.layout, 'foo.html.ejs');
        assert.match(rc.fspath, /meta1.html.json$/);
        assert.match(rc.body, /"hello": "World!"/);

        const json = JSON.parse(rc.body);
        assert.equal(json.message, 'This is the body.');
        assert.equal(json.hello, 'World!');

    });


});

});
