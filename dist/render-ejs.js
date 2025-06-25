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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWVqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItZWpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QseUNBQTJCO0FBRzNCLHdCQUF3QjtBQUN4QixNQUFhLFdBQVksU0FBUSxzQkFBUTtJQUNyQztRQUNJLEtBQUssQ0FBQyxXQUFXLEVBQUUsMkNBQTJDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLCtEQUErRDtJQUMvRCwrQkFBK0I7SUFFL0IsYUFBYSxDQUFDLE1BQU07UUFFaEIsTUFBTSxVQUFVLEdBQUc7WUFDZixZQUFZLEVBQUUsSUFBSTtZQUNsQixRQUFRLEVBQUUsTUFBTTtZQUNoQixlQUFlO1lBQ2YsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM3RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsTUFBTSxRQUFRLEdBQUcsZUFBZTtZQUNoQixDQUFDLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFDeEMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNqQyxvREFBb0Q7UUFDcEQsSUFBSSxRQUFRO1lBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDMUMsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELHdEQUF3RDtJQUN4RCxrQ0FBa0M7SUFFbEMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU87UUFDMUIsSUFB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aEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxPQUF5QjtRQUNuQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBQ0QsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sMEJBQWUsQ0FBQyxHQUFHLENBQUM7UUFDL0IsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUM7O1lBRWIsT0FBTyxJQUFJLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBdEhELGtDQXNIQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5pbXBvcnQgKiBhcyBlanMgZnJvbSAnZWpzJztcbmltcG9ydCAqIGFzIGVqc3V0aWxzIGZyb20gJ2Vqcy9saWIvdXRpbHMuanMnO1xuXG4vLyBUT0RPIHN1cHBvcnQgLnBocC5lanNcbmV4cG9ydCBjbGFzcyBFSlNSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5lanNcIiwgL14oLipcXC5odG1sfC4qXFwucGhwKVxcLihlanMpJHxeKC4qKVxcLihlanMpJC8pO1xuICAgIH1cblxuICAgIC8vIFRoaXMgd2FzIGZvciBhbiBhdHRlbXB0IHRvIGxpc3QgdGhlIGRpcmVjdG9yaWVzIHRvIHNlYXJjaCB3aGVuXG4gICAgLy8gc2F0aXNmeWluZyBhbiBcImluY2x1ZGVcIiBFSlMgdGFnLiAgVGhpcyBjb3VsZCBoYXZlIGJlZW4gYSB3YXlcbiAgICAvLyB0byBjaXJjdW12ZW50IDxwYXJ0aWFsPiB0YWdzXG5cbiAgICBnZXRFSlNPcHRpb25zKGZzcGF0aCkge1xuXG4gICAgICAgIGNvbnN0IGVqc09wdGlvbnMgPSB7XG4gICAgICAgICAgICBybVdoaXRlc3BhY2U6IHRydWUsXG4gICAgICAgICAgICBmaWxlbmFtZTogZnNwYXRoLFxuICAgICAgICAgICAgLy8gY2FjaGU6IHRydWUsXG4gICAgICAgICAgICB2aWV3czogW11cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZ2V0RUpTT3B0aW9ucyBgLCB0aGlzKTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZykgdGhyb3cgbmV3IEVycm9yKGBnZXRFSlNPcHRpb25zIG5vIGNvbmZpZ2ApO1xuICAgICAgICBjb25zdCBsYXlvdXRzTW91bnRlZCA9IHRoaXMubGF5b3V0RGlycztcbiAgICAgICAgY29uc3QgcGFydGlhbHNNb3VudGVkID0gdGhpcy5wYXJ0aWFsRGlycztcbiAgICAgICAgY29uc3QgbG9hZEZyb20gPSBwYXJ0aWFsc01vdW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGFydGlhbHNNb3VudGVkLmNvbmNhdChsYXlvdXRzTW91bnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbGF5b3V0c01vdW50ZWQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBnZXRFSlNPcHRpb25zIGxvYWRGcm9tIGAsIGxvYWRGcm9tKTtcbiAgICAgICAgaWYgKGxvYWRGcm9tKSBlanNPcHRpb25zLnZpZXdzID0gbG9hZEZyb207XG4gICAgICAgIHJldHVybiBlanNPcHRpb25zO1xuICAgIH1cblxuICAgIC8vIEFjY29yZGluZyB0byB0aGUgRUpTIGRvY3VtZW50YXRpb24sIHRoZSB0ZW1wbGF0ZSB3aWxsXG4gICAgLy8gYmUgYXV0b21hdGljYWxseSBjYWNoZWQgYnkgRUpTLlxuXG4gICAgY29tcGlsZWRUZW1wbGF0ZSh0ZXh0LCBkb2NJbmZvKSB7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5nZXRFSlNPcHRpb25zKGRvY0luZm8gPyBkb2NJbmZvLmZzcGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogZWpzLmNvbXBpbGUodGV4dCwgb3B0cyksXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5nZXRFSlNPcHRpb25zKGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICBjb25zdCB0b1JlbmRlciA9IHR5cGVvZiBjb250ZXh0LmJvZHkgPT09ICdzdHJpbmcnID8gY29udGV4dC5ib2R5IDogY29udGV4dC5jb250ZW50O1xuICAgICAgICBpZiAodHlwZW9mIHRvUmVuZGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFSlMgcmVuZGVyU3luYyBubyBjb250ZXh0LmJvZHkgb3IgY29udGV4dC5jb250ZW50IHN1cHBsaWVkIGZvciByZW5kZXJpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgcmVuZGVyICAke3RleHR9ICR7bWV0YWRhdGF9ICR7b3B0c31gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBlanMucmVuZGVyKFxuICAgICAgICAgICAgICAgIHRvUmVuZGVyLFxuICAgICAgICAgICAgICAgIGNvbnRleHQubWV0YWRhdGEsIG9wdHMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEVKUyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSBvZiAke2V9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc3QgeyB0ZW1wbGF0ZSwgb3B0cyB9ID0gdGhpcy5jb21waWxlZFRlbXBsYXRlKHRleHQsIHZwaW5mbyk7XG4gICAgICAgIC8vIHJldHVybiB0ZW1wbGF0ZShtZXRhZGF0YSwgb3B0cyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCB0b1JlbmRlciA9IHR5cGVvZiBjb250ZXh0LmJvZHkgPT09ICdzdHJpbmcnID8gY29udGV4dC5ib2R5IDogY29udGV4dC5jb250ZW50O1xuICAgICAgICBpZiAodHlwZW9mIHRvUmVuZGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFSlMgcmVuZGVyIG5vIGNvbnRleHQuYm9keSBvciBjb250ZXh0LmNvbnRlbnQgc3VwcGxpZWQgZm9yIHJlbmRlcmluZ2ApO1xuICAgICAgICB9XG4gICAgICAgIC8qIHJldHVybiBQcm9taXNlLnJlc29sdmUoZWpzLnJlbmRlcih0ZXh0LCBtZXRhZGF0YSkpOyAqL1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcmVuZGVyIGFzeW5jICR7Y29udGV4dC5jb250ZW50fSAke2NvbnRleHQubWV0YWRhdGF9ICR7b3B0c31gKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGVqcy5yZW5kZXIoXG4gICAgICAgICAgICAgICAgICAgIHRvUmVuZGVyLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGFkYXRhLCBvcHRzKSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgeyB0ZW1wbGF0ZSwgb3B0cyB9ID0gdGhpcy5jb21waWxlZFRlbXBsYXRlKHRleHQsIHZwaW5mbyk7XG4gICAgICAgICAgICAgICAgLy8gcmVzb2x2ZSh0ZW1wbGF0ZShtZXRhZGF0YSwgb3B0cykpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggRUpTIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlIG9mICR7ZX1gKTtcbiAgICAgICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBmcm9udG1hdHRlciBpbiB0aGUgZm9ybWF0IG9mIGxpbmVzIG9mIGRhc2hlc1xuICAgICAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwYXJzZU1ldGFkYXRhKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBSZW5kZXJpbmdDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRnJvbnRtYXR0ZXIoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybWF0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hdGNoKGNvbnRleHQuZnNwYXRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFSlNSZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFwucGhwXFwuZWpzJC8udGVzdChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuUEhQO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFJlbmRlcmluZ0Zvcm1hdC5IVE1MO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICBpZiAoL1xcLnBocFxcLmVqcyQvLnRlc3QoZnBhdGgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=