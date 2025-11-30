import moment from "moment";

import {
  getDurationString,
  getRuntimeStack,
} from "../utils";

import {isLocalhost} from "./isLocalhost";

interface IConsoleLog {
  index: number;
  time: string;
  elapsed: string;
  severity: ESeverity;
  args: any[];
  message: string;
  date: Date;
  elapsedMs: number;
  stack: string[];
  copyToGlobal: string;
}

export enum ESeverity {
  LOG = 'log',
  INFO = 'info',
  DEBUG = 'debug',
  ERROR = 'error',
  CAUGHT_ERROR = 'caught-error',
  WARN = 'warn',
}

/**
 * ConsoleLogger stores all the console logs in memory for later processing and easier access to the logged error objects or data.
 *
 * You can access the logs from the `consoleLogger.logs` array, which also includes other information like timestamps, elapsed time from the previous log, stack trace, etc.
 *
 * Tip: You can add `consoleLogger.logs` to your debugger's watcher for easy access.
 */
class ConsoleLogger {
  public readonly logs: IConsoleLog[] = [];
  private _index = 0;

  private _isEnabled = localStorage.getItem('ConsoleLogger-Enabled') === "true";
  private _lastConsole: number = Date.now();
  private _originalConsole: Record<ESeverity, (...args: any[]) => void> = {
    log: window.console.log,
    info: window.console.info,
    debug: window.console.debug,
    error: window.console.error,
    warn: window.console.warn,
    [ESeverity.CAUGHT_ERROR]: () => undefined, // It is not used anyway
  };

  constructor() {
    window.console.log = (...args: any[]) => this._perform(ESeverity.LOG, args);
    window.console.info = (...args: any[]) => this._perform(ESeverity.INFO, args);
    window.console.debug = (...args: any[]) => this._perform(ESeverity.DEBUG, args);
    window.console.error = (...args: any[]) => this._perform(ESeverity.ERROR, args);
    window.console.warn = (...args: any[]) => this._perform(ESeverity.WARN, args);
    (window as any).consoleLogger = this;

    window.addEventListener('error', (error) => {
      this._perform(ESeverity.CAUGHT_ERROR, ["consoleLogger: Uncaught error", error.message, error]);
    });
    window.addEventListener('unhandledrejection', (event) => {
      this._perform(ESeverity.CAUGHT_ERROR, ["consoleLogger: Uncaught promise rejection", event.reason, event]);
    });

    if (this.enabled) {
      console.info(
        [
          "consoleLogger: Is enabled and logging for this terminal.",
          "Run `consoleLogger.enabled=false` to turn it off.",
        ].join('\n'),
      );
    }
    else {
      if (isLocalhost) {
        console.info(
          [
            "consoleLogger: Started but it is not enabled for this terminal.",
            "Run `consoleLogger.enabled=true` to start logging the consoles.",
            "This message is shown only in dev environment.",
          ].join('\n'),
        );
      }
    }
  }

  private _perform = (severity: ESeverity, args: any[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const date = new Date();
    const elapsed = getDurationString(this._lastConsole, date);

    if (this.enabled) {
      const logItem = {
        index: this._index++,
        time: moment(date).format('HH:mm:ss.SSS'),
        elapsed,
        severity,
        args,
        message: ((): string => {
          const messageArray: string[] = [];
          const argParts = args.concat();
          while (
            (typeof argParts[0] === 'string' && !!argParts[0]) ||
            (typeof argParts[0] === 'number')
            ) messageArray.push(argParts.shift());
          return messageArray.filter(Boolean).join(' ');
        })(),
        date,
        elapsedMs: date.valueOf() - this._lastConsole,
        stack: getRuntimeStack(),
        get copyToGlobal(): string {
          self._copyToGlobal(logItem);
          return "Copied to `window.temp`"; // Technically, assigned, not copied
        },
      };
      this.logs.push(logItem);
    }
    const prefix = `${elapsed.padStart(12, ' ')}`;
    this._lastConsole = date.valueOf();
    this._originalConsole[severity](prefix, ...args);
  };

  public get enabled(): boolean {
    return this._isEnabled;
  }

  public set enabled(enabled: boolean) {
    this._isEnabled = enabled;
    localStorage.setItem('ConsoleLogger-Enabled', enabled.toString());
  }

  public clear(): void {
    this.logs.length = 0;
    console.info('ConsoleLogger: clear() called');
  }

  private _copyToGlobal(logItem: IConsoleLog): void {
    const currentTempVariables =
      Object
        .keys(window)
        .filter(key => regExpIsTempVariable.test(key)).length;
    for (let i = currentTempVariables; i > 0; i--) {
      if ((window as any)[`temp${i}`]) (window as any)[`temp${i + 1}`] = (window as any)[`temp${i}`];
    }
    (window as any).temp1 = logItem;
  }
}

const regExpIsTempVariable = /^temp\d+$/;

(window as any).__consoleLogger_started = false;

export const startConsoleLogger = (): void => {
  console.debug("STARTER", {
    LIB: true,
    "(window as any).__consoleLogger_started": (window as any).__consoleLogger_started,
    window: window,
  });
  if ((window as any).__consoleLogger_started) return;
  (window as any).__consoleLogger_started = true;
  new ConsoleLogger();
};
