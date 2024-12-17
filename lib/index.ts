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

import * as util from 'util';
import * as path from 'path';
import { promises as fsp } from 'fs';
import * as fs from 'fs';

import { Renderer } from './Renderer';
import { HTMLRenderer } from './HTMLRenderer';
import { AsciidocRenderer } from './render-asciidoc';
import { CSSLESSRenderer } from './render-cssless';
import { EJSRenderer } from './render-ejs';
import { HandlebarsRenderer } from './render-handlebars';
import { JSONRenderer } from './render-json';
import { LiquidRenderer } from './render-liquid';
import { MarkdownRenderer } from './render-md';
// import { MarkdocRenderer } from './render-markdoc';
import { NunjucksRenderer } from './render-nunjucks';

export { Renderer, parseFrontmatter } from './Renderer';

export { AsciidocRenderer } from './render-asciidoc';
export { CSSLESSRenderer } from './render-cssless';
export { EJSRenderer } from './render-ejs';
export { HandlebarsRenderer } from './render-handlebars';
export { JSONRenderer } from './render-json';
export { LiquidRenderer } from './render-liquid';
export { MarkdownRenderer } from './render-md';
// export { MarkdocRenderer } from './render-markdoc';
export { NunjucksRenderer } from './render-nunjucks';

import {
    IsIntRange, IsInt, IsFloatRange, IsFloat,
    generateValidationDecorator,
    ValidateParams, ValidateAccessor,
} from 'runtime-data-validation';


// TODO -DONE require a container class to hold the list of renderers
//      -DONE allow Renderers to be added by other code
//      - contain configuration for things
//
// Configuration - functions to find assets/documents/partials/layouts
//               - function to write rendered file
//               - functions - partial - partialSync
//
// Mahafunc for <partial>

export type ConfigurationParams = {
    partialDirs?: Array<string>;
    findPartial?: (fn) => Promise<string>;
    findPartialSync?: (fn) => string;
    layoutDirs?: Array<string>;
    findLayout?: (fn) => Promise<string>;
    findLayoutSync?: (fn) => string;

    partial?: (fn, metadata) => Promise<string>;
    partialSync?: (fn, metadata) => string;
};

export type RenderingContext = {
    fspath?: string;   // Pathname that can be given to template engines for error messages
    content: string;   // Content to render
    body?: string;     // Content body after parsing frontmatter

    renderTo?: string;  // Pathname for rendering output

    metadata: any;  // Data to be used for satisfying variables in templates
};

export enum RenderingFormat {
    HTML = 'HTML',
    PHP  = 'PHP',
    JSON = 'JSON',
    CSS  = 'CSS',
    JS   = 'JS'
};

export class Configuration {

    #renderers;
    #partialDirs;
    #layoutDirs;

    constructor(params?: ConfigurationParams) {
        this.#renderers = [];
        this.#partialDirs = [];
        this.#layoutDirs = [];

        /*
         * Is this the best place for this?  It is necessary to
         * call this function somewhere.  The nature of this function
         * is that it can be called multiple times with no impact.  
         * By being located here, it will always be called by the
         * time any Configuration is generated.
         */
        this.registerBuiltInRenderers();

        if (params && params.partialDirs) this.#partialDirs = params.partialDirs;
        if (params && params.layoutDirs)  this.#layoutDirs  = params.layoutDirs;

        // console.log(`Renderers Configuration constructor layoutDirs `, util.inspect(this.#layoutDirs));
        this.#finderPartial = (params && params.findPartial)
                    ? params.findPartial
                    : defaultFindPartial.bind(this);
        
        this.#finderPartialSync = (params && params.findPartialSync)
                    ? params.findPartialSync
                    : defaultFindPartialSync.bind(this);


        this.#finderLayout = (params && params.findLayout)
                    ? params.findLayout
                    : defaultFindLayout.bind(this);

        this.#finderLayoutSync = (params && params.findLayoutSync)
                    ? params.findLayoutSync
                    : defaultFindLayoutSync.bind(this);
        
        this.#partial = (params && params.partial)
                    ? params.partial
                    : defaultPartial.bind(this);

        this.#partialSync = (params && params.partialSync)
                    ? params.partialSync
                    : defaultPartialSync.bind(this);
    }

