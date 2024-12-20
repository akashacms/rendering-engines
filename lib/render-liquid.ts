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

import { Liquid } from 'liquidjs';

export class LiquidRenderer extends Renderer {
    constructor() {
        super('.html.liquid', /^(.*\.html)\.(liquid)$|^(.*)\.(liquid)$/);
    }

    async render(context: RenderingContext): Promise<string> {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`Liquid render no context.body or context.content supplied for rendering`);
        }
        try {
            const partialsMounted = this.partialDirs;
            const engine    = new Liquid({
                partials: partialsMounted,
                extname: '.liquid'
            });
            return await engine.parseAndRender(
                toRender,
                context.metadata);
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Liquid in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }

    renderSync(context: RenderingContext): string {
        throw new Error(`LiquidJS does not support sync execution`);
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
            throw new Error(`LiquidRenderer does not render files with this extension ${context.fspath}`);
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
