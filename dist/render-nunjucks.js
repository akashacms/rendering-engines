"use strict";
/**
 *
 * Copyright 2020 David Herron
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
exports.NunjucksRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const nunjucks = __importStar(require("nunjucks"));
const _nunjuck_env = Symbol('id');
const getMounted = (dir) => {
    if (typeof dir === 'string')
        return dir;
    else
        return dir.src;
};
class NunjucksRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.njk", /^(.*\.html)\.(njk)$/);
        this[_nunjuck_env] = undefined;
    }
    njkenv() {
        if (this[_nunjuck_env])
            return this[_nunjuck_env];
        // console.log(`njkenv layoutDirs ${util.inspect(config.layoutDirs)}`);
        // Detect if config is not set
        // In the Rendering module, config is stored in superclass
        // if (!config) throw new Error(`render-nunjucks no config`);
        // Get the paths for both the Layouts and Partials directories,
        // because with Nunjucks we are storing macros files in some
        // layouts directories.
        const layoutsMounted = this.layoutDirs.map(getMounted);
        const partialsMounted = this.partialDirs.map(getMounted);
        const loadFrom = layoutsMounted.concat(partialsMounted);
        // console.log(`njkenv `, loadFrom);
        // An open question is whether to create a custom Loader
        // class to integrate Nunjucks better with FileCache.  Clearly
        // Nunjucks can handle files being updated behind the scene.
        this[_nunjuck_env] = new nunjucks.Environment(
        // Using watch=true requires installing chokidar
        new nunjucks.FileSystemLoader(loadFrom, { watch: false }), 
        // config.layoutDirs.concat(config.partialsDirs), { watch: false }),
        {
            autoescape: false,
            noCache: false
        });
        // console.log(`njkenv`, this[_nunjuck_env]);
        return this[_nunjuck_env];
    }
    async render(context /* text, metadata, docInfo */) {
        try {
            let env = this.njkenv();
            return env.renderString(context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }
    renderSync(context /* text, metadata, docInfo */) {
        try {
            let env = this.njkenv();
            return env.renderString(context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath}`);
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
        if (!this.match(context.fspath)) {
            throw new Error(`NunjucksRenderer does not render files with this extension ${context.fspath}`);
        }
        return index_js_1.RenderingFormat.HTML;
    }
    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        return true;
    }
}
exports.NunjucksRenderer = NunjucksRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW51bmp1Y2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1udW5qdWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QsbURBQXFDO0FBRXJDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVsQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3ZCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtRQUFFLE9BQU8sR0FBRyxDQUFDOztRQUNuQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsTUFBYSxnQkFBaUIsU0FBUSxzQkFBUTtJQUMxQztRQUNJLEtBQUssQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsdUVBQXVFO1FBQ3ZFLDhCQUE4QjtRQUM5QiwwREFBMEQ7UUFDMUQsNkRBQTZEO1FBRTdELCtEQUErRDtRQUMvRCw0REFBNEQ7UUFDNUQsdUJBQXVCO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFeEQsb0NBQW9DO1FBRXBDLHdEQUF3RDtRQUN4RCw4REFBOEQ7UUFDOUQsNERBQTREO1FBRTVELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxXQUFXO1FBQ3pDLGdEQUFnRDtRQUNoRCxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDckQsb0VBQW9FO1FBQ3hFO1lBQ0ksVUFBVSxFQUFFLEtBQUs7WUFDakIsT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FDSixDQUFDO1FBQ0YsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQ2hFLElBQUk7WUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsT0FBTyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELDZDQUE2QztZQUM3QyxnREFBZ0Q7U0FDbkQ7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNoRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE1BQU0sR0FBRyxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQzlELElBQUk7WUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsT0FBTyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNELDZDQUE2QztZQUM3QyxnREFBZ0Q7U0FDbkQ7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNoRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE1BQU0sR0FBRyxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0YsYUFBYSxDQUFDLE9BQXlCO1FBQ3BDLE9BQU8sSUFBQSw4QkFBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQXlCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDhEQUE4RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNuRztRQUNELE9BQU8sMEJBQWUsQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQUs7UUFDYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUEzRkQsNENBMkZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMjAgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5pbXBvcnQgKiBhcyBudW5qdWNrcyBmcm9tICdudW5qdWNrcyc7XG5cbmNvbnN0IF9udW5qdWNrX2VudiA9IFN5bWJvbCgnaWQnKTtcblxuY29uc3QgZ2V0TW91bnRlZCA9IChkaXIpID0+IHtcbiAgICBpZiAodHlwZW9mIGRpciA9PT0gJ3N0cmluZycpIHJldHVybiBkaXI7XG4gICAgZWxzZSByZXR1cm4gZGlyLnNyYztcbn07XG5cbmV4cG9ydCBjbGFzcyBOdW5qdWNrc1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIi5odG1sLm5qa1wiLCAvXiguKlxcLmh0bWwpXFwuKG5qaykkLyk7XG4gICAgICAgIHRoaXNbX251bmp1Y2tfZW52XSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBuamtlbnYoKSB7XG4gICAgICAgIGlmICh0aGlzW19udW5qdWNrX2Vudl0pIHJldHVybiB0aGlzW19udW5qdWNrX2Vudl07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBuamtlbnYgbGF5b3V0RGlycyAke3V0aWwuaW5zcGVjdChjb25maWcubGF5b3V0RGlycyl9YCk7XG4gICAgICAgIC8vIERldGVjdCBpZiBjb25maWcgaXMgbm90IHNldFxuICAgICAgICAvLyBJbiB0aGUgUmVuZGVyaW5nIG1vZHVsZSwgY29uZmlnIGlzIHN0b3JlZCBpbiBzdXBlcmNsYXNzXG4gICAgICAgIC8vIGlmICghY29uZmlnKSB0aHJvdyBuZXcgRXJyb3IoYHJlbmRlci1udW5qdWNrcyBubyBjb25maWdgKTtcblxuICAgICAgICAvLyBHZXQgdGhlIHBhdGhzIGZvciBib3RoIHRoZSBMYXlvdXRzIGFuZCBQYXJ0aWFscyBkaXJlY3RvcmllcyxcbiAgICAgICAgLy8gYmVjYXVzZSB3aXRoIE51bmp1Y2tzIHdlIGFyZSBzdG9yaW5nIG1hY3JvcyBmaWxlcyBpbiBzb21lXG4gICAgICAgIC8vIGxheW91dHMgZGlyZWN0b3JpZXMuXG4gICAgICAgIGNvbnN0IGxheW91dHNNb3VudGVkID0gdGhpcy5sYXlvdXREaXJzLm1hcChnZXRNb3VudGVkKTtcbiAgICAgICAgY29uc3QgcGFydGlhbHNNb3VudGVkID0gdGhpcy5wYXJ0aWFsRGlycy5tYXAoZ2V0TW91bnRlZCk7XG4gICAgICAgIGNvbnN0IGxvYWRGcm9tID0gbGF5b3V0c01vdW50ZWQuY29uY2F0KHBhcnRpYWxzTW91bnRlZCk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYG5qa2VudiBgLCBsb2FkRnJvbSk7XG5cbiAgICAgICAgLy8gQW4gb3BlbiBxdWVzdGlvbiBpcyB3aGV0aGVyIHRvIGNyZWF0ZSBhIGN1c3RvbSBMb2FkZXJcbiAgICAgICAgLy8gY2xhc3MgdG8gaW50ZWdyYXRlIE51bmp1Y2tzIGJldHRlciB3aXRoIEZpbGVDYWNoZS4gIENsZWFybHlcbiAgICAgICAgLy8gTnVuanVja3MgY2FuIGhhbmRsZSBmaWxlcyBiZWluZyB1cGRhdGVkIGJlaGluZCB0aGUgc2NlbmUuXG5cbiAgICAgICAgdGhpc1tfbnVuanVja19lbnZdID0gbmV3IG51bmp1Y2tzLkVudmlyb25tZW50KFxuICAgICAgICAgICAgLy8gVXNpbmcgd2F0Y2g9dHJ1ZSByZXF1aXJlcyBpbnN0YWxsaW5nIGNob2tpZGFyXG4gICAgICAgICAgICBuZXcgbnVuanVja3MuRmlsZVN5c3RlbUxvYWRlcihsb2FkRnJvbSwgeyB3YXRjaDogZmFsc2UgfSksXG4gICAgICAgICAgICAgICAgLy8gY29uZmlnLmxheW91dERpcnMuY29uY2F0KGNvbmZpZy5wYXJ0aWFsc0RpcnMpLCB7IHdhdGNoOiBmYWxzZSB9KSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdXRvZXNjYXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBub0NhY2hlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgbmprZW52YCwgdGhpc1tfbnVuanVja19lbnZdKTtcbiAgICAgICAgcmV0dXJuIHRoaXNbX251bmp1Y2tfZW52XTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCAvKiB0ZXh0LCBtZXRhZGF0YSwgZG9jSW5mbyAqLykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGVudiA9IHRoaXMubmprZW52KCk7XG4gICAgICAgICAgICByZXR1cm4gZW52LnJlbmRlclN0cmluZyhjb250ZXh0LmNvbnRlbnQsIGNvbnRleHQubWV0YWRhdGEpO1xuICAgICAgICAgICAgLy8gbnVuanVja3MuY29uZmlndXJlKHsgYXV0b2VzY2FwZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAvLyByZXR1cm4gbnVuanVja3MucmVuZGVyU3RyaW5nKHRleHQsIG1ldGFkYXRhKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE51bmp1Y2tzIGluIGZpbGUgJHtkb2NwYXRofWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCAvKiB0ZXh0LCBtZXRhZGF0YSwgZG9jSW5mbyAqLykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGVudiA9IHRoaXMubmprZW52KCk7XG4gICAgICAgICAgICByZXR1cm4gZW52LnJlbmRlclN0cmluZyhjb250ZXh0LmNvbnRlbnQsIGNvbnRleHQubWV0YWRhdGEpO1xuICAgICAgICAgICAgLy8gbnVuanVja3MuY29uZmlndXJlKHsgYXV0b2VzY2FwZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAvLyByZXR1cm4gbnVuanVja3MucmVuZGVyU3RyaW5nKHRleHQsIG1ldGFkYXRhKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE51bmp1Y2tzIGluIGZpbGUgJHtkb2NwYXRofWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBwYXJzZU1ldGFkYXRhKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBSZW5kZXJpbmdDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRnJvbnRtYXR0ZXIoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybWF0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hdGNoKGNvbnRleHQuZnNwYXRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOdW5qdWNrc1JlbmRlcmVyIGRvZXMgbm90IHJlbmRlciBmaWxlcyB3aXRoIHRoaXMgZXh0ZW5zaW9uICR7Y29udGV4dC5mc3BhdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlbmRlcmluZ0Zvcm1hdC5IVE1MO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIGNhbm5vdCBhbGxvdyBQSFAgY29kZSB0byBydW4gdGhyb3VnaCBNYWhhYmh1dGEuXG4gICAgICovXG4gICAgZG9NYWhhYmh1dGEoZnBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIl19