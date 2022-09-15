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
const HTMLRenderer_js_1 = require("./HTMLRenderer.js");
const core_1 = __importDefault(require("@asciidoctor/core"));
const asciidoctor = (0, core_1.default)();
const _renderer_doctype = Symbol('doctype');
class AsciidocRenderer extends HTMLRenderer_js_1.HTMLRenderer {
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
        return asciidoctor.convert(context.content, options);
    }
    renderSync(context) {
        // console.log('AsciidocRenderer renderSync '+ text);
        var ret = this.convert(context /* .content, context.metadata */);
        // console.log(ret);
        return ret;
    }
    render(context) {
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
}
exports.AsciidocRenderer = AsciidocRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWFzY2lpZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1hc2NpaWRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7QUFFSCxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLHVEQUFpRDtBQUdqRCw2REFBMkQ7QUFDM0QsTUFBTSxXQUFXLEdBQUcsSUFBQSxjQUFXLEdBQUUsQ0FBQztBQUVsQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU1QyxNQUFhLGdCQUFpQixTQUFRLDhCQUFZO0lBQzlDO1FBQ0ksS0FBSyxDQUFDLFlBQVksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQU87UUFDakIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDREQUE0RDtJQUM1RCw4Q0FBOEM7SUFDOUMsbUJBQW1CO0lBQ25CLGtFQUFrRTtJQUNsRSwyREFBMkQ7SUFDM0QsNkRBQTZEO0lBQzdELE9BQU8sQ0FBQyxPQUF5QjtRQUM3QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDbkMsQ0FBQztRQUNGLDJEQUEyRDtRQUMzRCwwREFBMEQ7UUFDMUQsbUVBQW1FO1FBQ25FLEVBQUU7UUFDRixnRUFBZ0U7UUFDaEUsOERBQThEO1FBQzlELDJDQUEyQztRQUMzQyxFQUFFO1FBQ0YsMkRBQTJEO1FBQzNELHdDQUF3QztRQUN4QyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO21CQUN6QyxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxDQUFDO21CQUMxQyxHQUFHLEtBQUssT0FBTyxFQUFFO2dCQUNsQixPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkQ7U0FDSjtRQUNELG1EQUFtRDtRQUNuRCxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQXlCO1FBQ2hDLHFEQUFxRDtRQUNyRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2pFLG9CQUFvQjtRQUNwQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBeUI7UUFDNUIsMENBQTBDO1FBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSTtnQkFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO2FBQ25FO1lBQUMsT0FBTSxDQUFDLEVBQUU7Z0JBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTlERCw0Q0E4REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE5IERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLy8gaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbi8vIGltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBIVE1MUmVuZGVyZXIgfSBmcm9tICcuL0hUTUxSZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0IH0gZnJvbSAnLi9pbmRleCc7XG5cbmltcG9ydCB7IGRlZmF1bHQgYXMgQXNjaWlEb2N0b3IgfSBmcm9tICdAYXNjaWlkb2N0b3IvY29yZSc7XG5jb25zdCBhc2NpaWRvY3RvciA9IEFzY2lpRG9jdG9yKCk7XG5cbmNvbnN0IF9yZW5kZXJlcl9kb2N0eXBlID0gU3ltYm9sKCdkb2N0eXBlJyk7XG5cbmV4cG9ydCBjbGFzcyBBc2NpaWRvY1JlbmRlcmVyIGV4dGVuZHMgSFRNTFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5hZG9jXCIsIC9eKC4qXFwuaHRtbClcXC4oYWRvYykkLyk7XG4gICAgICAgIHRoaXNbX3JlbmRlcmVyX2RvY3R5cGVdID0gJ2FydGljbGUnO1xuICAgIH1cblxuICAgIGNvbmZpZ3VyYXRpb24ob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRvY3R5cGUpIHtcbiAgICAgICAgICAgIHRoaXNbX3JlbmRlcmVyX2RvY3R5cGVdID0gb3B0aW9ucy5kb2N0eXBlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9hc2NpaWRvY3Rvci5vcmcvZG9jcy91c2VyLW1hbnVhbC8jcnVieS1hcGktb3B0aW9uc1xuICAgIC8vIFRoYXQgbGlzdHMgYWxsIHRoZSBvcHRpb25zIHdoaWNoIGNhbiBiZSBzZXRcbiAgICAvLyBPZiBpbnRlcmVzdCBhcmU6XG4gICAgLy8gICAgIGJhc2VfZGlyIC0gY29udHJvbHMgd2hlcmUgdGhlIGluY2x1ZGUgZGlyZWN0aXZlIHB1bGxzIGZpbGVzXG4gICAgLy8gICAgIHNhZmUgLSBlbmFibGVzIHNhZmUgbW9kZSAoPz8gd2hhdCBkb2VzIHRoYXQgbWVhbiA/PylcbiAgICAvLyAgICAgdGVtcGxhdGVfZGlyIC0gY29udHJvbHMgd2hlcmUgdGVtcGxhdGUgZmlsZXMgYXJlIGZvdW5kXG4gICAgY29udmVydChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gY29udGV4dC5tZXRhZGF0YS5hc2NpaWRvY3RvciA/IGNvbnRleHQubWV0YWRhdGEuYXNjaWlkb2N0b3IgOiB7XG4gICAgICAgICAgICBkb2N0eXBlOiB0aGlzW19yZW5kZXJlcl9kb2N0eXBlXVxuICAgICAgICB9O1xuICAgICAgICAvLyBBc2NpaURvY3Rvci5qcyBkb2Vzbid0IGFsbG93IG5vbi1TdHJpbmcvTnVtYmVyIGl0ZW1zIGluIFxuICAgICAgICAvLyB0aGUgYXR0cmlidXRlcyBvYmplY3QuICBUaGF0IG1lYW5zIHdlIGNhbm5vdCBzaW1wbHkgdXNlXG4gICAgICAgIC8vIHRoZSBtZXRhZGF0YSBhcy1pcywgYnV0IGhhdmUgdG8gc2VsZWN0IG91dCB0aGUgaXRlbXMgdG8gaW5jbHVkZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRmlyc3QsIHRoaXMgc3RlcHMgdGhyb3VnaCB0aGUga2V5cyBpbiBtZXRhZGF0YSBvYmplY3QgbG9va2luZ1xuICAgICAgICAvLyBmb3IgdGhlIGl0ZW1zIHRoYXQgYXJlIHN0cmluZ3Mgb3IgbnVtYmVycy4gIFRoYXQgbGltaXRzIHRoZVxuICAgICAgICAvLyBkYXRhIGl0ZW1zIHRvIHdoYXQgQXNjaWlEb2N0b3Igc3VwcG9ydHMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNlY29uZCwgd2Ugc2tpcCB0aGUgJ3RpdGxlJyBpdGVtIGJlY2F1c2UgQXNjaWlEb2N0b3IgaGFzXG4gICAgICAgIC8vIHNwZWNpYWwgdHJlYXRtZW50IGZvciB0aGF0IGF0dHJpYnV0ZS5cbiAgICAgICAgb3B0aW9ucy5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZXh0Lm1ldGFkYXRhKSB7XG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0Lm1ldGFkYXRhW2tleV0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgIHx8IHR5cGVvZiBjb250ZXh0Lm1ldGFkYXRhW2tleV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAmJiBrZXkgIT09ICd0aXRsZScpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmF0dHJpYnV0ZXNba2V5XSA9IGNvbnRleHQubWV0YWRhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgY29udmVydCAke3V0aWwuaW5zcGVjdChvcHRpb25zKX1gKTtcbiAgICAgICAgcmV0dXJuIGFzY2lpZG9jdG9yLmNvbnZlcnQoY29udGV4dC5jb250ZW50LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0FzY2lpZG9jUmVuZGVyZXIgcmVuZGVyU3luYyAnKyB0ZXh0KTtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuY29udmVydChjb250ZXh0IC8qIC5jb250ZW50LCBjb250ZXh0Lm1ldGFkYXRhICovKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmV0KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXNjaWlkb2NSZW5kZXJlciByZW5kZXInKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNvbnZlcnQoY29udGV4dCAvKiAuY29udGVudCwgY29udGV4dC5tZXRhZGF0YSAqLykpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=