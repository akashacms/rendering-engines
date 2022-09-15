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
exports.CSSLESSRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const fs_1 = require("fs");
const path = __importStar(require("path"));
const less_1 = __importDefault(require("less"));
class CSSLESSRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".css.less", /^(.*\.css)\.(less)$/);
    }
    renderSync(context /* text, metadata */) {
        throw new Error("Cannot render .css.less in synchronous environment");
    }
    render(context /* text, metadata */) {
        return new Promise((resolve, reject) => {
            less_1.default.render(context.content, function (err, css) {
                if (err)
                    reject(err);
                else
                    resolve(css);
            });
        });
    }
    // Why are these two functions here?  Are they needed?
    async newRenderToFile(config, docInfo) {
        let lesstxt = await fs_1.promises.readFile(docInfo.fspath, 'utf8');
        let css = await this.render({
            content: lesstxt,
            metadata: {}
        });
        let writeTo = path.join(config.renderDestination, docInfo.renderPath);
        await fs_1.promises.writeFile(writeTo, css.css);
    }
    async renderToFile(basedir, fpath, renderTo, renderToPlus, metadata, config) {
        var thisRenderer = this;
        var lesstxt = await thisRenderer.readFile(basedir, fpath);
        var css = await thisRenderer.render({
            content: lesstxt,
            metadata: {}
        });
        return await thisRenderer.writeFile(renderTo, thisRenderer.filePath(fpath), css.css);
    }
}
exports.CSSLESSRenderer = CSSLESSRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWNzc2xlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvcmVuZGVyLWNzc2xlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCwrQ0FBeUM7QUFDekMsMkJBQXFDO0FBQ3JDLDJDQUE2QjtBQUM3QixnREFBdUM7QUFRdkMsTUFBYSxlQUFnQixTQUFRLHNCQUFRO0lBQ3pDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBTyxDQUFDLG9CQUFvQjtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CO1FBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQWU7Z0JBQ3ZELElBQUksR0FBRztvQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNEQUFzRDtJQUV0RCxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxPQUFPO1FBQ2pDLElBQUksT0FBTyxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksR0FBRyxHQUFnQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEUsTUFBTSxhQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNO1FBQ3ZFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksR0FBRyxHQUFnQixNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDN0MsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQ2hCLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7QUF6Q0QsMENBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxOSBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSAnLi9SZW5kZXJlci5qcyc7XG5pbXBvcnQgeyBwcm9taXNlcyBhcyBmc3AgfSBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBsZXNzIH0gZnJvbSAnbGVzcyc7XG5cbnR5cGUgbGVzc091dHB1dCA9IHtcbiAgICBjc3M6IHN0cmluZzsgICAvLyBjb21waWxlZCBDU1NcbiAgICBtYXA6IHN0cmluZzsgICAvLyBzb3VyY2UgbWFwXG4gICAgaW1wb3J0czogQXJyYXk8c3RyaW5nPjsgIC8vIExpc3Qgb2YgZmlsZXMgaW1wb3J0ZWRcbn1cblxuZXhwb3J0IGNsYXNzIENTU0xFU1NSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuY3NzLmxlc3NcIiwgL14oLipcXC5jc3MpXFwuKGxlc3MpJC8pO1xuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dCAvKiB0ZXh0LCBtZXRhZGF0YSAqLykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcmVuZGVyIC5jc3MubGVzcyBpbiBzeW5jaHJvbm91cyBlbnZpcm9ubWVudFwiKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dCAvKiB0ZXh0LCBtZXRhZGF0YSAqLykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGVzcy5yZW5kZXIoY29udGV4dC5jb250ZW50LCBmdW5jdGlvbiAoZXJyLCBjc3M6IGxlc3NPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICBlbHNlICAgICByZXNvbHZlKGNzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2h5IGFyZSB0aGVzZSB0d28gZnVuY3Rpb25zIGhlcmU/ICBBcmUgdGhleSBuZWVkZWQ/XG4gICAgXG4gICAgYXN5bmMgbmV3UmVuZGVyVG9GaWxlKGNvbmZpZywgZG9jSW5mbykge1xuICAgICAgICBsZXQgbGVzc3R4dCA9IGF3YWl0IGZzcC5yZWFkRmlsZShkb2NJbmZvLmZzcGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgbGV0IGNzcyA9IDxsZXNzT3V0cHV0PiBhd2FpdCB0aGlzLnJlbmRlcih7XG4gICAgICAgICAgICBjb250ZW50OiBsZXNzdHh0LFxuICAgICAgICAgICAgbWV0YWRhdGE6IHt9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgd3JpdGVUbyA9IHBhdGguam9pbihjb25maWcucmVuZGVyRGVzdGluYXRpb24sIGRvY0luZm8ucmVuZGVyUGF0aCk7XG4gICAgICAgIGF3YWl0IGZzcC53cml0ZUZpbGUod3JpdGVUbywgY3NzLmNzcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyVG9GaWxlKGJhc2VkaXIsIGZwYXRoLCByZW5kZXJUbywgcmVuZGVyVG9QbHVzLCBtZXRhZGF0YSwgY29uZmlnKSB7XG4gICAgICAgIHZhciB0aGlzUmVuZGVyZXIgPSB0aGlzO1xuICAgICAgICB2YXIgbGVzc3R4dCA9IGF3YWl0IHRoaXNSZW5kZXJlci5yZWFkRmlsZShiYXNlZGlyLCBmcGF0aCk7XG4gICAgICAgIHZhciBjc3MgPSA8bGVzc091dHB1dD4gYXdhaXQgdGhpc1JlbmRlcmVyLnJlbmRlcih7XG4gICAgICAgICAgICBjb250ZW50OiBsZXNzdHh0LFxuICAgICAgICAgICAgbWV0YWRhdGE6IHt9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpc1JlbmRlcmVyLndyaXRlRmlsZShyZW5kZXJUbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNSZW5kZXJlci5maWxlUGF0aChmcGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MuY3NzKTtcbiAgICB9XG59XG4iXX0=