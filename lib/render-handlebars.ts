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

import * as path from 'path';
import { Renderer, parseFrontmatter } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';

import * as Handlebars from 'handlebars';

export class HandlebarsRenderer extends Renderer {
    constructor() {
        super(".html.handlebars", /^(.*\.html)\.(handlebars)$/);
    }

    async render(context: RenderingContext): Promise<string> {
        try {
            const template = Handlebars.compile(
                context.body ? context.body : context.content
            );
            return template(context.metadata);
        } catch(e) { 
            const docpath = context.fspath ? context.fspath : "unknown";
            var errstack = e.stack ? e.stack : e;
            throw new Error(`Error with Handlebars in file ${docpath} ${errstack}`);
        }
    }

    renderSync(context: RenderingContext) {
        try {
            const template = Handlebars.compile(
                context.body ? context.body : context.content
            );
            return template(context.metadata);
        } catch(e) { 
            const docpath = context.fspath ? context.fspath : "unknown";
            var errstack = e.stack ? e.stack : e;
            throw new Error(`Error with Handlebars in file ${docpath} ${errstack}`);
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
            throw new Error(`HandlebarsRenderer does not render files with this extension ${context.fspath}`);
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
