
import * as assert from 'node:assert';

import * as path from 'node:path';
import * as url from 'url';
import { promises as fsp } from 'fs';


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
    return await renderer.render({
        fspath: docfn,
        content: doc,
        metadata: metadata
    });
}

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
        assert.ok(rendered.css);
        // console.log(rendered);
        assert.match(rendered.css, /width: 10px;/);
        assert.match(rendered.css, /height: 20px;/);
        assert.match(rendered.css, /border-top: dotted 1px black;/);
        assert.match(rendered.css, /border-bottom: solid 2px black;/);
        assert.match(rendered.css, /#header .navigation/);
        assert.match(rendered.css, /#header .logo/);
        assert.ok(rendered.imports);
        assert.ok(Array.isArray(rendered.imports));
        assert.equal(rendered.imports.length, 0);
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
});
