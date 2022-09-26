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
        const ret = asciidoctor.convert(context.body ? context.body : context.content, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWFzY2lpZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1hc2NpaWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFFSCxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLCtDQUEyRDtBQUMzRCxtQ0FBNEQ7QUFFNUQsNkRBQTJEO0FBQzNELDZEQUF5QztBQUV6QyxNQUFNLFdBQVcsR0FBRyxJQUFBLGNBQVcsR0FBRSxDQUFDO0FBRWxDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTVDLE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVE7SUFDMUM7UUFDSSxLQUFLLENBQUMsWUFBWSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBTztRQUNqQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsNERBQTREO0lBQzVELDhDQUE4QztJQUM5QyxtQkFBbUI7SUFDbkIsa0VBQWtFO0lBQ2xFLDJEQUEyRDtJQUMzRCw2REFBNkQ7SUFDN0QsT0FBTyxDQUFDLE9BQXlCO1FBQzdCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDeEUsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNuQyxDQUFDO1FBQ0YsMkRBQTJEO1FBQzNELDBEQUEwRDtRQUMxRCxtRUFBbUU7UUFDbkUsRUFBRTtRQUNGLGdFQUFnRTtRQUNoRSw4REFBOEQ7UUFDOUQsMkNBQTJDO1FBQzNDLEVBQUU7UUFDRiwyREFBMkQ7UUFDM0Qsd0NBQXdDO1FBQ3hDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7bUJBQ3pDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLENBQUM7bUJBQzFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuRDtTQUNKO1FBQ0QsbURBQW1EO1FBQ25ELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQzdDLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxHQUFHLFlBQVksY0FBUSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZFO2FBQU07WUFDSCxPQUFlLEdBQUcsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBeUI7UUFDaEMscURBQXFEO1FBQ3JELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsb0JBQW9CO1FBQ3BCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBeUI7UUFDbEMsMENBQTBDO1FBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSTtnQkFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO2FBQ25FO1lBQUMsT0FBTSxDQUFDLEVBQUU7Z0JBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxhQUFhLENBQUMsT0FBeUI7UUFDbkMsT0FBTyxJQUFBLDhCQUFnQixFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25HO1FBQ0QsT0FBTyx1QkFBZSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUF2RkQsNENBdUZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAyMiBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIGltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG4vLyBpbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXgnO1xuXG5pbXBvcnQgeyBkZWZhdWx0IGFzIEFzY2lpRG9jdG9yIH0gZnJvbSAnQGFzY2lpZG9jdG9yL2NvcmUnO1xuaW1wb3J0IERvY3VtZW50IGZyb20gJ0Bhc2NpaWRvY3Rvci9jb3JlJztcblxuY29uc3QgYXNjaWlkb2N0b3IgPSBBc2NpaURvY3RvcigpO1xuXG5jb25zdCBfcmVuZGVyZXJfZG9jdHlwZSA9IFN5bWJvbCgnZG9jdHlwZScpO1xuXG5leHBvcnQgY2xhc3MgQXNjaWlkb2NSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5hZG9jXCIsIC9eKC4qXFwuaHRtbClcXC4oYWRvYykkLyk7XG4gICAgICAgIHRoaXNbX3JlbmRlcmVyX2RvY3R5cGVdID0gJ2FydGljbGUnO1xuICAgIH1cblxuICAgIGNvbmZpZ3VyYXRpb24ob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRvY3R5cGUpIHtcbiAgICAgICAgICAgIHRoaXNbX3JlbmRlcmVyX2RvY3R5cGVdID0gb3B0aW9ucy5kb2N0eXBlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9hc2NpaWRvY3Rvci5vcmcvZG9jcy91c2VyLW1hbnVhbC8jcnVieS1hcGktb3B0aW9uc1xuICAgIC8vIFRoYXQgbGlzdHMgYWxsIHRoZSBvcHRpb25zIHdoaWNoIGNhbiBiZSBzZXRcbiAgICAvLyBPZiBpbnRlcmVzdCBhcmU6XG4gICAgLy8gICAgIGJhc2VfZGlyIC0gY29udHJvbHMgd2hlcmUgdGhlIGluY2x1ZGUgZGlyZWN0aXZlIHB1bGxzIGZpbGVzXG4gICAgLy8gICAgIHNhZmUgLSBlbmFibGVzIHNhZmUgbW9kZSAoPz8gd2hhdCBkb2VzIHRoYXQgbWVhbiA/PylcbiAgICAvLyAgICAgdGVtcGxhdGVfZGlyIC0gY29udHJvbHMgd2hlcmUgdGVtcGxhdGUgZmlsZXMgYXJlIGZvdW5kXG4gICAgY29udmVydChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogc3RyaW5nIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBjb250ZXh0Lm1ldGFkYXRhLmFzY2lpZG9jdG9yID8gY29udGV4dC5tZXRhZGF0YS5hc2NpaWRvY3RvciA6IHtcbiAgICAgICAgICAgIGRvY3R5cGU6IHRoaXNbX3JlbmRlcmVyX2RvY3R5cGVdXG4gICAgICAgIH07XG4gICAgICAgIC8vIEFzY2lpRG9jdG9yLmpzIGRvZXNuJ3QgYWxsb3cgbm9uLVN0cmluZy9OdW1iZXIgaXRlbXMgaW4gXG4gICAgICAgIC8vIHRoZSBhdHRyaWJ1dGVzIG9iamVjdC4gIFRoYXQgbWVhbnMgd2UgY2Fubm90IHNpbXBseSB1c2VcbiAgICAgICAgLy8gdGhlIG1ldGFkYXRhIGFzLWlzLCBidXQgaGF2ZSB0byBzZWxlY3Qgb3V0IHRoZSBpdGVtcyB0byBpbmNsdWRlLlxuICAgICAgICAvL1xuICAgICAgICAvLyBGaXJzdCwgdGhpcyBzdGVwcyB0aHJvdWdoIHRoZSBrZXlzIGluIG1ldGFkYXRhIG9iamVjdCBsb29raW5nXG4gICAgICAgIC8vIGZvciB0aGUgaXRlbXMgdGhhdCBhcmUgc3RyaW5ncyBvciBudW1iZXJzLiAgVGhhdCBsaW1pdHMgdGhlXG4gICAgICAgIC8vIGRhdGEgaXRlbXMgdG8gd2hhdCBBc2NpaURvY3RvciBzdXBwb3J0cy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2Vjb25kLCB3ZSBza2lwIHRoZSAndGl0bGUnIGl0ZW0gYmVjYXVzZSBBc2NpaURvY3RvciBoYXNcbiAgICAgICAgLy8gc3BlY2lhbCB0cmVhdG1lbnQgZm9yIHRoYXQgYXR0cmlidXRlLlxuICAgICAgICBvcHRpb25zLmF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQubWV0YWRhdGEpIHtcbiAgICAgICAgICAgIGlmICgodHlwZW9mIGNvbnRleHQubWV0YWRhdGFba2V5XSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgfHwgdHlwZW9mIGNvbnRleHQubWV0YWRhdGFba2V5XSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICYmIGtleSAhPT0gJ3RpdGxlJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYXR0cmlidXRlc1trZXldID0gY29udGV4dC5tZXRhZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBjb252ZXJ0ICR7dXRpbC5pbnNwZWN0KG9wdGlvbnMpfWApO1xuICAgICAgICBjb25zdCByZXQgPSBhc2NpaWRvY3Rvci5jb252ZXJ0KFxuICAgICAgICAgICAgY29udGV4dC5ib2R5ID8gY29udGV4dC5ib2R5IDogY29udGV4dC5jb250ZW50LFxuICAgICAgICAgICAgb3B0aW9ucyk7XG4gICAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBEb2N1bWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb252ZXJ0IGdhdmUgdXMgYSBEb2N1bWVudCBmb3IgJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiA8c3RyaW5nPnJldDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IHN0cmluZyB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBc2NpaWRvY1JlbmRlcmVyIHJlbmRlclN5bmMgJysgdGV4dCk7XG4gICAgICAgIHZhciByZXQgPSB0aGlzLmNvbnZlcnQoY29udGV4dCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJldCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXNjaWlkb2NSZW5kZXJlciByZW5kZXInKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNvbnZlcnQoY29udGV4dCAvKiAuY29udGVudCwgY29udGV4dC5tZXRhZGF0YSAqLykpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBmcm9udG1hdHRlciBpbiB0aGUgZm9ybWF0IG9mIGxpbmVzIG9mIGRhc2hlc1xuICAgICAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwYXJzZU1ldGFkYXRhKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBSZW5kZXJpbmdDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRnJvbnRtYXR0ZXIoY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybWF0KGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1hdGNoKGNvbnRleHQuZnNwYXRoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBc2NpaWRvY1JlbmRlcmVyIGRvZXMgbm90IHJlbmRlciBmaWxlcyB3aXRoIHRoaXMgZXh0ZW5zaW9uICR7Y29udGV4dC5mc3BhdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlbmRlcmluZ0Zvcm1hdC5IVE1MO1xuICAgIH1cbn1cbiJdfQ==