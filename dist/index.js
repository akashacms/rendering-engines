"use strict";
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
exports.Configuration = exports.HTMLRenderer = exports.Renderer = void 0;
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
var HTMLRenderer_1 = require("./HTMLRenderer");
Object.defineProperty(exports, "HTMLRenderer", { enumerable: true, get: function () { return HTMLRenderer_1.HTMLRenderer; } });
const runtime_data_validation_1 = require("runtime-data-validation");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBNkI7QUFDN0IsMkNBQTZCO0FBQzdCLDJCQUFxQztBQUNyQyx1Q0FBeUI7QUFFekIseUNBQXNDO0FBRXRDLHVEQUFxRDtBQUNyRCxxREFBbUQ7QUFDbkQsNkNBQTJDO0FBQzNDLDJEQUF5RDtBQUN6RCwrQ0FBNkM7QUFDN0MsbURBQWlEO0FBQ2pELDJDQUErQztBQUMvQyx1REFBcUQ7QUFFckQsdUNBQXNDO0FBQTdCLG9HQUFBLFFBQVEsT0FBQTtBQUNqQiwrQ0FBOEM7QUFBckMsNEdBQUEsWUFBWSxPQUFBO0FBRXJCLHFFQUlpQztBQW9DakMsTUFBYSxhQUFhO0lBTXRCLFlBQVksTUFBNEI7UUFKeEMsMkNBQVc7UUFDWCw2Q0FBYTtRQUNiLDRDQUFZO1FBK0RaLCtDQUErQztRQUMvQyxtREFBMEM7UUE4QzFDLDhDQUE2QztRQUM3QyxrREFBd0M7UUF1R3hDLGlDQUFpQztRQUVqQyx5Q0FBNEQ7UUFDNUQsNkNBQXVEO1FBdE5uRCx1QkFBQSxJQUFJLDRCQUFjLEVBQUUsTUFBQSxDQUFDO1FBQ3JCLHVCQUFBLElBQUksOEJBQWdCLEVBQUUsTUFBQSxDQUFDO1FBQ3ZCLHVCQUFBLElBQUksNkJBQWUsRUFBRSxNQUFBLENBQUM7UUFFdEI7Ozs7OztXQU1HO1FBQ0gsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVc7WUFBRSx1QkFBQSxJQUFJLDhCQUFnQixNQUFNLENBQUMsV0FBVyxNQUFBLENBQUM7UUFDekUsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVU7WUFBRyx1QkFBQSxJQUFJLDZCQUFnQixNQUFNLENBQUMsVUFBVSxNQUFBLENBQUM7UUFFeEUs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QUssSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTztRQUNQLHlCQUF5QjtRQUN6QixLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBbUI7WUFDekMsT0FBTyxFQUFFLFFBQVE7WUFDakIsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDLENBQUM7S0FFTjtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnNwIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IHsgSFRNTFJlbmRlcmVyIH0gZnJvbSAnLi9IVE1MUmVuZGVyZXInO1xuaW1wb3J0IHsgQXNjaWlkb2NSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWFzY2lpZG9jJztcbmltcG9ydCB7IENTU0xFU1NSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWNzc2xlc3MnO1xuaW1wb3J0IHsgRUpTUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1lanMnO1xuaW1wb3J0IHsgSGFuZGxlYmFyc1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItaGFuZGxlYmFycyc7XG5pbXBvcnQgeyBKU09OUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1qc29uJztcbmltcG9ydCB7IExpcXVpZFJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbGlxdWlkJztcbmltcG9ydCB7IE1hcmtkb3duUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1tZCc7XG5pbXBvcnQgeyBOdW5qdWNrc1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbnVuanVja3MnO1xuXG5leHBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vUmVuZGVyZXInO1xuZXhwb3J0IHsgSFRNTFJlbmRlcmVyIH0gZnJvbSAnLi9IVE1MUmVuZGVyZXInO1xuXG5pbXBvcnQge1xuICAgIElzSW50UmFuZ2UsIElzSW50LCBJc0Zsb2F0UmFuZ2UsIElzRmxvYXQsXG4gICAgZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yLFxuICAgIFZhbGlkYXRlUGFyYW1zLCBWYWxpZGF0ZUFjY2Vzc29yLFxufSBmcm9tICdydW50aW1lLWRhdGEtdmFsaWRhdGlvbic7XG5cblxuLy8gVE9ETyAtRE9ORSByZXF1aXJlIGEgY29udGFpbmVyIGNsYXNzIHRvIGhvbGQgdGhlIGxpc3Qgb2YgcmVuZGVyZXJzXG4vLyAgICAgIC1ET05FIGFsbG93IFJlbmRlcmVycyB0byBiZSBhZGRlZCBieSBvdGhlciBjb2RlXG4vLyAgICAgIC0gY29udGFpbiBjb25maWd1cmF0aW9uIGZvciB0aGluZ3Ncbi8vXG4vLyBDb25maWd1cmF0aW9uIC0gZnVuY3Rpb25zIHRvIGZpbmQgYXNzZXRzL2RvY3VtZW50cy9wYXJ0aWFscy9sYXlvdXRzXG4vLyAgICAgICAgICAgICAgIC0gZnVuY3Rpb24gdG8gd3JpdGUgcmVuZGVyZWQgZmlsZVxuLy8gICAgICAgICAgICAgICAtIGZ1bmN0aW9ucyAtIHBhcnRpYWwgLSBwYXJ0aWFsU3luY1xuLy9cbi8vIE1haGFmdW5jIGZvciA8cGFydGlhbD5cblxuZXhwb3J0IHR5cGUgQ29uZmlndXJhdGlvblBhcmFtcyA9IHtcbiAgICBwYXJ0aWFsRGlycz86IEFycmF5PHN0cmluZz47XG4gICAgZmluZFBhcnRpYWw/OiAoZm4pID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICBmaW5kUGFydGlhbFN5bmM/OiAoZm4pID0+IHN0cmluZztcbiAgICBsYXlvdXREaXJzPzogQXJyYXk8c3RyaW5nPjtcbiAgICBmaW5kTGF5b3V0PzogKGZuKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgZmluZExheW91dFN5bmM/OiAoZm4pID0+IHN0cmluZztcblxuICAgIHBhcnRpYWw/OiAoZm4sIG1ldGFkYXRhKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgcGFydGlhbFN5bmM/OiAoZm4sIG1ldGFkYXRhKSA9PiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBSZW5kZXJpbmdDb250ZXh0ID0ge1xuICAgIGZzcGF0aD86IHN0cmluZzsgICAvLyBQYXRobmFtZSB0aGF0IGNhbiBiZSBnaXZlbiB0byB0ZW1wbGF0ZSBlbmdpbmVzIGZvciBlcnJvciBtZXNzYWdlc1xuICAgIGNvbnRlbnQ6IHN0cmluZzsgICAvLyBDb250ZW50IHRvIHJlbmRlclxuXG4gICAgcmVuZGVyVG8/OiBzdHJpbmc7ICAvLyBQYXRobmFtZSBmb3IgcmVuZGVyaW5nIG91dHB1dFxuXG4gICAgbWV0YWRhdGE6IGFueTsgIC8vIERhdGEgdG8gYmUgdXNlZCBmb3Igc2F0aXNmeWluZyB2YXJpYWJsZXMgaW4gdGVtcGxhdGVzXG5cblxufTtcblxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb24ge1xuXG4gICAgI3JlbmRlcmVycztcbiAgICAjcGFydGlhbERpcnM7XG4gICAgI2xheW91dERpcnM7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM/OiBDb25maWd1cmF0aW9uUGFyYW1zKSB7XG4gICAgICAgIHRoaXMuI3JlbmRlcmVycyA9IFtdO1xuICAgICAgICB0aGlzLiNwYXJ0aWFsRGlycyA9IFtdO1xuICAgICAgICB0aGlzLiNsYXlvdXREaXJzID0gW107XG5cbiAgICAgICAgLypcbiAgICAgICAgICogSXMgdGhpcyB0aGUgYmVzdCBwbGFjZSBmb3IgdGhpcz8gIEl0IGlzIG5lY2Vzc2FyeSB0b1xuICAgICAgICAgKiBjYWxsIHRoaXMgZnVuY3Rpb24gc29tZXdoZXJlLiAgVGhlIG5hdHVyZSBvZiB0aGlzIGZ1bmN0aW9uXG4gICAgICAgICAqIGlzIHRoYXQgaXQgY2FuIGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIG5vIGltcGFjdC4gIFxuICAgICAgICAgKiBCeSBiZWluZyBsb2NhdGVkIGhlcmUsIGl0IHdpbGwgYWx3YXlzIGJlIGNhbGxlZCBieSB0aGVcbiAgICAgICAgICogdGltZSBhbnkgQ29uZmlndXJhdGlvbiBpcyBnZW5lcmF0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQnVpbHRJblJlbmRlcmVycygpO1xuXG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnBhcnRpYWxEaXJzKSB0aGlzLiNwYXJ0aWFsRGlycyA9IHBhcmFtcy5wYXJ0aWFsRGlycztcbiAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubGF5b3V0RGlycykgIHRoaXMuI2xheW91dERpcnMgID0gcGFyYW1zLmxheW91dERpcnM7XG5cbiAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbCA9IChwYXJhbXMgJiYgcGFyYW1zLmZpbmRQYXJ0aWFsKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5maW5kUGFydGlhbFxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRGaW5kUGFydGlhbC5iaW5kKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbFN5bmMgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kUGFydGlhbFN5bmMpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLmZpbmRQYXJ0aWFsU3luY1xuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRGaW5kUGFydGlhbFN5bmMuYmluZCh0aGlzKTtcblxuXG4gICAgICAgIHRoaXMuI2ZpbmRlckxheW91dCA9IChwYXJhbXMgJiYgcGFyYW1zLmZpbmRMYXlvdXQpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLmZpbmRMYXlvdXRcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZExheW91dC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuI2ZpbmRlckxheW91dFN5bmMgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kTGF5b3V0U3luYylcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMuZmluZExheW91dFN5bmNcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZExheW91dFN5bmMuYmluZCh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuI3BhcnRpYWwgPSAocGFyYW1zICYmIHBhcmFtcy5wYXJ0aWFsKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5wYXJ0aWFsXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdFBhcnRpYWwuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLiNwYXJ0aWFsU3luYyA9IChwYXJhbXMgJiYgcGFyYW1zLnBhcnRpYWxTeW5jKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5wYXJ0aWFsU3luY1xuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRQYXJ0aWFsU3luYy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGFic29sdXRlIHBhdGhzIHRvIGRpcmVjdG9yaWVzIGNvbnRhaW5pbmdcbiAgICAgKiBwYXJ0aWFsIHRlbXBsYXRlcy5cbiAgICAgKi9cbiAgICBAVmFsaWRhdGVBY2Nlc3NvcjxBcnJheTxzdHJpbmc+PigpXG4gICAgQElzUGF0aEFycmF5KClcbiAgICBzZXQgcGFydGlhbERpcnMoZGlyejogQXJyYXk8c3RyaW5nPikgeyB0aGlzLiNwYXJ0aWFsRGlycyA9IGRpcno7IH1cbiAgICBnZXQgcGFydGlhbERpcnMoKSAvKjogQXJyYXk8c3RyaW5nPiAqLyB7IHJldHVybiB0aGlzLiNwYXJ0aWFsRGlyczsgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGFic29sdXRlIHBhdGhuYW1lIGZvciBhIGRpcmVjdG9yeSB0byBmaW5kIHBhcnRpYWwgdGVtcGxhdGVzLlxuICAgICAqIEBwYXJhbSBkaXIgXG4gICAgICovXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgYWRkUGFydGlhbERpcihASXNBYnNvbHV0ZVBhdGgoKSBkaXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLiNwYXJ0aWFsRGlycy5wdXNoKGRpcik7XG4gICAgfVxuXG4gICAgI2ZpbmRlclBhcnRpYWw6IChmbnBhcnRpYWwpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICAjZmluZGVyUGFydGlhbFN5bmM6IChmbnBhcnRpYWwpID0+IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgZnVuY3Rpb24gZm9yIGZpbmRpbmcgcGFydGlhbCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgc2V0IHBhcnRpYWxGaW5kZXIoZmluZGVyOiAoZm5wYXJ0aWFsKSA9PiBQcm9taXNlPHN0cmluZz4pIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJQYXJ0aWFsID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmdW5jdGlvbiBmb3IgZmluZGluZyBwYXJ0aWFsIHRlbXBsYXRlcy5cbiAgICAgKi9cbiAgICBzZXQgcGFydGlhbEZpbmRlclN5bmMoZmluZGVyOiAoZm5wYXJ0aWFsKSA9PiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJQYXJ0aWFsU3luYyA9IGZpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGZpbmRQYXJ0aWFsKGZucGFydGlhbDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2ZpbmRlclBhcnRpYWwoZm5wYXJ0aWFsKTtcbiAgICB9XG5cbiAgICBmaW5kUGFydGlhbFN5bmMoZm5wYXJ0aWFsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4jZmluZGVyUGFydGlhbFN5bmMoZm5wYXJ0aWFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBhYnNvbHV0ZSBwYXRocyB0byBkaXJlY3RvcmllcyBjb250YWluaW5nXG4gICAgICogbGF5b3V0IHRlbXBsYXRlcy5cbiAgICAgKi9cbiAgICBAVmFsaWRhdGVBY2Nlc3NvcjxBcnJheTxzdHJpbmc+PigpXG4gICAgQElzUGF0aEFycmF5KClcbiAgICBzZXQgbGF5b3V0RGlycyhkaXJ6OiBBcnJheTxzdHJpbmc+KSB7IHRoaXMuI2xheW91dERpcnMgPSBkaXJ6OyB9XG4gICAgZ2V0IGxheW91dERpcnMoKTogQXJyYXk8c3RyaW5nPiB7IHJldHVybiB0aGlzLiNsYXlvdXREaXJzOyB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gYWJzb2x1dGUgcGF0aG5hbWUgZm9yIGEgZGlyZWN0b3J5IHRvIGZpbmQgbGF5b3V0IHRlbXBsYXRlcy5cbiAgICAgKiBAcGFyYW0gZGlyIFxuICAgICAqL1xuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGFkZExheW91dERpcihASXNBYnNvbHV0ZVBhdGgoKSBkaXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLiNsYXlvdXREaXJzLnB1c2goZGlyKTtcbiAgICB9XG5cbiAgICAjZmluZGVyTGF5b3V0OiAoZm5sYXlvdXQpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgICAjZmluZGVyTGF5b3V0U3luYzogKGZubGF5b3V0KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBhIGZ1bmN0aW9uIGZvciBmaW5kaW5nIGxheW91dCB0ZW1wbGF0ZXNcbiAgICAgKiBAcGFyYW0gZmluZGVyXG4gICAgICovXG4gICAgc2V0IGxheW91dEZpbmRlcihmaW5kZXI6IChmbmxheW91dCkgPT4gUHJvbWlzZTxzdHJpbmc+KSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyTGF5b3V0ID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmdW5jdGlvbiBmb3IgZmluZGluZyBsYXlvdXQgdGVtcGxhdGVzXG4gICAgICogQHBhcmFtIGZpbmRlclxuICAgICAqL1xuICAgIHNldCBsYXlvdXRGaW5kZXJTeW5jKGZpbmRlcjogKGZubGF5b3V0KSA9PiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGZpbmRlciAmJiB0eXBlb2YgZmluZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXRTeW5jID0gZmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZmluZExheW91dChmbmxheW91dDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2ZpbmRlckxheW91dChmbmxheW91dCk7XG4gICAgfVxuXG4gICAgZmluZExheW91dFN5bmMoZm5sYXlvdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiNmaW5kZXJMYXlvdXRTeW5jKGZubGF5b3V0KTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLyBSZW5kZXJlcnNcblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbGlzdCBvZiByZWdpc3RlcmVkIHJlbmRlcmVyc1xuICAgICAqL1xuICAgIGdldCByZW5kZXJlcnMoKTogQXJyYXk8UmVuZGVyZXI+IHsgcmV0dXJuIHRoaXMuI3JlbmRlcmVyczsgfVxuXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgcmVnaXN0ZXJSZW5kZXJlcihASXNSZW5kZXJlcigpIHJlbmRlcmVyOiBSZW5kZXJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIShyZW5kZXJlciBpbnN0YW5jZW9mIFJlbmRlcmVyKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm90IEEgUmVuZGVyZXIgJysgdXRpbC5pbnNwZWN0KHJlbmRlcmVyKSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBhIFJlbmRlcmVyICR7dXRpbC5pbnNwZWN0KHJlbmRlcmVyKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZmluZFJlbmRlcmVyTmFtZShyZW5kZXJlci5uYW1lKSkge1xuICAgICAgICAgICAgcmVuZGVyZXIuY29uZmlnID0gdGhpcztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGByZWdpc3RlclJlbmRlcmVyIGAsIHJlbmRlcmVyKTtcbiAgICAgICAgICAgIHRoaXMuI3JlbmRlcmVycy5wdXNoKHJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93IGFuIGFwcGxpY2F0aW9uIHRvIG92ZXJyaWRlIG9uZSBvZiB0aGUgYnVpbHQtaW4gcmVuZGVyZXJzXG4gICAgICogdGhhdCBhcmUgaW5pdGlhbGl6ZWQgYmVsb3cuICBUaGUgaW5zcGlyYXRpb24gaXMgZXB1YnRvb2xzIHRoYXRcbiAgICAgKiBtdXN0IHdyaXRlIEhUTUwgZmlsZXMgd2l0aCBhbiAueGh0bWwgZXh0ZW5zaW9uLiAgVGhlcmVmb3JlIGl0XG4gICAgICogY2FuIHN1YmNsYXNzIEVKU1JlbmRlcmVyIGV0YyB3aXRoIGltcGxlbWVudGF0aW9ucyB0aGF0IGZvcmNlIHRoZVxuICAgICAqIGZpbGUgbmFtZSB0byBiZSAueGh0bWwuICBXZSdyZSBub3QgY2hlY2tpbmcgaWYgdGhlIHJlbmRlcmVyIG5hbWVcbiAgICAgKiBpcyBhbHJlYWR5IHRoZXJlIGluIGNhc2UgZXB1YnRvb2xzIG11c3QgdXNlIHRoZSBzYW1lIHJlbmRlcmVyIG5hbWUuXG4gICAgICovXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgcmVnaXN0ZXJPdmVycmlkZVJlbmRlcmVyKEBJc1JlbmRlcmVyKCkgcmVuZGVyZXI6IFJlbmRlcmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghKHJlbmRlcmVyIGluc3RhbmNlb2YgUmVuZGVyZXIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdOb3QgQSBSZW5kZXJlciAnKyB1dGlsLmluc3BlY3QocmVuZGVyZXIpKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IGEgUmVuZGVyZXIgJHt1dGlsLmluc3BlY3QocmVuZGVyZXIpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcmVyLmNvbmZpZyA9IHRoaXM7XG4gICAgICAgIHRoaXMuI3JlbmRlcmVycy51bnNoaWZ0KHJlbmRlcmVyKTtcbiAgICB9XG5cbiAgICBmaW5kUmVuZGVyZXJOYW1lKG5hbWU6IHN0cmluZyk6IFJlbmRlcmVyIHtcbiAgICAgICAgZm9yICh2YXIgciBvZiB0aGlzLiNyZW5kZXJlcnMpIHtcbiAgICAgICAgICAgIGlmIChyLm5hbWUgPT09IG5hbWUpIHJldHVybiByO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZmluZFJlbmRlcmVyUGF0aChfcGF0aDogc3RyaW5nKTogUmVuZGVyZXIge1xuICAgICAgICAvLyBsb2coYGZpbmRSZW5kZXJlclBhdGggJHtfcGF0aH1gKTtcbiAgICAgICAgZm9yICh2YXIgciBvZiB0aGlzLiNyZW5kZXJlcnMpIHtcbiAgICAgICAgICAgIGlmIChyLm1hdGNoKF9wYXRoKSkgcmV0dXJuIHI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGZpbmRSZW5kZXJlclBhdGggTk8gUkVOREVSRVIgZm9yICR7X3BhdGh9YCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJCdWlsdEluUmVuZGVyZXJzKCkge1xuICAgICAgICAvLyBSZWdpc3RlciBidWlsdC1pbiByZW5kZXJlcnNcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBNYXJrZG93blJlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IEFzY2lpZG9jUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgRUpTUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgTGlxdWlkUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgTnVuanVja3NSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBIYW5kbGViYXJzUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgQ1NTTEVTU1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IEpTT05SZW5kZXJlcigpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGEgUmVuZGVyZXIgYnkgaXRzIGV4dGVuc2lvbi5cbiAgICAgKi9cbiAgICBmaW5kUmVuZGVyZXIobmFtZTogc3RyaW5nKTogUmVuZGVyZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kUmVuZGVyZXJOYW1lKG5hbWUpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vIEZpbmQgTGF5b3V0cyBvciBQYXJ0aWFsc1xuXG4gICAgI3BhcnRpYWw6IChmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgI3BhcnRpYWxTeW5jOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgc2V0IHBhcnRpYWxGdW5jKHBmdW5jOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gUHJvbWlzZTxzdHJpbmc+KSB7XG4gICAgICAgIHRoaXMuI3BhcnRpYWwgPSBwZnVuYztcbiAgICB9XG5cbiAgICBzZXQgcGFydGlhbEZ1bmNTeW5jKHBmdW5jOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuI3BhcnRpYWxTeW5jID0gcGZ1bmM7XG4gICAgfVxuXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgYXN5bmMgcGFydGlhbChcbiAgICAgICAgQElzU3RyaW5nKCkgZm5hbWU6IHN0cmluZyxcbiAgICAgICAgQElzT2JqZWN0KCkgbWV0YWRhdGE6IGFueSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuI3BhcnRpYWwoZm5hbWUsIG1ldGFkYXRhKTtcbiAgICB9XG5cbiAgICBAVmFsaWRhdGVQYXJhbXNcbiAgICBwYXJ0aWFsU3luYyhcbiAgICAgICAgQElzU3RyaW5nKCkgZm5hbWU6IHN0cmluZyxcbiAgICAgICAgQElzT2JqZWN0KCkgbWV0YWRhdGE6IGFueSkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuI3BhcnRpYWxTeW5jKGZuYW1lLCBtZXRhZGF0YSk7XG4gICAgfVxuXG59XG5cbi8vIEN1c3RvbSB2YWxpZGF0b3JzXG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHM6IHN0cmluZykge1xuICAgIGlmICghcykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghKHR5cGVvZiBzID09PSAnc3RyaW5nJykpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gSXNTdHJpbmcoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcihcbiAgICAgICAgaXNTdHJpbmcsXG4gICAgICAgIGBWYWx1ZSA6dmFsdWU6IGlzIG5vdCBhIHN0cmluZ2ApO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChzOiBhbnkpIHtcbiAgICBpZiAoIXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoISh0eXBlb2YgcyA9PT0gJ29iamVjdCcpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzT2JqZWN0KCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVZhbGlkYXRpb25EZWNvcmF0b3IoXG4gICAgICAgIGlzT2JqZWN0LFxuICAgICAgICBgVmFsdWUgOnZhbHVlOiBpcyBub3QgYW4gb2JqZWN0YCk7XG59XG5cblxuZnVuY3Rpb24gaXNSZW5kZXJlcihyKSB7XG4gICAgaWYgKCFyKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCEodHlwZW9mIHIgPT09ICdvYmplY3QnKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghKHIgaW5zdGFuY2VvZiBSZW5kZXJlcikpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gSXNSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yKFxuICAgICAgICBpc1JlbmRlcmVyLFxuICAgICAgICBgVmFsdWUgOnZhbHVlOiBpcyBub3QgYSBSZW5kZXJlcmApO1xufVxuXG5mdW5jdGlvbiBpc1BhdGhBcnJheShhcnkpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJ5KSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoY29uc3QgcCBvZiBhcnkpIHtcbiAgICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUocCkpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzUGF0aEFycmF5KCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVZhbGlkYXRpb25EZWNvcmF0b3IoXG4gICAgICAgIGlzUGF0aEFycmF5LFxuICAgICAgICBgVmFsdWUgOnZhbHVlOiBpcyBub3QgYSBQYXRoIEFycmF5YCk7XG59XG5cbmZ1bmN0aW9uIGlzQWJzb2x1dGVQYXRoKHApIHtcbiAgICBpZiAoISh0eXBlb2YgcCA9PT0gJ3N0cmluZycpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUocCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gSXNBYnNvbHV0ZVBhdGgoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcihcbiAgICAgICAgaXNBYnNvbHV0ZVBhdGgsXG4gICAgICAgIGBWYWx1ZSA6dmFsdWU6IGlzIG5vdCBhbiBBYnNvbHV0ZSBQYXRoYCk7XG59XG5cbi8vIERlZmF1bHQgUGFydGlhbC9MYXlvdXQgZmluZGVyIGZ1bmN0aW9uc1xuXG5hc3luYyBmdW5jdGlvbiBkZWZhdWx0RmluZExheW91dChmbmxheW91dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgZm9yIChjb25zdCBsZGlyIG9mIHRoaXMubGF5b3V0RGlycykge1xuICAgICAgICBjb25zdCBscGF0aCA9IHBhdGguam9pbihsZGlyLCBmbmxheW91dCk7XG4gICAgICAgIGxldCBsc3RhdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxzdGF0ID0gYXdhaXQgZnNwLnN0YXQobHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgbHN0YXQgPSB1bmRlZmluZWQ7IH1cbiAgICAgICAgaWYgKGxzdGF0KSB7XG4gICAgICAgICAgICBpZiAobHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEZpbmRMYXlvdXRTeW5jKGZubGF5b3V0KTogc3RyaW5nIHtcbiAgICBmb3IgKGNvbnN0IGxkaXIgb2YgdGhpcy5sYXlvdXREaXJzKSB7XG4gICAgICAgIGNvbnN0IGxwYXRoID0gcGF0aC5qb2luKGxkaXIsIGZubGF5b3V0KTtcbiAgICAgICAgbGV0IGxzdGF0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbHN0YXQgPSBmcy5zdGF0U3luYyhscGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyBsc3RhdCA9IHVuZGVmaW5lZDsgfVxuICAgICAgICBpZiAobHN0YXQpIHtcbiAgICAgICAgICAgIGlmIChsc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBscGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWZhdWx0RmluZFBhcnRpYWwoZm5wYXJ0aWFsKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhgZGVmYXVsdEZpbmRQYXJ0aWFsICR7Zm5wYXJ0aWFsfWAsIHRoaXMucGFydGlhbERpcnMpO1xuICAgIGZvciAoY29uc3QgcGRpciBvZiB0aGlzLnBhcnRpYWxEaXJzKSB7XG4gICAgICAgIGNvbnN0IHBwYXRoID0gcGF0aC5qb2luKHBkaXIsIGZucGFydGlhbCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBkZWZhdWx0RmluZFBhcnRpYWwgZG9lcyAke3BwYXRofSBleGlzdCBmb3IgJHtmbnBhcnRpYWx9P2ApO1xuICAgICAgICBsZXQgcHN0YXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwc3RhdCA9IGF3YWl0IGZzcC5zdGF0KHBwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IFxuICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihgc3RhdCBmb3IgJHtwcGF0aH0gZmFpbGVkIGAsIGVycik7XG4gICAgICAgICAgICBwc3RhdCA9IHVuZGVmaW5lZDsgXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBzdGF0KSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGVmYXVsdEZpbmRQYXJ0aWFsICR7cHBhdGh9IHN0YXRzYCwgcHN0YXQpO1xuICAgICAgICAgICAgaWYgKHBzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGRlZmF1bHRGaW5kUGFydGlhbCAke3BwYXRofSBleGlzdHNgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEZpbmRQYXJ0aWFsU3luYyhmbnBhcnRpYWwpOiBzdHJpbmcge1xuICAgIGZvciAoY29uc3QgcGRpciBvZiB0aGlzLnBhcnRpYWxEaXJzKSB7XG4gICAgICAgIGNvbnN0IHBwYXRoID0gcGF0aC5qb2luKHBkaXIsIGZucGFydGlhbCk7XG4gICAgICAgIGxldCBwc3RhdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBzdGF0ID0gZnMuc3RhdFN5bmMocHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgcHN0YXQgPSB1bmRlZmluZWQ7IH1cbiAgICAgICAgaWYgKHBzdGF0KSB7XG4gICAgICAgICAgICBpZiAocHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBkZWZhdWx0UGFydGlhbChmbmFtZTogc3RyaW5nLCBtZXRhZGF0YTogYW55KSB7XG4gICAgXG4gICAgY29uc3QgZm91bmQgPSBhd2FpdCB0aGlzLmZpbmRQYXJ0aWFsKGZuYW1lKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcGFydGlhbCBmb3VuZCBmb3IgJHtmbmFtZX0gaW4gJHt1dGlsLmluc3BlY3QodGhpcy5wYXJ0aWFsRGlycyl9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmZpbmRSZW5kZXJlclBhdGgoZm5hbWUpO1xuICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgaWYgKGZuYW1lLmVuZHNXaXRoKCcuaHRtbCcpIHx8IGZuYW1lLmVuZHNXaXRoKCcueGh0bWwnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZzcC5yZWFkRmlsZShmb3VuZCwgJ3V0Zi04Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRlZmF1bHRQYXJ0aWFsIG5vIFJlbmRlcmVyIGZvdW5kIGZvciAke2ZuYW1lfWApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcENvbnRlbnQgPSBhd2FpdCBmc3AucmVhZEZpbGUoZm91bmQsICd1dGYtOCcpO1xuXG4gICAgICAgIC8vIFNvbWUgcmVuZGVyZXJzIChOdW5qdWtzKSByZXF1aXJlIHRoYXQgbWV0YWRhdGEuY29uZmlnXG4gICAgICAgIC8vIHBvaW50IHRvIHRoZSBjb25maWcgb2JqZWN0LiAgVGhpcyBibG9jayBvZiBjb2RlXG4gICAgICAgIC8vIGR1cGxpY2F0ZXMgdGhlIG1ldGFkYXRhIG9iamVjdCwgdGhlbiBzZXRzIHRoZVxuICAgICAgICAvLyBjb25maWcgZmllbGQgaW4gdGhlIGR1cGxpY2F0ZSwgcGFzc2luZyB0aGF0IHRvIHRoZSBwYXJ0aWFsLlxuICAgICAgICBsZXQgbWRhdGEgPSB7fTtcbiAgICAgICAgbGV0IHByb3A7XG5cbiAgICAgICAgZm9yIChwcm9wIGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICBtZGF0YVtwcm9wXSA9IG1ldGFkYXRhW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gbWRhdGEuY29uZmlnID0gY29uZmlnO1xuICAgICAgICBtZGF0YVsncGFydGlhbFN5bmMnXSA9IHRoaXMucGFydGlhbFN5bmMuYmluZCh0aGlzKTtcbiAgICAgICAgbWRhdGFbJ3BhcnRpYWwnXSAgICAgPSB0aGlzLnBhcnRpYWwuYmluZCh0aGlzKTtcblxuICAgICAgICByZXR1cm4gcmVuZGVyZXIucmVuZGVyKDxSZW5kZXJpbmdDb250ZXh0PntcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBDb250ZW50LFxuICAgICAgICAgICAgbWV0YWRhdGE6IG1kYXRhLFxuICAgICAgICAgICAgZnNwYXRoOiBmb3VuZFxuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBkZWZhdWx0UGFydGlhbFN5bmMoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkge1xuICAgIFxuICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kUGFydGlhbFN5bmMoZm5hbWUpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBwYXJ0aWFsIGZvdW5kIGZvciAke2ZuYW1lfSBpbiAke3V0aWwuaW5zcGVjdCh0aGlzLnBhcnRpYWxEaXJzKX1gKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZmluZFJlbmRlcmVyUGF0aChmbmFtZSk7XG4gICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICBpZiAoZm5hbWUuZW5kc1dpdGgoJy5odG1sJykgfHwgZm5hbWUuZW5kc1dpdGgoJy54aHRtbCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnNwLnJlYWRGaWxlKGZvdW5kLCAndXRmLTgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGVmYXVsdFBhcnRpYWwgbm8gUmVuZGVyZXIgZm91bmQgZm9yICR7Zm5hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmb3VuZCwgJ3V0Zi04Jyk7XG5cbiAgICAgICAgLy8gU29tZSByZW5kZXJlcnMgKE51bmp1a3MpIHJlcXVpcmUgdGhhdCBtZXRhZGF0YS5jb25maWdcbiAgICAgICAgLy8gcG9pbnQgdG8gdGhlIGNvbmZpZyBvYmplY3QuICBUaGlzIGJsb2NrIG9mIGNvZGVcbiAgICAgICAgLy8gZHVwbGljYXRlcyB0aGUgbWV0YWRhdGEgb2JqZWN0LCB0aGVuIHNldHMgdGhlXG4gICAgICAgIC8vIGNvbmZpZyBmaWVsZCBpbiB0aGUgZHVwbGljYXRlLCBwYXNzaW5nIHRoYXQgdG8gdGhlIHBhcnRpYWwuXG4gICAgICAgIGxldCBtZGF0YSA9IHt9O1xuICAgICAgICBsZXQgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIG1kYXRhW3Byb3BdID0gbWV0YWRhdGFbcHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ET1xuICAgICAgICAvLyBtZGF0YS5jb25maWcgPSBjb25maWc7XG4gICAgICAgIG1kYXRhWydwYXJ0aWFsU3luYyddID0gdGhpcy5wYXJ0aWFsU3luYy5iaW5kKHRoaXMpO1xuICAgICAgICBtZGF0YVsncGFydGlhbCddICAgICA9IHRoaXMucGFydGlhbC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiByZW5kZXJlci5yZW5kZXJTeW5jKDxSZW5kZXJpbmdDb250ZXh0PntcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBDb250ZW50LFxuICAgICAgICAgICAgbWV0YWRhdGE6IG1kYXRhLFxuICAgICAgICAgICAgZnNwYXRoOiBmb3VuZFxuICAgICAgICB9KTtcblxuICAgIH1cbn1cbiJdfQ==