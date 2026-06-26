"use strict";
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AsciidocRenderer_doctype;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsciidocRenderer = void 0;
// import * as path from 'path';
const util = __importStar(require("util"));
const Renderer_js_1 = require("./Renderer.js");
const index_1 = require("./index");
const core_1 = require("@asciidoctor/core");
// const asciidoctor = AsciiDoctor();
class AsciidocRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.adoc", /^(.*\.html)\.(adoc)$|^(.*)\.(adoc)$/);
        _AsciidocRenderer_doctype.set(this, void 0);
        __classPrivateFieldSet(this, _AsciidocRenderer_doctype, 'article', "f");
    }
    configuration(options) {
        if (options && options.doctype) {
            __classPrivateFieldSet(this, _AsciidocRenderer_doctype, options.doctype, "f");
        }
        return this;
    }
    // http://asciidoctor.org/docs/user-manual/#ruby-api-options
    // That lists all the options which can be set
    // Of interest are:
    //     base_dir - controls where the include directive pulls files
    //     safe - enables safe mode (?? what does that mean ??)
    //     template_dir - controls where template files are found
    async convert(context) {
        var options = context.metadata.asciidoctor ? context.metadata.asciidoctor : {
            doctype: __classPrivateFieldGet(this, _AsciidocRenderer_doctype, "f")
        };
        // AsciiDoctor.js doesn't allow non-String/Number items in 
        // the attributes object.  That means we cannot simply use
        // the metadata as-is, but have to select out the items to include.
        //
        // First, this steps through the keys in metadata object looking
        // for the items that are strings or numbers.  That limits the
        // data items to what AsciiDoctor supports.
        //
        // Second, we skip the 'title' item because AsciiDoctor has
        // special treatment for that attribute.
        options.attributes = {};
        for (let key in context.metadata) {
            if ((typeof context.metadata[key] === 'string'
                || typeof context.metadata[key] === 'number')
                && key !== 'title') {
                options.attributes[key] = context.metadata[key];
            }
        }
        // console.log(`convert ${util.inspect(options)}`);
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`AsciiDOC convert no context.body or context.content supplied for rendering`);
        }
        const ret = await (0, core_1.convert)(toRender, options);
        if (typeof ret !== 'string') {
            throw new Error(`convert gave us a non-string (${typeof ret}) for ${context.fspath} ${util.inspect(ret)}`);
        }
        else {
            return ret;
        }
    }
    // renderSync(context: RenderingContext): string {
    //     // console.log('AsciidocRenderer renderSync '+ text);
    //     var ret = this.convert(context);
    //     // console.log(ret);
    //     return ret;
    // }
    async render(context) {
        // console.log('AsciidocRenderer render');
        return this.convert(context /* .content, context.metadata */);
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
            throw new Error(`AsciidocRenderer does not render files with this extension ${context.fspath}`);
        }
        return index_1.RenderingFormat.HTML;
    }
}
exports.AsciidocRenderer = AsciidocRenderer;
_AsciidocRenderer_doctype = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWFzY2lpZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1hc2NpaWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxnQ0FBZ0M7QUFDaEMsMkNBQTZCO0FBQzdCLCtDQUEyRDtBQUMzRCxtQ0FBNEQ7QUFFNUQsNENBSTJCO0FBRTNCLHFDQUFxQztBQUVyQyxNQUFhLGdCQUFpQixTQUFRLHNCQUFRO0lBSTFDO1FBQ0ksS0FBSyxDQUFDLFlBQVksRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1FBSC9ELDRDQUFTO1FBSUwsdUJBQUEsSUFBSSw2QkFBWSxTQUFTLE1BQUEsQ0FBQztJQUM5QixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQU87UUFDakIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLHVCQUFBLElBQUksNkJBQVksT0FBTyxDQUFDLE9BQU8sTUFBQSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsNERBQTREO0lBQzVELDhDQUE4QztJQUM5QyxtQkFBbUI7SUFDbkIsa0VBQWtFO0lBQ2xFLDJEQUEyRDtJQUMzRCw2REFBNkQ7SUFDN0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF5QjtRQUNuQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLE9BQU8sRUFBRSx1QkFBQSxJQUFJLGlDQUFTO1NBQ3pCLENBQUM7UUFDRiwyREFBMkQ7UUFDM0QsMERBQTBEO1FBQzFELG1FQUFtRTtRQUNuRSxFQUFFO1FBQ0YsZ0VBQWdFO1FBQ2hFLDhEQUE4RDtRQUM5RCwyQ0FBMkM7UUFDM0MsRUFBRTtRQUNGLDJEQUEyRDtRQUMzRCx3Q0FBd0M7UUFDeEMsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO21CQUN6QyxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxDQUFDO21CQUMxQyxHQUFHLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRCxDQUFDO1FBQ0wsQ0FBQztRQUNELG1EQUFtRDtRQUNuRCxNQUFNLFFBQVEsR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25GLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1FBQ2xHLENBQUM7UUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsY0FBTyxFQUNyQixRQUFRLEVBQ1IsT0FBTyxDQUFDLENBQUM7UUFDYixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0csQ0FBQzthQUFNLENBQUM7WUFDSixPQUFlLEdBQUcsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCw0REFBNEQ7SUFDNUQsdUNBQXVDO0lBQ3ZDLDJCQUEyQjtJQUMzQixrQkFBa0I7SUFDbEIsSUFBSTtJQUVKLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBeUI7UUFDbEMsMENBQTBDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsYUFBYSxDQUFDLE9BQXlCO1FBQ25DLE9BQU8sSUFBQSw4QkFBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQXlCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7UUFDRCxPQUFPLHVCQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQXhGRCw0Q0F3RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleCc7XG5cbmltcG9ydCB7XG4gICAgY29udmVydCxcbiAgICBEb2N1bWVudFxuICAgIC8vIGRlZmF1bHQgYXMgQXNjaWlEb2N0b3Jcbn0gZnJvbSAnQGFzY2lpZG9jdG9yL2NvcmUnO1xuXG4vLyBjb25zdCBhc2NpaWRvY3RvciA9IEFzY2lpRG9jdG9yKCk7XG5cbmV4cG9ydCBjbGFzcyBBc2NpaWRvY1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuXG4gICAgI2RvY3R5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5hZG9jXCIsIC9eKC4qXFwuaHRtbClcXC4oYWRvYykkfF4oLiopXFwuKGFkb2MpJC8pO1xuICAgICAgICB0aGlzLiNkb2N0eXBlID0gJ2FydGljbGUnO1xuICAgIH1cblxuICAgIGNvbmZpZ3VyYXRpb24ob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRvY3R5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuI2RvY3R5cGUgPSBvcHRpb25zLmRvY3R5cGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2FzY2lpZG9jdG9yLm9yZy9kb2NzL3VzZXItbWFudWFsLyNydWJ5LWFwaS1vcHRpb25zXG4gICAgLy8gVGhhdCBsaXN0cyBhbGwgdGhlIG9wdGlvbnMgd2hpY2ggY2FuIGJlIHNldFxuICAgIC8vIE9mIGludGVyZXN0IGFyZTpcbiAgICAvLyAgICAgYmFzZV9kaXIgLSBjb250cm9scyB3aGVyZSB0aGUgaW5jbHVkZSBkaXJlY3RpdmUgcHVsbHMgZmlsZXNcbiAgICAvLyAgICAgc2FmZSAtIGVuYWJsZXMgc2FmZSBtb2RlICg/PyB3aGF0IGRvZXMgdGhhdCBtZWFuID8/KVxuICAgIC8vICAgICB0ZW1wbGF0ZV9kaXIgLSBjb250cm9scyB3aGVyZSB0ZW1wbGF0ZSBmaWxlcyBhcmUgZm91bmRcbiAgICBhc3luYyBjb252ZXJ0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGNvbnRleHQubWV0YWRhdGEuYXNjaWlkb2N0b3IgPyBjb250ZXh0Lm1ldGFkYXRhLmFzY2lpZG9jdG9yIDoge1xuICAgICAgICAgICAgZG9jdHlwZTogdGhpcy4jZG9jdHlwZVxuICAgICAgICB9O1xuICAgICAgICAvLyBBc2NpaURvY3Rvci5qcyBkb2Vzbid0IGFsbG93IG5vbi1TdHJpbmcvTnVtYmVyIGl0ZW1zIGluIFxuICAgICAgICAvLyB0aGUgYXR0cmlidXRlcyBvYmplY3QuICBUaGF0IG1lYW5zIHdlIGNhbm5vdCBzaW1wbHkgdXNlXG4gICAgICAgIC8vIHRoZSBtZXRhZGF0YSBhcy1pcywgYnV0IGhhdmUgdG8gc2VsZWN0IG91dCB0aGUgaXRlbXMgdG8gaW5jbHVkZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRmlyc3QsIHRoaXMgc3RlcHMgdGhyb3VnaCB0aGUga2V5cyBpbiBtZXRhZGF0YSBvYmplY3QgbG9va2luZ1xuICAgICAgICAvLyBmb3IgdGhlIGl0ZW1zIHRoYXQgYXJlIHN0cmluZ3Mgb3IgbnVtYmVycy4gIFRoYXQgbGltaXRzIHRoZVxuICAgICAgICAvLyBkYXRhIGl0ZW1zIHRvIHdoYXQgQXNjaWlEb2N0b3Igc3VwcG9ydHMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNlY29uZCwgd2Ugc2tpcCB0aGUgJ3RpdGxlJyBpdGVtIGJlY2F1c2UgQXNjaWlEb2N0b3IgaGFzXG4gICAgICAgIC8vIHNwZWNpYWwgdHJlYXRtZW50IGZvciB0aGF0IGF0dHJpYnV0ZS5cbiAgICAgICAgb3B0aW9ucy5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZXh0Lm1ldGFkYXRhKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0Lm1ldGFkYXRhW2tleV0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgIHx8IHR5cGVvZiBjb250ZXh0Lm1ldGFkYXRhW2tleV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAmJiBrZXkgIT09ICd0aXRsZScpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJpYnV0ZXNba2V5XSA9IGNvbnRleHQubWV0YWRhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgY29udmVydCAke3V0aWwuaW5zcGVjdChvcHRpb25zKX1gKTtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQXNjaWlET0MgY29udmVydCBubyBjb250ZXh0LmJvZHkgb3IgY29udGV4dC5jb250ZW50IHN1cHBsaWVkIGZvciByZW5kZXJpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXQgPSBhd2FpdCBjb252ZXJ0KFxuICAgICAgICAgICAgdG9SZW5kZXIsXG4gICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgaWYgKHR5cGVvZiByZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbnZlcnQgZ2F2ZSB1cyBhIG5vbi1zdHJpbmcgKCR7dHlwZW9mIHJldH0pIGZvciAke2NvbnRleHQuZnNwYXRofSAke3V0aWwuaW5zcGVjdChyZXQpfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDxzdHJpbmc+cmV0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogc3RyaW5nIHtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ0FzY2lpZG9jUmVuZGVyZXIgcmVuZGVyU3luYyAnKyB0ZXh0KTtcbiAgICAvLyAgICAgdmFyIHJldCA9IHRoaXMuY29udmVydChjb250ZXh0KTtcbiAgICAvLyAgICAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgICAvLyAgICAgcmV0dXJuIHJldDtcbiAgICAvLyB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBc2NpaWRvY1JlbmRlcmVyIHJlbmRlcicpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0KGNvbnRleHQgLyogLmNvbnRlbnQsIGNvbnRleHQubWV0YWRhdGEgKi8pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFzY2lpZG9jUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxufVxuIl19