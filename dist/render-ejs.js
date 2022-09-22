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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EJSRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const ejs = __importStar(require("ejs"));
// TODO support .php.ejs
class EJSRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.ejs", /^(.*\.html|.*\.php)\.(ejs)$/);
    }
    // This was for an attempt to list the directories to search when
    // satisfying an "include" EJS tag.  This could have been a way
    // to circumvent <partial> tags
    getEJSOptions(fspath) {
        const ejsOptions = {
            rmWhitespace: true,
            filename: fspath,
            // cache: true,
            views: []
        };
        // console.log(`getEJSOptions `, this);
        if (!this.config)
            throw new Error(`getEJSOptions no config`);
        const layoutsMounted = this.layoutDirs;
        const partialsMounted = this.partialDirs;
        const loadFrom = partialsMounted
            ? partialsMounted.concat(layoutsMounted)
            : layoutsMounted;
        // console.log(`getEJSOptions loadFrom `, loadFrom);
        if (loadFrom)
            ejsOptions.views = loadFrom;
        return ejsOptions;
    }
    // According to the EJS documentation, the template will
    // be automatically cached by EJS.
    compiledTemplate(text, docInfo) {
        let opts = this.getEJSOptions(docInfo ? docInfo.fspath : undefined);
        return {
            template: ejs.compile(text, opts),
            options: opts
        };
    }
    renderSync(context) {
        let opts = this.getEJSOptions(context.fspath ? context.fspath : undefined);
        // console.log(`render  ${text} ${metadata} ${opts}`);
        try {
            return ejs.render(context.content, context.metadata, opts);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with EJS in file ${docpath} because of ${e}`);
            err.cause = e;
            throw err;
        }
        // const { template, opts } = this.compiledTemplate(text, vpinfo);
        // return template(metadata, opts);
    }
    async render(context) {
        /* return Promise.resolve(ejs.render(text, metadata)); */
        return new Promise((resolve, reject) => {
            try {
                let opts = this.getEJSOptions(context.fspath ? context.fspath : undefined);
                // console.log(`render async ${context.content} ${context.metadata} ${opts}`);
                resolve(ejs.render(context.content, context.metadata, opts));
                // const { template, opts } = this.compiledTemplate(text, vpinfo);
                // resolve(template(metadata, opts));
            }
            catch (e) {
                const docpath = context.fspath ? context.fspath : "unknown";
                const err = new Error(`Error with EJS in file ${docpath} because of ${e}`);
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
        if (!this.match(context.fspath)) {
            throw new Error(`EJSRenderer does not render files with this extension ${context.fspath}`);
        }
        if (/\.php\.ejs$/.test(context.fspath)) {
            return index_js_1.RenderingFormat.PHP;
        }
        else {
            return index_js_1.RenderingFormat.HTML;
        }
    }
    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        if (/\.php\.ejs$/.test(fpath))
            return false;
        else
            return true;
    }
}
exports.EJSRenderer = EJSRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWVqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItZWpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0gsK0NBQTJEO0FBQzNELHlDQUErRDtBQUUvRCx5Q0FBMkI7QUFHM0Isd0JBQXdCO0FBQ3hCLE1BQWEsV0FBWSxTQUFRLHNCQUFRO0lBQ3JDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxpRUFBaUU7SUFDakUsK0RBQStEO0lBQy9ELCtCQUErQjtJQUUvQixhQUFhLENBQUMsTUFBTTtRQUVoQixNQUFNLFVBQVUsR0FBRztZQUNmLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLGVBQWU7WUFDZixLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUM7UUFFRix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzdELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdkMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxNQUFNLFFBQVEsR0FBRyxlQUFlO1lBQ2hCLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUN4QyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ2pDLG9EQUFvRDtRQUNwRCxJQUFJLFFBQVE7WUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUMxQyxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELGtDQUFrQztJQUVsQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTztRQUMxQixJQUFJLElBQUksR0FB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QUFLO1FBQ2IsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixPQUFPLEtBQUssQ0FBQzs7WUFFYixPQUFPLElBQUksQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUExR0Qsa0NBMEdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxOSBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmltcG9ydCAqIGFzIGVqcyBmcm9tICdlanMnO1xuaW1wb3J0ICogYXMgZWpzdXRpbHMgZnJvbSAnZWpzL2xpYi91dGlscy5qcyc7XG5cbi8vIFRPRE8gc3VwcG9ydCAucGhwLmVqc1xuZXhwb3J0IGNsYXNzIEVKU1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIi5odG1sLmVqc1wiLCAvXiguKlxcLmh0bWx8LipcXC5waHApXFwuKGVqcykkLyk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyB3YXMgZm9yIGFuIGF0dGVtcHQgdG8gbGlzdCB0aGUgZGlyZWN0b3JpZXMgdG8gc2VhcmNoIHdoZW5cbiAgICAvLyBzYXRpc2Z5aW5nIGFuIFwiaW5jbHVkZVwiIEVKUyB0YWcuICBUaGlzIGNvdWxkIGhhdmUgYmVlbiBhIHdheVxuICAgIC8vIHRvIGNpcmN1bXZlbnQgPHBhcnRpYWw+IHRhZ3NcblxuICAgIGdldEVKU09wdGlvbnMoZnNwYXRoKSB7XG5cbiAgICAgICAgY29uc3QgZWpzT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJtV2hpdGVzcGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBmc3BhdGgsXG4gICAgICAgICAgICAvLyBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBnZXRFSlNPcHRpb25zIGAsIHRoaXMpO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnKSB0aHJvdyBuZXcgRXJyb3IoYGdldEVKU09wdGlvbnMgbm8gY29uZmlnYCk7XG4gICAgICAgIGNvbnN0IGxheW91dHNNb3VudGVkID0gdGhpcy5sYXlvdXREaXJzO1xuICAgICAgICBjb25zdCBwYXJ0aWFsc01vdW50ZWQgPSB0aGlzLnBhcnRpYWxEaXJzO1xuICAgICAgICBjb25zdCBsb2FkRnJvbSA9IHBhcnRpYWxzTW91bnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJ0aWFsc01vdW50ZWQuY29uY2F0KGxheW91dHNNb3VudGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBsYXlvdXRzTW91bnRlZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYGdldEVKU09wdGlvbnMgbG9hZEZyb20gYCwgbG9hZEZyb20pO1xuICAgICAgICBpZiAobG9hZEZyb20pIGVqc09wdGlvbnMudmlld3MgPSBsb2FkRnJvbTtcbiAgICAgICAgcmV0dXJuIGVqc09wdGlvbnM7XG4gICAgfVxuXG4gICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBFSlMgZG9jdW1lbnRhdGlvbiwgdGhlIHRlbXBsYXRlIHdpbGxcbiAgICAvLyBiZSBhdXRvbWF0aWNhbGx5IGNhY2hlZCBieSBFSlMuXG5cbiAgICBjb21waWxlZFRlbXBsYXRlKHRleHQsIGRvY0luZm8pIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldEVKU09wdGlvbnMoZG9jSW5mbyA/IGRvY0luZm8uZnNwYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiBlanMuY29tcGlsZSh0ZXh0LCBvcHRzKSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldEVKU09wdGlvbnMoY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXIgICR7dGV4dH0gJHttZXRhZGF0YX0gJHtvcHRzfWApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29udGV4dC5jb250ZW50LCBjb250ZXh0Lm1ldGFkYXRhLCBvcHRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBFSlMgaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2Ugb2YgJHtlfWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnN0IHsgdGVtcGxhdGUsIG9wdHMgfSA9IHRoaXMuY29tcGlsZWRUZW1wbGF0ZSh0ZXh0LCB2cGluZm8pO1xuICAgICAgICAvLyByZXR1cm4gdGVtcGxhdGUobWV0YWRhdGEsIG9wdHMpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgLyogcmV0dXJuIFByb21pc2UucmVzb2x2ZShlanMucmVuZGVyKHRleHQsIG1ldGFkYXRhKSk7ICovXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5nZXRFSlNPcHRpb25zKGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXIgYXN5bmMgJHtjb250ZXh0LmNvbnRlbnR9ICR7Y29udGV4dC5tZXRhZGF0YX0gJHtvcHRzfWApO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWpzLnJlbmRlcihjb250ZXh0LmNvbnRlbnQsIGNvbnRleHQubWV0YWRhdGEsIG9wdHMpKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB7IHRlbXBsYXRlLCBvcHRzIH0gPSB0aGlzLmNvbXBpbGVkVGVtcGxhdGUodGV4dCwgdnBpbmZvKTtcbiAgICAgICAgICAgICAgICAvLyByZXNvbHZlKHRlbXBsYXRlKG1ldGFkYXRhLCBvcHRzKSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBFSlMgaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2Ugb2YgJHtlfWApO1xuICAgICAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVKU1JlbmRlcmVyIGRvZXMgbm90IHJlbmRlciBmaWxlcyB3aXRoIHRoaXMgZXh0ZW5zaW9uICR7Y29udGV4dC5mc3BhdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC9cXC5waHBcXC5lanMkLy50ZXN0KGNvbnRleHQuZnNwYXRoKSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlbmRlcmluZ0Zvcm1hdC5QSFA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBjYW5ub3QgYWxsb3cgUEhQIGNvZGUgdG8gcnVuIHRocm91Z2ggTWFoYWJodXRhLlxuICAgICAqL1xuICAgIGRvTWFoYWJodXRhKGZwYXRoKSB7XG4gICAgICAgIGlmICgvXFwucGhwXFwuZWpzJC8udGVzdChmcGF0aCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiJdfQ==