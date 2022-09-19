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
    match(fname: any): boolean;
    filePath(fname: any): string;
    sourcePathMatchRenderPath(sourcePath: any, rendersTo: any): boolean;
    fileExtension(fname: any): string;
    readFile(basedir: any, fpath: any): Promise<string>;
    readFileSync(basedir: any, fpath: any): string;
    writeFile(renderTo: any, fpath: any, text: any): Promise<void>;
    writeFileSync(renderTo: any, fpath: any, text: any): void;
    /**
     * Parse any metadata in the document, by default no
     * parsing is done.
     *
     * @param context
     * @returns
     */
    parseMetadata(context: RenderingContext): RenderingContext;
    /**
     * Parse frontmatter in the format of lines of dashes
     * surrounding a YAML structure.
     *
     * @param context
     * @returns
     */
    render(context: RenderingContext): Promise<string>;
    renderSync(context: RenderingContext): string;
    renderFormat(context: RenderingContext): RenderingFormat;
}
export declare type DocumentInfo = {
    fspath: string;
    vpath: string;
};
/**
 * Parse frontmatter in the format of lines of dashes
 * surrounding a YAML structure.
 *
 * @param context
 * @returns
 */
export declare function parseFrontmatter(context: RenderingContext): RenderingContext;
//# sourceMappingURL=Renderer.d.ts.map