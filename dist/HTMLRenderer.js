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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFRNTFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0hUTUxSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILCtDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsMkJBQXFDO0FBRXJDLDJDQUE2QjtBQUc3QixxREFBdUM7QUFDdkMsa0NBQWtDO0FBRWxDOztHQUVHO0FBQ0gsTUFBYSxZQUFhLFNBQVEsc0JBQVE7SUFFdEM7OztPQUdHO0lBQ0gsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUztRQUNqQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZTtZQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2RixPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsc0JBQXNCLENBQUMsSUFBSSxFQUFFLFdBQVc7UUFDcEMsS0FBSyxNQUFNLElBQUksSUFBSSxXQUFXLEVBQUU7WUFDNUIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O1FBSUk7SUFFSiwwRUFBMEU7SUFDMUUsK0JBQStCO0lBRS9COztPQUVHO0lBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE4Q0k7SUFFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF5Q0k7SUFFSjs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLEtBQUs7UUFDYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSztRQUM1QixNQUFNLElBQUksR0FBRyxNQUFNLGFBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQTZGSjtBQTVPRCxvQ0E0T0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE5IERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbi8vIGNvbnN0IHJlbmRlciAgICA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG5pbXBvcnQgeyBwcm9taXNlcyBhcyBmc3AgfSBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0IG1hdHRlciBmcm9tICdncmF5LW1hdHRlcic7XG5pbXBvcnQgKiBhcyBtYWhhYmh1dGEgZnJvbSAnbWFoYWJodXRhJztcbi8vIGNvbnN0IGRhdGEgPSByZXF1aXJlKCcuL2RhdGEnKTtcblxuLyoqXG4gKiBSZW5kZXJpbmcgc3VwcG9ydCBmb3IgYW55IGZpbGUgdGhhdCBwcm9kdWNlcyBIVE1MIHdoZW4gcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBIVE1MUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG5cbiAgICAvKipcbiAgICAgKiBTdXBwb3J0IGZvciBNYWhhYmh1dGEgLS0galF1ZXJ5LWxpa2UgcHJvY2Vzc2luZyBvZiBIVE1MIERPTSBiZWZvcmUgUmVuZGVyaW5nXG4gICAgICogZG93biB0byBIVE1MIHRleHQuXG4gICAgICovXG4gICAgbWFoYXJ1bihyZW5kZXJlZCwgbWV0YWRhdGEsIG1haGFmdW5jcykge1xuICAgICAgICBpZiAodHlwZW9mIHJlbmRlcmVkID09PSAndW5kZWZpbmVkJyB8fCByZW5kZXJlZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyByZW5kZXJlZCBwcm92aWRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbWV0YWRhdGEgPT09ICd1bmRlZmluZWQnIHx8IG1ldGFkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG1ldGFkYXRhIHByb3ZpZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtYWhhYmh1dGEgPT09ICd1bmRlZmluZWQnIHx8IG1haGFiaHV0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBtYWhhYmh1dGEgcHJvdmlkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG1ldGFkYXRhLmNvbmZpZy5tYWhhYmh1dGFDb25maWcpIG1haGFiaHV0YS5jb25maWcobWV0YWRhdGEuY29uZmlnLm1haGFiaHV0YUNvbmZpZyk7XG4gICAgICAgIHJldHVybiBtYWhhYmh1dGEucHJvY2Vzc0FzeW5jKHJlbmRlcmVkLCBtZXRhZGF0YSwgbWFoYWZ1bmNzKTtcbiAgICB9XG5cbiAgICBjb3B5TWV0YWRhdGFQcm9wZXJ0aWVzKGRhdGEsIGZyb250bWF0dGVyKSB7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBmcm9udG1hdHRlcikge1xuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiBkYXRhKSkgZGF0YVtwcm9wXSA9IGZyb250bWF0dGVyW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qIGFzeW5jIHJlYWREb2N1bWVudChmbkRvYykge1xuICAgICAgICBjb25zdCBkb2NMYXlvdXQgPSBhd2FpdCBmc3AucmVhZEZpbGUoZm5Eb2MsICd1dGY4Jyk7XG4gICAgICAgIGNvbnN0IGZtID0gbWF0dGVyKGRvY0xheW91dCk7XG4gICAgICAgIHJldHVybiBmbTtcbiAgICB9ICovXG5cbiAgICAvLyByZW5kZXJGb3JMYXlvdXQgJiYgcmVuZGVyRG9jdW1lbnQgbmVlZHMgdG8gYmUgaW4gQWthc2hhUmVuZGVyIHJlbmRlci5qc1xuICAgIC8vIFJld3JpdGUgdG8gc2ltcGxpZnkgdGhlIGZsb3dcblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBkb2N1bWVudCBtZXRhZGF0YSBzYXlzIHRvIHJlbmRlciBpbnRvIGEgdGVtcGxhdGUsIGRvIHNvLlxuICAgICAqL1xuICAgIC8qIGFzeW5jIHJlbmRlckZvckxheW91dChyZW5kZXJlZCwgbWV0YWRhdGEsIGNvbmZpZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncmVuZGVyRm9yTGF5b3V0ICcrIHV0aWwuaW5zcGVjdChtZXRhZGF0YSkpO1xuICAgICAgICBpZiAobWV0YWRhdGEubGF5b3V0KSB7XG4gICAgICAgICAgICAvLyBmaW5kIGxheW91dFxuICAgICAgICAgICAgLy8gcmVhZCBsYXlvdXRcbiAgICAgICAgICAgIC8vIHNwbGl0IG91dCBmcm9udG1hdHRlciAmIGNvbnRlbnRcbiAgICAgICAgICAgIC8vIGZpbmQgcmVuZGVyZXJcbiAgICAgICAgICAgIC8vIHJlbmRlcmVyLnJlbmRlclxuICAgICAgICAgICAgLy8gbWFoYWJodXRhXG5cbiAgICAgICAgICAgIC8vIGNvbnN0IGxheW91dFN0YXJ0ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgdmFyIGxheW91dGNvbnRlbnQ7XG4gICAgICAgICAgICB2YXIgbGF5b3V0ZGF0YTtcbiAgICAgICAgICAgIHZhciBsYXlvdXRyZW5kZXJlZDtcbiAgICAgICAgICAgIHZhciBtZXRhZG9jcGF0aCA9IG1ldGFkYXRhLmRvY3VtZW50ID8gbWV0YWRhdGEuZG9jdW1lbnQucGF0aCA6IFwidW5rbm93blwiO1xuXG4gICAgICAgICAgICAvLyBjb25zdCBsYXlvdXRzID0gKGF3YWl0IGZpbGVjYWNoZSkubGF5b3V0cztcbiAgICAgICAgICAgIC8vIGF3YWl0IGxheW91dHMuaXNSZWFkeSgpO1xuXG4gICAgICAgICAgICAvLyBsZXQgZm91bmQgPSBhd2FpdCBsYXlvdXRzLmZpbmQobWV0YWRhdGEubGF5b3V0KTtcbiAgICAgICAgICAgIC8vIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGxheW91dCBmb3VuZCBpbiAke3V0aWwuaW5zcGVjdChjb25maWcubGF5b3V0RGlycyl9IGZvciAke21ldGFkYXRhLmxheW91dH0gaW4gZmlsZSAke21ldGFkYXRhLmRvY3VtZW50LnBhdGh9YCk7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIGNvbnN0IGZubGF5b3V0ID0gYXdhaXQgdGhpcy5maW5kTGF5b3V0KG1ldGFkYXRhLmxheW91dCk7XG4gICAgICAgICAgICBjb25zdCBkb2NMYXlvdXQgPSBhd2FpdCB0aGlzLnJlYWREb2N1bWVudChmbmxheW91dCk7XG5cbiAgICAgICAgICAgIGxheW91dGNvbnRlbnQgPSBkb2NMYXlvdXQuY29udGVudDtcbiAgICAgICAgICAgIGxheW91dGRhdGEgPSB0aGlzLmNvcHlNZXRhZGF0YVByb3BlcnRpZXMobWV0YWRhdGEsIGRvY0xheW91dC5kYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGF5b3V0ZGF0YS5jb250ZW50ID0gcmVuZGVyZWQ7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJlciA9IGNvbmZpZy5maW5kUmVuZGVyZXJQYXRoKG1ldGFkYXRhLmxheW91dCk7XG4gICAgICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyByZW5kZXJlciBmb3IgJHttZXRhZGF0YS5sYXlvdXR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxheW91dHJlbmRlcmVkID0gYXdhaXQgcmVuZGVyZXIucmVuZGVyKGxheW91dGNvbnRlbnQsIGxheW91dGRhdGEsIGZvdW5kKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZWUgPSBuZXcgRXJyb3IoYEVycm9yIHJlbmRlcmluZyAke21ldGFkb2NwYXRofSB3aXRoICR7bWV0YWRhdGEubGF5b3V0fSAke2Uuc3RhY2sgPyBlLnN0YWNrIDogZX1gKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVlKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsYXlvdXRyZW5kZXJlZDtcblxuICAgICAgICB9IGVsc2UgcmV0dXJuIHJlbmRlcmVkO1xuICAgIH0gKi9cblxuICAgIC8qIGFzeW5jIHJlbmRlclRvRmlsZShjb25maWcsIGRvY0luZm8pIHtcblxuICAgICAgICBjb25zdCByZW5kZXJTdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IHRoaXMucmVhZENvbnRlbnQoZG9jSW5mby5tb3VudGVkLCBkb2NJbmZvLnBhdGhJbk1vdW50ZWQpO1xuICAgICAgICBjb25zdCBmbSA9IHRoaXMucGFyc2VGcm9udG1hdHRlcihkb2MpO1xuICAgICAgICBjb25zdCBkb2Njb250ZW50ID0gZm0uY29udGVudDtcbiAgICAgICAgZGF0YS5yZXBvcnQoZG9jSW5mby5tb3VudFBvaW50LCBkb2NJbmZvLnZwYXRoLCBjb25maWcucmVuZGVyVG8sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRlJPTlRNQVRURVJcIiwgcmVuZGVyU3RhcnQpO1xuXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgdGhpcy5uZXdJbml0TWV0YWRhdGEoY29uZmlnLCBkb2NJbmZvKTtcbiAgICAgICAgY29uc3QgZG9jZGF0YSA9IG1ldGFkYXRhO1xuICAgICAgICBsZXQgZG9jcmVuZGVyZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkb2NyZW5kZXJlZCA9IGF3YWl0IHRoaXMucmVuZGVyKGRvY2NvbnRlbnQsIGRvY2RhdGEsIGRvY0luZm8pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHJlbmRlcmluZyAke2RvY0luZm8udnBhdGh9ICR7KGVyci5zdGFjayA/IGVyci5zdGFjayA6IGVycil9YCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHJlbmRlcmluZyAke2RvY0luZm8udnBhdGh9ICR7KGVyci5zdGFjayA/IGVyci5zdGFjayA6IGVycil9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5yZXBvcnQoZG9jSW5mby5tb3VudFBvaW50LCBkb2NJbmZvLnZwYXRoLCBjb25maWcucmVuZGVyVG8sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiRklSU1QgUkVOREVSXCIsIHJlbmRlclN0YXJ0KTtcblxuICAgICAgICBkb2NyZW5kZXJlZCA9IGF3YWl0IHRoaXMucmVuZGVyRm9yTGF5b3V0TmV3KGRvY3JlbmRlcmVkLCBkb2NkYXRhLCBjb25maWcpO1xuICAgICAgICBjb25zdCByZW5kZXJTZWNvbmRSZW5kZXIgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYXRhLnJlcG9ydChkb2NJbmZvLm1vdW50UG9pbnQsIGRvY0luZm8udnBhdGgsIGNvbmZpZy5yZW5kZXJUbywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJTRUNPTkQgUkVOREVSXCIsIHJlbmRlclN0YXJ0KTtcbiAgICAgICAgaWYgKHRoaXMuZG9NYWhhYmh1dGEoZG9jSW5mby52cGF0aCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZG9jcmVuZGVyZWQgPSBhd2FpdCB0aGlzLm1haGFydW4oZG9jcmVuZGVyZWQsIGRvY2RhdGEsIGNvbmZpZy5tYWhhZnVuY3MpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZTIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZWVlID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIE1haGFiaHV0YSAke2RvY0luZm8udnBhdGh9IHdpdGggJHttZXRhZGF0YS5sYXlvdXR9ICR7ZTIuc3RhY2sgPyBlMi5zdGFjayA6IGUyfWApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZWVlKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlZWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgcmVuZGVyRm9yTGF5b3V0IG1haGFiaHV0YSBub3QgYWxsb3dlZCAke2xheW91dHJlbmRlcmVkfWApO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEucmVwb3J0KGRvY0luZm8ubW91bnRQb2ludCwgZG9jSW5mby52cGF0aCwgY29uZmlnLnJlbmRlclRvLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk1BSEFCSFVUQVwiLCByZW5kZXJTdGFydCk7XG4gICAgICAgIGNvbnN0IHJlbmRlckRlc3QgPSBwYXRoLmpvaW4oY29uZmlnLnJlbmRlclRvLCB0aGlzLmZpbGVQYXRoKGRvY0luZm8udnBhdGgpKTtcbiAgICAgICAgYXdhaXQgZnNwLm1rZGlyKHBhdGguZGlybmFtZShyZW5kZXJEZXN0KSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIGF3YWl0IGZzcC53cml0ZUZpbGUocmVuZGVyRGVzdCwgZG9jcmVuZGVyZWQsICd1dGY4Jyk7XG4gICAgfSAqL1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgaXQncyBhbGxvd2VkIHRvIHJ1biBNYWhhYmh1dGEuICBTb21lIHJlbmRlcmluZyB0eXBlc1xuICAgICAqIGNhbm5vdCBhbGxvdyBNYWhhYmh1dGEgdG8gcnVuLiAgUmVuZGVyZXJzIHNob3VsZCBvdmVycmlkZSB0aGlzXG4gICAgICogZnVuY3Rpb24gaWYgbmVjZXNzYXJ5LlxuICAgICAqL1xuICAgIGRvTWFoYWJodXRhKGZwYXRoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGFzeW5jIHJlYWRDb250ZW50KGJhc2VkaXIsIGZwYXRoKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCBmc3AucmVhZEZpbGUocGF0aC5qb2luKGJhc2VkaXIsIGZwYXRoKSwgJ3V0ZjgnKTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgLy8gaW5pdE1ldGFkYXRhIHByb2JhYmx5IG5lZWRzIHRvIGJlIGluIEFrYXNoYVJlbmRlciByZW5kZXIuanNcblxuICAgIC8qXG4gICAgYXN5bmMgaW5pdE1ldGFkYXRhKGNvbmZpZywgZG9jSW5mbykge1xuXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcztcbiAgICAgICAgLy8gU3RhcnQgd2l0aCBhIGJhc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwYXNzZWQgaW50byB0aGUgdGVtcGxhdGVcbiAgICAgICAgdmFyIG1ldGFkYXRhID0geyB9O1xuXG4gICAgICAgIC8vIENvcHkgZGF0YSBmcm9tIGZyb250bWF0dGVyXG4gICAgICAgIGZvciAobGV0IHlwcm9wIGluIGRvY0luZm8uYmFzZU1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgaW5pdE1ldGFkYXRhICR7YmFzZWRpcn0gJHtmcGF0aH0gYmFzZU1ldGFkYXRhICR7YmFzZU1ldGFkYXRhW3lwcm9wXX1gKTtcbiAgICAgICAgICAgIG1ldGFkYXRhW3lwcm9wXSA9IGRvY0luZm8uYmFzZU1ldGFkYXRhW3lwcm9wXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB5cHJvcCBpbiBjb25maWcubWV0YWRhdGEpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhW3lwcm9wXSA9IGNvbmZpZy5tZXRhZGF0YVt5cHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZtbWNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQgeXByb3AgaW4gZG9jSW5mby5kb2NNZXRhZGF0YSkge1xuICAgICAgICAgICAgbWV0YWRhdGFbeXByb3BdID0gZG9jSW5mby5kb2NNZXRhZGF0YVt5cHJvcF07XG4gICAgICAgICAgICBmbW1jb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIC8qIGlmIChmbW1jb3VudCA8PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBXQVJOSU5HOiBObyBtZXRhZGF0YSBkaXNjb3ZlcmVkIGluICR7ZG9jSW5mby52cGF0aH1gKTtcbiAgICAgICAgfSAqLS0vXG5cbiAgICAgICAgbWV0YWRhdGEuY29udGVudCA9IFwiXCI7XG4gICAgICAgIG1ldGFkYXRhLmRvY3VtZW50ID0ge307XG4gICAgICAgIG1ldGFkYXRhLmRvY3VtZW50LmJhc2VkaXIgPSBkb2NJbmZvLm1vdW50UG9pbnQ7XG4gICAgICAgIG1ldGFkYXRhLmRvY3VtZW50LnJlbHBhdGggPSBkb2NJbmZvLnBhdGhJbk1vdW50ZWQ7XG4gICAgICAgIG1ldGFkYXRhLmRvY3VtZW50LnJlbHJlbmRlciA9IHJlbmRlcmVyLmZpbGVQYXRoKGRvY0luZm8ucGF0aEluTW91bnRlZCk7XG4gICAgICAgIG1ldGFkYXRhLmRvY3VtZW50LnBhdGggPSBkb2NJbmZvLnZwYXRoO1xuICAgICAgICBtZXRhZGF0YS5kb2N1bWVudC5yZW5kZXJUbyA9IGRvY0luZm8ucmVuZGVyUGF0aDtcblxuICAgICAgICAvLyBFbnN1cmUgdGhlIDxlbT50YWdzPC9lbT4gZmllbGQgaXMgYW4gYXJyYXlcbiAgICAgICAgaWYgKCEobWV0YWRhdGEudGFncykpIHtcbiAgICAgICAgICAgIG1ldGFkYXRhLnRhZ3MgPSBbXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKG1ldGFkYXRhLnRhZ3MpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbGV0IHRhZ2xpc3QgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlID0gL1xccyosXFxzKi0tLztcbiAgICAgICAgICAgIG1ldGFkYXRhLnRhZ3Muc3BsaXQocmUpLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgICAgICB0YWdsaXN0LnB1c2godGFnLnRyaW0oKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1ldGFkYXRhLnRhZ3MgPSB0YWdsaXN0O1xuICAgICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG1ldGFkYXRhLnRhZ3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEZPUk1BVCBFUlJPUiAtICR7ZG9jSW5mby52cGF0aH0gaGFzIGJhZGx5IGZvcm1hdHRlZCB0YWdzIGAsXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEudGFncyk7XG4gICAgICAgIH1cblxuICAgICAgICBtZXRhZGF0YS5jb25maWcgICAgICA9IGNvbmZpZztcbiAgICAgICAgbWV0YWRhdGEucGFydGlhbFN5bmMgPSAoYXdhaXQgcGFydGlhbEZ1bmNzKS5wYXJ0aWFsU3luYy5iaW5kKHJlbmRlcmVyLCBjb25maWcpO1xuICAgICAgICBtZXRhZGF0YS5wYXJ0aWFsICAgICA9IChhd2FpdCBwYXJ0aWFsRnVuY3MpLnBhcnRpYWwuYmluZChyZW5kZXJlciwgY29uZmlnKTtcblxuICAgICAgICBtZXRhZGF0YS5yb290X3VybCA9IGNvbmZpZy5yb290X3VybDtcblxuICAgICAgICBpZiAoY29uZmlnLnJvb3RfdXJsKSB7XG4gICAgICAgICAgICBsZXQgcFJvb3RVcmwgPSB1cmwucGFyc2UoY29uZmlnLnJvb3RfdXJsKTtcbiAgICAgICAgICAgIHBSb290VXJsLnBhdGhuYW1lID0gcGF0aC5ub3JtYWxpemUoXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihwUm9vdFVybC5wYXRobmFtZSwgbWV0YWRhdGEuZG9jdW1lbnQucmVuZGVyVG8pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWV0YWRhdGEucmVuZGVyZWRfdXJsID0gdXJsLmZvcm1hdChwUm9vdFVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXRhZGF0YS5yZW5kZXJlZF91cmwgPSBtZXRhZGF0YS5kb2N1bWVudC5yZW5kZXJUbztcbiAgICAgICAgfVxuXG4gICAgICAgIG1ldGFkYXRhLmFrYXNoYSA9IHRoaXMuYWthc2hhO1xuICAgICAgICBtZXRhZGF0YS5wbHVnaW4gPSBjb25maWcucGx1Z2luO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgbmV3SW5pdE1ldGFkYXRhYCwgZG9jSW5mbyk7XG4gICAgICAgIG1ldGFkYXRhLnJlbmRlcmVkX2RhdGUgPSBkb2NJbmZvLnN0YXRzLm10aW1lO1xuXG4gICAgICAgIGlmICghbWV0YWRhdGEucHVibGljYXRpb25EYXRlKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZVNldCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGRvY0luZm8uZG9jTWV0YWRhdGEgJiYgZG9jSW5mby5kb2NNZXRhZGF0YS5wdWJsRGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IERhdGUucGFyc2UoZG9jSW5mby5kb2NNZXRhZGF0YS5wdWJsRGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCEgaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YS5wdWJsaWNhdGlvbkRhdGUgPSBuZXcgRGF0ZShwYXJzZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkYXRlU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIGRhdGVTZXQgJiYgZG9jSW5mby5zdGF0cyAmJiBkb2NJbmZvLnN0YXRzLm10aW1lKSB7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEucHVibGljYXRpb25EYXRlID0gbmV3IERhdGUoZG9jSW5mby5zdGF0cy5tdGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1ldGFkYXRhLnB1YmxpY2F0aW9uRGF0ZSkge1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhLnB1YmxpY2F0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWV0YWRhdGE7XG4gICAgfSAqL1xuXG59XG4iXX0=