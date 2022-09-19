/**
 *
 * Copyright 2020 David Herron
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

import * as nunjucks from 'nunjucks';

const _nunjuck_env = Symbol('id');

const getMounted = (dir) => {
    if (typeof dir === 'string') return dir;
    else return dir.src;
};

export class NunjucksRenderer extends Renderer {
    constructor() {
        super(".html.njk", /^(.*\.html)\.(njk)$/);
        this[_nunjuck_env] = undefined;
    }

    njkenv() {
        if (this[_nunjuck_env]) return this[_nunjuck_env];
        // console.log(`njkenv layoutDirs ${util.inspect(config.layoutDirs)}`);
        // Detect if config is not set
        // In the Rendering module, config is stored in superclass
        // if (!config) throw new Error(`render-nunjucks no config`);

        // Get the paths for both the Layouts and Partials directories,
        // because with Nunjucks we are storing macros files in some
        // layouts directories.
        const layoutsMounted = this.layoutDirs.map(getMounted);
        const partialsMounted = this.partialDirs.map(getMounted);
        const loadFrom = layoutsMounted.concat(partialsMounted);

        // console.log(`njkenv `, loadFrom);

        // An open question is whether to create a custom Loader
        // class to integrate Nunjucks better with FileCache.  Clearly
        // Nunjucks can handle files being updated behind the scene.

        this[_nunjuck_env] = new nunjucks.Environment(
            // Using watch=true requires installing chokidar
            new nunjucks.FileSystemLoader(loadFrom, { watch: false }),
                // config.layoutDirs.concat(config.partialsDirs), { watch: false }),
            {
                autoescape: false,
                noCache: false
            }
        );
        // console.log(`njkenv`, this[_nunjuck_env]);
        return this[_nunjuck_env];
    }

    async render(context: RenderingContext /* text, metadata, docInfo */) {
        try {
            let env = this.njkenv();
            return env.renderString(context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }

    renderSync(context: RenderingContext /* text, metadata, docInfo */) {
        try {
            let env = this.njkenv();
            return env.renderString(context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath}`);
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
