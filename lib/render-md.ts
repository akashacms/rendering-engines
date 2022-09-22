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

import * as path from 'path';
import { Renderer, parseFrontmatter } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';

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

export class MarkdownRenderer extends Renderer {
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
  
    renderSync(context: RenderingContext): string {
        // console.log('MarkdownRenderer renderSync '+ text);
        try {
            const ret = md.render(context.content);
            // console.log(ret);
            return ret;
        } catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Markdown in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }
  
    async render(context: RenderingContext): Promise<string> {
        // console.log('MarkdownRenderer render');
        return new Promise((resolve, reject) => {
            try {
                resolve(md.render(context.content));
            } catch(e) {
                const docpath = context.fspath ? context.fspath : "unknown";
                const err = new Error(`Error with Markdown in file ${docpath} because ${e}`);
                err.cause = e;
                reject(err);
            }
        });
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
        // console.log(`renderFormat ${context}`);
        if (!this.match(context.fspath)) {
            throw new Error(`MarkdownRenderer does not render files with this extension ${context.fspath}`);
        }
        return RenderingFormat.HTML;
    }
}
