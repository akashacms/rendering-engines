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

    njkenv() {
        if (this.#env) return this.#env;
        // console.log(`njkenv layoutDirs ${util.inspect(config.layoutDirs)}`);
        // Detect if config is not set
        // In the Rendering module, config is stored in superclass
        // if (!config) throw new Error(`render-nunjucks no config`);

        // Get the paths for both the Layouts and Partials directories,
        // because with Nunjucks we are storing macros files in some
        // layouts directories.
        const loadFrom = this.layoutDirs.concat(this.partialDirs);

        // console.log(`njkenv `, loadFrom);

        // An open question is whether to create a custom Loader
        // class to integrate Nunjucks better with FileCache.  Clearly
        // Nunjucks can handle files being updated behind the scene.

        this.#env = new nunjucks.Environment(
            // Using watch=true requires installing chokidar
            new nunjucks.FileSystemLoader(loadFrom, {
                watch: false
            }), {
                autoescape: false,
                noCache: false
            }
        );

        // console.log(`njkenv`, this[_nunjuck_env]);
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
