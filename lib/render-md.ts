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

/**
 * Markdown rendering using the markdown-it package.
 */
export class MarkdownRenderer extends Renderer {
    constructor() {
        super(".html.md", /^(.*\.html)\.(md)$|^(.*)\.(md)$/);
        md = mdit(mditConfig);
    }

    /**
     * Initializes a Markdown-IT instance with a new configuration,
     * replacing the default instance with the default configuration.
     *
     * @param newConfig 
     * @returns 
     */
    configuration(newConfig) {
        md = mdit(newConfig);
        return this;
    }

    /**
     * Adds a MarkdownIT plugin by calling the underlying `use` method.
     *
     * @param mditPlugin 
     * @param options 
     * @returns 
     */
    use(mditPlugin, options) {
        md.use(mditPlugin, options);
        return this;
    }

    /**
     * Allows extending the rendering rules by exposing
     * the `md.renderer.rules` array.
     */
    get rendererRules() {
        return md.renderer.rules;
    }
  
    renderSync(context: RenderingContext): string {
        // console.log('MarkdownRenderer renderSync '+ text);
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`MD renderSync no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(`Markdown renderSync `, context);
            const ret = md.render(
                toRender
            );
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
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`MD render no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(`Markdown render `, context);
            const rendered = (md.render(
                toRender
            ));
            // console.log(rendered);
            return rendered;
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Markdown in file ${docpath} because ${e}`);
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
        // console.log(`renderFormat ${context}`);
        if (!this.match(context.fspath)) {
            throw new Error(`MarkdownRenderer does not render files with this extension ${context.fspath}`);
        }
        return RenderingFormat.HTML;
    }
}
