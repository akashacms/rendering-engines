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

import * as path from 'path';
import { Renderer, parseFrontmatter } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';

import * as ejs from 'ejs';
import * as ejsutils from 'ejs/lib/utils.js';

const getMounted = (dir) => {
    if (typeof dir === 'string') return dir;
    else return dir.src;
};

// TODO support .php.ejs
export class EJSRenderer extends Renderer {
    constructor() {
        super(".html.ejs", /^(.*\.html|.*\.php)\.(ejs)$/);
    }

    // This was for an attempt to list the directories to search when
    // satisfying an "include" EJS tag.  This could have been a way
    // to circumvent <partial> tags

    getEJSOptions(fspath) {

        const ejsOptions = {
            rmWhitespace: true,
            filename: fspath,
            cache: true,
            views: []
        };

        // console.log(`getEJSOptions `, this);
        if (!this.config) throw new Error(`getEJSOptions no config`);
        const layoutsMounted = this.layoutDirs
                        ? this.layoutDirs.map(getMounted)
                        : undefined;
        const partialsMounted = this.partialDirs
                        ? this.partialDirs.map(getMounted)
                        : undefined;
        const loadFrom = partialsMounted
                        ? partialsMounted.concat(layoutsMounted)
                        : layoutsMounted;
        // console.log(`getEJSOptions loadFrom `, loadFrom);
        if (loadFrom) ejsOptions.views = loadFrom;
        return ejsOptions;
    }

    // According to the EJS documentation, the template will
    // be automatically cached by EJS.

    compiledTemplate(text, docInfo) {
        let opts = this.getEJSOptions(docInfo ? docInfo.fspath : undefined);
        return {
            template: ejs.compile(text, opts),
            options: opts
        };
    }

    renderSync(context: RenderingContext) {
        let opts = this.getEJSOptions(context.fspath ? context.fspath : undefined);
        // console.log(`render  ${text} ${metadata} ${opts}`);
        try {
            return ejs.render(context.content, context.metadata, opts);
        } catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with EJS in file ${docpath}`);
            err.cause = e;
            throw err;
        }

        // const { template, opts } = this.compiledTemplate(text, vpinfo);
        // return template(metadata, opts);
    }

    async render(context: RenderingContext): Promise<string> {
        /* return Promise.resolve(ejs.render(text, metadata)); */
        return new Promise((resolve, reject) => {
            try {
                let opts = this.getEJSOptions(context.fspath ? context.fspath : undefined);
                // console.log(`render async ${context.content} ${context.metadata} ${opts}`);
                resolve(ejs.render(context.content, context.metadata, opts));
                // const { template, opts } = this.compiledTemplate(text, vpinfo);
                // resolve(template(metadata, opts));
            } catch(e) {
                const docpath = context.fspath ? context.fspath : "unknown";
                const err = new Error(`Error with EJS in file ${docpath}`);
                err.cause = e;
                reject(err);
            }
        });
    }

    /**
     * Parse frontmatter in the format of lines of dashes
     * surrounding a YAML structure.
     *
     * @param context 
     * @returns 
     */
     parseMetadata(context: RenderingContext): RenderingContext {
        return parseFrontmatter(context);
    }

    renderFormat(context: RenderingContext) {
        if (!this.match(context.fspath)) {
            throw new Error(`EJSRenderer does not render files with this extension ${context.fspath}`);
        }
        if (/\.php\.ejs$/.test(context.fspath)) {
            return RenderingFormat.PHP;
        } else {
            return RenderingFormat.HTML;
        }
    }

    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        if (/\.php\.ejs$/.test(fpath))
            return false;
        else
            return true;
    }
}
