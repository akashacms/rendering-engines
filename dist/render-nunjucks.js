"use strict";
/**
 *
 * Copyright 2020-2022 David Herron
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
        const loadFrom = this.layoutDirs.concat(this.partialDirs);
        // console.log(`njkenv `, loadFrom);
        // An open question is whether to create a custom Loader
        // class to integrate Nunjucks better with FileCache.  Clearly
        // Nunjucks can handle files being updated behind the scene.
        this[_nunjuck_env] = new nunjucks.Environment(
        // Using watch=true requires installing chokidar
        new nunjucks.FileSystemLoader(loadFrom, { watch: false }), {
            autoescape: false,
            noCache: false
        });
        // console.log(`njkenv`, this[_nunjuck_env]);
        return this[_nunjuck_env];
    }
    async render(context) {
        try {
            // console.log(context);
            let env = this.njkenv();
            return env.renderString(context.body ? context.body : context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }
    renderSync(context) {
        try {
            // console.log(context);
            let env = this.njkenv();
            return env.renderString(context.body ? context.body : context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath} because ${e}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW51bmp1Y2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1udW5qdWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QsbURBQXFDO0FBRXJDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVsQyxNQUFhLGdCQUFpQixTQUFRLHNCQUFRO0lBQzFDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCx1RUFBdUU7UUFDdkUsOEJBQThCO1FBQzlCLDBEQUEwRDtRQUMxRCw2REFBNkQ7UUFFN0QsK0RBQStEO1FBQy9ELDREQUE0RDtRQUM1RCx1QkFBdUI7UUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTFELG9DQUFvQztRQUVwQyx3REFBd0Q7UUFDeEQsOERBQThEO1FBQzlELDREQUE0RDtRQUU1RCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsV0FBVztRQUN6QyxnREFBZ0Q7UUFDaEQsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ3pEO1lBQ0ksVUFBVSxFQUFFLEtBQUs7WUFDakIsT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FDSixDQUFDO1FBQ0YsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCO1FBQ2xDLElBQUk7WUFDQSx3QkFBd0I7WUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDN0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLDZDQUE2QztZQUM3QyxnREFBZ0Q7U0FDbkQ7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUF5QjtRQUNoQyxJQUFJO1lBQ0Esd0JBQXdCO1lBQ3hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0Qiw2Q0FBNkM7WUFDN0MsZ0RBQWdEO1NBQ25EO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsK0JBQStCLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDRixhQUFhLENBQUMsT0FBeUI7UUFDcEMsT0FBTyxJQUFBLDhCQUFnQixFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25HO1FBQ0QsT0FBTywwQkFBZSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQTlGRCw0Q0E4RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAyMC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlbmRlcmVyLCBwYXJzZUZyb250bWF0dGVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuaW1wb3J0ICogYXMgbnVuanVja3MgZnJvbSAnbnVuanVja3MnO1xuXG5jb25zdCBfbnVuanVja19lbnYgPSBTeW1ib2woJ2lkJyk7XG5cbmV4cG9ydCBjbGFzcyBOdW5qdWNrc1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIi5odG1sLm5qa1wiLCAvXiguKlxcLmh0bWwpXFwuKG5qaykkLyk7XG4gICAgICAgIHRoaXNbX251bmp1Y2tfZW52XSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBuamtlbnYoKSB7XG4gICAgICAgIGlmICh0aGlzW19udW5qdWNrX2Vudl0pIHJldHVybiB0aGlzW19udW5qdWNrX2Vudl07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBuamtlbnYgbGF5b3V0RGlycyAke3V0aWwuaW5zcGVjdChjb25maWcubGF5b3V0RGlycyl9YCk7XG4gICAgICAgIC8vIERldGVjdCBpZiBjb25maWcgaXMgbm90IHNldFxuICAgICAgICAvLyBJbiB0aGUgUmVuZGVyaW5nIG1vZHVsZSwgY29uZmlnIGlzIHN0b3JlZCBpbiBzdXBlcmNsYXNzXG4gICAgICAgIC8vIGlmICghY29uZmlnKSB0aHJvdyBuZXcgRXJyb3IoYHJlbmRlci1udW5qdWNrcyBubyBjb25maWdgKTtcblxuICAgICAgICAvLyBHZXQgdGhlIHBhdGhzIGZvciBib3RoIHRoZSBMYXlvdXRzIGFuZCBQYXJ0aWFscyBkaXJlY3RvcmllcyxcbiAgICAgICAgLy8gYmVjYXVzZSB3aXRoIE51bmp1Y2tzIHdlIGFyZSBzdG9yaW5nIG1hY3JvcyBmaWxlcyBpbiBzb21lXG4gICAgICAgIC8vIGxheW91dHMgZGlyZWN0b3JpZXMuXG4gICAgICAgIGNvbnN0IGxvYWRGcm9tID0gdGhpcy5sYXlvdXREaXJzLmNvbmNhdCh0aGlzLnBhcnRpYWxEaXJzKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgbmprZW52IGAsIGxvYWRGcm9tKTtcblxuICAgICAgICAvLyBBbiBvcGVuIHF1ZXN0aW9uIGlzIHdoZXRoZXIgdG8gY3JlYXRlIGEgY3VzdG9tIExvYWRlclxuICAgICAgICAvLyBjbGFzcyB0byBpbnRlZ3JhdGUgTnVuanVja3MgYmV0dGVyIHdpdGggRmlsZUNhY2hlLiAgQ2xlYXJseVxuICAgICAgICAvLyBOdW5qdWNrcyBjYW4gaGFuZGxlIGZpbGVzIGJlaW5nIHVwZGF0ZWQgYmVoaW5kIHRoZSBzY2VuZS5cblxuICAgICAgICB0aGlzW19udW5qdWNrX2Vudl0gPSBuZXcgbnVuanVja3MuRW52aXJvbm1lbnQoXG4gICAgICAgICAgICAvLyBVc2luZyB3YXRjaD10cnVlIHJlcXVpcmVzIGluc3RhbGxpbmcgY2hva2lkYXJcbiAgICAgICAgICAgIG5ldyBudW5qdWNrcy5GaWxlU3lzdGVtTG9hZGVyKGxvYWRGcm9tLCB7IHdhdGNoOiBmYWxzZSB9KSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdXRvZXNjYXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBub0NhY2hlOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgbmprZW52YCwgdGhpc1tfbnVuanVja19lbnZdKTtcbiAgICAgICAgcmV0dXJuIHRoaXNbX251bmp1Y2tfZW52XTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGV4dCk7XG4gICAgICAgICAgICBsZXQgZW52ID0gdGhpcy5uamtlbnYoKTtcbiAgICAgICAgICAgIHJldHVybiBlbnYucmVuZGVyU3RyaW5nKFxuICAgICAgICAgICAgICAgIGNvbnRleHQuYm9keSA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudCxcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGFkYXRhKTtcbiAgICAgICAgICAgIC8vIG51bmp1Y2tzLmNvbmZpZ3VyZSh7IGF1dG9lc2NhcGU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgLy8gcmV0dXJuIG51bmp1Y2tzLnJlbmRlclN0cmluZyh0ZXh0LCBtZXRhZGF0YSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBOdW5qdWNrcyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSAke2V9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZXh0KTtcbiAgICAgICAgICAgIGxldCBlbnYgPSB0aGlzLm5qa2VudigpO1xuICAgICAgICAgICAgcmV0dXJuIGVudi5yZW5kZXJTdHJpbmcoXG4gICAgICAgICAgICAgICAgY29udGV4dC5ib2R5ID8gY29udGV4dC5ib2R5IDogY29udGV4dC5jb250ZW50LFxuICAgICAgICAgICAgICAgIGNvbnRleHQubWV0YWRhdGEpO1xuICAgICAgICAgICAgLy8gbnVuanVja3MuY29uZmlndXJlKHsgYXV0b2VzY2FwZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAvLyByZXR1cm4gbnVuanVja3MucmVuZGVyU3RyaW5nKHRleHQsIG1ldGFkYXRhKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE51bmp1Y2tzIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlICR7ZX1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBmcm9udG1hdHRlciBpbiB0aGUgZm9ybWF0IG9mIGxpbmVzIG9mIGRhc2hlc1xuICAgICAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXRjaChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTnVuanVja3NSZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBjYW5ub3QgYWxsb3cgUEhQIGNvZGUgdG8gcnVuIHRocm91Z2ggTWFoYWJodXRhLlxuICAgICAqL1xuICAgIGRvTWFoYWJodXRhKGZwYXRoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiJdfQ==