import { DirsWatcher } from '@akashacms/stacked-dirs';
import path from 'node:path';
import { promises as fsp } from 'node:fs';
import * as Renderers from '../dist/index.js';
import yaml from 'js-yaml';

// Read the configuration from a YAML file

if (process.argv.length < 2 || !process.argv[2]) {
    console.error('USAGE: node guidecms.mjs config.yml');
    process.exit(1);
}

let ymltxt = await fsp.readFile(process.argv[2], 'utf8');
let cfg = yaml.load(ymltxt);

// Set variables from the config file

const batchmode = cfg.batchmode;
const docsDirectories = cfg.dirs.documents;
const renderedOutput = cfg.dirs.output;
const layoutsDir = cfg.dirs.layout;
const partialsDir = cfg.dirs.partial;
const metadata = cfg.metadata;

////////////// END OF CONFIGURATION SECTION

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const renderers = new Renderers.Configuration({
    partialDirs: partialsDir ? [ partialsDir ] : undefined,
    layoutDirs: layoutsDir ? [ layoutsDir ] : undefined
});

const rendererMarkdown = renderers.findRendererName('.html.md');

rendererMarkdown.configuration({
    html:         true,         // Enable html tags in source
    xhtmlOut:     false,         // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    linkify:      true,         // Autoconvert url-like texts to links
    typographer:  false,        // Enable smartypants and other sweet transforms
})
.use(require('markdown-it-highlightjs'), { auto: true, code: true, inline: true })
.use(require('markdown-it-expand-tabs'), { tabWidth: 4 });

const docsWatcher = new DirsWatcher('documents');

docsWatcher.on('ready', async (name) => {
    console.log(`documents ready ${name}`);
    if (batchmode) await close();
})
.on('change', async (name, info) => {
    console.log(`documents change ${name} ${info.vpath}` /*, info */);
    try {
        await render(info);
    } catch (err) {
        console.error(`documents change ERROR `, err.stack);
    }
})
.on('add', async (name, info) => {
    console.log(`documents add ${name} ${info.vpath}` /*, info */);
    try {
        await render(info);
    } catch (err) {
        console.error(`documents add ERROR `, err.stack);
    }
})
.on('unlink', async (name, info) => {
    console.log(`documents unlink ${name} ${info.vpath}`, info);
    // TODO Convert the path into a path within renderedOutput
    try {
        await fsp.unlink(path.join(renderedOutput, renderedPath(info.vpath)));
    } catch (err) {
        console.error(`documents unlink ERROR `, err.stack);
    }
});

docsWatcher.watch(docsDirectories);

async function close() {
    await docsWatcher.close();
}

function copyMetadataProperties(data, metadata) {
    try {
        for (const prop in metadata) {
            if (!(prop in data)) data[prop] = metadata[prop];
        }
        return data;
    } catch (err) {
        throw new Error(`Failed to copy metadata because ${err}`);
    }
}

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
