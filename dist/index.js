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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _Configuration_renderers, _Configuration_partialDirs, _Configuration_layoutDirs, _Configuration_finderPartial, _Configuration_finderPartialSync, _Configuration_finderLayout, _Configuration_finderLayoutSync, _Configuration_partial, _Configuration_partialSync;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = exports.RenderingFormat = exports.parseFrontmatter = exports.Renderer = void 0;
const util = __importStar(require("util"));
const path = __importStar(require("path"));
const fs_1 = require("fs");
const fs = __importStar(require("fs"));
const Renderer_1 = require("./Renderer");
const render_asciidoc_1 = require("./render-asciidoc");
const render_cssless_1 = require("./render-cssless");
const render_ejs_1 = require("./render-ejs");
const render_handlebars_1 = require("./render-handlebars");
const render_json_1 = require("./render-json");
const render_liquid_1 = require("./render-liquid");
const render_md_1 = require("./render-md");
const render_nunjucks_1 = require("./render-nunjucks");
var Renderer_2 = require("./Renderer");
Object.defineProperty(exports, "Renderer", { enumerable: true, get: function () { return Renderer_2.Renderer; } });
Object.defineProperty(exports, "parseFrontmatter", { enumerable: true, get: function () { return Renderer_2.parseFrontmatter; } });
const runtime_data_validation_1 = require("runtime-data-validation");
var RenderingFormat;
(function (RenderingFormat) {
    RenderingFormat["HTML"] = "HTML";
    RenderingFormat["PHP"] = "PHP";
    RenderingFormat["JSON"] = "JSON";
    RenderingFormat["CSS"] = "CSS";
    RenderingFormat["JS"] = "JS";
})(RenderingFormat = exports.RenderingFormat || (exports.RenderingFormat = {}));
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
    set partialDirs(dirz) { __classPrivateFieldSet(this, _Configuration_partialDirs, dirz, "f"); }
    get partialDirs() { return __classPrivateFieldGet(this, _Configuration_partialDirs, "f"); }
    /**
     * Add an absolute pathname for a directory to find partial templates.
     * @param dir
     */
    addPartialDir(dir) {
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
    set layoutDirs(dirz) { __classPrivateFieldSet(this, _Configuration_layoutDirs, dirz, "f"); }
    get layoutDirs() { return __classPrivateFieldGet(this, _Configuration_layoutDirs, "f"); }
    /**
     * Add an absolute pathname for a directory to find layout templates.
     * @param dir
     */
    addLayoutDir(dir) {
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
    async findLayout(fnlayout) {
        return __classPrivateFieldGet(this, _Configuration_finderLayout, "f").call(this, fnlayout);
    }
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
            console.error('Not A Renderer ' + util.inspect(renderer));
            throw new Error(`Not a Renderer ${util.inspect(renderer)}`);
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
            console.error('Not A Renderer ' + util.inspect(renderer));
            throw new Error(`Not a Renderer ${util.inspect(renderer)}`);
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
            if (r.match(_path))
                return r;
        }
        // console.log(`findRendererPath NO RENDERER for ${_path}`);
        return undefined;
    }
    registerBuiltInRenderers() {
        // Register built-in renderers
        this.registerRenderer(new render_md_1.MarkdownRenderer());
        this.registerRenderer(new render_asciidoc_1.AsciidocRenderer());
        this.registerRenderer(new render_ejs_1.EJSRenderer());
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
        return __classPrivateFieldGet(this, _Configuration_partial, "f").call(this, fname, metadata);
    }
    partialSync(fname, metadata) {
        return __classPrivateFieldGet(this, _Configuration_partialSync, "f").call(this, fname, metadata);
    }
}
_Configuration_renderers = new WeakMap(), _Configuration_partialDirs = new WeakMap(), _Configuration_layoutDirs = new WeakMap(), _Configuration_finderPartial = new WeakMap(), _Configuration_finderPartialSync = new WeakMap(), _Configuration_finderLayout = new WeakMap(), _Configuration_finderLayoutSync = new WeakMap(), _Configuration_partial = new WeakMap(), _Configuration_partialSync = new WeakMap();
__decorate([
    (0, runtime_data_validation_1.ValidateAccessor)(),
    IsPathArray(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], Configuration.prototype, "partialDirs", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsAbsolutePath()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Configuration.prototype, "addPartialDir", null);
__decorate([
    (0, runtime_data_validation_1.ValidateAccessor)(),
    IsPathArray(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], Configuration.prototype, "layoutDirs", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsAbsolutePath()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Configuration.prototype, "addLayoutDir", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsRenderer()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Renderer_1.Renderer]),
    __metadata("design:returntype", void 0)
], Configuration.prototype, "registerRenderer", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsRenderer()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Renderer_1.Renderer]),
    __metadata("design:returntype", void 0)
], Configuration.prototype, "registerOverrideRenderer", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsString()),
    __param(1, IsObject()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Configuration.prototype, "partial", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsString()),
    __param(1, IsObject()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], Configuration.prototype, "partialSync", null);