    /**
     * An array of absolute paths to directories containing
     * partial templates.
     */
    @ValidateAccessor<Array<string>>()
    @IsPathArray()
    set partialDirs(dirz: Array<string>) { this.#partialDirs = dirz; }
    get partialDirs() /*: Array<string> */ { return this.#partialDirs; }

    /**
     * Add an absolute pathname for a directory to find partial templates.
     * @param dir 
     */
    // @ValidateParams
    addPartialDir(/* @IsAbsolutePath() */ dir: string): void {
        this.#partialDirs.push(dir);
    }

    #finderPartial: (fnpartial) => Promise<string>;
    #finderPartialSync: (fnpartial) => string;

    /**
     * Store a function for finding partial templates.
     */
    set partialFinder(finder: (fnpartial) => Promise<string>) {
        if (finder && typeof finder === 'function') {
            this.#finderPartial = finder;
        }
    }

    /**
     * Store a function for finding partial templates.
     */
    set partialFinderSync(finder: (fnpartial) => string) {
        if (finder && typeof finder === 'function') {
            this.#finderPartialSync = finder;
        }
    }

    async findPartial(fnpartial: string): Promise<string> {
        return this.#finderPartial(fnpartial);
    }

    findPartialSync(fnpartial: string): string {
        return this.#finderPartialSync(fnpartial);
    }

    /**
     * An array of absolute paths to directories containing
     * layout templates.
     */
    @ValidateAccessor<Array<string>>()
    @IsPathArray()
    set layoutDirs(dirz: Array<string>) { this.#layoutDirs = dirz; }
    get layoutDirs(): Array<string> { return this.#layoutDirs; }

    /**
     * Add an absolute pathname for a directory to find layout templates.
     * @param dir 
     */
    // @ValidateParams
    addLayoutDir(/* @IsAbsolutePath() */ dir: string): void {
        this.#layoutDirs.push(dir);
    }

    #finderLayout: (fnlayout) => Promise<string>;
    #finderLayoutSync: (fnlayout) => string;

    /**
     * Store a function for finding layout templates
     * @param finder
     */
    set layoutFinder(finder: (fnlayout) => Promise<string>) {
        if (finder && typeof finder === 'function') {
            this.#finderLayout = finder;
        }
    }

    /**
     * Store a function for finding layout templates
     * @param finder
     */
    set layoutFinderSync(finder: (fnlayout) => string) {
        if (finder && typeof finder === 'function') {
            this.#finderLayoutSync = finder;
        }
    }

    /**
     * Find a layout template, supporting asynchronous execution
     * 
     * @param fnlayout 
     * @returns 
     */
    async findLayout(fnlayout: string): Promise<string> {
        return this.#finderLayout(fnlayout);
    }

    /**
     * Find a layout template, supporting synchronous execution
     * 
     * @param fnlayout 
     * @returns 
     */
    findLayoutSync(fnlayout: string): string {
        return this.#finderLayoutSync(fnlayout);
    }

    //////// Renderers

    /**
     * Return the list of registered renderers
     */
    get renderers(): Array<Renderer> { return this.#renderers; }

    @ValidateParams
    registerRenderer(@IsRenderer() renderer: Renderer): void {
        if (!(renderer instanceof Renderer)) {
            console.error('Not A Renderer '+ util.inspect(renderer));
            throw new Error(`Not a Renderer ${util.inspect(renderer)}`);
        }
        if (!this.findRendererName(renderer.name)) {
            renderer.config = this;
            // console.log(`registerRenderer `, renderer);
            this.#renderers.push(renderer);
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
    @ValidateParams
    registerOverrideRenderer(@IsRenderer() renderer: Renderer): void {
        if (!(renderer instanceof Renderer)) {
            console.error('Not A Renderer '+ util.inspect(renderer));
            throw new Error(`Not a Renderer ${util.inspect(renderer)}`);
        }
        renderer.config = this;
        this.#renderers.unshift(renderer);
    }

    @ValidateParams
    findRendererName(@IsString() name: string): Renderer {
        for (var r of this.#renderers) {
            if (r.name === name) return r;
        }
        return undefined;
    }

    @ValidateParams
    findRendererPath(@IsString() _path: string): Renderer {
        // log(`findRendererPath ${_path}`);
        for (var r of this.#renderers) {
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
        this.registerRenderer(new MarkdownRenderer());
        this.registerRenderer(new AsciidocRenderer());
        // this.registerRenderer(new MarkdocRenderer());
        this.registerRenderer(new EJSRenderer());
        this.registerRenderer(new LiquidRenderer());
        this.registerRenderer(new NunjucksRenderer());
        this.registerRenderer(new HandlebarsRenderer());
        this.registerRenderer(new CSSLESSRenderer());
        this.registerRenderer(new JSONRenderer());
    }

    /**
     * Find a Renderer by its extension.
     */
    @ValidateParams
    findRenderer(@IsString() name: string): Renderer {
        return this.findRendererName(name);
    }

    //////// Find Layouts or Partials

    #partial: (fname: string, metadata: any) => Promise<string>;
    #partialSync: (fname: string, metadata: any) => string;

    set partialFunc(pfunc: (fname: string, metadata: any) => Promise<string>) {
        this.#partial = pfunc;
    }

    set partialFuncSync(pfunc: (fname: string, metadata: any) => string) {
        this.#partialSync = pfunc;
    }

    @ValidateParams
    async partial(
        @IsString() fname: string,
        /* @IsObject() */ metadata: any) {
        
        return this.#partial(fname, metadata);
    }

    @ValidateParams
    partialSync(
        @IsString() fname: string,
        /* @IsObject() */ metadata: any) {
        
        return this.#partialSync(fname, metadata);
    }

}

// Custom validators

function isString(s: string) {
    if (!s) return false;
    if (!(typeof s === 'string')) return false;
    return true;
}

function IsString() {
    return generateValidationDecorator(
        isString,
        `Value :value: is not a string`);
}

function isObject(s: any) {
    if (!s) return false;
    if (!(typeof s === 'object')) return false;
    return true;
}

function IsObject() {
    return generateValidationDecorator(
        isObject,
        `Value :value: is not an object`);
}


function isRenderer(r) {
    if (!r) return false;
    if (!(typeof r === 'object')) return false;
    if (!(r instanceof Renderer)) return false;
    return true;
}

function IsRenderer() {
    return generateValidationDecorator(
        isRenderer,
        `Value :value: is not a Renderer`);
}

function isPathArray(ary) {
    if (!Array.isArray(ary)) return false;
    for (const p of ary) {
        if (!path.isAbsolute(p)) return false;
    }
    return true;
}

function IsPathArray() {
    return generateValidationDecorator(
        isPathArray,
        `Value :value: is not a Path Array`);
}

function isAbsolutePath(p) {
    if (!(typeof p === 'string')) return false;
    if (!path.isAbsolute(p)) return false;
    return true;
}

function IsAbsolutePath() {
    return generateValidationDecorator(
        isAbsolutePath,
        `Value :value: is not an Absolute Path`);
}

// Default Partial/Layout finder functions

async function defaultFindLayout(fnlayout): Promise<string> {
    for (const ldir of this.layoutDirs) {
        const lpath = path.join(ldir, fnlayout);
        let lstat;
        try {
            lstat = await fsp.stat(lpath);
        } catch (err) { lstat = undefined; }
        if (lstat) {
            if (lstat.isFile()) {
                return lpath;
            }
        }
    }
    return undefined;
}

function defaultFindLayoutSync(fnlayout): string {
    for (const ldir of this.layoutDirs) {
        const lpath = path.join(ldir, fnlayout);
        let lstat;
        try {
            lstat = fs.statSync(lpath);
        } catch (err) { lstat = undefined; }
        if (lstat) {
            if (lstat.isFile()) {
                return lpath;
            }
        }
    }
    return undefined;
}

async function defaultFindPartial(fnpartial): Promise<string> {
    // console.log(`defaultFindPartial ${fnpartial}`, this.partialDirs);
    for (const pdir of this.partialDirs) {
        const ppath = path.join(pdir, fnpartial);
        // console.log(`defaultFindPartial does ${ppath} exist for ${fnpartial}?`);
        let pstat;
        try {
            pstat = await fsp.stat(ppath);
        } catch (err) { 
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

function defaultFindPartialSync(fnpartial): string {
    for (const pdir of this.partialDirs) {
        const ppath = path.join(pdir, fnpartial);
        let pstat;
        try {
            pstat = fs.statSync(ppath);
        } catch (err) { pstat = undefined; }
        if (pstat) {
            if (pstat.isFile()) {
                return ppath;
            }
        }
    }
    return undefined;
}


async function defaultPartial(fname: string, metadata: any) {
    
    const found = await this.findPartial(fname);
    if (!found) {
        throw new Error(`No partial found for ${fname} in ${util.inspect(this.partialDirs)}`);
    }

    const renderer = this.findRendererPath(fname);
    if (!renderer) {
        if (fname.endsWith('.html') || fname.endsWith('.xhtml')) {
            return fsp.readFile(found, 'utf-8');
        } else {
            throw new Error(`defaultPartial no Renderer found for ${fname}`);
        }
    } else {
        const pContent = await fsp.readFile(found, 'utf-8');

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
        mdata['partial']     = this.partial.bind(this);

        return renderer.render(<RenderingContext>{
            content: pContent,
            metadata: mdata,
            fspath: found
        });

    }
}


function defaultPartialSync(fname: string, metadata: any) {
    
    const found = this.findPartialSync(fname);
    if (!found) {
        throw new Error(`No partial found for ${fname} in ${util.inspect(this.partialDirs)}`);
    }

    const renderer = this.findRendererPath(fname);
    if (!renderer) {
        if (fname.endsWith('.html') || fname.endsWith('.xhtml')) {
            return fs.readFileSync(found, 'utf-8');
        } else {
            throw new Error(`defaultPartial no Renderer found for ${fname}`);
        }
    } else {
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
        mdata['partial']     = this.partial.bind(this);

        return renderer.renderSync(<RenderingContext>{
            content: pContent,
            metadata: mdata,
            fspath: found
        });

    }
}
