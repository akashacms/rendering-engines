
import * as assert from 'node:assert';
// import { assert } from 'chai';
// import { describe, it } from 'node:test';

import * as path from 'node:path';
import * as url from 'url';
import { promises as fsp } from 'fs';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Configuration } from '../dist/index.js';

const config = new Configuration({
    partialDirs: [ path.join(__dirname, 'partials1') ],
    layoutDirs:  [ path.join(__dirname, 'layouts1') ]
});

describe('Setup', function() {
    it('should have partials directory', function() {
        assert.deepEqual(config.partialDirs, [
            path.join(__dirname, 'partials1')
        ]);
    });

    it('should have existing partials directories', async function() {
        for (const pdir of config.partialDirs) {
            const pstat = await fsp.stat(pdir);
            assert.ok(pstat.isDirectory());
        }
    });
    
    it('should have layouts directory', function() {
        assert.deepEqual(config.layoutDirs, [
            path.join(__dirname, 'layouts1')
        ]);
    });

    it('should have existing layouts directories', async function() {
        for (const ldir of config.layoutDirs) {
            const lstat = await fsp.stat(ldir);
            assert.ok(lstat.isDirectory());
        }
    });
    
    it('should have Renderer classes', function() {
        // console.log(config.renderers.map(r => r.name));
        assert.deepEqual(config.renderers.map(r => r.name), [
            '.html.md',
            '.html.adoc',
            '.html.ejs',
            '.html.liquid',
            '.html.njk',
            '.html.handlebars',
            '.css.less',
            '.html.json'
        ]);
    });

    it('should find Markdown renderer', function() {
        const renderer = config.findRendererPath('doc1.html.md');
        assert.equal(renderer.name, '.html.md');
    });

    it('should find AsciiDoctor renderer', function() {
        const renderer = config.findRendererPath('doc1.html.adoc');
        assert.equal(renderer.name, '.html.adoc');
    });
    
    it('should find EJS renderer', function() {
        const renderer = config.findRendererPath('doc1.html.ejs');
        assert.equal(renderer.name, '.html.ejs');
    });
   
    it('should find Liquid renderer', function() {
        const renderer = config.findRendererPath('doc1.html.liquid');
        assert.equal(renderer.name, '.html.liquid');
    });
    
    it('should find Nunjucks renderer', function() {
        const renderer = config.findRendererPath('doc1.html.njk');
        assert.equal(renderer.name, '.html.njk');
    });
    
    it('should find Handlebars renderer', function() {
        const renderer = config.findRendererPath('doc1.html.handlebars');
        assert.equal(renderer.name, '.html.handlebars');
    });
    
    it('should find CSSLESS renderer', function() {
        const renderer = config.findRendererPath('doc1.css.less');
        assert.equal(renderer.name, '.css.less');
    });
    
    it('should find JSON renderer', function() {
        const renderer = config.findRendererPath('doc1.html.json');
        assert.equal(renderer.name, '.html.json');
    });
    
});

describe('Find files', function() {
    it('should find hello-world.html', async function() {
        const found = await config.findPartial('hello-world.html');
        assert.equal(found, path.join(__dirname, 'partials1', 'hello-world.html'));
    });

    it('should find json-format.html.ejs', async function() {
        const found = await config.findPartial('json-format.html.ejs');
        assert.equal(found, path.join(__dirname, 'partials1', 'json-format.html.ejs'));
    });


    it('should find layout default.html.ejs', async function() {
        const found = await config.findLayout('default.html.ejs');
        assert.equal(found, path.join(__dirname, 'layouts1', 'default.html.ejs'));
    });
});
