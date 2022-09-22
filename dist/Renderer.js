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
var _Renderer_name, _Renderer_config, _Renderer_regex;
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFrontmatter = exports.Renderer = void 0;
const fs_1 = require("fs");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
class Renderer {
    constructor(name, regex) {
        _Renderer_name.set(this, void 0);
        _Renderer_config.set(this, void 0);
        _Renderer_regex.set(this, void 0);
        __classPrivateFieldSet(this, _Renderer_name, name, "f");
        if (regex instanceof RegExp) {
            __classPrivateFieldSet(this, _Renderer_regex, [regex], "f");
        }
        else if (regex instanceof Array) {
            __classPrivateFieldSet(this, _Renderer_regex, regex, "f");
        }
        else {
            throw new Error('regex must be RegExp or Array of RegExp');
        }
        __classPrivateFieldSet(this, _Renderer_config, undefined, "f");
    }
    get config() { return __classPrivateFieldGet(this, _Renderer_config, "f"); }
    set config(_config) { __classPrivateFieldSet(this, _Renderer_config, _config, "f"); }
    get partialDirs() { return this.config.partialDirs; }
    get layoutDirs() { return this.config.layoutDirs; }
    get name() { return __classPrivateFieldGet(this, _Renderer_name, "f"); }
    get regex() { return __classPrivateFieldGet(this, _Renderer_regex, "f"); }
    /**
     * Test whether the file name matches a known Renderer.
     *
     * @param fname
     * @returns
     */
    match(fname) {
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                return true;
            }
        }
        return false;
    }
    /* {
        path: matches[0],
        renderedFileName: matches[1],
        extension: matches[2]
    }; */
    /**
     * Compute the pathname which a given input file should
     * have after being rendered.
     *
     * For example, an input file `example.html.md` would
     * have an output file name `example.html`.
     *
     * @param fname
     * @returns
     */
    filePath(fname) {
        // log(`${this._name} filePath ${fname}`);
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                return matches[1];
            }
        }
        return null;
    }
    sourcePathMatchRenderPath(sourcePath, rendersTo) {
        // console.log(`sourcePathMatchRenderPath sourcePath ${sourcePath} rendersTo ${rendersTo}`);
        if (path.dirname(sourcePath) !== path.dirname(rendersTo)) {
            // console.log(`sourcePathMatchRenderPath DIR sourcePath ${path.dirname(sourcePath)}  DID NOT MATCH DIR rendersTo ${path.dirname(rendersTo)}`);
            return false;
        }
        let renderPath = this.filePath(sourcePath);
        // console.log(`sourcePathMatchRenderPath renderPath ${renderPath} rendersTo ${rendersTo}`);
        if (path.basename(renderPath) === path.basename(rendersTo)) {
            // console.log(`sourcePathMatchRenderPath basename renderPath ${path.basename(renderPath)} MATCHES rendersTo ${path.basename(rendersTo)}`);
            return true;
        }
        // console.log(`sourcePathMatchRenderPath basename renderPath ${path.basename(renderPath)} DOES NOT MATCH rendersTo ${path.basename(rendersTo)}`);
        return false;
    }
    /**
     * Compute the file extension from the input file name.
     *
     * @param fname
     * @returns
     */
    fileExtension(fname) {
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                return matches[2];
            }
        }
        return null;
    }
    // These four are utility functions which we might find
    // to not be desirable for this package.
    async readFile(basedir, fpath) {
        return fs_1.promises.readFile(path.join(basedir, fpath), 'utf8');
    }
    readFileSync(basedir, fpath) {
        return fs.readFileSync(path.join(basedir, fpath), 'utf8');
    }
    async writeFile(renderTo, fpath, text) {
        return fs_1.promises.writeFile(path.join(renderTo, fpath), text, 'utf8');
    }
    writeFileSync(renderTo, fpath, text) {
        return fs.writeFileSync(path.join(renderTo, fpath), text, 'utf8');
    }
    // Is parseMetadata and parseFrontmatter required?
    // Shouldn't this be handled in FileCache?
    // The idea is for Renderers that expect frontmatter
    // to call parseFrontMatter from parseMetadata.
    /**
     * Parse any metadata in the document, by default no
     * parsing is done.  A Renderer that supports files
     * which contain metadata should implement this
     * function to parse that metadata.
     *
     * A function, `parseFrontmatter`, is available to parse
     * _frontmatter_ block at the top of a file.
     *
     * @param context
     * @returns
     */
    parseMetadata(context) {
        return context;
    }
    /**
     * Render input data allowing for asynchronous execution,
     * producing output data.
     *
     * @param context
     */
    async render(context) {
        throw new Error('implement render method');
    }
    /**
     * Render input data using only synchronous code, producing
     * output data.  Some execution contexts can only run
     * synchronous code.
     *
     * @param context
     */
    renderSync(context) {
        throw new Error('implement renderSync method');
    }
    /**
     * Indicate the sort of output produced when rendering
     * a file described in the rendering context.
     *
     * @param context
     */
    renderFormat(context) {
        throw new Error('Implement renderFormat');
    }
}
exports.Renderer = Renderer;
_Renderer_name = new WeakMap(), _Renderer_config = new WeakMap(), _Renderer_regex = new WeakMap();
/**
 * Parse frontmatter in the format of lines of dashes
 * surrounding a YAML structure.
 *
 * @param context
 * @returns
 */
