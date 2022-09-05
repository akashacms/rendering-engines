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


import { promises as fsp } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

import { Configuration, RenderingContext } from './index';

const _renderer_regex = Symbol('regex');
const _renderer_akasha = Symbol('akasha');
const _renderer_config = Symbol('config');

// TODO - pass to child classes array of partial dirs, and layout dirs
//      - define an object to pass instead of vpinfo - what fields does
//        this object need?
//        "fspath" - filesystem path (EJSRenderer)

export class Renderer {

    #name: string;
    #config: Configuration;

    constructor(name: string, regex: String | RegExp) {
        this.#name  = name;
        if (regex instanceof RegExp) {
            this[_renderer_regex] = [ regex ];
        } else if (regex instanceof Array) {
            this[_renderer_regex] = regex;
        } else {
            throw new Error('regex must be RegExp or Array of RegExp');
        }
        this.#config = undefined;
    }

    get config(): Configuration { return this.#config; }
    set config(_config: Configuration) { this.#config = _config; }

    get partialDirs(): Array<string> { return this.config.partialDirs; }

    get layoutDirs(): Array<string> { return this.config.layoutDirs; }
    
    get name(): string { return this.#name; }
    get regex(): Array<RegExp> { return this[_renderer_regex]; }

    match(fname): boolean {
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

    filePath(fname): string {
        // log(`${this._name} filePath ${fname}`);
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                return matches[1];
            }
        }
        return null;
    }

    sourcePathMatchRenderPath(sourcePath, rendersTo): boolean {
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

    fileExtension(fname): string {
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                return matches[2];
            }
        }
        return null;
    }

    async readFile(basedir, fpath): Promise<string> {
        return fsp.readFile(path.join(basedir, fpath), 'utf8');
    }

    readFileSync(basedir, fpath): string {
        return fs.readFileSync(path.join(basedir, fpath), 'utf8');
    }

    async writeFile(renderTo, fpath, text) {
        return fsp.writeFile(path.join(renderTo, fpath), text, 'utf8');
    }

    writeFileSync(renderTo, fpath, text) {
        return fs.writeFileSync(path.join(renderTo, fpath), text, 'utf8');
    }

    render(context: RenderingContext /*, text, metadata, vpinfo: DocumentInfo */) {
        throw new Error('implement render method');
    }

    renderSync(context: RenderingContext /*, text, metadata, vpinfo: DocumentInfo */) {
        throw new Error('implement renderSync method');
    }

    /* renderToFile(dir, fpath, renderTo, renderToPlus, metadata, config) {
        throw new Error('implement renderToFile method');
    } */

}

export type DocumentInfo = {
    fspath: string;
    vpath: string;
}