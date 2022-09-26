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
            return ejs.render(context.body ? context.body : context.content, context.metadata, opts);
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
                resolve(ejs.render(context.body ? context.body : context.content, context.metadata, opts));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWVqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItZWpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0gsK0NBQTJEO0FBQzNELHlDQUErRDtBQUUvRCx5Q0FBMkI7QUFHM0Isd0JBQXdCO0FBQ3hCLE1BQWEsV0FBWSxTQUFRLHNCQUFRO0lBQ3JDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxpRUFBaUU7SUFDakUsK0RBQStEO0lBQy9ELCtCQUErQjtJQUUvQixhQUFhLENBQUMsTUFBTTtRQUVoQixNQUFNLFVBQVUsR0FBRztZQUNmLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLGVBQWU7WUFDZixLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUM7UUFFRix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzdELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdkMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxNQUFNLFFBQVEsR0FBRyxlQUFlO1lBQ2hCLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUN4QyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ2pDLG9EQUFvRDtRQUNwRCxJQUFJLFFBQVE7WUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUMxQyxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELGtDQUFrQztJQUVsQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTztRQUMxQixJQUFJLElBQUksR0FB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RUFBRTtZQUNwQyxPQUFPLDBCQUFlLENBQUMsR0FBRyxDQUFDO1NBQzlCO2FBQU07WUFDSCxPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQUs7UUFDYixJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE9BQU8sS0FBSyxDQUFDOztZQUViLE9BQU8sSUFBSSxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQTlHRCxrQ0E4R0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlbmRlcmVyLCBwYXJzZUZyb250bWF0dGVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuaW1wb3J0ICogYXMgZWpzIGZyb20gJ2Vqcyc7XG5pbXBvcnQgKiBhcyBlanN1dGlscyBmcm9tICdlanMvbGliL3V0aWxzLmpzJztcblxuLy8gVE9ETyBzdXBwb3J0IC5waHAuZWpzXG5leHBvcnQgY2xhc3MgRUpTUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwuZWpzXCIsIC9eKC4qXFwuaHRtbHwuKlxcLnBocClcXC4oZWpzKSQvKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHdhcyBmb3IgYW4gYXR0ZW1wdCB0byBsaXN0IHRoZSBkaXJlY3RvcmllcyB0byBzZWFyY2ggd2hlblxuICAgIC8vIHNhdGlzZnlpbmcgYW4gXCJpbmNsdWRlXCIgRUpTIHRhZy4gIFRoaXMgY291bGQgaGF2ZSBiZWVuIGEgd2F5XG4gICAgLy8gdG8gY2lyY3VtdmVudCA8cGFydGlhbD4gdGFnc1xuXG4gICAgZ2V0RUpTT3B0aW9ucyhmc3BhdGgpIHtcblxuICAgICAgICBjb25zdCBlanNPcHRpb25zID0ge1xuICAgICAgICAgICAgcm1XaGl0ZXNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgZmlsZW5hbWU6IGZzcGF0aCxcbiAgICAgICAgICAgIC8vIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgdmlld3M6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGdldEVKU09wdGlvbnMgYCwgdGhpcyk7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcpIHRocm93IG5ldyBFcnJvcihgZ2V0RUpTT3B0aW9ucyBubyBjb25maWdgKTtcbiAgICAgICAgY29uc3QgbGF5b3V0c01vdW50ZWQgPSB0aGlzLmxheW91dERpcnM7XG4gICAgICAgIGNvbnN0IHBhcnRpYWxzTW91bnRlZCA9IHRoaXMucGFydGlhbERpcnM7XG4gICAgICAgIGNvbnN0IGxvYWRGcm9tID0gcGFydGlhbHNNb3VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnRpYWxzTW91bnRlZC5jb25jYXQobGF5b3V0c01vdW50ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGxheW91dHNNb3VudGVkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZ2V0RUpTT3B0aW9ucyBsb2FkRnJvbSBgLCBsb2FkRnJvbSk7XG4gICAgICAgIGlmIChsb2FkRnJvbSkgZWpzT3B0aW9ucy52aWV3cyA9IGxvYWRGcm9tO1xuICAgICAgICByZXR1cm4gZWpzT3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIEVKUyBkb2N1bWVudGF0aW9uLCB0aGUgdGVtcGxhdGUgd2lsbFxuICAgIC8vIGJlIGF1dG9tYXRpY2FsbHkgY2FjaGVkIGJ5IEVKUy5cblxuICAgIGNvbXBpbGVkVGVtcGxhdGUodGV4dCwgZG9jSW5mbykge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhkb2NJbmZvID8gZG9jSW5mby5mc3BhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IGVqcy5jb21waWxlKHRleHQsIG9wdHMpLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlciAgJHt0ZXh0fSAke21ldGFkYXRhfSAke29wdHN9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJvZHkgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgY29udGV4dC5tZXRhZGF0YSwgb3B0cyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggRUpTIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlIG9mICR7ZX1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zdCB7IHRlbXBsYXRlLCBvcHRzIH0gPSB0aGlzLmNvbXBpbGVkVGVtcGxhdGUodGV4dCwgdnBpbmZvKTtcbiAgICAgICAgLy8gcmV0dXJuIHRlbXBsYXRlKG1ldGFkYXRhLCBvcHRzKTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIC8qIHJldHVybiBQcm9taXNlLnJlc29sdmUoZWpzLnJlbmRlcih0ZXh0LCBtZXRhZGF0YSkpOyAqL1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcmVuZGVyIGFzeW5jICR7Y29udGV4dC5jb250ZW50fSAke2NvbnRleHQubWV0YWRhdGF9ICR7b3B0c31gKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGVqcy5yZW5kZXIoXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYm9keSA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5tZXRhZGF0YSwgb3B0cykpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgdGVtcGxhdGUsIG9wdHMgfSA9IHRoaXMuY29tcGlsZWRUZW1wbGF0ZSh0ZXh0LCB2cGluZm8pO1xuICAgICAgICAgICAgICAgIC8vIHJlc29sdmUodGVtcGxhdGUobWV0YWRhdGEsIG9wdHMpKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEVKUyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSBvZiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXRjaChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRUpTUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xcLnBocFxcLmVqcyQvLnRlc3QoY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LlBIUDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIGNhbm5vdCBhbGxvdyBQSFAgY29kZSB0byBydW4gdGhyb3VnaCBNYWhhYmh1dGEuXG4gICAgICovXG4gICAgZG9NYWhhYmh1dGEoZnBhdGgpIHtcbiAgICAgICAgaWYgKC9cXC5waHBcXC5lanMkLy50ZXN0KGZwYXRoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIl19