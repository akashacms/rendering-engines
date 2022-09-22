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
var _Renderer_name, _Renderer_config;
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFrontmatter = exports.Renderer = void 0;
const fs_1 = require("fs");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const _renderer_regex = Symbol('regex');
const _renderer_akasha = Symbol('akasha');
const _renderer_config = Symbol('config');
// TODO - pass to child classes array of partial dirs, and layout dirs
//      - define an object to pass instead of vpinfo - what fields does
//        this object need?
//        "fspath" - filesystem path (EJSRenderer)
class Renderer {
    constructor(name, regex) {
        _Renderer_name.set(this, void 0);
        _Renderer_config.set(this, void 0);
        __classPrivateFieldSet(this, _Renderer_name, name, "f");
        if (regex instanceof RegExp) {
            this[_renderer_regex] = [regex];
        }
        else if (regex instanceof Array) {
            this[_renderer_regex] = regex;
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
    get regex() { return this[_renderer_regex]; }
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
    fileExtension(fname) {
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                return matches[2];
            }
        }
        return null;
    }
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
     * parsing is done.
     *
     * @param context
     * @returns
     */
    parseMetadata(context) {
        return context;
    }
    /**
     * Parse frontmatter in the format of lines of dashes
     * surrounding a YAML structure.
     *
     * @param context
     * @returns
     */
    /* parseFrontmatter(context: RenderingContext) {

        let fm;
        try {
            fm = matter(context.content);
            // console.log(`HTMLRenderer frontmatter parsed frontmatter ${basedir} ${fpath}`);
        } catch (e) {
            console.log(`parseFrontmatter FAIL to read frontmatter in ${context.fspath} because ${e.stack}`);
            fm = {};
        }

        context.body = fm.content;
        context.metadata = fm.data;
        return context;
    } */
    async render(context) {
        throw new Error('implement render method');
    }
    renderSync(context) {
        throw new Error('implement renderSync method');
    }
    renderFormat(context) {
        throw new Error('Implement renderFormat');
    }
}
exports.Renderer = Renderer;
_Renderer_name = new WeakMap(), _Renderer_config = new WeakMap();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSCwyQkFBcUM7QUFDckMsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3Qiw4REFBaUM7QUFNakMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTFDLHNFQUFzRTtBQUN0RSx1RUFBdUU7QUFDdkUsMkJBQTJCO0FBQzNCLGtEQUFrRDtBQUVsRCxNQUFhLFFBQVE7SUFLakIsWUFBWSxJQUFZLEVBQUUsS0FBc0I7UUFIaEQsaUNBQWM7UUFDZCxtQ0FBdUI7UUFHbkIsdUJBQUEsSUFBSSxrQkFBVSxJQUFJLE1BQUEsQ0FBQztRQUNuQixJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7U0FDckM7YUFBTSxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNqQzthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsdUJBQUEsSUFBSSxvQkFBVyxTQUFTLE1BQUEsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxNQUFNLEtBQW9CLE9BQU8sdUJBQUEsSUFBSSx3QkFBUSxDQUFDLENBQUMsQ0FBQztJQUNwRCxJQUFJLE1BQU0sQ0FBQyxPQUFzQixJQUFJLHVCQUFBLElBQUksb0JBQVcsT0FB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QUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDMUIsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFkRCw0Q0FjQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMTkgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbmltcG9ydCB7IHByb21pc2VzIGFzIGZzcCB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJztcblxuaW1wb3J0IHtcbiAgICBDb25maWd1cmF0aW9uLCBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXRcbn0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IF9yZW5kZXJlcl9yZWdleCA9IFN5bWJvbCgncmVnZXgnKTtcbmNvbnN0IF9yZW5kZXJlcl9ha2FzaGEgPSBTeW1ib2woJ2FrYXNoYScpO1xuY29uc3QgX3JlbmRlcmVyX2NvbmZpZyA9IFN5bWJvbCgnY29uZmlnJyk7XG5cbi8vIFRPRE8gLSBwYXNzIHRvIGNoaWxkIGNsYXNzZXMgYXJyYXkgb2YgcGFydGlhbCBkaXJzLCBhbmQgbGF5b3V0IGRpcnNcbi8vICAgICAgLSBkZWZpbmUgYW4gb2JqZWN0IHRvIHBhc3MgaW5zdGVhZCBvZiB2cGluZm8gLSB3aGF0IGZpZWxkcyBkb2VzXG4vLyAgICAgICAgdGhpcyBvYmplY3QgbmVlZD9cbi8vICAgICAgICBcImZzcGF0aFwiIC0gZmlsZXN5c3RlbSBwYXRoIChFSlNSZW5kZXJlcilcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcblxuICAgICNuYW1lOiBzdHJpbmc7XG4gICAgI2NvbmZpZzogQ29uZmlndXJhdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcmVnZXg6IFN0cmluZyB8IFJlZ0V4cCkge1xuICAgICAgICB0aGlzLiNuYW1lICA9IG5hbWU7XG4gICAgICAgIGlmIChyZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgdGhpc1tfcmVuZGVyZXJfcmVnZXhdID0gWyByZWdleCBdO1xuICAgICAgICB9IGVsc2UgaWYgKHJlZ2V4IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXNbX3JlbmRlcmVyX3JlZ2V4XSA9IHJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWdleCBtdXN0IGJlIFJlZ0V4cCBvciBBcnJheSBvZiBSZWdFeHAnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjb25maWcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNvbmZpZygpOiBDb25maWd1cmF0aW9uIHsgcmV0dXJuIHRoaXMuI2NvbmZpZzsgfVxuICAgIHNldCBjb25maWcoX2NvbmZpZzogQ29uZmlndXJhdGlvbikgeyB0aGlzLiNjb25maWcgPSBfY29uZmlnOyB9XG5cbiAgICBnZXQgcGFydGlhbERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5wYXJ0aWFsRGlyczsgfVxuXG4gICAgZ2V0IGxheW91dERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5sYXlvdXREaXJzOyB9XG4gICAgXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuI25hbWU7IH1cbiAgICBnZXQgcmVnZXgoKTogQXJyYXk8UmVnRXhwPiB7IHJldHVybiB0aGlzW19yZW5kZXJlcl9yZWdleF07IH1cblxuICAgIG1hdGNoKGZuYW1lKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBmb3IgKHZhciByZWdleCBvZiB0aGlzLnJlZ2V4KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoZXMgPSBmbmFtZS5tYXRjaChyZWdleCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qIHtcbiAgICBcdHBhdGg6IG1hdGNoZXNbMF0sXG4gICAgXHRyZW5kZXJlZEZpbGVOYW1lOiBtYXRjaGVzWzFdLFxuICAgIFx0ZXh0ZW5zaW9uOiBtYXRjaGVzWzJdXG4gICAgfTsgKi9cblxuICAgIGZpbGVQYXRoKGZuYW1lKTogc3RyaW5nIHtcbiAgICAgICAgLy8gbG9nKGAke3RoaXMuX25hbWV9IGZpbGVQYXRoICR7Zm5hbWV9YCk7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBmb3IgKHZhciByZWdleCBvZiB0aGlzLnJlZ2V4KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoZXMgPSBmbmFtZS5tYXRjaChyZWdleCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aChzb3VyY2VQYXRoLCByZW5kZXJzVG8pOiBib29sZWFuIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHNvdXJjZVBhdGhNYXRjaFJlbmRlclBhdGggc291cmNlUGF0aCAke3NvdXJjZVBhdGh9IHJlbmRlcnNUbyAke3JlbmRlcnNUb31gKTtcbiAgICAgICAgaWYgKHBhdGguZGlybmFtZShzb3VyY2VQYXRoKSAhPT0gcGF0aC5kaXJuYW1lKHJlbmRlcnNUbykpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBzb3VyY2VQYXRoTWF0Y2hSZW5kZXJQYXRoIERJUiBzb3VyY2VQYXRoICR7cGF0aC5kaXJuYW1lKHNvdXJjZVBhdGgpfSAgRElEIE5PVCBNQVRDSCBESVIgcmVuZGVyc1RvICR7cGF0aC5kaXJuYW1lKHJlbmRlcnNUbyl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlbmRlclBhdGggPSB0aGlzLmZpbGVQYXRoKHNvdXJjZVBhdGgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCByZW5kZXJQYXRoICR7cmVuZGVyUGF0aH0gcmVuZGVyc1RvICR7cmVuZGVyc1RvfWApO1xuICAgICAgICBpZiAocGF0aC5iYXNlbmFtZShyZW5kZXJQYXRoKSA9PT0gcGF0aC5iYXNlbmFtZShyZW5kZXJzVG8pKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCBiYXNlbmFtZSByZW5kZXJQYXRoICR7cGF0aC5iYXNlbmFtZShyZW5kZXJQYXRoKX0gTUFUQ0hFUyByZW5kZXJzVG8gJHtwYXRoLmJhc2VuYW1lKHJlbmRlcnNUbyl9YCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCBiYXNlbmFtZSByZW5kZXJQYXRoICR7cGF0aC5iYXNlbmFtZShyZW5kZXJQYXRoKX0gRE9FUyBOT1QgTUFUQ0ggcmVuZGVyc1RvICR7cGF0aC5iYXNlbmFtZShyZW5kZXJzVG8pfWApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZmlsZUV4dGVuc2lvbihmbmFtZSk6IHN0cmluZyB7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBmb3IgKHZhciByZWdleCBvZiB0aGlzLnJlZ2V4KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoZXMgPSBmbmFtZS5tYXRjaChyZWdleCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZEZpbGUoYmFzZWRpciwgZnBhdGgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gZnNwLnJlYWRGaWxlKHBhdGguam9pbihiYXNlZGlyLCBmcGF0aCksICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgcmVhZEZpbGVTeW5jKGJhc2VkaXIsIGZwYXRoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYmFzZWRpciwgZnBhdGgpLCAndXRmOCcpO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlRmlsZShyZW5kZXJUbywgZnBhdGgsIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIGZzcC53cml0ZUZpbGUocGF0aC5qb2luKHJlbmRlclRvLCBmcGF0aCksIHRleHQsICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgd3JpdGVGaWxlU3luYyhyZW5kZXJUbywgZnBhdGgsIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKHJlbmRlclRvLCBmcGF0aCksIHRleHQsICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgLy8gSXMgcGFyc2VNZXRhZGF0YSBhbmQgcGFyc2VGcm9udG1hdHRlciByZXF1aXJlZD9cbiAgICAvLyBTaG91bGRuJ3QgdGhpcyBiZSBoYW5kbGVkIGluIEZpbGVDYWNoZT9cbiAgICAvLyBUaGUgaWRlYSBpcyBmb3IgUmVuZGVyZXJzIHRoYXQgZXhwZWN0IGZyb250bWF0dGVyXG4gICAgLy8gdG8gY2FsbCBwYXJzZUZyb250TWF0dGVyIGZyb20gcGFyc2VNZXRhZGF0YS5cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGFueSBtZXRhZGF0YSBpbiB0aGUgZG9jdW1lbnQsIGJ5IGRlZmF1bHQgbm9cbiAgICAgKiBwYXJzaW5nIGlzIGRvbmUuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAvKiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcblxuICAgICAgICBsZXQgZm07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbSA9IG1hdHRlcihjb250ZXh0LmNvbnRlbnQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYEhUTUxSZW5kZXJlciBmcm9udG1hdHRlciBwYXJzZWQgZnJvbnRtYXR0ZXIgJHtiYXNlZGlyfSAke2ZwYXRofWApO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcGFyc2VGcm9udG1hdHRlciBGQUlMIHRvIHJlYWQgZnJvbnRtYXR0ZXIgaW4gJHtjb250ZXh0LmZzcGF0aH0gYmVjYXVzZSAke2Uuc3RhY2t9YCk7XG4gICAgICAgICAgICBmbSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5ib2R5ID0gZm0uY29udGVudDtcbiAgICAgICAgY29udGV4dC5tZXRhZGF0YSA9IGZtLmRhdGE7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH0gKi9cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbXBsZW1lbnQgcmVuZGVyIG1ldGhvZCcpO1xuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IHN0cmluZyB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW1wbGVtZW50IHJlbmRlclN5bmMgbWV0aG9kJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybWF0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBSZW5kZXJpbmdGb3JtYXQge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcGxlbWVudCByZW5kZXJGb3JtYXQnKTtcbiAgICB9XG5cbiAgICAvKiByZW5kZXJUb0ZpbGUoZGlyLCBmcGF0aCwgcmVuZGVyVG8sIHJlbmRlclRvUGx1cywgbWV0YWRhdGEsIGNvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcGxlbWVudCByZW5kZXJUb0ZpbGUgbWV0aG9kJyk7XG4gICAgfSAqL1xuXG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50SW5mbyA9IHtcbiAgICBmc3BhdGg6IHN0cmluZztcbiAgICB2cGF0aDogc3RyaW5nO1xufVxuXG5cbi8qKlxuICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gKiBcbiAqIEBwYXJhbSBjb250ZXh0IFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcblxuICAgIGxldCBmbTtcbiAgICB0cnkge1xuICAgICAgICBmbSA9IG1hdHRlcihjb250ZXh0LmNvbnRlbnQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgSFRNTFJlbmRlcmVyIGZyb250bWF0dGVyIHBhcnNlZCBmcm9udG1hdHRlciAke2Jhc2VkaXJ9ICR7ZnBhdGh9YCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgcGFyc2VGcm9udG1hdHRlciBGQUlMIHRvIHJlYWQgZnJvbnRtYXR0ZXIgaW4gJHtjb250ZXh0LmZzcGF0aH0gYmVjYXVzZSAke2Uuc3RhY2t9YCk7XG4gICAgICAgIGZtID0ge307XG4gICAgfVxuXG4gICAgY29udGV4dC5ib2R5ID0gZm0uY29udGVudDtcbiAgICBjb250ZXh0Lm1ldGFkYXRhID0gZm0uZGF0YTtcbiAgICByZXR1cm4gY29udGV4dDtcbn1cbiJdfQ==