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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
// const render    = require('./render');
const fs_1 = require("fs");
const path = __importStar(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
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
    async readDocument(fnDoc) {
        const docLayout = await fs_1.promises.readFile(fnDoc, 'utf8');
        const fm = (0, gray_matter_1.default)(docLayout);
        return fm;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFRNTFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0hUTUxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILCtDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsMkJBQXFDO0FBRXJDLDJDQUE2QjtBQUU3Qiw4REFBaUM7QUFDakMscURBQXVDO0FBQ3ZDLGtDQUFrQztBQUVsQzs7R0FFRztBQUNILE1BQWEsWUFBYSxTQUFRLHNCQUFRO0lBRXRDOzs7T0FHRztJQUNILE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVM7UUFDakMsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWU7WUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkYsT0FBTyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHNCQUFzQixDQUFDLElBQUksRUFBRSxXQUFXO1FBQ3BDLEtBQUssTUFBTSxJQUFJLElBQUksV0FBVyxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2RDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUs7UUFDcEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxNQUFNLEVBQUUsR0FBRyxJQUFBLHFCQUFNLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsMEVBQTBFO0lBQzFFLCtCQUErQjtJQUUvQjs7T0FFRztJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBOENJO0lBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBeUNJO0lBRUo7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxLQUFLO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUs7UUFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxhQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0E2Rko7QUE1T0Qsb0NBNE9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxOSBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG4vLyBjb25zdCByZW5kZXIgICAgPSByZXF1aXJlKCcuL3JlbmRlcicpO1xuaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnNwIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgdXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInO1xuaW1wb3J0ICogYXMgbWFoYWJodXRhIGZyb20gJ21haGFiaHV0YSc7XG4vLyBjb25zdCBkYXRhID0gcmVxdWlyZSgnLi9kYXRhJyk7XG5cbi8qKlxuICogUmVuZGVyaW5nIHN1cHBvcnQgZm9yIGFueSBmaWxlIHRoYXQgcHJvZHVjZXMgSFRNTCB3aGVuIHJlbmRlcmVkLlxuICovXG5leHBvcnQgY2xhc3MgSFRNTFJlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuXG4gICAgLyoqXG4gICAgICogU3VwcG9ydCBmb3IgTWFoYWJodXRhIC0tIGpRdWVyeS1saWtlIHByb2Nlc3Npbmcgb2YgSFRNTCBET00gYmVmb3JlIFJlbmRlcmluZ1xuICAgICAqIGRvd24gdG8gSFRNTCB0ZXh0LlxuICAgICAqL1xuICAgIG1haGFydW4ocmVuZGVyZWQsIG1ldGFkYXRhLCBtYWhhZnVuY3MpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZW5kZXJlZCA9PT0gJ3VuZGVmaW5lZCcgfHwgcmVuZGVyZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gcmVuZGVyZWQgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG1ldGFkYXRhID09PSAndW5kZWZpbmVkJyB8fCBtZXRhZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBtZXRhZGF0YSBwcm92aWRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbWFoYWJodXRhID09PSAndW5kZWZpbmVkJyB8fCBtYWhhYmh1dGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbWFoYWJodXRhIHByb3ZpZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChtZXRhZGF0YS5jb25maWcubWFoYWJodXRhQ29uZmlnKSBtYWhhYmh1dGEuY29uZmlnKG1ldGFkYXRhLmNvbmZpZy5tYWhhYmh1dGFDb25maWcpO1xuICAgICAgICByZXR1cm4gbWFoYWJodXRhLnByb2Nlc3NBc3luYyhyZW5kZXJlZCwgbWV0YWRhdGEsIG1haGFmdW5jcyk7XG4gICAgfVxuXG4gICAgY29weU1ldGFkYXRhUHJvcGVydGllcyhkYXRhLCBmcm9udG1hdHRlcikge1xuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gZnJvbnRtYXR0ZXIpIHtcbiAgICAgICAgICAgIGlmICghKHByb3AgaW4gZGF0YSkpIGRhdGFbcHJvcF0gPSBmcm9udG1hdHRlcltwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBhc3luYyByZWFkRG9jdW1lbnQoZm5Eb2MpIHtcbiAgICAgICAgY29uc3QgZG9jTGF5b3V0ID0gYXdhaXQgZnNwLnJlYWRGaWxlKGZuRG9jLCAndXRmOCcpO1xuICAgICAgICBjb25zdCBmbSA9IG1hdHRlcihkb2NMYXlvdXQpO1xuICAgICAgICByZXR1cm4gZm07XG4gICAgfVxuXG4gICAgLy8gcmVuZGVyRm9yTGF5b3V0ICYmIHJlbmRlckRvY3VtZW50IG5lZWRzIHRvIGJlIGluIEFrYXNoYVJlbmRlciByZW5kZXIuanNcbiAgICAvLyBSZXdyaXRlIHRvIHNpbXBsaWZ5IHRoZSBmbG93XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgZG9jdW1lbnQgbWV0YWRhdGEgc2F5cyB0byByZW5kZXIgaW50byBhIHRlbXBsYXRlLCBkbyBzby5cbiAgICAgKi9cbiAgICAvKiBhc3luYyByZW5kZXJGb3JMYXlvdXQocmVuZGVyZWQsIG1ldGFkYXRhLCBjb25maWcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3JlbmRlckZvckxheW91dCAnKyB1dGlsLmluc3BlY3QobWV0YWRhdGEpKTtcbiAgICAgICAgaWYgKG1ldGFkYXRhLmxheW91dCkge1xuICAgICAgICAgICAgLy8gZmluZCBsYXlvdXRcbiAgICAgICAgICAgIC8vIHJlYWQgbGF5b3V0XG4gICAgICAgICAgICAvLyBzcGxpdCBvdXQgZnJvbnRtYXR0ZXIgJiBjb250ZW50XG4gICAgICAgICAgICAvLyBmaW5kIHJlbmRlcmVyXG4gICAgICAgICAgICAvLyByZW5kZXJlci5yZW5kZXJcbiAgICAgICAgICAgIC8vIG1haGFiaHV0YVxuXG4gICAgICAgICAgICAvLyBjb25zdCBsYXlvdXRTdGFydCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgIHZhciBsYXlvdXRjb250ZW50O1xuICAgICAgICAgICAgdmFyIGxheW91dGRhdGE7XG4gICAgICAgICAgICB2YXIgbGF5b3V0cmVuZGVyZWQ7XG4gICAgICAgICAgICB2YXIgbWV0YWRvY3BhdGggPSBtZXRhZGF0YS5kb2N1bWVudCA/IG1ldGFkYXRhLmRvY3VtZW50LnBhdGggOiBcInVua25vd25cIjtcblxuICAgICAgICAgICAgLy8gY29uc3QgbGF5b3V0cyA9IChhd2FpdCBmaWxlY2FjaGUpLmxheW91dHM7XG4gICAgICAgICAgICAvLyBhd2FpdCBsYXlvdXRzLmlzUmVhZHkoKTtcblxuICAgICAgICAgICAgLy8gbGV0IGZvdW5kID0gYXdhaXQgbGF5b3V0cy5maW5kKG1ldGFkYXRhLmxheW91dCk7XG4gICAgICAgICAgICAvLyBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBsYXlvdXQgZm91bmQgaW4gJHt1dGlsLmluc3BlY3QoY29uZmlnLmxheW91dERpcnMpfSBmb3IgJHttZXRhZGF0YS5sYXlvdXR9IGluIGZpbGUgJHttZXRhZGF0YS5kb2N1bWVudC5wYXRofWApO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICBjb25zdCBmbmxheW91dCA9IGF3YWl0IHRoaXMuZmluZExheW91dChtZXRhZGF0YS5sYXlvdXQpO1xuICAgICAgICAgICAgY29uc3QgZG9jTGF5b3V0ID0gYXdhaXQgdGhpcy5yZWFkRG9jdW1lbnQoZm5sYXlvdXQpO1xuXG4gICAgICAgICAgICBsYXlvdXRjb250ZW50ID0gZG9jTGF5b3V0LmNvbnRlbnQ7XG4gICAgICAgICAgICBsYXlvdXRkYXRhID0gdGhpcy5jb3B5TWV0YWRhdGFQcm9wZXJ0aWVzKG1ldGFkYXRhLCBkb2NMYXlvdXQuZGF0YSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxheW91dGRhdGEuY29udGVudCA9IHJlbmRlcmVkO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBjb25maWcuZmluZFJlbmRlcmVyUGF0aChtZXRhZGF0YS5sYXlvdXQpO1xuICAgICAgICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gcmVuZGVyZXIgZm9yICR7bWV0YWRhdGEubGF5b3V0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsYXlvdXRyZW5kZXJlZCA9IGF3YWl0IHJlbmRlcmVyLnJlbmRlcihsYXlvdXRjb250ZW50LCBsYXlvdXRkYXRhLCBmb3VuZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVlID0gbmV3IEVycm9yKGBFcnJvciByZW5kZXJpbmcgJHttZXRhZG9jcGF0aH0gd2l0aCAke21ldGFkYXRhLmxheW91dH0gJHtlLnN0YWNrID8gZS5zdGFjayA6IGV9YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlZSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGF5b3V0cmVuZGVyZWQ7XG5cbiAgICAgICAgfSBlbHNlIHJldHVybiByZW5kZXJlZDtcbiAgICB9ICovXG5cbiAgICAvKiBhc3luYyByZW5kZXJUb0ZpbGUoY29uZmlnLCBkb2NJbmZvKSB7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyU3RhcnQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBkb2MgPSBhd2FpdCB0aGlzLnJlYWRDb250ZW50KGRvY0luZm8ubW91bnRlZCwgZG9jSW5mby5wYXRoSW5Nb3VudGVkKTtcbiAgICAgICAgY29uc3QgZm0gPSB0aGlzLnBhcnNlRnJvbnRtYXR0ZXIoZG9jKTtcbiAgICAgICAgY29uc3QgZG9jY29udGVudCA9IGZtLmNvbnRlbnQ7XG4gICAgICAgIGRhdGEucmVwb3J0KGRvY0luZm8ubW91bnRQb2ludCwgZG9jSW5mby52cGF0aCwgY29uZmlnLnJlbmRlclRvLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZST05UTUFUVEVSXCIsIHJlbmRlclN0YXJ0KTtcblxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IHRoaXMubmV3SW5pdE1ldGFkYXRhKGNvbmZpZywgZG9jSW5mbyk7XG4gICAgICAgIGNvbnN0IGRvY2RhdGEgPSBtZXRhZGF0YTtcbiAgICAgICAgbGV0IGRvY3JlbmRlcmVkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZG9jcmVuZGVyZWQgPSBhd2FpdCB0aGlzLnJlbmRlcihkb2Njb250ZW50LCBkb2NkYXRhLCBkb2NJbmZvKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciByZW5kZXJpbmcgJHtkb2NJbmZvLnZwYXRofSAkeyhlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnIpfWApO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciByZW5kZXJpbmcgJHtkb2NJbmZvLnZwYXRofSAkeyhlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnIpfWApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEucmVwb3J0KGRvY0luZm8ubW91bnRQb2ludCwgZG9jSW5mby52cGF0aCwgY29uZmlnLnJlbmRlclRvLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZJUlNUIFJFTkRFUlwiLCByZW5kZXJTdGFydCk7XG5cbiAgICAgICAgZG9jcmVuZGVyZWQgPSBhd2FpdCB0aGlzLnJlbmRlckZvckxheW91dE5ldyhkb2NyZW5kZXJlZCwgZG9jZGF0YSwgY29uZmlnKTtcbiAgICAgICAgY29uc3QgcmVuZGVyU2Vjb25kUmVuZGVyID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0YS5yZXBvcnQoZG9jSW5mby5tb3VudFBvaW50LCBkb2NJbmZvLnZwYXRoLCBjb25maWcucmVuZGVyVG8sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiU0VDT05EIFJFTkRFUlwiLCByZW5kZXJTdGFydCk7XG4gICAgICAgIGlmICh0aGlzLmRvTWFoYWJodXRhKGRvY0luZm8udnBhdGgpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRvY3JlbmRlcmVkID0gYXdhaXQgdGhpcy5tYWhhcnVuKGRvY3JlbmRlcmVkLCBkb2NkYXRhLCBjb25maWcubWFoYWZ1bmNzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVlZSA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBNYWhhYmh1dGEgJHtkb2NJbmZvLnZwYXRofSB3aXRoICR7bWV0YWRhdGEubGF5b3V0fSAke2UyLnN0YWNrID8gZTIuc3RhY2sgOiBlMn1gKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVlZSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZWVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHJlbmRlckZvckxheW91dCBtYWhhYmh1dGEgbm90IGFsbG93ZWQgJHtsYXlvdXRyZW5kZXJlZH1gKTtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLnJlcG9ydChkb2NJbmZvLm1vdW50UG9pbnQsIGRvY0luZm8udnBhdGgsIGNvbmZpZy5yZW5kZXJUbywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJNQUhBQkhVVEFcIiwgcmVuZGVyU3RhcnQpO1xuICAgICAgICBjb25zdCByZW5kZXJEZXN0ID0gcGF0aC5qb2luKGNvbmZpZy5yZW5kZXJUbywgdGhpcy5maWxlUGF0aChkb2NJbmZvLnZwYXRoKSk7XG4gICAgICAgIGF3YWl0IGZzcC5ta2RpcihwYXRoLmRpcm5hbWUocmVuZGVyRGVzdCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICBhd2FpdCBmc3Aud3JpdGVGaWxlKHJlbmRlckRlc3QsIGRvY3JlbmRlcmVkLCAndXRmOCcpO1xuICAgIH0gKi9cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSB3aGV0aGVyIGl0J3MgYWxsb3dlZCB0byBydW4gTWFoYWJodXRhLiAgU29tZSByZW5kZXJpbmcgdHlwZXNcbiAgICAgKiBjYW5ub3QgYWxsb3cgTWFoYWJodXRhIHRvIHJ1bi4gIFJlbmRlcmVycyBzaG91bGQgb3ZlcnJpZGUgdGhpc1xuICAgICAqIGZ1bmN0aW9uIGlmIG5lY2Vzc2FyeS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhc3luYyByZWFkQ29udGVudChiYXNlZGlyLCBmcGF0aCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgZnNwLnJlYWRGaWxlKHBhdGguam9pbihiYXNlZGlyLCBmcGF0aCksICd1dGY4Jyk7XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIC8vIGluaXRNZXRhZGF0YSBwcm9iYWJseSBuZWVkcyB0byBiZSBpbiBBa2FzaGFSZW5kZXIgcmVuZGVyLmpzXG5cbiAgICAvKlxuICAgIGFzeW5jIGluaXRNZXRhZGF0YShjb25maWcsIGRvY0luZm8pIHtcblxuICAgICAgICBjb25zdCByZW5kZXJlciA9IHRoaXM7XG4gICAgICAgIC8vIFN0YXJ0IHdpdGggYSBiYXNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcGFzc2VkIGludG8gdGhlIHRlbXBsYXRlXG4gICAgICAgIHZhciBtZXRhZGF0YSA9IHsgfTtcblxuICAgICAgICAvLyBDb3B5IGRhdGEgZnJvbSBmcm9udG1hdHRlclxuICAgICAgICBmb3IgKGxldCB5cHJvcCBpbiBkb2NJbmZvLmJhc2VNZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYGluaXRNZXRhZGF0YSAke2Jhc2VkaXJ9ICR7ZnBhdGh9IGJhc2VNZXRhZGF0YSAke2Jhc2VNZXRhZGF0YVt5cHJvcF19YCk7XG4gICAgICAgICAgICBtZXRhZGF0YVt5cHJvcF0gPSBkb2NJbmZvLmJhc2VNZXRhZGF0YVt5cHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgeXByb3AgaW4gY29uZmlnLm1ldGFkYXRhKSB7XG4gICAgICAgICAgICBtZXRhZGF0YVt5cHJvcF0gPSBjb25maWcubWV0YWRhdGFbeXByb3BdO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmbW1jb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IHlwcm9wIGluIGRvY0luZm8uZG9jTWV0YWRhdGEpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhW3lwcm9wXSA9IGRvY0luZm8uZG9jTWV0YWRhdGFbeXByb3BdO1xuICAgICAgICAgICAgZm1tY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICAvKiBpZiAoZm1tY291bnQgPD0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgV0FSTklORzogTm8gbWV0YWRhdGEgZGlzY292ZXJlZCBpbiAke2RvY0luZm8udnBhdGh9YCk7XG4gICAgICAgIH0gKi0tL1xuXG4gICAgICAgIG1ldGFkYXRhLmNvbnRlbnQgPSBcIlwiO1xuICAgICAgICBtZXRhZGF0YS5kb2N1bWVudCA9IHt9O1xuICAgICAgICBtZXRhZGF0YS5kb2N1bWVudC5iYXNlZGlyID0gZG9jSW5mby5tb3VudFBvaW50O1xuICAgICAgICBtZXRhZGF0YS5kb2N1bWVudC5yZWxwYXRoID0gZG9jSW5mby5wYXRoSW5Nb3VudGVkO1xuICAgICAgICBtZXRhZGF0YS5kb2N1bWVudC5yZWxyZW5kZXIgPSByZW5kZXJlci5maWxlUGF0aChkb2NJbmZvLnBhdGhJbk1vdW50ZWQpO1xuICAgICAgICBtZXRhZGF0YS5kb2N1bWVudC5wYXRoID0gZG9jSW5mby52cGF0aDtcbiAgICAgICAgbWV0YWRhdGEuZG9jdW1lbnQucmVuZGVyVG8gPSBkb2NJbmZvLnJlbmRlclBhdGg7XG5cbiAgICAgICAgLy8gRW5zdXJlIHRoZSA8ZW0+dGFnczwvZW0+IGZpZWxkIGlzIGFuIGFycmF5XG4gICAgICAgIGlmICghKG1ldGFkYXRhLnRhZ3MpKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS50YWdzID0gW107XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChtZXRhZGF0YS50YWdzKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxldCB0YWdsaXN0ID0gW107XG4gICAgICAgICAgICBjb25zdCByZSA9IC9cXHMqLFxccyotLS87XG4gICAgICAgICAgICBtZXRhZGF0YS50YWdzLnNwbGl0KHJlKS5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgICAgICAgICAgdGFnbGlzdC5wdXNoKHRhZy50cmltKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtZXRhZGF0YS50YWdzID0gdGFnbGlzdDtcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtZXRhZGF0YS50YWdzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBGT1JNQVQgRVJST1IgLSAke2RvY0luZm8udnBhdGh9IGhhcyBiYWRseSBmb3JtYXR0ZWQgdGFncyBgLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLnRhZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWV0YWRhdGEuY29uZmlnICAgICAgPSBjb25maWc7XG4gICAgICAgIG1ldGFkYXRhLnBhcnRpYWxTeW5jID0gKGF3YWl0IHBhcnRpYWxGdW5jcykucGFydGlhbFN5bmMuYmluZChyZW5kZXJlciwgY29uZmlnKTtcbiAgICAgICAgbWV0YWRhdGEucGFydGlhbCAgICAgPSAoYXdhaXQgcGFydGlhbEZ1bmNzKS5wYXJ0aWFsLmJpbmQocmVuZGVyZXIsIGNvbmZpZyk7XG5cbiAgICAgICAgbWV0YWRhdGEucm9vdF91cmwgPSBjb25maWcucm9vdF91cmw7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5yb290X3VybCkge1xuICAgICAgICAgICAgbGV0IHBSb290VXJsID0gdXJsLnBhcnNlKGNvbmZpZy5yb290X3VybCk7XG4gICAgICAgICAgICBwUm9vdFVybC5wYXRobmFtZSA9IHBhdGgubm9ybWFsaXplKFxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4ocFJvb3RVcmwucGF0aG5hbWUsIG1ldGFkYXRhLmRvY3VtZW50LnJlbmRlclRvKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1ldGFkYXRhLnJlbmRlcmVkX3VybCA9IHVybC5mb3JtYXQocFJvb3RVcmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWV0YWRhdGEucmVuZGVyZWRfdXJsID0gbWV0YWRhdGEuZG9jdW1lbnQucmVuZGVyVG87XG4gICAgICAgIH1cblxuICAgICAgICBtZXRhZGF0YS5ha2FzaGEgPSB0aGlzLmFrYXNoYTtcbiAgICAgICAgbWV0YWRhdGEucGx1Z2luID0gY29uZmlnLnBsdWdpbjtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYG5ld0luaXRNZXRhZGF0YWAsIGRvY0luZm8pO1xuICAgICAgICBtZXRhZGF0YS5yZW5kZXJlZF9kYXRlID0gZG9jSW5mby5zdGF0cy5tdGltZTtcblxuICAgICAgICBpZiAoIW1ldGFkYXRhLnB1YmxpY2F0aW9uRGF0ZSkge1xuICAgICAgICAgICAgdmFyIGRhdGVTZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChkb2NJbmZvLmRvY01ldGFkYXRhICYmIGRvY0luZm8uZG9jTWV0YWRhdGEucHVibERhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBEYXRlLnBhcnNlKGRvY0luZm8uZG9jTWV0YWRhdGEucHVibERhdGUpO1xuICAgICAgICAgICAgICAgIGlmICghIGlzTmFOKHBhcnNlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEucHVibGljYXRpb25EYXRlID0gbmV3IERhdGUocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0ZVNldCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISBkYXRlU2V0ICYmIGRvY0luZm8uc3RhdHMgJiYgZG9jSW5mby5zdGF0cy5tdGltZSkge1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhLnB1YmxpY2F0aW9uRGF0ZSA9IG5ldyBEYXRlKGRvY0luZm8uc3RhdHMubXRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtZXRhZGF0YS5wdWJsaWNhdGlvbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5wdWJsaWNhdGlvbkRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1ldGFkYXRhO1xuICAgIH0gKi9cblxufVxuIl19