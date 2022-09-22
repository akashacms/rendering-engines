"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const mditConfig = {
    html: true,
    xhtmlOut: true,
    breaks: false,
    // langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify: true,
    typographer: false,
    // Highlighter function. Should return escaped html,
    // or '' if input not changed
    highlight: function ( /*str, , lang*/) { return ''; }
};
const markdown_it_1 = __importDefault(require("markdown-it"));
var md;
class MarkdownRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.md", /^(.*\.html)\.(md)$/);
        md = (0, markdown_it_1.default)(mditConfig);
    }
    configuration(newConfig) {
        md = (0, markdown_it_1.default)(newConfig);
        return this;
    }
    use(mditPlugin, options) {
        md.use(mditPlugin, options);
        return this;
    }
    renderSync(context) {
        // console.log('MarkdownRenderer renderSync '+ text);
        try {
            const ret = md.render(context.content);
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
        return new Promise((resolve, reject) => {
            try {
                resolve(md.render(context.content));
            }
            catch (e) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW1kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1tZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFHSCwrQ0FBMkQ7QUFDM0QseUNBQStEO0FBRS9ELE1BQU0sVUFBVSxHQUFHO0lBQ2YsSUFBSSxFQUFVLElBQUk7SUFDbEIsUUFBUSxFQUFNLElBQUk7SUFDbEIsTUFBTSxFQUFRLEtBQUs7SUFDbkIsdUVBQXVFO0lBQ3ZFLE9BQU8sRUFBTyxJQUFJO0lBQ2xCLFdBQVcsRUFBRyxLQUFLO0lBRW5CLG9EQUFvRDtJQUNwRCw2QkFBNkI7SUFDN0IsU0FBUyxFQUFFLFdBQVUsZUFBZSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2RCxDQUFDO0FBRUYsOERBQThDO0FBQzlDLElBQUksRUFBRSxDQUFDO0FBRVAsTUFBYSxnQkFBaUIsU0FBUSxzQkFBUTtJQUMxQztRQUNJLEtBQUssQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN4QyxFQUFFLEdBQUcsSUFBQSxxQkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBUztRQUNuQixFQUFFLEdBQUcsSUFBQSxxQkFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU87UUFDbkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUF5QjtRQUNoQyxxREFBcUQ7UUFDckQsSUFBSTtZQUNBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLG9CQUFvQjtZQUNwQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsK0JBQStCLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCO1FBQ2xDLDBDQUEwQztRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUk7Z0JBQ0EsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDdkM7WUFBQyxPQUFNLENBQUMsRUFBRTtnQkFDUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLCtCQUErQixPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDN0UsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2Y7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDRixhQUFhLENBQUMsT0FBeUI7UUFDcEMsT0FBTyxJQUFBLDhCQUFnQixFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBeUI7UUFDbEMsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDhEQUE4RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNuRztRQUNELE9BQU8sMEJBQWUsQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBOURELDRDQThEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMTkgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5jb25zdCBtZGl0Q29uZmlnID0ge1xuICAgIGh0bWw6ICAgICAgICAgdHJ1ZSwgICAgICAgICAvLyBFbmFibGUgaHRtbCB0YWdzIGluIHNvdXJjZVxuICAgIHhodG1sT3V0OiAgICAgdHJ1ZSwgICAgICAgICAvLyBVc2UgJy8nIHRvIGNsb3NlIHNpbmdsZSB0YWdzICg8YnIgLz4pXG4gICAgYnJlYWtzOiAgICAgICBmYWxzZSwgICAgICAgIC8vIENvbnZlcnQgJ1xcbicgaW4gcGFyYWdyYXBocyBpbnRvIDxicj5cbiAgICAvLyBsYW5nUHJlZml4OiAgICdsYW5ndWFnZS0nLCAgLy8gQ1NTIGxhbmd1YWdlIHByZWZpeCBmb3IgZmVuY2VkIGJsb2Nrc1xuICAgIGxpbmtpZnk6ICAgICAgdHJ1ZSwgICAgICAgICAvLyBBdXRvY29udmVydCB1cmwtbGlrZSB0ZXh0cyB0byBsaW5rc1xuICAgIHR5cG9ncmFwaGVyOiAgZmFsc2UsICAgICAgICAvLyBFbmFibGUgc21hcnR5cGFudHMgYW5kIG90aGVyIHN3ZWV0IHRyYW5zZm9ybXNcbiAgXG4gICAgLy8gSGlnaGxpZ2h0ZXIgZnVuY3Rpb24uIFNob3VsZCByZXR1cm4gZXNjYXBlZCBodG1sLFxuICAgIC8vIG9yICcnIGlmIGlucHV0IG5vdCBjaGFuZ2VkXG4gICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoLypzdHIsICwgbGFuZyovKSB7IHJldHVybiAnJzsgfVxufTtcblxuaW1wb3J0IHsgZGVmYXVsdCBhcyBtZGl0IH0gZnJvbSAnbWFya2Rvd24taXQnO1xudmFyIG1kO1xuXG5leHBvcnQgY2xhc3MgTWFya2Rvd25SZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5tZFwiLCAvXiguKlxcLmh0bWwpXFwuKG1kKSQvKTtcbiAgICAgICAgbWQgPSBtZGl0KG1kaXRDb25maWcpO1xuICAgIH1cbiAgXG4gICAgY29uZmlndXJhdGlvbihuZXdDb25maWcpIHtcbiAgICAgICAgbWQgPSBtZGl0KG5ld0NvbmZpZyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgXG4gICAgdXNlKG1kaXRQbHVnaW4sIG9wdGlvbnMpIHtcbiAgICAgICAgbWQudXNlKG1kaXRQbHVnaW4sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IHN0cmluZyB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdNYXJrZG93blJlbmRlcmVyIHJlbmRlclN5bmMgJysgdGV4dCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXQgPSBtZC5yZW5kZXIoY29udGV4dC5jb250ZW50KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldCk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE1hcmtkb3duIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlICR7ZX1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG4gIFxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01hcmtkb3duUmVuZGVyZXIgcmVuZGVyJyk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobWQucmVuZGVyKGNvbnRleHQuY29udGVudCkpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggTWFya2Rvd24gaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2UgJHtlfWApO1xuICAgICAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBwYXJzZU1ldGFkYXRhKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBSZW5kZXJpbmdDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRnJvbnRtYXR0ZXIoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybWF0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlckZvcm1hdCAke2NvbnRleHR9YCk7XG4gICAgICAgIGlmICghdGhpcy5tYXRjaChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWFya2Rvd25SZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICB9XG59XG4iXX0=