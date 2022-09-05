/**
 *
 * Copyright 2014-2019 David Herron
 *
 * This file is part of AkashaCMS (http://akashacms.com/).
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Renderer } from './Renderer.js';
// const render    = require('./render');
import { promises as fsp } from 'fs';
import * as url from 'url';
import * as path from 'path';
import * as util from 'util';
import matter from 'gray-matter';
import * as mahabhuta from 'mahabhuta';
// const data = require('./data');

/**
 * Rendering support for any file that produces HTML when rendered.
 */
export class HTMLRenderer extends Renderer {

    /**
     * Support for Mahabhuta -- jQuery-like processing of HTML DOM before Rendering
     * down to HTML text.
     */
    maharun(rendered, metadata, mahafuncs) {
        if (typeof rendered === 'undefined' || rendered === null) {
            throw new Error('no rendered provided');
        }
        if (typeof metadata === 'undefined' || metadata === null) {
            throw new Error('no metadata provided');
        }
        if (typeof mahabhuta === 'undefined' || mahabhuta === null) {
            throw new Error('no mahabhuta provided');
        }
        
        if (metadata.config.mahabhutaConfig) mahabhuta.config(metadata.config.mahabhutaConfig);
        return mahabhuta.processAsync(rendered, metadata, mahafuncs);
    }

    copyMetadataProperties(data, frontmatter) {
        for (const prop in frontmatter) {
            if (!(prop in data)) data[prop] = frontmatter[prop];
        }
        return data;
    }

    async readDocument(fnDoc) {
        const docLayout = await fsp.readFile(fnDoc, 'utf8');
        const fm = matter(docLayout);
        return fm;
    }

    // renderForLayout && renderDocument needs to be in AkashaRender render.js
    // Rewrite to simplify the flow

    /**
     * If the document metadata says to render into a template, do so.
     */
    /* async renderForLayout(rendered, metadata, config) {
        // console.log('renderForLayout '+ util.inspect(metadata));
        if (metadata.layout) {
            // find layout
            // read layout
            // split out frontmatter & content
            // find renderer
            // renderer.render
            // mahabhuta

            // const layoutStart = new Date();

            var layoutcontent;
            var layoutdata;
            var layoutrendered;
            var metadocpath = metadata.document ? metadata.document.path : "unknown";

            // const layouts = (await filecache).layouts;
            // await layouts.isReady();

            // let found = await layouts.find(metadata.layout);
            // if (!found) {
            //     throw new Error(`No layout found in ${util.inspect(config.layoutDirs)} for ${metadata.layout} in file ${metadata.document.path}`);
            // }

            const fnlayout = await this.findLayout(metadata.layout);
            const docLayout = await this.readDocument(fnlayout);

            layoutcontent = docLayout.content;
            layoutdata = this.copyMetadataProperties(metadata, docLayout.data);
            
            layoutdata.content = rendered;
            const renderer = config.findRendererPath(metadata.layout);
            if (!renderer) {
                throw new Error(`No renderer for ${metadata.layout}`);
            }
            try {
                layoutrendered = await renderer.render(layoutcontent, layoutdata, found);
            } catch (e) {
                let ee = new Error(`Error rendering ${metadocpath} with ${metadata.layout} ${e.stack ? e.stack : e}`);
                console.error(ee);
                throw ee;
            }
            return layoutrendered;

        } else return rendered;
    } */

    /* async renderToFile(config, docInfo) {

        const renderStart = new Date();
        const doc = await this.readContent(docInfo.mounted, docInfo.pathInMounted);
        const fm = this.parseFrontmatter(doc);
        const doccontent = fm.content;
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo, 
                            "FRONTMATTER", renderStart);

        const metadata = await this.newInitMetadata(config, docInfo);
        const docdata = metadata;
        let docrendered;
        try {
            docrendered = await this.render(doccontent, docdata, docInfo);
        } catch (err) {
            console.error(`Error rendering ${docInfo.vpath} ${(err.stack ? err.stack : err)}`);
            throw new Error(`Error rendering ${docInfo.vpath} ${(err.stack ? err.stack : err)}`);
        }
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo, 
                            "FIRST RENDER", renderStart);

        docrendered = await this.renderForLayoutNew(docrendered, docdata, config);
        const renderSecondRender = new Date();
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo, 
                            "SECOND RENDER", renderStart);
        if (this.doMahabhuta(docInfo.vpath)) {
            try {
                docrendered = await this.maharun(docrendered, docdata, config.mahafuncs);
            } catch (e2) {
                let eee = new Error(`Error with Mahabhuta ${docInfo.vpath} with ${metadata.layout} ${e2.stack ? e2.stack : e2}`);
                console.error(eee);
                throw eee;
            }
        } else {
            // console.log(`renderForLayout mahabhuta not allowed ${layoutrendered}`);
        }
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo, 
                            "MAHABHUTA", renderStart);
        const renderDest = path.join(config.renderTo, this.filePath(docInfo.vpath));
        await fsp.mkdir(path.dirname(renderDest), { recursive: true });
        await fsp.writeFile(renderDest, docrendered, 'utf8');
    } */

    /**
     * Determine whether it's allowed to run Mahabhuta.  Some rendering types
     * cannot allow Mahabhuta to run.  Renderers should override this
     * function if necessary.
     */
    doMahabhuta(fpath) {
        return true;
    }

    async readContent(basedir, fpath) {
        const text = await fsp.readFile(path.join(basedir, fpath), 'utf8');
        return text;
    }

    // initMetadata probably needs to be in AkashaRender render.js

    /*
    async initMetadata(config, docInfo) {

        const renderer = this;
        // Start with a base object that will be passed into the template
        var metadata = { };

        // Copy data from frontmatter
        for (let yprop in docInfo.baseMetadata) {
            // console.log(`initMetadata ${basedir} ${fpath} baseMetadata ${baseMetadata[yprop]}`);
            metadata[yprop] = docInfo.baseMetadata[yprop];
        }
        for (let yprop in config.metadata) {
            metadata[yprop] = config.metadata[yprop];
        }
        let fmmcount = 0;
        for (let yprop in docInfo.docMetadata) {
            metadata[yprop] = docInfo.docMetadata[yprop];
            fmmcount++;
        }
        /* if (fmmcount <= 0) {
            console.error(`WARNING: No metadata discovered in ${docInfo.vpath}`);
        } *--/

        metadata.content = "";
        metadata.document = {};
        metadata.document.basedir = docInfo.mountPoint;
        metadata.document.relpath = docInfo.pathInMounted;
        metadata.document.relrender = renderer.filePath(docInfo.pathInMounted);
        metadata.document.path = docInfo.vpath;
        metadata.document.renderTo = docInfo.renderPath;

        // Ensure the <em>tags</em> field is an array
        if (!(metadata.tags)) {
            metadata.tags = [];
        } else if (typeof (metadata.tags) === 'string') {
            let taglist = [];
            const re = /\s*,\s*--/;
            metadata.tags.split(re).forEach(tag => {
                taglist.push(tag.trim());
            });
            metadata.tags = taglist;
        } else if (!Array.isArray(metadata.tags)) {
            throw new Error(
                `FORMAT ERROR - ${docInfo.vpath} has badly formatted tags `,
                metadata.tags);
        }

        metadata.config      = config;
        metadata.partialSync = (await partialFuncs).partialSync.bind(renderer, config);
        metadata.partial     = (await partialFuncs).partial.bind(renderer, config);

        metadata.root_url = config.root_url;

        if (config.root_url) {
            let pRootUrl = url.parse(config.root_url);
            pRootUrl.pathname = path.normalize(
                    path.join(pRootUrl.pathname, metadata.document.renderTo)
            );
            metadata.rendered_url = url.format(pRootUrl);
        } else {
            metadata.rendered_url = metadata.document.renderTo;
        }

        metadata.akasha = this.akasha;
        metadata.plugin = config.plugin;
        // console.log(`newInitMetadata`, docInfo);
        metadata.rendered_date = docInfo.stats.mtime;

        if (!metadata.publicationDate) {
            var dateSet = false;
            if (docInfo.docMetadata && docInfo.docMetadata.publDate) {
                const parsed = Date.parse(docInfo.docMetadata.publDate);
                if (! isNaN(parsed)) {
                    metadata.publicationDate = new Date(parsed);
                }
                dateSet = true;
            }
            if (! dateSet && docInfo.stats && docInfo.stats.mtime) {
                metadata.publicationDate = new Date(docInfo.stats.mtime);
            }
            if (!metadata.publicationDate) {
                metadata.publicationDate = new Date();
            }
        }

        return metadata;
    } */

}
