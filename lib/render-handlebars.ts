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

        const renderer = this;
        Handlebars.registerHelper("partialSync", function(context, options) {
            return renderer.#partialSyncHelper(renderer, context, options);
        });
    }

    /**
     * Handler function for the partialSync helper.
     * 
     * The renderer parameter is present because using
     * this.config did not access the config field, and
     * for some reason this was instead the metadata.
     * Therefore we make sure renderer is available.
     * 
     * @param renderer The Renderer instance 
     * @param context Context provided by Handlebars
     * @param options Handlebars documentation says this will exist
     * @returns String containing the rendering of the template
     */
    #partialSyncHelper(renderer, context, options) {

        /*
         * The Handlebars documentation lies about the
         * parameters to the registerHelper callback function.
         * It describes two parameters, context and options,
         * and that options has a bunch of useful data.
         * Instead the useful data came via context, and
         * the options parameter was undefined.
         * 
         * Here is an example.  Hence, context.fn corresponds
         * to the body of a block helper invocation, and
         * context.hash corresponds to the parameters passed
         * in the helper invocation.
        {
            lookupProperty: [Function: lookupProperty],
            name: 'partialSync',
            hash: { message: 'NESTED MESSAGE', template: 'showmessage.html.njk' },
            fn: [Function: prog] { program: 6, depth: 0, blockParams: 0 },
            inverse: [Function: noop],
            data: {
                root: {
                    title: 'Partial test for Handlebars',
                    layout: 'foo.html.ejs',
                    partial: [AsyncFunction (anonymous)],
                    partialSync: [Function (anonymous)]
                }
            },
            loc: { start: { line: 43, column: 22 }, end: { line: 44, column: 16 } }
        }
         */

        // console.log(`partialSync context `, context);
        // console.log(`partialSync options `, options);
        let template;
        const data = {};

        // Start with copying document metadata
        if (context.data && context.data.root) {
            for (const key in context.data.root) {
                data[key] = context.data.root[key];
                // Should this drop partial & partialSync?
            }
        }
        // Then add in data passed in the invocation
        for (const key in context.hash) {
            // console.log(`partialSync ${key} ${context.hash[key]}`);
            if (key === 'template') {
                template = context.hash[key];
            } else {
                data[key] = context.hash[key];
            }
        }
        // This appears if there is a body to
        // the helper invocation
        if (context.fn) {
            data['partialBody'] = context.fn(this);
        }
        if (!template) {
            throw new Error(`No template supplied for partialSync`);
        }
        // console.log(`partialSync rendering ${template} with `, data);
        const ret = renderer.config.partialSync(template, data);
        // console.log(`partialSync ret `, ret);
        return new Handlebars.SafeString(ret);
    }

    async render(context: RenderingContext): Promise<string> {
        try {
            const template = Handlebars.compile(
                typeof context.body === 'string' ? context.body : context.content
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
                typeof context.body === 'string' ? context.body : context.content
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
