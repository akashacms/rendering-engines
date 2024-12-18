/**
 *
 * Copyright 2014-2022 David Herron
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

import * as util from 'util';
import * as path from 'path';
import { Renderer, parseFrontmatter } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';

export class JSONRenderer extends Renderer {
    constructor() {
        super(".html.json", /^(.*\.html)\.(json)$|^(.*)\.(json)$/);
    }

    renderSync(context: RenderingContext) {
        // console.log(`JSONRenderer renderSync ${text} ==> ${util.inspect(json)}`);
        // console.log(`JSONRenderer renderSync JSONFormatter ${metadata.JSONFormatter}`);
        const text = typeof context.body === 'string' ? context.body : context.content;
        if (typeof text !== 'string') {
            throw new Error(`JSON renderSync no context.body or context.content supplied for rendering`);
        }
        try {
            let json = JSON.parse(text);
            return this.config.partialSync(context.metadata.JSONFormatter,
                               { data: json });
        } catch(e) {

            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with JSON in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }

    async render(context: RenderingContext) {
        const text = typeof context.body === 'string' ? context.body : context.content;
        if (typeof text !== 'string') {
            throw new Error(`JSON render no context.body or context.content supplied for rendering`);
        }
        try {
            let json = JSON.parse(text);
            // console.log(`JSONRenderer ${text} ==> ${util.inspect(json)}`);
            // console.log(`JSONRenderer JSONFormatter ${metadata.JSONFormatter}`);
            return await this.config.partial(context.metadata.JSONFormatter,
                                 { data: json });
        } catch(e) {

            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with JSON in file ${docpath} because ${e}`);
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
            throw new Error(`JSONRenderer does not render files with this extension ${context.fspath}`);
        }
        return RenderingFormat.HTML;
    }

}
