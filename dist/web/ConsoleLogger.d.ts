export declare enum ESeverity {
    LOG = "log",
    INFO = "info",
    DEBUG = "debug",
    ERROR = "error",
    CAUGHT_ERROR = "caught-error",
    WARN = "warn"
}
declare global {
    interface Window {
        __consoleLogger_started: boolean;
        unsafeWindow?: Window;
    }
}
export declare const startConsoleLogger: () => void;
//# sourceMappingURL=ConsoleLogger.d.ts.map