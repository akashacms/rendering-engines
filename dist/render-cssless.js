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
exports.CSSLESSRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_1 = require("./index");
const less_1 = __importDefault(require("less"));
class CSSLESSRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".css.less", /^(.*\.css)\.(less)$|^(.*)\.(less)$/);
    }
    renderSync(context) {
        throw new Error("Cannot render .css.less in synchronous environment");
    }
    async render(context) {
        const toRender = typeof context.body === 'string' ? context.body : context.content;
        if (typeof toRender !== 'string') {
            throw new Error(`CSSLESS render no context.body or context.content supplied for rendering`);
        }
        return new Promise((resolve, reject) => {
            less_1.default.render(toRender, function (err, css) {
                if (err)
                    reject(err);
                else
                    resolve(css.css);
            });
        });
    }
    renderFormat(context) {
        if (!this.match(context.fspath)) {
            throw new Error(`CSSLESSRenderer does not render files with this extension ${context.fspath}`);
        }
        return index_1.RenderingFormat.CSS;
    }
}
exports.CSSLESSRenderer = CSSLESSRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWNzc2xlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVuZGVyLWNzc2xlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7O0FBRUgsK0NBQXlDO0FBQ3pDLG1DQUE0RDtBQUc1RCxnREFBdUM7QUFRdkMsTUFBYSxlQUFnQixTQUFRLHNCQUFRO0lBQ3pDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxVQUFVLENBQUMsT0FBeUI7UUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkYsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7UUFDaEcsQ0FBQztRQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBZTtnQkFDaEQsSUFBSSxHQUFHO29CQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7b0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuRyxDQUFDO1FBQ0QsT0FBTyx1QkFBZSxDQUFDLEdBQUcsQ0FBQztJQUMvQixDQUFDO0NBeUJKO0FBcERELDBDQW9EQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMjIgRGF2aWQgSGVycm9uXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgQWthc2hhQ01TIChodHRwOi8vYWthc2hhY21zLmNvbS8pLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBwcm9taXNlcyBhcyBmc3AgfSBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBsZXNzIH0gZnJvbSAnbGVzcyc7XG5cbnR5cGUgbGVzc091dHB1dCA9IHtcbiAgICBjc3M6IHN0cmluZzsgICAvLyBjb21waWxlZCBDU1NcbiAgICBtYXA6IHN0cmluZzsgICAvLyBzb3VyY2UgbWFwXG4gICAgaW1wb3J0czogQXJyYXk8c3RyaW5nPjsgIC8vIExpc3Qgb2YgZmlsZXMgaW1wb3J0ZWRcbn1cblxuZXhwb3J0IGNsYXNzIENTU0xFU1NSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuY3NzLmxlc3NcIiwgL14oLipcXC5jc3MpXFwuKGxlc3MpJHxeKC4qKVxcLihsZXNzKSQvKTtcbiAgICB9XG5cbiAgICByZW5kZXJTeW5jKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpOiBzdHJpbmcge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcmVuZGVyIC5jc3MubGVzcyBpbiBzeW5jaHJvbm91cyBlbnZpcm9ubWVudFwiKTtcbiAgICB9XG5cbiAgICBhc3luYyByZW5kZXIoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IHRvUmVuZGVyID0gdHlwZW9mIGNvbnRleHQuYm9keSA9PT0gJ3N0cmluZycgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnQ7XG4gICAgICAgIGlmICh0eXBlb2YgdG9SZW5kZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENTU0xFU1MgcmVuZGVyIG5vIGNvbnRleHQuYm9keSBvciBjb250ZXh0LmNvbnRlbnQgc3VwcGxpZWQgZm9yIHJlbmRlcmluZ2ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXNzLnJlbmRlcih0b1JlbmRlciwgZnVuY3Rpb24gKGVyciwgY3NzOiBsZXNzT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgZWxzZSAgICAgcmVzb2x2ZShjc3MuY3NzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENTU0xFU1NSZW5kZXJlciBkb2VzIG5vdCByZW5kZXIgZmlsZXMgd2l0aCB0aGlzIGV4dGVuc2lvbiAke2NvbnRleHQuZnNwYXRofWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZW5kZXJpbmdGb3JtYXQuQ1NTO1xuICAgIH1cblxuICAgIC8vIFdoeSBhcmUgdGhlc2UgdHdvIGZ1bmN0aW9ucyBoZXJlPyAgQXJlIHRoZXkgbmVlZGVkP1xuICAgIFxuICAgIC8qIGFzeW5jIG5ld1JlbmRlclRvRmlsZShjb25maWcsIGRvY0luZm8pIHtcbiAgICAgICAgbGV0IGxlc3N0eHQgPSBhd2FpdCBmc3AucmVhZEZpbGUoZG9jSW5mby5mc3BhdGgsICd1dGY4Jyk7XG4gICAgICAgIGxldCBjc3MgPSA8bGVzc091dHB1dD4gYXdhaXQgdGhpcy5yZW5kZXIoe1xuICAgICAgICAgICAgY29udGVudDogbGVzc3R4dCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHdyaXRlVG8gPSBwYXRoLmpvaW4oY29uZmlnLnJlbmRlckRlc3RpbmF0aW9uLCBkb2NJbmZvLnJlbmRlclBhdGgpO1xuICAgICAgICBhd2FpdCBmc3Aud3JpdGVGaWxlKHdyaXRlVG8sIGNzcy5jc3MpO1xuICAgIH0gKi9cblxuICAgIC8qIGFzeW5jIHJlbmRlclRvRmlsZShiYXNlZGlyLCBmcGF0aCwgcmVuZGVyVG8sIHJlbmRlclRvUGx1cywgbWV0YWRhdGEsIGNvbmZpZykge1xuICAgICAgICB2YXIgdGhpc1JlbmRlcmVyID0gdGhpcztcbiAgICAgICAgdmFyIGxlc3N0eHQgPSBhd2FpdCB0aGlzUmVuZGVyZXIucmVhZEZpbGUoYmFzZWRpciwgZnBhdGgpO1xuICAgICAgICB2YXIgY3NzID0gPGxlc3NPdXRwdXQ+IGF3YWl0IHRoaXNSZW5kZXJlci5yZW5kZXIoe1xuICAgICAgICAgICAgY29udGVudDogbGVzc3R4dCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXNSZW5kZXJlci53cml0ZUZpbGUocmVuZGVyVG8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzUmVuZGVyZXIuZmlsZVBhdGgoZnBhdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLmNzcyk7XG4gICAgfSAqL1xufVxuIl19