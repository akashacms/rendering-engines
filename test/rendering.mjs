
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

describe('EJS', function() {

    it('should render EJS doc1.ejs', async function() {
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
    });

});