function parseFrontmatter(context) {
    let fm;
    try {
        fm = (0, gray_matter_1.default)(context.content);
        // console.log(`HTMLRenderer frontmatter parsed frontmatter ${basedir} ${fpath}`);
    }
    catch (e) {
        console.log(`parseFrontmatter FAIL to read frontmatter in ${context.fspath} because ${e.stack}`);
        fm = {};
    }
    context.body = fm.content;
    context.metadata = fm.data;
    return context;
}
exports.parseFrontmatter = parseFrontmatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSCwyQkFBcUM7QUFDckMsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3Qiw4REFBaUM7QUFNakMsTUFBYSxRQUFRO0lBTWpCLFlBQVksSUFBWSxFQUFFLEtBQXNCO1FBSmhELGlDQUFjO1FBQ2QsbUNBQXVCO1FBQ3ZCLGtDQUFzQjtRQUdsQix1QkFBQSxJQUFJLGtCQUFVLElBQUksTUFBQSxDQUFDO1FBQ25CLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUN6Qix1QkFBQSxJQUFJLG1CQUFVLENBQUUsS0FBSyxDQUFFLE1BQUEsQ0FBQztTQUMzQjthQUFNLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUMvQix1QkFBQSxJQUFJLG1CQUFVLEtBQUssTUFBQSxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDOUQ7UUFDRCx1QkFBQSxJQUFJLG9CQUFXLFNBQVMsTUFBQSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLE1BQU0sS0FBb0IsT0FBTyx1QkFBQSxJQUFJLHdCQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUksTUFBTSxDQUFDLE9BQXNCLElBQUksdUJBQUEsSUFBSSxvQkFBVyxPQUFPLE1BQUEsQ0FBQyxDQUFDLENBQUM7SUFFOUQsSUFBSSxXQUFXLEtBQW9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBRXBFLElBQUksVUFBVSxLQUFvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUVsRSxJQUFJLElBQUksS0FBYSxPQUFPLHVCQUFB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QUM7QUFkRCw0Q0FjQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbmltcG9ydCB7IHByb21pc2VzIGFzIGZzcCB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJztcblxuaW1wb3J0IHtcbiAgICBDb25maWd1cmF0aW9uLCBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXRcbn0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XG5cbiAgICAjbmFtZTogc3RyaW5nO1xuICAgICNjb25maWc6IENvbmZpZ3VyYXRpb247XG4gICAgI3JlZ2V4OiBBcnJheTxSZWdFeHA+O1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCByZWdleDogU3RyaW5nIHwgUmVnRXhwKSB7XG4gICAgICAgIHRoaXMuI25hbWUgID0gbmFtZTtcbiAgICAgICAgaWYgKHJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICB0aGlzLiNyZWdleCA9IFsgcmVnZXggXTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWdleCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLiNyZWdleCA9IHJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWdleCBtdXN0IGJlIFJlZ0V4cCBvciBBcnJheSBvZiBSZWdFeHAnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjb25maWcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNvbmZpZygpOiBDb25maWd1cmF0aW9uIHsgcmV0dXJuIHRoaXMuI2NvbmZpZzsgfVxuICAgIHNldCBjb25maWcoX2NvbmZpZzogQ29uZmlndXJhdGlvbikgeyB0aGlzLiNjb25maWcgPSBfY29uZmlnOyB9XG5cbiAgICBnZXQgcGFydGlhbERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5wYXJ0aWFsRGlyczsgfVxuXG4gICAgZ2V0IGxheW91dERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5sYXlvdXREaXJzOyB9XG4gICAgXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuI25hbWU7IH1cbiAgICBnZXQgcmVnZXgoKTogQXJyYXk8UmVnRXhwPiB7IHJldHVybiB0aGlzLiNyZWdleDsgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBmaWxlIG5hbWUgbWF0Y2hlcyBhIGtub3duIFJlbmRlcmVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBmbmFtZSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBtYXRjaChmbmFtZSk6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgbWF0Y2hlcztcbiAgICAgICAgZm9yICh2YXIgcmVnZXggb2YgdGhpcy5yZWdleCkge1xuICAgICAgICAgICAgaWYgKChtYXRjaGVzID0gZm5hbWUubWF0Y2gocmVnZXgpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiB7XG4gICAgXHRwYXRoOiBtYXRjaGVzWzBdLFxuICAgIFx0cmVuZGVyZWRGaWxlTmFtZTogbWF0Y2hlc1sxXSxcbiAgICBcdGV4dGVuc2lvbjogbWF0Y2hlc1syXVxuICAgIH07ICovXG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHRoZSBwYXRobmFtZSB3aGljaCBhIGdpdmVuIGlucHV0IGZpbGUgc2hvdWxkXG4gICAgICogaGF2ZSBhZnRlciBiZWluZyByZW5kZXJlZC5cbiAgICAgKiBcbiAgICAgKiBGb3IgZXhhbXBsZSwgYW4gaW5wdXQgZmlsZSBgZXhhbXBsZS5odG1sLm1kYCB3b3VsZFxuICAgICAqIGhhdmUgYW4gb3V0cHV0IGZpbGUgbmFtZSBgZXhhbXBsZS5odG1sYC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZm5hbWUgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZmlsZVBhdGgoZm5hbWUpOiBzdHJpbmcge1xuICAgICAgICAvLyBsb2coYCR7dGhpcy5fbmFtZX0gZmlsZVBhdGggJHtmbmFtZX1gKTtcbiAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgIGZvciAodmFyIHJlZ2V4IG9mIHRoaXMucmVnZXgpIHtcbiAgICAgICAgICAgIGlmICgobWF0Y2hlcyA9IGZuYW1lLm1hdGNoKHJlZ2V4KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzb3VyY2VQYXRoTWF0Y2hSZW5kZXJQYXRoKHNvdXJjZVBhdGgsIHJlbmRlcnNUbyk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCBzb3VyY2VQYXRoICR7c291cmNlUGF0aH0gcmVuZGVyc1RvICR7cmVuZGVyc1RvfWApO1xuICAgICAgICBpZiAocGF0aC5kaXJuYW1lKHNvdXJjZVBhdGgpICE9PSBwYXRoLmRpcm5hbWUocmVuZGVyc1RvKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHNvdXJjZVBhdGhNYXRjaFJlbmRlclBhdGggRElSIHNvdXJjZVBhdGggJHtwYXRoLmRpcm5hbWUoc291cmNlUGF0aCl9ICBESUQgTk9UIE1BVENIIERJUiByZW5kZXJzVG8gJHtwYXRoLmRpcm5hbWUocmVuZGVyc1RvKX1gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVuZGVyUGF0aCA9IHRoaXMuZmlsZVBhdGgoc291cmNlUGF0aCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBzb3VyY2VQYXRoTWF0Y2hSZW5kZXJQYXRoIHJlbmRlclBhdGggJHtyZW5kZXJQYXRofSByZW5kZXJzVG8gJHtyZW5kZXJzVG99YCk7XG4gICAgICAgIGlmIChwYXRoLmJhc2VuYW1lKHJlbmRlclBhdGgpID09PSBwYXRoLmJhc2VuYW1lKHJlbmRlcnNUbykpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBzb3VyY2VQYXRoTWF0Y2hSZW5kZXJQYXRoIGJhc2VuYW1lIHJlbmRlclBhdGggJHtwYXRoLmJhc2VuYW1lKHJlbmRlclBhdGgpfSBNQVRDSEVTIHJlbmRlcnNUbyAke3BhdGguYmFzZW5hbWUocmVuZGVyc1RvKX1gKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBzb3VyY2VQYXRoTWF0Y2hSZW5kZXJQYXRoIGJhc2VuYW1lIHJlbmRlclBhdGggJHtwYXRoLmJhc2VuYW1lKHJlbmRlclBhdGgpfSBET0VTIE5PVCBNQVRDSCByZW5kZXJzVG8gJHtwYXRoLmJhc2VuYW1lKHJlbmRlcnNUbyl9YCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHRoZSBmaWxlIGV4dGVuc2lvbiBmcm9tIHRoZSBpbnB1dCBmaWxlIG5hbWUuXG4gICAgICogXG4gICAgICogQHBhcmFtIGZuYW1lIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGZpbGVFeHRlbnNpb24oZm5hbWUpOiBzdHJpbmcge1xuICAgICAgICB2YXIgbWF0Y2hlcztcbiAgICAgICAgZm9yICh2YXIgcmVnZXggb2YgdGhpcy5yZWdleCkge1xuICAgICAgICAgICAgaWYgKChtYXRjaGVzID0gZm5hbWUubWF0Y2gocmVnZXgpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFRoZXNlIGZvdXIgYXJlIHV0aWxpdHkgZnVuY3Rpb25zIHdoaWNoIHdlIG1pZ2h0IGZpbmRcbiAgICAvLyB0byBub3QgYmUgZGVzaXJhYmxlIGZvciB0aGlzIHBhY2thZ2UuXG5cbiAgICBhc3luYyByZWFkRmlsZShiYXNlZGlyLCBmcGF0aCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBmc3AucmVhZEZpbGUocGF0aC5qb2luKGJhc2VkaXIsIGZwYXRoKSwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICByZWFkRmlsZVN5bmMoYmFzZWRpciwgZnBhdGgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlZGlyLCBmcGF0aCksICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGVGaWxlKHJlbmRlclRvLCBmcGF0aCwgdGV4dCkge1xuICAgICAgICByZXR1cm4gZnNwLndyaXRlRmlsZShwYXRoLmpvaW4ocmVuZGVyVG8sIGZwYXRoKSwgdGV4dCwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICB3cml0ZUZpbGVTeW5jKHJlbmRlclRvLCBmcGF0aCwgdGV4dCkge1xuICAgICAgICByZXR1cm4gZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ocmVuZGVyVG8sIGZwYXRoKSwgdGV4dCwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICAvLyBJcyBwYXJzZU1ldGFkYXRhIGFuZCBwYXJzZUZyb250bWF0dGVyIHJlcXVpcmVkP1xuICAgIC8vIFNob3VsZG4ndCB0aGlzIGJlIGhhbmRsZWQgaW4gRmlsZUNhY2hlP1xuICAgIC8vIFRoZSBpZGVhIGlzIGZvciBSZW5kZXJlcnMgdGhhdCBleHBlY3QgZnJvbnRtYXR0ZXJcbiAgICAvLyB0byBjYWxsIHBhcnNlRnJvbnRNYXR0ZXIgZnJvbSBwYXJzZU1ldGFkYXRhLlxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgYW55IG1ldGFkYXRhIGluIHRoZSBkb2N1bWVudCwgYnkgZGVmYXVsdCBub1xuICAgICAqIHBhcnNpbmcgaXMgZG9uZS4gIEEgUmVuZGVyZXIgdGhhdCBzdXBwb3J0cyBmaWxlc1xuICAgICAqIHdoaWNoIGNvbnRhaW4gbWV0YWRhdGEgc2hvdWxkIGltcGxlbWVudCB0aGlzXG4gICAgICogZnVuY3Rpb24gdG8gcGFyc2UgdGhhdCBtZXRhZGF0YS5cbiAgICAgKiBcbiAgICAgKiBBIGZ1bmN0aW9uLCBgcGFyc2VGcm9udG1hdHRlcmAsIGlzIGF2YWlsYWJsZSB0byBwYXJzZVxuICAgICAqIF9mcm9udG1hdHRlcl8gYmxvY2sgYXQgdGhlIHRvcCBvZiBhIGZpbGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlciBpbnB1dCBkYXRhIGFsbG93aW5nIGZvciBhc3luY2hyb25vdXMgZXhlY3V0aW9uLFxuICAgICAqIHByb2R1Y2luZyBvdXRwdXQgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKi9cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW1wbGVtZW50IHJlbmRlciBtZXRob2QnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgaW5wdXQgZGF0YSB1c2luZyBvbmx5IHN5bmNocm9ub3VzIGNvZGUsIHByb2R1Y2luZ1xuICAgICAqIG91dHB1dCBkYXRhLiAgU29tZSBleGVjdXRpb24gY29udGV4dHMgY2FuIG9ubHkgcnVuXG4gICAgICogc3luY2hyb25vdXMgY29kZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKi9cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBzdHJpbmcge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcGxlbWVudCByZW5kZXJTeW5jIG1ldGhvZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlIHRoZSBzb3J0IG9mIG91dHB1dCBwcm9kdWNlZCB3aGVuIHJlbmRlcmluZ1xuICAgICAqIGEgZmlsZSBkZXNjcmliZWQgaW4gdGhlIHJlbmRlcmluZyBjb250ZXh0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqL1xuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nRm9ybWF0IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBsZW1lbnQgcmVuZGVyRm9ybWF0Jyk7XG4gICAgfVxuXG4gICAgLyogcmVuZGVyVG9GaWxlKGRpciwgZnBhdGgsIHJlbmRlclRvLCByZW5kZXJUb1BsdXMsIG1ldGFkYXRhLCBjb25maWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbXBsZW1lbnQgcmVuZGVyVG9GaWxlIG1ldGhvZCcpO1xuICAgIH0gKi9cblxufVxuXG4vKipcbiAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICogXG4gKiBAcGFyYW0gY29udGV4dCBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG5cbiAgICBsZXQgZm07XG4gICAgdHJ5IHtcbiAgICAgICAgZm0gPSBtYXR0ZXIoY29udGV4dC5jb250ZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEhUTUxSZW5kZXJlciBmcm9udG1hdHRlciBwYXJzZWQgZnJvbnRtYXR0ZXIgJHtiYXNlZGlyfSAke2ZwYXRofWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHBhcnNlRnJvbnRtYXR0ZXIgRkFJTCB0byByZWFkIGZyb250bWF0dGVyIGluICR7Y29udGV4dC5mc3BhdGh9IGJlY2F1c2UgJHtlLnN0YWNrfWApO1xuICAgICAgICBmbSA9IHt9O1xuICAgIH1cblxuICAgIGNvbnRleHQuYm9keSA9IGZtLmNvbnRlbnQ7XG4gICAgY29udGV4dC5tZXRhZGF0YSA9IGZtLmRhdGE7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4iXX0=