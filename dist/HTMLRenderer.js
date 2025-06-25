"use strict";
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
// const render    = require('./render');
const fs_1 = require("fs");
const path = __importStar(require("path"));
const mahabhuta = __importStar(require("mahabhuta"));
// const data = require('./data');
/**
 * Rendering support for any file that produces HTML when rendered.
 */
class HTMLRenderer extends Renderer_js_1.Renderer {
    /**
     * Support for Mahabhuta -- jQuery-like processing of HTML DOM before Rendering
     * down to HTML text.
     */
    maharun(rendered, metadata, mahafuncs) {
        if (typeof rendered === 'undefined' || rendered === null) {
            throw new Error('no rendered provided');
        }
        if (typeof metadata === 'undefined' || metadata === null) {
            throw new Error('no metadata provided');
        }
        if (typeof mahabhuta === 'undefined' || mahabhuta === null) {
            throw new Error('no mahabhuta provided');
        }
        if (metadata.config.mahabhutaConfig)
            mahabhuta.config(metadata.config.mahabhutaConfig);
        return mahabhuta.processAsync(rendered, metadata, mahafuncs);
    }
    copyMetadataProperties(data, frontmatter) {
        for (const prop in frontmatter) {
            if (!(prop in data))
                data[prop] = frontmatter[prop];
        }
        return data;
    }
    /* async readDocument(fnDoc) {
        const docLayout = await fsp.readFile(fnDoc, 'utf8');
        const fm = matter(docLayout);
        return fm;
    } */
    // renderForLayout && renderDocument needs to be in AkashaRender render.js
    // Rewrite to simplify the flow
    /**
     * If the document metadata says to render into a template, do so.
     */
    /* async renderForLayout(rendered, metadata, config) {
        // console.log('renderForLayout '+ util.inspect(metadata));
        if (metadata.layout) {
            // find layout
            // read layout
            // split out frontmatter & content
            // find renderer
            // renderer.render
            // mahabhuta

            // const layoutStart = new Date();

            var layoutcontent;
            var layoutdata;
            var layoutrendered;
            var metadocpath = metadata.document ? metadata.document.path : "unknown";

            // const layouts = (await filecache).layouts;
            // await layouts.isReady();

            // let found = await layouts.find(metadata.layout);
            // if (!found) {
            //     throw new Error(`No layout found in ${util.inspect(config.layoutDirs)} for ${metadata.layout} in file ${metadata.document.path}`);
            // }

            const fnlayout = await this.findLayout(metadata.layout);
            const docLayout = await this.readDocument(fnlayout);

            layoutcontent = docLayout.content;
            layoutdata = this.copyMetadataProperties(metadata, docLayout.data);
            
            layoutdata.content = rendered;
            const renderer = config.findRendererPath(metadata.layout);
            if (!renderer) {
                throw new Error(`No renderer for ${metadata.layout}`);
            }
            try {
                layoutrendered = await renderer.render(layoutcontent, layoutdata, found);
            } catch (e) {
                let ee = new Error(`Error rendering ${metadocpath} with ${metadata.layout} ${e.stack ? e.stack : e}`);
                console.error(ee);
                throw ee;
            }
            return layoutrendered;

        } else return rendered;
    } */
    /* async renderToFile(config, docInfo) {

        const renderStart = new Date();
        const doc = await this.readContent(docInfo.mounted, docInfo.pathInMounted);
        const fm = this.parseFrontmatter(doc);
        const doccontent = fm.content;
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo,
                            "FRONTMATTER", renderStart);

        const metadata = await this.newInitMetadata(config, docInfo);
        const docdata = metadata;
        let docrendered;
        try {
            docrendered = await this.render(doccontent, docdata, docInfo);
        } catch (err) {
            console.error(`Error rendering ${docInfo.vpath} ${(err.stack ? err.stack : err)}`);
            throw new Error(`Error rendering ${docInfo.vpath} ${(err.stack ? err.stack : err)}`);
        }
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo,
                            "FIRST RENDER", renderStart);

        docrendered = await this.renderForLayoutNew(docrendered, docdata, config);
        const renderSecondRender = new Date();
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo,
                            "SECOND RENDER", renderStart);
        if (this.doMahabhuta(docInfo.vpath)) {
            try {
                docrendered = await this.maharun(docrendered, docdata, config.mahafuncs);
            } catch (e2) {
                let eee = new Error(`Error with Mahabhuta ${docInfo.vpath} with ${metadata.layout} ${e2.stack ? e2.stack : e2}`);
                console.error(eee);
                throw eee;
            }
        } else {
            // console.log(`renderForLayout mahabhuta not allowed ${layoutrendered}`);
        }
        data.report(docInfo.mountPoint, docInfo.vpath, config.renderTo,
                            "MAHABHUTA", renderStart);
        const renderDest = path.join(config.renderTo, this.filePath(docInfo.vpath));
        await fsp.mkdir(path.dirname(renderDest), { recursive: true });
        await fsp.writeFile(renderDest, docrendered, 'utf8');
    } */
    /**
     * Determine whether it's allowed to run Mahabhuta.  Some rendering types
     * cannot allow Mahabhuta to run.  Renderers should override this
     * function if necessary.
     */
    doMahabhuta(fpath) {
        return true;
    }
    async readContent(basedir, fpath) {
        const text = await fs_1.promises.readFile(path.join(basedir, fpath), 'utf8');
        return text;
    }
}
exports.HTMLRenderer = HTMLRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFRNTFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0hUTUxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCwrQ0FBeUM7QUFDekMseUNBQXlDO0FBQ3pDLDJCQUFxQztBQUVyQywyQ0FBNkI7QUFHN0IscURBQXVDO0FBQ3ZDLGtDQUFrQztBQUVsQzs7R0FFRztBQUNILE1BQWEsWUFBYSxTQUFRLHNCQUFRO0lBRXRDOzs7T0FHRztJQUNILE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFDakMsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWU7WUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkYsT0FBTyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHNCQUFzQixDQUFDLElBQUksRUFBRSxXQUFXO1FBQ3BDLEtBQUssTUFBTSxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7UUFJSTtJQUVKLDBFQUEwRTtJQUMxRSwrQkFBK0I7SUFFL0I7O09BRUc7SUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQThDSTtJQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXlDSTtJQUVKOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLO1FBQzVCLE1BQU0sSUFBSSxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBNkZKO0FBNU9ELG9DQTRPQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMTkgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuLy8gY29uc3QgcmVuZGVyICAgID0gcmVxdWlyZSgnLi9yZW5kZXInKTtcbmltcG9ydCB7IHByb21pc2VzIGFzIGZzcCB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJztcbmltcG9ydCAqIGFzIG1haGFiaHV0YSBmcm9tICdtYWhhYmh1dGEnO1xuLy8gY29uc3QgZGF0YSA9IHJlcXVpcmUoJy4vZGF0YScpO1xuXG4vKipcbiAqIFJlbmRlcmluZyBzdXBwb3J0IGZvciBhbnkgZmlsZSB0aGF0IHByb2R1Y2VzIEhUTUwgd2hlbiByZW5kZXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEhUTUxSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcblxuICAgIC8qKlxuICAgICAqIFN1cHBvcnQgZm9yIE1haGFiaHV0YSAtLSBqUXVlcnktbGlrZSBwcm9jZXNzaW5nIG9mIEhUTUwgRE9NIGJlZm9yZSBSZW5kZXJpbmdcbiAgICAgKiBkb3duIHRvIEhUTUwgdGV4dC5cbiAgICAgKi9cbiAgICBtYWhhcnVuKHJlbmRlcmVkLCBtZXRhZGF0YSwgbWFoYWZ1bmNzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVuZGVyZWQgPT09ICd1bmRlZmluZWQnIHx8IHJlbmRlcmVkID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHJlbmRlcmVkIHByb3ZpZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtZXRhZGF0YSA9PT0gJ3VuZGVmaW5lZCcgfHwgbWV0YWRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbWV0YWRhdGEgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG1haGFiaHV0YSA9PT0gJ3VuZGVmaW5lZCcgfHwgbWFoYWJodXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG1haGFiaHV0YSBwcm92aWRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobWV0YWRhdGEuY29uZmlnLm1haGFiaHV0YUNvbmZpZykgbWFoYWJodXRhLmNvbmZpZyhtZXRhZGF0YS5jb25maWcubWFoYWJodXRhQ29uZmlnKTtcbiAgICAgICAgcmV0dXJuIG1haGFiaHV0YS5wcm9jZXNzQXN5bmMocmVuZGVyZWQsIG1ldGFkYXRhLCBtYWhhZnVuY3MpO1xuICAgIH1cblxuICAgIGNvcHlNZXRhZGF0YVByb3BlcnRpZXMoZGF0YSwgZnJvbnRtYXR0ZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGZyb250bWF0dGVyKSB7XG4gICAgICAgICAgICBpZiAoIShwcm9wIGluIGRhdGEpKSBkYXRhW3Byb3BdID0gZnJvbnRtYXR0ZXJbcHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyogYXN5bmMgcmVhZERvY3VtZW50KGZuRG9jKSB7XG4gICAgICAgIGNvbnN0IGRvY0xheW91dCA9IGF3YWl0IGZzcC5yZWFkRmlsZShmbkRvYywgJ3V0ZjgnKTtcbiAgICAgICAgY29uc3QgZm0gPSBtYXR0ZXIoZG9jTGF5b3V0KTtcbiAgICAgICAgcmV0dXJuIGZtO1xuICAgIH0gKi9cblxuICAgIC8vIHJlbmRlckZvckxheW91dCAmJiByZW5kZXJEb2N1bWVudCBuZWVkcyB0byBiZSBpbiBBa2FzaGFSZW5kZXIgcmVuZGVyLmpzXG4gICAgLy8gUmV3cml0ZSB0byBzaW1wbGlmeSB0aGUgZmxvd1xuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIGRvY3VtZW50IG1ldGFkYXRhIHNheXMgdG8gcmVuZGVyIGludG8gYSB0ZW1wbGF0ZSwgZG8gc28uXG4gICAgICovXG4gICAgLyogYXN5bmMgcmVuZGVyRm9yTGF5b3V0KHJlbmRlcmVkLCBtZXRhZGF0YSwgY29uZmlnKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW5kZXJGb3JMYXlvdXQgJysgdXRpbC5pbnNwZWN0KG1ldGFkYXRhKSk7XG4gICAgICAgIGlmIChtZXRhZGF0YS5sYXlvdXQpIHtcbiAgICAgICAgICAgIC8vIGZpbmQgbGF5b3V0XG4gICAgICAgICAgICAvLyByZWFkIGxheW91dFxuICAgICAgICAgICAgLy8gc3BsaXQgb3V0IGZyb250bWF0dGVyICYgY29udGVudFxuICAgICAgICAgICAgLy8gZmluZCByZW5kZXJlclxuICAgICAgICAgICAgLy8gcmVuZGVyZXIucmVuZGVyXG4gICAgICAgICAgICAvLyBtYWhhYmh1dGFcblxuICAgICAgICAgICAgLy8gY29uc3QgbGF5b3V0U3RhcnQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICB2YXIgbGF5b3V0Y29udGVudDtcbiAgICAgICAgICAgIHZhciBsYXlvdXRkYXRhO1xuICAgICAgICAgICAgdmFyIGxheW91dHJlbmRlcmVkO1xuICAgICAgICAgICAgdmFyIG1ldGFkb2NwYXRoID0gbWV0YWRhdGEuZG9jdW1lbnQgPyBtZXRhZGF0YS5kb2N1bWVudC5wYXRoIDogXCJ1bmtub3duXCI7XG5cbiAgICAgICAgICAgIC8vIGNvbnN0IGxheW91dHMgPSAoYXdhaXQgZmlsZWNhY2hlKS5sYXlvdXRzO1xuICAgICAgICAgICAgLy8gYXdhaXQgbGF5b3V0cy5pc1JlYWR5KCk7XG5cbiAgICAgICAgICAgIC8vIGxldCBmb3VuZCA9IGF3YWl0IGxheW91dHMuZmluZChtZXRhZGF0YS5sYXlvdXQpO1xuICAgICAgICAgICAgLy8gaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgLy8gICAgIHRocm93IG5ldyBFcnJvcihgTm8gbGF5b3V0IGZvdW5kIGluICR7dXRpbC5pbnNwZWN0KGNvbmZpZy5sYXlvdXREaXJzKX0gZm9yICR7bWV0YWRhdGEubGF5b3V0fSBpbiBmaWxlICR7bWV0YWRhdGEuZG9jdW1lbnQucGF0aH1gKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgY29uc3QgZm5sYXlvdXQgPSBhd2FpdCB0aGlzLmZpbmRMYXlvdXQobWV0YWRhdGEubGF5b3V0KTtcbiAgICAgICAgICAgIGNvbnN0IGRvY0xheW91dCA9IGF3YWl0IHRoaXMucmVhZERvY3VtZW50KGZubGF5b3V0KTtcblxuICAgICAgICAgICAgbGF5b3V0Y29udGVudCA9IGRvY0xheW91dC5jb250ZW50O1xuICAgICAgICAgICAgbGF5b3V0ZGF0YSA9IHRoaXMuY29weU1ldGFkYXRhUHJvcGVydGllcyhtZXRhZGF0YSwgZG9jTGF5b3V0LmRhdGEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsYXlvdXRkYXRhLmNvbnRlbnQgPSByZW5kZXJlZDtcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVyID0gY29uZmlnLmZpbmRSZW5kZXJlclBhdGgobWV0YWRhdGEubGF5b3V0KTtcbiAgICAgICAgICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHJlbmRlcmVyIGZvciAke21ldGFkYXRhLmxheW91dH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0cmVuZGVyZWQgPSBhd2FpdCByZW5kZXJlci5yZW5kZXIobGF5b3V0Y29udGVudCwgbGF5b3V0ZGF0YSwgZm91bmQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGxldCBlZSA9IG5ldyBFcnJvcihgRXJyb3IgcmVuZGVyaW5nICR7bWV0YWRvY3BhdGh9IHdpdGggJHttZXRhZGF0YS5sYXlvdXR9ICR7ZS5zdGFjayA/IGUuc3RhY2sgOiBlfWApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZWUpO1xuICAgICAgICAgICAgICAgIHRocm93IGVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxheW91dHJlbmRlcmVkO1xuXG4gICAgICAgIH0gZWxzZSByZXR1cm4gcmVuZGVyZWQ7XG4gICAgfSAqL1xuXG4gICAgLyogYXN5bmMgcmVuZGVyVG9GaWxlKGNvbmZpZywgZG9jSW5mbykge1xuXG4gICAgICAgIGNvbnN0IHJlbmRlclN0YXJ0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZG9jID0gYXdhaXQgdGhpcy5yZWFkQ29udGVudChkb2NJbmZvLm1vdW50ZWQsIGRvY0luZm8ucGF0aEluTW91bnRlZCk7XG4gICAgICAgIGNvbnN0IGZtID0gdGhpcy5wYXJzZUZyb250bWF0dGVyKGRvYyk7XG4gICAgICAgIGNvbnN0IGRvY2NvbnRlbnQgPSBmbS5jb250ZW50O1xuICAgICAgICBkYXRhLnJlcG9ydChkb2NJbmZvLm1vdW50UG9pbnQsIGRvY0luZm8udnBhdGgsIGNvbmZpZy5yZW5kZXJUbywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGUk9OVE1BVFRFUlwiLCByZW5kZXJTdGFydCk7XG5cbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCB0aGlzLm5ld0luaXRNZXRhZGF0YShjb25maWcsIGRvY0luZm8pO1xuICAgICAgICBjb25zdCBkb2NkYXRhID0gbWV0YWRhdGE7XG4gICAgICAgIGxldCBkb2NyZW5kZXJlZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRvY3JlbmRlcmVkID0gYXdhaXQgdGhpcy5yZW5kZXIoZG9jY29udGVudCwgZG9jZGF0YSwgZG9jSW5mbyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgcmVuZGVyaW5nICR7ZG9jSW5mby52cGF0aH0gJHsoZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKX1gKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3IgcmVuZGVyaW5nICR7ZG9jSW5mby52cGF0aH0gJHsoZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLnJlcG9ydChkb2NJbmZvLm1vdW50UG9pbnQsIGRvY0luZm8udnBhdGgsIGNvbmZpZy5yZW5kZXJUbywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGSVJTVCBSRU5ERVJcIiwgcmVuZGVyU3RhcnQpO1xuXG4gICAgICAgIGRvY3JlbmRlcmVkID0gYXdhaXQgdGhpcy5yZW5kZXJGb3JMYXlvdXROZXcoZG9jcmVuZGVyZWQsIGRvY2RhdGEsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IHJlbmRlclNlY29uZFJlbmRlciA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRhdGEucmVwb3J0KGRvY0luZm8ubW91bnRQb2ludCwgZG9jSW5mby52cGF0aCwgY29uZmlnLnJlbmRlclRvLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlNFQ09ORCBSRU5ERVJcIiwgcmVuZGVyU3RhcnQpO1xuICAgICAgICBpZiAodGhpcy5kb01haGFiaHV0YShkb2NJbmZvLnZwYXRoKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkb2NyZW5kZXJlZCA9IGF3YWl0IHRoaXMubWFoYXJ1bihkb2NyZW5kZXJlZCwgZG9jZGF0YSwgY29uZmlnLm1haGFmdW5jcyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlMikge1xuICAgICAgICAgICAgICAgIGxldCBlZWUgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggTWFoYWJodXRhICR7ZG9jSW5mby52cGF0aH0gd2l0aCAke21ldGFkYXRhLmxheW91dH0gJHtlMi5zdGFjayA/IGUyLnN0YWNrIDogZTJ9YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlZWUpO1xuICAgICAgICAgICAgICAgIHRocm93IGVlZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGByZW5kZXJGb3JMYXlvdXQgbWFoYWJodXRhIG5vdCBhbGxvd2VkICR7bGF5b3V0cmVuZGVyZWR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5yZXBvcnQoZG9jSW5mby5tb3VudFBvaW50LCBkb2NJbmZvLnZwYXRoLCBjb25maWcucmVuZGVyVG8sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTUFIQUJIVVRBXCIsIHJlbmRlclN0YXJ0KTtcbiAgICAgICAgY29uc3QgcmVuZGVyRGVzdCA9IHBhdGguam9pbihjb25maWcucmVuZGVyVG8sIHRoaXMuZmlsZVBhdGgoZG9jSW5mby52cGF0aCkpO1xuICAgICAgICBhd2FpdCBmc3AubWtkaXIocGF0aC5kaXJuYW1lKHJlbmRlckRlc3QpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgYXdhaXQgZnNwLndyaXRlRmlsZShyZW5kZXJEZXN0LCBkb2NyZW5kZXJlZCwgJ3V0ZjgnKTtcbiAgICB9ICovXG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciBpdCdzIGFsbG93ZWQgdG8gcnVuIE1haGFiaHV0YS4gIFNvbWUgcmVuZGVyaW5nIHR5cGVzXG4gICAgICogY2Fubm90IGFsbG93IE1haGFiaHV0YSB0byBydW4uICBSZW5kZXJlcnMgc2hvdWxkIG92ZXJyaWRlIHRoaXNcbiAgICAgKiBmdW5jdGlvbiBpZiBuZWNlc3NhcnkuXG4gICAgICovXG4gICAgZG9NYWhhYmh1dGEoZnBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZENvbnRlbnQoYmFzZWRpciwgZnBhdGgpIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IGZzcC5yZWFkRmlsZShwYXRoLmpvaW4oYmFzZWRpciwgZnBhdGgpLCAndXRmOCcpO1xuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG5cbiAgICAvLyBpbml0TWV0YWRhdGEgcHJvYmFibHkgbmVlZHMgdG8gYmUgaW4gQWthc2hhUmVuZGVyIHJlbmRlci5qc1xuXG4gICAgLypcbiAgICBhc3luYyBpbml0TWV0YWRhdGEoY29uZmlnLCBkb2NJbmZvKSB7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzO1xuICAgICAgICAvLyBTdGFydCB3aXRoIGEgYmFzZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBhc3NlZCBpbnRvIHRoZSB0ZW1wbGF0ZVxuICAgICAgICB2YXIgbWV0YWRhdGEgPSB7IH07XG5cbiAgICAgICAgLy8gQ29weSBkYXRhIGZyb20gZnJvbnRtYXR0ZXJcbiAgICAgICAgZm9yIChsZXQgeXByb3AgaW4gZG9jSW5mby5iYXNlTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBpbml0TWV0YWRhdGEgJHtiYXNlZGlyfSAke2ZwYXRofSBiYXNlTWV0YWRhdGEgJHtiYXNlTWV0YWRhdGFbeXByb3BdfWApO1xuICAgICAgICAgICAgbWV0YWRhdGFbeXByb3BdID0gZG9jSW5mby5iYXNlTWV0YWRhdGFbeXByb3BdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHlwcm9wIGluIGNvbmZpZy5tZXRhZGF0YSkge1xuICAgICAgICAgICAgbWV0YWRhdGFbeXByb3BdID0gY29uZmlnLm1ldGFkYXRhW3lwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZm1tY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCB5cHJvcCBpbiBkb2NJbmZvLmRvY01ldGFkYXRhKSB7XG4gICAgICAgICAgICBtZXRhZGF0YVt5cHJvcF0gPSBkb2NJbmZvLmRvY01ldGFkYXRhW3lwcm9wXTtcbiAgICAgICAgICAgIGZtbWNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgLyogaWYgKGZtbWNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFdBUk5JTkc6IE5vIG1ldGFkYXRhIGRpc2NvdmVyZWQgaW4gJHtkb2NJbmZvLnZwYXRofWApO1xuICAgICAgICB9ICotLS9cblxuICAgICAgICBtZXRhZGF0YS5jb250ZW50ID0gXCJcIjtcbiAgICAgICAgbWV0YWRhdGEuZG9jdW1lbnQgPSB7fTtcbiAgICAgICAgbWV0YWRhdGEuZG9jdW1lbnQuYmFzZWRpciA9IGRvY0luZm8ubW91bnRQb2ludDtcbiAgICAgICAgbWV0YWRhdGEuZG9jdW1lbnQucmVscGF0aCA9IGRvY0luZm8ucGF0aEluTW91bnRlZDtcbiAgICAgICAgbWV0YWRhdGEuZG9jdW1lbnQucmVscmVuZGVyID0gcmVuZGVyZXIuZmlsZVBhdGgoZG9jSW5mby5wYXRoSW5Nb3VudGVkKTtcbiAgICAgICAgbWV0YWRhdGEuZG9jdW1lbnQucGF0aCA9IGRvY0luZm8udnBhdGg7XG4gICAgICAgIG1ldGFkYXRhLmRvY3VtZW50LnJlbmRlclRvID0gZG9jSW5mby5yZW5kZXJQYXRoO1xuXG4gICAgICAgIC8vIEVuc3VyZSB0aGUgPGVtPnRhZ3M8L2VtPiBmaWVsZCBpcyBhbiBhcnJheVxuICAgICAgICBpZiAoIShtZXRhZGF0YS50YWdzKSkge1xuICAgICAgICAgICAgbWV0YWRhdGEudGFncyA9IFtdO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiAobWV0YWRhdGEudGFncykgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBsZXQgdGFnbGlzdCA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmUgPSAvXFxzKixcXHMqLS0vO1xuICAgICAgICAgICAgbWV0YWRhdGEudGFncy5zcGxpdChyZSkuZm9yRWFjaCh0YWcgPT4ge1xuICAgICAgICAgICAgICAgIHRhZ2xpc3QucHVzaCh0YWcudHJpbSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWV0YWRhdGEudGFncyA9IHRhZ2xpc3Q7XG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWV0YWRhdGEudGFncykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgRk9STUFUIEVSUk9SIC0gJHtkb2NJbmZvLnZwYXRofSBoYXMgYmFkbHkgZm9ybWF0dGVkIHRhZ3MgYCxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS50YWdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGFkYXRhLmNvbmZpZyAgICAgID0gY29uZmlnO1xuICAgICAgICBtZXRhZGF0YS5wYXJ0aWFsU3luYyA9IChhd2FpdCBwYXJ0aWFsRnVuY3MpLnBhcnRpYWxTeW5jLmJpbmQocmVuZGVyZXIsIGNvbmZpZyk7XG4gICAgICAgIG1ldGFkYXRhLnBhcnRpYWwgICAgID0gKGF3YWl0IHBhcnRpYWxGdW5jcykucGFydGlhbC5iaW5kKHJlbmRlcmVyLCBjb25maWcpO1xuXG4gICAgICAgIG1ldGFkYXRhLnJvb3RfdXJsID0gY29uZmlnLnJvb3RfdXJsO1xuXG4gICAgICAgIGlmIChjb25maWcucm9vdF91cmwpIHtcbiAgICAgICAgICAgIGxldCBwUm9vdFVybCA9IHVybC5wYXJzZShjb25maWcucm9vdF91cmwpO1xuICAgICAgICAgICAgcFJvb3RVcmwucGF0aG5hbWUgPSBwYXRoLm5vcm1hbGl6ZShcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHBSb290VXJsLnBhdGhuYW1lLCBtZXRhZGF0YS5kb2N1bWVudC5yZW5kZXJUbylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtZXRhZGF0YS5yZW5kZXJlZF91cmwgPSB1cmwuZm9ybWF0KHBSb290VXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1ldGFkYXRhLnJlbmRlcmVkX3VybCA9IG1ldGFkYXRhLmRvY3VtZW50LnJlbmRlclRvO1xuICAgICAgICB9XG5cbiAgICAgICAgbWV0YWRhdGEuYWthc2hhID0gdGhpcy5ha2FzaGE7XG4gICAgICAgIG1ldGFkYXRhLnBsdWdpbiA9IGNvbmZpZy5wbHVnaW47XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBuZXdJbml0TWV0YWRhdGFgLCBkb2NJbmZvKTtcbiAgICAgICAgbWV0YWRhdGEucmVuZGVyZWRfZGF0ZSA9IGRvY0luZm8uc3RhdHMubXRpbWU7XG5cbiAgICAgICAgaWYgKCFtZXRhZGF0YS5wdWJsaWNhdGlvbkRhdGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRlU2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZG9jSW5mby5kb2NNZXRhZGF0YSAmJiBkb2NJbmZvLmRvY01ldGFkYXRhLnB1YmxEYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gRGF0ZS5wYXJzZShkb2NJbmZvLmRvY01ldGFkYXRhLnB1YmxEYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoISBpc05hTihwYXJzZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhLnB1YmxpY2F0aW9uRGF0ZSA9IG5ldyBEYXRlKHBhcnNlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGVTZXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEgZGF0ZVNldCAmJiBkb2NJbmZvLnN0YXRzICYmIGRvY0luZm8uc3RhdHMubXRpbWUpIHtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5wdWJsaWNhdGlvbkRhdGUgPSBuZXcgRGF0ZShkb2NJbmZvLnN0YXRzLm10aW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbWV0YWRhdGEucHVibGljYXRpb25EYXRlKSB7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEucHVibGljYXRpb25EYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXRhZGF0YTtcbiAgICB9ICovXG5cbn1cbiJdfQ==