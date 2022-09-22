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
import { Configuration, RenderingContext, RenderingFormat } from './index';
export declare class Renderer {
    #private;
    constructor(name: string, regex: String | RegExp);
    get config(): Configuration;
    set config(_config: Configuration);
    get partialDirs(): Array<string>;
    get layoutDirs(): Array<string>;
    get name(): string;
    get regex(): Array<RegExp>;
    /**
     * Test whether the file name matches a known Renderer.
     *
     * @param fname
     * @returns
     */
    match(fname: any): boolean;
    /**
     * Compute the pathname which a given input file should
     * have after being rendered.
     *
     * For example, an input file `example.html.md` would
     * have an output file name `example.html`.
     *
     * @param fname
     * @returns
     */
    filePath(fname: any): string;
    sourcePathMatchRenderPath(sourcePath: any, rendersTo: any): boolean;
    /**
     * Compute the file extension from the input file name.
     *
     * @param fname
     * @returns
     */
    fileExtension(fname: any): string;
    readFile(basedir: any, fpath: any): Promise<string>;
    readFileSync(basedir: any, fpath: any): string;
    writeFile(renderTo: any, fpath: any, text: any): Promise<void>;
    writeFileSync(renderTo: any, fpath: any, text: any): void;
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
    parseMetadata(context: RenderingContext): RenderingContext;
    /**
     * Render input data allowing for asynchronous execution,
     * producing output data.
     *
     * @param context
     */
    render(context: RenderingContext): Promise<string>;
    /**
     * Render input data using only synchronous code, producing
     * output data.  Some execution contexts can only run
     * synchronous code.
     *
     * @param context
     */
    renderSync(context: RenderingContext): string;
    /**
     * Indicate the sort of output produced when rendering
     * a file described in the rendering context.
     *
     * @param context
     */
    renderFormat(context: RenderingContext): RenderingFormat;
}
/**
 * Parse frontmatter in the format of lines of dashes
 * surrounding a YAML structure.
 *
 * @param context
 * @returns
 */
export declare function parseFrontmatter(context: RenderingContext): RenderingContext;
//# sourceMappingURL=Renderer.d.ts.map