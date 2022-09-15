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
var _Renderer_name, _Renderer_config;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const fs_1 = require("fs");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
    render(context /*, text, metadata, vpinfo: DocumentInfo */) {
        throw new Error('implement render method');
    }
    renderSync(context /*, text, metadata, vpinfo: DocumentInfo */) {
        throw new Error('implement renderSync method');
    }
}
exports.Renderer = Renderer;
_Renderer_name = new WeakMap(), _Renderer_config = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSCwyQkFBcUM7QUFDckMsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUk3QixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFMUMsc0VBQXNFO0FBQ3RFLHVFQUF1RTtBQUN2RSwyQkFBMkI7QUFDM0Isa0RBQWtEO0FBRWxELE1BQWEsUUFBUTtJQUtqQixZQUFZLElBQVksRUFBRSxLQUFzQjtRQUhoRCxpQ0FBYztRQUNkLG1DQUF1QjtRQUduQix1QkFBQSxJQUFJLGtCQUFVLElBQUksTUFBQSxDQUFDO1FBQ25CLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztTQUNyQzthQUFNLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDOUQ7UUFDRCx1QkFBQSxJQUFJLG9CQUFXLFNBQVMsTUFBQSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLE1BQU0sS0FBb0IsT0FBTyx1QkFBQSxJQUFJLHdCQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUksTUFBTSxDQUFDLE9BQXNCLElBQUksdUJBQUEsSUFBSSxvQkFBVyxPQUFPLE1BQUEsQ0FBQyxDQUFD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QUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsYUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSTtRQUMvQixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBeUIsQ0FBQywyQ0FBMkM7UUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBeUIsQ0FBQywyQ0FBMkM7UUFDNUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FNSjtBQTVHRCw0QkE0R0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE5IERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG5pbXBvcnQgeyBwcm9taXNlcyBhcyBmc3AgfSBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBSZW5kZXJpbmdDb250ZXh0IH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IF9yZW5kZXJlcl9yZWdleCA9IFN5bWJvbCgncmVnZXgnKTtcbmNvbnN0IF9yZW5kZXJlcl9ha2FzaGEgPSBTeW1ib2woJ2FrYXNoYScpO1xuY29uc3QgX3JlbmRlcmVyX2NvbmZpZyA9IFN5bWJvbCgnY29uZmlnJyk7XG5cbi8vIFRPRE8gLSBwYXNzIHRvIGNoaWxkIGNsYXNzZXMgYXJyYXkgb2YgcGFydGlhbCBkaXJzLCBhbmQgbGF5b3V0IGRpcnNcbi8vICAgICAgLSBkZWZpbmUgYW4gb2JqZWN0IHRvIHBhc3MgaW5zdGVhZCBvZiB2cGluZm8gLSB3aGF0IGZpZWxkcyBkb2VzXG4vLyAgICAgICAgdGhpcyBvYmplY3QgbmVlZD9cbi8vICAgICAgICBcImZzcGF0aFwiIC0gZmlsZXN5c3RlbSBwYXRoIChFSlNSZW5kZXJlcilcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyIHtcblxuICAgICNuYW1lOiBzdHJpbmc7XG4gICAgI2NvbmZpZzogQ29uZmlndXJhdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcmVnZXg6IFN0cmluZyB8IFJlZ0V4cCkge1xuICAgICAgICB0aGlzLiNuYW1lICA9IG5hbWU7XG4gICAgICAgIGlmIChyZWdleCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgdGhpc1tfcmVuZGVyZXJfcmVnZXhdID0gWyByZWdleCBdO1xuICAgICAgICB9IGVsc2UgaWYgKHJlZ2V4IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXNbX3JlbmRlcmVyX3JlZ2V4XSA9IHJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWdleCBtdXN0IGJlIFJlZ0V4cCBvciBBcnJheSBvZiBSZWdFeHAnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjb25maWcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNvbmZpZygpOiBDb25maWd1cmF0aW9uIHsgcmV0dXJuIHRoaXMuI2NvbmZpZzsgfVxuICAgIHNldCBjb25maWcoX2NvbmZpZzogQ29uZmlndXJhdGlvbikgeyB0aGlzLiNjb25maWcgPSBfY29uZmlnOyB9XG5cbiAgICBnZXQgcGFydGlhbERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5wYXJ0aWFsRGlyczsgfVxuXG4gICAgZ2V0IGxheW91dERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5sYXlvdXREaXJzOyB9XG4gICAgXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuI25hbWU7IH1cbiAgICBnZXQgcmVnZXgoKTogQXJyYXk8UmVnRXhwPiB7IHJldHVybiB0aGlzW19yZW5kZXJlcl9yZWdleF07IH1cblxuICAgIG1hdGNoKGZuYW1lKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBmb3IgKHZhciByZWdleCBvZiB0aGlzLnJlZ2V4KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoZXMgPSBmbmFtZS5tYXRjaChyZWdleCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qIHtcbiAgICBcdHBhdGg6IG1hdGNoZXNbMF0sXG4gICAgXHRyZW5kZXJlZEZpbGVOYW1lOiBtYXRjaGVzWzFdLFxuICAgIFx0ZXh0ZW5zaW9uOiBtYXRjaGVzWzJdXG4gICAgfTsgKi9cblxuICAgIGZpbGVQYXRoKGZuYW1lKTogc3RyaW5nIHtcbiAgICAgICAgLy8gbG9nKGAke3RoaXMuX25hbWV9IGZpbGVQYXRoICR7Zm5hbWV9YCk7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBmb3IgKHZhciByZWdleCBvZiB0aGlzLnJlZ2V4KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoZXMgPSBmbmFtZS5tYXRjaChyZWdleCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aChzb3VyY2VQYXRoLCByZW5kZXJzVG8pOiBib29sZWFuIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHNvdXJjZVBhdGhNYXRjaFJlbmRlclBhdGggc291cmNlUGF0aCAke3NvdXJjZVBhdGh9IHJlbmRlcnNUbyAke3JlbmRlcnNUb31gKTtcbiAgICAgICAgaWYgKHBhdGguZGlybmFtZShzb3VyY2VQYXRoKSAhPT0gcGF0aC5kaXJuYW1lKHJlbmRlcnNUbykpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBzb3VyY2VQYXRoTWF0Y2hSZW5kZXJQYXRoIERJUiBzb3VyY2VQYXRoICR7cGF0aC5kaXJuYW1lKHNvdXJjZVBhdGgpfSAgRElEIE5PVCBNQVRDSCBESVIgcmVuZGVyc1RvICR7cGF0aC5kaXJuYW1lKHJlbmRlcnNUbyl9YCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlbmRlclBhdGggPSB0aGlzLmZpbGVQYXRoKHNvdXJjZVBhdGgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCByZW5kZXJQYXRoICR7cmVuZGVyUGF0aH0gcmVuZGVyc1RvICR7cmVuZGVyc1RvfWApO1xuICAgICAgICBpZiAocGF0aC5iYXNlbmFtZShyZW5kZXJQYXRoKSA9PT0gcGF0aC5iYXNlbmFtZShyZW5kZXJzVG8pKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCBiYXNlbmFtZSByZW5kZXJQYXRoICR7cGF0aC5iYXNlbmFtZShyZW5kZXJQYXRoKX0gTUFUQ0hFUyByZW5kZXJzVG8gJHtwYXRoLmJhc2VuYW1lKHJlbmRlcnNUbyl9YCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCBiYXNlbmFtZSByZW5kZXJQYXRoICR7cGF0aC5iYXNlbmFtZShyZW5kZXJQYXRoKX0gRE9FUyBOT1QgTUFUQ0ggcmVuZGVyc1RvICR7cGF0aC5iYXNlbmFtZShyZW5kZXJzVG8pfWApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZmlsZUV4dGVuc2lvbihmbmFtZSk6IHN0cmluZyB7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBmb3IgKHZhciByZWdleCBvZiB0aGlzLnJlZ2V4KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoZXMgPSBmbmFtZS5tYXRjaChyZWdleCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZEZpbGUoYmFzZWRpciwgZnBhdGgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gZnNwLnJlYWRGaWxlKHBhdGguam9pbihiYXNlZGlyLCBmcGF0aCksICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgcmVhZEZpbGVTeW5jKGJhc2VkaXIsIGZwYXRoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYmFzZWRpciwgZnBhdGgpLCAndXRmOCcpO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlRmlsZShyZW5kZXJUbywgZnBhdGgsIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIGZzcC53cml0ZUZpbGUocGF0aC5qb2luKHJlbmRlclRvLCBmcGF0aCksIHRleHQsICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgd3JpdGVGaWxlU3luYyhyZW5kZXJUbywgZnBhdGgsIHRleHQpIHtcbiAgICAgICAgcmV0dXJuIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKHJlbmRlclRvLCBmcGF0aCksIHRleHQsICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQgLyosIHRleHQsIG1ldGFkYXRhLCB2cGluZm86IERvY3VtZW50SW5mbyAqLykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcGxlbWVudCByZW5kZXIgbWV0aG9kJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0IC8qLCB0ZXh0LCBtZXRhZGF0YSwgdnBpbmZvOiBEb2N1bWVudEluZm8gKi8pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbXBsZW1lbnQgcmVuZGVyU3luYyBtZXRob2QnKTtcbiAgICB9XG5cbiAgICAvKiByZW5kZXJUb0ZpbGUoZGlyLCBmcGF0aCwgcmVuZGVyVG8sIHJlbmRlclRvUGx1cywgbWV0YWRhdGEsIGNvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcGxlbWVudCByZW5kZXJUb0ZpbGUgbWV0aG9kJyk7XG4gICAgfSAqL1xuXG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50SW5mbyA9IHtcbiAgICBmc3BhdGg6IHN0cmluZztcbiAgICB2cGF0aDogc3RyaW5nO1xufSJdfQ==