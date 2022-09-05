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
import { promises as fsp } from 'fs';
import * as path from 'path';
import * as less from 'less';

type lessOutput = {
    css: string;   // compiled CSS
    map: string;   // source map
    imports: Array<string>;  // List of files imported
}

export class CSSLESSRenderer extends Renderer {
    constructor() {
        super(".css.less", /^(.*\.css)\.(less)$/);
    }

    renderSync(context /* text, metadata */) {
        throw new Error("Cannot render .css.less in synchronous environment");
    }

    render(context /* text, metadata */) {
        return new Promise((resolve, reject) => {
            less.render(context.content, function (err, css: lessOutput) {
                if (err) reject(err);
                else     resolve(css);
            });
        });
    }

    // Why are these two functions here?  Are they needed?
    
    async newRenderToFile(config, docInfo) {
        let lesstxt = await fsp.readFile(docInfo.fspath, 'utf8');
        let css = <lessOutput> await this.render({
            content: lesstxt,
            metadata: {}
        });
        let writeTo = path.join(config.renderDestination, docInfo.renderPath);
        await fsp.writeFile(writeTo, css.css);
    }

    async renderToFile(basedir, fpath, renderTo, renderToPlus, metadata, config) {
        var thisRenderer = this;
        var lesstxt = await thisRenderer.readFile(basedir, fpath);
        var css = <lessOutput> await thisRenderer.render({
            content: lesstxt,
            metadata: {}
        });
        return await thisRenderer.writeFile(renderTo,
                                    thisRenderer.filePath(fpath),
                                    css.css);
    }
}
