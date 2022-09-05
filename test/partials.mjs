
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
    partialDirs: [ 
        path.join(__dirname, 'partials1'),
        path.join(__dirname, 'partials-include')
    ],
    layoutDirs:  [ path.join(__dirname, 'layouts1') ]
});

describe('Partials', function() {

describe('EJS', function() {

    it('should render EJS partial-body.html.ejs', async function() {
        let rendered;
        try {
            rendered = await config.partial('partial-body.html.ejs', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Partial Body Text.*/);
    });

    it('should render Sync EJS partial-body.html.ejs', function() {
        let rendered;
        try {
            rendered = config.partialSync('partial-body.html.ejs', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Partial Body Text.*/);
    });

    it('should render EJS including.html.ejs', async function() {
        let rendered;
        try {
            rendered = await config.partial('including.html.ejs', {
                message: 'Hello, World',
                includedStuff: 'This is included'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.span..p.This is included..p...span/);
        assert.match(rendered, /.div.Hello, World..div./);
    });

    it('should render Sync EJS including.html.ejs', function() {
        let rendered;
        try {
            rendered = config.partialSync('including.html.ejs', {
                message: 'Hello, World',
                includedStuff: 'This is included'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.span..p.This is included..p...span/);
        assert.match(rendered, /.div.Hello, World..div./);
    });

});

describe('Liquid', function() {

    it('should render Liquid partial-body.html.liquid', async function() {
        let rendered;
        try {
            rendered = await config.partial('partial-body.html.liquid', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Partial Body Text.*/);
    });

    it('should FAIL TO render Sync Liquid partial-body.html.liquid', function() {
        let rendered;
        let caughtError = false;
        try {
            rendered = config.partialSync('partial-body.html.liquid', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            caughtError = true;
            rendered = undefined;
        }
        assert.ok(typeof rendered === 'undefined' || rendered === null);
        assert.ok(caughtError === true);
    });

    it('should render Liquid including.html.liquid', async function() {
        let rendered;
        try {
            rendered = await config.partial('including.html.liquid', {
                message: 'Hello, World',
                includedStuff: 'This is included'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.span..p.This is included..p...span/);
        assert.match(rendered, /.div.Hello, World..div./);
    });

    // Liquid not supported for Sync rendering
});

describe('Nunjucks', function() {

    it('should render Nunjucks partial-body.html.njk', async function() {
        let rendered;
        try {
            rendered = await config.partial('partial-body.html.njk', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Partial Body Text.*/);
    });

    it('should render Sync Nunjucks partial-body.html.njk', function() {
        let rendered;
        try {
            rendered = config.partialSync('partial-body.html.njk', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Partial Body Text.*/);
    });

    it('should render Nunjucks including.html.njk', async function() {
        let rendered;
        try {
            rendered = await config.partial('including.html.njk', {
                message: 'Hello, World',
                includedStuff: 'This is included'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.span..p.This is included..p...span/);
        assert.match(rendered, /.div.Hello, World..div./);
    });

    it('should render Sync Nunjucks including.html.njk', function() {
        let rendered;
        try {
            rendered = config.partialSync('including.html.njk', {
                message: 'Hello, World',
                includedStuff: 'This is included'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.span..p.This is included..p...span/);
        assert.match(rendered, /.div.Hello, World..div./);
    });

});

describe('Handlebars', function() {

    it('should render Handlebars partial-body.html.handlebars', async function() {
        let rendered;
        try {
            rendered = await config.partial('partial-body.html.handlebars', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Partial Body Text.*/);
    });

    it('should render Sync Handlebars partial-body.html.handlebars', function() {
        let rendered;
        try {
            rendered = config.partialSync('partial-body.html.handlebars', {
                partialBody: 'Partial Body Text'
            });
        } catch (e) {
            console.error(e);
            rendered = undefined;
        }
        assert.ok(rendered);
        assert.match(rendered, /.*Partial Body Text.*/);
    });

    // Handlebars does not support include at all
    // It does support partials, but they have to be preregistered,
    // and it does not support searching for partials in the filesystem.
    // Hence we will not test "include" with Handlebars
});

});
