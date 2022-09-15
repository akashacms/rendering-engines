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
const HTMLRenderer_js_1 = require("./HTMLRenderer.js");
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
class MarkdownRenderer extends HTMLRenderer_js_1.HTMLRenderer {
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
    renderSync(context /* text, metadata, docInfo */) {
        // console.log('MarkdownRenderer renderSync '+ text);
        try {
            const ret = md.render(context.content);
            // console.log(ret);
            return ret;
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Markdown in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }
    render(context /* text, metadata, docInfo */) {
        // console.log('MarkdownRenderer render');
        return new Promise((resolve, reject) => {
            try {
                resolve(md.render(context.content));
            }
            catch (e) {
                const docpath = context.fspath ? context.fspath : "unknown";
                const err = new Error(`Error with Markdown in file ${docpath}`);
                err.cause = e;
                reject(err);
            }
        });
    }
}
exports.MarkdownRenderer = MarkdownRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW1kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1tZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFHSCx1REFBaUQ7QUFHakQsTUFBTSxVQUFVLEdBQUc7SUFDZixJQUFJLEVBQVUsSUFBSTtJQUNsQixRQUFRLEVBQU0sSUFBSTtJQUNsQixNQUFNLEVBQVEsS0FBSztJQUNuQix1RUFBdUU7SUFDdkUsT0FBTyxFQUFPLElBQUk7SUFDbEIsV0FBVyxFQUFHLEtBQUs7SUFFbkIsb0RBQW9EO0lBQ3BELDZCQUE2QjtJQUM3QixTQUFTLEVBQUUsV0FBVSxlQUFlLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3ZELENBQUM7QUFFRiw4REFBOEM7QUFDOUMsSUFBSSxFQUFFLENBQUM7QUFFUCxNQUFhLGdCQUFpQixTQUFRLDhCQUFZO0lBQzlDO1FBQ0ksS0FBSyxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsR0FBRyxJQUFBLHFCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGFBQWEsQ0FBQyxTQUFTO1FBQ25CLEVBQUUsR0FBRyxJQUFBLHFCQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTztRQUNuQixFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQzlELHFEQUFxRDtRQUNyRCxJQUFJO1lBQ0EsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsb0JBQW9CO1lBQ3BCLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNoRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE1BQU0sR0FBRyxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQzFELDBDQUEwQztRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUk7Z0JBQ0EsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDdkM7WUFBQyxPQUFNLENBQUMsRUFBRTtnQkFDUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLCtCQUErQixPQUFPLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDZjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBM0NELDRDQTJDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMTkgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgSFRNTFJlbmRlcmVyIH0gZnJvbSAnLi9IVE1MUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5jb25zdCBtZGl0Q29uZmlnID0ge1xuICAgIGh0bWw6ICAgICAgICAgdHJ1ZSwgICAgICAgICAvLyBFbmFibGUgaHRtbCB0YWdzIGluIHNvdXJjZVxuICAgIHhodG1sT3V0OiAgICAgdHJ1ZSwgICAgICAgICAvLyBVc2UgJy8nIHRvIGNsb3NlIHNpbmdsZSB0YWdzICg8YnIgLz4pXG4gICAgYnJlYWtzOiAgICAgICBmYWxzZSwgICAgICAgIC8vIENvbnZlcnQgJ1xcbicgaW4gcGFyYWdyYXBocyBpbnRvIDxicj5cbiAgICAvLyBsYW5nUHJlZml4OiAgICdsYW5ndWFnZS0nLCAgLy8gQ1NTIGxhbmd1YWdlIHByZWZpeCBmb3IgZmVuY2VkIGJsb2Nrc1xuICAgIGxpbmtpZnk6ICAgICAgdHJ1ZSwgICAgICAgICAvLyBBdXRvY29udmVydCB1cmwtbGlrZSB0ZXh0cyB0byBsaW5rc1xuICAgIHR5cG9ncmFwaGVyOiAgZmFsc2UsICAgICAgICAvLyBFbmFibGUgc21hcnR5cGFudHMgYW5kIG90aGVyIHN3ZWV0IHRyYW5zZm9ybXNcbiAgXG4gICAgLy8gSGlnaGxpZ2h0ZXIgZnVuY3Rpb24uIFNob3VsZCByZXR1cm4gZXNjYXBlZCBodG1sLFxuICAgIC8vIG9yICcnIGlmIGlucHV0IG5vdCBjaGFuZ2VkXG4gICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoLypzdHIsICwgbGFuZyovKSB7IHJldHVybiAnJzsgfVxufTtcblxuaW1wb3J0IHsgZGVmYXVsdCBhcyBtZGl0IH0gZnJvbSAnbWFya2Rvd24taXQnO1xudmFyIG1kO1xuXG5leHBvcnQgY2xhc3MgTWFya2Rvd25SZW5kZXJlciBleHRlbmRzIEhUTUxSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwubWRcIiwgL14oLipcXC5odG1sKVxcLihtZCkkLyk7XG4gICAgICAgIG1kID0gbWRpdChtZGl0Q29uZmlnKTtcbiAgICB9XG4gIFxuICAgIGNvbmZpZ3VyYXRpb24obmV3Q29uZmlnKSB7XG4gICAgICAgIG1kID0gbWRpdChuZXdDb25maWcpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHVzZShtZGl0UGx1Z2luLCBvcHRpb25zKSB7XG4gICAgICAgIG1kLnVzZShtZGl0UGx1Z2luLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICBcbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQgLyogdGV4dCwgbWV0YWRhdGEsIGRvY0luZm8gKi8pIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01hcmtkb3duUmVuZGVyZXIgcmVuZGVyU3luYyAnKyB0ZXh0KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IG1kLnJlbmRlcihjb250ZXh0LmNvbnRlbnQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggTWFya2Rvd24gaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuICBcbiAgICByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCAvKiB0ZXh0LCBtZXRhZGF0YSwgZG9jSW5mbyAqLykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFya2Rvd25SZW5kZXJlciByZW5kZXInKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShtZC5yZW5kZXIoY29udGV4dC5jb250ZW50KSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBNYXJrZG93biBpbiBmaWxlICR7ZG9jcGF0aH1gKTtcbiAgICAgICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=