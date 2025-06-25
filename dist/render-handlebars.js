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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HandlebarsRenderer_instances, _HandlebarsRenderer_partialSyncHelper;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlebarsRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const Handlebars = __importStar(require("handlebars"));
class HandlebarsRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.handlebars", /^(.*\.html)\.(handlebars)$|^(.*)\.(handlebars)$/);
        _HandlebarsRenderer_instances.add(this);
        const renderer = this;
        Handlebars.registerHelper("partialSync", function (context, options) {
            return __classPrivateFieldGet(renderer, _HandlebarsRenderer_instances, "m", _HandlebarsRenderer_partialSyncHelper).call(renderer, renderer, context, options);
        });
    }
    async render(context) {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`Handlebars render no context.body or context.content supplied for rendering`);
        }
        try {
            const template = Handlebars.compile(toRender);
            return template(context.metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            var errstack = e.stack ? e.stack : e;
            throw new Error(`Error with Handlebars in file ${docpath} ${errstack}`);
        }
    }
    renderSync(context) {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`Handlebars renderSync no context.body or context.content supplied for rendering`);
        }
        try {
            const template = Handlebars.compile(toRender);
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
_HandlebarsRenderer_instances = new WeakSet(), _HandlebarsRenderer_partialSyncHelper = function _HandlebarsRenderer_partialSyncHelper(renderer, context, options) {
    /*
     * The Handlebars documentation lies about the
     * parameters to the registerHelper callback function.
     * It describes two parameters, context and options,
     * and that options has a bunch of useful data.
     * Instead the useful data came via context, and
     * the options parameter was undefined.
     *
     * Here is an example.  Hence, context.fn corresponds
     * to the body of a block helper invocation, and
     * context.hash corresponds to the parameters passed
     * in the helper invocation.
    {
        lookupProperty: [Function: lookupProperty],
        name: 'partialSync',
        hash: { message: 'NESTED MESSAGE', template: 'showmessage.html.njk' },
        fn: [Function: prog] { program: 6, depth: 0, blockParams: 0 },
        inverse: [Function: noop],
        data: {
            root: {
                title: 'Partial test for Handlebars',
                layout: 'foo.html.ejs',
                partial: [AsyncFunction (anonymous)],
                partialSync: [Function (anonymous)]
            }
        },
        loc: { start: { line: 43, column: 22 }, end: { line: 44, column: 16 } }
    }
     */
    // console.log(`partialSync context `, context);
    // console.log(`partialSync options `, options);
    let template;
    const data = {};
    // Start with copying document metadata
    if (context.data && context.data.root) {
        for (const key in context.data.root) {
            data[key] = context.data.root[key];
            // Should this drop partial & partialSync?
        }
    }
    // Then add in data passed in the invocation
    for (const key in context.hash) {
        // console.log(`partialSync ${key} ${context.hash[key]}`);
        if (key === 'template') {
            template = context.hash[key];
        }
        else {
            data[key] = context.hash[key];
        }
    }
    // This appears if there is a body to
    // the helper invocation
    if (context.fn) {
        data['partialBody'] = context.fn(this);
    }
    if (!template) {
        throw new Error(`No template supplied for partialSync`);
    }
    // console.log(`partialSync rendering ${template} with `, data);
    const ret = renderer.config.partialSync(template, data);
    // console.log(`partialSync ret `, ret);
    return new Handlebars.SafeString(ret);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWhhbmRsZWJhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVuZGVyLWhhbmRsZWJhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0gsK0NBQTJEO0FBQzNELHlDQUErRDtBQUUvRCx1REFBeUM7QUFFekMsTUFBYSxrQkFBbUIsU0FBUSxzQkFBUTtJQUM1QztRQUNJLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxpREFBaUQsQ0FBQyxDQUFDOztRQUU3RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdEIsVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTztZQUM5RCxPQUFPLHVCQUFBLFFBQVEsNEVBQW1CLE1BQTNCLFFBQVEsRUFBb0IsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFrRkQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUF5QjtRQUNsQyxNQUFNLFFBQVEsR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25GLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDO1FBQ25HLENBQUM7UUFDRCxJQUFJLENBQUM7WUFDRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUMvQixRQUFRLENBQ1gsQ0FBQztZQUNGLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQUMsT0FBTSxDQUFDLEVBQUUs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QztZQUNyQixRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBQ0QscUNBQXFDO0lBQ3JDLHdCQUF3QjtJQUN4QixJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNELGdFQUFnRTtJQUNoRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsd0NBQXdDO0lBQ3hDLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAyMC0yMDIyIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlbmRlcmVyLCBwYXJzZUZyb250bWF0dGVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDb250ZXh0LCBSZW5kZXJpbmdGb3JtYXQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuaW1wb3J0ICogYXMgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcblxuZXhwb3J0IGNsYXNzIEhhbmRsZWJhcnNSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5oYW5kbGViYXJzXCIsIC9eKC4qXFwuaHRtbClcXC4oaGFuZGxlYmFycykkfF4oLiopXFwuKGhhbmRsZWJhcnMpJC8pO1xuXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcztcbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcihcInBhcnRpYWxTeW5jXCIsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXJlci4jcGFydGlhbFN5bmNIZWxwZXIocmVuZGVyZXIsIGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZ1bmN0aW9uIGZvciB0aGUgcGFydGlhbFN5bmMgaGVscGVyLlxuICAgICAqIFxuICAgICAqIFRoZSByZW5kZXJlciBwYXJhbWV0ZXIgaXMgcHJlc2VudCBiZWNhdXNlIHVzaW5nXG4gICAgICogdGhpcy5jb25maWcgZGlkIG5vdCBhY2Nlc3MgdGhlIGNvbmZpZyBmaWVsZCwgYW5kXG4gICAgICogZm9yIHNvbWUgcmVhc29uIHRoaXMgd2FzIGluc3RlYWQgdGhlIG1ldGFkYXRhLlxuICAgICAqIFRoZXJlZm9yZSB3ZSBtYWtlIHN1cmUgcmVuZGVyZXIgaXMgYXZhaWxhYmxlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSByZW5kZXJlciBUaGUgUmVuZGVyZXIgaW5zdGFuY2UgXG4gICAgICogQHBhcmFtIGNvbnRleHQgQ29udGV4dCBwcm92aWRlZCBieSBIYW5kbGViYXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMgSGFuZGxlYmFycyBkb2N1bWVudGF0aW9uIHNheXMgdGhpcyB3aWxsIGV4aXN0XG4gICAgICogQHJldHVybnMgU3RyaW5nIGNvbnRhaW5pbmcgdGhlIHJlbmRlcmluZyBvZiB0aGUgdGVtcGxhdGVcbiAgICAgKi9cbiAgICAjcGFydGlhbFN5bmNIZWxwZXIocmVuZGVyZXIsIGNvbnRleHQsIG9wdGlvbnMpIHtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBUaGUgSGFuZGxlYmFycyBkb2N1bWVudGF0aW9uIGxpZXMgYWJvdXQgdGhlXG4gICAgICAgICAqIHBhcmFtZXRlcnMgdG8gdGhlIHJlZ2lzdGVySGVscGVyIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICAgKiBJdCBkZXNjcmliZXMgdHdvIHBhcmFtZXRlcnMsIGNvbnRleHQgYW5kIG9wdGlvbnMsXG4gICAgICAgICAqIGFuZCB0aGF0IG9wdGlvbnMgaGFzIGEgYnVuY2ggb2YgdXNlZnVsIGRhdGEuXG4gICAgICAgICAqIEluc3RlYWQgdGhlIHVzZWZ1bCBkYXRhIGNhbWUgdmlhIGNvbnRleHQsIGFuZFxuICAgICAgICAgKiB0aGUgb3B0aW9ucyBwYXJhbWV0ZXIgd2FzIHVuZGVmaW5lZC5cbiAgICAgICAgICogXG4gICAgICAgICAqIEhlcmUgaXMgYW4gZXhhbXBsZS4gIEhlbmNlLCBjb250ZXh0LmZuIGNvcnJlc3BvbmRzXG4gICAgICAgICAqIHRvIHRoZSBib2R5IG9mIGEgYmxvY2sgaGVscGVyIGludm9jYXRpb24sIGFuZFxuICAgICAgICAgKiBjb250ZXh0Lmhhc2ggY29ycmVzcG9uZHMgdG8gdGhlIHBhcmFtZXRlcnMgcGFzc2VkXG4gICAgICAgICAqIGluIHRoZSBoZWxwZXIgaW52b2NhdGlvbi5cbiAgICAgICAge1xuICAgICAgICAgICAgbG9va3VwUHJvcGVydHk6IFtGdW5jdGlvbjogbG9va3VwUHJvcGVydHldLFxuICAgICAgICAgICAgbmFtZTogJ3BhcnRpYWxTeW5jJyxcbiAgICAgICAgICAgIGhhc2g6IHsgbWVzc2FnZTogJ05FU1RFRCBNRVNTQUdFJywgdGVtcGxhdGU6ICdzaG93bWVzc2FnZS5odG1sLm5qaycgfSxcbiAgICAgICAgICAgIGZuOiBbRnVuY3Rpb246IHByb2ddIHsgcHJvZ3JhbTogNiwgZGVwdGg6IDAsIGJsb2NrUGFyYW1zOiAwIH0sXG4gICAgICAgICAgICBpbnZlcnNlOiBbRnVuY3Rpb246IG5vb3BdLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdQYXJ0aWFsIHRlc3QgZm9yIEhhbmRsZWJhcnMnLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6ICdmb28uaHRtbC5lanMnLFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsOiBbQXN5bmNGdW5jdGlvbiAoYW5vbnltb3VzKV0sXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpYWxTeW5jOiBbRnVuY3Rpb24gKGFub255bW91cyldXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvYzogeyBzdGFydDogeyBsaW5lOiA0MywgY29sdW1uOiAyMiB9LCBlbmQ6IHsgbGluZTogNDQsIGNvbHVtbjogMTYgfSB9XG4gICAgICAgIH1cbiAgICAgICAgICovXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYHBhcnRpYWxTeW5jIGNvbnRleHQgYCwgY29udGV4dCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBwYXJ0aWFsU3luYyBvcHRpb25zIGAsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgdGVtcGxhdGU7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7fTtcblxuICAgICAgICAvLyBTdGFydCB3aXRoIGNvcHlpbmcgZG9jdW1lbnQgbWV0YWRhdGFcbiAgICAgICAgaWYgKGNvbnRleHQuZGF0YSAmJiBjb250ZXh0LmRhdGEucm9vdCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29udGV4dC5kYXRhLnJvb3QpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSBjb250ZXh0LmRhdGEucm9vdFtrZXldO1xuICAgICAgICAgICAgICAgIC8vIFNob3VsZCB0aGlzIGRyb3AgcGFydGlhbCAmIHBhcnRpYWxTeW5jP1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRoZW4gYWRkIGluIGRhdGEgcGFzc2VkIGluIHRoZSBpbnZvY2F0aW9uXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnRleHQuaGFzaCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHBhcnRpYWxTeW5jICR7a2V5fSAke2NvbnRleHQuaGFzaFtrZXldfWApO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gY29udGV4dC5oYXNoW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IGNvbnRleHQuaGFzaFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgYXBwZWFycyBpZiB0aGVyZSBpcyBhIGJvZHkgdG9cbiAgICAgICAgLy8gdGhlIGhlbHBlciBpbnZvY2F0aW9uXG4gICAgICAgIGlmIChjb250ZXh0LmZuKSB7XG4gICAgICAgICAgICBkYXRhWydwYXJ0aWFsQm9keSddID0gY29udGV4dC5mbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHRlbXBsYXRlIHN1cHBsaWVkIGZvciBwYXJ0aWFsU3luY2ApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBwYXJ0aWFsU3luYyByZW5kZXJpbmcgJHt0ZW1wbGF0ZX0gd2l0aCBgLCBkYXRhKTtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVuZGVyZXIuY29uZmlnLnBhcnRpYWxTeW5jKHRlbXBsYXRlLCBkYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHBhcnRpYWxTeW5jIHJldCBgLCByZXQpO1xuICAgICAgICByZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyhyZXQpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFuZGxlYmFycyByZW5kZXIgbm8gY29udGV4dC5ib2R5IG9yIGNvbnRleHQuY29udGVudCBzdXBwbGllZCBmb3IgcmVuZGVyaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKFxuICAgICAgICAgICAgICAgIHRvUmVuZGVyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlKGNvbnRleHQubWV0YWRhdGEpO1xuICAgICAgICB9IGNhdGNoKGUpIHsgXG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgdmFyIGVycnN0YWNrID0gZS5zdGFjayA/IGUuc3RhY2sgOiBlO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aXRoIEhhbmRsZWJhcnMgaW4gZmlsZSAke2RvY3BhdGh9ICR7ZXJyc3RhY2t9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudDtcbiAgICAgICAgaWYgKHR5cGVvZiB0b1JlbmRlciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFuZGxlYmFycyByZW5kZXJTeW5jIG5vIGNvbnRleHQuYm9keSBvciBjb250ZXh0LmNvbnRlbnQgc3VwcGxpZWQgZm9yIHJlbmRlcmluZ2ApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShcbiAgICAgICAgICAgICAgICB0b1JlbmRlclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZShjb250ZXh0Lm1ldGFkYXRhKTtcbiAgICAgICAgfSBjYXRjaChlKSB7IFxuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIHZhciBlcnJzdGFjayA9IGUuc3RhY2sgPyBlLnN0YWNrIDogZTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBIYW5kbGViYXJzIGluIGZpbGUgJHtkb2NwYXRofSAke2VycnN0YWNrfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhbmRsZWJhcnNSZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuSFRNTDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXZSBjYW5ub3QgYWxsb3cgUEhQIGNvZGUgdG8gcnVuIHRocm91Z2ggTWFoYWJodXRhLlxuICAgICAqL1xuICAgIGRvTWFoYWJodXRhKGZwYXRoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiJdfQ==