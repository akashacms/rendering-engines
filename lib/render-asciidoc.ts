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

// import * as path from 'path';
// import * as util from 'util';
import { HTMLRenderer } from './HTMLRenderer.js';
import { RenderingContext } from './index';

import { default as AsciiDoctor } from '@asciidoctor/core';
const asciidoctor = AsciiDoctor();

const _renderer_doctype = Symbol('doctype');

export class AsciidocRenderer extends HTMLRenderer {
    constructor() {
        super(".html.adoc", /^(.*\.html)\.(adoc)$/);
        this[_renderer_doctype] = 'article';
    }

    configuration(options) {
        if (options && options.doctype) {
            this[_renderer_doctype] = options.doctype;
        }
        return this;
    }

    // http://asciidoctor.org/docs/user-manual/#ruby-api-options
    // That lists all the options which can be set
    // Of interest are:
    //     base_dir - controls where the include directive pulls files
    //     safe - enables safe mode (?? what does that mean ??)
    //     template_dir - controls where template files are found
    convert(context: RenderingContext) {
        var options = context.metadata.asciidoctor ? context.metadata.asciidoctor : {
            doctype: this[_renderer_doctype]
        };
        // AsciiDoctor.js doesn't allow non-String/Number items in 
        // the attributes object.  That means we cannot simply use
        // the metadata as-is, but have to select out the items to include.
        //
        // First, this steps through the keys in metadata object looking
        // for the items that are strings or numbers.  That limits the
        // data items to what AsciiDoctor supports.
        //
        // Second, we skip the 'title' item because AsciiDoctor has
        // special treatment for that attribute.
        options.attributes = {};
        for (let key in context.metadata) {
            if ((typeof context.metadata[key] === 'string'
              || typeof context.metadata[key] === 'number')
              && key !== 'title') {
                options.attributes[key] = context.metadata[key];
            }
        }
        // console.log(`convert ${util.inspect(options)}`);
        return asciidoctor.convert(context.content, options);
    }

    renderSync(context: RenderingContext) {
        // console.log('AsciidocRenderer renderSync '+ text);
        var ret = this.convert(context /* .content, context.metadata */);
        // console.log(ret);
        return ret;
    }

    render(context: RenderingContext) {
        // console.log('AsciidocRenderer render');
        return new Promise((resolve, reject) => {
            try {
                resolve(this.convert(context /* .content, context.metadata */));
            } catch(e) {
                reject(e);
            }
        });
    }
}
