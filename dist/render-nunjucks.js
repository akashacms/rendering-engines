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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _NunjucksRenderer_instances, _NunjucksRenderer_env, _NunjucksRenderer_lookForTemplateSync;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NunjucksRenderer = void 0;
const path = __importStar(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_util_1 = __importDefault(require("node:util"));
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const nunjucks = __importStar(require("nunjucks"));
class NunjucksRenderer extends Renderer_js_1.Renderer {
    constructor() {
        // Match either .html.njk or .njk
        super(".html.njk", /^(.*\.html)\.(njk)$|^(.*)\.(njk)$/);
        _NunjucksRenderer_instances.add(this);
        _NunjucksRenderer_env.set(this, void 0);
        __classPrivateFieldSet(this, _NunjucksRenderer_env, undefined, "f");
    }
    njkenv() {
        // If the environment was already created,
        // then do not create a new one.
        if (__classPrivateFieldGet(this, _NunjucksRenderer_env, "f"))
            return __classPrivateFieldGet(this, _NunjucksRenderer_env, "f");
        // Using nunjucks.FileSystemLoader, as shown
        // below, did not work out.  The issue is if/when
        // the list of directories (Layouts+Partials) changes,
        // there isn't a way to update the directories in
        // the FileSystemLoader.
        //
        // It's observed that njkenv was called before
        // the AkashaRender Configuration.prepare function
        // is invoked, hence the Built-In plugin was not
        // added, and therefore it's layout and partials
        // directories were not available.
        //
        // The Nunjucks documentation for adding a
        // Loader is horrible and led me down false paths.
        //
        // This is the trivial Loader.  We do not need
        // it to "watch" the directories (using Chokidar),
        // and we do not need it to cache results.
        //
        // The action is in the getSource and
        // #lookForTemplateSync functions.
        //
        // The latter looks through the directories
        // in the concatenation of layoutsDirs and
        // partialsDirs.  It recomputes this every time
        // because the directory list may have changed.
        //
        // That function was modeled after defaultFindLayout
        // and related functions in index.ts.
        //
        // Everything is using Sync functions so that it
        // can be used from Sync rendering.
        const that = this;
        function AkLoader(opts) { }
        AkLoader.prototype.getSource = function (name) {
            // load the template
            const lpath = __classPrivateFieldGet(that, _NunjucksRenderer_instances, "m", _NunjucksRenderer_lookForTemplateSync).call(that, name);
            const source = {
                src: node_fs_1.default.readFileSync(lpath, 'utf-8'),
                path: lpath,
                noCache: this.noCache
            };
            return source;
        };
        __classPrivateFieldSet(this, _NunjucksRenderer_env, new nunjucks.Environment(new AkLoader(), {
            autoescape: false,
            watch: false,
            noCache: true
        }), "f");
        // This is the old implementation.  It almost worked.
        // this.#env = new nunjucks.Environment(
        //     // Using watch=true requires installing chokidar
        //     new nunjucks.FileSystemLoader(loadFrom, {
        //         watch: false
        //     }), {
        //         autoescape: false,
        //         noCache: false
        //     }
        // );
        return __classPrivateFieldGet(this, _NunjucksRenderer_env, "f");
    }
    async render(context) {
        const toRender = typeof context.body === 'string'
            ? context.body
            : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`NJK render no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(context);
            let env = this.njkenv();
            // Do asynchronous rendering
            let result = await new Promise((resolve, reject) => {
                env.renderString(toRender, !context?.metadata
                    ? {}
                    : context.metadata, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (typeof result === 'string') {
                            resolve(result);
                        }
                        else if (typeof result === 'undefined'
                            || result === null) {
                            resolve('');
                        }
                        else {
                            reject(new Error(`rendering result unknown format ${node_util_1.default.inspect(result)}`));
                        }
                    }
                });
            });
            return result;
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
        const toRender = typeof context.body === 'string'
            ? context.body
            : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`NJK renderSync no context.body or context.content supplied for rendering`);
        }
        try {
            // console.log(context);
            let env = this.njkenv();
            return env.renderString(toRender, !context?.metadata
                ? {}
                : context.metadata);
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
_NunjucksRenderer_env = new WeakMap(), _NunjucksRenderer_instances = new WeakSet(), _NunjucksRenderer_lookForTemplateSync = function _NunjucksRenderer_lookForTemplateSync(fnlayout) {
    const loadFrom = this.layoutDirs.concat(this.partialDirs);
    for (const ldir of loadFrom) {
        const lpath = path.join(ldir, fnlayout);
        let lstat;
        try {
            lstat = node_fs_1.default.statSync(lpath);
        }
        catch (err) {
            lstat = undefined;
        }
        if (lstat) {
            if (lstat.isFile()) {
                return lpath;
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW51bmp1Y2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1udW5qdWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxnREFBa0M7QUFDbEMsc0RBQThDO0FBQzlDLDBEQUE2QjtBQUM3QiwrQ0FBMkQ7QUFDM0QseUNBQStEO0FBRS9ELG1EQUFxQztBQUVyQyxNQUFhLGdCQUFpQixTQUFRLHNCQUFRO0lBSTFDO1FBQ0ksaUNBQWlDO1FBQ2pDLEtBQUssQ0FBQyxXQUFXLEVBQUUsbUNBQW1DLENBQUMsQ0FBQzs7UUFKNUQsd0NBQUs7UUFLRCx1QkFBQSxJQUFJLHlCQUFRLFNBQVMsTUFBQSxDQUFDO0lBQzFCLENBQUM7SUFpQ0QsTUFBTTtRQUNGLDBDQUEwQztRQUMxQyxnQ0FBZ0M7UUFDaEMsSUFBSSx1QkFBQSxJQUFJLDZCQUFLO1lBQUUsT0FBTyx1QkFBQSxJQUFJLDZCQUFLLENBQUM7UUFFaEMsNENBQTRDO1FBQzVDLGlEQUFpRDtRQUNqRCxzREFBc0Q7UUFDdEQsaURBQWlEO1FBQ2pELHdCQUF3QjtRQUN4QixFQUFFO1FBQ0YsOENBQThDO1FBQzlDLGtEQUFrRDtRQUNsRCxnREFBZ0Q7UUFDaEQsZ0RBQWdEO1FBQ2hELGtDQUFrQztRQUNsQyxFQUFFO1FBQ0YsMENBQTBDO1FBQzFDLGtEQUFrRDtRQUNsRCxFQUFFO1FBQ0YsOENBQThDO1FBQzlDLGtEQUFrRDtRQUNsRCwwQ0FBMEM7UUFDMUMsRUFBRTtRQUNGLHFDQUFxQztRQUNyQyxrQ0FBa0M7UUFDbEMsRUFBRTtRQUNGLDJDQUEyQztRQUMzQywwQ0FBMEM7UUFDMUMsK0NBQStDO1FBQy9DLCtDQUErQztRQUMvQyxFQUFFO1FBQ0Ysb0RBQW9EO1FBQ3BELHFDQUFxQztRQUNyQyxFQUFFO1FBQ0YsZ0RB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ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDIwLTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgZnMsIHsgcHJvbWlzZXMgYXMgZnNwIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgdXRpbCBmcm9tICdub2RlOnV0aWwnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5pbXBvcnQgKiBhcyBudW5qdWNrcyBmcm9tICdudW5qdWNrcyc7XG5cbmV4cG9ydCBjbGFzcyBOdW5qdWNrc1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuXG4gICAgI2VudjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBNYXRjaCBlaXRoZXIgLmh0bWwubmprIG9yIC5uamtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5uamtcIiwgL14oLipcXC5odG1sKVxcLihuamspJHxeKC4qKVxcLihuamspJC8pO1xuICAgICAgICB0aGlzLiNlbnYgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9va3MgZm9yIGEgdGVtcGxhdGUgaW4gdGhlIGNvbmNhdGVuYXRpb25cbiAgICAgKiBvZiBsYXlvdXREaXJzIGFuZCBwYXJ0aWFsRGlycywgcmV0dXJuaW5nXG4gICAgICogdGhlIGNvbmNhdGVuYXRpb24gb2YgdGhlIG1hdGNoaW5nIGRpcmVjdG9yeVxuICAgICAqIHdpdGggdGhlIGZpbGUgbmFtZS5cbiAgICAgKlxuICAgICAqIFRoZSBwdXJwb3NlIGlzIHRvIHN1cHBvcnQgYSBOdW5qdWNrcyBMb2FkZXIgd2hpY2hcbiAgICAgKiBkeW5hbWljYWxseSB1c2UgdGhlIGN1cnJlbnQgbGlzdCBvZiBkaXJlY3Rvcmllc1xuICAgICAqIHdoZW4vaWYgdGhleSdyZSB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZubGF5b3V0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgICNsb29rRm9yVGVtcGxhdGVTeW5jKGZubGF5b3V0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbG9hZEZyb20gPSB0aGlzLmxheW91dERpcnMuY29uY2F0KFxuICAgICAgICAgICAgdGhpcy5wYXJ0aWFsRGlyc1xuICAgICAgICApO1xuICAgICAgICBmb3IgKGNvbnN0IGxkaXIgb2YgbG9hZEZyb20pIHtcbiAgICAgICAgICAgIGNvbnN0IGxwYXRoID0gcGF0aC5qb2luKGxkaXIsIGZubGF5b3V0KTtcbiAgICAgICAgICAgIGxldCBsc3RhdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbHN0YXQgPSBmcy5zdGF0U3luYyhscGF0aCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHsgbHN0YXQgPSB1bmRlZmluZWQ7IH1cbiAgICAgICAgICAgIGlmIChsc3RhdCkge1xuICAgICAgICAgICAgICAgIGlmIChsc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbHBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmprZW52KCkge1xuICAgICAgICAvLyBJZiB0aGUgZW52aXJvbm1lbnQgd2FzIGFscmVhZHkgY3JlYXRlZCxcbiAgICAgICAgLy8gdGhlbiBkbyBub3QgY3JlYXRlIGEgbmV3IG9uZS5cbiAgICAgICAgaWYgKHRoaXMuI2VudikgcmV0dXJuIHRoaXMuI2VudjtcbiAgICAgICAgXG4gICAgICAgIC8vIFVzaW5nIG51bmp1Y2tzLkZpbGVTeXN0ZW1Mb2FkZXIsIGFzIHNob3duXG4gICAgICAgIC8vIGJlbG93LCBkaWQgbm90IHdvcmsgb3V0LiAgVGhlIGlzc3VlIGlzIGlmL3doZW5cbiAgICAgICAgLy8gdGhlIGxpc3Qgb2YgZGlyZWN0b3JpZXMgKExheW91dHMrUGFydGlhbHMpIGNoYW5nZXMsXG4gICAgICAgIC8vIHRoZXJlIGlzbid0IGEgd2F5IHRvIHVwZGF0ZSB0aGUgZGlyZWN0b3JpZXMgaW5cbiAgICAgICAgLy8gdGhlIEZpbGVTeXN0ZW1Mb2FkZXIuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEl0J3Mgb2JzZXJ2ZWQgdGhhdCBuamtlbnYgd2FzIGNhbGxlZCBiZWZvcmVcbiAgICAgICAgLy8gdGhlIEFrYXNoYVJlbmRlciBDb25maWd1cmF0aW9uLnByZXBhcmUgZnVuY3Rpb25cbiAgICAgICAgLy8gaXMgaW52b2tlZCwgaGVuY2UgdGhlIEJ1aWx0LUluIHBsdWdpbiB3YXMgbm90XG4gICAgICAgIC8vIGFkZGVkLCBhbmQgdGhlcmVmb3JlIGl0J3MgbGF5b3V0IGFuZCBwYXJ0aWFsc1xuICAgICAgICAvLyBkaXJlY3RvcmllcyB3ZXJlIG5vdCBhdmFpbGFibGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBOdW5qdWNrcyBkb2N1bWVudGF0aW9uIGZvciBhZGRpbmcgYVxuICAgICAgICAvLyBMb2FkZXIgaXMgaG9ycmlibGUgYW5kIGxlZCBtZSBkb3duIGZhbHNlIHBhdGhzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSB0cml2aWFsIExvYWRlci4gIFdlIGRvIG5vdCBuZWVkXG4gICAgICAgIC8vIGl0IHRvIFwid2F0Y2hcIiB0aGUgZGlyZWN0b3JpZXMgKHVzaW5nIENob2tpZGFyKSxcbiAgICAgICAgLy8gYW5kIHdlIGRvIG5vdCBuZWVkIGl0IHRvIGNhY2hlIHJlc3VsdHMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBhY3Rpb24gaXMgaW4gdGhlIGdldFNvdXJjZSBhbmRcbiAgICAgICAgLy8gI2xvb2tGb3JUZW1wbGF0ZVN5bmMgZnVuY3Rpb25zLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgbGF0dGVyIGxvb2tzIHRocm91Z2ggdGhlIGRpcmVjdG9yaWVzXG4gICAgICAgIC8vIGluIHRoZSBjb25jYXRlbmF0aW9uIG9mIGxheW91dHNEaXJzIGFuZFxuICAgICAgICAvLyBwYXJ0aWFsc0RpcnMuICBJdCByZWNvbXB1dGVzIHRoaXMgZXZlcnkgdGltZVxuICAgICAgICAvLyBiZWNhdXNlIHRoZSBkaXJlY3RvcnkgbGlzdCBtYXkgaGF2ZSBjaGFuZ2VkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGF0IGZ1bmN0aW9uIHdhcyBtb2RlbGVkIGFmdGVyIGRlZmF1bHRGaW5kTGF5b3V0XG4gICAgICAgIC8vIGFuZCByZWxhdGVkIGZ1bmN0aW9ucyBpbiBpbmRleC50cy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRXZlcnl0aGluZyBpcyB1c2luZyBTeW5jIGZ1bmN0aW9ucyBzbyB0aGF0IGl0XG4gICAgICAgIC8vIGNhbiBiZSB1c2VkIGZyb20gU3luYyByZW5kZXJpbmcuXG5cbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgZnVuY3Rpb24gQWtMb2FkZXIob3B0cz86IGFueSkge31cbiAgICAgICAgQWtMb2FkZXIucHJvdG90eXBlLmdldFNvdXJjZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIC8vIGxvYWQgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICBjb25zdCBscGF0aCA9IHRoYXQuI2xvb2tGb3JUZW1wbGF0ZVN5bmMobmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSB7XG4gICAgICAgICAgICAgICAgc3JjOiBmcy5yZWFkRmlsZVN5bmMobHBhdGgsICd1dGYtOCcpLFxuICAgICAgICAgICAgICAgIHBhdGg6IGxwYXRoLFxuICAgICAgICAgICAgICAgIG5vQ2FjaGU6IHRoaXMubm9DYWNoZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiNlbnYgPSBuZXcgbnVuanVja3MuRW52aXJvbm1lbnQoXG4gICAgICAgICAgICBuZXcgQWtMb2FkZXIoKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdXRvZXNjYXBlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3YXRjaDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9DYWNoZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIG9sZCBpbXBsZW1lbnRhdGlvbi4gIEl0IGFsbW9zdCB3b3JrZWQuXG5cbiAgICAgICAgLy8gdGhpcy4jZW52ID0gbmV3IG51bmp1Y2tzLkVudmlyb25tZW50KFxuICAgICAgICAvLyAgICAgLy8gVXNpbmcgd2F0Y2g9dHJ1ZSByZXF1aXJlcyBpbnN0YWxsaW5nIGNob2tpZGFyXG4gICAgICAgIC8vICAgICBuZXcgbnVuanVja3MuRmlsZVN5c3RlbUxvYWRlcihsb2FkRnJvbSwge1xuICAgICAgICAvLyAgICAgICAgIHdhdGNoOiBmYWxzZVxuICAgICAgICAvLyAgICAgfSksIHtcbiAgICAgICAgLy8gICAgICAgICBhdXRvZXNjYXBlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICBub0NhY2hlOiBmYWxzZVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLiNlbnY7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCB0b1JlbmRlclxuICAgICAgICAgICAgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBjb250ZXh0LmJvZHlcbiAgICAgICAgICAgIDogY29udGV4dC5jb250ZW50O1xuICAgICAgICBpZiAodHlwZW9mIHRvUmVuZGVyICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOSksgcmVuZGVyIG5vIGNvbnRleHQuYm9keSBvciBjb250ZXh0LmNvbnRlbnQgc3VwcGxpZWQgZm9yIHJlbmRlcmluZ2ApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZXh0KTtcbiAgICAgICAgICAgIGxldCBlbnYgPSB0aGlzLm5qa2VudigpO1xuICAgICAgICAgICAgLy8gRG8gYXN5bmNocm9ub3VzIHJlbmRlcmluZ1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudi5yZW5kZXJTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHRvUmVuZGVyLFxuICAgICAgICAgICAgICAgICAgICAhY29udGV4dD8ubWV0YWRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgICAgICAgICAgICAgIDogY29udGV4dC5tZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgcmVzdWx0ID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYHJlbmRlcmluZyByZXN1bHQgdW5rbm93biBmb3JtYXQgJHt1dGlsLmluc3BlY3QocmVzdWx0KX1gKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIC8vIG51bmp1Y2tzLmNvbmZpZ3VyZSh7IGF1dG9lc2NhcGU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgLy8gcmV0dXJuIG51bmp1Y2tzLnJlbmRlclN0cmluZyh0ZXh0LCBtZXRhZGF0YSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBOdW5qdWNrcyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSAke2V9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHRvUmVuZGVyXG4gICAgICAgICAgICA9IHR5cGVvZiBjb250ZXh0LmJvZHkgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IGNvbnRleHQuYm9keVxuICAgICAgICAgICAgOiBjb250ZXh0LmNvbnRlbnQ7XG4gICAgICAgIGlmICh0eXBlb2YgdG9SZW5kZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5KSyByZW5kZXJTeW5jIG5vIGNvbnRleHQuYm9keSBvciBjb250ZXh0LmNvbnRlbnQgc3VwcGxpZWQgZm9yIHJlbmRlcmluZ2ApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250ZXh0KTtcbiAgICAgICAgICAgIGxldCBlbnYgPSB0aGlzLm5qa2VudigpO1xuICAgICAgICAgICAgcmV0dXJuIGVudi5yZW5kZXJTdHJpbmcoXG4gICAgICAgICAgICAgICAgdG9SZW5kZXIsXG4gICAgICAgICAgICAgICAgIWNvbnRleHQ/Lm1ldGFkYXRhXG4gICAgICAgICAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgICAgICAgICAgOiBjb250ZXh0Lm1ldGFkYXRhKTtcbiAgICAgICAgICAgIC8vIG51bmp1Y2tzLmNvbmZpZ3VyZSh7IGF1dG9lc2NhcGU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgLy8gcmV0dXJuIG51bmp1Y2tzLnJlbmRlclN0cmluZyh0ZXh0LCBtZXRhZGF0YSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBOdW5qdWNrcyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSAke2V9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE51bmp1Y2tzUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=