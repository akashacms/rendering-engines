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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Renderer_name, _Renderer_config, _Renderer_regex;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
exports.parseFrontmatter = parseFrontmatter;
const node_fs_1 = require("node:fs");
const node_fs_2 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
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
    // Note that the preferred REGEX is now a dual thing
    // that will either match .html.EXT or just .EXT.
    // It means the matches array now has five entries
    // numbered as so:
    //
    //    [0] -- The original file name
    //      THESE TWO ARE FOR .html.EXT
    //    [1] -- The file name missing the final extension
    //           "file.html"
    //    [2] -- The final extension
    //      THESE TWO ARE FOR .EXT
    //    [3] -- The file name missing the final extension
    //           "file"
    //    [4] -- The final extension
    //
    // ```
    // > 'foo.adoc'.match( /^(.*\.html)\.(adoc)$|^(.*)\.(adoc)$/)
    // [
    // 'foo.adoc',
    // undefined,
    // undefined,
    // 'foo',
    // 'adoc',
    // index: 0,
    // input: 'foo.adoc',
    // groups: undefined
    // ]
    // > 'foo.html.adoc'.match( /^(.*\.html)\.(adoc)$|^(.*)\.(adoc)$/)
    // [
    // 'foo.html.adoc',
    // 'foo.html',
    // 'adoc',
    // undefined,
    // undefined,
    // index: 0,
    // input: 'foo.html.adoc',
    // groups: undefined
    // ]
    // ```
    /**
     * Compute the pathname which a given input file should
     * have after being rendered.
     *
     * For example, an input file `example.html.md` would
     * have an output file name `example.html`.
     *
     * For `example.md` the renderTo extension is not
     * available in the file name.  So long as
     * the renderFormat result is the uppercase of
     * the renderTo extension, then we can compute
     * the correct extension to use.
     *
     * @param fname
     * @returns
     */
    filePath(fname) {
        // log(`${this._name} filePath ${fname}`);
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                // console.log(`filePath ${fname} `, matches);
                return typeof matches[1] !== 'undefined'
                    ? matches[1]
                    // Substitute the renderFormat
                    // for the desired extension
                    : matches[3] + '.' + this.renderFormat({
                        fspath: fname,
                        content: '',
                        metadata: {}
                    }).toLowerCase();
            }
        }
        return null;
    }
    sourcePathMatchRenderPath(sourcePath, rendersTo) {
        // console.log(`sourcePathMatchRenderPath sourcePath ${sourcePath} rendersTo ${rendersTo}`);
        if (node_path_1.default.dirname(sourcePath) !== node_path_1.default.dirname(rendersTo)) {
            // console.log(`sourcePathMatchRenderPath DIR sourcePath ${path.dirname(sourcePath)}  DID NOT MATCH DIR rendersTo ${path.dirname(rendersTo)}`);
            return false;
        }
        let renderPath = this.filePath(sourcePath);
        // console.log(`sourcePathMatchRenderPath renderPath ${renderPath} rendersTo ${rendersTo}`);
        if (node_path_1.default.basename(renderPath) === node_path_1.default.basename(rendersTo)) {
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
                return typeof matches[2] !== 'undefined'
                    ? matches[2]
                    : matches[4];
            }
        }
        return null;
    }
    // These four are utility functions which we might find
    // to not be desirable for this package.
    async readFile(basedir, fpath) {
        return node_fs_1.promises.readFile(node_path_1.default.join(basedir, fpath), 'utf8');
    }
    readFileSync(basedir, fpath) {
        return node_fs_2.default.readFileSync(node_path_1.default.join(basedir, fpath), 'utf8');
    }
    async writeFile(renderTo, fpath, text) {
        return node_fs_1.promises.writeFile(node_path_1.default.join(renderTo, fpath), text, 'utf8');
    }
    writeFileSync(renderTo, fpath, text) {
        return node_fs_2.default.writeFileSync(node_path_1.default.join(renderTo, fpath), text, 'utf8');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaVFILDRDQWNDO0FBNVFELHFDQUEwQztBQUMxQyxzREFBeUI7QUFDekIsMERBQTZCO0FBQzdCLDhEQUFpQztBQU1qQyxNQUFhLFFBQVE7SUFNakIsWUFBWSxJQUFZLEVBQUUsS0FBc0I7UUFKaEQsaUNBQWM7UUFDZCxtQ0FBdUI7UUFDdkIsa0NBQXNCO1FBR2xCLHVCQUFBLElBQUksa0JBQVUsSUFBSSxNQUFBLENBQUM7UUFDbkIsSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFLENBQUM7WUFDMUIsdUJBQUEsSUFBSSxtQkFBVSxDQUFFLEtBQUssQ0FBRSxNQUFBLENBQUM7UUFDNUIsQ0FBQzthQUFNLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRSxDQUFDO1lBQ2hDLHVCQUFBLElBQUksbUJBQVUsS0FBSyxNQUFBLENBQUM7UUFDeEIsQ0FBQzthQUFNLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELHVCQUFBLElBQUksb0JBQVcsU0FBUyxNQUFBLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksTUFBTSxLQUFvQixPQUFPLHVCQUFBLElBQUksd0JBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEQsSUFBSSxNQUFNLENBQUMsT0FBc0IsSUFBSSx1QkFBQSxJQUFJLG9CQUFXLE9BQU8sTUFBQSxDQUFDLENBQUMsQ0FBQztJQUU5RCxJQUFJLFdBQVcsS0FBb0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFFcEUsSUFBSSxVQUFVLEtBQW9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRWxFLElBQUksSUFBSSxLQUFhLE9BQU8sdUJBQUEsSUFBSSxzQkFBTSxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLEtBQUssS0FBb0IsT0FBTyx1QkFBQSxJQUFJLHVCQUFPLENBQUMsQ0FBQyxDQUFDO0lBRWxEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLEtBQUs7UUFDUCxJQUFJLE9BQU8sQ0FBQztRQUNaLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUMxQyxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztTQUlLO0lBR0wsb0RBQW9EO0lBQ3BELGlEQUFpRDtJQUNqRCxrREFBa0Q7SUFDbEQsa0JBQWtCO0lBQ2xCLEVBQUU7SUFDRixtQ0FBbUM7SUFDbkMsbUNBQW1DO0lBQ25DLHNEQUFzRDtJQUN0RCx3QkFBd0I7SUFDeEIsZ0NBQWdDO0lBQ2hDLDhCQUE4QjtJQUM5QixzREFBc0Q7SUFDdEQsbUJBQW1CO0lBQ25CLGdDQUFnQztJQUNoQyxFQUFFO0lBQ0YsTUFBTTtJQUNOLDZEQUE2RDtJQUM3RCxJQUFJO0lBQ0osY0FBYztJQUNkLGFBQWE7SUFDYixhQUFhO0lBQ2IsU0FBUztJQUNULFVBQVU7SUFDVixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLG9CQUFvQjtJQUNwQixJQUFJO0lBQ0osa0VBQWtFO0lBQ2xFLElBQUk7SUFDSixtQkFBbUI7SUFDbkIsY0FBYztJQUNkLFVBQVU7SUFDVixhQUFhO0lBQ2IsYUFBYTtJQUNiLFlBQVk7SUFDWiwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLElBQUk7SUFDSixNQUFNO0lBRU47Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsUUFBUSxDQUFDLEtBQUs7UUFDViwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLENBQUM7UUFDWixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDMUMsOENBQThDO2dCQUM5QyxPQUFPLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVc7b0JBQ3BDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNaLDhCQUE4QjtvQkFDOUIsNEJBQTRCO29CQUM1QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFFLEdBQUcsR0FBRSxJQUFJLENBQUMsWUFBWSxDQUFDO3dCQUNqQyxNQUFNLEVBQUUsS0FBSzt3QkFDYixPQUFPLEVBQUUsRUFBRTt3QkFDWCxRQUFRLEVBQUUsRUFBRTtxQkFDZixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekIsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQseUJBQXlCLENBQUMsVUFBVSxFQUFFLFNBQVM7UUFDM0MsNEZBQTRGO1FBQzVGLElBQUksbUJBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssbUJBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUN2RCwrSUFBK0k7WUFDL0ksT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsNEZBQTRGO1FBQzVGLElBQUksbUJBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssbUJBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUN6RCwySUFBMkk7WUFDM0ksT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELGtKQUFrSjtRQUNsSixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhLENBQUMsS0FBSztRQUNmLElBQUksT0FBTyxDQUFDO1FBQ1osS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7Z0JBQzFDLE9BQU8sT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVztvQkFDcEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ1osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx1REFBdUQ7SUFDdkQsd0NBQXdDO0lBRXhDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUs7UUFDekIsT0FBTyxrQkFBRyxDQUFDLFFBQVEsQ0FBQyxtQkFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSztRQUN2QixPQUFPLGlCQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUk7UUFDakMsT0FBTyxrQkFBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJO1FBQy9CLE9BQU8saUJBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELDBDQUEwQztJQUMxQyxvREFBb0Q7SUFDcEQsK0NBQStDO0lBRS9DOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsYUFBYSxDQUFDLE9BQXlCO1FBQ25DLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBeUI7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxVQUFVLENBQUMsT0FBeUI7UUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDOUMsQ0FBQztDQU1KO0FBNU9ELDRCQTRPQzs7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxPQUF5QjtJQUV0RCxJQUFJLEVBQUUsQ0FBQztJQUNQLElBQUksQ0FBQztRQUNELEVBQUUsR0FBRyxJQUFBLHFCQUFNLEVBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLGtGQUFrRjtJQUN0RixDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELE9BQU8sQ0FBQyxNQUFNLFlBQVksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakcsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDMUIsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNCLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG5pbXBvcnQgeyBwcm9taXNlcyBhcyBmc3AgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCBmcyBmcm9tICdub2RlOmZzJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJztcblxuaW1wb3J0IHtcbiAgICBDb25maWd1cmF0aW9uLCBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXRcbn0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XG5cbiAgICAjbmFtZTogc3RyaW5nO1xuICAgICNjb25maWc6IENvbmZpZ3VyYXRpb247XG4gICAgI3JlZ2V4OiBBcnJheTxSZWdFeHA+O1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCByZWdleDogU3RyaW5nIHwgUmVnRXhwKSB7XG4gICAgICAgIHRoaXMuI25hbWUgID0gbmFtZTtcbiAgICAgICAgaWYgKHJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICB0aGlzLiNyZWdleCA9IFsgcmVnZXggXTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWdleCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLiNyZWdleCA9IHJlZ2V4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWdleCBtdXN0IGJlIFJlZ0V4cCBvciBBcnJheSBvZiBSZWdFeHAnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjb25maWcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNvbmZpZygpOiBDb25maWd1cmF0aW9uIHsgcmV0dXJuIHRoaXMuI2NvbmZpZzsgfVxuICAgIHNldCBjb25maWcoX2NvbmZpZzogQ29uZmlndXJhdGlvbikgeyB0aGlzLiNjb25maWcgPSBfY29uZmlnOyB9XG5cbiAgICBnZXQgcGFydGlhbERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5wYXJ0aWFsRGlyczsgfVxuXG4gICAgZ2V0IGxheW91dERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLmNvbmZpZy5sYXlvdXREaXJzOyB9XG4gICAgXG4gICAgZ2V0IG5hbWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuI25hbWU7IH1cbiAgICBnZXQgcmVnZXgoKTogQXJyYXk8UmVnRXhwPiB7IHJldHVybiB0aGlzLiNyZWdleDsgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBmaWxlIG5hbWUgbWF0Y2hlcyBhIGtub3duIFJlbmRlcmVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBmbmFtZSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBtYXRjaChmbmFtZSk6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgbWF0Y2hlcztcbiAgICAgICAgZm9yICh2YXIgcmVnZXggb2YgdGhpcy5yZWdleCkge1xuICAgICAgICAgICAgaWYgKChtYXRjaGVzID0gZm5hbWUubWF0Y2gocmVnZXgpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiB7XG4gICAgXHRwYXRoOiBtYXRjaGVzWzBdLFxuICAgIFx0cmVuZGVyZWRGaWxlTmFtZTogbWF0Y2hlc1sxXSxcbiAgICBcdGV4dGVuc2lvbjogbWF0Y2hlc1syXVxuICAgIH07ICovXG5cblxuICAgIC8vIE5vdGUgdGhhdCB0aGUgcHJlZmVycmVkIFJFR0VYIGlzIG5vdyBhIGR1YWwgdGhpbmdcbiAgICAvLyB0aGF0IHdpbGwgZWl0aGVyIG1hdGNoIC5odG1sLkVYVCBvciBqdXN0IC5FWFQuXG4gICAgLy8gSXQgbWVhbnMgdGhlIG1hdGNoZXMgYXJyYXkgbm93IGhhcyBmaXZlIGVudHJpZXNcbiAgICAvLyBudW1iZXJlZCBhcyBzbzpcbiAgICAvL1xuICAgIC8vICAgIFswXSAtLSBUaGUgb3JpZ2luYWwgZmlsZSBuYW1lXG4gICAgLy8gICAgICBUSEVTRSBUV08gQVJFIEZPUiAuaHRtbC5FWFRcbiAgICAvLyAgICBbMV0gLS0gVGhlIGZpbGUgbmFtZSBtaXNzaW5nIHRoZSBmaW5hbCBleHRlbnNpb25cbiAgICAvLyAgICAgICAgICAgXCJmaWxlLmh0bWxcIlxuICAgIC8vICAgIFsyXSAtLSBUaGUgZmluYWwgZXh0ZW5zaW9uXG4gICAgLy8gICAgICBUSEVTRSBUV08gQVJFIEZPUiAuRVhUXG4gICAgLy8gICAgWzNdIC0tIFRoZSBmaWxlIG5hbWUgbWlzc2luZyB0aGUgZmluYWwgZXh0ZW5zaW9uXG4gICAgLy8gICAgICAgICAgIFwiZmlsZVwiXG4gICAgLy8gICAgWzRdIC0tIFRoZSBmaW5hbCBleHRlbnNpb25cbiAgICAvL1xuICAgIC8vIGBgYFxuICAgIC8vID4gJ2Zvby5hZG9jJy5tYXRjaCggL14oLipcXC5odG1sKVxcLihhZG9jKSR8XiguKilcXC4oYWRvYykkLylcbiAgICAvLyBbXG4gICAgLy8gJ2Zvby5hZG9jJyxcbiAgICAvLyB1bmRlZmluZWQsXG4gICAgLy8gdW5kZWZpbmVkLFxuICAgIC8vICdmb28nLFxuICAgIC8vICdhZG9jJyxcbiAgICAvLyBpbmRleDogMCxcbiAgICAvLyBpbnB1dDogJ2Zvby5hZG9jJyxcbiAgICAvLyBncm91cHM6IHVuZGVmaW5lZFxuICAgIC8vIF1cbiAgICAvLyA+ICdmb28uaHRtbC5hZG9jJy5tYXRjaCggL14oLipcXC5odG1sKVxcLihhZG9jKSR8XiguKilcXC4oYWRvYykkLylcbiAgICAvLyBbXG4gICAgLy8gJ2Zvby5odG1sLmFkb2MnLFxuICAgIC8vICdmb28uaHRtbCcsXG4gICAgLy8gJ2Fkb2MnLFxuICAgIC8vIHVuZGVmaW5lZCxcbiAgICAvLyB1bmRlZmluZWQsXG4gICAgLy8gaW5kZXg6IDAsXG4gICAgLy8gaW5wdXQ6ICdmb28uaHRtbC5hZG9jJyxcbiAgICAvLyBncm91cHM6IHVuZGVmaW5lZFxuICAgIC8vIF1cbiAgICAvLyBgYGBcblxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdGhlIHBhdGhuYW1lIHdoaWNoIGEgZ2l2ZW4gaW5wdXQgZmlsZSBzaG91bGRcbiAgICAgKiBoYXZlIGFmdGVyIGJlaW5nIHJlbmRlcmVkLlxuICAgICAqIFxuICAgICAqIEZvciBleGFtcGxlLCBhbiBpbnB1dCBmaWxlIGBleGFtcGxlLmh0bWwubWRgIHdvdWxkXG4gICAgICogaGF2ZSBhbiBvdXRwdXQgZmlsZSBuYW1lIGBleGFtcGxlLmh0bWxgLlxuICAgICAqXG4gICAgICogRm9yIGBleGFtcGxlLm1kYCB0aGUgcmVuZGVyVG8gZXh0ZW5zaW9uIGlzIG5vdFxuICAgICAqIGF2YWlsYWJsZSBpbiB0aGUgZmlsZSBuYW1lLiAgU28gbG9uZyBhc1xuICAgICAqIHRoZSByZW5kZXJGb3JtYXQgcmVzdWx0IGlzIHRoZSB1cHBlcmNhc2Ugb2ZcbiAgICAgKiB0aGUgcmVuZGVyVG8gZXh0ZW5zaW9uLCB0aGVuIHdlIGNhbiBjb21wdXRlXG4gICAgICogdGhlIGNvcnJlY3QgZXh0ZW5zaW9uIHRvIHVzZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZm5hbWUgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZmlsZVBhdGgoZm5hbWUpOiBzdHJpbmcge1xuICAgICAgICAvLyBsb2coYCR7dGhpcy5fbmFtZX0gZmlsZVBhdGggJHtmbmFtZX1gKTtcbiAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgIGZvciAodmFyIHJlZ2V4IG9mIHRoaXMucmVnZXgpIHtcbiAgICAgICAgICAgIGlmICgobWF0Y2hlcyA9IGZuYW1lLm1hdGNoKHJlZ2V4KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZmlsZVBhdGggJHtmbmFtZX0gYCwgbWF0Y2hlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBtYXRjaGVzWzFdICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgICAgICA/IG1hdGNoZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgLy8gU3Vic3RpdHV0ZSB0aGUgcmVuZGVyRm9ybWF0XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciB0aGUgZGVzaXJlZCBleHRlbnNpb25cbiAgICAgICAgICAgICAgICAgICAgOiBtYXRjaGVzWzNdICsnLicrIHRoaXMucmVuZGVyRm9ybWF0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzcGF0aDogZm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB7fVxuICAgICAgICAgICAgICAgICAgICB9KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNvdXJjZVBhdGhNYXRjaFJlbmRlclBhdGgoc291cmNlUGF0aCwgcmVuZGVyc1RvKTogYm9vbGVhbiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBzb3VyY2VQYXRoTWF0Y2hSZW5kZXJQYXRoIHNvdXJjZVBhdGggJHtzb3VyY2VQYXRofSByZW5kZXJzVG8gJHtyZW5kZXJzVG99YCk7XG4gICAgICAgIGlmIChwYXRoLmRpcm5hbWUoc291cmNlUGF0aCkgIT09IHBhdGguZGlybmFtZShyZW5kZXJzVG8pKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgc291cmNlUGF0aE1hdGNoUmVuZGVyUGF0aCBESVIgc291cmNlUGF0aCAke3BhdGguZGlybmFtZShzb3VyY2VQYXRoKX0gIERJRCBOT1QgTUFUQ0ggRElSIHJlbmRlcnNUbyAke3BhdGguZGlybmFtZShyZW5kZXJzVG8pfWApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZW5kZXJQYXRoID0gdGhpcy5maWxlUGF0aChzb3VyY2VQYXRoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHNvdXJjZVBhdGhNYXRjaFJlbmRlclBhdGggcmVuZGVyUGF0aCAke3JlbmRlclBhdGh9IHJlbmRlcnNUbyAke3JlbmRlcnNUb31gKTtcbiAgICAgICAgaWYgKHBhdGguYmFzZW5hbWUocmVuZGVyUGF0aCkgPT09IHBhdGguYmFzZW5hbWUocmVuZGVyc1RvKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHNvdXJjZVBhdGhNYXRjaFJlbmRlclBhdGggYmFzZW5hbWUgcmVuZGVyUGF0aCAke3BhdGguYmFzZW5hbWUocmVuZGVyUGF0aCl9IE1BVENIRVMgcmVuZGVyc1RvICR7cGF0aC5iYXNlbmFtZShyZW5kZXJzVG8pfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYHNvdXJjZVBhdGhNYXRjaFJlbmRlclBhdGggYmFzZW5hbWUgcmVuZGVyUGF0aCAke3BhdGguYmFzZW5hbWUocmVuZGVyUGF0aCl9IERPRVMgTk9UIE1BVENIIHJlbmRlcnNUbyAke3BhdGguYmFzZW5hbWUocmVuZGVyc1RvKX1gKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdGhlIGZpbGUgZXh0ZW5zaW9uIGZyb20gdGhlIGlucHV0IGZpbGUgbmFtZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZm5hbWUgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZmlsZUV4dGVuc2lvbihmbmFtZSk6IHN0cmluZyB7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBmb3IgKHZhciByZWdleCBvZiB0aGlzLnJlZ2V4KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoZXMgPSBmbmFtZS5tYXRjaChyZWdleCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBtYXRjaGVzWzJdICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgICAgICA/IG1hdGNoZXNbMl1cbiAgICAgICAgICAgICAgICAgICAgOiBtYXRjaGVzWzRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIFRoZXNlIGZvdXIgYXJlIHV0aWxpdHkgZnVuY3Rpb25zIHdoaWNoIHdlIG1pZ2h0IGZpbmRcbiAgICAvLyB0byBub3QgYmUgZGVzaXJhYmxlIGZvciB0aGlzIHBhY2thZ2UuXG5cbiAgICBhc3luYyByZWFkRmlsZShiYXNlZGlyLCBmcGF0aCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBmc3AucmVhZEZpbGUocGF0aC5qb2luKGJhc2VkaXIsIGZwYXRoKSwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICByZWFkRmlsZVN5bmMoYmFzZWRpciwgZnBhdGgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihiYXNlZGlyLCBmcGF0aCksICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGVGaWxlKHJlbmRlclRvLCBmcGF0aCwgdGV4dCkge1xuICAgICAgICByZXR1cm4gZnNwLndyaXRlRmlsZShwYXRoLmpvaW4ocmVuZGVyVG8sIGZwYXRoKSwgdGV4dCwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICB3cml0ZUZpbGVTeW5jKHJlbmRlclRvLCBmcGF0aCwgdGV4dCkge1xuICAgICAgICByZXR1cm4gZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4ocmVuZGVyVG8sIGZwYXRoKSwgdGV4dCwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICAvLyBJcyBwYXJzZU1ldGFkYXRhIGFuZCBwYXJzZUZyb250bWF0dGVyIHJlcXVpcmVkP1xuICAgIC8vIFNob3VsZG4ndCB0aGlzIGJlIGhhbmRsZWQgaW4gRmlsZUNhY2hlP1xuICAgIC8vIFRoZSBpZGVhIGlzIGZvciBSZW5kZXJlcnMgdGhhdCBleHBlY3QgZnJvbnRtYXR0ZXJcbiAgICAvLyB0byBjYWxsIHBhcnNlRnJvbnRNYXR0ZXIgZnJvbSBwYXJzZU1ldGFkYXRhLlxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgYW55IG1ldGFkYXRhIGluIHRoZSBkb2N1bWVudCwgYnkgZGVmYXVsdCBub1xuICAgICAqIHBhcnNpbmcgaXMgZG9uZS4gIEEgUmVuZGVyZXIgdGhhdCBzdXBwb3J0cyBmaWxlc1xuICAgICAqIHdoaWNoIGNvbnRhaW4gbWV0YWRhdGEgc2hvdWxkIGltcGxlbWVudCB0aGlzXG4gICAgICogZnVuY3Rpb24gdG8gcGFyc2UgdGhhdCBtZXRhZGF0YS5cbiAgICAgKiBcbiAgICAgKiBBIGZ1bmN0aW9uLCBgcGFyc2VGcm9udG1hdHRlcmAsIGlzIGF2YWlsYWJsZSB0byBwYXJzZVxuICAgICAqIF9mcm9udG1hdHRlcl8gYmxvY2sgYXQgdGhlIHRvcCBvZiBhIGZpbGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlciBpbnB1dCBkYXRhIGFsbG93aW5nIGZvciBhc3luY2hyb25vdXMgZXhlY3V0aW9uLFxuICAgICAqIHByb2R1Y2luZyBvdXRwdXQgZGF0YS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKi9cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW1wbGVtZW50IHJlbmRlciBtZXRob2QnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgaW5wdXQgZGF0YSB1c2luZyBvbmx5IHN5bmNocm9ub3VzIGNvZGUsIHByb2R1Y2luZ1xuICAgICAqIG91dHB1dCBkYXRhLiAgU29tZSBleGVjdXRpb24gY29udGV4dHMgY2FuIG9ubHkgcnVuXG4gICAgICogc3luY2hyb25vdXMgY29kZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKi9cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBzdHJpbmcge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcGxlbWVudCByZW5kZXJTeW5jIG1ldGhvZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlIHRoZSBzb3J0IG9mIG91dHB1dCBwcm9kdWNlZCB3aGVuIHJlbmRlcmluZ1xuICAgICAqIGEgZmlsZSBkZXNjcmliZWQgaW4gdGhlIHJlbmRlcmluZyBjb250ZXh0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqL1xuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nRm9ybWF0IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBsZW1lbnQgcmVuZGVyRm9ybWF0Jyk7XG4gICAgfVxuXG4gICAgLyogcmVuZGVyVG9GaWxlKGRpciwgZnBhdGgsIHJlbmRlclRvLCByZW5kZXJUb1BsdXMsIG1ldGFkYXRhLCBjb25maWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbXBsZW1lbnQgcmVuZGVyVG9GaWxlIG1ldGhvZCcpO1xuICAgIH0gKi9cblxufVxuXG4vKipcbiAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICogXG4gKiBAcGFyYW0gY29udGV4dCBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG5cbiAgICBsZXQgZm07XG4gICAgdHJ5IHtcbiAgICAgICAgZm0gPSBtYXR0ZXIoY29udGV4dC5jb250ZW50KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEhUTUxSZW5kZXJlciBmcm9udG1hdHRlciBwYXJzZWQgZnJvbnRtYXR0ZXIgJHtiYXNlZGlyfSAke2ZwYXRofWApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYHBhcnNlRnJvbnRtYXR0ZXIgRkFJTCB0byByZWFkIGZyb250bWF0dGVyIGluICR7Y29udGV4dC5mc3BhdGh9IGJlY2F1c2UgJHtlLnN0YWNrfWApO1xuICAgICAgICBmbSA9IHt9O1xuICAgIH1cblxuICAgIGNvbnRleHQuYm9keSA9IGZtLmNvbnRlbnQ7XG4gICAgY29udGV4dC5tZXRhZGF0YSA9IGZtLmRhdGE7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4iXX0=