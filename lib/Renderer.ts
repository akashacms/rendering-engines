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


import { promises as fsp } from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

import {
    Configuration, RenderingContext, RenderingFormat
} from './index';

export class Renderer {

    #name: string;
    #config: Configuration;
    #regex: Array<RegExp>;

    constructor(name: string, regex: String | RegExp) {
        this.#name  = name;
        if (regex instanceof RegExp) {
            this.#regex = [ regex ];
        } else if (regex instanceof Array) {
            this.#regex = regex;
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
    get regex(): Array<RegExp> { return this.#regex; }

    /**
     * Test whether the file name matches a known Renderer.
     * 
     * @param fname 
     * @returns 
     */
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
    filePath(fname): string {
        // log(`${this._name} filePath ${fname}`);
        var matches;
        for (var regex of this.regex) {
            if ((matches = fname.match(regex)) !== null) {
                // console.log(`filePath ${fname} `, matches);
                return typeof matches[1] !== 'undefined'
                    ? matches[1]
                    // Substitute the renderFormat
                    // for the desired extension
                    : matches[3] +'.'+ this.renderFormat({
                        fspath: fname,
                        content: '',
                        metadata: {}
                    }).toLowerCase();
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

    /**
     * Compute the file extension from the input file name.
     * 
     * @param fname 
     * @returns 
     */
    fileExtension(fname): string {
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
    parseMetadata(context: RenderingContext): RenderingContext {
        return context;
    }

    /**
     * Render input data allowing for asynchronous execution,
     * producing output data.
     * 
     * @param context 
     */
    async render(context: RenderingContext): Promise<string> {
        throw new Error('implement render method');
    }

    /**
     * Render input data using only synchronous code, producing
     * output data.  Some execution contexts can only run
     * synchronous code.
     * 
     * @param context 
     */
    renderSync(context: RenderingContext): string {
        throw new Error('implement renderSync method');
    }

    /**
     * Indicate the sort of output produced when rendering
     * a file described in the rendering context.
     * 
     * @param context 
     */
    renderFormat(context: RenderingContext): RenderingFormat {
        throw new Error('Implement renderFormat');
    }

    /* renderToFile(dir, fpath, renderTo, renderToPlus, metadata, config) {
        throw new Error('implement renderToFile method');
    } */

}

/**
 * Parse frontmatter in the format of lines of dashes
 * surrounding a YAML structure.
 * 
 * @param context 
 * @returns 
 */
export function parseFrontmatter(context: RenderingContext) {

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
}
