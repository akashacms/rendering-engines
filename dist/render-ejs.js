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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EJSRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const ejs = __importStar(require("ejs"));
// TODO support .php.ejs
class EJSRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.ejs", /^(.*\.html|.*\.php)\.(ejs)$|^(.*)\.(ejs)$/);
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
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`EJS renderSync no context.body or context.content supplied for rendering`);
        }
        // console.log(`render  ${text} ${metadata} ${opts}`);
        try {
            return ejs.render(toRender, context.metadata, opts);
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
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`EJS render no context.body or context.content supplied for rendering`);
        }
        /* return Promise.resolve(ejs.render(text, metadata)); */
        return new Promise((resolve, reject) => {
            try {
                let opts = this.getEJSOptions(context.fspath ? context.fspath : undefined);
                // console.log(`render async ${context.content} ${context.metadata} ${opts}`);
                resolve(ejs.render(toRender, context.metadata, opts));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWVqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItZWpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QseUNBQTJCO0FBRTNCLHdCQUF3QjtBQUN4QixNQUFhLFdBQVksU0FBUSxzQkFBUTtJQUNyQztRQUNJLEtBQUssQ0FBQyxXQUFXLEVBQUUsMkNBQTJDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLCtEQUErRDtJQUMvRCwrQkFBK0I7SUFFL0IsYUFBYSxDQUFDLE1BQU07UUFFaEIsTUFBTSxVQUFVLEdBQUc7WUFDZixZQUFZLEVBQUUsSUFBSTtZQUNsQixRQUFRLEVBQUUsTUFBTTtZQUNoQixlQUFlO1lBQ2YsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM3RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsTUFBTSxRQUFRLEdBQUcsZUFBZTtZQUNoQixDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFDeEMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNqQyxvREFBb0Q7UUFDcEQsSUFBSSxRQUFRO1lBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDMUMsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELHdEQUF3RDtJQUN4RCxrQ0FBa0M7SUFFbEMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU87UUFDMUIsSUFB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aEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxPQUF5QjtRQUNuQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBQ0QsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sMEJBQWUsQ0FBQyxHQUFHLENBQUM7UUFDL0IsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUM7O1lBRWIsT0FBTyxJQUFJLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBdEhELGtDQXNIQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5pbXBvcnQgKiBhcyBlanMgZnJvbSAnZWpzJztcblxuLy8gVE9ETyBzdXBwb3J0IC5waHAuZWpzXG5leHBvcnQgY2xhc3MgRUpTUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwuZWpzXCIsIC9eKC4qXFwuaHRtbHwuKlxcLnBocClcXC4oZWpzKSR8XiguKilcXC4oZWpzKSQvKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHdhcyBmb3IgYW4gYXR0ZW1wdCB0byBsaXN0IHRoZSBkaXJlY3RvcmllcyB0byBzZWFyY2ggd2hlblxuICAgIC8vIHNhdGlzZnlpbmcgYW4gXCJpbmNsdWRlXCIgRUpTIHRhZy4gIFRoaXMgY291bGQgaGF2ZSBiZWVuIGEgd2F5XG4gICAgLy8gdG8gY2lyY3VtdmVudCA8cGFydGlhbD4gdGFnc1xuXG4gICAgZ2V0RUpTT3B0aW9ucyhmc3BhdGgpIHtcblxuICAgICAgICBjb25zdCBlanNPcHRpb25zID0ge1xuICAgICAgICAgICAgcm1XaGl0ZXNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgZmlsZW5hbWU6IGZzcGF0aCxcbiAgICAgICAgICAgIC8vIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgdmlld3M6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGdldEVKU09wdGlvbnMgYCwgdGhpcyk7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcpIHRocm93IG5ldyBFcnJvcihgZ2V0RUpTT3B0aW9ucyBubyBjb25maWdgKTtcbiAgICAgICAgY29uc3QgbGF5b3V0c01vdW50ZWQgPSB0aGlzLmxheW91dERpcnM7XG4gICAgICAgIGNvbnN0IHBhcnRpYWxzTW91bnRlZCA9IHRoaXMucGFydGlhbERpcnM7XG4gICAgICAgIGNvbnN0IGxvYWRGcm9tID0gcGFydGlhbHNNb3VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnRpYWxzTW91bnRlZC5jb25jYXQobGF5b3V0c01vdW50ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGxheW91dHNNb3VudGVkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZ2V0RUpTT3B0aW9ucyBsb2FkRnJvbSBgLCBsb2FkRnJvbSk7XG4gICAgICAgIGlmIChsb2FkRnJvbSkgZWpzT3B0aW9ucy52aWV3cyA9IGxvYWRGcm9tO1xuICAgICAgICByZXR1cm4gZWpzT3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIEVKUyBkb2N1bWVudGF0aW9uLCB0aGUgdGVtcGxhdGUgd2lsbFxuICAgIC8vIGJlIGF1dG9tYXRpY2FsbHkgY2FjaGVkIGJ5IEVKUy5cblxuICAgIGNvbXBpbGVkVGVtcGxhdGUodGV4dCwgZG9jSW5mbykge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhkb2NJbmZvID8gZG9jSW5mby5mc3BhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IGVqcy5jb21waWxlKHRleHQsIG9wdHMpLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRUpTIHJlbmRlclN5bmMgbm8gY29udGV4dC5ib2R5IG9yIGNvbnRleHQuY29udGVudCBzdXBwbGllZCBmb3IgcmVuZGVyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlciAgJHt0ZXh0fSAke21ldGFkYXRhfSAke29wdHN9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihcbiAgICAgICAgICAgICAgICB0b1JlbmRlcixcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGFkYXRhLCBvcHRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBFSlMgaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2Ugb2YgJHtlfWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnN0IHsgdGVtcGxhdGUsIG9wdHMgfSA9IHRoaXMuY29tcGlsZWRUZW1wbGF0ZSh0ZXh0LCB2cGluZm8pO1xuICAgICAgICAvLyByZXR1cm4gdGVtcGxhdGUobWV0YWRhdGEsIG9wdHMpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRUpTIHJlbmRlciBubyBjb250ZXh0LmJvZHkgb3IgY29udGV4dC5jb250ZW50IHN1cHBsaWVkIGZvciByZW5kZXJpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICAvKiByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVqcy5yZW5kZXIodGV4dCwgbWV0YWRhdGEpKTsgKi9cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldEVKU09wdGlvbnMoY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlciBhc3luYyAke2NvbnRleHQuY29udGVudH0gJHtjb250ZXh0Lm1ldGFkYXRhfSAke29wdHN9YCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShlanMucmVuZGVyKFxuICAgICAgICAgICAgICAgICAgICB0b1JlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5tZXRhZGF0YSwgb3B0cykpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgdGVtcGxhdGUsIG9wdHMgfSA9IHRoaXMuY29tcGlsZWRUZW1wbGF0ZSh0ZXh0LCB2cGluZm8pO1xuICAgICAgICAgICAgICAgIC8vIHJlc29sdmUodGVtcGxhdGUobWV0YWRhdGEsIG9wdHMpKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEVKUyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSBvZiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXRjaChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRUpTUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xcLnBocFxcLmVqcyQvLnRlc3QoY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LlBIUDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIGNhbm5vdCBhbGxvdyBQSFAgY29kZSB0byBydW4gdGhyb3VnaCBNYWhhYmh1dGEuXG4gICAgICovXG4gICAgZG9NYWhhYmh1dGEoZnBhdGgpIHtcbiAgICAgICAgaWYgKC9cXC5waHBcXC5lanMkLy50ZXN0KGZwYXRoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIl19