"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const mditConfig = {
    html: true, // Enable html tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />)
    breaks: false, // Convert '\n' in paragraphs into <br>
    // langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify: true, // Autoconvert url-like texts to links
    typographer: false, // Enable smartypants and other sweet transforms
    // Highlighter function. Should return escaped html,
    // or '' if input not changed
    highlight: function ( /*str, , lang*/) { return ''; }
};
const markdown_it_1 = __importDefault(require("markdown-it"));
var md;
/**
 * Markdown rendering using the markdown-it package.
 */
class MarkdownRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.md", /^(.*\.html)\.(md)$|^(.*)\.(md)$/);
        md = (0, markdown_it_1.default)(mditConfig);
    }
    /**
     * Initializes a Markdown-IT instance with a new configuration,
     * replacing the default instance with the default configuration.
     *
     * @param newConfig
     * @returns
     */
    configuration(newConfig) {
        md = (0, markdown_it_1.default)(newConfig);
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
    renderSync(context) {
        // console.log('MarkdownRenderer renderSync '+ text);
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`MD renderSync no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(`Markdown renderSync `, context);
            const ret = md.render(toRender);
            // console.log(ret);
            return ret;
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Markdown in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }
    async render(context) {
        // console.log('MarkdownRenderer render');
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
console.log(`MD render `, context);
            throw new Error(`MD render no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(`Markdown render `, context);
            const rendered = (md.render(toRender));
            // console.log(rendered);
            return rendered;
        }
        catch (e) {
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
    parseMetadata(context) {
        return (0, Renderer_js_1.parseFrontmatter)(context);
    }
    renderFormat(context) {
        // console.log(`renderFormat ${context}`);
        if (!this.match(context.fspath)) {
            throw new Error(`MarkdownRenderer does not render files with this extension ${context.fspath}`);
        }
        return index_js_1.RenderingFormat.HTML;
    }
}
exports.MarkdownRenderer = MarkdownRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW1kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1tZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFHSCwrQ0FBMkQ7QUFDM0QseUNBQStEO0FBRS9ELE1BQU0sVUFBVSxHQUFHO0lBQ2YsSUFBSSxFQUFVLElBQUksRUFBVSw2QkFBNkI7SUFDekQsUUFBUSxFQUFNLElBQUksRUFBVSx3Q0FBd0M7SUFDcEUsTUFBTSxFQUFRLEtBQUssRUFBUyx1Q0FBdUM7SUFDbkUsdUVBQXVFO0lBQ3ZFLE9BQU8sRUFBTyxJQUFJLEVBQVUsc0NBQXNDO0lBQ2xFLFdBQVcsRUFBRyxLQUFLLEVBQVMsZ0RBQWdEO0lBRTVFLG9EQUFvRDtJQUNwRCw2QkFBNkI7SUFDN0IsU0FBUyxFQUFFLFdBQVUsZUFBZSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2RCxDQUFDO0FBRUYsOERBQThDO0FBQzlDLElBQUksRUFBRSxDQUFDO0FBRVA7O0dBRUc7QUFDSCxNQUFhLGdCQUFpQixTQUFRLHNCQUFRO0lBQzFDO1FBQ0ksS0FBSyxDQUFDLFVBQVUsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3JELEVBQUUsR0FBRyxJQUFBLHFCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxTQUFTO1FBQ25CLEVBQUUsR0FBRyxJQUFBLHFCQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTztRQUNuQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxhQUFhO1FBQ2IsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQXlCO1FBQ2hDLHFEQUFxRDtRQUNyRCxNQUFNLFFBQVEsR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25GLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1FBQy9GLENBQUM7UUFDRCxJQUFJLENBQUM7WUFDRCxnREFBZ0Q7WUFDaEQsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FDakIsUUFBUSxDQUNYLENBQUM7WUFDRixvQkFBb0I7WUFDcEIsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNULE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUF5QjtRQUNsQywwQ0FBMEM7UUFDMUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNuRixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMscUVBQXFFLENBQUMsQ0FBQztRQUMzRixDQUFDO1FBQ0QsSUFBSSxDQUFDO1lBQ0QsNENBQTRDO1lBQzVDLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FDdkIsUUFBUSxDQUNYLENBQUMsQ0FBQztZQUNILHlCQUF5QjtZQUN6QixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO1FBQUMsT0FBTSxDQUFDLEVBQUUsQ0FBQztZQUNSLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0YsYUFBYSxDQUFDLE9BQXlCO1FBQ3BDLE9BQU8sSUFBQSw4QkFBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQXlCO1FBQ2xDLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDhEQUE4RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNwRyxDQUFDO1FBQ0QsT0FBTywwQkFBZSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFsR0QsNENBa0dDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAyMiBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmNvbnN0IG1kaXRDb25maWcgPSB7XG4gICAgaHRtbDogICAgICAgICB0cnVlLCAgICAgICAgIC8vIEVuYWJsZSBodG1sIHRhZ3MgaW4gc291cmNlXG4gICAgeGh0bWxPdXQ6ICAgICB0cnVlLCAgICAgICAgIC8vIFVzZSAnLycgdG8gY2xvc2Ugc2luZ2xlIHRhZ3MgKDxiciAvPilcbiAgICBicmVha3M6ICAgICAgIGZhbHNlLCAgICAgICAgLy8gQ29udmVydCAnXFxuJyBpbiBwYXJhZ3JhcGhzIGludG8gPGJyPlxuICAgIC8vIGxhbmdQcmVmaXg6ICAgJ2xhbmd1YWdlLScsICAvLyBDU1MgbGFuZ3VhZ2UgcHJlZml4IGZvciBmZW5jZWQgYmxvY2tzXG4gICAgbGlua2lmeTogICAgICB0cnVlLCAgICAgICAgIC8vIEF1dG9jb252ZXJ0IHVybC1saWtlIHRleHRzIHRvIGxpbmtzXG4gICAgdHlwb2dyYXBoZXI6ICBmYWxzZSwgICAgICAgIC8vIEVuYWJsZSBzbWFydHlwYW50cyBhbmQgb3RoZXIgc3dlZXQgdHJhbnNmb3Jtc1xuICBcbiAgICAvLyBIaWdobGlnaHRlciBmdW5jdGlvbi4gU2hvdWxkIHJldHVybiBlc2NhcGVkIGh0bWwsXG4gICAgLy8gb3IgJycgaWYgaW5wdXQgbm90IGNoYW5nZWRcbiAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uICgvKnN0ciwgLCBsYW5nKi8pIHsgcmV0dXJuICcnOyB9XG59O1xuXG5pbXBvcnQgeyBkZWZhdWx0IGFzIG1kaXQgfSBmcm9tICdtYXJrZG93bi1pdCc7XG52YXIgbWQ7XG5cbi8qKlxuICogTWFya2Rvd24gcmVuZGVyaW5nIHVzaW5nIHRoZSBtYXJrZG93bi1pdCBwYWNrYWdlLlxuICovXG5leHBvcnQgY2xhc3MgTWFya2Rvd25SZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5tZFwiLCAvXiguKlxcLmh0bWwpXFwuKG1kKSR8XiguKilcXC4obWQpJC8pO1xuICAgICAgICBtZCA9IG1kaXQobWRpdENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBNYXJrZG93bi1JVCBpbnN0YW5jZSB3aXRoIGEgbmV3IGNvbmZpZ3VyYXRpb24sXG4gICAgICogcmVwbGFjaW5nIHRoZSBkZWZhdWx0IGluc3RhbmNlIHdpdGggdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuZXdDb25maWcgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgY29uZmlndXJhdGlvbihuZXdDb25maWcpIHtcbiAgICAgICAgbWQgPSBtZGl0KG5ld0NvbmZpZyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBNYXJrZG93bklUIHBsdWdpbiBieSBjYWxsaW5nIHRoZSB1bmRlcmx5aW5nIGB1c2VgIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZGl0UGx1Z2luIFxuICAgICAqIEBwYXJhbSBvcHRpb25zIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHVzZShtZGl0UGx1Z2luLCBvcHRpb25zKSB7XG4gICAgICAgIG1kLnVzZShtZGl0UGx1Z2luLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIGV4dGVuZGluZyB0aGUgcmVuZGVyaW5nIHJ1bGVzIGJ5IGV4cG9zaW5nXG4gICAgICogdGhlIGBtZC5yZW5kZXJlci5ydWxlc2AgYXJyYXkuXG4gICAgICovXG4gICAgZ2V0IHJlbmRlcmVyUnVsZXMoKSB7XG4gICAgICAgIHJldHVybiBtZC5yZW5kZXJlci5ydWxlcztcbiAgICB9XG4gIFxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IHN0cmluZyB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdNYXJrZG93blJlbmRlcmVyIHJlbmRlclN5bmMgJysgdGV4dCk7XG4gICAgICAgIGNvbnN0IHRvUmVuZGVyID0gdHlwZW9mIGNvbnRleHQuYm9keSA9PT0gJ3N0cmluZycgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnQ7XG4gICAgICAgIGlmICh0eXBlb2YgdG9SZW5kZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1EIHJlbmRlclN5bmMgbm8gY29udGV4dC5ib2R5IG9yIGNvbnRleHQuY29udGVudCBzdXBwbGllZCBmb3IgcmVuZGVyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBNYXJrZG93biByZW5kZXJTeW5jIGAsIGNvbnRleHQpO1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gbWQucmVuZGVyKFxuICAgICAgICAgICAgICAgIHRvUmVuZGVyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggTWFya2Rvd24gaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2UgJHtlfWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cbiAgXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFya2Rvd25SZW5kZXJlciByZW5kZXInKTtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTUQgcmVuZGVyIG5vIGNvbnRleHQuYm9keSBvciBjb250ZXh0LmNvbnRlbnQgc3VwcGxpZWQgZm9yIHJlbmRlcmluZ2ApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgTWFya2Rvd24gcmVuZGVyIGAsIGNvbnRleHQpO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSAobWQucmVuZGVyKFxuICAgICAgICAgICAgICAgIHRvUmVuZGVyXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlbmRlcmVkKTtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXJlZDtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE1hcmtkb3duIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlICR7ZX1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBmcm9udG1hdHRlciBpbiB0aGUgZm9ybWF0IG9mIGxpbmVzIG9mIGRhc2hlc1xuICAgICAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXJGb3JtYXQgJHtjb250ZXh0fWApO1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hcmtkb3duUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxufVxuIl19
