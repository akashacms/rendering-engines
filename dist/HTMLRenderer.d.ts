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
import { Renderer } from './Renderer.js';
import matter from 'gray-matter';
/**
 * Rendering support for any file that produces HTML when rendered.
 */
export declare class HTMLRenderer extends Renderer {
    /**
     * Support for Mahabhuta -- jQuery-like processing of HTML DOM before Rendering
     * down to HTML text.
     */
    maharun(rendered: any, metadata: any, mahafuncs: any): Promise<string>;
    copyMetadataProperties(data: any, frontmatter: any): any;
    readDocument(fnDoc: any): Promise<matter.GrayMatterFile<string>>;
    /**
     * If the document metadata says to render into a template, do so.
     */
    /**
     * Determine whether it's allowed to run Mahabhuta.  Some rendering types
     * cannot allow Mahabhuta to run.  Renderers should override this
     * function if necessary.
     */
    doMahabhuta(fpath: any): boolean;
    readContent(basedir: any, fpath: any): Promise<string>;
}
//# sourceMappingURL=HTMLRenderer.d.ts.map