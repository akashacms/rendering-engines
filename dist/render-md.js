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
            const ret = md.render(context.body ? context.body : context.content);
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
                resolve(md.render(context.body ? context.body : context.content));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW1kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1tZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFHSCwrQ0FBMkQ7QUFDM0QseUNBQStEO0FBRS9ELE1BQU0sVUFBVSxHQUFHO0lBQ2YsSUFBSSxFQUFVLElBQUk7SUFDbEIsUUFBUSxFQUFNLElBQUk7SUFDbEIsTUFBTSxFQUFRLEtBQUs7SUFDbkIsdUVBQXVFO0lBQ3ZFLE9BQU8sRUFBTyxJQUFJO0lBQ2xCLFdBQVcsRUFBRyxLQUFLO0lBRW5CLG9EQUFvRDtJQUNwRCw2QkFBNkI7SUFDN0IsU0FBUyxFQUFFLFdBQVUsZUFBZSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2RCxDQUFDO0FBRUYsOERBQThDO0FBQzlDLElBQUksRUFBRSxDQUFDO0FBRVAsTUFBYSxnQkFBaUIsU0FBUSxzQkFBUTtJQUMxQztRQUNJLEtBQUssQ0FBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN4QyxFQUFFLEdBQUcsSUFBQSxxQkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBUztRQUNuQixFQUFFLEdBQUcsSUFBQSxxQkFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU87UUFDbkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUF5QjtRQUNoQyxxREFBcUQ7UUFDckQsSUFBSTtZQUNBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2hELENBQUM7WUFDRixvQkFBb0I7WUFDcEIsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLCtCQUErQixPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3RSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE1BQU0sR0FBRyxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUF5QjtRQUNsQywwQ0FBMEM7UUFDMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJO2dCQUNBLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2hELENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTSxDQUFDLEVBQUU7Z0JBQ1AsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNmO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0YsYUFBYSxDQUFDLE9BQXlCO1FBQ3BDLE9BQU8sSUFBQSw4QkFBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQXlCO1FBQ2xDLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw4REFBOEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDbkc7UUFDRCxPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQWxFRCw0Q0FrRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlbmRlcmVyLCBwYXJzZUZyb250bWF0dGVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuY29uc3QgbWRpdENvbmZpZyA9IHtcbiAgICBodG1sOiAgICAgICAgIHRydWUsICAgICAgICAgLy8gRW5hYmxlIGh0bWwgdGFncyBpbiBzb3VyY2VcbiAgICB4aHRtbE91dDogICAgIHRydWUsICAgICAgICAgLy8gVXNlICcvJyB0byBjbG9zZSBzaW5nbGUgdGFncyAoPGJyIC8+KVxuICAgIGJyZWFrczogICAgICAgZmFsc2UsICAgICAgICAvLyBDb252ZXJ0ICdcXG4nIGluIHBhcmFncmFwaHMgaW50byA8YnI+XG4gICAgLy8gbGFuZ1ByZWZpeDogICAnbGFuZ3VhZ2UtJywgIC8vIENTUyBsYW5ndWFnZSBwcmVmaXggZm9yIGZlbmNlZCBibG9ja3NcbiAgICBsaW5raWZ5OiAgICAgIHRydWUsICAgICAgICAgLy8gQXV0b2NvbnZlcnQgdXJsLWxpa2UgdGV4dHMgdG8gbGlua3NcbiAgICB0eXBvZ3JhcGhlcjogIGZhbHNlLCAgICAgICAgLy8gRW5hYmxlIHNtYXJ0eXBhbnRzIGFuZCBvdGhlciBzd2VldCB0cmFuc2Zvcm1zXG4gIFxuICAgIC8vIEhpZ2hsaWdodGVyIGZ1bmN0aW9uLiBTaG91bGQgcmV0dXJuIGVzY2FwZWQgaHRtbCxcbiAgICAvLyBvciAnJyBpZiBpbnB1dCBub3QgY2hhbmdlZFxuICAgIGhpZ2hsaWdodDogZnVuY3Rpb24gKC8qc3RyLCAsIGxhbmcqLykgeyByZXR1cm4gJyc7IH1cbn07XG5cbmltcG9ydCB7IGRlZmF1bHQgYXMgbWRpdCB9IGZyb20gJ21hcmtkb3duLWl0JztcbnZhciBtZDtcblxuZXhwb3J0IGNsYXNzIE1hcmtkb3duUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwubWRcIiwgL14oLipcXC5odG1sKVxcLihtZCkkLyk7XG4gICAgICAgIG1kID0gbWRpdChtZGl0Q29uZmlnKTtcbiAgICB9XG4gIFxuICAgIGNvbmZpZ3VyYXRpb24obmV3Q29uZmlnKSB7XG4gICAgICAgIG1kID0gbWRpdChuZXdDb25maWcpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIFxuICAgIHVzZShtZGl0UGx1Z2luLCBvcHRpb25zKSB7XG4gICAgICAgIG1kLnVzZShtZGl0UGx1Z2luLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICBcbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBzdHJpbmcge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFya2Rvd25SZW5kZXJlciByZW5kZXJTeW5jICcrIHRleHQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gbWQucmVuZGVyKFxuICAgICAgICAgICAgICAgIGNvbnRleHQuYm9keSA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldCk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE1hcmtkb3duIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlICR7ZX1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG4gIFxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ01hcmtkb3duUmVuZGVyZXIgcmVuZGVyJyk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobWQucmVuZGVyKFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJvZHkgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnRcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE1hcmtkb3duIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBmcm9udG1hdHRlciBpbiB0aGUgZm9ybWF0IG9mIGxpbmVzIG9mIGRhc2hlc1xuICAgICAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXJGb3JtYXQgJHtjb250ZXh0fWApO1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1hcmtkb3duUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxufVxuIl19