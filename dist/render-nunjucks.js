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
const HTMLRenderer_js_1 = require("./HTMLRenderer.js");
const nunjucks = __importStar(require("nunjucks"));
const _nunjuck_env = Symbol('id');
const getMounted = (dir) => {
    if (typeof dir === 'string')
        return dir;
    else
        return dir.src;
};
class NunjucksRenderer extends HTMLRenderer_js_1.HTMLRenderer {
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
        const layoutsMounted = this.layoutDirs.map(getMounted);
        const partialsMounted = this.partialDirs.map(getMounted);
        const loadFrom = layoutsMounted.concat(partialsMounted);
        // console.log(`njkenv `, loadFrom);
        // An open question is whether to create a custom Loader
        // class to integrate Nunjucks better with FileCache.  Clearly
        // Nunjucks can handle files being updated behind the scene.
        this[_nunjuck_env] = new nunjucks.Environment(
        // Using watch=true requires installing chokidar
        new nunjucks.FileSystemLoader(loadFrom, { watch: false }), 
        // config.layoutDirs.concat(config.partialsDirs), { watch: false }),
        {
            autoescape: false,
            noCache: false
        });
        // console.log(`njkenv`, this[_nunjuck_env]);
        return this[_nunjuck_env];
    }
    async render(context /* text, metadata, docInfo */) {
        try {
            let env = this.njkenv();
            return env.renderString(context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }
    renderSync(context /* text, metadata, docInfo */) {
        try {
            let env = this.njkenv();
            return env.renderString(context.content, context.metadata);
            // nunjucks.configure({ autoescape: false });
            // return nunjucks.renderString(text, metadata);
        }
        catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Nunjucks in file ${docpath}`);
            err.cause = e;
            throw err;
        }
    }
    /**
     * We cannot allow PHP code to run through Mahabhuta.
     */
    doMahabhuta(fpath) {
        return true;
    }
}
exports.NunjucksRenderer = NunjucksRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLW51bmp1Y2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL3JlbmRlci1udW5qdWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILHVEQUFpRDtBQUdqRCxtREFBcUM7QUFFckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWxDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDdkIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1FBQUUsT0FBTyxHQUFHLENBQUM7O1FBQ25DLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixNQUFhLGdCQUFpQixTQUFRLDhCQUFZO0lBQzlDO1FBQ0ksS0FBSyxDQUFDLFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCx1RUFBdUU7UUFDdkUsOEJBQThCO1FBQzlCLDBEQUEwRDtRQUMxRCw2REFBNkQ7UUFFN0QsK0RBQStEO1FBQy9ELDREQUE0RDtRQUM1RCx1QkFBdUI7UUFDdkIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV4RCxvQ0FBb0M7UUFFcEMsd0RBQXdEO1FBQ3hELDhEQUE4RDtRQUM5RCw0REFBNEQ7UUFFNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFdBQVc7UUFDekMsZ0RBQWdEO1FBQ2hELElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUNyRCxvRUFBb0U7UUFDeEU7WUFDSSxVQUFVLEVBQUUsS0FBSztZQUNqQixPQUFPLEVBQUUsS0FBSztTQUNqQixDQUNKLENBQUM7UUFDRiw2Q0FBNkM7UUFDN0MsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBeUIsQ0FBQyw2QkFBNkI7UUFDaEUsSUFBSTtZQUNBLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsNkNBQTZDO1lBQzdDLGdEQUFnRDtTQUNuRDtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1AsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLCtCQUErQixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBeUIsQ0FBQyw2QkFBNkI7UUFDOUQsSUFBSTtZQUNBLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsNkNBQTZDO1lBQzdDLGdEQUFnRDtTQUNuRDtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1AsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLCtCQUErQixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxLQUFLO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBekVELDRDQXlFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIENvcHlyaWdodCAyMDIwIERhdmlkIEhlcnJvblxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEFrYXNoYUNNUyAoaHR0cDovL2FrYXNoYWNtcy5jb20vKS5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEhUTUxSZW5kZXJlciB9IGZyb20gJy4vSFRNTFJlbmRlcmVyLmpzJztcbmltcG9ydCB7IFJlbmRlcmluZ0NvbnRleHQgfSBmcm9tICcuL2luZGV4LmpzJztcblxuaW1wb3J0ICogYXMgbnVuanVja3MgZnJvbSAnbnVuanVja3MnO1xuXG5jb25zdCBfbnVuanVja19lbnYgPSBTeW1ib2woJ2lkJyk7XG5cbmNvbnN0IGdldE1vdW50ZWQgPSAoZGlyKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkaXIgPT09ICdzdHJpbmcnKSByZXR1cm4gZGlyO1xuICAgIGVsc2UgcmV0dXJuIGRpci5zcmM7XG59O1xuXG5leHBvcnQgY2xhc3MgTnVuanVja3NSZW5kZXJlciBleHRlbmRzIEhUTUxSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiLmh0bWwubmprXCIsIC9eKC4qXFwuaHRtbClcXC4obmprKSQvKTtcbiAgICAgICAgdGhpc1tfbnVuanVja19lbnZdID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG5qa2VudigpIHtcbiAgICAgICAgaWYgKHRoaXNbX251bmp1Y2tfZW52XSkgcmV0dXJuIHRoaXNbX251bmp1Y2tfZW52XTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYG5qa2VudiBsYXlvdXREaXJzICR7dXRpbC5pbnNwZWN0KGNvbmZpZy5sYXlvdXREaXJzKX1gKTtcbiAgICAgICAgLy8gRGV0ZWN0IGlmIGNvbmZpZyBpcyBub3Qgc2V0XG4gICAgICAgIC8vIEluIHRoZSBSZW5kZXJpbmcgbW9kdWxlLCBjb25maWcgaXMgc3RvcmVkIGluIHN1cGVyY2xhc3NcbiAgICAgICAgLy8gaWYgKCFjb25maWcpIHRocm93IG5ldyBFcnJvcihgcmVuZGVyLW51bmp1Y2tzIG5vIGNvbmZpZ2ApO1xuXG4gICAgICAgIC8vIEdldCB0aGUgcGF0aHMgZm9yIGJvdGggdGhlIExheW91dHMgYW5kIFBhcnRpYWxzIGRpcmVjdG9yaWVzLFxuICAgICAgICAvLyBiZWNhdXNlIHdpdGggTnVuanVja3Mgd2UgYXJlIHN0b3JpbmcgbWFjcm9zIGZpbGVzIGluIHNvbWVcbiAgICAgICAgLy8gbGF5b3V0cyBkaXJlY3Rvcmllcy5cbiAgICAgICAgY29uc3QgbGF5b3V0c01vdW50ZWQgPSB0aGlzLmxheW91dERpcnMubWFwKGdldE1vdW50ZWQpO1xuICAgICAgICBjb25zdCBwYXJ0aWFsc01vdW50ZWQgPSB0aGlzLnBhcnRpYWxEaXJzLm1hcChnZXRNb3VudGVkKTtcbiAgICAgICAgY29uc3QgbG9hZEZyb20gPSBsYXlvdXRzTW91bnRlZC5jb25jYXQocGFydGlhbHNNb3VudGVkKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgbmprZW52IGAsIGxvYWRGcm9tKTtcblxuICAgICAgICAvLyBBbiBvcGVuIHF1ZXN0aW9uIGlzIHdoZXRoZXIgdG8gY3JlYXRlIGEgY3VzdG9tIExvYWRlclxuICAgICAgICAvLyBjbGFzcyB0byBpbnRlZ3JhdGUgTnVuanVja3MgYmV0dGVyIHdpdGggRmlsZUNhY2hlLiAgQ2xlYXJseVxuICAgICAgICAvLyBOdW5qdWNrcyBjYW4gaGFuZGxlIGZpbGVzIGJlaW5nIHVwZGF0ZWQgYmVoaW5kIHRoZSBzY2VuZS5cblxuICAgICAgICB0aGlzW19udW5qdWNrX2Vudl0gPSBuZXcgbnVuanVja3MuRW52aXJvbm1lbnQoXG4gICAgICAgICAgICAvLyBVc2luZyB3YXRjaD10cnVlIHJlcXVpcmVzIGluc3RhbGxpbmcgY2hva2lkYXJcbiAgICAgICAgICAgIG5ldyBudW5qdWNrcy5GaWxlU3lzdGVtTG9hZGVyKGxvYWRGcm9tLCB7IHdhdGNoOiBmYWxzZSB9KSxcbiAgICAgICAgICAgICAgICAvLyBjb25maWcubGF5b3V0RGlycy5jb25jYXQoY29uZmlnLnBhcnRpYWxzRGlycyksIHsgd2F0Y2g6IGZhbHNlIH0pLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGF1dG9lc2NhcGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5vQ2FjaGU6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBuamtlbnZgLCB0aGlzW19udW5qdWNrX2Vudl0pO1xuICAgICAgICByZXR1cm4gdGhpc1tfbnVuanVja19lbnZdO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbmRlcihjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0IC8qIHRleHQsIG1ldGFkYXRhLCBkb2NJbmZvICovKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZW52ID0gdGhpcy5uamtlbnYoKTtcbiAgICAgICAgICAgIHJldHVybiBlbnYucmVuZGVyU3RyaW5nKGNvbnRleHQuY29udGVudCwgY29udGV4dC5tZXRhZGF0YSk7XG4gICAgICAgICAgICAvLyBudW5qdWNrcy5jb25maWd1cmUoeyBhdXRvZXNjYXBlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIC8vIHJldHVybiBudW5qdWNrcy5yZW5kZXJTdHJpbmcodGV4dCwgbWV0YWRhdGEpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggTnVuanVja3MgaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyU3luYyhjb250ZXh0OiBSZW5kZXJpbmdDb250ZXh0IC8qIHRleHQsIG1ldGFkYXRhLCBkb2NJbmZvICovKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgZW52ID0gdGhpcy5uamtlbnYoKTtcbiAgICAgICAgICAgIHJldHVybiBlbnYucmVuZGVyU3RyaW5nKGNvbnRleHQuY29udGVudCwgY29udGV4dC5tZXRhZGF0YSk7XG4gICAgICAgICAgICAvLyBudW5qdWNrcy5jb25maWd1cmUoeyBhdXRvZXNjYXBlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIC8vIHJldHVybiBudW5qdWNrcy5yZW5kZXJTdHJpbmcodGV4dCwgbWV0YWRhdGEpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3BhdGggPSBjb250ZXh0LmZzcGF0aCA/IGNvbnRleHQuZnNwYXRoIDogXCJ1bmtub3duXCI7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIHdpdGggTnVuanVja3MgaW4gZmlsZSAke2RvY3BhdGh9YCk7XG4gICAgICAgICAgICBlcnIuY2F1c2UgPSBlO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2UgY2Fubm90IGFsbG93IFBIUCBjb2RlIHRvIHJ1biB0aHJvdWdoIE1haGFiaHV0YS5cbiAgICAgKi9cbiAgICBkb01haGFiaHV0YShmcGF0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=