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
import { Renderer } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';
/**
 * Markdown rendering using the markdown-it package.
 */
export declare class MarkdownRenderer extends Renderer {
    constructor();
    /**
     * Initializes a Markdown-IT instance with a new configuration,
     * replacing the default instance with the default configuration.
     *
     * @param newConfig
     * @returns
     */
    configuration(newConfig: any): this;
    /**
     * Adds a MarkdownIT plugin by calling the underlying `use` method.
     *
     * @param mditPlugin
     * @param options
     * @returns
     */
    use(mditPlugin: any, options: any): this;
    /**
     * Allows extending the rendering rules by exposing
     * the `md.renderer.rules` array.
     */
    get rendererRules(): any;
    renderSync(context: RenderingContext): string;
    render(context: RenderingContext): Promise<string>;
    /**
     * Parse frontmatter in the format of lines of dashes
     * surrounding a YAML structure.
     *
     * @param context
     * @returns
     */
    parseMetadata(context: RenderingContext): RenderingContext;
    renderFormat(context: RenderingContext): RenderingFormat;
}
//# sourceMappingURL=render-md.d.ts.map