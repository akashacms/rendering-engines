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
exports.Configuration = exports.RenderingFormat = exports.NunjucksRenderer = exports.MarkdownRenderer = exports.LiquidRenderer = exports.JSONRenderer = exports.HandlebarsRenderer = exports.EJSRenderer = exports.CSSLESSRenderer = exports.AsciidocRenderer = exports.parseFrontmatter = exports.Renderer = void 0;
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
// import { MarkdocRenderer } from './render-markdoc';
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
const runtime_data_validation_1 = require("runtime-data-validation");
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
    set partialDirs(dirz) { __classPrivateFieldSet(this, _Configuration_partialDirs, dirz, "f"); }
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
    set layoutDirs(dirz) { __classPrivateFieldSet(this, _Configuration_layoutDirs, dirz, "f"); }
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
    async partial(fname, 
    /* @IsObject() */ metadata) {
        return __classPrivateFieldGet(this, _Configuration_partial, "f").call(this, fname, metadata);
    }
    partialSync(fname, 
    /* @IsObject() */ metadata) {
        return __classPrivateFieldGet(this, _Configuration_partialSync, "f").call(this, fname, metadata);
    }
}
exports.Configuration = Configuration;
_Configuration_renderers = new WeakMap(), _Configuration_partialDirs = new WeakMap(), _Configuration_layoutDirs = new WeakMap(), _Configuration_finderPartial = new WeakMap(), _Configuration_finderPartialSync = new WeakMap(), _Configuration_finderLayout = new WeakMap(), _Configuration_finderLayoutSync = new WeakMap(), _Configuration_partial = new WeakMap(), _Configuration_partialSync = new WeakMap();
__decorate([
    (0, runtime_data_validation_1.ValidateAccessor)(),
    IsPathArray(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], Configuration.prototype, "partialDirs", null);
__decorate([
    (0, runtime_data_validation_1.ValidateAccessor)(),
    IsPathArray(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], Configuration.prototype, "layoutDirs", null);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Renderer_1.Renderer)
], Configuration.prototype, "findRendererName", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsString()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Renderer_1.Renderer)
], Configuration.prototype, "findRendererPath", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsString()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Renderer_1.Renderer)
], Configuration.prototype, "findRenderer", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsString()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Configuration.prototype, "partial", null);
__decorate([
    runtime_data_validation_1.ValidateParams,
    __param(0, IsString()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], Configuration.prototype, "partialSync", null);
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
        throw new Error(`No partial found for ${fname} in ${util.inspect(this.partialDirs)}`);
    }
    const renderer = this.findRendererPath(fname);
    if (!renderer) {
        if (fname.endsWith('.html') || fname.endsWith('.xhtml')) {
            return fs.readFileSync(found, 'utf-8');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsMkNBQTZCO0FBQzdCLDJDQUE2QjtBQUM3QiwyQkFBcUM7QUFDckMsdUNBQXlCO0FBRXpCLHlDQUFzQztBQUV0Qyx1REFBcUQ7QUFDckQscURBQW1EO0FBQ25ELDZDQUEyQztBQUMzQywyREFBeUQ7QUFDekQsK0NBQTZDO0FBQzdDLG1EQUFpRDtBQUNqRCwyQ0FBK0M7QUFDL0Msc0RBQXNEO0FBQ3RELHVEQUFxRDtBQUVyRCx1Q0FBd0Q7QUFBL0Msb0dBQUEsUUFBUSxPQUFBO0FBQUUsNEdBQUEsZ0JBQWdCLE9BQUE7QUFFbkMscURBQXFEO0FBQTVDLG1IQUFBLGdCQUFnQixPQUFBO0FBQ3pCLG1EQUFtRDtBQUExQyxpSEFBQSxlQUFlLE9BQUE7QUFDeEIsMkNBQTJDO0FBQWxDLHlHQUFBLFdBQVcsT0FBQTtBQUNwQix5REFBeUQ7QUFBaEQsdUhBQUEsa0JBQWtCLE9BQUE7QUFDM0IsNkNBQTZDO0FBQXBDLDJHQUFBLFlBQVksT0FBQTtBQUNyQixpREFBaUQ7QUFBeEMsK0dBQUEsY0FBYyxPQUFBO0FBQ3ZCLHlDQUErQztBQUF0Qyw2R0FBQSxnQkFBZ0IsT0FBQTtBQUN6QixzREFBc0Q7QUFDdEQscURBQXFEO0FBQTVDLG1IQUFBLGdCQUFnQixPQUFBO0FBRXpCLHFFQUlpQztBQW1DakMsSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3ZCLGdDQUFhLENBQUE7SUFDYiw4QkFBWSxDQUFBO0lBQ1osZ0NBQWEsQ0FBQTtJQUNiLDhCQUFZLENBQUE7SUFDWiw0QkFBVyxDQUFBO0FBQ2YsQ0FBQyxFQU5XLGVBQWUsK0JBQWYsZUFBZSxRQU0xQjtBQUFBLENBQUM7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Q0FBQztJQUNMLENBQUM7U0FBTSxDQUFDO1FBQ0osTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFakQsd0RBQXdEO1FBQ3hELGtEQUFrRDtRQUNsRCxnREFBZ0Q7UUFDaEQsOERBQThEO1FBQzlELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDO1FBRVQsS0FBSyxJQUFJLElBQUksUUFBUSxFQUFFLENBQUM7WUFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsT0FBTztRQUNQLHlCQUF5QjtRQUN6QixLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBbUI7WUFDekMsT0FBTyxFQUFFLFFBQVE7WUFDakIsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7SUFFUCxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDIyLTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHByb21pc2VzIGFzIGZzcCB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7IEhUTUxSZW5kZXJlciB9IGZyb20gJy4vSFRNTFJlbmRlcmVyJztcbmltcG9ydCB7IEFzY2lpZG9jUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1hc2NpaWRvYyc7XG5pbXBvcnQgeyBDU1NMRVNTUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1jc3NsZXNzJztcbmltcG9ydCB7IEVKU1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItZWpzJztcbmltcG9ydCB7IEhhbmRsZWJhcnNSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWhhbmRsZWJhcnMnO1xuaW1wb3J0IHsgSlNPTlJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItanNvbic7XG5pbXBvcnQgeyBMaXF1aWRSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWxpcXVpZCc7XG5pbXBvcnQgeyBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbWQnO1xuLy8gaW1wb3J0IHsgTWFya2RvY1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbWFya2RvYyc7XG5pbXBvcnQgeyBOdW5qdWNrc1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbnVuanVja3MnO1xuXG5leHBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXInO1xuXG5leHBvcnQgeyBBc2NpaWRvY1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItYXNjaWlkb2MnO1xuZXhwb3J0IHsgQ1NTTEVTU1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItY3NzbGVzcyc7XG5leHBvcnQgeyBFSlNSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWVqcyc7XG5leHBvcnQgeyBIYW5kbGViYXJzUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1oYW5kbGViYXJzJztcbmV4cG9ydCB7IEpTT05SZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWpzb24nO1xuZXhwb3J0IHsgTGlxdWlkUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1saXF1aWQnO1xuZXhwb3J0IHsgTWFya2Rvd25SZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLW1kJztcbi8vIGV4cG9ydCB7IE1hcmtkb2NSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLW1hcmtkb2MnO1xuZXhwb3J0IHsgTnVuanVja3NSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLW51bmp1Y2tzJztcblxuaW1wb3J0IHtcbiAgICBJc0ludFJhbmdlLCBJc0ludCwgSXNGbG9hdFJhbmdlLCBJc0Zsb2F0LFxuICAgIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcixcbiAgICBWYWxpZGF0ZVBhcmFtcywgVmFsaWRhdGVBY2Nlc3Nvcixcbn0gZnJvbSAncnVudGltZS1kYXRhLXZhbGlkYXRpb24nO1xuXG5cbi8vIFRPRE8gLURPTkUgcmVxdWlyZSBhIGNvbnRhaW5lciBjbGFzcyB0byBob2xkIHRoZSBsaXN0IG9mIHJlbmRlcmVyc1xuLy8gICAgICAtRE9ORSBhbGxvdyBSZW5kZXJlcnMgdG8gYmUgYWRkZWQgYnkgb3RoZXIgY29kZVxuLy8gICAgICAtIGNvbnRhaW4gY29uZmlndXJhdGlvbiBmb3IgdGhpbmdzXG4vL1xuLy8gQ29uZmlndXJhdGlvbiAtIGZ1bmN0aW9ucyB0byBmaW5kIGFzc2V0cy9kb2N1bWVudHMvcGFydGlhbHMvbGF5b3V0c1xuLy8gICAgICAgICAgICAgICAtIGZ1bmN0aW9uIHRvIHdyaXRlIHJlbmRlcmVkIGZpbGVcbi8vICAgICAgICAgICAgICAgLSBmdW5jdGlvbnMgLSBwYXJ0aWFsIC0gcGFydGlhbFN5bmNcbi8vXG4vLyBNYWhhZnVuYyBmb3IgPHBhcnRpYWw+XG5cbmV4cG9ydCB0eXBlIENvbmZpZ3VyYXRpb25QYXJhbXMgPSB7XG4gICAgcGFydGlhbERpcnM/OiBBcnJheTxzdHJpbmc+O1xuICAgIGZpbmRQYXJ0aWFsPzogKGZuKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgZmluZFBhcnRpYWxTeW5jPzogKGZuKSA9PiBzdHJpbmc7XG4gICAgbGF5b3V0RGlycz86IEFycmF5PHN0cmluZz47XG4gICAgZmluZExheW91dD86IChmbikgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgIGZpbmRMYXlvdXRTeW5jPzogKGZuKSA9PiBzdHJpbmc7XG5cbiAgICBwYXJ0aWFsPzogKGZuLCBtZXRhZGF0YSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgIHBhcnRpYWxTeW5jPzogKGZuLCBtZXRhZGF0YSkgPT4gc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUmVuZGVyaW5nQ29udGV4dCA9IHtcbiAgICBmc3BhdGg/OiBzdHJpbmc7ICAgLy8gUGF0aG5hbWUgdGhhdCBjYW4gYmUgZ2l2ZW4gdG8gdGVtcGxhdGUgZW5naW5lcyBmb3IgZXJyb3IgbWVzc2FnZXNcbiAgICBjb250ZW50OiBzdHJpbmc7ICAgLy8gQ29udGVudCB0byByZW5kZXJcbiAgICBib2R5Pzogc3RyaW5nOyAgICAgLy8gQ29udGVudCBib2R5IGFmdGVyIHBhcnNpbmcgZnJvbnRtYXR0ZXJcblxuICAgIHJlbmRlclRvPzogc3RyaW5nOyAgLy8gUGF0aG5hbWUgZm9yIHJlbmRlcmluZyBvdXRwdXRcblxuICAgIG1ldGFkYXRhOiBhbnk7ICAvLyBEYXRhIHRvIGJlIHVzZWQgZm9yIHNhdGlzZnlpbmcgdmFyaWFibGVzIGluIHRlbXBsYXRlc1xufTtcblxuZXhwb3J0IGVudW0gUmVuZGVyaW5nRm9ybWF0IHtcbiAgICBIVE1MID0gJ0hUTUwnLFxuICAgIFBIUCAgPSAnUEhQJyxcbiAgICBKU09OID0gJ0pTT04nLFxuICAgIENTUyAgPSAnQ1NTJyxcbiAgICBKUyAgID0gJ0pTJ1xufTtcblxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuXG4gICAgI3JlbmRlcmVycztcbiAgICAjcGFydGlhbERpcnM7XG4gICAgI2xheW91dERpcnM7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM/OiBDb25maWd1cmF0aW9uUGFyYW1zKSB7XG4gICAgICAgIHRoaXMuI3JlbmRlcmVycyA9IFtdO1xuICAgICAgICB0aGlzLiNwYXJ0aWFsRGlycyA9IFtdO1xuICAgICAgICB0aGlzLiNsYXlvdXREaXJzID0gW107XG5cbiAgICAgICAgLypcbiAgICAgICAgICogSXMgdGhpcyB0aGUgYmVzdCBwbGFjZSBmb3IgdGhpcz8gIEl0IGlzIG5lY2Vzc2FyeSB0b1xuICAgICAgICAgKiBjYWxsIHRoaXMgZnVuY3Rpb24gc29tZXdoZXJlLiAgVGhlIG5hdHVyZSBvZiB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAqIGlzIHRoYXQgaXQgY2FuIGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIG5vIGltcGFjdC4gIFxuICAgICAgICAgKiBCeSBiZWluZyBsb2NhdGVkIGhlcmUsIGl0IHdpbGwgYWx3YXlzIGJlIGNhbGxlZCBieSB0aGVcbiAgICAgICAgICogdGltZSBhbnkgQ29uZmlndXJhdGlvbiBpcyBnZW5lcmF0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQnVpbHRJblJlbmRlcmVycygpO1xuXG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnBhcnRpYWxEaXJzKSB0aGlzLiNwYXJ0aWFsRGlycyA9IHBhcmFtcy5wYXJ0aWFsRGlycztcbiAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubGF5b3V0RGlycykgIHRoaXMuI2xheW91dERpcnMgID0gcGFyYW1zLmxheW91dERpcnM7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYFJlbmRlcmVycyBDb25maWd1cmF0aW9uIGNvbnN0cnVjdG9yIGxheW91dERpcnMgYCwgdXRpbC5pbnNwZWN0KHRoaXMuI2xheW91dERpcnMpKTtcbiAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbCA9IChwYXJhbXMgJiYgcGFyYW1zLmZpbmRQYXJ0aWFsKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5maW5kUGFydGlhbFxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRGaW5kUGFydGlhbC5iaW5kKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbFN5bmMgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kUGFydGlhbFN5bmMpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLmZpbmRQYXJ0aWFsU3luY1xuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRGaW5kUGFydGlhbFN5bmMuYmluZCh0aGlzKTtcblxuXG4gICAgICAgIHRoaXMuI2ZpbmRlckxheW91dCA9IChwYXJhbXMgJiYgcGFyYW1zLmZpbmRMYXlvdXQpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLmZpbmRMYXlvdXRcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZExheW91dC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuI2ZpbmRlckxheW91dFN5bmMgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kTGF5b3V0U3luYylcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMuZmluZExheW91dFN5bmNcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZExheW91dFN5bmMuYmluZCh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuI3BhcnRpYWwgPSAocGFyYW1zICYmIHBhcmFtcy5wYXJ0aWFsKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5wYXJ0aWFsXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdFBhcnRpYWwuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLiNwYXJ0aWFsU3luYyA9IChwYXJhbXMgJiYgcGFyYW1zLnBhcnRpYWxTeW5jKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5wYXJ0aWFsU3luY1xuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRQYXJ0aWFsU3luYy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGFic29sdXRlIHBhdGhzIHRvIGRpcmVjdG9yaWVzIGNvbnRhaW5pbmdcbiAgICAgKiBwYXJ0aWFsIHRlbXBsYXRlcy5cbiAgICAgKi9cbiAgICBAVmFsaWRhdGVBY2Nlc3NvcjxBcnJheTxzdHJpbmc+PigpXG4gICAgQElzUGF0aEFycmF5KClcbiAgICBzZXQgcGFydGlhbERpcnMoZGlyejogQXJyYXk8c3RyaW5nPikgeyB0aGlzLiNwYXJ0aWFsRGlycyA9IGRpcno7IH1cbiAgICBnZXQgcGFydGlhbERpcnMoKSAvKjogQXJyYXk8c3RyaW5nPiAqLyB7IHJldHVybiB0aGlzLiNwYXJ0aWFsRGlyczsgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGFic29sdXRlIHBhdGhuYW1lIGZvciBhIGRpcmVjdG9yeSB0byBmaW5kIHBhcnRpYWwgdGVtcGxhdGVzLlxuICAgICAqIEBwYXJhbSBkaXIgXG4gICAgICovXG4gICAgLy8gQFZhbGlkYXRlUGFyYW1zXG4gICAgYWRkUGFydGlhbERpcigvKiBASXNBYnNvbHV0ZVBhdGgoKSAqLyBkaXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLiNwYXJ0aWFsRGlycy5wdXNoKGRpcik7XG4gICAgfVxuXG4gICAgI2ZpbmRlclBhcnRpYWw6IChmbnBhcnRpYWwpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICAjZmluZGVyUGFydGlhbFN5bmM6IChmbnBhcnRpYWwpID0+IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgZnVuY3Rpb24gZm9yIGZpbmRpbmcgcGFydGlhbCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgc2V0IHBhcnRpYWxGaW5kZXIoZmluZGVyOiAoZm5wYXJ0aWFsKSA9PiBQcm9taXNlPHN0cmluZz4pIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJQYXJ0aWFsID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmdW5jdGlvbiBmb3IgZmluZGluZyBwYXJ0aWFsIHRlbXBsYXRlcy5cbiAgICAgKi9cbiAgICBzZXQgcGFydGlhbEZpbmRlclN5bmMoZmluZGVyOiAoZm5wYXJ0aWFsKSA9PiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJQYXJ0aWFsU3luYyA9IGZpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGZpbmRQYXJ0aWFsKGZucGFydGlhbDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2ZpbmRlclBhcnRpYWwoZm5wYXJ0aWFsKTtcbiAgICB9XG5cbiAgICBmaW5kUGFydGlhbFN5bmMoZm5wYXJ0aWFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4jZmluZGVyUGFydGlhbFN5bmMoZm5wYXJ0aWFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBhYnNvbHV0ZSBwYXRocyB0byBkaXJlY3RvcmllcyBjb250YWluaW5nXG4gICAgICogbGF5b3V0IHRlbXBsYXRlcy5cbiAgICAgKi9cbiAgICBAVmFsaWRhdGVBY2Nlc3NvcjxBcnJheTxzdHJpbmc+PigpXG4gICAgQElzUGF0aEFycmF5KClcbiAgICBzZXQgbGF5b3V0RGlycyhkaXJ6OiBBcnJheTxzdHJpbmc+KSB7IHRoaXMuI2xheW91dERpcnMgPSBkaXJ6OyB9XG4gICAgZ2V0IGxheW91dERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLiNsYXlvdXREaXJzOyB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gYWJzb2x1dGUgcGF0aG5hbWUgZm9yIGEgZGlyZWN0b3J5IHRvIGZpbmQgbGF5b3V0IHRlbXBsYXRlcy5cbiAgICAgKiBAcGFyYW0gZGlyIFxuICAgICAqL1xuICAgIC8vIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGFkZExheW91dERpcigvKiBASXNBYnNvbHV0ZVBhdGgoKSAqLyBkaXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLiNsYXlvdXREaXJzLnB1c2goZGlyKTtcbiAgICB9XG5cbiAgICAjZmluZGVyTGF5b3V0OiAoZm5sYXlvdXQpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICAjZmluZGVyTGF5b3V0U3luYzogKGZubGF5b3V0KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBhIGZ1bmN0aW9uIGZvciBmaW5kaW5nIGxheW91dCB0ZW1wbGF0ZXNcbiAgICAgKiBAcGFyYW0gZmluZGVyXG4gICAgICovXG4gICAgc2V0IGxheW91dEZpbmRlcihmaW5kZXI6IChmbmxheW91dCkgPT4gUHJvbWlzZTxzdHJpbmc+KSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyTGF5b3V0ID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmdW5jdGlvbiBmb3IgZmluZGluZyBsYXlvdXQgdGVtcGxhdGVzXG4gICAgICogQHBhcmFtIGZpbmRlclxuICAgICAqL1xuICAgIHNldCBsYXlvdXRGaW5kZXJTeW5jKGZpbmRlcjogKGZubGF5b3V0KSA9PiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXRTeW5jID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIGxheW91dCB0ZW1wbGF0ZSwgc3VwcG9ydGluZyBhc3luY2hyb25vdXMgZXhlY3V0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIGZubGF5b3V0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGFzeW5jIGZpbmRMYXlvdXQoZm5sYXlvdXQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiNmaW5kZXJMYXlvdXQoZm5sYXlvdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBsYXlvdXQgdGVtcGxhdGUsIHN1cHBvcnRpbmcgc3luY2hyb25vdXMgZXhlY3V0aW9uXG4gICAgICogXG4gICAgICogQHBhcmFtIGZubGF5b3V0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGZpbmRMYXlvdXRTeW5jKGZubGF5b3V0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4jZmluZGVyTGF5b3V0U3luYyhmbmxheW91dCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8gUmVuZGVyZXJzXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGxpc3Qgb2YgcmVnaXN0ZXJlZCByZW5kZXJlcnNcbiAgICAgKi9cbiAgICBnZXQgcmVuZGVyZXJzKCk6IEFycmF5PFJlbmRlcmVyPiB7IHJldHVybiB0aGlzLiNyZW5kZXJlcnM7IH1cblxuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIHJlZ2lzdGVyUmVuZGVyZXIoQElzUmVuZGVyZXIoKSByZW5kZXJlcjogUmVuZGVyZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEocmVuZGVyZXIgaW5zdGFuY2VvZiBSZW5kZXJlcikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdCBBIFJlbmRlcmVyICcrIHV0aWwuaW5zcGVjdChyZW5kZXJlcikpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgYSBSZW5kZXJlciAke3V0aWwuaW5zcGVjdChyZW5kZXJlcil9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmZpbmRSZW5kZXJlck5hbWUocmVuZGVyZXIubmFtZSkpIHtcbiAgICAgICAgICAgIHJlbmRlcmVyLmNvbmZpZyA9IHRoaXM7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcmVnaXN0ZXJSZW5kZXJlciBgLCByZW5kZXJlcik7XG4gICAgICAgICAgICB0aGlzLiNyZW5kZXJlcnMucHVzaChyZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBhbiBhcHBsaWNhdGlvbiB0byBvdmVycmlkZSBvbmUgb2YgdGhlIGJ1aWx0LWluIHJlbmRlcmVyc1xuICAgICAqIHRoYXQgYXJlIGluaXRpYWxpemVkIGJlbG93LiAgVGhlIGluc3BpcmF0aW9uIGlzIGVwdWJ0b29scyB0aGF0XG4gICAgICogbXVzdCB3cml0ZSBIVE1MIGZpbGVzIHdpdGggYW4gLnhodG1sIGV4dGVuc2lvbi4gIFRoZXJlZm9yZSBpdFxuICAgICAqIGNhbiBzdWJjbGFzcyBFSlNSZW5kZXJlciBldGMgd2l0aCBpbXBsZW1lbnRhdGlvbnMgdGhhdCBmb3JjZSB0aGVcbiAgICAgKiBmaWxlIG5hbWUgdG8gYmUgLnhodG1sLiAgV2UncmUgbm90IGNoZWNraW5nIGlmIHRoZSByZW5kZXJlciBuYW1lXG4gICAgICogaXMgYWxyZWFkeSB0aGVyZSBpbiBjYXNlIGVwdWJ0b29scyBtdXN0IHVzZSB0aGUgc2FtZSByZW5kZXJlciBuYW1lLlxuICAgICAqL1xuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIHJlZ2lzdGVyT3ZlcnJpZGVSZW5kZXJlcihASXNSZW5kZXJlcigpIHJlbmRlcmVyOiBSZW5kZXJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIShyZW5kZXJlciBpbnN0YW5jZW9mIFJlbmRlcmVyKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm90IEEgUmVuZGVyZXIgJysgdXRpbC5pbnNwZWN0KHJlbmRlcmVyKSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBhIFJlbmRlcmVyICR7dXRpbC5pbnNwZWN0KHJlbmRlcmVyKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJlci5jb25maWcgPSB0aGlzO1xuICAgICAgICB0aGlzLiNyZW5kZXJlcnMudW5zaGlmdChyZW5kZXJlcik7XG4gICAgfVxuXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgZmluZFJlbmRlcmVyTmFtZShASXNTdHJpbmcoKSBuYW1lOiBzdHJpbmcpOiBSZW5kZXJlciB7XG4gICAgICAgIGZvciAodmFyIHIgb2YgdGhpcy4jcmVuZGVyZXJzKSB7XG4gICAgICAgICAgICBpZiAoci5uYW1lID09PSBuYW1lKSByZXR1cm4gcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGZpbmRSZW5kZXJlclBhdGgoQElzU3RyaW5nKCkgX3BhdGg6IHN0cmluZyk6IFJlbmRlcmVyIHtcbiAgICAgICAgLy8gbG9nKGBmaW5kUmVuZGVyZXJQYXRoICR7X3BhdGh9YCk7XG4gICAgICAgIGZvciAodmFyIHIgb2YgdGhpcy4jcmVuZGVyZXJzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZmluZFJlbmRlcmVyUGF0aCAke19wYXRofSAke3IubmFtZX1gKVxuICAgICAgICAgICAgaWYgKHIubWF0Y2goX3BhdGgpKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01BVENIJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGZpbmRSZW5kZXJlclBhdGggTk8gUkVOREVSRVIgZm9yICR7X3BhdGh9YCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJCdWlsdEluUmVuZGVyZXJzKCkge1xuICAgICAgICAvLyBSZWdpc3RlciBidWlsdC1pbiByZW5kZXJlcnNcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBNYXJrZG93blJlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IEFzY2lpZG9jUmVuZGVyZXIoKSk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgTWFya2RvY1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IEVKU1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IExpcXVpZFJlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IE51bmp1Y2tzUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgSGFuZGxlYmFyc1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IENTU0xFU1NSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBKU09OUmVuZGVyZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIFJlbmRlcmVyIGJ5IGl0cyBleHRlbnNpb24uXG4gICAgICovXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgZmluZFJlbmRlcmVyKEBJc1N0cmluZygpIG5hbWU6IHN0cmluZyk6IFJlbmRlcmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFJlbmRlcmVyTmFtZShuYW1lKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLyBGaW5kIExheW91dHMgb3IgUGFydGlhbHNcblxuICAgICNwYXJ0aWFsOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgICNwYXJ0aWFsU3luYzogKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpID0+IHN0cmluZztcblxuICAgIHNldCBwYXJ0aWFsRnVuYyhwZnVuYzogKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpID0+IFByb21pc2U8c3RyaW5nPikge1xuICAgICAgICB0aGlzLiNwYXJ0aWFsID0gcGZ1bmM7XG4gICAgfVxuXG4gICAgc2V0IHBhcnRpYWxGdW5jU3luYyhwZnVuYzogKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpID0+IHN0cmluZykge1xuICAgICAgICB0aGlzLiNwYXJ0aWFsU3luYyA9IHBmdW5jO1xuICAgIH1cblxuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGFzeW5jIHBhcnRpYWwoXG4gICAgICAgIEBJc1N0cmluZygpIGZuYW1lOiBzdHJpbmcsXG4gICAgICAgIC8qIEBJc09iamVjdCgpICovIG1ldGFkYXRhOiBhbnkpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLiNwYXJ0aWFsKGZuYW1lLCBtZXRhZGF0YSk7XG4gICAgfVxuXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgcGFydGlhbFN5bmMoXG4gICAgICAgIEBJc1N0cmluZygpIGZuYW1lOiBzdHJpbmcsXG4gICAgICAgIC8qIEBJc09iamVjdCgpICovIG1ldGFkYXRhOiBhbnkpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLiNwYXJ0aWFsU3luYyhmbmFtZSwgbWV0YWRhdGEpO1xuICAgIH1cblxufVxuXG4vLyBDdXN0b20gdmFsaWRhdG9yc1xuXG5mdW5jdGlvbiBpc1N0cmluZyhzOiBzdHJpbmcpIHtcbiAgICBpZiAoIXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoISh0eXBlb2YgcyA9PT0gJ3N0cmluZycpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzU3RyaW5nKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVZhbGlkYXRpb25EZWNvcmF0b3IoXG4gICAgICAgIGlzU3RyaW5nLFxuICAgICAgICBgVmFsdWUgOnZhbHVlOiBpcyBub3QgYSBzdHJpbmdgKTtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoczogYW55KSB7XG4gICAgaWYgKCFzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCEodHlwZW9mIHMgPT09ICdvYmplY3QnKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBJc09iamVjdCgpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yKFxuICAgICAgICBpc09iamVjdCxcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGFuIG9iamVjdGApO1xufVxuXG5cbmZ1bmN0aW9uIGlzUmVuZGVyZXIocikge1xuICAgIGlmICghcikgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghKHR5cGVvZiByID09PSAnb2JqZWN0JykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIShyIGluc3RhbmNlb2YgUmVuZGVyZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcihcbiAgICAgICAgaXNSZW5kZXJlcixcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGEgUmVuZGVyZXJgKTtcbn1cblxuZnVuY3Rpb24gaXNQYXRoQXJyYXkoYXJ5KSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFyeSkpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHAgb2YgYXJ5KSB7XG4gICAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHApKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBJc1BhdGhBcnJheSgpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yKFxuICAgICAgICBpc1BhdGhBcnJheSxcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGEgUGF0aCBBcnJheWApO1xufVxuXG5mdW5jdGlvbiBpc0Fic29sdXRlUGF0aChwKSB7XG4gICAgaWYgKCEodHlwZW9mIHAgPT09ICdzdHJpbmcnKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHApKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzQWJzb2x1dGVQYXRoKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVZhbGlkYXRpb25EZWNvcmF0b3IoXG4gICAgICAgIGlzQWJzb2x1dGVQYXRoLFxuICAgICAgICBgVmFsdWUgOnZhbHVlOiBpcyBub3QgYW4gQWJzb2x1dGUgUGF0aGApO1xufVxuXG4vLyBEZWZhdWx0IFBhcnRpYWwvTGF5b3V0IGZpbmRlciBmdW5jdGlvbnNcblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdEZpbmRMYXlvdXQoZm5sYXlvdXQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGZvciAoY29uc3QgbGRpciBvZiB0aGlzLmxheW91dERpcnMpIHtcbiAgICAgICAgY29uc3QgbHBhdGggPSBwYXRoLmpvaW4obGRpciwgZm5sYXlvdXQpO1xuICAgICAgICBsZXQgbHN0YXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsc3RhdCA9IGF3YWl0IGZzcC5zdGF0KGxwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IGxzdGF0ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIGlmIChsc3RhdCkge1xuICAgICAgICAgICAgaWYgKGxzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRGaW5kTGF5b3V0U3luYyhmbmxheW91dCk6IHN0cmluZyB7XG4gICAgZm9yIChjb25zdCBsZGlyIG9mIHRoaXMubGF5b3V0RGlycykge1xuICAgICAgICBjb25zdCBscGF0aCA9IHBhdGguam9pbihsZGlyLCBmbmxheW91dCk7XG4gICAgICAgIGxldCBsc3RhdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxzdGF0ID0gZnMuc3RhdFN5bmMobHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgbHN0YXQgPSB1bmRlZmluZWQ7IH1cbiAgICAgICAgaWYgKGxzdGF0KSB7XG4gICAgICAgICAgICBpZiAobHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdEZpbmRQYXJ0aWFsKGZucGFydGlhbCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gY29uc29sZS5sb2coYGRlZmF1bHRGaW5kUGFydGlhbCAke2ZucGFydGlhbH1gLCB0aGlzLnBhcnRpYWxEaXJzKTtcbiAgICBmb3IgKGNvbnN0IHBkaXIgb2YgdGhpcy5wYXJ0aWFsRGlycykge1xuICAgICAgICBjb25zdCBwcGF0aCA9IHBhdGguam9pbihwZGlyLCBmbnBhcnRpYWwpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGVmYXVsdEZpbmRQYXJ0aWFsIGRvZXMgJHtwcGF0aH0gZXhpc3QgZm9yICR7Zm5wYXJ0aWFsfT9gKTtcbiAgICAgICAgbGV0IHBzdGF0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHN0YXQgPSBhd2FpdCBmc3Auc3RhdChwcGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoYHN0YXQgZm9yICR7cHBhdGh9IGZhaWxlZCBgLCBlcnIpO1xuICAgICAgICAgICAgcHN0YXQgPSB1bmRlZmluZWQ7IFxuICAgICAgICB9XG4gICAgICAgIGlmIChwc3RhdCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGRlZmF1bHRGaW5kUGFydGlhbCAke3BwYXRofSBzdGF0c2AsIHBzdGF0KTtcbiAgICAgICAgICAgIGlmIChwc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBkZWZhdWx0RmluZFBhcnRpYWwgJHtwcGF0aH0gZXhpc3RzYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRGaW5kUGFydGlhbFN5bmMoZm5wYXJ0aWFsKTogc3RyaW5nIHtcbiAgICBmb3IgKGNvbnN0IHBkaXIgb2YgdGhpcy5wYXJ0aWFsRGlycykge1xuICAgICAgICBjb25zdCBwcGF0aCA9IHBhdGguam9pbihwZGlyLCBmbnBhcnRpYWwpO1xuICAgICAgICBsZXQgcHN0YXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwc3RhdCA9IGZzLnN0YXRTeW5jKHBwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IHBzdGF0ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIGlmIChwc3RhdCkge1xuICAgICAgICAgICAgaWYgKHBzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdFBhcnRpYWwoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkge1xuICAgIFxuICAgIGNvbnN0IGZvdW5kID0gYXdhaXQgdGhpcy5maW5kUGFydGlhbChmbmFtZSk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHBhcnRpYWwgZm91bmQgZm9yICR7Zm5hbWV9IGluICR7dXRpbC5pbnNwZWN0KHRoaXMucGFydGlhbERpcnMpfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5maW5kUmVuZGVyZXJQYXRoKGZuYW1lKTtcbiAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgIGlmIChmbmFtZS5lbmRzV2l0aCgnLmh0bWwnKSB8fCBmbmFtZS5lbmRzV2l0aCgnLnhodG1sJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmc3AucmVhZEZpbGUoZm91bmQsICd1dGYtOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkZWZhdWx0UGFydGlhbCBubyBSZW5kZXJlciBmb3VuZCBmb3IgJHtmbmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gYXdhaXQgZnNwLnJlYWRGaWxlKGZvdW5kLCAndXRmLTgnKTtcblxuICAgICAgICAvLyBTb21lIHJlbmRlcmVycyAoTnVuanVrcykgcmVxdWlyZSB0aGF0IG1ldGFkYXRhLmNvbmZpZ1xuICAgICAgICAvLyBwb2ludCB0byB0aGUgY29uZmlnIG9iamVjdC4gIFRoaXMgYmxvY2sgb2YgY29kZVxuICAgICAgICAvLyBkdXBsaWNhdGVzIHRoZSBtZXRhZGF0YSBvYmplY3QsIHRoZW4gc2V0cyB0aGVcbiAgICAgICAgLy8gY29uZmlnIGZpZWxkIGluIHRoZSBkdXBsaWNhdGUsIHBhc3NpbmcgdGhhdCB0byB0aGUgcGFydGlhbC5cbiAgICAgICAgbGV0IG1kYXRhID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgbWRhdGFbcHJvcF0gPSBtZXRhZGF0YVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIG1kYXRhLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgbWRhdGFbJ3BhcnRpYWxTeW5jJ10gPSB0aGlzLnBhcnRpYWxTeW5jLmJpbmQodGhpcyk7XG4gICAgICAgIG1kYXRhWydwYXJ0aWFsJ10gICAgID0gdGhpcy5wYXJ0aWFsLmJpbmQodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLnJlbmRlcig8UmVuZGVyaW5nQ29udGV4dD57XG4gICAgICAgICAgICBjb250ZW50OiBwQ29udGVudCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiBtZGF0YSxcbiAgICAgICAgICAgIGZzcGF0aDogZm91bmRcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZGVmYXVsdFBhcnRpYWxTeW5jKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpIHtcbiAgICBcbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuZmluZFBhcnRpYWxTeW5jKGZuYW1lKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcGFydGlhbCBmb3VuZCBmb3IgJHtmbmFtZX0gaW4gJHt1dGlsLmluc3BlY3QodGhpcy5wYXJ0aWFsRGlycyl9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmZpbmRSZW5kZXJlclBhdGgoZm5hbWUpO1xuICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgaWYgKGZuYW1lLmVuZHNXaXRoKCcuaHRtbCcpIHx8IGZuYW1lLmVuZHNXaXRoKCcueGh0bWwnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhmb3VuZCwgJ3V0Zi04Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRlZmF1bHRQYXJ0aWFsIG5vIFJlbmRlcmVyIGZvdW5kIGZvciAke2ZuYW1lfWApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcENvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZm91bmQsICd1dGYtOCcpO1xuXG4gICAgICAgIC8vIFNvbWUgcmVuZGVyZXJzIChOdW5qdWtzKSByZXF1aXJlIHRoYXQgbWV0YWRhdGEuY29uZmlnXG4gICAgICAgIC8vIHBvaW50IHRvIHRoZSBjb25maWcgb2JqZWN0LiAgVGhpcyBibG9jayBvZiBjb2RlXG4gICAgICAgIC8vIGR1cGxpY2F0ZXMgdGhlIG1ldGFkYXRhIG9iamVjdCwgdGhlbiBzZXRzIHRoZVxuICAgICAgICAvLyBjb25maWcgZmllbGQgaW4gdGhlIGR1cGxpY2F0ZSwgcGFzc2luZyB0aGF0IHRvIHRoZSBwYXJ0aWFsLlxuICAgICAgICBsZXQgbWRhdGEgPSB7fTtcbiAgICAgICAgbGV0IHByb3A7XG5cbiAgICAgICAgZm9yIChwcm9wIGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICBtZGF0YVtwcm9wXSA9IG1ldGFkYXRhW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gbWRhdGEuY29uZmlnID0gY29uZmlnO1xuICAgICAgICBtZGF0YVsncGFydGlhbFN5bmMnXSA9IHRoaXMucGFydGlhbFN5bmMuYmluZCh0aGlzKTtcbiAgICAgICAgbWRhdGFbJ3BhcnRpYWwnXSAgICAgPSB0aGlzLnBhcnRpYWwuYmluZCh0aGlzKTtcblxuICAgICAgICByZXR1cm4gcmVuZGVyZXIucmVuZGVyU3luYyg8UmVuZGVyaW5nQ29udGV4dD57XG4gICAgICAgICAgICBjb250ZW50OiBwQ29udGVudCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiBtZGF0YSxcbiAgICAgICAgICAgIGZzcGF0aDogZm91bmRcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=