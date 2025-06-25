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
        super(".html.adoc", /^(.*\.html)\.(adoc)$|^(.*)\.(adoc)$/);
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
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`AsciiDOC convert no context.body or context.content supplied for rendering`);
        }
        const ret = asciidoctor.convert(toRender, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWFzY2lpZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1hc2NpaWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFFSCxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLCtDQUEyRDtBQUMzRCxtQ0FBNEQ7QUFFNUQsNkRBQTJEO0FBQzNELDZEQUF5QztBQUV6QyxNQUFNLFdBQVcsR0FBRyxJQUFBLGNBQVcsR0FBRSxDQUFDO0FBRWxDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTVDLE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVE7SUFDMUM7UUFDSSxLQUFLLENBQUMsWUFBWSxFQUFFLHFDQUFxQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBTztRQUNqQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDREQUE0RDtJQUM1RCw4Q0FBOEM7SUFDOUMsbUJBQW1CO0lBQ25CLGtFQUFrRTtJQUNsRSwyREFBMkQ7SUFDM0QsNkRBQTZEO0lBQzdELE9BQU8sQ0FBQyxPQUF5QjtRQUM3QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDbkMsQ0FBQztRQUNGLDJEQUEyRDtRQUMzRCwwREFBMEQ7UUFDMUQsbUVBQW1FO1FBQ25FLEVBQUU7UUFDRixnRUFBZ0U7UUFDaEUsOERBQThEO1FBQzlELDJDQUEyQztRQUMzQyxFQUFFO1FBQ0YsMkRBQTJEO1FBQzNELHdDQUF3QztRQUN4QyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7bUJBQ3pDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLENBQUM7bUJBQzFDLEdBQUcsS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDTCxDQUFDO1FBQ0QsbURBQW1EO1FBQ25ELE1BQU0sUUFBUSxHQUFHLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkYsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUM7UUFDbEcsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQzNCLFFBQVEsRUFDUixPQUFPLENBQUMsQ0FBQztRQUNiLElBQUksR0FBRyxZQUFZLGNBQVEsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBZSxHQUFHLENBQUM7UUFDdkIsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBeUI7UUFDaEMscURBQXFEO1FBQ3JELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsb0JBQW9CO1FBQ3BCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBeUI7UUFDbEMsMENBQTBDO1FBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDO2dCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7WUFDcEUsQ0FBQztZQUFDLE9BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBQyxPQUF5QjtRQUNuQyxPQUFPLElBQUEsOEJBQWdCLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDhEQUE4RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNwRyxDQUFDO1FBQ0QsT0FBTyx1QkFBZSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUEzRkQsNENBMkZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAyMiBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIGltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG4vLyBpbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgUmVuZGVyZXIsIHBhcnNlRnJvbnRtYXR0ZXIgfSBmcm9tICcuL1JlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQsIFJlbmRlcmluZ0Zvcm1hdCB9IGZyb20gJy4vaW5kZXgnO1xuXG5pbXBvcnQgeyBkZWZhdWx0IGFzIEFzY2lpRG9jdG9yIH0gZnJvbSAnQGFzY2lpZG9jdG9yL2NvcmUnO1xuaW1wb3J0IERvY3VtZW50IGZyb20gJ0Bhc2NpaWRvY3Rvci9jb3JlJztcblxuY29uc3QgYXNjaWlkb2N0b3IgPSBBc2NpaURvY3RvcigpO1xuXG5jb25zdCBfcmVuZGVyZXJfZG9jdHlwZSA9IFN5bWJvbCgnZG9jdHlwZScpO1xuXG5leHBvcnQgY2xhc3MgQXNjaWlkb2NSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5hZG9jXCIsIC9eKC4qXFwuaHRtbClcXC4oYWRvYykkfF4oLiopXFwuKGFkb2MpJC8pO1xuICAgICAgICB0aGlzW19yZW5kZXJlcl9kb2N0eXBlXSA9ICdhcnRpY2xlJztcbiAgICB9XG5cbiAgICBjb25maWd1cmF0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5kb2N0eXBlKSB7XG4gICAgICAgICAgICB0aGlzW19yZW5kZXJlcl9kb2N0eXBlXSA9IG9wdGlvbnMuZG9jdHlwZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vYXNjaWlkb2N0b3Iub3JnL2RvY3MvdXNlci1tYW51YWwvI3J1YnktYXBpLW9wdGlvbnNcbiAgICAvLyBUaGF0IGxpc3RzIGFsbCB0aGUgb3B0aW9ucyB3aGljaCBjYW4gYmUgc2V0XG4gICAgLy8gT2YgaW50ZXJlc3QgYXJlOlxuICAgIC8vICAgICBiYXNlX2RpciAtIGNvbnRyb2xzIHdoZXJlIHRoZSBpbmNsdWRlIGRpcmVjdGl2ZSBwdWxscyBmaWxlc1xuICAgIC8vICAgICBzYWZlIC0gZW5hYmxlcyBzYWZlIG1vZGUgKD8/IHdoYXQgZG9lcyB0aGF0IG1lYW4gPz8pXG4gICAgLy8gICAgIHRlbXBsYXRlX2RpciAtIGNvbnRyb2xzIHdoZXJlIHRlbXBsYXRlIGZpbGVzIGFyZSBmb3VuZFxuICAgIGNvbnZlcnQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IHN0cmluZyB7XG4gICAgICAgIHZhciBvcHRpb25zID0gY29udGV4dC5tZXRhZGF0YS5hc2NpaWRvY3RvciA/IGNvbnRleHQubWV0YWRhdGEuYXNjaWlkb2N0b3IgOiB7XG4gICAgICAgICAgICBkb2N0eXBlOiB0aGlzW19yZW5kZXJlcl9kb2N0eXBlXVxuICAgICAgICB9O1xuICAgICAgICAvLyBBc2NpaURvY3Rvci5qcyBkb2Vzbid0IGFsbG93IG5vbi1TdHJpbmcvTnVtYmVyIGl0ZW1zIGluIFxuICAgICAgICAvLyB0aGUgYXR0cmlidXRlcyBvYmplY3QuICBUaGF0IG1lYW5zIHdlIGNhbm5vdCBzaW1wbHkgdXNlXG4gICAgICAgIC8vIHRoZSBtZXRhZGF0YSBhcy1pcywgYnV0IGhhdmUgdG8gc2VsZWN0IG91dCB0aGUgaXRlbXMgdG8gaW5jbHVkZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRmlyc3QsIHRoaXMgc3RlcHMgdGhyb3VnaCB0aGUga2V5cyBpbiBtZXRhZGF0YSBvYmplY3QgbG9va2luZ1xuICAgICAgICAvLyBmb3IgdGhlIGl0ZW1zIHRoYXQgYXJlIHN0cmluZ3Mgb3IgbnVtYmVycy4gIFRoYXQgbGltaXRzIHRoZVxuICAgICAgICAvLyBkYXRhIGl0ZW1zIHRvIHdoYXQgQXNjaWlEb2N0b3Igc3VwcG9ydHMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNlY29uZCwgd2Ugc2tpcCB0aGUgJ3RpdGxlJyBpdGVtIGJlY2F1c2UgQXNjaWlEb2N0b3IgaGFzXG4gICAgICAgIC8vIHNwZWNpYWwgdHJlYXRtZW50IGZvciB0aGF0IGF0dHJpYnV0ZS5cbiAgICAgICAgb3B0aW9ucy5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZXh0Lm1ldGFkYXRhKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0Lm1ldGFkYXRhW2tleV0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgIHx8IHR5cGVvZiBjb250ZXh0Lm1ldGFkYXRhW2tleV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAmJiBrZXkgIT09ICd0aXRsZScpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJpYnV0ZXNba2V5XSA9IGNvbnRleHQubWV0YWRhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgY29udmVydCAke3V0aWwuaW5zcGVjdChvcHRpb25zKX1gKTtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQXNjaWlET0MgY29udmVydCBubyBjb250ZXh0LmJvZHkgb3IgY29udGV4dC5jb250ZW50IHN1cHBsaWVkIGZvciByZW5kZXJpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXQgPSBhc2NpaWRvY3Rvci5jb252ZXJ0KFxuICAgICAgICAgICAgdG9SZW5kZXIsXG4gICAgICAgICAgICBvcHRpb25zKTtcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIERvY3VtZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbnZlcnQgZ2F2ZSB1cyBhIERvY3VtZW50IGZvciAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDxzdHJpbmc+cmV0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogc3RyaW5nIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0FzY2lpZG9jUmVuZGVyZXIgcmVuZGVyU3luYyAnKyB0ZXh0KTtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuY29udmVydChjb250ZXh0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdBc2NpaWRvY1JlbmRlcmVyIHJlbmRlcicpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuY29udmVydChjb250ZXh0IC8qIC5jb250ZW50LCBjb250ZXh0Lm1ldGFkYXRhICovKSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGZyb250bWF0dGVyIGluIHRoZSBmb3JtYXQgb2YgbGluZXMgb2YgZGFzaGVzXG4gICAgICogc3Vycm91bmRpbmcgYSBZQU1MIHN0cnVjdHVyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFzY2lpZG9jUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxufVxuIl19