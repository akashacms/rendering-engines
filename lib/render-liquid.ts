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
import { HTMLRenderer } from './HTMLRenderer.js';
import { RenderingContext } from './index.js';

import { Liquid } from 'liquidjs';

const getMounted = (dir) => {
    if (typeof dir === 'string') return dir;
    else return dir.src;
};

export class LiquidRenderer extends HTMLRenderer {
    constructor() {
        super('.html.liquid', /^(.*\.html)\.(liquid)$/);
    }

    async render(context: RenderingContext /* text, metadata, docInfo */) {
        try {
            const partialsMounted = this.partialDirs.map(getMounted);
            const engine    = new Liquid({
                partials: partialsMounted,
                extname: '.liquid'
            });
            return await engine.parseAndRender(context.content, context.metadata);
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Liquid in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }

    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        return true;
    }
}
