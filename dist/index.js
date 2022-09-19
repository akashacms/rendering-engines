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
exports.Configuration = exports.RenderingFormat = exports.HTMLRenderer = exports.Renderer = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBNkI7QUFDN0IsMkNBQTZCO0FBQzdCLDJCQUFxQztBQUNyQyx1Q0FBeUI7QUFFekIseUNBQXNDO0FBRXRDLHVEQUFxRDtBQUNyRCxxREFBbUQ7QUFDbkQsNkNBQTJDO0FBQzNDLDJEQUF5RDtBQUN6RCwrQ0FBNkM7QUFDN0MsbURBQWlEO0FBQ2pELDJDQUErQztBQUMvQyx1REFBcUQ7QUFFckQsdUNBQXNDO0FBQTdCLG9HQUFBLFFBQVEsT0FBQTtBQUNqQiwrQ0FBOEM7QUFBckMsNEdBQUEsWUFBWSxPQUFBO0FBRXJCLHFFQUlpQztBQXFDakMsSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3ZCLGdDQUFhLENBQUE7SUFDYiw4QkFBWSxDQUFBO0lBQ1osZ0NBQWEsQ0FBQTtJQUNiLDhCQUFZLENBQUE7SUFDWiw0QkFBVyxDQUFBO0FBQ2YsQ0FBQyxFQU5XLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBTTFCO0FBQUEsQ0FBQztBQUVGLE1BQWEsYUFBYTtJQU10QixZQUFZLE1BQTRCO1FBSnhDLDJDQUFXO1FBQ1gsNkNBQWE7UUFDYiw0Q0FBWTtRQStEWiwrQ0FBK0M7UUFDL0MsbURBQTBDO1FBOEMxQyw4Q0FBNkM7UUFDN0Msa0RBQXdDO1FBdUd4QyxpQ0FBaUM7UUFFakMseUNBQTREO1FBQzVELDZDQUF1RDtRQXRObkQsdUJBQUEsSUFBSSw0QkFBYyxFQUFFLE1BQUEsQ0FBQztRQUNyQix1QkFBQSxJQUFJLDhCQUFnQixFQUFFLE1BQUEsQ0FBQztRQUN2Qix1QkFBQSxJQUFJLDZCQUFlLEVBQUUsTUFBQSxDQUFDO1FBRXRCOzs7Ozs7V0FNRztRQUNILElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBRWhD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QUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVqRCx3REFBd0Q7UUFDeEQsa0RBQWtEO1FBQ2xELGdEQUFnRDtRQUNoRCw4REFBOEQ7UUFDOUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUM7UUFFVCxLQUFLLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU87UUFDUCx5QkFBeUI7UUFDekIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQW1CO1lBQ3pDLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0tBRU47QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHByb21pc2VzIGFzIGZzcCB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcblxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCB7IEhUTUxSZW5kZXJlciB9IGZyb20gJy4vSFRNTFJlbmRlcmVyJztcbmltcG9ydCB7IEFzY2lpZG9jUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1hc2NpaWRvYyc7XG5pbXBvcnQgeyBDU1NMRVNTUmVuZGVyZXIgfSBmcm9tICcuL3JlbmRlci1jc3NsZXNzJztcbmltcG9ydCB7IEVKU1JlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItZWpzJztcbmltcG9ydCB7IEhhbmRsZWJhcnNSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWhhbmRsZWJhcnMnO1xuaW1wb3J0IHsgSlNPTlJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItanNvbic7XG5pbXBvcnQgeyBMaXF1aWRSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLWxpcXVpZCc7XG5pbXBvcnQgeyBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAnLi9yZW5kZXItbWQnO1xuaW1wb3J0IHsgTnVuanVja3NSZW5kZXJlciB9IGZyb20gJy4vcmVuZGVyLW51bmp1Y2tzJztcblxuZXhwb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL1JlbmRlcmVyJztcbmV4cG9ydCB7IEhUTUxSZW5kZXJlciB9IGZyb20gJy4vSFRNTFJlbmRlcmVyJztcblxuaW1wb3J0IHtcbiAgICBJc0ludFJhbmdlLCBJc0ludCwgSXNGbG9hdFJhbmdlLCBJc0Zsb2F0LFxuICAgIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcixcbiAgICBWYWxpZGF0ZVBhcmFtcywgVmFsaWRhdGVBY2Nlc3Nvcixcbn0gZnJvbSAncnVudGltZS1kYXRhLXZhbGlkYXRpb24nO1xuXG5cbi8vIFRPRE8gLURPTkUgcmVxdWlyZSBhIGNvbnRhaW5lciBjbGFzcyB0byBob2xkIHRoZSBsaXN0IG9mIHJlbmRlcmVyc1xuLy8gICAgICAtRE9ORSBhbGxvdyBSZW5kZXJlcnMgdG8gYmUgYWRkZWQgYnkgb3RoZXIgY29kZVxuLy8gICAgICAtIGNvbnRhaW4gY29uZmlndXJhdGlvbiBmb3IgdGhpbmdzXG4vL1xuLy8gQ29uZmlndXJhdGlvbiAtIGZ1bmN0aW9ucyB0byBmaW5kIGFzc2V0cy9kb2N1bWVudHMvcGFydGlhbHMvbGF5b3V0c1xuLy8gICAgICAgICAgICAgICAtIGZ1bmN0aW9uIHRvIHdyaXRlIHJlbmRlcmVkIGZpbGVcbi8vICAgICAgICAgICAgICAgLSBmdW5jdGlvbnMgLSBwYXJ0aWFsIC0gcGFydGlhbFN5bmNcbi8vXG4vLyBNYWhhZnVuYyBmb3IgPHBhcnRpYWw+XG5cbmV4cG9ydCB0eXBlIENvbmZpZ3VyYXRpb25QYXJhbXMgPSB7XG4gICAgcGFydGlhbERpcnM/OiBBcnJheTxzdHJpbmc+O1xuICAgIGZpbmRQYXJ0aWFsPzogKGZuKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgZmluZFBhcnRpYWxTeW5jPzogKGZuKSA9PiBzdHJpbmc7XG4gICAgbGF5b3V0RGlycz86IEFycmF5PHN0cmluZz47XG4gICAgZmluZExheW91dD86IChmbikgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgIGZpbmRMYXlvdXRTeW5jPzogKGZuKSA9PiBzdHJpbmc7XG5cbiAgICBwYXJ0aWFsPzogKGZuLCBtZXRhZGF0YSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgIHBhcnRpYWxTeW5jPzogKGZuLCBtZXRhZGF0YSkgPT4gc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUmVuZGVyaW5nQ29udGV4dCA9IHtcbiAgICBmc3BhdGg/OiBzdHJpbmc7ICAgLy8gUGF0aG5hbWUgdGhhdCBjYW4gYmUgZ2l2ZW4gdG8gdGVtcGxhdGUgZW5naW5lcyBmb3IgZXJyb3IgbWVzc2FnZXNcbiAgICBjb250ZW50OiBzdHJpbmc7ICAgLy8gQ29udGVudCB0byByZW5kZXJcbiAgICBib2R5Pzogc3RyaW5nOyAgICAgLy8gQ29udGVudCBib2R5IGFmdGVyIHBhcnNpbmcgZnJvbnRtYXR0ZXJcblxuICAgIHJlbmRlclRvPzogc3RyaW5nOyAgLy8gUGF0aG5hbWUgZm9yIHJlbmRlcmluZyBvdXRwdXRcblxuICAgIG1ldGFkYXRhOiBhbnk7ICAvLyBEYXRhIHRvIGJlIHVzZWQgZm9yIHNhdGlzZnlpbmcgdmFyaWFibGVzIGluIHRlbXBsYXRlc1xuXG5cbn07XG5cbmV4cG9ydCBlbnVtIFJlbmRlcmluZ0Zvcm1hdCB7XG4gICAgSFRNTCA9ICdIVE1MJyxcbiAgICBQSFAgID0gJ1BIUCcsXG4gICAgSlNPTiA9ICdKU09OJyxcbiAgICBDU1MgID0gJ0NTUycsXG4gICAgSlMgICA9ICdKUydcbn07XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIHtcblxuICAgICNyZW5kZXJlcnM7XG4gICAgI3BhcnRpYWxEaXJzO1xuICAgICNsYXlvdXREaXJzO1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zPzogQ29uZmlndXJhdGlvblBhcmFtcykge1xuICAgICAgICB0aGlzLiNyZW5kZXJlcnMgPSBbXTtcbiAgICAgICAgdGhpcy4jcGFydGlhbERpcnMgPSBbXTtcbiAgICAgICAgdGhpcy4jbGF5b3V0RGlycyA9IFtdO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIElzIHRoaXMgdGhlIGJlc3QgcGxhY2UgZm9yIHRoaXM/ICBJdCBpcyBuZWNlc3NhcnkgdG9cbiAgICAgICAgICogY2FsbCB0aGlzIGZ1bmN0aW9uIHNvbWV3aGVyZS4gIFRoZSBuYXR1cmUgb2YgdGhpcyBmdW5jdGlvblxuICAgICAgICAgKiBpcyB0aGF0IGl0IGNhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBubyBpbXBhY3QuICBcbiAgICAgICAgICogQnkgYmVpbmcgbG9jYXRlZCBoZXJlLCBpdCB3aWxsIGFsd2F5cyBiZSBjYWxsZWQgYnkgdGhlXG4gICAgICAgICAqIHRpbWUgYW55IENvbmZpZ3VyYXRpb24gaXMgZ2VuZXJhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWdpc3RlckJ1aWx0SW5SZW5kZXJlcnMoKTtcblxuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5wYXJ0aWFsRGlycykgdGhpcy4jcGFydGlhbERpcnMgPSBwYXJhbXMucGFydGlhbERpcnM7XG4gICAgICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLmxheW91dERpcnMpICB0aGlzLiNsYXlvdXREaXJzICA9IHBhcmFtcy5sYXlvdXREaXJzO1xuXG4gICAgICAgIHRoaXMuI2ZpbmRlclBhcnRpYWwgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kUGFydGlhbClcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMuZmluZFBhcnRpYWxcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZFBhcnRpYWwuYmluZCh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuI2ZpbmRlclBhcnRpYWxTeW5jID0gKHBhcmFtcyAmJiBwYXJhbXMuZmluZFBhcnRpYWxTeW5jKVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5maW5kUGFydGlhbFN5bmNcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RmluZFBhcnRpYWxTeW5jLmJpbmQodGhpcyk7XG5cblxuICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXQgPSAocGFyYW1zICYmIHBhcmFtcy5maW5kTGF5b3V0KVxuICAgICAgICAgICAgICAgICAgICA/IHBhcmFtcy5maW5kTGF5b3V0XG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdEZpbmRMYXlvdXQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLiNmaW5kZXJMYXlvdXRTeW5jID0gKHBhcmFtcyAmJiBwYXJhbXMuZmluZExheW91dFN5bmMpXG4gICAgICAgICAgICAgICAgICAgID8gcGFyYW1zLmZpbmRMYXlvdXRTeW5jXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdEZpbmRMYXlvdXRTeW5jLmJpbmQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiNwYXJ0aWFsID0gKHBhcmFtcyAmJiBwYXJhbXMucGFydGlhbClcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMucGFydGlhbFxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRQYXJ0aWFsLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy4jcGFydGlhbFN5bmMgPSAocGFyYW1zICYmIHBhcmFtcy5wYXJ0aWFsU3luYylcbiAgICAgICAgICAgICAgICAgICAgPyBwYXJhbXMucGFydGlhbFN5bmNcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0UGFydGlhbFN5bmMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBhYnNvbHV0ZSBwYXRocyB0byBkaXJlY3RvcmllcyBjb250YWluaW5nXG4gICAgICogcGFydGlhbCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgQFZhbGlkYXRlQWNjZXNzb3I8QXJyYXk8c3RyaW5nPj4oKVxuICAgIEBJc1BhdGhBcnJheSgpXG4gICAgc2V0IHBhcnRpYWxEaXJzKGRpcno6IEFycmF5PHN0cmluZz4pIHsgdGhpcy4jcGFydGlhbERpcnMgPSBkaXJ6OyB9XG4gICAgZ2V0IHBhcnRpYWxEaXJzKCkgLyo6IEFycmF5PHN0cmluZz4gKi8geyByZXR1cm4gdGhpcy4jcGFydGlhbERpcnM7IH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBhYnNvbHV0ZSBwYXRobmFtZSBmb3IgYSBkaXJlY3RvcnkgdG8gZmluZCBwYXJ0aWFsIHRlbXBsYXRlcy5cbiAgICAgKiBAcGFyYW0gZGlyIFxuICAgICAqL1xuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGFkZFBhcnRpYWxEaXIoQElzQWJzb2x1dGVQYXRoKCkgZGlyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4jcGFydGlhbERpcnMucHVzaChkaXIpO1xuICAgIH1cblxuICAgICNmaW5kZXJQYXJ0aWFsOiAoZm5wYXJ0aWFsKSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgI2ZpbmRlclBhcnRpYWxTeW5jOiAoZm5wYXJ0aWFsKSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSBhIGZ1bmN0aW9uIGZvciBmaW5kaW5nIHBhcnRpYWwgdGVtcGxhdGVzLlxuICAgICAqL1xuICAgIHNldCBwYXJ0aWFsRmluZGVyKGZpbmRlcjogKGZucGFydGlhbCkgPT4gUHJvbWlzZTxzdHJpbmc+KSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbCA9IGZpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgZnVuY3Rpb24gZm9yIGZpbmRpbmcgcGFydGlhbCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgc2V0IHBhcnRpYWxGaW5kZXJTeW5jKGZpbmRlcjogKGZucGFydGlhbCkgPT4gc3RyaW5nKSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyUGFydGlhbFN5bmMgPSBmaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmaW5kUGFydGlhbChmbnBhcnRpYWw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiNmaW5kZXJQYXJ0aWFsKGZucGFydGlhbCk7XG4gICAgfVxuXG4gICAgZmluZFBhcnRpYWxTeW5jKGZucGFydGlhbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2ZpbmRlclBhcnRpYWxTeW5jKGZucGFydGlhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgYWJzb2x1dGUgcGF0aHMgdG8gZGlyZWN0b3JpZXMgY29udGFpbmluZ1xuICAgICAqIGxheW91dCB0ZW1wbGF0ZXMuXG4gICAgICovXG4gICAgQFZhbGlkYXRlQWNjZXNzb3I8QXJyYXk8c3RyaW5nPj4oKVxuICAgIEBJc1BhdGhBcnJheSgpXG4gICAgc2V0IGxheW91dERpcnMoZGlyejogQXJyYXk8c3RyaW5nPikgeyB0aGlzLiNsYXlvdXREaXJzID0gZGlyejsgfVxuICAgIGdldCBsYXlvdXREaXJzKCk6IEFycmF5PHN0cmluZz4geyByZXR1cm4gdGhpcy4jbGF5b3V0RGlyczsgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGFic29sdXRlIHBhdGhuYW1lIGZvciBhIGRpcmVjdG9yeSB0byBmaW5kIGxheW91dCB0ZW1wbGF0ZXMuXG4gICAgICogQHBhcmFtIGRpciBcbiAgICAgKi9cbiAgICBAVmFsaWRhdGVQYXJhbXNcbiAgICBhZGRMYXlvdXREaXIoQElzQWJzb2x1dGVQYXRoKCkgZGlyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4jbGF5b3V0RGlycy5wdXNoKGRpcik7XG4gICAgfVxuXG4gICAgI2ZpbmRlckxheW91dDogKGZubGF5b3V0KSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgI2ZpbmRlckxheW91dFN5bmM6IChmbmxheW91dCkgPT4gc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU3RvcmUgYSBmdW5jdGlvbiBmb3IgZmluZGluZyBsYXlvdXQgdGVtcGxhdGVzXG4gICAgICogQHBhcmFtIGZpbmRlclxuICAgICAqL1xuICAgIHNldCBsYXlvdXRGaW5kZXIoZmluZGVyOiAoZm5sYXlvdXQpID0+IFByb21pc2U8c3RyaW5nPikge1xuICAgICAgICBpZiAoZmluZGVyICYmIHR5cGVvZiBmaW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuI2ZpbmRlckxheW91dCA9IGZpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIGEgZnVuY3Rpb24gZm9yIGZpbmRpbmcgbGF5b3V0IHRlbXBsYXRlc1xuICAgICAqIEBwYXJhbSBmaW5kZXJcbiAgICAgKi9cbiAgICBzZXQgbGF5b3V0RmluZGVyU3luYyhmaW5kZXI6IChmbmxheW91dCkgPT4gc3RyaW5nKSB7XG4gICAgICAgIGlmIChmaW5kZXIgJiYgdHlwZW9mIGZpbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy4jZmluZGVyTGF5b3V0U3luYyA9IGZpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGZpbmRMYXlvdXQoZm5sYXlvdXQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLiNmaW5kZXJMYXlvdXQoZm5sYXlvdXQpO1xuICAgIH1cblxuICAgIGZpbmRMYXlvdXRTeW5jKGZubGF5b3V0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4jZmluZGVyTGF5b3V0U3luYyhmbmxheW91dCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8gUmVuZGVyZXJzXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGxpc3Qgb2YgcmVnaXN0ZXJlZCByZW5kZXJlcnNcbiAgICAgKi9cbiAgICBnZXQgcmVuZGVyZXJzKCk6IEFycmF5PFJlbmRlcmVyPiB7IHJldHVybiB0aGlzLiNyZW5kZXJlcnM7IH1cblxuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIHJlZ2lzdGVyUmVuZGVyZXIoQElzUmVuZGVyZXIoKSByZW5kZXJlcjogUmVuZGVyZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEocmVuZGVyZXIgaW5zdGFuY2VvZiBSZW5kZXJlcikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdCBBIFJlbmRlcmVyICcrIHV0aWwuaW5zcGVjdChyZW5kZXJlcikpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgYSBSZW5kZXJlciAke3V0aWwuaW5zcGVjdChyZW5kZXJlcil9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmZpbmRSZW5kZXJlck5hbWUocmVuZGVyZXIubmFtZSkpIHtcbiAgICAgICAgICAgIHJlbmRlcmVyLmNvbmZpZyA9IHRoaXM7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcmVnaXN0ZXJSZW5kZXJlciBgLCByZW5kZXJlcik7XG4gICAgICAgICAgICB0aGlzLiNyZW5kZXJlcnMucHVzaChyZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBhbiBhcHBsaWNhdGlvbiB0byBvdmVycmlkZSBvbmUgb2YgdGhlIGJ1aWx0LWluIHJlbmRlcmVyc1xuICAgICAqIHRoYXQgYXJlIGluaXRpYWxpemVkIGJlbG93LiAgVGhlIGluc3BpcmF0aW9uIGlzIGVwdWJ0b29scyB0aGF0XG4gICAgICogbXVzdCB3cml0ZSBIVE1MIGZpbGVzIHdpdGggYW4gLnhodG1sIGV4dGVuc2lvbi4gIFRoZXJlZm9yZSBpdFxuICAgICAqIGNhbiBzdWJjbGFzcyBFSlNSZW5kZXJlciBldGMgd2l0aCBpbXBsZW1lbnRhdGlvbnMgdGhhdCBmb3JjZSB0aGVcbiAgICAgKiBmaWxlIG5hbWUgdG8gYmUgLnhodG1sLiAgV2UncmUgbm90IGNoZWNraW5nIGlmIHRoZSByZW5kZXJlciBuYW1lXG4gICAgICogaXMgYWxyZWFkeSB0aGVyZSBpbiBjYXNlIGVwdWJ0b29scyBtdXN0IHVzZSB0aGUgc2FtZSByZW5kZXJlciBuYW1lLlxuICAgICAqL1xuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIHJlZ2lzdGVyT3ZlcnJpZGVSZW5kZXJlcihASXNSZW5kZXJlcigpIHJlbmRlcmVyOiBSZW5kZXJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIShyZW5kZXJlciBpbnN0YW5jZW9mIFJlbmRlcmVyKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm90IEEgUmVuZGVyZXIgJysgdXRpbC5pbnNwZWN0KHJlbmRlcmVyKSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBhIFJlbmRlcmVyICR7dXRpbC5pbnNwZWN0KHJlbmRlcmVyKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJlci5jb25maWcgPSB0aGlzO1xuICAgICAgICB0aGlzLiNyZW5kZXJlcnMudW5zaGlmdChyZW5kZXJlcik7XG4gICAgfVxuXG4gICAgZmluZFJlbmRlcmVyTmFtZShuYW1lOiBzdHJpbmcpOiBSZW5kZXJlciB7XG4gICAgICAgIGZvciAodmFyIHIgb2YgdGhpcy4jcmVuZGVyZXJzKSB7XG4gICAgICAgICAgICBpZiAoci5uYW1lID09PSBuYW1lKSByZXR1cm4gcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZpbmRSZW5kZXJlclBhdGgoX3BhdGg6IHN0cmluZyk6IFJlbmRlcmVyIHtcbiAgICAgICAgLy8gbG9nKGBmaW5kUmVuZGVyZXJQYXRoICR7X3BhdGh9YCk7XG4gICAgICAgIGZvciAodmFyIHIgb2YgdGhpcy4jcmVuZGVyZXJzKSB7XG4gICAgICAgICAgICBpZiAoci5tYXRjaChfcGF0aCkpIHJldHVybiByO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBmaW5kUmVuZGVyZXJQYXRoIE5PIFJFTkRFUkVSIGZvciAke19wYXRofWApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyQnVpbHRJblJlbmRlcmVycygpIHtcbiAgICAgICAgLy8gUmVnaXN0ZXIgYnVpbHQtaW4gcmVuZGVyZXJzXG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgTWFya2Rvd25SZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBBc2NpaWRvY1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IEVKU1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IExpcXVpZFJlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IE51bmp1Y2tzUmVuZGVyZXIoKSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZW5kZXJlcihuZXcgSGFuZGxlYmFyc1JlbmRlcmVyKCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUmVuZGVyZXIobmV3IENTU0xFU1NSZW5kZXJlcigpKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJlbmRlcmVyKG5ldyBKU09OUmVuZGVyZXIoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZCBhIFJlbmRlcmVyIGJ5IGl0cyBleHRlbnNpb24uXG4gICAgICovXG4gICAgZmluZFJlbmRlcmVyKG5hbWU6IHN0cmluZyk6IFJlbmRlcmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFJlbmRlcmVyTmFtZShuYW1lKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLyBGaW5kIExheW91dHMgb3IgUGFydGlhbHNcblxuICAgICNwYXJ0aWFsOiAoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAgICNwYXJ0aWFsU3luYzogKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpID0+IHN0cmluZztcblxuICAgIHNldCBwYXJ0aWFsRnVuYyhwZnVuYzogKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpID0+IFByb21pc2U8c3RyaW5nPikge1xuICAgICAgICB0aGlzLiNwYXJ0aWFsID0gcGZ1bmM7XG4gICAgfVxuXG4gICAgc2V0IHBhcnRpYWxGdW5jU3luYyhwZnVuYzogKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpID0+IHN0cmluZykge1xuICAgICAgICB0aGlzLiNwYXJ0aWFsU3luYyA9IHBmdW5jO1xuICAgIH1cblxuICAgIEBWYWxpZGF0ZVBhcmFtc1xuICAgIGFzeW5jIHBhcnRpYWwoXG4gICAgICAgIEBJc1N0cmluZygpIGZuYW1lOiBzdHJpbmcsXG4gICAgICAgIEBJc09iamVjdCgpIG1ldGFkYXRhOiBhbnkpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLiNwYXJ0aWFsKGZuYW1lLCBtZXRhZGF0YSk7XG4gICAgfVxuXG4gICAgQFZhbGlkYXRlUGFyYW1zXG4gICAgcGFydGlhbFN5bmMoXG4gICAgICAgIEBJc1N0cmluZygpIGZuYW1lOiBzdHJpbmcsXG4gICAgICAgIEBJc09iamVjdCgpIG1ldGFkYXRhOiBhbnkpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLiNwYXJ0aWFsU3luYyhmbmFtZSwgbWV0YWRhdGEpO1xuICAgIH1cblxufVxuXG4vLyBDdXN0b20gdmFsaWRhdG9yc1xuXG5mdW5jdGlvbiBpc1N0cmluZyhzOiBzdHJpbmcpIHtcbiAgICBpZiAoIXMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoISh0eXBlb2YgcyA9PT0gJ3N0cmluZycpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzU3RyaW5nKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVZhbGlkYXRpb25EZWNvcmF0b3IoXG4gICAgICAgIGlzU3RyaW5nLFxuICAgICAgICBgVmFsdWUgOnZhbHVlOiBpcyBub3QgYSBzdHJpbmdgKTtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoczogYW55KSB7XG4gICAgaWYgKCFzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCEodHlwZW9mIHMgPT09ICdvYmplY3QnKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBJc09iamVjdCgpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yKFxuICAgICAgICBpc09iamVjdCxcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGFuIG9iamVjdGApO1xufVxuXG5cbmZ1bmN0aW9uIGlzUmVuZGVyZXIocikge1xuICAgIGlmICghcikgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghKHR5cGVvZiByID09PSAnb2JqZWN0JykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIShyIGluc3RhbmNlb2YgUmVuZGVyZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlVmFsaWRhdGlvbkRlY29yYXRvcihcbiAgICAgICAgaXNSZW5kZXJlcixcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGEgUmVuZGVyZXJgKTtcbn1cblxuZnVuY3Rpb24gaXNQYXRoQXJyYXkoYXJ5KSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFyeSkpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IHAgb2YgYXJ5KSB7XG4gICAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHApKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBJc1BhdGhBcnJheSgpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGVWYWxpZGF0aW9uRGVjb3JhdG9yKFxuICAgICAgICBpc1BhdGhBcnJheSxcbiAgICAgICAgYFZhbHVlIDp2YWx1ZTogaXMgbm90IGEgUGF0aCBBcnJheWApO1xufVxuXG5mdW5jdGlvbiBpc0Fic29sdXRlUGF0aChwKSB7XG4gICAgaWYgKCEodHlwZW9mIHAgPT09ICdzdHJpbmcnKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghcGF0aC5pc0Fic29sdXRlKHApKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIElzQWJzb2x1dGVQYXRoKCkge1xuICAgIHJldHVybiBnZW5lcmF0ZVZhbGlkYXRpb25EZWNvcmF0b3IoXG4gICAgICAgIGlzQWJzb2x1dGVQYXRoLFxuICAgICAgICBgVmFsdWUgOnZhbHVlOiBpcyBub3QgYW4gQWJzb2x1dGUgUGF0aGApO1xufVxuXG4vLyBEZWZhdWx0IFBhcnRpYWwvTGF5b3V0IGZpbmRlciBmdW5jdGlvbnNcblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdEZpbmRMYXlvdXQoZm5sYXlvdXQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGZvciAoY29uc3QgbGRpciBvZiB0aGlzLmxheW91dERpcnMpIHtcbiAgICAgICAgY29uc3QgbHBhdGggPSBwYXRoLmpvaW4obGRpciwgZm5sYXlvdXQpO1xuICAgICAgICBsZXQgbHN0YXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsc3RhdCA9IGF3YWl0IGZzcC5zdGF0KGxwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IGxzdGF0ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIGlmIChsc3RhdCkge1xuICAgICAgICAgICAgaWYgKGxzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRGaW5kTGF5b3V0U3luYyhmbmxheW91dCk6IHN0cmluZyB7XG4gICAgZm9yIChjb25zdCBsZGlyIG9mIHRoaXMubGF5b3V0RGlycykge1xuICAgICAgICBjb25zdCBscGF0aCA9IHBhdGguam9pbihsZGlyLCBmbmxheW91dCk7XG4gICAgICAgIGxldCBsc3RhdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxzdGF0ID0gZnMuc3RhdFN5bmMobHBhdGgpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHsgbHN0YXQgPSB1bmRlZmluZWQ7IH1cbiAgICAgICAgaWYgKGxzdGF0KSB7XG4gICAgICAgICAgICBpZiAobHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdEZpbmRQYXJ0aWFsKGZucGFydGlhbCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgLy8gY29uc29sZS5sb2coYGRlZmF1bHRGaW5kUGFydGlhbCAke2ZucGFydGlhbH1gLCB0aGlzLnBhcnRpYWxEaXJzKTtcbiAgICBmb3IgKGNvbnN0IHBkaXIgb2YgdGhpcy5wYXJ0aWFsRGlycykge1xuICAgICAgICBjb25zdCBwcGF0aCA9IHBhdGguam9pbihwZGlyLCBmbnBhcnRpYWwpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgZGVmYXVsdEZpbmRQYXJ0aWFsIGRvZXMgJHtwcGF0aH0gZXhpc3QgZm9yICR7Zm5wYXJ0aWFsfT9gKTtcbiAgICAgICAgbGV0IHBzdGF0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHN0YXQgPSBhd2FpdCBmc3Auc3RhdChwcGF0aCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikgeyBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoYHN0YXQgZm9yICR7cHBhdGh9IGZhaWxlZCBgLCBlcnIpO1xuICAgICAgICAgICAgcHN0YXQgPSB1bmRlZmluZWQ7IFxuICAgICAgICB9XG4gICAgICAgIGlmIChwc3RhdCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGRlZmF1bHRGaW5kUGFydGlhbCAke3BwYXRofSBzdGF0c2AsIHBzdGF0KTtcbiAgICAgICAgICAgIGlmIChwc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBkZWZhdWx0RmluZFBhcnRpYWwgJHtwcGF0aH0gZXhpc3RzYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRGaW5kUGFydGlhbFN5bmMoZm5wYXJ0aWFsKTogc3RyaW5nIHtcbiAgICBmb3IgKGNvbnN0IHBkaXIgb2YgdGhpcy5wYXJ0aWFsRGlycykge1xuICAgICAgICBjb25zdCBwcGF0aCA9IHBhdGguam9pbihwZGlyLCBmbnBhcnRpYWwpO1xuICAgICAgICBsZXQgcHN0YXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwc3RhdCA9IGZzLnN0YXRTeW5jKHBwYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7IHBzdGF0ID0gdW5kZWZpbmVkOyB9XG4gICAgICAgIGlmIChwc3RhdCkge1xuICAgICAgICAgICAgaWYgKHBzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdFBhcnRpYWwoZm5hbWU6IHN0cmluZywgbWV0YWRhdGE6IGFueSkge1xuICAgIFxuICAgIGNvbnN0IGZvdW5kID0gYXdhaXQgdGhpcy5maW5kUGFydGlhbChmbmFtZSk7XG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHBhcnRpYWwgZm91bmQgZm9yICR7Zm5hbWV9IGluICR7dXRpbC5pbnNwZWN0KHRoaXMucGFydGlhbERpcnMpfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5maW5kUmVuZGVyZXJQYXRoKGZuYW1lKTtcbiAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgIGlmIChmbmFtZS5lbmRzV2l0aCgnLmh0bWwnKSB8fCBmbmFtZS5lbmRzV2l0aCgnLnhodG1sJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmc3AucmVhZEZpbGUoZm91bmQsICd1dGYtOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkZWZhdWx0UGFydGlhbCBubyBSZW5kZXJlciBmb3VuZCBmb3IgJHtmbmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gYXdhaXQgZnNwLnJlYWRGaWxlKGZvdW5kLCAndXRmLTgnKTtcblxuICAgICAgICAvLyBTb21lIHJlbmRlcmVycyAoTnVuanVrcykgcmVxdWlyZSB0aGF0IG1ldGFkYXRhLmNvbmZpZ1xuICAgICAgICAvLyBwb2ludCB0byB0aGUgY29uZmlnIG9iamVjdC4gIFRoaXMgYmxvY2sgb2YgY29kZVxuICAgICAgICAvLyBkdXBsaWNhdGVzIHRoZSBtZXRhZGF0YSBvYmplY3QsIHRoZW4gc2V0cyB0aGVcbiAgICAgICAgLy8gY29uZmlnIGZpZWxkIGluIHRoZSBkdXBsaWNhdGUsIHBhc3NpbmcgdGhhdCB0byB0aGUgcGFydGlhbC5cbiAgICAgICAgbGV0IG1kYXRhID0ge307XG4gICAgICAgIGxldCBwcm9wO1xuXG4gICAgICAgIGZvciAocHJvcCBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgbWRhdGFbcHJvcF0gPSBtZXRhZGF0YVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIG1kYXRhLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgbWRhdGFbJ3BhcnRpYWxTeW5jJ10gPSB0aGlzLnBhcnRpYWxTeW5jLmJpbmQodGhpcyk7XG4gICAgICAgIG1kYXRhWydwYXJ0aWFsJ10gICAgID0gdGhpcy5wYXJ0aWFsLmJpbmQodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLnJlbmRlcig8UmVuZGVyaW5nQ29udGV4dD57XG4gICAgICAgICAgICBjb250ZW50OiBwQ29udGVudCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiBtZGF0YSxcbiAgICAgICAgICAgIGZzcGF0aDogZm91bmRcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZGVmYXVsdFBhcnRpYWxTeW5jKGZuYW1lOiBzdHJpbmcsIG1ldGFkYXRhOiBhbnkpIHtcbiAgICBcbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuZmluZFBhcnRpYWxTeW5jKGZuYW1lKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcGFydGlhbCBmb3VuZCBmb3IgJHtmbmFtZX0gaW4gJHt1dGlsLmluc3BlY3QodGhpcy5wYXJ0aWFsRGlycyl9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmZpbmRSZW5kZXJlclBhdGgoZm5hbWUpO1xuICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgaWYgKGZuYW1lLmVuZHNXaXRoKCcuaHRtbCcpIHx8IGZuYW1lLmVuZHNXaXRoKCcueGh0bWwnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZzcC5yZWFkRmlsZShmb3VuZCwgJ3V0Zi04Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRlZmF1bHRQYXJ0aWFsIG5vIFJlbmRlcmVyIGZvdW5kIGZvciAke2ZuYW1lfWApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcENvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZm91bmQsICd1dGYtOCcpO1xuXG4gICAgICAgIC8vIFNvbWUgcmVuZGVyZXJzIChOdW5qdWtzKSByZXF1aXJlIHRoYXQgbWV0YWRhdGEuY29uZmlnXG4gICAgICAgIC8vIHBvaW50IHRvIHRoZSBjb25maWcgb2JqZWN0LiAgVGhpcyBibG9jayBvZiBjb2RlXG4gICAgICAgIC8vIGR1cGxpY2F0ZXMgdGhlIG1ldGFkYXRhIG9iamVjdCwgdGhlbiBzZXRzIHRoZVxuICAgICAgICAvLyBjb25maWcgZmllbGQgaW4gdGhlIGR1cGxpY2F0ZSwgcGFzc2luZyB0aGF0IHRvIHRoZSBwYXJ0aWFsLlxuICAgICAgICBsZXQgbWRhdGEgPSB7fTtcbiAgICAgICAgbGV0IHByb3A7XG5cbiAgICAgICAgZm9yIChwcm9wIGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICBtZGF0YVtwcm9wXSA9IG1ldGFkYXRhW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gbWRhdGEuY29uZmlnID0gY29uZmlnO1xuICAgICAgICBtZGF0YVsncGFydGlhbFN5bmMnXSA9IHRoaXMucGFydGlhbFN5bmMuYmluZCh0aGlzKTtcbiAgICAgICAgbWRhdGFbJ3BhcnRpYWwnXSAgICAgPSB0aGlzLnBhcnRpYWwuYmluZCh0aGlzKTtcblxuICAgICAgICByZXR1cm4gcmVuZGVyZXIucmVuZGVyU3luYyg8UmVuZGVyaW5nQ29udGV4dD57XG4gICAgICAgICAgICBjb250ZW50OiBwQ29udGVudCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiBtZGF0YSxcbiAgICAgICAgICAgIGZzcGF0aDogZm91bmRcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=