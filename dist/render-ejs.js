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
// import * as ejsutils from 'ejs/lib/utils.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWVqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItZWpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QseUNBQTJCO0FBQzNCLGdEQUFnRDtBQUVoRCx3QkFBd0I7QUFDeEIsTUFBYSxXQUFZLFNBQVEsc0JBQVE7SUFDckM7UUFDSSxLQUFLLENBQUMsV0FBVyxFQUFFLDJDQUEyQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSwrREFBK0Q7SUFDL0QsK0JBQStCO0lBRS9CLGFBQWEsQ0FBQyxNQUFNO1FBRWhCLE1BQU0sVUFBVSxHQUFHO1lBQ2YsWUFBWSxFQUFFLElBQUk7WUFDbEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsZUFBZTtZQUNmLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUVGLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDN0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN2QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLGVBQWU7WUFDaEIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxjQUFjLENBQUM7UUFDakMsb0RBQW9EO1FBQ3BELElBQUksUUFBUTtZQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzFDLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsa0NBQWtDO0lBRWxDLGdCQUFnQixDQUFDLElBQUksRUFBRSxP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Q0FBQyxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxhQUFhLENBQUMsT0FBeUI7UUFDbkMsT0FBTyxJQUFBLDhCQUFnQixFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0YsQ0FBQztRQUNELElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNyQyxPQUFPLDBCQUFlLENBQUMsR0FBRyxDQUFDO1FBQy9CLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTywwQkFBZSxDQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQUs7UUFDYixJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLE9BQU8sS0FBSyxDQUFDOztZQUViLE9BQU8sSUFBSSxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQXRIRCxrQ0FzSEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlbmRlcmVyLCBwYXJzZUZyb250bWF0dGVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuaW1wb3J0ICogYXMgZWpzIGZyb20gJ2Vqcyc7XG4vLyBpbXBvcnQgKiBhcyBlanN1dGlscyBmcm9tICdlanMvbGliL3V0aWxzLmpzJztcblxuLy8gVE9ETyBzdXBwb3J0IC5waHAuZWpzXG5leHBvcnQgY2xhc3MgRUpTUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwuZWpzXCIsIC9eKC4qXFwuaHRtbHwuKlxcLnBocClcXC4oZWpzKSR8XiguKilcXC4oZWpzKSQvKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHdhcyBmb3IgYW4gYXR0ZW1wdCB0byBsaXN0IHRoZSBkaXJlY3RvcmllcyB0byBzZWFyY2ggd2hlblxuICAgIC8vIHNhdGlzZnlpbmcgYW4gXCJpbmNsdWRlXCIgRUpTIHRhZy4gIFRoaXMgY291bGQgaGF2ZSBiZWVuIGEgd2F5XG4gICAgLy8gdG8gY2lyY3VtdmVudCA8cGFydGlhbD4gdGFnc1xuXG4gICAgZ2V0RUpTT3B0aW9ucyhmc3BhdGgpIHtcblxuICAgICAgICBjb25zdCBlanNPcHRpb25zID0ge1xuICAgICAgICAgICAgcm1XaGl0ZXNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgZmlsZW5hbWU6IGZzcGF0aCxcbiAgICAgICAgICAgIC8vIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgdmlld3M6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGdldEVKU09wdGlvbnMgYCwgdGhpcyk7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcpIHRocm93IG5ldyBFcnJvcihgZ2V0RUpTT3B0aW9ucyBubyBjb25maWdgKTtcbiAgICAgICAgY29uc3QgbGF5b3V0c01vdW50ZWQgPSB0aGlzLmxheW91dERpcnM7XG4gICAgICAgIGNvbnN0IHBhcnRpYWxzTW91bnRlZCA9IHRoaXMucGFydGlhbERpcnM7XG4gICAgICAgIGNvbnN0IGxvYWRGcm9tID0gcGFydGlhbHNNb3VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnRpYWxzTW91bnRlZC5jb25jYXQobGF5b3V0c01vdW50ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGxheW91dHNNb3VudGVkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZ2V0RUpTT3B0aW9ucyBsb2FkRnJvbSBgLCBsb2FkRnJvbSk7XG4gICAgICAgIGlmIChsb2FkRnJvbSkgZWpzT3B0aW9ucy52aWV3cyA9IGxvYWRGcm9tO1xuICAgICAgICByZXR1cm4gZWpzT3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIEVKUyBkb2N1bWVudGF0aW9uLCB0aGUgdGVtcGxhdGUgd2lsbFxuICAgIC8vIGJlIGF1dG9tYXRpY2FsbHkgY2FjaGVkIGJ5IEVKUy5cblxuICAgIGNvbXBpbGVkVGVtcGxhdGUodGV4dCwgZG9jSW5mbykge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhkb2NJbmZvID8gZG9jSW5mby5mc3BhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IGVqcy5jb21waWxlKHRleHQsIG9wdHMpLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0RUpTT3B0aW9ucyhjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRUpTIHJlbmRlclN5bmMgbm8gY29udGV4dC5ib2R5IG9yIGNvbnRleHQuY29udGVudCBzdXBwbGllZCBmb3IgcmVuZGVyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlciAgJHt0ZXh0fSAke21ldGFkYXRhfSAke29wdHN9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZWpzLnJlbmRlcihcbiAgICAgICAgICAgICAgICB0b1JlbmRlcixcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGFkYXRhLCBvcHRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBFSlMgaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2Ugb2YgJHtlfWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnN0IHsgdGVtcGxhdGUsIG9wdHMgfSA9IHRoaXMuY29tcGlsZWRUZW1wbGF0ZSh0ZXh0LCB2cGluZm8pO1xuICAgICAgICAvLyByZXR1cm4gdGVtcGxhdGUobWV0YWRhdGEsIG9wdHMpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRUpTIHJlbmRlciBubyBjb250ZXh0LmJvZHkgb3IgY29udGV4dC5jb250ZW50IHN1cHBsaWVkIGZvciByZW5kZXJpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICAvKiByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVqcy5yZW5kZXIodGV4dCwgbWV0YWRhdGEpKTsgKi9cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldEVKU09wdGlvbnMoY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlciBhc3luYyAke2NvbnRleHQuY29udGVudH0gJHtjb250ZXh0Lm1ldGFkYXRhfSAke29wdHN9YCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShlanMucmVuZGVyKFxuICAgICAgICAgICAgICAgICAgICB0b1JlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5tZXRhZGF0YSwgb3B0cykpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgdGVtcGxhdGUsIG9wdHMgfSA9IHRoaXMuY29tcGlsZWRUZW1wbGF0ZSh0ZXh0LCB2cGluZm8pO1xuICAgICAgICAgICAgICAgIC8vIHJlc29sdmUodGVtcGxhdGUobWV0YWRhdGEsIG9wdHMpKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEVKUyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSBvZiAke2V9YCk7XG4gICAgICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXRjaChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRUpTUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xcLnBocFxcLmVqcyQvLnRlc3QoY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LlBIUDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIGNhbm5vdCBhbGxvdyBQSFAgY29kZSB0byBydW4gdGhyb3VnaCBNYWhhYmh1dGEuXG4gICAgICovXG4gICAgZG9NYWhhYmh1dGEoZnBhdGgpIHtcbiAgICAgICAgaWYgKC9cXC5waHBcXC5lanMkLy50ZXN0KGZwYXRoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIl19