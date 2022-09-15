import { Renderer } from './Renderer';
export { Renderer } from './Renderer';
export { HTMLRenderer } from './HTMLRenderer';
export declare type ConfigurationParams = {
    partialDirs?: Array<string>;
    findPartial?: (fn: any) => Promise<string>;
    findPartialSync?: (fn: any) => string;
    layoutDirs?: Array<string>;
    findLayout?: (fn: any) => Promise<string>;
    findLayoutSync?: (fn: any) => string;
    partial?: (fn: any, metadata: any) => Promise<string>;
    partialSync?: (fn: any, metadata: any) => string;
};
export declare type RenderingContext = {
    fspath?: string;
    content: string;
    renderTo?: string;
    metadata: any;
};
export declare class Configuration {
    #private;
    constructor(params?: ConfigurationParams);
    /**
     * An array of absolute paths to directories containing
     * partial templates.
     */
    set partialDirs(dirz: Array<string>);
    get partialDirs(): Array<string>;
    /**
     * Add an absolute pathname for a directory to find partial templates.
     * @param dir
     */
    addPartialDir(dir: string): void;
    /**
     * Store a function for finding partial templates.
     */
    set partialFinder(finder: (fnpartial: any) => Promise<string>);
    /**
     * Store a function for finding partial templates.
     */
    set partialFinderSync(finder: (fnpartial: any) => string);
    findPartial(fnpartial: string): Promise<string>;
    findPartialSync(fnpartial: string): string;
    /**
     * An array of absolute paths to directories containing
     * layout templates.
     */
    set layoutDirs(dirz: Array<string>);
    get layoutDirs(): Array<string>;
    /**
     * Add an absolute pathname for a directory to find layout templates.
     * @param dir
     */
    addLayoutDir(dir: string): void;
    /**
     * Store a function for finding layout templates
     * @param finder
     */
    set layoutFinder(finder: (fnlayout: any) => Promise<string>);
    /**
     * Store a function for finding layout templates
     * @param finder
     */
    set layoutFinderSync(finder: (fnlayout: any) => string);
    findLayout(fnlayout: string): Promise<string>;
    findLayoutSync(fnlayout: string): string;
    /**
     * Return the list of registered renderers
     */
    get renderers(): Array<Renderer>;
    registerRenderer(renderer: Renderer): void;
    /**
     * Allow an application to override one of the built-in renderers
     * that are initialized below.  The inspiration is epubtools that
     * must write HTML files with an .xhtml extension.  Therefore it
     * can subclass EJSRenderer etc with implementations that force the
     * file name to be .xhtml.  We're not checking if the renderer name
     * is already there in case epubtools must use the same renderer name.
     */
    registerOverrideRenderer(renderer: Renderer): void;
    findRendererName(name: string): Renderer;
    findRendererPath(_path: string): Renderer;
    registerBuiltInRenderers(): void;
    /**
     * Find a Renderer by its extension.
     */
    findRenderer(name: string): Renderer;
    set partialFunc(pfunc: (fname: string, metadata: any) => Promise<string>);
    set partialFuncSync(pfunc: (fname: string, metadata: any) => string);
    partial(fname: string, metadata: any): Promise<string>;
    partialSync(fname: string, metadata: any): string;
}
//# sourceMappingURL=index.d.ts.map