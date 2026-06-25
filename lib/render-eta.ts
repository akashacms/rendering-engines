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

import path from "node:path";
import util from 'node:util';
import { Renderer, parseFrontmatter } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';

import { Eta } from "eta";

export class ETARenderer extends Renderer {

    #eta;

    constructor() {
        super(".html.eta", /^(.*\.html)\.(eta)$|^(.*)\.(eta)$/);
        this.#eta = new Eta();
    }

    renderSync(context: RenderingContext) {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`ETARenderer renderSync no context.body or context.content supplied for rendering`);
        }
        // console.log(`render  ${text} ${metadata} ${opts}`);
        try {
            const ret = this.#eta.renderString(
                toRender,
                context.metadata);
            // console.log(`ETARenderer renderSync ${context.fspath} ${util.inspect(context.metadata)} ==> ${ret}`);
            return ret;
        } catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with ETARenderer in file ${docpath} because of ${e}`);
            err.cause = e;
            throw err;
        }
    }

    async render(context: RenderingContext): Promise<string> {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`ETARenderer no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(`render async ${context.content} ${context.metadata} ${opts}`);
            const ret = await this.#eta.renderStringAsync(
                toRender,
                context.metadata);
            // console.log(`ETARenderer render ${context.fspath} ${util.inspect(context.metadata)} ==> ${ret}`);
            return ret;
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with ETARenderer in file ${docpath} because of ${e}`);
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
            throw new Error(`ETARenderer does not render files with this extension ${context.fspath}`);
        }
        if (/\.php\.eta$/.test(context.fspath)) {
            return RenderingFormat.PHP;
        } else {
            return RenderingFormat.HTML;
        }
    }

    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        if (/\.php\.eta$/.test(fpath))
            return false;
        else
            return true;
    }
}
