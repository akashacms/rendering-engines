"use strict";
/**
 *
 * Copyright 2020 David Herron
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
exports.NunjucksRenderer = void 0;
const Renderer_js_1 = require("./Renderer.js");
const index_js_1 = require("./index.js");
const nunjucks = __importStar(require("nunjucks"));
const _nunjuck_env = Symbol('id');
class NunjucksRenderer extends Renderer_js_1.Renderer {
    constructor() {
        super(".html.njk", /^(.*\.html)\.(njk)$/);
        this[_nunjuck_env] = undefined;
    }
    njkenv() {
        if (this[_nunjuck_env])
            return this[_nunjuck_env];
        // console.log(`njkenv layoutDirs ${util.inspect(config.layoutDirs)}`);
        // Detect if config is not set
        // In the Rendering module, config is stored in superclass
        // if (!config) throw new Error(`render-nunjucks no config`);
        // Get the paths for both the Layouts and Partials directories,
        // because with Nunjucks we are storing macros files in some
        // layouts directories.
        const loadFrom = this.layoutDirs.concat(this.partialDirs);
        // console.log(`njkenv `, loadFrom);
        // An open question is whether to create a custom Loader
        // class to integrate Nunjucks better with FileCache.  Clearly
        // Nunjucks can handle files being updated behind the scene.
        this[_nunjuck_env] = new nunjucks.Environment(
        // Using watch=true requires installing chokidar
        new nunjucks.FileSystemLoader(loadFrom, { watch: false }), {
            autoescape: false,
            noCache: false
        });
        // console.log(`njkenv`, this[_nunjuck_env]);
        return this[_nunjuck_env];
    }
    async render(context) {
        try {
            // console.log(context);
            let env = this.njkenv();
            return env.renderString(context.body ? context.body : context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }
    renderSync(context) {
        try {
            // console.log(context);
            let env = this.njkenv();
            return env.renderString(context.body ? context.body : context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath} because ${e}`);
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
            throw new Error(`NunjucksRenderer does not render files with this extension ${context.fspath}`);
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
exports.NunjucksRenderer = NunjucksRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW51bmp1Y2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1udW5qdWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILCtDQUEyRDtBQUMzRCx5Q0FBK0Q7QUFFL0QsbURBQXFDO0FBRXJDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVsQyxNQUFhLGdCQUFpQixTQUFRLHNCQUFRO0lBQzFDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCx1RUFBdUU7UUFDdkUsOEJBQThCO1FBQzlCLDBEQUEwRDtRQUMxRCw2REFBNkQ7UUFFN0QsK0RBQStEO1FBQy9ELDREQUE0RDtRQUM1RCx1QkFBdUI7UUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTFELG9DQUFvQztRQUVwQyx3REFBd0Q7UUFDeEQsOERBQThEO1FBQzlELDREQUE0RDtRQUU1RCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsV0FBVztRQUN6QyxnREFBZ0Q7UUFDaEQsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQ3pEO1lBQ0ksVUFBVSxFQUFFLEtBQUs7WUFDakIsT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FDSixDQUFDO1FBQ0YsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXlCO1FBQ2xDLElBQUk7WUFDQSx3QkFBd0I7WUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDN0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLDZDQUE2QztZQUM3QyxnREFBZ0Q7U0FDbkQ7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQywrQkFBK0IsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZCxNQUFNLEdBQUcsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUF5QjtRQUNoQyxJQUFJO1lBQ0Esd0JBQXdCO1lBQ3hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0Qiw2Q0FBNkM7WUFDN0MsZ0RBQWdEO1NBQ25EO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsK0JBQStCLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDRixhQUFhLENBQUMsT0FBeUI7UUFDcEMsT0FBTyxJQUFBLDhCQUFnQixFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsOERBQThELE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25HO1FBQ0QsT0FBTywwQkFBZSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNiLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQTlGRCw0Q0E4RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqXG4gKiBDb3B5cmlnaHQgMjAyMCBEYXZpZCBIZXJyb25cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBBa2FzaGFDTVMgKGh0dHA6Ly9ha2FzaGFjbXMuY29tLykuXG4gKlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBSZW5kZXJlciwgcGFyc2VGcm9udG1hdHRlciB9IGZyb20gJy4vUmVuZGVyZXIuanMnO1xuaW1wb3J0IHsgUmVuZGVyaW5nQ29udGV4dCwgUmVuZGVyaW5nRm9ybWF0IH0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbmltcG9ydCAqIGFzIG51bmp1Y2tzIGZyb20gJ251bmp1Y2tzJztcblxuY29uc3QgX251bmp1Y2tfZW52ID0gU3ltYm9sKCdpZCcpO1xuXG5leHBvcnQgY2xhc3MgTnVuanVja3NSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCIuaHRtbC5uamtcIiwgL14oLipcXC5odG1sKVxcLihuamspJC8pO1xuICAgICAgICB0aGlzW19udW5qdWNrX2Vudl0gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbmprZW52KCkge1xuICAgICAgICBpZiAodGhpc1tfbnVuanVja19lbnZdKSByZXR1cm4gdGhpc1tfbnVuanVja19lbnZdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgbmprZW52IGxheW91dERpcnMgJHt1dGlsLmluc3BlY3QoY29uZmlnLmxheW91dERpcnMpfWApO1xuICAgICAgICAvLyBEZXRlY3QgaWYgY29uZmlnIGlzIG5vdCBzZXRcbiAgICAgICAgLy8gSW4gdGhlIFJlbmRlcmluZyBtb2R1bGUsIGNvbmZpZyBpcyBzdG9yZWQgaW4gc3VwZXJjbGFzc1xuICAgICAgICAvLyBpZiAoIWNvbmZpZykgdGhyb3cgbmV3IEVycm9yKGByZW5kZXItbnVuanVja3Mgbm8gY29uZmlnYCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBwYXRocyBmb3IgYm90aCB0aGUgTGF5b3V0cyBhbmQgUGFydGlhbHMgZGlyZWN0b3JpZXMsXG4gICAgICAgIC8vIGJlY2F1c2Ugd2l0aCBOdW5qdWNrcyB3ZSBhcmUgc3RvcmluZyBtYWNyb3MgZmlsZXMgaW4gc29tZVxuICAgICAgICAvLyBsYXlvdXRzIGRpcmVjdG9yaWVzLlxuICAgICAgICBjb25zdCBsb2FkRnJvbSA9IHRoaXMubGF5b3V0RGlycy5jb25jYXQodGhpcy5wYXJ0aWFsRGlycyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYG5qa2VudiBgLCBsb2FkRnJvbSk7XG5cbiAgICAgICAgLy8gQW4gb3BlbiBxdWVzdGlvbiBpcyB3aGV0aGVyIHRvIGNyZWF0ZSBhIGN1c3RvbSBMb2FkZXJcbiAgICAgICAgLy8gY2xhc3MgdG8gaW50ZWdyYXRlIE51bmp1Y2tzIGJldHRlciB3aXRoIEZpbGVDYWNoZS4gIENsZWFybHlcbiAgICAgICAgLy8gTnVuanVja3MgY2FuIGhhbmRsZSBmaWxlcyBiZWluZyB1cGRhdGVkIGJlaGluZCB0aGUgc2NlbmUuXG5cbiAgICAgICAgdGhpc1tfbnVuanVja19lbnZdID0gbmV3IG51bmp1Y2tzLkVudmlyb25tZW50KFxuICAgICAgICAgICAgLy8gVXNpbmcgd2F0Y2g9dHJ1ZSByZXF1aXJlcyBpbnN0YWxsaW5nIGNob2tpZGFyXG4gICAgICAgICAgICBuZXcgbnVuanVja3MuRmlsZVN5c3RlbUxvYWRlcihsb2FkRnJvbSwgeyB3YXRjaDogZmFsc2UgfSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXV0b2VzY2FwZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9DYWNoZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYG5qa2VudmAsIHRoaXNbX251bmp1Y2tfZW52XSk7XG4gICAgICAgIHJldHVybiB0aGlzW19udW5qdWNrX2Vudl07XG4gICAgfVxuXG4gICAgYXN5bmMgcmVuZGVyKGNvbnRleHQ6IFJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbnRleHQpO1xuICAgICAgICAgICAgbGV0IGVudiA9IHRoaXMubmprZW52KCk7XG4gICAgICAgICAgICByZXR1cm4gZW52LnJlbmRlclN0cmluZyhcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJvZHkgPyBjb250ZXh0LmJvZHkgOiBjb250ZXh0LmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgY29udGV4dC5tZXRhZGF0YSk7XG4gICAgICAgICAgICAvLyBudW5qdWNrcy5jb25maWd1cmUoeyBhdXRvZXNjYXBlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIC8vIHJldHVybiBudW5qdWNrcy5yZW5kZXJTdHJpbmcodGV4dCwgbWV0YWRhdGEpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggTnVuanVja3MgaW4gZmlsZSAke2RvY3BhdGh9IGJlY2F1c2UgJHtlfWApO1xuICAgICAgICAgICAgZXJyLmNhdXNlID0gZTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclN5bmMoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY29udGV4dCk7XG4gICAgICAgICAgICBsZXQgZW52ID0gdGhpcy5uamtlbnYoKTtcbiAgICAgICAgICAgIHJldHVybiBlbnYucmVuZGVyU3RyaW5nKFxuICAgICAgICAgICAgICAgIGNvbnRleHQuYm9keSA/IGNvbnRleHQuYm9keSA6IGNvbnRleHQuY29udGVudCxcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1ldGFkYXRhKTtcbiAgICAgICAgICAgIC8vIG51bmp1Y2tzLmNvbmZpZ3VyZSh7IGF1dG9lc2NhcGU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgLy8gcmV0dXJuIG51bmp1Y2tzLnJlbmRlclN0cmluZyh0ZXh0LCBtZXRhZGF0YSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc3QgZG9jcGF0aCA9IGNvbnRleHQuZnNwYXRoID8gY29udGV4dC5mc3BhdGggOiBcInVua25vd25cIjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgRXJyb3Igd2l0aCBOdW5qdWNrcyBpbiBmaWxlICR7ZG9jcGF0aH0gYmVjYXVzZSAke2V9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgZnJvbnRtYXR0ZXIgaW4gdGhlIGZvcm1hdCBvZiBsaW5lcyBvZiBkYXNoZXNcbiAgICAgKiBzdXJyb3VuZGluZyBhIFlBTUwgc3RydWN0dXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgIHBhcnNlTWV0YWRhdGEoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCk6IFJlbmRlcmluZ0NvbnRleHQge1xuICAgICAgICByZXR1cm4gcGFyc2VGcm9udG1hdHRlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtYXQoY29udGV4dDogUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMubWF0Y2goY29udGV4dC5mc3BhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE51bmp1Y2tzUmVuZGVyZXIgZG9lcyBub3QgcmVuZGVyIGZpbGVzIHdpdGggdGhpcyBleHRlbnNpb24gJHtjb250ZXh0LmZzcGF0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVuZGVyaW5nRm9ybWF0LkhUTUw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=