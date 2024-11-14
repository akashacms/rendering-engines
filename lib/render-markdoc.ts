/**
 *
 * Copyright 2022 David Herron
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

// import * as path from 'path';
import { Renderer, parseFrontmatter } from './Renderer.js';
import { RenderingContext, RenderingFormat } from './index.js';
import Markdoc from '@markdoc/markdoc';
// import { Node, Config } from '@markdoc/markdoc';

/*
 * This is an incomplete integration of Markdoc into Renderers.
 *
 * Website: https://markdoc.dev/
 * 
 * Markdoc is a Markdown processor that has additional tags
 * and stuff.  It's interesting.
 * 
 * As noted in the next comment, it is necessary to override
 * their `partial` tag with one that works correctly, and
 * looks up files in the filesystem. But that in turn requires
 * figuring out how to parse the result from partial rendering
 * into an AST which Markdoc can deal with.  And I do not know
 * how to do that.  Further their documentation is very weak, vague,
 * nonspecific, and does not explain things clearly.
 * 
 */

/* Need to override the partial tag provided by Markdoc

For the partial tag it allows a variables attribute - How is 
this to be incorporated as metadata for the rendering?

The "how" is that the regular Partial function has a 
metadata parameter - for the Markdoc partial function 
it picks up the variables passing them in the metadata

In a custom tag implement the transform field to provide 
a function for the tag -- this function returns a Node  */

/* 
class PartialFile {
    validate(file: any, config: Config): any[] {

        This needs to look for the file in the filesystem

        /* const { partials = {} } = config;
        const partial = partials[file];
    
        if (!partial)
            return [
            {
                id: 'attribute-value-invalid',
                level: 'error',
                message: `Partial \`${file}\` not found. The 'file' attribute must be set in \`config.partials\``,
            },
            ];
    
        return []; *--/
    }
} */

/* const tagPartial = {
    render: 'partial',
    inline: false,
    selfClosing: true,
    attributes: {
        file: { type: PartialFile, render: false, required: true },
        variables: { type: Object, render: false },
    },
    transform(node: Node, config: Config) {

        Instead of this - find the partial in the filesystem
        The content of the partial must be parsed 
        These partials must be .markdoc files 

        /*
        const { partials = {} } = config;
        const { file, variables } = node.attributes;
        const partial: Node | Node[] = partials[file];
    
        if (!partial) return null;
        *--/
    
        const { file, variables } = node.attributes;
        const scopedConfig = {
            ...config,
            variables: {
            ...config.variables,
            ...variables,
            ['$$partial:filename']: file,
            },
        };
    
        const transformChildren = (part: Node) =>
            part.resolve(scopedConfig).transformChildren(scopedConfig);
    
        return Array.isArray(partial)
            ? partial.flatMap(transformChildren)
            : transformChildren(partial);
    },
}; */

const renderMarkdoc = (context, config) => {
    // console.log(context.metadata);
    const toRender = typeof context.body === 'string' ? context.body : context.content;
    if (typeof toRender !== 'string') {
        throw new Error(`MarkDoc render no context.body or context.content supplied for rendering`);
    }
    const ast = Markdoc.parse(
        toRender
    );
    // For Markdoc, the config.variables field must have
    // the "variables" to use.  In Renderers, this is the metadata.
    // To avoid polluting the config object, we make a shallow
    // copy and then change its variables object.
    let _config;
    if (config) {
        _config = {};
        for (let yprop in config) {
            _config[yprop] = config[yprop];
        }
        _config['variables'] = context.metadata;
    } else {
        _config = {};
        _config['variables'] = context.metadata;
    }
    const content = _config 
        ? Markdoc.transform(ast, _config)
        : Markdoc.transform(ast, /* config */);

    const html = Markdoc.renderers.html(content);
    // console.log(html);
    return html;
}

export class MarkdocRenderer extends Renderer {
    constructor() {
        super(".html.markdoc", /^(.*\.html)\.(markdoc)$/);
    }

    #mdocConfig;
  
    configuration(newConfig) {
        this.#mdocConfig = newConfig;
        return this;
    }
  
    /* use(mditPlugin, options) {
        md.use(mditPlugin, options);
        return this;
    } */
  
    renderSync(context: RenderingContext): string {
        // console.log('MarkdownRenderer renderSync '+ text);
        try {
            // console.log(`Markdown renderSync `, context);
            const ret = renderMarkdoc(context, this.#mdocConfig);
            // console.log(ret);
            return ret;
        } catch (e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Markdown in file ${docpath} because ${e}`);
            err.cause = e;
            throw err;
        }
    }
  
    async render(context: RenderingContext): Promise<string> {
        // console.log('MarkdownRenderer render');
        try {
            // console.log(`Markdown render `, context);
            const ret = renderMarkdoc(context, this.#mdocConfig);
            // console.log(rendered);
            return ret;
        } catch(e) {
            const docpath = context.fspath ? context.fspath : "unknown";
            const err = new Error(`Error with Markdown in file ${docpath} because ${e}`);
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
     parseMetadata(context: RenderingContext): RenderingContext {
        // The Markdoc documentation suggests this instead:
        //
        //    import yaml from 'js-yaml'; // or 'toml', etc.
        //
        //    const frontmatter = ast.attributes.frontmatter
        //        ? yaml.load(ast.attributes.frontmatter)
        //        : {};
        //
        //    const config = {
        //        variables: {
        //            frontmatter
        //        }
        //    };
        //
        // But there is no gain to doing so.  Markdoc.parse will
        // recognize the `---` lines as delimiting frontmatter, but 
        // does not parse the frontmatter into an object.  That does
        // not help with Renderers nor with AkashaCMS.
        //
        // Instead we can continue using the matter package to
        // extract YAML frontmatter.  Then when rendering the
        // content we'll pass context.body (if it exists).

        return parseFrontmatter(context);
    }

    renderFormat(context: RenderingContext) {
        // console.log(`renderFormat ${context}`);
        if (!this.match(context.fspath)) {
            throw new Error(`MarkdownRenderer does not render files with this extension ${context.fspath}`);
        }
        return RenderingFormat.HTML;
    }
}
