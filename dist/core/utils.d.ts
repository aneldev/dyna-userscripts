export declare function showToast(message: string, duration?: number, type?: 'info' | 'success' | 'error' | 'warning'): void;
export declare function copyToClipboard(content: string, _label?: string): void;
export declare function addGlobalClickListener(classNames: string, cb: (event: MouseEvent) => void): void;
export declare function addGlobalClickListenerBySelectors(selectorsArray: string[], cb: (element: Element) => void): void;
export declare function addGlobalDoubleClickListener(className: string, cb: (event: MouseEvent) => void): void;
export declare function addElementCreationEventListenerBySelector(selector: string, cb: (element: Element) => void): void;
export declare function addElementCreationEventListener(classNames: string, cb: (element: Element) => void): void;
export declare function onElementCreation(cb: (node: Node) => void): void;
export declare function debugJsonStringify(obj: any, spacing?: number): string;
export declare function refresh(): void;
export declare function refreshNoQuery(): void;
export declare function getTimestamp(): number;
export declare function getHumanTimestamp(): string;
export declare function getShortGuid(): string;
export declare function injectStyle(style: string): void;
export declare function injectToolbar(args: {
    title: string;
    buttons: Array<{
        label: string;
        color?: string;
        onClick: () => void;
    }>;
}): void;
export declare function injectButton(options: {
    label: string;
    height?: number;
    afterElement: Element;
    color?: string;
    onClick: () => void;
}): void;
export declare function clearApp(options?: {
    cookies?: boolean;
    data?: boolean;
}): void;
export declare function selectFirst(selector: string, rootElement?: Document | Element): Element | null;
export declare function select(selector: string, rootElement?: Document | Element): Element[];
export declare function selectById(id: string, rootElement: HTMLElement): Element | null;
export declare function selectByClass(className: string, rootElement?: Document | Element): Element[];
export declare function random(from: number, to_?: number): number;
export declare function getStackStrace(): string[];
export declare function getFirstArticleText(): void;
export declare function get10TipsFromArticle(): void;
export declare const isTop: boolean;
export declare const isInIframe: boolean;
export declare function guid(randomBlocks?: number): string;
export declare function shortGuid(): string;
export declare function getElementHash(container: Element, element: Element): string | null;
//# sourceMappingURL=utils.d.ts.map