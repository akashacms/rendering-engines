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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
class JSONRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.json", /^(.*\.html)\.(json)$/);
    }
    renderSync(context) {
        // console.log(`JSONRenderer renderSync ${text} ==> ${util.inspect(json)}`);
        // console.log(`JSONRenderer renderSync JSONFormatter ${metadata.JSONFormatter}`);
        try {
            const text = context.body ? context.body : context.content;
            let json = JSON.parse(text);
            return this.config.partialSync(context.metadata.JSONFormatter, { data: json });
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with JSON in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }
    async render(context) {
        try {
            const text = context.body ? context.body : context.content;
            let json = JSON.parse(text);
            // console.log(`JSONRenderer ${text} ==> ${util.inspect(json)}`);
            // console.log(`JSONRenderer JSONFormatter ${metadata.JSONFormatter}`);
            return await this.config.partial(context.metadata.JSONFormatter, { data: json });
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with JSON in file ${docpath} because ${e}`);
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
            throw new Error(`JSONRenderer does not render files with this extension ${context.fspath}`);
        }
        return index_js_1.RenderingFormat.HTML;
    }
}
exports.JSONRenderer = JSONRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVuZGVyLWpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7O0FBSUgsK0NBQTJEO0FBQzNELHlDQUErRDtBQUUvRCxNQUFhLFlBQWEsU0FBUSxzQkFBUTtJQUN0QztRQUNJLEtBQUssQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQXlCO1FBQ2hDLDRFQUE0RTtRQUM1RSxrRkFBa0Y7UUFDbEYsSUFBSTtZQUNBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDM0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMxQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFFUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsMkJBQTJCLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCO1FBQ2xDLElBQUk7WUFDQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQzNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsaUVBQWlFO1lBQ2pFLHVFQUF1RTtZQUN2RSxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEM7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUVQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywyQkFBMkIsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNGLGFBQWEsQ0FBQyxPQUF5QjtRQUNwQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDL0Y7UUFDRCxPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7Q0FFSjtBQXpERCxvQ0F5REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKU09OUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwuanNvblwiLCAvXiguKlxcLmh0bWwpXFwuKGpzb24pJC8pO1xuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgSlNPTlJlbmRlcmVyIHJlbmRlclN5bmMgJHt0ZXh0fSA9PT4gJHt1dGlsLmluc3BlY3QoanNvbil9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBKU09OUmVuZGVyZXIgcmVuZGVyU3luYyBKU09ORm9ybWF0dGVyICR7bWV0YWRhdGEuSlNPTkZvcm1hdHRlcn1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBjb250ZXh0LmJvZHkgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnQ7XG4gICAgICAgICAgICBsZXQganNvbiA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWcucGFydGlhbFN5bmMoY29udGV4dC5tZXRhZGF0YS5KU09ORm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGF0YToganNvbiB9KTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggSlNPTiBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSAke2V9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBjb250ZXh0LmJvZHkgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnQ7XG4gICAgICAgICAgICBsZXQganNvbiA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgSlNPTlJlbmRlcmVyICR7dGV4dH0gPT0+ICR7dXRpbC5pbnNwZWN0KGpzb24pfWApO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEpTT05SZW5kZXJlciBKU09ORm9ybWF0dGVyICR7bWV0YWRhdGEuSlNPTkZvcm1hdHRlcn1gKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNvbmZpZy5wYXJ0aWFsKGNvbnRleHQubWV0YWRhdGEuSlNPTkZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGF0YToganNvbiB9KTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggSlNPTiBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSAke2V9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEpTT05SZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICB9XG5cbn1cbiJdfQ==