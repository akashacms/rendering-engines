/**
 *
 * Copyright 2020-2022 David Herron
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

import * as path from 'node:path';
import fs, { promises as fsp } from 'node:fs';
import util from 'node:util';
import { Renderer, parseFrontmatter } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';

import * as nunjucks from 'nunjucks';

export class NunjucksRenderer extends Renderer {

    #env;

    constructor() {
        super(".html.njk", /^(.*\.html)\.(njk)$/);
        this.#env = undefined;
    }

    /**
     * Looks for a template in the concatenation
     * of layoutDirs and partialDirs, returning
     * the concatenation of the matching directory
     * with the file name.
     *
     * The purpose is to support a Nunjucks Loader which
     * dynamically use the current list of directories
     * when/if they're updated.
     *
     * @param fnlayout 
     * @returns 
     */
    #lookForTemplateSync(fnlayout: string) {
        const loadFrom = this.layoutDirs.concat(
            this.partialDirs
        );
        for (const ldir of loadFrom) {
            const lpath = path.join(ldir, fnlayout);
            let lstat;
            try {
                lstat = fs.statSync(lpath);
            } catch (err) { lstat = undefined; }
            if (lstat) {
                if (lstat.isFile()) {
                    return lpath;
                }
            }
        }
    }

    njkenv() {
        // If the environment was already created,
        // then do not create a new one.
        if (this.#env) return this.#env;
        
        // Using nunjucks.FileSystemLoader, as shown
        // below, did not work out.  The issue is if/when
        // the list of directories (Layouts+Partials) changes,
        // there isn't a way to update the directories in
        // the FileSystemLoader.
        //
        // It's observed that njkenv was called before
        // the AkashaRender Configuration.prepare function
        // is invoked, hence the Built-In plugin was not
        // added, and therefore it's layout and partials
        // directories were not available.
        //
        // The Nunjucks documentation for adding a
        // Loader is horrible and led me down false paths.
        //
        // This is the trivial Loader.  We do not need
        // it to "watch" the directories (using Chokidar),
        // and we do not need it to cache results.
        //
        // The action is in the getSource and
        // #lookForTemplateSync functions.
        //
        // The latter looks through the directories
        // in the concatenation of layoutsDirs and
        // partialsDirs.  It recomputes this every time
        // because the directory list may have changed.
        //
        // That function was modeled after defaultFindLayout
        // and related functions in index.ts.
        //
        // Everything is using Sync functions so that it
        // can be used from Sync rendering.

        const that = this;

        function AkLoader(opts?: any) {}
        AkLoader.prototype.getSource = function(name) {
            // load the template
            const lpath = that.#lookForTemplateSync(name);
            const source = {
                src: fs.readFileSync(lpath, 'utf-8'),
                path: lpath,
                noCache: this.noCache
            };
            return source;
        }

        this.#env = new nunjucks.Environment(
            new AkLoader(),
            {
                autoescape: false,
                watch: false,
                noCache: true
            }
        );

        // This is the old implementation.  It almost worked.

        // this.#env = new nunjucks.Environment(
        //     // Using watch=true requires installing chokidar
        //     new nunjucks.FileSystemLoader(loadFrom, {
        //         watch: false
        //     }), {
        //         autoescape: false,
        //         noCache: false
        //     }
        // );

        return this.#env;
    }

    async render(context: RenderingContext): Promise<string> {
        const toRender
            = typeof context.body === 'string'
            ? context.body
            : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`NJK render no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(context);
            let env = this.njkenv();
            // Do asynchronous rendering
            let result = await new Promise<string>((resolve, reject) => {
                env.renderString(
                    toRender,
                    !context?.metadata
                        ? {}
                        : context.metadata,
                    function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            if (typeof result === 'string') {
                                resolve(result);
                            } else if (typeof result === 'undefined'
                                           || result === null
                            ) {
                                resolve('');
                            } else {
                                reject(new Error(`rendering result unknown format ${util.inspect(result)}`));
                            }
                        }
                    }
                );
            });
            return result;
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }

    renderSync(context: RenderingContext) {
        const toRender
            = typeof context.body === 'string'
            ? context.body
            : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`NJK renderSync no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(context);
            let env = this.njkenv();
            return env.renderString(
                toRender,
                !context?.metadata
                    ? {}
                    : context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
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
            throw new Error(`NunjucksRenderer does not render files with this extension ${context.fspath}`);
        }
        return RenderingFormat.HTML;
    }

    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        return true;
    }
}
