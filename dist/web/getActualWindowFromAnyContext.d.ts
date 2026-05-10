declare global {
    interface Window {
        __consoleLogger_started: boolean;
        unsafeWindow?: Window;
    }
}
export declare const getActualWindowFromAnyContext: () => Window;
//# sourceMappingURL=getActualWindowFromAnyContext.d.ts.map