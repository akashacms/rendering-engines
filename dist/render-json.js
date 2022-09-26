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
            const text = typeof context.body === 'string' ? context.body : context.content;
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
            const text = typeof context.body === 'string' ? context.body : context.content;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVuZGVyLWpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7O0FBSUgsK0NBQTJEO0FBQzNELHlDQUErRDtBQUUvRCxNQUFhLFlBQWEsU0FBUSxzQkFBUTtJQUN0QztRQUNJLEtBQUssQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQXlCO1FBQ2hDLDRFQUE0RTtRQUM1RSxrRkFBa0Y7UUFDbEYsSUFBSTtZQUNBLE1BQU0sSUFBSSxHQUFHLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDL0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMxQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFFUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsMkJBQTJCLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCO1FBQ2xDLElBQUk7WUFDQSxNQUFNLElBQUksR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQy9FLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsaUVBQWlFO1lBQ2pFLHVFQUF1RTtZQUN2RSxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEM7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUVQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywyQkFBMkIsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNGLGFBQWEsQ0FBQyxPQUF5QjtRQUNwQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDL0Y7UUFDRCxPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7Q0FFSjtBQXpERCxvQ0F5REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKU09OUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwuanNvblwiLCAvXiguKlxcLmh0bWwpXFwuKGpzb24pJC8pO1xuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgSlNPTlJlbmRlcmVyIHJlbmRlclN5bmMgJHt0ZXh0fSA9PT4gJHt1dGlsLmluc3BlY3QoanNvbil9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBKU09OUmVuZGVyZXIgcmVuZGVyU3luYyBKU09ORm9ybWF0dGVyICR7bWV0YWRhdGEuSlNPTkZvcm1hdHRlcn1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgICAgIGxldCBqc29uID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5wYXJ0aWFsU3luYyhjb250ZXh0Lm1ldGFkYXRhLkpTT05Gb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkYXRhOiBqc29uIH0pO1xuICAgICAgICB9IGNhdGNoKGUpIHtcblxuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBKU09OIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlICR7ZX1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IHR5cGVvZiBjb250ZXh0LmJvZHkgPT09ICdzdHJpbmcnID8gY29udGV4dC5ib2R5IDogY29udGV4dC5jb250ZW50O1xuICAgICAgICAgICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEpTT05SZW5kZXJlciAke3RleHR9ID09PiAke3V0aWwuaW5zcGVjdChqc29uKX1gKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBKU09OUmVuZGVyZXIgSlNPTkZvcm1hdHRlciAke21ldGFkYXRhLkpTT05Gb3JtYXR0ZXJ9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jb25maWcucGFydGlhbChjb250ZXh0Lm1ldGFkYXRhLkpTT05Gb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRhdGE6IGpzb24gfSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuXG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEpTT04gaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2UgJHtlfWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICBwYXJzZU1ldGFkYXRhKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBSZW5kZXJpbmdDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRnJvbnRtYXR0ZXIoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybWF0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hdGNoKGNvbnRleHQuZnNwYXRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBKU09OUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxuXG59XG4iXX0=