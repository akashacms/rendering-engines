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

import * as path from 'path';
import { HTMLRenderer } from './HTMLRenderer.js';
import { RenderingContext } from './index.js';

const mditConfig = {
    html:         true,         // Enable html tags in source
    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    // langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      true,         // Autoconvert url-like texts to links
    typographer:  false,        // Enable smartypants and other sweet transforms
  
    // Highlighter function. Should return escaped html,
    // or '' if input not changed
    highlight: function (/*str, , lang*/) { return ''; }
};

import { default as mdit } from 'markdown-it';
var md;

export class MarkdownRenderer extends HTMLRenderer {
    constructor() {
        super(".html.md", /^(.*\.html)\.(md)$/);
        md = mdit(mditConfig);
    }
  
    configuration(newConfig) {
        md = mdit(newConfig);
        return this;
    }
  
    use(mditPlugin, options) {
        md.use(mditPlugin, options);
        return this;
    }
  
    renderSync(context: RenderingContext /* text, metadata, docInfo */) {
        // console.log('MarkdownRenderer renderSync '+ text);
        try {
            const ret = md.render(context.content);
            // console.log(ret);
            return ret;
        } catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Markdown in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }
  
    render(context: RenderingContext /* text, metadata, docInfo */) {
        // console.log('MarkdownRenderer render');
        return new Promise((resolve, reject) => {
            try {
                resolve(md.render(context.content));
            } catch(e) {
                const docpath = context.fspath ? context.fspath : "unknown";
                const err = new Error(`Error with Markdown in file ${docpath}`);
                err.cause = e;
                reject(err);
            }
        });
    }
}
