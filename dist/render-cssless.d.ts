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
export declare class CSSLESSRenderer extends Renderer {
    constructor();
    renderSync(context: any): void;
    render(context: any): Promise<unknown>;
    newRenderToFile(config: any, docInfo: any): Promise<void>;
    renderToFile(basedir: any, fpath: any, renderTo: any, renderToPlus: any, metadata: any, config: any): Promise<void>;
}
//# sourceMappingURL=render-cssless.d.ts.map