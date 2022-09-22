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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const liquidjs_1 = require("liquidjs");
class LiquidRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super('.html.liquid', /^(.*\.html)\.(liquid)$/);
    }
    async render(context /* text, metadata, docInfo */) {
        try {
            const partialsMounted = this.partialDirs;
            const engine = new liquidjs_1.Liquid({
                partials: partialsMounted,
                extname: '.liquid'
            });
            return await engine.parseAndRender(context.content, context.metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Liquid in file ${docpath}`);
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
            throw new Error(`LiquidRenderer does not render files with this extension ${context.fspath}`);
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
exports.LiquidRenderer = LiquidRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWxpcXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItbGlxdWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QsdUNBQWtDO0FBRWxDLE1BQWEsY0FBZSxTQUFRLHNCQUFRO0lBQ3hDO1FBQ0ksS0FBSyxDQUFDLGNBQWMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQ2hFLElBQUk7WUFDQSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3pDLE1BQU0sTUFBTSxHQUFNLElBQUksaUJBQU0sQ0FBQztnQkFDekIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLE9BQU8sRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztZQUNILE9BQU8sTUFBTSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pFO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsNkJBQTZCLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDOUQsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNGLGFBQWEsQ0FBQyxPQUF5QjtRQUNwQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDakc7UUFDRCxPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxLQUFLO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBN0NELHdDQTZDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDIwIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlbmRlcmVyLCBwYXJzZUZyb250bWF0dGVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuaW1wb3J0IHsgTGlxdWlkIH0gZnJvbSAnbGlxdWlkanMnO1xuXG5leHBvcnQgY2xhc3MgTGlxdWlkUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCcuaHRtbC5saXF1aWQnLCAvXiguKlxcLmh0bWwpXFwuKGxpcXVpZCkkLyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQgLyogdGV4dCwgbWV0YWRhdGEsIGRvY0luZm8gKi8pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRpYWxzTW91bnRlZCA9IHRoaXMucGFydGlhbERpcnM7XG4gICAgICAgICAgICBjb25zdCBlbmdpbmUgICAgPSBuZXcgTGlxdWlkKHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsczogcGFydGlhbHNNb3VudGVkLFxuICAgICAgICAgICAgICAgIGV4dG5hbWU6ICcubGlxdWlkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZW5naW5lLnBhcnNlQW5kUmVuZGVyKGNvbnRleHQuY29udGVudCwgY29udGV4dC5tZXRhZGF0YSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBMaXF1aWQgaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExpcXVpZFJlbmRlcmVyIGRvZXMgbm90IHJlbmRlciBmaWxlcyB3aXRoIHRoaXMgZXh0ZW5zaW9uICR7Y29udGV4dC5mc3BhdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlbmRlcmluZ0Zvcm1hdC5IVE1MO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdlIGNhbm5vdCBhbGxvdyBQSFAgY29kZSB0byBydW4gdGhyb3VnaCBNYWhhYmh1dGEuXG4gICAgICovXG4gICAgZG9NYWhhYmh1dGEoZnBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIl19