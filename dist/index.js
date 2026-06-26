"use strict";
/**
 *
 * Copyright 2022-2022 David Herron
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
var _Configuration_renderers, _Configuration_partialDirs, _Configuration_layoutDirs, _Configuration_finderPartial, _Configuration_finderPartialSync, _Configuration_finderLayout, _Configuration_finderLayoutSync, _Configuration_partial, _Configuration_partialSync;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = exports.RenderingFormat = exports.NunjucksRenderer = exports.MarkdownRenderer = exports.LiquidRenderer = exports.JSONRenderer = exports.HandlebarsRenderer = exports.ETARenderer = exports.EJSRenderer = exports.CSSLESSRenderer = exports.AsciidocRenderer = exports.parseFrontmatter = exports.Renderer = void 0;
const node_util_1 = __importDefault(require("node:util"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const node_fs_2 = __importDefault(require("node:fs"));
const Renderer_1 = require("./Renderer");
const render_asciidoc_1 = require("./render-asciidoc");
const render_cssless_1 = require("./render-cssless");
const render_ejs_1 = require("./render-ejs");
const render_eta_1 = require("./render-eta");
const render_handlebars_1 = require("./render-handlebars");
const render_json_1 = require("./render-json");
const render_liquid_1 = require("./render-liquid");
const render_md_1 = require("./render-md");
const render_nunjucks_1 = require("./render-nunjucks");
var Renderer_2 = require("./Renderer");
Object.defineProperty(exports, "Renderer", { enumerable: true, get: function () { return Renderer_2.Renderer; } });
Object.defineProperty(exports, "parseFrontmatter", { enumerable: true, get: function () { return Renderer_2.parseFrontmatter; } });
var render_asciidoc_2 = require("./render-asciidoc");
Object.defineProperty(exports, "AsciidocRenderer", { enumerable: true, get: function () { return render_asciidoc_2.AsciidocRenderer; } });
var render_cssless_2 = require("./render-cssless");
Object.defineProperty(exports, "CSSLESSRenderer", { enumerable: true, get: function () { return render_cssless_2.CSSLESSRenderer; } });
var render_ejs_2 = require("./render-ejs");
Object.defineProperty(exports, "EJSRenderer", { enumerable: true, get: function () { return render_ejs_2.EJSRenderer; } });
var render_eta_js_1 = require("./render-eta.js");
Object.defineProperty(exports, "ETARenderer", { enumerable: true, get: function () { return render_eta_js_1.ETARenderer; } });
var render_handlebars_2 = require("./render-handlebars");
Object.defineProperty(exports, "HandlebarsRenderer", { enumerable: true, get: function () { return render_handlebars_2.HandlebarsRenderer; } });
var render_json_2 = require("./render-json");
Object.defineProperty(exports, "JSONRenderer", { enumerable: true, get: function () { return render_json_2.JSONRenderer; } });
var render_liquid_2 = require("./render-liquid");
Object.defineProperty(exports, "LiquidRenderer", { enumerable: true, get: function () { return render_liquid_2.LiquidRenderer; } });
var render_md_2 = require("./render-md");
Object.defineProperty(exports, "MarkdownRenderer", { enumerable: true, get: function () { return render_md_2.MarkdownRenderer; } });
// export { MarkdocRenderer } from './render-markdoc';
var render_nunjucks_2 = require("./render-nunjucks");
Object.defineProperty(exports, "NunjucksRenderer", { enumerable: true, get: function () { return render_nunjucks_2.NunjucksRenderer; } });
var RenderingFormat;
(function (RenderingFormat) {
    RenderingFormat["HTML"] = "HTML";
    RenderingFormat["PHP"] = "PHP";
    RenderingFormat["JSON"] = "JSON";
    RenderingFormat["CSS"] = "CSS";
    RenderingFormat["JS"] = "JS";
})(RenderingFormat || (exports.RenderingFormat = RenderingFormat = {}));
;
class Configuration {
    constructor(params) {
        _Configuration_renderers.set(this, void 0);
        _Configuration_partialDirs.set(this, void 0);
        _Configuration_layoutDirs.set(this, void 0);
        _Configuration_finderPartial.set(this, void 0);
        _Configuration_finderPartialSync.set(this, void 0);
        _Configuration_finderLayout.set(this, void 0);
        _Configuration_finderLayoutSync.set(this, void 0);
        //////// Find Layouts or Partials
        _Configuration_partial.set(this, void 0);
        _Configuration_partialSync.set(this, void 0);
        __classPrivateFieldSet(this, _Configuration_renderers, [], "f");
        __classPrivateFieldSet(this, _Configuration_partialDirs, [], "f");
        __classPrivateFieldSet(this, _Configuration_layoutDirs, [], "f");
        /*
         * Is this the best place for this?  It is necessary to
         * call this function somewhere.  The nature of this function
         * is that it can be called multiple times with no impact.
         * By being located here, it will always be called by the
         * time any Configuration is generated.
         */
        this.registerBuiltInRenderers();
        if (params && params.partialDirs)
            __classPrivateFieldSet(this, _Configuration_partialDirs, params.partialDirs, "f");
        if (params && params.layoutDirs)
            __classPrivateFieldSet(this, _Configuration_layoutDirs, params.layoutDirs, "f");
        // console.log(`Renderers Configuration constructor layoutDirs `, util.inspect(this.#layoutDirs));
        __classPrivateFieldSet(this, _Configuration_finderPartial, (params && params.findPartial)
            ? params.findPartial
            : defaultFindPartial.bind(this), "f");
        __classPrivateFieldSet(this, _Configuration_finderPartialSync, (params && params.findPartialSync)
            ? params.findPartialSync
            : defaultFindPartialSync.bind(this), "f");
        __classPrivateFieldSet(this, _Configuration_finderLayout, (params && params.findLayout)
            ? params.findLayout
            : defaultFindLayout.bind(this), "f");
        __classPrivateFieldSet(this, _Configuration_finderLayoutSync, (params && params.findLayoutSync)
            ? params.findLayoutSync
            : defaultFindLayoutSync.bind(this), "f");
        __classPrivateFieldSet(this, _Configuration_partial, (params && params.partial)
            ? params.partial
            : defaultPartial.bind(this), "f");
        __classPrivateFieldSet(this, _Configuration_partialSync, (params && params.partialSync)
            ? params.partialSync
            : defaultPartialSync.bind(this), "f");
    }
    /**
     * An array of absolute paths to directories containing
     * partial templates.
     */
    set partialDirs(dirz) {
        if (!Array.isArray(dirz))
            throw new Error(`partialDirs - dirz must be array`);
        __classPrivateFieldSet(this, _Configuration_partialDirs, dirz, "f");
    }
    get partialDirs() { return __classPrivateFieldGet(this, _Configuration_partialDirs, "f"); }
    /**
     * Add an absolute pathname for a directory to find partial templates.
     * @param dir
     */
    // @ValidateParams
    addPartialDir(/* @IsAbsolutePath() */ dir) {
        __classPrivateFieldGet(this, _Configuration_partialDirs, "f").push(dir);
    }
    /**
     * Store a function for finding partial templates.
     */
    set partialFinder(finder) {
        if (finder && typeof finder === 'function') {
            __classPrivateFieldSet(this, _Configuration_finderPartial, finder, "f");
        }
    }
    /**
     * Store a function for finding partial templates.
     */
    set partialFinderSync(finder) {
        if (finder && typeof finder === 'function') {
            __classPrivateFieldSet(this, _Configuration_finderPartialSync, finder, "f");
        }
    }
    async findPartial(fnpartial) {
        return __classPrivateFieldGet(this, _Configuration_finderPartial, "f").call(this, fnpartial);
    }
    findPartialSync(fnpartial) {
        return __classPrivateFieldGet(this, _Configuration_finderPartialSync, "f").call(this, fnpartial);
    }
    /**
     * An array of absolute paths to directories containing
     * layout templates.
     */
    set layoutDirs(dirz) {
        if (!Array.isArray(dirz))
            throw new Error(`layoutDirs - dirz must be array`);
        __classPrivateFieldSet(this, _Configuration_layoutDirs, dirz, "f");
    }
    get layoutDirs() { return __classPrivateFieldGet(this, _Configuration_layoutDirs, "f"); }
    /**
     * Add an absolute pathname for a directory to find layout templates.
     * @param dir
     */
    // @ValidateParams
    addLayoutDir(/* @IsAbsolutePath() */ dir) {
        __classPrivateFieldGet(this, _Configuration_layoutDirs, "f").push(dir);
    }
    /**
     * Store a function for finding layout templates
     * @param finder
     */
    set layoutFinder(finder) {
        if (finder && typeof finder === 'function') {
            __classPrivateFieldSet(this, _Configuration_finderLayout, finder, "f");
        }
    }
    /**
     * Store a function for finding layout templates
     * @param finder
     */
    set layoutFinderSync(finder) {
        if (finder && typeof finder === 'function') {
            __classPrivateFieldSet(this, _Configuration_finderLayoutSync, finder, "f");
        }
    }
    /**
     * Find a layout template, supporting asynchronous execution
     *
     * @param fnlayout
     * @returns
     */
    async findLayout(fnlayout) {
        return __classPrivateFieldGet(this, _Configuration_finderLayout, "f").call(this, fnlayout);
    }
    /**
     * Find a layout template, supporting synchronous execution
     *
     * @param fnlayout
     * @returns
     */
    findLayoutSync(fnlayout) {
        return __classPrivateFieldGet(this, _Configuration_finderLayoutSync, "f").call(this, fnlayout);
    }
    //////// Renderers
    /**
     * Return the list of registered renderers
     */
    get renderers() { return __classPrivateFieldGet(this, _Configuration_renderers, "f"); }
    registerRenderer(renderer) {
        if (!(renderer instanceof Renderer_1.Renderer)) {
            console.error('Not A Renderer ' + node_util_1.default.inspect(renderer));
            throw new Error(`Not a Renderer ${node_util_1.default.inspect(renderer)}`);
        }
        if (!this.findRendererName(renderer.name)) {
            renderer.config = this;
            // console.log(`registerRenderer `, renderer);
            __classPrivateFieldGet(this, _Configuration_renderers, "f").push(renderer);
        }
    }
    /**
     * Allow an application to override one of the built-in renderers
     * that are initialized below.  The inspiration is epubtools that
     * must write HTML files with an .xhtml extension.  Therefore it
     * can subclass EJSRenderer etc with implementations that force the
     * file name to be .xhtml.  We're not checking if the renderer name
     * is already there in case epubtools must use the same renderer name.
     */
    registerOverrideRenderer(renderer) {
        if (!(renderer instanceof Renderer_1.Renderer)) {
            console.error('Not A Renderer ' + node_util_1.default.inspect(renderer));
            throw new Error(`Not a Renderer ${node_util_1.default.inspect(renderer)}`);
        }
        renderer.config = this;
        __classPrivateFieldGet(this, _Configuration_renderers, "f").unshift(renderer);
    }
    findRendererName(name) {
        for (var r of __classPrivateFieldGet(this, _Configuration_renderers, "f")) {
            if (r.name === name)
                return r;
        }
        return undefined;
    }
    findRendererPath(_path) {
        // log(`findRendererPath ${_path}`);
        for (var r of __classPrivateFieldGet(this, _Configuration_renderers, "f")) {
            // console.log(`findRendererPath ${_path} ${r.name}`)
            if (r.match(_path)) {
                // console.log('MATCH');
                return r;
            }
        }
        // console.log(`findRendererPath NO RENDERER for ${_path}`);
        return undefined;
    }
    registerBuiltInRenderers() {
        // Register built-in renderers
        this.registerRenderer(new render_md_1.MarkdownRenderer());
        this.registerRenderer(new render_asciidoc_1.AsciidocRenderer());
        // this.registerRenderer(new MarkdocRenderer());
        this.registerRenderer(new render_ejs_1.EJSRenderer());
        this.registerRenderer(new render_eta_1.ETARenderer());
        this.registerRenderer(new render_liquid_1.LiquidRenderer());
        this.registerRenderer(new render_nunjucks_1.NunjucksRenderer());
        this.registerRenderer(new render_handlebars_1.HandlebarsRenderer());
        this.registerRenderer(new render_cssless_1.CSSLESSRenderer());
        this.registerRenderer(new render_json_1.JSONRenderer());
    }
    /**
     * Find a Renderer by its extension.
     */
    findRenderer(name) {
        return this.findRendererName(name);
    }
    set partialFunc(pfunc) {
        __classPrivateFieldSet(this, _Configuration_partial, pfunc, "f");
    }
    set partialFuncSync(pfunc) {
        __classPrivateFieldSet(this, _Configuration_partialSync, pfunc, "f");
    }
    async partial(fname, metadata) {
        const ret = await __classPrivateFieldGet(this, _Configuration_partial, "f").call(this, fname, metadata);
        // console.log(`Configuration partial ${fname} ${util.inspect(metadata)} ==> ${ret}`);
        return ret;
    }
    partialSync(fname, metadata) {
        const ret = __classPrivateFieldGet(this, _Configuration_partialSync, "f").call(this, fname, metadata);
        // console.log(`Configuration partialSync ${fname} ${util.inspect(metadata)} ==> ${ret}`);
        return ret;
    }
}
exports.Configuration = Configuration;
_Configuration_renderers = new WeakMap(), _Configuration_partialDirs = new WeakMap(), _Configuration_layoutDirs = new WeakMap(), _Configuration_finderPartial = new WeakMap(), _Configuration_finderPartialSync = new WeakMap(), _Configuration_finderLayout = new WeakMap(), _Configuration_finderLayoutSync = new WeakMap(), _Configuration_partial = new WeakMap(), _Configuration_partialSync = new WeakMap();
function isString(s) {
    if (!s)
        return false;
    if (!(typeof s === 'string'))
        return false;
    return true;
}
function isObject(s) {
    if (!s)
        return false;
    if (!(typeof s === 'object'))
        return false;
    return true;
}
function isRenderer(r) {
    if (!r)
        return false;
    if (!(typeof r === 'object'))
        return false;
    if (!(r instanceof Renderer_1.Renderer))
        return false;
    return true;
}
function isPathArray(ary) {
    if (!Array.isArray(ary))
        return false;
    for (const p of ary) {
        if (!node_path_1.default.isAbsolute(p))
            return false;
    }
    return true;
}
function isAbsolutePath(p) {
    if (!(typeof p === 'string'))
        return false;
    if (!node_path_1.default.isAbsolute(p))
        return false;
    return true;
}
// Default Partial/Layout finder functions
async function defaultFindLayout(fnlayout) {
    for (const ldir of this.layoutDirs) {
        const lpath = node_path_1.default.join(ldir, fnlayout);
        let lstat;
        try {
            lstat = await node_fs_1.promises.stat(lpath);
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
    return undefined;
}
function defaultFindLayoutSync(fnlayout) {
    for (const ldir of this.layoutDirs) {
        const lpath = node_path_1.default.join(ldir, fnlayout);
        let lstat;
        try {
            lstat = node_fs_2.default.statSync(lpath);
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
    return undefined;
}
async function defaultFindPartial(fnpartial) {
    // console.log(`defaultFindPartial ${fnpartial}`, this.partialDirs);
    for (const pdir of this.partialDirs) {
        const ppath = node_path_1.default.join(pdir, fnpartial);
        // console.log(`defaultFindPartial does ${ppath} exist for ${fnpartial}?`);
        let pstat;
        try {
            pstat = await node_fs_1.promises.stat(ppath);
        }
        catch (err) {
            // console.error(`stat for ${ppath} failed `, err);
            pstat = undefined;
        }
        if (pstat) {
            // console.log(`defaultFindPartial ${ppath} stats`, pstat);
            if (pstat.isFile()) {
                // console.log(`defaultFindPartial ${ppath} exists`);
                return ppath;
            }
        }
    }
    return undefined;
}
function defaultFindPartialSync(fnpartial) {
    for (const pdir of this.partialDirs) {
        const ppath = node_path_1.default.join(pdir, fnpartial);
        let pstat;
        try {
            pstat = node_fs_2.default.statSync(ppath);
        }
        catch (err) {
            pstat = undefined;
        }
        if (pstat) {
            if (pstat.isFile()) {
                return ppath;
            }
        }
    }
    return undefined;
}
async function defaultPartial(fname, metadata) {
    const found = await this.findPartial(fname);
    if (!found) {
        throw new Error(`No partial found for ${fname} in ${node_util_1.default.inspect(this.partialDirs)}`);
    }
    const renderer = this.findRendererPath(fname);
    if (!renderer) {
        if (fname.endsWith('.html') || fname.endsWith('.xhtml')) {
            return node_fs_1.promises.readFile(found, 'utf-8');
        }
        else {
            throw new Error(`defaultPartial no Renderer found for ${fname}`);
        }
    }
    else {
        const pContent = await node_fs_1.promises.readFile(found, 'utf-8');
        // Some renderers (Nunjuks) require that metadata.config
        // point to the config object.  This block of code
        // duplicates the metadata object, then sets the
        // config field in the duplicate, passing that to the partial.
        let mdata = {};
        for (let prop in metadata) {
            mdata[prop] = metadata[prop];
        }
        // TODO
        // mdata.config = config;
        mdata['partialSync'] = this.partialSync.bind(this);
        mdata['partial'] = this.partial.bind(this);
        return renderer.render({
            content: pContent,
            metadata: mdata,
            fspath: found
        });
    }
}
function defaultPartialSync(fname, metadata) {
    const found = this.findPartialSync(fname);
    if (!found) {
        throw new Error(`No partial found for ${fname} in ${node_util_1.default.inspect(this.partialDirs)}`);
    }
    const renderer = this.findRendererPath(fname);
    if (!renderer) {
        if (fname.endsWith('.html') || fname.endsWith('.xhtml')) {
            return node_fs_2.default.readFileSync(found, 'utf-8');
        }
        else {
            throw new Error(`defaultPartial no Renderer found for ${fname}`);
        }
    }
    else {
        const pContent = node_fs_2.default.readFileSync(found, 'utf-8');
        // Some renderers (Nunjuks) require that metadata.config
        // point to the config object.  This block of code
        // duplicates the metadata object, then sets the
        // config field in the duplicate, passing that to the partial.
        let mdata = {};
        let prop;
        for (prop in metadata) {
            mdata[prop] = metadata[prop];
        }
        // TODO
        // mdata.config = config;
        mdata['partialSync'] = this.partialSync.bind(this);
        mdata['partial'] = this.partial.bind(this);
        return renderer.renderSync({
            content: pContent,
            metadata: mdata,
            fspath: found
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsMERBQTZCO0FBQzdCLDBEQUE2QjtBQUM3QixxQ0FBMEM7QUFDMUMsc0RBQXlCO0FBRXpCLHlDQUFzQztBQUV0Qyx1REFBcUQ7QUFDckQscURBQW1EO0FBQ25ELDZDQUEyQztBQUMzQyw2Q0FBMkM7QUFDM0MsMkRBQXlEO0FBQ3pELCtDQUE2QztBQUM3QyxtREFBaUQ7QUFDakQsMkNBQStDO0FBQy9DLHVEQUFxRDtBQUVyRCx1Q0FBd0Q7QUFBL0Msb0dBQUEsUUFBUSxPQUFBO0FBQUUsNEdBQUEsZ0JBQWdCLE9BQUE7QUFFbkMscURBQXFEO0FBQTVDLG1IQUFBLGdCQUFnQixPQUFBO0FBQ3pCLG1EQUFtRDtBQUExQyxpSEFBQSxlQUFlLE9BQUE7QUFDeEIsMkNBQTJDO0FBQWxDLHlHQUFBLFdBQVcsT0FBQTtBQUNwQixpREFBOEM7QUFBckMsNEdBQUEsV0FBVyxPQUFBO0FBQ3BCLHlEQUF5RDtBQUFoRCx1SEFBQSxrQkFBa0IsT0FBQTtBQUMzQiw2Q0FBNkM7QUFBcEMsMkdBQUEsWUFBWSxPQUFBO0FBQ3JCLGlEQUFpRDtBQUF4QywrR0FBQSxjQUFjLE9BQUE7QUFDdkIseUNBQStDO0FBQXRDLDZHQUFBLGdCQUFnQixPQUFBO0FBQ3pCLHNEQUFzRDtBQUN0RCxxREFBcUQ7QUFBNUMsbUhBQUEsZ0JBQWdCLE9BQUE7QUFrQ3pCLElBQVksZUFNWDtBQU5ELFdBQVksZUFBZTtJQUN2QixnQ0FBYSxDQUFBO0lBQ2IsOEJBQVksQ0FBQTtJQUNaLGdDQUFhLENBQUE7SUFDYiw4QkFBWSxDQUFBO0lBQ1osNEJBQVcsQ0FBQTtBQUNmLENBQUMsRUFOVyxlQUFlLCtCQUFmLGVBQWUsUUFNMUI7QUFBQSxDQUFDO0FBRUYsTUFBYSxhQUFhO0lBTXRC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QUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDdEQsT0FBTyxpQkFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQzthQUFNLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO1NBQU0sQ0FBQztRQUNKLE1BQU0sUUFBUSxHQUFHLGlCQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqRCx3REFBd0Q7UUFDeEQsa0RBQWtEO1FBQ2xELGdEQUFnRDtRQUNoRCw4REFBOEQ7UUFDOUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUM7UUFFVCxLQUFLLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxPQUFPO1FBQ1AseUJBQXlCO1FBQ3pCLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0MsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFtQjtZQUN6QyxPQUFPLEVBQUUsUUFBUTtZQUNqQixRQUFRLEVBQUUsS0FBSztZQUNmLE1BQU0sRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUVQLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMjItMjAyMiBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB1dGlsIGZyb20gJ25vZGU6dXRpbCc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnNwIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcyc7XG5cbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgeyBIVE1MUmVuZGVyZXIgfSBmcm9tICcuL0hUTUxSZW5kZXJlcic7XG5pbXBvcnQgeyBBc2NpaWRvY1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItYXNjaWlkb2MnO1xuaW1wb3J0IHsgQ1NTTEVTU1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItY3NzbGVzcyc7XG5pbXBvcnQgeyBFSlNSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWVqcyc7XG5pbXBvcnQgeyBFVEFSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWV0YSc7XG5pbXBvcnQgeyBIYW5kbGViYXJzUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1oYW5kbGViYXJzJztcbmltcG9ydCB7IEpTT05SZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWpzb24nO1xuaW1wb3J0IHsgTGlxdWlkUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1saXF1aWQnO1xuaW1wb3J0IHsgTWFya2Rvd25SZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLW1kJztcbmltcG9ydCB7IE51bmp1Y2tzUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1udW5qdWNrcyc7XG5cbmV4cG9ydCB7IFJlbmRlcmVyLCBwYXJzZUZyb250bWF0dGVyIH0gZnJvbSAnLi9SZW5kZXJlcic7XG5cbmV4cG9ydCB7IEFzY2lpZG9jUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1hc2NpaWRvYyc7XG5leHBvcnQgeyBDU1NMRVNTUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1jc3NsZXNzJztcbmV4cG9ydCB7IEVKU1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItZWpzJztcbmV4cG9ydCB7IEVUQVJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItZXRhLmpzJztcbmV4cG9ydCB7IEhhbmRsZWJhcnNSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWhhbmRsZWJhcnMnO1xuZXhwb3J0IHsgSlNPTlJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItanNvbic7XG5leHBvcnQgeyBMaXF1aWRSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWxpcXVpZCc7XG5leHBvcnQgeyBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbWQnO1xuLy8gZXhwb3J0IHsgTWFya2RvY1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbWFya2RvYyc7XG5leHBvcnQgeyBOdW5qdWNrc1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbnVuanVja3MnO1xuXG4vLyBUT0RPIC1ET05FIHJlcXVpcmUgYSBjb250YWluZXIgY2xhc3MgdG8gaG9sZCB0aGUgbGlzdCBvZiByZW5kZXJlcnNcbi8vICAgICAgLURPTkUgYWxsb3cgUmVuZGVyZXJzIHRvIGJlIGFkZGVkIGJ5IG90aGVyIGNvZGVcbi8vICAgICAgLSBjb250YWluIGNvbmZpZ3VyYXRpb24gZm9yIHRoaW5nc1xuLy9cbi8vIENvbmZpZ3VyYXRpb24gLSBmdW5jdGlvbnMgdG8gZmluZCBhc3NldHMvZG9jdW1lbnRzL3BhcnRpYWxzL2xheW91dHNcbi8vICAgICAgICAgICAgICAgLSBmdW5jdGlvbiB0byB3cml0ZSByZW5kZXJlZCBmaWxlXG4vLyAgICAgICAgICAgICAgIC0gZnVuY3Rpb25zIC0gcGFydGlhbCAtIHBhcnRpYWxTeW5jXG4vL1xuLy8gTWFoYWZ1bmMgZm9yIDxwYXJ0aWFsPlxuXG5leHBvcnQgdHlwZSBDb25maWd1cmF0aW9uUGFyYW1zID0ge1xuICAgIHBhcnRpYWxEaXJzPzogQXJyYXk8c3RyaW5nPjtcbiAgICBmaW5kUGFydGlhbD86IChmbikgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgIGZpbmRQYXJ0aWFsU3luYz86IChmbikgPT4gc3RyaW5nO1xuICAgIGxheW91dERpcnM/OiBBcnJheTxzdHJpbmc+O1xuICAgIGZpbmRMYXlvdXQ/OiAoZm4pID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICBmaW5kTGF5b3V0U3luYz86IChmbikgPT4gc3RyaW5nO1xuXG4gICAgcGFydGlhbD86IChmbiwgbWV0YWRhdGEpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICBwYXJ0aWFsU3luYz86IChmbiwgbWV0YWRhdGEpID0+IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFJlbmRlcmluZ0NvbnRleHQgPSB7XG4gICAgZnNwYXRoPzogc3RyaW5nOyAgIC8vIFBhdGhuYW1lIHRoYXQgY2FuIGJlIGdpdmVuIHRvIHRlbXBsYXRlIGVuZ2luZXMgZm9yIGVycm9yIG1lc3NhZ2VzXG4gICAgY29udGVudDogc3RyaW5nOyAgIC8vIENvbnRlbnQgdG8gcmVuZGVyXG4gICAgYm9keT86IHN0cmluZzsgICAgIC8vIENvbnRlbnQgYm9keSBhZnRlciBwYXJzaW5nIGZyb250bWF0dGVyXG5cbiAgICByZW5kZXJUbz86IHN0cmluZzsgIC8vIFBhdGhuYW1lIGZvciByZW5kZXJpbmcgb3V0cHV0XG5cbiAgICBtZXRhZGF0YTogYW55OyAgLy8gRGF0YSB0byBiZSB1c2VkIGZvciBzYXRpc2Z5aW5nIHZhcmlhYmxlcyBpbiB0ZW1wbGF0ZXNcbn07XG5cbmV4cG9ydCBlbnVtIFJlbmRlcmluZ0Zvcm1hdCB7XG4gICAgSFRNTCA9ICdIVE1MJyxcbiAgICBQSFAgID0gJ1BIUCcsXG4gICAgSlNPTiA9ICdKU09OJyxcbiAgICBDU1MgID0gJ0NTUycsXG4gICAgSlMgICA9ICdKUydcbn07XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIHtcblxuICAgICNyZW5kZXJlcnM7XG4gICAgI3BhcnRpYWxEaXJzO1xuICAgICNsYXlvdXREaXJzO1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zPzogQ29uZmlndXJhdGlvblBhcmFtcykge1xuICAgICAgICB0aGlzLiNyZW5kZXJlcnMgPSBbXTtcbiAgICAgICAgdGhpcy4jcGFydGlhbERpcnMgPSBbXTtcbiAgICAgICAgdGhpcy4jbGF5b3V0RGlycyA9IFtdO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIElzIHRoaXMgdGhlIGJlc3QgcGxhY2UgZm9yIHRoaXM/ICBJdCBpcyBuZWNlc3NhcnkgdG9cbiAgICAgICAgICogY2FsbCB0aGlzIGZ1bmN0aW9uIHNvbWV3aGVyZS4gIFRoZSBuYXR1cmUgb2YgdGhpcyBmdW5jdGlvblxuICAgICAgICAgKiBpcyB0aGF0IGl0IGNhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBubyBpbXBhY3QuICBcbiAgICAgICAgICogQnkgYmVpbmcgbG9jYXRlZCBoZXJlLCBpdCB3aWxsIGFsd2F5cyBiZSBjYWxsZWQgYnkgdGhlXG4gICAgICAgICAqIHRpbWUgYW55IENvbmZpZ3VyYXRpb24gaXMgZ2VuZXJhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWdpc3RlckJ1aWx0SW5SZW5kZXJlcnMoKTtcblxuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wYXJ0aWFsRGlycykgdGhpcy4jcGFydGlhbERpcnMgPSBwYXJhbXMucGFydGlhbERpcnM7XG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLmxheW91dERpcnMpICB0aGlzLiNsYXlvdXREaXJzICA9IHBhcmFtcy5sYXlvdXREaXJzO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBSZW5kZXJlcnMgQ29uZmlndXJhdGlvbiBjb25zdHJ1Y3RvciBsYXlvdXREaXJzIGAsIHV0aWwuaW5zcGVjdCh0aGlzLiNsYXlvdXREaXJzKSk7XG4gICAgICAgIHRoaXMuI2ZpbmRlclBhcnRpYWwgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kUGFydGlhbClcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMuZmluZFBhcnRpYWxcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZFBhcnRpYWwuYmluZCh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuI2ZpbmRlclBhcnRpYWxTeW5jID0gKHBhcmFtcyAmJiBwYXJhbXMuZmluZFBhcnRpYWxTeW5jKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5maW5kUGFydGlhbFN5bmNcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZFBhcnRpYWxTeW5jLmJpbmQodGhpcyk7XG5cblxuICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXQgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kTGF5b3V0KVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5maW5kTGF5b3V0XG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdEZpbmRMYXlvdXQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXRTeW5jID0gKHBhcmFtcyAmJiBwYXJhbXMuZmluZExheW91dFN5bmMpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLmZpbmRMYXlvdXRTeW5jXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdEZpbmRMYXlvdXRTeW5jLmJpbmQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiNwYXJ0aWFsID0gKHBhcmFtcyAmJiBwYXJhbXMucGFydGlhbClcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMucGFydGlhbFxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRQYXJ0aWFsLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy4jcGFydGlhbFN5bmMgPSAocGFyYW1zICYmIHBhcmFtcy5wYXJ0aWFsU3luYylcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMucGFydGlhbFN5bmNcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0UGFydGlhbFN5bmMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBhYnNvbHV0ZSBwYXRocyB0byBkaXJlY3RvcmllcyBjb250YWluaW5nXG4gICAgICogcGFydGlhbCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgc2V0IHBhcnRpYWxEaXJzKGRpcno6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRpcnopKSB0aHJvdyBuZXcgRXJyb3IoYHBhcnRpYWxEaXJzIC0gZGlyeiBtdXN0IGJlIGFycmF5YCk7XG4gICAgICAgIHRoaXMuI3BhcnRpYWxEaXJzID0gZGlyejtcbiAgICB9XG4gICAgZ2V0IHBhcnRpYWxEaXJzKCkgLyo6IEFycmF5PHN0cmluZz4gKi8geyByZXR1cm4gdGhpcy4jcGFydGlhbERpcnM7IH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBhYnNvbHV0ZSBwYXRobmFtZSBmb3IgYSBkaXJlY3RvcnkgdG8gZmluZCBwYXJ0aWFsIHRlbXBsYXRlcy5cbiAgICAgKiBAcGFyYW0gZGlyIFxuICAgICAqL1xuICAgIC8vIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGFkZFBhcnRpYWxEaXIoLyogQElzQWJzb2x1dGVQYXRoKCkgKi8gZGlyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4jcGFydGlhbERpcnMucHVzaChkaXIpO1xuICAgIH1cblxuICAgICNmaW5kZXJQYXJ0aWFsOiAoZm5wYXJ0aWFsKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgI2ZpbmRlclBhcnRpYWxTeW5jOiAoZm5wYXJ0aWFsKSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBhIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHBhcnRpYWwgdGVtcGxhdGVzLlxuICAgICAqL1xuICAgIHNldCBwYXJ0aWFsRmluZGVyKGZpbmRlcjogKGZucGFydGlhbCkgPT4gUHJvbWlzZTxzdHJpbmc+KSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbCA9IGZpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgZnVuY3Rpb24gZm9yIGZpbmRpbmcgcGFydGlhbCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgc2V0IHBhcnRpYWxGaW5kZXJTeW5jKGZpbmRlcjogKGZucGFydGlhbCkgPT4gc3RyaW5nKSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbFN5bmMgPSBmaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmaW5kUGFydGlhbChmbnBhcnRpYWw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiNmaW5kZXJQYXJ0aWFsKGZucGFydGlhbCk7XG4gICAgfVxuXG4gICAgZmluZFBhcnRpYWxTeW5jKGZucGFydGlhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2ZpbmRlclBhcnRpYWxTeW5jKGZucGFydGlhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYWJzb2x1dGUgcGF0aHMgdG8gZGlyZWN0b3JpZXMgY29udGFpbmluZ1xuICAgICAqIGxheW91dCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgc2V0IGxheW91dERpcnMoZGlyejogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGlyeikpIHRocm93IG5ldyBFcnJvcihgbGF5b3V0RGlycyAtIGRpcnogbXVzdCBiZSBhcnJheWApO1xuICAgICAgICB0aGlzLiNsYXlvdXREaXJzID0gZGlyejtcbiAgICB9XG4gICAgZ2V0IGxheW91dERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLiNsYXlvdXREaXJzOyB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gYWJzb2x1dGUgcGF0aG5hbWUgZm9yIGEgZGlyZWN0b3J5IHRvIGZpbmQgbGF5b3V0IHRlbXBsYXRlcy5cbiAgICAgKiBAcGFyYW0gZGlyIFxuICAgICAqL1xuICAgIC8vIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGFkZExheW91dERpcigvKiBASXNBYnNvbHV0ZVBhdGgoKSAqLyBkaXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLiNsYXlvdXREaXJzLnB1c2goZGlyKTtcbiAgICB9XG5cbiAgICAjZmluZGVyTGF5b3V0OiAoZm5sYXlvdXQpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICAjZmluZGVyTGF5b3V0U3luYzogKGZubGF5b3V0KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBhIGZ1bmN0aW9uIGZvciBmaW5kaW5nIGxheW91dCB0ZW1wbGF0ZXNcbiAgICAgKiBAcGFyYW0gZmluZGVyXG4gICAgICovXG4gICAgc2V0IGxheW91dEZpbmRlcihmaW5kZXI6IChmbmxheW91dCkgPT4gUHJvbWlzZTxzdHJpbmc+KSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyTGF5b3V0ID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmdW5jdGlvbiBmb3IgZmluZGluZyBsYXlvdXQgdGVtcGxhdGVzXG4gICAgICogQHBhcmFtIGZpbmRlclxuICAgICAqL1xuICAgIHNldCBsYXlvdXRGaW5kZXJTeW5jKGZpbmRlcjogKGZubGF5b3V0KSA9PiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXRTeW5jID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIGxheW91dCB0ZW1wbGF0ZSwgc3VwcG9ydGluZyBhc3luY2hyb25vdXMgZXhlY3V0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIGZubGF5b3V0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGFzeW5jIGZpbmRMYXlvdXQoZm5sYXlvdXQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiNmaW5kZXJMYXlvdXQoZm5sYXlvdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBsYXlvdXQgdGVtcGxhdGUsIHN1cHBvcnRpbmcgc3luY2hyb25vdXMgZXhlY3V0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIGZubGF5b3V0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGZpbmRMYXlvdXRTeW5jKGZubGF5b3V0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4jZmluZGVyTGF5b3V0U3luYyhmbmxheW91dCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8gUmVuZGVyZXJzXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGxpc3Qgb2YgcmVnaXN0ZXJlZCByZW5kZXJlcnNcbiAgICAgKi9cbiAgICBnZXQgcmVuZGVyZXJzKCk6IEFycmF5PFJlbmRlcmVyPiB7IHJldHVybiB0aGlzLiNyZW5kZXJlcnM7IH1cblxuICAgIHJlZ2lzdGVyUmVuZGVyZXIocmVuZGVyZXI6IFJlbmRlcmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghKHJlbmRlcmVyIGluc3RhbmNlb2YgUmVuZGVyZXIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdOb3QgQSBSZW5kZXJlciAnKyB1dGlsLmluc3BlY3QocmVuZGVyZXIpKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGEgUmVuZGVyZXIgJHt1dGlsLmluc3BlY3QocmVuZGVyZXIpfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5maW5kUmVuZGVyZXJOYW1lKHJlbmRlcmVyLm5hbWUpKSB7XG4gICAgICAgICAgICByZW5kZXJlci5jb25maWcgPSB0aGlzO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHJlZ2lzdGVyUmVuZGVyZXIgYCwgcmVuZGVyZXIpO1xuICAgICAgICAgICAgdGhpcy4jcmVuZGVyZXJzLnB1c2gocmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3cgYW4gYXBwbGljYXRpb24gdG8gb3ZlcnJpZGUgb25lIG9mIHRoZSBidWlsdC1pbiByZW5kZXJlcnNcbiAgICAgKiB0aGF0IGFyZSBpbml0aWFsaXplZCBiZWxvdy4gIFRoZSBpbnNwaXJhdGlvbiBpcyBlcHVidG9vbHMgdGhhdFxuICAgICAqIG11c3Qgd3JpdGUgSFRNTCBmaWxlcyB3aXRoIGFuIC54aHRtbCBleHRlbnNpb24uICBUaGVyZWZvcmUgaXRcbiAgICAgKiBjYW4gc3ViY2xhc3MgRUpTUmVuZGVyZXIgZXRjIHdpdGggaW1wbGVtZW50YXRpb25zIHRoYXQgZm9yY2UgdGhlXG4gICAgICogZmlsZSBuYW1lIHRvIGJlIC54aHRtbC4gIFdlJ3JlIG5vdCBjaGVja2luZyBpZiB0aGUgcmVuZGVyZXIgbmFtZVxuICAgICAqIGlzIGFscmVhZHkgdGhlcmUgaW4gY2FzZSBlcHVidG9vbHMgbXVzdCB1c2UgdGhlIHNhbWUgcmVuZGVyZXIgbmFtZS5cbiAgICAgKi9cbiAgICByZWdpc3Rlck92ZXJyaWRlUmVuZGVyZXIocmVuZGVyZXI6IFJlbmRlcmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghKHJlbmRlcmVyIGluc3RhbmNlb2YgUmVuZGVyZXIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdOb3QgQSBSZW5kZXJlciAnKyB1dGlsLmluc3BlY3QocmVuZGVyZXIpKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGEgUmVuZGVyZXIgJHt1dGlsLmluc3BlY3QocmVuZGVyZXIpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcmVyLmNvbmZpZyA9IHRoaXM7XG4gICAgICAgIHRoaXMuI3JlbmRlcmVycy51bnNoaWZ0KHJlbmRlcmVyKTtcbiAgICB9XG5cbiAgICBmaW5kUmVuZGVyZXJOYW1lKG5hbWU6IHN0cmluZyk6IFJlbmRlcmVyIHtcbiAgICAgICAgZm9yICh2YXIgciBvZiB0aGlzLiNyZW5kZXJlcnMpIHtcbiAgICAgICAgICAgIGlmIChyLm5hbWUgPT09IG5hbWUpIHJldHVybiByO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZmluZFJlbmRlcmVyUGF0aChfcGF0aDogc3RyaW5nKTogUmVuZGVyZXIge1xuICAgICAgICAvLyBsb2coYGZpbmRSZW5kZXJlclBhdGggJHtfcGF0aH1gKTtcbiAgICAgICAgZm9yICh2YXIgciBvZiB0aGlzLiNyZW5kZXJlcnMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBmaW5kUmVuZGVyZXJQYXRoICR7X3BhdGh9ICR7ci5uYW1lfWApXG4gICAgICAgICAgICBpZiAoci5tYXRjaChfcGF0aCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTUFUQ0gnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZmluZFJlbmRlcmVyUGF0aCBOTyBSRU5ERVJFUiBmb3IgJHtfcGF0aH1gKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZWdpc3RlckJ1aWx0SW5SZW5kZXJlcnMoKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGJ1aWx0LWluIHJlbmRlcmVyc1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IE1hcmtkb3duUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgQXNjaWlkb2NSZW5kZXJlcigpKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBNYXJrZG9jUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgRUpTUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgRVRBUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgTGlxdWlkUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgTnVuanVja3NSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBIYW5kbGViYXJzUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgQ1NTTEVTU1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IEpTT05SZW5kZXJlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGEgUmVuZGVyZXIgYnkgaXRzIGV4dGVuc2lvbi5cbiAgICAgKi9cbiAgICBmaW5kUmVuZGVyZXIobmFtZTogc3RyaW5nKTogUmVuZGVyZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kUmVuZGVyZXJOYW1lKG5hbWUpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vIEZpbmQgTGF5b3V0cyBvciBQYXJ0aWFsc1xuXG4gICAgI3BhcnRpYWw6IChmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgI3BhcnRpYWxTeW5jOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgc2V0IHBhcnRpYWxGdW5jKHBmdW5jOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gUHJvbWlzZTxzdHJpbmc+KSB7XG4gICAgICAgIHRoaXMuI3BhcnRpYWwgPSBwZnVuYztcbiAgICB9XG5cbiAgICBzZXQgcGFydGlhbEZ1bmNTeW5jKHBmdW5jOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuI3BhcnRpYWxTeW5jID0gcGZ1bmM7XG4gICAgfVxuXG4gICAgYXN5bmMgcGFydGlhbChmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSB7XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMuI3BhcnRpYWwoZm5hbWUsIG1ldGFkYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYENvbmZpZ3VyYXRpb24gcGFydGlhbCAke2ZuYW1lfSAke3V0aWwuaW5zcGVjdChtZXRhZGF0YSl9ID09PiAke3JldH1gKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBwYXJ0aWFsU3luYyhmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHRoaXMuI3BhcnRpYWxTeW5jKGZuYW1lLCBtZXRhZGF0YSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBDb25maWd1cmF0aW9uIHBhcnRpYWxTeW5jICR7Zm5hbWV9ICR7dXRpbC5pbnNwZWN0KG1ldGFkYXRhKX0gPT0+ICR7cmV0fWApO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxufVxuXG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHM6IHN0cmluZykge1xuICAgIGlmICghcykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghKHR5cGVvZiBzID09PSAnc3RyaW5nJykpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoczogYW55KSB7XG4gICAgaWYgKCFzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCEodHlwZW9mIHMgPT09ICdvYmplY3QnKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc1JlbmRlcmVyKHIpIHtcbiAgICBpZiAoIXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoISh0eXBlb2YgciA9PT0gJ29iamVjdCcpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCEociBpbnN0YW5jZW9mIFJlbmRlcmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc1BhdGhBcnJheShhcnkpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJ5KSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoY29uc3QgcCBvZiBhcnkpIHtcbiAgICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUocCkpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzQWJzb2x1dGVQYXRoKHApIHtcbiAgICBpZiAoISh0eXBlb2YgcCA9PT0gJ3N0cmluZycpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUocCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gRGVmYXVsdCBQYXJ0aWFsL0xheW91dCBmaW5kZXIgZnVuY3Rpb25zXG5cbmFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRGaW5kTGF5b3V0KGZubGF5b3V0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBmb3IgKGNvbnN0IGxkaXIgb2YgdGhpcy5sYXlvdXREaXJzKSB7XG4gICAgICAgIGNvbnN0IGxwYXRoID0gcGF0aC5qb2luKGxkaXIsIGZubGF5b3V0KTtcbiAgICAgICAgbGV0IGxzdGF0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbHN0YXQgPSBhd2FpdCBmc3Auc3RhdChscGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyBsc3RhdCA9IHVuZGVmaW5lZDsgfVxuICAgICAgICBpZiAobHN0YXQpIHtcbiAgICAgICAgICAgIGlmIChsc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBscGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0RmluZExheW91dFN5bmMoZm5sYXlvdXQpOiBzdHJpbmcge1xuICAgIGZvciAoY29uc3QgbGRpciBvZiB0aGlzLmxheW91dERpcnMpIHtcbiAgICAgICAgY29uc3QgbHBhdGggPSBwYXRoLmpvaW4obGRpciwgZm5sYXlvdXQpO1xuICAgICAgICBsZXQgbHN0YXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsc3RhdCA9IGZzLnN0YXRTeW5jKGxwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IGxzdGF0ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIGlmIChsc3RhdCkge1xuICAgICAgICAgICAgaWYgKGxzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRGaW5kUGFydGlhbChmbnBhcnRpYWwpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGBkZWZhdWx0RmluZFBhcnRpYWwgJHtmbnBhcnRpYWx9YCwgdGhpcy5wYXJ0aWFsRGlycyk7XG4gICAgZm9yIChjb25zdCBwZGlyIG9mIHRoaXMucGFydGlhbERpcnMpIHtcbiAgICAgICAgY29uc3QgcHBhdGggPSBwYXRoLmpvaW4ocGRpciwgZm5wYXJ0aWFsKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYGRlZmF1bHRGaW5kUGFydGlhbCBkb2VzICR7cHBhdGh9IGV4aXN0IGZvciAke2ZucGFydGlhbH0/YCk7XG4gICAgICAgIGxldCBwc3RhdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBzdGF0ID0gYXdhaXQgZnNwLnN0YXQocHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGBzdGF0IGZvciAke3BwYXRofSBmYWlsZWQgYCwgZXJyKTtcbiAgICAgICAgICAgIHBzdGF0ID0gdW5kZWZpbmVkOyBcbiAgICAgICAgfVxuICAgICAgICBpZiAocHN0YXQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBkZWZhdWx0RmluZFBhcnRpYWwgJHtwcGF0aH0gc3RhdHNgLCBwc3RhdCk7XG4gICAgICAgICAgICBpZiAocHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGVmYXVsdEZpbmRQYXJ0aWFsICR7cHBhdGh9IGV4aXN0c2ApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0RmluZFBhcnRpYWxTeW5jKGZucGFydGlhbCk6IHN0cmluZyB7XG4gICAgZm9yIChjb25zdCBwZGlyIG9mIHRoaXMucGFydGlhbERpcnMpIHtcbiAgICAgICAgY29uc3QgcHBhdGggPSBwYXRoLmpvaW4ocGRpciwgZm5wYXJ0aWFsKTtcbiAgICAgICAgbGV0IHBzdGF0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHN0YXQgPSBmcy5zdGF0U3luYyhwcGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyBwc3RhdCA9IHVuZGVmaW5lZDsgfVxuICAgICAgICBpZiAocHN0YXQpIHtcbiAgICAgICAgICAgIGlmIChwc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRQYXJ0aWFsKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpIHtcbiAgICBcbiAgICBjb25zdCBmb3VuZCA9IGF3YWl0IHRoaXMuZmluZFBhcnRpYWwoZm5hbWUpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBwYXJ0aWFsIGZvdW5kIGZvciAke2ZuYW1lfSBpbiAke3V0aWwuaW5zcGVjdCh0aGlzLnBhcnRpYWxEaXJzKX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZmluZFJlbmRlcmVyUGF0aChmbmFtZSk7XG4gICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICBpZiAoZm5hbWUuZW5kc1dpdGgoJy5odG1sJykgfHwgZm5hbWUuZW5kc1dpdGgoJy54aHRtbCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnNwLnJlYWRGaWxlKGZvdW5kLCAndXRmLTgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGVmYXVsdFBhcnRpYWwgbm8gUmVuZGVyZXIgZm91bmQgZm9yICR7Zm5hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwQ29udGVudCA9IGF3YWl0IGZzcC5yZWFkRmlsZShmb3VuZCwgJ3V0Zi04Jyk7XG5cbiAgICAgICAgLy8gU29tZSByZW5kZXJlcnMgKE51bmp1a3MpIHJlcXVpcmUgdGhhdCBtZXRhZGF0YS5jb25maWdcbiAgICAgICAgLy8gcG9pbnQgdG8gdGhlIGNvbmZpZyBvYmplY3QuICBUaGlzIGJsb2NrIG9mIGNvZGVcbiAgICAgICAgLy8gZHVwbGljYXRlcyB0aGUgbWV0YWRhdGEgb2JqZWN0LCB0aGVuIHNldHMgdGhlXG4gICAgICAgIC8vIGNvbmZpZyBmaWVsZCBpbiB0aGUgZHVwbGljYXRlLCBwYXNzaW5nIHRoYXQgdG8gdGhlIHBhcnRpYWwuXG4gICAgICAgIGxldCBtZGF0YSA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIG1kYXRhW3Byb3BdID0gbWV0YWRhdGFbcHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ET1xuICAgICAgICAvLyBtZGF0YS5jb25maWcgPSBjb25maWc7XG4gICAgICAgIG1kYXRhWydwYXJ0aWFsU3luYyddID0gdGhpcy5wYXJ0aWFsU3luYy5iaW5kKHRoaXMpO1xuICAgICAgICBtZGF0YVsncGFydGlhbCddICAgICA9IHRoaXMucGFydGlhbC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiByZW5kZXJlci5yZW5kZXIoPFJlbmRlcmluZ0NvbnRleHQ+e1xuICAgICAgICAgICAgY29udGVudDogcENvbnRlbnQsXG4gICAgICAgICAgICBtZXRhZGF0YTogbWRhdGEsXG4gICAgICAgICAgICBmc3BhdGg6IGZvdW5kXG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGRlZmF1bHRQYXJ0aWFsU3luYyhmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSB7XG4gICAgXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmZpbmRQYXJ0aWFsU3luYyhmbmFtZSk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHBhcnRpYWwgZm91bmQgZm9yICR7Zm5hbWV9IGluICR7dXRpbC5pbnNwZWN0KHRoaXMucGFydGlhbERpcnMpfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5maW5kUmVuZGVyZXJQYXRoKGZuYW1lKTtcbiAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgIGlmIChmbmFtZS5lbmRzV2l0aCgnLmh0bWwnKSB8fCBmbmFtZS5lbmRzV2l0aCgnLnhodG1sJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMoZm91bmQsICd1dGYtOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkZWZhdWx0UGFydGlhbCBubyBSZW5kZXJlciBmb3VuZCBmb3IgJHtmbmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZvdW5kLCAndXRmLTgnKTtcblxuICAgICAgICAvLyBTb21lIHJlbmRlcmVycyAoTnVuanVrcykgcmVxdWlyZSB0aGF0IG1ldGFkYXRhLmNvbmZpZ1xuICAgICAgICAvLyBwb2ludCB0byB0aGUgY29uZmlnIG9iamVjdC4gIFRoaXMgYmxvY2sgb2YgY29kZVxuICAgICAgICAvLyBkdXBsaWNhdGVzIHRoZSBtZXRhZGF0YSBvYmplY3QsIHRoZW4gc2V0cyB0aGVcbiAgICAgICAgLy8gY29uZmlnIGZpZWxkIGluIHRoZSBkdXBsaWNhdGUsIHBhc3NpbmcgdGhhdCB0byB0aGUgcGFydGlhbC5cbiAgICAgICAgbGV0IG1kYXRhID0ge307XG4gICAgICAgIGxldCBwcm9wO1xuXG4gICAgICAgIGZvciAocHJvcCBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgbWRhdGFbcHJvcF0gPSBtZXRhZGF0YVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIG1kYXRhLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgbWRhdGFbJ3BhcnRpYWxTeW5jJ10gPSB0aGlzLnBhcnRpYWxTeW5jLmJpbmQodGhpcyk7XG4gICAgICAgIG1kYXRhWydwYXJ0aWFsJ10gICAgID0gdGhpcy5wYXJ0aWFsLmJpbmQodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLnJlbmRlclN5bmMoPFJlbmRlcmluZ0NvbnRleHQ+e1xuICAgICAgICAgICAgY29udGVudDogcENvbnRlbnQsXG4gICAgICAgICAgICBtZXRhZGF0YTogbWRhdGEsXG4gICAgICAgICAgICBmc3BhdGg6IGZvdW5kXG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19