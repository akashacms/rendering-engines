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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONRenderer = void 0;
const HTMLRenderer_js_1 = require("./HTMLRenderer.js");
class JSONRenderer extends HTMLRenderer_js_1.HTMLRenderer {
    constructor() {
        super(".html.json", /^(.*\.html)\.(json)$/);
    }
    renderSync(context /* text, metadata, docInfo */) {
        let json = JSON.parse(context.content);
        // console.log(`JSONRenderer renderSync ${text} ==> ${util.inspect(json)}`);
        // console.log(`JSONRenderer renderSync JSONFormatter ${metadata.JSONFormatter}`);
        try {
            return this.config.partialSync(context.metadata.JSONFormatter, { data: json });
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with JSON in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }
    async render(context /* text, metadata, docInfo */) {
        try {
            let json = JSON.parse(context.content);
            // console.log(`JSONRenderer ${text} ==> ${util.inspect(json)}`);
            // console.log(`JSONRenderer JSONFormatter ${metadata.JSONFormatter}`);
            return await this.config.partial(context.metadata.JSONFormatter, { data: json });
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with JSON in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }
}
exports.JSONRenderer = JSONRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVuZGVyLWpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7O0FBSUgsdURBQWlEO0FBR2pELE1BQWEsWUFBYSxTQUFRLDhCQUFZO0lBQzFDO1FBQ0ksS0FBSyxDQUFDLFlBQVksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxVQUFVLENBQUMsT0FBeUIsQ0FBQyw2QkFBNkI7UUFDOUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsNEVBQTRFO1FBQzVFLGtGQUFrRjtRQUNsRixJQUFJO1lBQ0EsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDMUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBRVAsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLDJCQUEyQixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQ2hFLElBQUk7WUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxpRUFBaUU7WUFDakUsdUVBQXVFO1lBQ3ZFLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDMUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN4QztRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBRVAsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLDJCQUEyQixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7Q0FDSjtBQXBDRCxvQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE5IERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBIVE1MUmVuZGVyZXIgfSBmcm9tICcuL0hUTUxSZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKU09OUmVuZGVyZXIgZXh0ZW5kcyBIVE1MUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIi5odG1sLmpzb25cIiwgL14oLipcXC5odG1sKVxcLihqc29uKSQvKTtcbiAgICB9XG5cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQgLyogdGV4dCwgbWV0YWRhdGEsIGRvY0luZm8gKi8pIHtcbiAgICAgICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKGNvbnRleHQuY29udGVudCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBKU09OUmVuZGVyZXIgcmVuZGVyU3luYyAke3RleHR9ID09PiAke3V0aWwuaW5zcGVjdChqc29uKX1gKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEpTT05SZW5kZXJlciByZW5kZXJTeW5jIEpTT05Gb3JtYXR0ZXIgJHttZXRhZGF0YS5KU09ORm9ybWF0dGVyfWApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhcnRpYWxTeW5jKGNvbnRleHQubWV0YWRhdGEuSlNPTkZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRhdGE6IGpzb24gfSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuXG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEpTT04gaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQgLyogdGV4dCwgbWV0YWRhdGEsIGRvY0luZm8gKi8pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBqc29uID0gSlNPTi5wYXJzZShjb250ZXh0LmNvbnRlbnQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEpTT05SZW5kZXJlciAke3RleHR9ID09PiAke3V0aWwuaW5zcGVjdChqc29uKX1gKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBKU09OUmVuZGVyZXIgSlNPTkZvcm1hdHRlciAke21ldGFkYXRhLkpTT05Gb3JtYXR0ZXJ9YCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jb25maWcucGFydGlhbChjb250ZXh0Lm1ldGFkYXRhLkpTT05Gb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRhdGE6IGpzb24gfSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuXG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEpTT04gaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19