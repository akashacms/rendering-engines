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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const liquidjs_1 = require("liquidjs");
class LiquidRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super('.html.liquid', /^(.*\.html)\.(liquid)$/);
    }
    async render(context /* text, metadata, docInfo */) {
        try {
            const partialsMounted = this.partialDirs;
            const engine = new liquidjs_1.Liquid({
                partials: partialsMounted,
                extname: '.liquid'
            });
            return await engine.parseAndRender(typeof context.body === 'string' ? context.body : context.content, context.metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Liquid in file ${docpath}`);
            err.cause = e;
            throw err;
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
            throw new Error(`LiquidRenderer does not render files with this extension ${context.fspath}`);
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
exports.LiquidRenderer = LiquidRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLWxpcXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9yZW5kZXItbGlxdWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QsdUNBQWtDO0FBRWxDLE1BQWEsY0FBZSxTQUFRLHNCQUFRO0lBQ3hDO1FBQ0ksS0FBSyxDQUFDLGNBQWMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCLENBQUMsNkJBQTZCO1FBQ2hFLElBQUk7WUFDQSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3pDLE1BQU0sTUFBTSxHQUFNLElBQUksaUJBQU0sQ0FBQztnQkFDekIsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLE9BQU8sRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztZQUNILE9BQU8sTUFBTSxNQUFNLENBQUMsY0FBYyxDQUM5QixPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUNqRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekI7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUM5RCxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE1BQU0sR0FBRyxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0YsYUFBYSxDQUFDLE9BQXlCO1FBQ3BDLE9BQU8sSUFBQSw4QkFBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQXlCO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNqRztRQUNELE9BQU8sMEJBQWUsQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQUs7UUFDYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUEvQ0Qsd0NBK0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQ29weXJpZ2h0IDIwMjAtMjAyMiBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmltcG9ydCB7IExpcXVpZCB9IGZyb20gJ2xpcXVpZGpzJztcblxuZXhwb3J0IGNsYXNzIExpcXVpZFJlbmRlcmVyIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignLmh0bWwubGlxdWlkJywgL14oLipcXC5odG1sKVxcLihsaXF1aWQpJC8pO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0IC8qIHRleHQsIG1ldGFkYXRhLCBkb2NJbmZvICovKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0aWFsc01vdW50ZWQgPSB0aGlzLnBhcnRpYWxEaXJzO1xuICAgICAgICAgICAgY29uc3QgZW5naW5lICAgID0gbmV3IExpcXVpZCh7XG4gICAgICAgICAgICAgICAgcGFydGlhbHM6IHBhcnRpYWxzTW91bnRlZCxcbiAgICAgICAgICAgICAgICBleHRuYW1lOiAnLmxpcXVpZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGVuZ2luZS5wYXJzZUFuZFJlbmRlcihcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29udGV4dC5ib2R5ID09PSAnc3RyaW5nJyA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudCxcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGFkYXRhKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zdCBkb2NwYXRoID0gY29udGV4dC5mc3BhdGggPyBjb250ZXh0LmZzcGF0aCA6IFwidW5rbm93blwiO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGBFcnJvciB3aXRoIExpcXVpZCBpbiBmaWxlICR7ZG9jcGF0aH1gKTtcbiAgICAgICAgICAgIGVyci5jYXVzZSA9IGU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBmcm9udG1hdHRlciBpbiB0aGUgZm9ybWF0IG9mIGxpbmVzIG9mIGRhc2hlc1xuICAgICAqIHN1cnJvdW5kaW5nIGEgWUFNTCBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICAgcGFyc2VNZXRhZGF0YShjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KTogUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBwYXJzZUZyb250bWF0dGVyKGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm1hdChjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5tYXRjaChjb250ZXh0LmZzcGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTGlxdWlkUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=