"use strict";
/**
 *
 * Copyright 2020-2022 David Herron
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
exports.HandlebarsRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const Handlebars = __importStar(require("handlebars"));
class HandlebarsRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.handlebars", /^(.*\.html)\.(handlebars)$/);
    }
    async render(context) {
        try {
            const template = Handlebars.compile(typeof context.body === 'string' ? context.body : context.content);
            return template(context.metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            var errstack = e.stack ? e.stack : e;
            throw new Error(`Error with Handlebars in file ${docpath} ${errstack}`);
        }
    }
    renderSync(context) {
        try {
            const template = Handlebars.compile(typeof context.body === 'string' ? context.body : context.content);
            return template(context.metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            var errstack = e.stack ? e.stack : e;
            throw new Error(`Error with Handlebars in file ${docpath} ${errstack}`);
        }
    }
    /**
     * Parse frontmatter in the format of lines of dashes
     * surrounding a YAML structure.
     *
     * @param context
     * @returns
     */
    parseMetadata(context) {
        return (0, Renderer_js_1.parseFrontmatter)(context);
    }
    renderFormat(context) {
        if (!this.match(context.fspath)) {
            throw new Error(`HandlebarsRenderer does not render files with this extension ${context.fspath}`);
        }
        return index_js_1.RenderingFormat.HTML;
    }
    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        return true;
    }
}
exports.HandlebarsRenderer = HandlebarsRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWhhbmRsZWJhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVuZGVyLWhhbmRsZWJhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSCwrQ0FBMkQ7QUFDM0QseUNBQStEO0FBRS9ELHVEQUF5QztBQUV6QyxNQUFhLGtCQUFtQixTQUFRLHNCQUFRO0lBQzVDO1FBQ0ksS0FBSyxDQUFDLGtCQUFrQixFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBeUI7UUFDbEMsSUFBSTtZQUNBLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQy9CLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ3BFLENBQUM7WUFDRixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckM7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQXlCO1FBQ2hDLElBQUk7WUFDQSxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUMvQixPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUNwRSxDQUFDO1lBQ0YsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNGLGFBQWEsQ0FBQyxPQUF5QjtRQUNwQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDckc7UUFDRCxPQUFPLDBCQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxLQUFLO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBdkRELGdEQXVEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDIwLTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXguanMnO1xuXG5pbXBvcnQgKiBhcyBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuXG5leHBvcnQgY2xhc3MgSGFuZGxlYmFyc1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIi5odG1sLmhhbmRsZWJhcnNcIiwgL14oLipcXC5odG1sKVxcLihoYW5kbGViYXJzKSQvKTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZShjb250ZXh0Lm1ldGFkYXRhKTtcbiAgICAgICAgfSBjYXRjaChlKSB7IFxuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIHZhciBlcnJzdGFjayA9IGUuc3RhY2sgPyBlLnN0YWNrIDogZTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBIYW5kbGViYXJzIGluIGZpbGUgJHtkb2NwYXRofSAke2VycnN0YWNrfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZShjb250ZXh0Lm1ldGFkYXRhKTtcbiAgICAgICAgfSBjYXRjaChlKSB7IFxuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIHZhciBlcnJzdGFjayA9IGUuc3RhY2sgPyBlLnN0YWNrIDogZTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBIYW5kbGViYXJzIGluIGZpbGUgJHtkb2NwYXRofSAke2VycnN0YWNrfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhbmRsZWJhcnNSZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBjYW5ub3QgYWxsb3cgUEhQIGNvZGUgdG8gcnVuIHRocm91Z2ggTWFoYWJodXRhLlxuICAgICAqL1xuICAgIGRvTWFoYWJodXRhKGZwYXRoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiJdfQ==