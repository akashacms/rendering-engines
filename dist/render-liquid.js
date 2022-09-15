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
const HTMLRenderer_js_1 = require("./HTMLRenderer.js");
const liquidjs_1 = require("liquidjs");
const getMounted = (dir) => {
    if (typeof dir === 'string')
        return dir;
    else
        return dir.src;
};
class LiquidRenderer extends HTMLRenderer_js_1.HTMLRenderer {
    constructor() {
        super('.html.liquid', /^(.*\.html)\.(liquid)$/);
    }
    async render(context /* text, metadata, docInfo */) {
        try {
            const partialsMounted = this.partialDirs.map(getMounted);
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
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        return true;
    }
}
exports.LiquidRenderer = LiquidRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWxpcXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItbGlxdWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7OztBQUdILHVEQUFpRDtBQUdqRCx1Q0FBa0M7QUFFbEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUN2QixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFBRSxPQUFPLEdBQUcsQ0FBQzs7UUFDbkMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLE1BQWEsY0FBZSxTQUFRLDhCQUFZO0lBQzVDO1FBQ0ksS0FBSyxDQUFDLGNBQWMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQ2hFLElBQUk7WUFDQSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCxNQUFNLE1BQU0sR0FBTSxJQUFJLGlCQUFNLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixPQUFPLEVBQUUsU0FBUzthQUNyQixDQUFDLENBQUM7WUFDSCxPQUFPLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6RTtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1AsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLDZCQUE2QixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQzlELEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxLQUFLO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBM0JELHdDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDIwIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEhUTUxSZW5kZXJlciB9IGZyb20gJy4vSFRNTFJlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuaW1wb3J0IHsgTGlxdWlkIH0gZnJvbSAnbGlxdWlkanMnO1xuXG5jb25zdCBnZXRNb3VudGVkID0gKGRpcikgPT4ge1xuICAgIGlmICh0eXBlb2YgZGlyID09PSAnc3RyaW5nJykgcmV0dXJuIGRpcjtcbiAgICBlbHNlIHJldHVybiBkaXIuc3JjO1xufTtcblxuZXhwb3J0IGNsYXNzIExpcXVpZFJlbmRlcmVyIGV4dGVuZHMgSFRNTFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJy5odG1sLmxpcXVpZCcsIC9eKC4qXFwuaHRtbClcXC4obGlxdWlkKSQvKTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCAvKiB0ZXh0LCBtZXRhZGF0YSwgZG9jSW5mbyAqLykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFydGlhbHNNb3VudGVkID0gdGhpcy5wYXJ0aWFsRGlycy5tYXAoZ2V0TW91bnRlZCk7XG4gICAgICAgICAgICBjb25zdCBlbmdpbmUgICAgPSBuZXcgTGlxdWlkKHtcbiAgICAgICAgICAgICAgICBwYXJ0aWFsczogcGFydGlhbHNNb3VudGVkLFxuICAgICAgICAgICAgICAgIGV4dG5hbWU6ICcubGlxdWlkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZW5naW5lLnBhcnNlQW5kUmVuZGVyKGNvbnRleHQuY29udGVudCwgY29udGV4dC5tZXRhZGF0YSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBMaXF1aWQgaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=