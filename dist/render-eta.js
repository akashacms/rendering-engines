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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ETARenderer_eta;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETARenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const eta_1 = require("eta");
class ETARenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.eta", /^(.*\.html)\.(eta)$|^(.*)\.(eta)$/);
        _ETARenderer_eta.set(this, void 0);
        __classPrivateFieldSet(this, _ETARenderer_eta, new eta_1.Eta(), "f");
    }
    renderSync(context) {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`ETARenderer renderSync no context.body or context.content supplied for rendering`);
        }
        // console.log(`render  ${text} ${metadata} ${opts}`);
        try {
            const ret = __classPrivateFieldGet(this, _ETARenderer_eta, "f").renderString(toRender, context.metadata);
            // console.log(`ETARenderer renderSync ${context.fspath} ${util.inspect(context.metadata)} ==> ${ret}`);
            return ret;
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with ETARenderer in file ${docpath} because of ${e}`);
            err.cause = e;
            throw err;
        }
    }
    async render(context) {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`ETARenderer no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(`render async ${context.content} ${context.metadata} ${opts}`);
            const ret = await __classPrivateFieldGet(this, _ETARenderer_eta, "f").renderStringAsync(toRender, context.metadata);
            // console.log(`ETARenderer render ${context.fspath} ${util.inspect(context.metadata)} ==> ${ret}`);
            return ret;
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with ETARenderer in file ${docpath} because of ${e}`);
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
            throw new Error(`ETARenderer does not render files with this extension ${context.fspath}`);
        }
        if (/\.php\.eta$/.test(context.fspath)) {
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
        if (/\.php\.eta$/.test(fpath))
            return false;
        else
            return true;
    }
}
exports.ETARenderer = ETARenderer;
_ETARenderer_eta = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7Ozs7Ozs7Ozs7Ozs7OztBQUlILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QsNkJBQTBCO0FBRTFCLE1BQWEsV0FBWSxTQUFRLHNCQUFRO0lBSXJDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBSDVELG1DQUFLO1FBSUQsdUJBQUEsSUFBSSxvQkFBUSxJQUFJLFNBQUcsRUFBRSxNQUFBLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUF5QjtRQUNoQyxNQUFNLFFBQVEsR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25GLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO1FBQ3hHLENBQUM7UUFDRCxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsdUJBQUEsSUFBSSx3QkFBSyxDQUFDLFlBQVksQ0FDOUIsUUFBUSxFQUNSLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0Qix3R0FBd0c7WUFDeEcsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNULE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsT0FBTyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkYsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUF5QjtRQUNsQyxNQUFNLFFBQVEsR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25GLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFDRCxJQUFJLENBQUM7WUFDRCw4RUFBOEU7WUFDOUUsTUFBTSxHQUFHLEdBQUcsTUFBTSx1QkFBQSxJQUFJLHdCQUFLLENBQUMsaUJBQWlCLENBQ3pDLFFBQVEsRUFDUixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsb0dBQW9HO1lBQ3BHLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUFDLE9BQU0sQ0FBQyxFQUFFLENBQUM7WUFDUixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsa0NBQWtDLE9BQU8sZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25GLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxPQUF5QjtRQUNuQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBQ0QsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sMEJBQWUsQ0FBQyxHQUFHLENBQUM7UUFDL0IsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUM7O1lBRWIsT0FBTyxJQUFJLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBaEZELGtDQWdGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdXRpbCBmcm9tICdub2RlOnV0aWwnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5pbXBvcnQgeyBFdGEgfSBmcm9tIFwiZXRhXCI7XG5cbmV4cG9ydCBjbGFzcyBFVEFSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcblxuICAgICNldGE7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5ldGFcIiwgL14oLipcXC5odG1sKVxcLihldGEpJHxeKC4qKVxcLihldGEpJC8pO1xuICAgICAgICB0aGlzLiNldGEgPSBuZXcgRXRhKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHRvUmVuZGVyID0gdHlwZW9mIGNvbnRleHQuYm9keSA9PT0gJ3N0cmluZycgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnQ7XG4gICAgICAgIGlmICh0eXBlb2YgdG9SZW5kZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVUQVJlbmRlcmVyIHJlbmRlclN5bmMgbm8gY29udGV4dC5ib2R5IG9yIGNvbnRleHQuY29udGVudCBzdXBwbGllZCBmb3IgcmVuZGVyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlciAgJHt0ZXh0fSAke21ldGFkYXRhfSAke29wdHN9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXQgPSB0aGlzLiNldGEucmVuZGVyU3RyaW5nKFxuICAgICAgICAgICAgICAgIHRvUmVuZGVyLFxuICAgICAgICAgICAgICAgIGNvbnRleHQubWV0YWRhdGEpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEVUQVJlbmRlcmVyIHJlbmRlclN5bmMgJHtjb250ZXh0LmZzcGF0aH0gJHt1dGlsLmluc3BlY3QoY29udGV4dC5tZXRhZGF0YSl9ID09PiAke3JldH1gKTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggRVRBUmVuZGVyZXIgaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2Ugb2YgJHtlfWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRVRBUmVuZGVyZXIgbm8gY29udGV4dC5ib2R5IG9yIGNvbnRleHQuY29udGVudCBzdXBwbGllZCBmb3IgcmVuZGVyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXIgYXN5bmMgJHtjb250ZXh0LmNvbnRlbnR9ICR7Y29udGV4dC5tZXRhZGF0YX0gJHtvcHRzfWApO1xuICAgICAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy4jZXRhLnJlbmRlclN0cmluZ0FzeW5jKFxuICAgICAgICAgICAgICAgIHRvUmVuZGVyLFxuICAgICAgICAgICAgICAgIGNvbnRleHQubWV0YWRhdGEpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEVUQVJlbmRlcmVyIHJlbmRlciAke2NvbnRleHQuZnNwYXRofSAke3V0aWwuaW5zcGVjdChjb250ZXh0Lm1ldGFkYXRhKX0gPT0+ICR7cmV0fWApO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIEVUQVJlbmRlcmVyIGluIGZpbGUgJHtkb2NwYXRofSBiZWNhdXNlIG9mICR7ZX1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBmcm9udG1hdHRlciBpbiB0aGUgZm9ybWF0IG9mIGxpbmVzIG9mIGRhc2hlc1xuICAgICAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwYXJzZU1ldGFkYXRhKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBSZW5kZXJpbmdDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRnJvbnRtYXR0ZXIoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybWF0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hdGNoKGNvbnRleHQuZnNwYXRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFVEFSZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFwucGhwXFwuZXRhJC8udGVzdChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuUEhQO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFJlbmRlcmluZ0Zvcm1hdC5IVE1MO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICBpZiAoL1xcLnBocFxcLmV0YSQvLnRlc3QoZnBhdGgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=