exports.Configuration = Configuration;
// Custom validators
function isString(s) {
    if (!s)
        return false;
    if (!(typeof s === 'string'))
        return false;
    return true;
}
function IsString() {
    return (0, runtime_data_validation_1.generateValidationDecorator)(isString, `Value :value: is not a string`);
}
function isObject(s) {
    if (!s)
        return false;
    if (!(typeof s === 'object'))
        return false;
    return true;
}
function IsObject() {
    return (0, runtime_data_validation_1.generateValidationDecorator)(isObject, `Value :value: is not an object`);
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
function IsRenderer() {
    return (0, runtime_data_validation_1.generateValidationDecorator)(isRenderer, `Value :value: is not a Renderer`);
}
function isPathArray(ary) {
    if (!Array.isArray(ary))
        return false;
    for (const p of ary) {
        if (!path.isAbsolute(p))
            return false;
    }
    return true;
}
function IsPathArray() {
    return (0, runtime_data_validation_1.generateValidationDecorator)(isPathArray, `Value :value: is not a Path Array`);
}
function isAbsolutePath(p) {
    if (!(typeof p === 'string'))
        return false;
    if (!path.isAbsolute(p))
        return false;
    return true;
}
function IsAbsolutePath() {
    return (0, runtime_data_validation_1.generateValidationDecorator)(isAbsolutePath, `Value :value: is not an Absolute Path`);
}
// Default Partial/Layout finder functions
async function defaultFindLayout(fnlayout) {
    for (const ldir of this.layoutDirs) {
        const lpath = path.join(ldir, fnlayout);
        let lstat;
        try {
            lstat = await fs_1.promises.stat(lpath);
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
        const lpath = path.join(ldir, fnlayout);
        let lstat;
        try {
            lstat = fs.statSync(lpath);
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
        const ppath = path.join(pdir, fnpartial);
        // console.log(`defaultFindPartial does ${ppath} exist for ${fnpartial}?`);
        let pstat;
        try {
            pstat = await fs_1.promises.stat(ppath);
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
        const ppath = path.join(pdir, fnpartial);
        let pstat;
        try {
            pstat = fs.statSync(ppath);
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
        throw new Error(`No partial found for ${fname} in ${util.inspect(this.partialDirs)}`);
    }
    const renderer = this.findRendererPath(fname);
    if (!renderer) {
        if (fname.endsWith('.html') || fname.endsWith('.xhtml')) {
            return fs_1.promises.readFile(found, 'utf-8');
        }
        else {
            throw new Error(`defaultPartial no Renderer found for ${fname}`);
        }
    }
    else {
        const pContent = await fs_1.promises.readFile(found, 'utf-8');
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
        throw new Error(`No partial found for ${fname} in ${util.inspect(this.partialDirs)}`);
    }
    const renderer = this.findRendererPath(fname);
    if (!renderer) {
        if (fname.endsWith('.html') || fname.endsWith('.xhtml')) {
            return fs_1.promises.readFile(found, 'utf-8');
        }
        else {
            throw new Error(`defaultPartial no Renderer found for ${fname}`);
        }
    }
    else {
        const pContent = fs.readFileSync(found, 'utf-8');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCwyQ0FBNkI7QUFDN0IsMkNBQTZCO0FBQzdCLDJCQUFxQztBQUNyQyx1Q0FBeUI7QUFFekIseUNBQXNDO0FBRXRDLHVEQUFxRDtBQUNyRCxxREFBbUQ7QUFDbkQsNkNBQTJDO0FBQzNDLDJEQUF5RDtBQUN6RCwrQ0FBNkM7QUFDN0MsbURBQWlEO0FBQ2pELDJDQUErQztBQUMvQyx1REFBcUQ7QUFFckQsdUNBQXdEO0FBQS9DLG9HQUFBLFFBQVEsT0FBQTtBQUFFLDRHQUFBLGdCQUFnQixPQUFBO0FBRW5DLHFFQUlpQztBQW1DakMsSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3ZCLGdDQUFhLENBQUE7SUFDYiw4QkFBWSxDQUFBO0lBQ1osZ0NBQWEsQ0FBQTtJQUNiLDhCQUFZLENBQUE7SUFDWiw0QkFBVyxDQUFBO0FBQ2YsQ0FBQyxFQU5XLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBTTFCO0FBQUEsQ0FBQztBQUVGLE1BQWEsYUFBYTtJQU10QixZQUFZLE1BQTRCO1FBSnhDLDJDQUFXO1FBQ1gsNkNBQWE7UUFDYiw0Q0FBWTtRQStEWiwrQ0FBK0M7UUFDL0MsbURBQTBDO1FBOEMxQyw4Q0FBNkM7UUFDN0Msa0RBQXdDO1FBdUd4QyxpQ0FBaUM7UUFFakMseUNBQTREO1FBQzVELDZDQUF1RDtRQXRObkQsdUJBQUEsSUFBSSw0QkFBYyxFQUFFLE1BQUEsQ0FBQztRQUNyQix1QkFBQSxJQUFJLDhCQUFnQixFQUFFLE1BQUEsQ0FBQztRQUN2Qix1QkFBQSxJQUFJLDZCQUFlLEVBQUUsTUFBQSxDQUFDO1FBRXRCOzs7Ozs7V0FNRztRQUNILElBQUksQ0FBQyx3QkFBd0Is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QUNKO1NBQU07UUFDSCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqRCx3REFBd0Q7UUFDeEQsa0RBQWtEO1FBQ2xELGdEQUFnRDtRQUNoRCw4REFBOEQ7UUFDOUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUM7UUFFVCxLQUFLLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU87UUFDUCx5QkFBeUI7UUFDekIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQW1CO1lBQ3pDLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0tBRU47QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMjItMjAyMiBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnNwIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IHsgSFRNTFJlbmRlcmVyIH0gZnJvbSAnLi9IVE1MUmVuZGVyZXInO1xuaW1wb3J0IHsgQXNjaWlkb2NSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWFzY2lpZG9jJztcbmltcG9ydCB7IENTU0xFU1NSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWNzc2xlc3MnO1xuaW1wb3J0IHsgRUpTUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1lanMnO1xuaW1wb3J0IHsgSGFuZGxlYmFyc1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItaGFuZGxlYmFycyc7XG5pbXBvcnQgeyBKU09OUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1qc29uJztcbmltcG9ydCB7IExpcXVpZFJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbGlxdWlkJztcbmltcG9ydCB7IE1hcmtkb3duUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1tZCc7XG5pbXBvcnQgeyBOdW5qdWNrc1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbnVuanVja3MnO1xuXG5leHBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXInO1xuXG5pbXBvcnQge1xuICAgIElzSW50UmFuZ2UsIElzSW50LCBJc0Zsb2F0UmFuZ2UsIElzRmxvYXQsXG4gICAgZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yLFxuICAgIFZhbGlkYXRlUGFyYW1zLCBWYWxpZGF0ZUFjY2Vzc29yLFxufSBmcm9tICdydW50aW1lLWRhdGEtdmFsaWRhdGlvbic7XG5cblxuLy8gVE9ETyAtRE9ORSByZXF1aXJlIGEgY29udGFpbmVyIGNsYXNzIHRvIGhvbGQgdGhlIGxpc3Qgb2YgcmVuZGVyZXJzXG4vLyAgICAgIC1ET05FIGFsbG93IFJlbmRlcmVycyB0byBiZSBhZGRlZCBieSBvdGhlciBjb2RlXG4vLyAgICAgIC0gY29udGFpbiBjb25maWd1cmF0aW9uIGZvciB0aGluZ3Ncbi8vXG4vLyBDb25maWd1cmF0aW9uIC0gZnVuY3Rpb25zIHRvIGZpbmQgYXNzZXRzL2RvY3VtZW50cy9wYXJ0aWFscy9sYXlvdXRzXG4vLyAgICAgICAgICAgICAgIC0gZnVuY3Rpb24gdG8gd3JpdGUgcmVuZGVyZWQgZmlsZVxuLy8gICAgICAgICAgICAgICAtIGZ1bmN0aW9ucyAtIHBhcnRpYWwgLSBwYXJ0aWFsU3luY1xuLy9cbi8vIE1haGFmdW5jIGZvciA8cGFydGlhbD5cblxuZXhwb3J0IHR5cGUgQ29uZmlndXJhdGlvblBhcmFtcyA9IHtcbiAgICBwYXJ0aWFsRGlycz86IEFycmF5PHN0cmluZz47XG4gICAgZmluZFBhcnRpYWw/OiAoZm4pID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICBmaW5kUGFydGlhbFN5bmM/OiAoZm4pID0+IHN0cmluZztcbiAgICBsYXlvdXREaXJzPzogQXJyYXk8c3RyaW5nPjtcbiAgICBmaW5kTGF5b3V0PzogKGZuKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgZmluZExheW91dFN5bmM/OiAoZm4pID0+IHN0cmluZztcblxuICAgIHBhcnRpYWw/OiAoZm4sIG1ldGFkYXRhKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgcGFydGlhbFN5bmM/OiAoZm4sIG1ldGFkYXRhKSA9PiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBSZW5kZXJpbmdDb250ZXh0ID0ge1xuICAgIGZzcGF0aD86IHN0cmluZzsgICAvLyBQYXRobmFtZSB0aGF0IGNhbiBiZSBnaXZlbiB0byB0ZW1wbGF0ZSBlbmdpbmVzIGZvciBlcnJvciBtZXNzYWdlc1xuICAgIGNvbnRlbnQ6IHN0cmluZzsgICAvLyBDb250ZW50IHRvIHJlbmRlclxuICAgIGJvZHk/OiBzdHJpbmc7ICAgICAvLyBDb250ZW50IGJvZHkgYWZ0ZXIgcGFyc2luZyBmcm9udG1hdHRlclxuXG4gICAgcmVuZGVyVG8/OiBzdHJpbmc7ICAvLyBQYXRobmFtZSBmb3IgcmVuZGVyaW5nIG91dHB1dFxuXG4gICAgbWV0YWRhdGE6IGFueTsgIC8vIERhdGEgdG8gYmUgdXNlZCBmb3Igc2F0aXNmeWluZyB2YXJpYWJsZXMgaW4gdGVtcGxhdGVzXG59O1xuXG5leHBvcnQgZW51bSBSZW5kZXJpbmdGb3JtYXQge1xuICAgIEhUTUwgPSAnSFRNTCcsXG4gICAgUEhQICA9ICdQSFAnLFxuICAgIEpTT04gPSAnSlNPTicsXG4gICAgQ1NTICA9ICdDU1MnLFxuICAgIEpTICAgPSAnSlMnXG59O1xuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbiB7XG5cbiAgICAjcmVuZGVyZXJzO1xuICAgICNwYXJ0aWFsRGlycztcbiAgICAjbGF5b3V0RGlycztcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcz86IENvbmZpZ3VyYXRpb25QYXJhbXMpIHtcbiAgICAgICAgdGhpcy4jcmVuZGVyZXJzID0gW107XG4gICAgICAgIHRoaXMuI3BhcnRpYWxEaXJzID0gW107XG4gICAgICAgIHRoaXMuI2xheW91dERpcnMgPSBbXTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBJcyB0aGlzIHRoZSBiZXN0IHBsYWNlIGZvciB0aGlzPyAgSXQgaXMgbmVjZXNzYXJ5IHRvXG4gICAgICAgICAqIGNhbGwgdGhpcyBmdW5jdGlvbiBzb21ld2hlcmUuICBUaGUgbmF0dXJlIG9mIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgICogaXMgdGhhdCBpdCBjYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzIHdpdGggbm8gaW1wYWN0LiAgXG4gICAgICAgICAqIEJ5IGJlaW5nIGxvY2F0ZWQgaGVyZSwgaXQgd2lsbCBhbHdheXMgYmUgY2FsbGVkIGJ5IHRoZVxuICAgICAgICAgKiB0aW1lIGFueSBDb25maWd1cmF0aW9uIGlzIGdlbmVyYXRlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVnaXN0ZXJCdWlsdEluUmVuZGVyZXJzKCk7XG5cbiAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMucGFydGlhbERpcnMpIHRoaXMuI3BhcnRpYWxEaXJzID0gcGFyYW1zLnBhcnRpYWxEaXJzO1xuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5sYXlvdXREaXJzKSAgdGhpcy4jbGF5b3V0RGlycyAgPSBwYXJhbXMubGF5b3V0RGlycztcblxuICAgICAgICB0aGlzLiNmaW5kZXJQYXJ0aWFsID0gKHBhcmFtcyAmJiBwYXJhbXMuZmluZFBhcnRpYWwpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLmZpbmRQYXJ0aWFsXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdEZpbmRQYXJ0aWFsLmJpbmQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiNmaW5kZXJQYXJ0aWFsU3luYyA9IChwYXJhbXMgJiYgcGFyYW1zLmZpbmRQYXJ0aWFsU3luYylcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMuZmluZFBhcnRpYWxTeW5jXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdEZpbmRQYXJ0aWFsU3luYy5iaW5kKHRoaXMpO1xuXG5cbiAgICAgICAgdGhpcy4jZmluZGVyTGF5b3V0ID0gKHBhcmFtcyAmJiBwYXJhbXMuZmluZExheW91dClcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMuZmluZExheW91dFxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRGaW5kTGF5b3V0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy4jZmluZGVyTGF5b3V0U3luYyA9IChwYXJhbXMgJiYgcGFyYW1zLmZpbmRMYXlvdXRTeW5jKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5maW5kTGF5b3V0U3luY1xuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRGaW5kTGF5b3V0U3luYy5iaW5kKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4jcGFydGlhbCA9IChwYXJhbXMgJiYgcGFyYW1zLnBhcnRpYWwpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLnBhcnRpYWxcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0UGFydGlhbC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuI3BhcnRpYWxTeW5jID0gKHBhcmFtcyAmJiBwYXJhbXMucGFydGlhbFN5bmMpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLnBhcnRpYWxTeW5jXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdFBhcnRpYWxTeW5jLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYWJzb2x1dGUgcGF0aHMgdG8gZGlyZWN0b3JpZXMgY29udGFpbmluZ1xuICAgICAqIHBhcnRpYWwgdGVtcGxhdGVzLlxuICAgICAqL1xuICAgIEBWYWxpZGF0ZUFjY2Vzc29yPEFycmF5PHN0cmluZz4+KClcbiAgICBASXNQYXRoQXJyYXkoKVxuICAgIHNldCBwYXJ0aWFsRGlycyhkaXJ6OiBBcnJheTxzdHJpbmc+KSB7IHRoaXMuI3BhcnRpYWxEaXJzID0gZGlyejsgfVxuICAgIGdldCBwYXJ0aWFsRGlycygpIC8qOiBBcnJheTxzdHJpbmc+ICovIHsgcmV0dXJuIHRoaXMuI3BhcnRpYWxEaXJzOyB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gYWJzb2x1dGUgcGF0aG5hbWUgZm9yIGEgZGlyZWN0b3J5IHRvIGZpbmQgcGFydGlhbCB0ZW1wbGF0ZXMuXG4gICAgICogQHBhcmFtIGRpciBcbiAgICAgKi9cbiAgICBAVmFsaWRhdGVQYXJhbXNcbiAgICBhZGRQYXJ0aWFsRGlyKEBJc0Fic29sdXRlUGF0aCgpIGRpcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuI3BhcnRpYWxEaXJzLnB1c2goZGlyKTtcbiAgICB9XG5cbiAgICAjZmluZGVyUGFydGlhbDogKGZucGFydGlhbCkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgICNmaW5kZXJQYXJ0aWFsU3luYzogKGZucGFydGlhbCkgPT4gc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmdW5jdGlvbiBmb3IgZmluZGluZyBwYXJ0aWFsIHRlbXBsYXRlcy5cbiAgICAgKi9cbiAgICBzZXQgcGFydGlhbEZpbmRlcihmaW5kZXI6IChmbnBhcnRpYWwpID0+IFByb21pc2U8c3RyaW5nPikge1xuICAgICAgICBpZiAoZmluZGVyICYmIHR5cGVvZiBmaW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuI2ZpbmRlclBhcnRpYWwgPSBmaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBhIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHBhcnRpYWwgdGVtcGxhdGVzLlxuICAgICAqL1xuICAgIHNldCBwYXJ0aWFsRmluZGVyU3luYyhmaW5kZXI6IChmbnBhcnRpYWwpID0+IHN0cmluZykge1xuICAgICAgICBpZiAoZmluZGVyICYmIHR5cGVvZiBmaW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuI2ZpbmRlclBhcnRpYWxTeW5jID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZmluZFBhcnRpYWwoZm5wYXJ0aWFsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy4jZmluZGVyUGFydGlhbChmbnBhcnRpYWwpO1xuICAgIH1cblxuICAgIGZpbmRQYXJ0aWFsU3luYyhmbnBhcnRpYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiNmaW5kZXJQYXJ0aWFsU3luYyhmbnBhcnRpYWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGFic29sdXRlIHBhdGhzIHRvIGRpcmVjdG9yaWVzIGNvbnRhaW5pbmdcbiAgICAgKiBsYXlvdXQgdGVtcGxhdGVzLlxuICAgICAqL1xuICAgIEBWYWxpZGF0ZUFjY2Vzc29yPEFycmF5PHN0cmluZz4+KClcbiAgICBASXNQYXRoQXJyYXkoKVxuICAgIHNldCBsYXlvdXREaXJzKGRpcno6IEFycmF5PHN0cmluZz4pIHsgdGhpcy4jbGF5b3V0RGlycyA9IGRpcno7IH1cbiAgICBnZXQgbGF5b3V0RGlycygpOiBBcnJheTxzdHJpbmc+IHsgcmV0dXJuIHRoaXMuI2xheW91dERpcnM7IH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBhYnNvbHV0ZSBwYXRobmFtZSBmb3IgYSBkaXJlY3RvcnkgdG8gZmluZCBsYXlvdXQgdGVtcGxhdGVzLlxuICAgICAqIEBwYXJhbSBkaXIgXG4gICAgICovXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgYWRkTGF5b3V0RGlyKEBJc0Fic29sdXRlUGF0aCgpIGRpcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuI2xheW91dERpcnMucHVzaChkaXIpO1xuICAgIH1cblxuICAgICNmaW5kZXJMYXlvdXQ6IChmbmxheW91dCkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgICNmaW5kZXJMYXlvdXRTeW5jOiAoZm5sYXlvdXQpID0+IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgZnVuY3Rpb24gZm9yIGZpbmRpbmcgbGF5b3V0IHRlbXBsYXRlc1xuICAgICAqIEBwYXJhbSBmaW5kZXJcbiAgICAgKi9cbiAgICBzZXQgbGF5b3V0RmluZGVyKGZpbmRlcjogKGZubGF5b3V0KSA9PiBQcm9taXNlPHN0cmluZz4pIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXQgPSBmaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBhIGZ1bmN0aW9uIGZvciBmaW5kaW5nIGxheW91dCB0ZW1wbGF0ZXNcbiAgICAgKiBAcGFyYW0gZmluZGVyXG4gICAgICovXG4gICAgc2V0IGxheW91dEZpbmRlclN5bmMoZmluZGVyOiAoZm5sYXlvdXQpID0+IHN0cmluZykge1xuICAgICAgICBpZiAoZmluZGVyICYmIHR5cGVvZiBmaW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuI2ZpbmRlckxheW91dFN5bmMgPSBmaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmaW5kTGF5b3V0KGZubGF5b3V0OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy4jZmluZGVyTGF5b3V0KGZubGF5b3V0KTtcbiAgICB9XG5cbiAgICBmaW5kTGF5b3V0U3luYyhmbmxheW91dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2ZpbmRlckxheW91dFN5bmMoZm5sYXlvdXQpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vIFJlbmRlcmVyc1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBsaXN0IG9mIHJlZ2lzdGVyZWQgcmVuZGVyZXJzXG4gICAgICovXG4gICAgZ2V0IHJlbmRlcmVycygpOiBBcnJheTxSZW5kZXJlcj4geyByZXR1cm4gdGhpcy4jcmVuZGVyZXJzOyB9XG5cbiAgICBAVmFsaWRhdGVQYXJhbXNcbiAgICByZWdpc3RlclJlbmRlcmVyKEBJc1JlbmRlcmVyKCkgcmVuZGVyZXI6IFJlbmRlcmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghKHJlbmRlcmVyIGluc3RhbmNlb2YgUmVuZGVyZXIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdOb3QgQSBSZW5kZXJlciAnKyB1dGlsLmluc3BlY3QocmVuZGVyZXIpKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGEgUmVuZGVyZXIgJHt1dGlsLmluc3BlY3QocmVuZGVyZXIpfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5maW5kUmVuZGVyZXJOYW1lKHJlbmRlcmVyLm5hbWUpKSB7XG4gICAgICAgICAgICByZW5kZXJlci5jb25maWcgPSB0aGlzO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHJlZ2lzdGVyUmVuZGVyZXIgYCwgcmVuZGVyZXIpO1xuICAgICAgICAgICAgdGhpcy4jcmVuZGVyZXJzLnB1c2gocmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3cgYW4gYXBwbGljYXRpb24gdG8gb3ZlcnJpZGUgb25lIG9mIHRoZSBidWlsdC1pbiByZW5kZXJlcnNcbiAgICAgKiB0aGF0IGFyZSBpbml0aWFsaXplZCBiZWxvdy4gIFRoZSBpbnNwaXJhdGlvbiBpcyBlcHVidG9vbHMgdGhhdFxuICAgICAqIG11c3Qgd3JpdGUgSFRNTCBmaWxlcyB3aXRoIGFuIC54aHRtbCBleHRlbnNpb24uICBUaGVyZWZvcmUgaXRcbiAgICAgKiBjYW4gc3ViY2xhc3MgRUpTUmVuZGVyZXIgZXRjIHdpdGggaW1wbGVtZW50YXRpb25zIHRoYXQgZm9yY2UgdGhlXG4gICAgICogZmlsZSBuYW1lIHRvIGJlIC54aHRtbC4gIFdlJ3JlIG5vdCBjaGVja2luZyBpZiB0aGUgcmVuZGVyZXIgbmFtZVxuICAgICAqIGlzIGFscmVhZHkgdGhlcmUgaW4gY2FzZSBlcHVidG9vbHMgbXVzdCB1c2UgdGhlIHNhbWUgcmVuZGVyZXIgbmFtZS5cbiAgICAgKi9cbiAgICBAVmFsaWRhdGVQYXJhbXNcbiAgICByZWdpc3Rlck92ZXJyaWRlUmVuZGVyZXIoQElzUmVuZGVyZXIoKSByZW5kZXJlcjogUmVuZGVyZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEocmVuZGVyZXIgaW5zdGFuY2VvZiBSZW5kZXJlcikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdCBBIFJlbmRlcmVyICcrIHV0aWwuaW5zcGVjdChyZW5kZXJlcikpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgYSBSZW5kZXJlciAke3V0aWwuaW5zcGVjdChyZW5kZXJlcil9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyZXIuY29uZmlnID0gdGhpcztcbiAgICAgICAgdGhpcy4jcmVuZGVyZXJzLnVuc2hpZnQocmVuZGVyZXIpO1xuICAgIH1cblxuICAgIGZpbmRSZW5kZXJlck5hbWUobmFtZTogc3RyaW5nKTogUmVuZGVyZXIge1xuICAgICAgICBmb3IgKHZhciByIG9mIHRoaXMuI3JlbmRlcmVycykge1xuICAgICAgICAgICAgaWYgKHIubmFtZSA9PT0gbmFtZSkgcmV0dXJuIHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmaW5kUmVuZGVyZXJQYXRoKF9wYXRoOiBzdHJpbmcpOiBSZW5kZXJlciB7XG4gICAgICAgIC8vIGxvZyhgZmluZFJlbmRlcmVyUGF0aCAke19wYXRofWApO1xuICAgICAgICBmb3IgKHZhciByIG9mIHRoaXMuI3JlbmRlcmVycykge1xuICAgICAgICAgICAgaWYgKHIubWF0Y2goX3BhdGgpKSByZXR1cm4gcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZmluZFJlbmRlcmVyUGF0aCBOTyBSRU5ERVJFUiBmb3IgJHtfcGF0aH1gKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZWdpc3RlckJ1aWx0SW5SZW5kZXJlcnMoKSB7XG4gICAgICAgIC8vIFJlZ2lzdGVyIGJ1aWx0LWluIHJlbmRlcmVyc1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IE1hcmtkb3duUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgQXNjaWlkb2NSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBFSlNSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBMaXF1aWRSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBOdW5qdWNrc1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IEhhbmRsZWJhcnNSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBDU1NMRVNTUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgSlNPTlJlbmRlcmVyKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBSZW5kZXJlciBieSBpdHMgZXh0ZW5zaW9uLlxuICAgICAqL1xuICAgIGZpbmRSZW5kZXJlcihuYW1lOiBzdHJpbmcpOiBSZW5kZXJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRSZW5kZXJlck5hbWUobmFtZSk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8gRmluZCBMYXlvdXRzIG9yIFBhcnRpYWxzXG5cbiAgICAjcGFydGlhbDogKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICAjcGFydGlhbFN5bmM6IChmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSA9PiBzdHJpbmc7XG5cbiAgICBzZXQgcGFydGlhbEZ1bmMocGZ1bmM6IChmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSA9PiBQcm9taXNlPHN0cmluZz4pIHtcbiAgICAgICAgdGhpcy4jcGFydGlhbCA9IHBmdW5jO1xuICAgIH1cblxuICAgIHNldCBwYXJ0aWFsRnVuY1N5bmMocGZ1bmM6IChmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSA9PiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy4jcGFydGlhbFN5bmMgPSBwZnVuYztcbiAgICB9XG5cbiAgICBAVmFsaWRhdGVQYXJhbXNcbiAgICBhc3luYyBwYXJ0aWFsKFxuICAgICAgICBASXNTdHJpbmcoKSBmbmFtZTogc3RyaW5nLFxuICAgICAgICBASXNPYmplY3QoKSBtZXRhZGF0YTogYW55KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy4jcGFydGlhbChmbmFtZSwgbWV0YWRhdGEpO1xuICAgIH1cblxuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIHBhcnRpYWxTeW5jKFxuICAgICAgICBASXNTdHJpbmcoKSBmbmFtZTogc3RyaW5nLFxuICAgICAgICBASXNPYmplY3QoKSBtZXRhZGF0YTogYW55KSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy4jcGFydGlhbFN5bmMoZm5hbWUsIG1ldGFkYXRhKTtcbiAgICB9XG5cbn1cblxuLy8gQ3VzdG9tIHZhbGlkYXRvcnNcblxuZnVuY3Rpb24gaXNTdHJpbmcoczogc3RyaW5nKSB7XG4gICAgaWYgKCFzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCEodHlwZW9mIHMgPT09ICdzdHJpbmcnKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBJc1N0cmluZygpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yKFxuICAgICAgICBpc1N0cmluZyxcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGEgc3RyaW5nYCk7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHM6IGFueSkge1xuICAgIGlmICghcykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghKHR5cGVvZiBzID09PSAnb2JqZWN0JykpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gSXNPYmplY3QoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcihcbiAgICAgICAgaXNPYmplY3QsXG4gICAgICAgIGBWYWx1ZSA6dmFsdWU6IGlzIG5vdCBhbiBvYmplY3RgKTtcbn1cblxuXG5mdW5jdGlvbiBpc1JlbmRlcmVyKHIpIHtcbiAgICBpZiAoIXIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoISh0eXBlb2YgciA9PT0gJ29iamVjdCcpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCEociBpbnN0YW5jZW9mIFJlbmRlcmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBJc1JlbmRlcmVyKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVZhbGlkYXRpb25EZWNvcmF0b3IoXG4gICAgICAgIGlzUmVuZGVyZXIsXG4gICAgICAgIGBWYWx1ZSA6dmFsdWU6IGlzIG5vdCBhIFJlbmRlcmVyYCk7XG59XG5cbmZ1bmN0aW9uIGlzUGF0aEFycmF5KGFyeSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnkpKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChjb25zdCBwIG9mIGFyeSkge1xuICAgICAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShwKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gSXNQYXRoQXJyYXkoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcihcbiAgICAgICAgaXNQYXRoQXJyYXksXG4gICAgICAgIGBWYWx1ZSA6dmFsdWU6IGlzIG5vdCBhIFBhdGggQXJyYXlgKTtcbn1cblxuZnVuY3Rpb24gaXNBYnNvbHV0ZVBhdGgocCkge1xuICAgIGlmICghKHR5cGVvZiBwID09PSAnc3RyaW5nJykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXBhdGguaXNBYnNvbHV0ZShwKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBJc0Fic29sdXRlUGF0aCgpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yKFxuICAgICAgICBpc0Fic29sdXRlUGF0aCxcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGFuIEFic29sdXRlIFBhdGhgKTtcbn1cblxuLy8gRGVmYXVsdCBQYXJ0aWFsL0xheW91dCBmaW5kZXIgZnVuY3Rpb25zXG5cbmFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRGaW5kTGF5b3V0KGZubGF5b3V0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBmb3IgKGNvbnN0IGxkaXIgb2YgdGhpcy5sYXlvdXREaXJzKSB7XG4gICAgICAgIGNvbnN0IGxwYXRoID0gcGF0aC5qb2luKGxkaXIsIGZubGF5b3V0KTtcbiAgICAgICAgbGV0IGxzdGF0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbHN0YXQgPSBhd2FpdCBmc3Auc3RhdChscGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyBsc3RhdCA9IHVuZGVmaW5lZDsgfVxuICAgICAgICBpZiAobHN0YXQpIHtcbiAgICAgICAgICAgIGlmIChsc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBscGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0RmluZExheW91dFN5bmMoZm5sYXlvdXQpOiBzdHJpbmcge1xuICAgIGZvciAoY29uc3QgbGRpciBvZiB0aGlzLmxheW91dERpcnMpIHtcbiAgICAgICAgY29uc3QgbHBhdGggPSBwYXRoLmpvaW4obGRpciwgZm5sYXlvdXQpO1xuICAgICAgICBsZXQgbHN0YXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsc3RhdCA9IGZzLnN0YXRTeW5jKGxwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IGxzdGF0ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIGlmIChsc3RhdCkge1xuICAgICAgICAgICAgaWYgKGxzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRGaW5kUGFydGlhbChmbnBhcnRpYWwpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGBkZWZhdWx0RmluZFBhcnRpYWwgJHtmbnBhcnRpYWx9YCwgdGhpcy5wYXJ0aWFsRGlycyk7XG4gICAgZm9yIChjb25zdCBwZGlyIG9mIHRoaXMucGFydGlhbERpcnMpIHtcbiAgICAgICAgY29uc3QgcHBhdGggPSBwYXRoLmpvaW4ocGRpciwgZm5wYXJ0aWFsKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYGRlZmF1bHRGaW5kUGFydGlhbCBkb2VzICR7cHBhdGh9IGV4aXN0IGZvciAke2ZucGFydGlhbH0/YCk7XG4gICAgICAgIGxldCBwc3RhdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBzdGF0ID0gYXdhaXQgZnNwLnN0YXQocHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGBzdGF0IGZvciAke3BwYXRofSBmYWlsZWQgYCwgZXJyKTtcbiAgICAgICAgICAgIHBzdGF0ID0gdW5kZWZpbmVkOyBcbiAgICAgICAgfVxuICAgICAgICBpZiAocHN0YXQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBkZWZhdWx0RmluZFBhcnRpYWwgJHtwcGF0aH0gc3RhdHNgLCBwc3RhdCk7XG4gICAgICAgICAgICBpZiAocHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGVmYXVsdEZpbmRQYXJ0aWFsICR7cHBhdGh9IGV4aXN0c2ApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0RmluZFBhcnRpYWxTeW5jKGZucGFydGlhbCk6IHN0cmluZyB7XG4gICAgZm9yIChjb25zdCBwZGlyIG9mIHRoaXMucGFydGlhbERpcnMpIHtcbiAgICAgICAgY29uc3QgcHBhdGggPSBwYXRoLmpvaW4ocGRpciwgZm5wYXJ0aWFsKTtcbiAgICAgICAgbGV0IHBzdGF0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHN0YXQgPSBmcy5zdGF0U3luYyhwcGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyBwc3RhdCA9IHVuZGVmaW5lZDsgfVxuICAgICAgICBpZiAocHN0YXQpIHtcbiAgICAgICAgICAgIGlmIChwc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRQYXJ0aWFsKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpIHtcbiAgICBcbiAgICBjb25zdCBmb3VuZCA9IGF3YWl0IHRoaXMuZmluZFBhcnRpYWwoZm5hbWUpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBwYXJ0aWFsIGZvdW5kIGZvciAke2ZuYW1lfSBpbiAke3V0aWwuaW5zcGVjdCh0aGlzLnBhcnRpYWxEaXJzKX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZmluZFJlbmRlcmVyUGF0aChmbmFtZSk7XG4gICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICBpZiAoZm5hbWUuZW5kc1dpdGgoJy5odG1sJykgfHwgZm5hbWUuZW5kc1dpdGgoJy54aHRtbCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnNwLnJlYWRGaWxlKGZvdW5kLCAndXRmLTgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGVmYXVsdFBhcnRpYWwgbm8gUmVuZGVyZXIgZm91bmQgZm9yICR7Zm5hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwQ29udGVudCA9IGF3YWl0IGZzcC5yZWFkRmlsZShmb3VuZCwgJ3V0Zi04Jyk7XG5cbiAgICAgICAgLy8gU29tZSByZW5kZXJlcnMgKE51bmp1a3MpIHJlcXVpcmUgdGhhdCBtZXRhZGF0YS5jb25maWdcbiAgICAgICAgLy8gcG9pbnQgdG8gdGhlIGNvbmZpZyBvYmplY3QuICBUaGlzIGJsb2NrIG9mIGNvZGVcbiAgICAgICAgLy8gZHVwbGljYXRlcyB0aGUgbWV0YWRhdGEgb2JqZWN0LCB0aGVuIHNldHMgdGhlXG4gICAgICAgIC8vIGNvbmZpZyBmaWVsZCBpbiB0aGUgZHVwbGljYXRlLCBwYXNzaW5nIHRoYXQgdG8gdGhlIHBhcnRpYWwuXG4gICAgICAgIGxldCBtZGF0YSA9IHt9O1xuICAgICAgICBsZXQgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIG1kYXRhW3Byb3BdID0gbWV0YWRhdGFbcHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ET1xuICAgICAgICAvLyBtZGF0YS5jb25maWcgPSBjb25maWc7XG4gICAgICAgIG1kYXRhWydwYXJ0aWFsU3luYyddID0gdGhpcy5wYXJ0aWFsU3luYy5iaW5kKHRoaXMpO1xuICAgICAgICBtZGF0YVsncGFydGlhbCddICAgICA9IHRoaXMucGFydGlhbC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiByZW5kZXJlci5yZW5kZXIoPFJlbmRlcmluZ0NvbnRleHQ+e1xuICAgICAgICAgICAgY29udGVudDogcENvbnRlbnQsXG4gICAgICAgICAgICBtZXRhZGF0YTogbWRhdGEsXG4gICAgICAgICAgICBmc3BhdGg6IGZvdW5kXG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGRlZmF1bHRQYXJ0aWFsU3luYyhmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSB7XG4gICAgXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmZpbmRQYXJ0aWFsU3luYyhmbmFtZSk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHBhcnRpYWwgZm91bmQgZm9yICR7Zm5hbWV9IGluICR7dXRpbC5pbnNwZWN0KHRoaXMucGFydGlhbERpcnMpfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5maW5kUmVuZGVyZXJQYXRoKGZuYW1lKTtcbiAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgIGlmIChmbmFtZS5lbmRzV2l0aCgnLmh0bWwnKSB8fCBmbmFtZS5lbmRzV2l0aCgnLnhodG1sJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmc3AucmVhZEZpbGUoZm91bmQsICd1dGYtOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkZWZhdWx0UGFydGlhbCBubyBSZW5kZXJlciBmb3VuZCBmb3IgJHtmbmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZvdW5kLCAndXRmLTgnKTtcblxuICAgICAgICAvLyBTb21lIHJlbmRlcmVycyAoTnVuanVrcykgcmVxdWlyZSB0aGF0IG1ldGFkYXRhLmNvbmZpZ1xuICAgICAgICAvLyBwb2ludCB0byB0aGUgY29uZmlnIG9iamVjdC4gIFRoaXMgYmxvY2sgb2YgY29kZVxuICAgICAgICAvLyBkdXBsaWNhdGVzIHRoZSBtZXRhZGF0YSBvYmplY3QsIHRoZW4gc2V0cyB0aGVcbiAgICAgICAgLy8gY29uZmlnIGZpZWxkIGluIHRoZSBkdXBsaWNhdGUsIHBhc3NpbmcgdGhhdCB0byB0aGUgcGFydGlhbC5cbiAgICAgICAgbGV0IG1kYXRhID0ge307XG4gICAgICAgIGxldCBwcm9wO1xuXG4gICAgICAgIGZvciAocHJvcCBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgbWRhdGFbcHJvcF0gPSBtZXRhZGF0YVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIG1kYXRhLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgbWRhdGFbJ3BhcnRpYWxTeW5jJ10gPSB0aGlzLnBhcnRpYWxTeW5jLmJpbmQodGhpcyk7XG4gICAgICAgIG1kYXRhWydwYXJ0aWFsJ10gICAgID0gdGhpcy5wYXJ0aWFsLmJpbmQodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLnJlbmRlclN5bmMoPFJlbmRlcmluZ0NvbnRleHQ+e1xuICAgICAgICAgICAgY29udGVudDogcENvbnRlbnQsXG4gICAgICAgICAgICBtZXRhZGF0YTogbWRhdGEsXG4gICAgICAgICAgICBmc3BhdGg6IGZvdW5kXG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19