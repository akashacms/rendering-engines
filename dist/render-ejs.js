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
const HTMLRenderer_js_1 = require("./HTMLRenderer.js");
const ejs = __importStar(require("ejs"));
const getMounted = (dir) => {
    if (typeof dir === 'string')
        return dir;
    else
        return dir.src;
};
// TODO support .php.ejs
class EJSRenderer extends HTMLRenderer_js_1.HTMLRenderer {
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
            cache: true,
            views: []
        };
        // console.log(`getEJSOptions `, this);
        if (!this.config)
            throw new Error(`getEJSOptions no config`);
        const layoutsMounted = this.layoutDirs
            ? this.layoutDirs.map(getMounted)
            : undefined;
        const partialsMounted = this.partialDirs
            ? this.partialDirs.map(getMounted)
            : undefined;
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
    renderSync(context /* text, metadata, docInfo */) {
        let opts = this.getEJSOptions(context.fspath ? context.fspath : undefined);
        // console.log(`render  ${text} ${metadata} ${opts}`);
        try {
            return ejs.render(context.content, context.metadata, opts);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with EJS in file ${docpath}`);
            err.cause = e;
            throw err;
        }
        // const { template, opts } = this.compiledTemplate(text, vpinfo);
        // return template(metadata, opts);
    }
    render(context /* text, metadata, docInfo */) {
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
                const err = new Error(`Error with EJS in file ${docpath}`);
                err.cause = e;
                reject(err);
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWVqcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItZWpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0gsdURBQWlEO0FBR2pELHlDQUEyQjtBQUczQixNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtRQUFFLE9BQU8sR0FBRyxDQUFDOztRQUNuQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsd0JBQXdCO0FBQ3hCLE1BQWEsV0FBWSxTQUFRLDhCQUFZO0lBQ3pDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxpRUFBaUU7SUFDakUsK0RBQStEO0lBQy9ELCtCQUErQjtJQUUvQixhQUFhLENBQUMsTUFBTTtRQUVoQixNQUFNLFVBQVUsR0FBRztZQUNmLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM3RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVTtZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDNUIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVc7WUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNsQyxD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QUF4RkQsa0NBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxOSBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBIVE1MUmVuZGVyZXIgfSBmcm9tICcuL0hUTUxSZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmltcG9ydCAqIGFzIGVqcyBmcm9tICdlanMnO1xuaW1wb3J0ICogYXMgZWpzdXRpbHMgZnJvbSAnZWpzL2xpYi91dGlscy5qcyc7XG5cbmNvbnN0IGdldE1vdW50ZWQgPSAoZGlyKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkaXIgPT09ICdzdHJpbmcnKSByZXR1cm4gZGlyO1xuICAgIGVsc2UgcmV0dXJuIGRpci5zcmM7XG59O1xuXG4vLyBUT0RPIHN1cHBvcnQgLnBocC5lanNcbmV4cG9ydCBjbGFzcyBFSlNSZW5kZXJlciBleHRlbmRzIEhUTUxSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwuZWpzXCIsIC9eKC4qXFwuaHRtbHwuKlxcLnBocClcXC4oZWpzKSQvKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHdhcyBmb3IgYW4gYXR0ZW1wdCB0byBsaXN0IHRoZSBkaXJlY3RvcmllcyB0byBzZWFyY2ggd2hlblxuICAgIC8vIHNhdGlzZnlpbmcgYW4gXCJpbmNsdWRlXCIgRUpTIHRhZy4gIFRoaXMgY291bGQgaGF2ZSBiZWVuIGEgd2F5XG4gICAgLy8gdG8gY2lyY3VtdmVudCA8cGFydGlhbD4gdGFnc1xuXG4gICAgZ2V0RUpTT3B0aW9ucyhmc3BhdGgpIHtcblxuICAgICAgICBjb25zdCBlanNPcHRpb25zID0ge1xuICAgICAgICAgICAgcm1XaGl0ZXNwYWNlOiB0cnVlLFxuICAgICAgICAgICAgZmlsZW5hbWU6IGZzcGF0aCxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgdmlld3M6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGdldEVKU09wdGlvbnMgYCwgdGhpcyk7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcpIHRocm93IG5ldyBFcnJvcihgZ2V0RUpTT3B0aW9ucyBubyBjb25maWdgKTtcbiAgICAgICAgY29uc3QgbGF5b3V0c01vdW50ZWQgPSB0aGlzLmxheW91dERpcnNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5sYXlvdXREaXJzLm1hcChnZXRNb3VudGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IHBhcnRpYWxzTW91bnRlZCA9IHRoaXMucGFydGlhbERpcnNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wYXJ0aWFsRGlycy5tYXAoZ2V0TW91bnRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBsb2FkRnJvbSA9IHBhcnRpYWxzTW91bnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwYXJ0aWFsc01vdW50ZWQuY29uY2F0KGxheW91dHNNb3VudGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBsYXlvdXRzTW91bnRlZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYGdldEVKU09wdGlvbnMgbG9hZEZyb20gYCwgbG9hZEZyb20pO1xuICAgICAgICBpZiAobG9hZEZyb20pIGVqc09wdGlvbnMudmlld3MgPSBsb2FkRnJvbTtcbiAgICAgICAgcmV0dXJuIGVqc09wdGlvbnM7XG4gICAgfVxuXG4gICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBFSlMgZG9jdW1lbnRhdGlvbiwgdGhlIHRlbXBsYXRlIHdpbGxcbiAgICAvLyBiZSBhdXRvbWF0aWNhbGx5IGNhY2hlZCBieSBFSlMuXG5cbiAgICBjb21waWxlZFRlbXBsYXRlKHRleHQsIGRvY0luZm8pIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldEVKU09wdGlvbnMoZG9jSW5mbyA/IGRvY0luZm8uZnNwYXRoIDogdW5kZWZpbmVkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiBlanMuY29tcGlsZSh0ZXh0LCBvcHRzKSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQgLyogdGV4dCwgbWV0YWRhdGEsIGRvY0luZm8gKi8pIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldEVKU09wdGlvbnMoY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXIgICR7dGV4dH0gJHttZXRhZGF0YX0gJHtvcHRzfWApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGVqcy5yZW5kZXIoY29udGV4dC5jb250ZW50LCBjb250ZXh0Lm1ldGFkYXRhLCBvcHRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBFSlMgaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc3QgeyB0ZW1wbGF0ZSwgb3B0cyB9ID0gdGhpcy5jb21waWxlZFRlbXBsYXRlKHRleHQsIHZwaW5mbyk7XG4gICAgICAgIC8vIHJldHVybiB0ZW1wbGF0ZShtZXRhZGF0YSwgb3B0cyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQgLyogdGV4dCwgbWV0YWRhdGEsIGRvY0luZm8gKi8pIHtcbiAgICAgICAgLyogcmV0dXJuIFByb21pc2UucmVzb2x2ZShlanMucmVuZGVyKHRleHQsIG1ldGFkYXRhKSk7ICovXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5nZXRFSlNPcHRpb25zKGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXIgYXN5bmMgJHtjb250ZXh0LmNvbnRlbnR9ICR7Y29udGV4dC5tZXRhZGF0YX0gJHtvcHRzfWApO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWpzLnJlbmRlcihjb250ZXh0LmNvbnRlbnQsIGNvbnRleHQubWV0YWRhdGEsIG9wdHMpKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB7IHRlbXBsYXRlLCBvcHRzIH0gPSB0aGlzLmNvbXBpbGVkVGVtcGxhdGUodGV4dCwgdnBpbmZvKTtcbiAgICAgICAgICAgICAgICAvLyByZXNvbHZlKHRlbXBsYXRlKG1ldGFkYXRhLCBvcHRzKSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBFSlMgaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICBpZiAoL1xcLnBocFxcLmVqcyQvLnRlc3QoZnBhdGgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=