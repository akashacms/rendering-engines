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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsciidocRenderer = void 0;
// import * as path from 'path';
// import * as util from 'util';
const Renderer_js_1 = require("./Renderer.js");
const index_1 = require("./index");
const core_1 = __importDefault(require("@asciidoctor/core"));
const core_2 = __importDefault(require("@asciidoctor/core"));
const asciidoctor = (0, core_1.default)();
const _renderer_doctype = Symbol('doctype');
class AsciidocRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.adoc", /^(.*\.html)\.(adoc)$/);
        this[_renderer_doctype] = 'article';
    }
    configuration(options) {
        if (options && options.doctype) {
            this[_renderer_doctype] = options.doctype;
        }
        return this;
    }
    // http://asciidoctor.org/docs/user-manual/#ruby-api-options
    // That lists all the options which can be set
    // Of interest are:
    //     base_dir - controls where the include directive pulls files
    //     safe - enables safe mode (?? what does that mean ??)
    //     template_dir - controls where template files are found
    convert(context) {
        var options = context.metadata.asciidoctor ? context.metadata.asciidoctor : {
            doctype: this[_renderer_doctype]
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
        const ret = asciidoctor.convert(context.content, options);
        if (ret instanceof core_2.default) {
            throw new Error(`convert gave us a Document for ${context.fspath}`);
        }
        else {
            return ret;
        }
    }
    renderSync(context) {
        // console.log('AsciidocRenderer renderSync '+ text);
        var ret = this.convert(context);
        // console.log(ret);
        return ret;
    }
    async render(context) {
        // console.log('AsciidocRenderer render');
        return new Promise((resolve, reject) => {
            try {
                resolve(this.convert(context /* .content, context.metadata */));
            }
            catch (e) {
                reject(e);
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWFzY2lpZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1hc2NpaWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFFSCxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLCtDQUEyRDtBQUMzRCxtQ0FBNEQ7QUFFNUQsNkRBQTJEO0FBQzNELDZEQUF5QztBQUV6QyxNQUFNLFdBQVcsR0FBRyxJQUFBLGNBQVcsR0FBRSxDQUFDO0FBRWxDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTVDLE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVE7SUFDMUM7UUFDSSxLQUFLLENBQUMsWUFBWSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBTztRQUNqQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsNERBQTREO0lBQzVELDhDQUE4QztJQUM5QyxtQkFBbUI7SUFDbkIsa0VBQWtFO0lBQ2xFLDJEQUEyRDtJQUMzRCw2REFBNkQ7SUFDN0QsT0FBTyxDQUFDLE9BQXlCO1FBQzdCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEUsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNuQyxDQUFDO1FBQ0YsMkRBQTJEO1FBQzNELDBEQUEwRDtRQUMxRCxtRUFBbUU7UUFDbkUsRUFBRTtRQUNGLGdFQUFnRTtRQUNoRSw4REFBOEQ7UUFDOUQsMkNBQTJDO1FBQzNDLEVBQUU7UUFDRiwyREFBMkQ7UUFDM0Qsd0NBQXdDO1FBQ3hDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7bUJBQ3pDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLENBQUM7bUJBQzFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuRDtTQUNKO1FBQ0QsbURBQW1EO1FBQ25ELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFJLEdBQUcsWUFBWSxjQUFRLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDdkU7YUFBTTtZQUNILE9BQWUsR0FBRyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUF5QjtRQUNoQyxxREFBcUQ7UUFDckQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxvQkFBb0I7UUFDcEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUF5QjtRQUNsQywwQ0FBMEM7UUFDMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJO2dCQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7YUFDbkU7WUFBQyxPQUFNLENBQUMsRUFBRTtnQkFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxPQUF5QjtRQUNuQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw4REFBOEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDbkc7UUFDRCxPQUFPLHVCQUFlLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQXJGRCw0Q0FxRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE5IERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbi8vIGltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleCc7XG5cbmltcG9ydCB7IGRlZmF1bHQgYXMgQXNjaWlEb2N0b3IgfSBmcm9tICdAYXNjaWlkb2N0b3IvY29yZSc7XG5pbXBvcnQgRG9jdW1lbnQgZnJvbSAnQGFzY2lpZG9jdG9yL2NvcmUnO1xuXG5jb25zdCBhc2NpaWRvY3RvciA9IEFzY2lpRG9jdG9yKCk7XG5cbmNvbnN0IF9yZW5kZXJlcl9kb2N0eXBlID0gU3ltYm9sKCdkb2N0eXBlJyk7XG5cbmV4cG9ydCBjbGFzcyBBc2NpaWRvY1JlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIi5odG1sLmFkb2NcIiwgL14oLipcXC5odG1sKVxcLihhZG9jKSQvKTtcbiAgICAgICAgdGhpc1tfcmVuZGVyZXJfZG9jdHlwZV0gPSAnYXJ0aWNsZSc7XG4gICAgfVxuXG4gICAgY29uZmlndXJhdGlvbihvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZG9jdHlwZSkge1xuICAgICAgICAgICAgdGhpc1tfcmVuZGVyZXJfZG9jdHlwZV0gPSBvcHRpb25zLmRvY3R5cGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2FzY2lpZG9jdG9yLm9yZy9kb2NzL3VzZXItbWFudWFsLyNydWJ5LWFwaS1vcHRpb25zXG4gICAgLy8gVGhhdCBsaXN0cyBhbGwgdGhlIG9wdGlvbnMgd2hpY2ggY2FuIGJlIHNldFxuICAgIC8vIE9mIGludGVyZXN0IGFyZTpcbiAgICAvLyAgICAgYmFzZV9kaXIgLSBjb250cm9scyB3aGVyZSB0aGUgaW5jbHVkZSBkaXJlY3RpdmUgcHVsbHMgZmlsZXNcbiAgICAvLyAgICAgc2FmZSAtIGVuYWJsZXMgc2FmZSBtb2RlICg/PyB3aGF0IGRvZXMgdGhhdCBtZWFuID8/KVxuICAgIC8vICAgICB0ZW1wbGF0ZV9kaXIgLSBjb250cm9scyB3aGVyZSB0ZW1wbGF0ZSBmaWxlcyBhcmUgZm91bmRcbiAgICBjb252ZXJ0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBzdHJpbmcge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGNvbnRleHQubWV0YWRhdGEuYXNjaWlkb2N0b3IgPyBjb250ZXh0Lm1ldGFkYXRhLmFzY2lpZG9jdG9yIDoge1xuICAgICAgICAgICAgZG9jdHlwZTogdGhpc1tfcmVuZGVyZXJfZG9jdHlwZV1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gQXNjaWlEb2N0b3IuanMgZG9lc24ndCBhbGxvdyBub24tU3RyaW5nL051bWJlciBpdGVtcyBpbiBcbiAgICAgICAgLy8gdGhlIGF0dHJpYnV0ZXMgb2JqZWN0LiAgVGhhdCBtZWFucyB3ZSBjYW5ub3Qgc2ltcGx5IHVzZVxuICAgICAgICAvLyB0aGUgbWV0YWRhdGEgYXMtaXMsIGJ1dCBoYXZlIHRvIHNlbGVjdCBvdXQgdGhlIGl0ZW1zIHRvIGluY2x1ZGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEZpcnN0LCB0aGlzIHN0ZXBzIHRocm91Z2ggdGhlIGtleXMgaW4gbWV0YWRhdGEgb2JqZWN0IGxvb2tpbmdcbiAgICAgICAgLy8gZm9yIHRoZSBpdGVtcyB0aGF0IGFyZSBzdHJpbmdzIG9yIG51bWJlcnMuICBUaGF0IGxpbWl0cyB0aGVcbiAgICAgICAgLy8gZGF0YSBpdGVtcyB0byB3aGF0IEFzY2lpRG9jdG9yIHN1cHBvcnRzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTZWNvbmQsIHdlIHNraXAgdGhlICd0aXRsZScgaXRlbSBiZWNhdXNlIEFzY2lpRG9jdG9yIGhhc1xuICAgICAgICAvLyBzcGVjaWFsIHRyZWF0bWVudCBmb3IgdGhhdCBhdHRyaWJ1dGUuXG4gICAgICAgIG9wdGlvbnMuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gY29udGV4dC5tZXRhZGF0YSkge1xuICAgICAgICAgICAgaWYgKCh0eXBlb2YgY29udGV4dC5tZXRhZGF0YVtrZXldID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICB8fCB0eXBlb2YgY29udGV4dC5tZXRhZGF0YVtrZXldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgJiYga2V5ICE9PSAndGl0bGUnKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5hdHRyaWJ1dGVzW2tleV0gPSBjb250ZXh0Lm1ldGFkYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coYGNvbnZlcnQgJHt1dGlsLmluc3BlY3Qob3B0aW9ucyl9YCk7XG4gICAgICAgIGNvbnN0IHJldCA9IGFzY2lpZG9jdG9yLmNvbnZlcnQoY29udGV4dC5jb250ZW50LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIERvY3VtZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbnZlcnQgZ2F2ZSB1cyBhIERvY3VtZW50IGZvciAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDxzdHJpbmc+cmV0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogc3RyaW5nIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0FzY2lpZG9jUmVuZGVyZXIgcmVuZGVyU3luYyAnKyB0ZXh0KTtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuY29udmVydChjb250ZXh0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBc2NpaWRvY1JlbmRlcmVyIHJlbmRlcicpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuY29udmVydChjb250ZXh0IC8qIC5jb250ZW50LCBjb250ZXh0Lm1ldGFkYXRhICovKSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFzY2lpZG9jUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxufVxuIl19