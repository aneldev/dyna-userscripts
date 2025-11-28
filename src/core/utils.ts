
// DOM Types
type ElementOrParent = Element | null;

export function showToast(message: string, duration: number = 3000, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void {
  if (!['info', 'success', 'error', 'warning'].includes(type)) {
    console.error(`showToast: type [${type}] is not supported`);
    return;
  }

  const toast: HTMLDivElement = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  toast.innerHTML = `<span class="toast-message">${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      document.body.removeChild(toast);
    }
  }, duration);

  const style: string = `
      .toast {
        position: fixed;
        top: 16px;
        right: 32px;
        padding: 12px 16px;
        color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        z-index: 9999;
      }
      .toast-message {
        display: block;
        font-size: 14px;
        line-height: 1.4;
      }
      .toast-info { background-color: #2196f3; }
      .toast-success { background-color: #4caf50; }
      .toast-error { background-color: #f44336; }
      .toast-warning { background-color: #ff9800; }
    `;

  const css: HTMLStyleElement = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(style));
  document.head.appendChild(css);
}

export function copyToClipboard(content: string, _label?: string): void {
  if (!content) {
    showToast('Error, nothing to copy to clipboard');
    return;
  }
  const label: string = _label || `Copied: ${content.substring(0, 20)}${content.length > 20 ? '...' : ''}`;

  navigator.clipboard.writeText(content)
    .then(() => showToast(label, 3000, 'success'))
    .catch((error: Error) => {
      showToast(`Error copying to clipboard: ${error.message || 'Unknown error'}`, 3000, 'error');
      console.error('Error copying timestamp to clipboard:', error);
    });
}

const hasAllClasses = (element: ElementOrParent, classNames: string): boolean => {
  const classList: string[] = classNames.split(/\s+/);
  let currentElement: ElementOrParent = element;

  while (currentElement) {
    if (classList.every(className => currentElement!.classList.contains(className))) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }
  return false;
};

export function addGlobalClickListener(classNames: string, cb: (event: MouseEvent) => void): void {
  window.addEventListener('click', (event: MouseEvent) => {
    if (hasAllClasses(event.target as Element, classNames)) {
      cb(event);
    }
  });
}

export function addGlobalClickListenerBySelectors(selectorsArray: string[], cb: (element: Element) => void): void {
  document.addEventListener('click', (event: MouseEvent) => {
    for (const selector of selectorsArray) {
      let element: ElementOrParent = event.target as Element;
      while (element && !element.matches(selector)) {
        element = element.parentElement!;
      }
      if (element) {
        cb(element as Element);
        break;
      }
    }
  });
}

export function addGlobalDoubleClickListener(className: string, cb: (event: MouseEvent) => void): void {
  let lastClick: number = 0;
  addGlobalClickListener(className, (event: MouseEvent) => {
    if (Date.now() - lastClick < 300) cb(event);
    lastClick = Date.now();
  });
}

export function addElementCreationEventListenerBySelector(selector: string, cb: (element: Element) => void): void {
  const existingElements: NodeListOf<Element> = document.querySelectorAll(selector);
  for (const element of existingElements) {
    cb(element);
  }

  const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      const addedNodes: Node[] = Array.from(mutation.addedNodes);
      for (const node of addedNodes) {
        if ('matches' in node && (node as Element).matches(selector)) {
          cb(node as Element);
        }
        else {
          const matchingDescendants: NodeListOf<Element> = (node as Element).querySelectorAll(selector);
          for (const descendant of matchingDescendants) {
            cb(descendant);
          }
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

export function addElementCreationEventListener(classNames: string, cb: (element: Element) => void): void {
  console.warn('addElementCreationEventListener is deprecated, use addElementCreationEventListenerBySelector instead!!!');
  onElementCreation((node: Node) => {
    const classNameSelector: string = classNames.split(' ').map(s => '.' + s)
      .join('');
    const hasElements = node.parentElement?.querySelectorAll(classNameSelector) || [];
    Array.from(hasElements).forEach((element: Element) => cb(element));
  });
}

export function onElementCreation(cb: (node: Node) => void): void {
  const observerCallback = (mutationsList: MutationRecord[]): void => {
    mutationsList.forEach((mutation: MutationRecord) => {
      mutation.addedNodes.forEach((node: Node) => cb(node));
    });
  };
  const observer: MutationObserver = new MutationObserver(observerCallback);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

export function debugJsonStringify(obj: any, spacing: number = 0): string {
  const cache: WeakMap<object, boolean> = new WeakMap();
  const replacer = (_key: string, value: any): any => {
    if (value === window) return "[window]";
    if (value instanceof Error) return `Error: ${value.message || "Unknown error"}`;
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) return '[circular-ref]';
      cache.set(value, true);
    }
    if (typeof value === 'function') return value.toString();
    return value;
  };
  return JSON.stringify(obj, replacer, spacing);
}

export function refresh(): void {
  window.location.reload();
}

export function refreshNoQuery(): void {
  window.location.href = window.location.href.split('?')[0];
}

export function getTimestamp(): number {
  const now: Date = new Date();
  const pad = (num: number): string => num.toString().padStart(2, '0');
  const timestampText: string = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return Number(timestampText);
}

export function getHumanTimestamp(): string {
  const date: Date = new Date();
  const pad = (num: number): string => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}--${pad(date.getHours())}-${pad(date.getMinutes())}`;
}

export function getShortGuid(): string {
  const prefix: string | null = localStorage.getItem('ultra-short-guid--prefix');
  if (!prefix) {
    alert('No ultra-short-guid--prefix is defined in localStorage, doing it now, copied to clipboard');
    copyToClipboard("localStorage.setItem('ultra-short-guid--prefix', 'XX')", 'Prefix script copied to update it');
    return '';
  }
  const counter: number = (Number(localStorage.getItem('ultra-short-guid--counter') || 234)) + 1;
  localStorage.setItem('ultra-short-guid--counter', counter.toString());
  const output: string = [prefix, Math.random().toString()
    .slice(-1), counter, Math.random().toString()
    .slice(-1)].join('');
  return output;
}

export function injectStyle(style: string): void {
  const styleElement: HTMLStyleElement = document.createElement('style');
  styleElement.textContent = style;
  document.head.appendChild(styleElement);
}

export function injectToolbar(args: { title: string; buttons: Array<{ label: string; color?: string; onClick: () => void }> }): void {
  const toolbar: HTMLDivElement = document.createElement('div');
  Object.assign(toolbar.style, {
    position: 'fixed' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
  });
  toolbar.classList.add('toolbar');

  const title: HTMLHeadingElement = document.createElement('h3');
  title.textContent = args.title;
  Object.assign(title.style, {
    color: 'gray',
    margin: '10px',
  });
  toolbar.appendChild(title);

  const buttonContainer: HTMLDivElement = document.createElement('div');
  Object.assign(buttonContainer.style, {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    padding: '10px',
  });

  args.buttons.forEach(({
    label, color = 'purple', onClick,
  }) => {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = label;
    Object.assign(button.style, {
      backgroundColor: color,
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
    });
    button.addEventListener('click', onClick);
    buttonContainer.appendChild(button);
  });

  toolbar.appendChild(buttonContainer);
  document.body.appendChild(toolbar);
}

export function injectButton(options: {
  label: string;
  height?: number;
  afterElement: Element;
  color?: string;
  onClick: () => void;
}): void {
  const {
    label, height = 32, afterElement, color = "tomato", onClick,
  } = options;
  const button: HTMLButtonElement = document.createElement('button');
  button.innerHTML = label;
  Object.assign(button.style, {
    lineHeight: `${height}px`,
    width: 'auto',
    padding: '0 8px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: color,
    color: 'white',
    cursor: 'pointer',
  });
  button.addEventListener('click', onClick);
  (window as any).testButton = button;
  afterElement.insertAdjacentElement('afterend', button);
}

export function clearApp(options: { cookies?: boolean; data?: boolean } = {}): void {
  const {
    cookies = false, data = false,
  } = options;

  if (cookies) {
    const cookies: string[] = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie: string = cookies[i];
      const eqPos: number = cookie.indexOf("=");
      const name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
    console.info(`clearApp: ${cookies.length} cookies cleared`);
  }

  if (data) {
    localStorage.clear();
    console.info(`clearApp: ${localStorage.length} local storage cleared`);
    sessionStorage.clear();
    console.info(`clearApp: ${sessionStorage.length} session storage cleared`);
  }

  if (!cookies && !data) {
    console.info('clearApp: nothing cleared, call like: clearApp({cookies: true, data: true})');
  }
}

export function selectFirst(selector: string, rootElement: Document | Element = document): Element | null {
  return rootElement.querySelector(selector);
}

export function select(selector: string, rootElement: Document | Element = document): Element[] {
  return Array.from(rootElement.querySelectorAll(selector));
}

export function selectById(id: string, rootElement: HTMLElement): Element | null {
  return (rootElement as any).getElementById(id);
}

export function selectByClass(className: string, rootElement: Document | Element = document): Element[] {
  return Array.from(rootElement.getElementsByClassName(className));
}

export function random(from: number, to_: number = from): number {
  if (to_ === undefined) {
    to_ = from;
    from = 0;
  }
  if (to_ < from) [from, to_] = [to_, from];
  return Math.floor((Math.random() * ((to_ - from) + 1)) + from);
}

export function getStackStrace(): string[] {
  try {
    throw new Error();
  }
  catch (e: any) {
    return e.stack!.split('\n').slice(2);
  }
}

export function getFirstArticleText(): void {
  const article: HTMLElement | null = document.querySelector('article');
  if (!article) return;
  const text: string = article.innerText;
  console.info("Focus the tab to copy article text to clipboard");
  const handleFocus = (): void => {
    copyToClipboard(text, `Article copied ${Math.round(text.length / 1000)}kb`);
    window.removeEventListener('focus', handleFocus);
  };
  window.addEventListener('focus', handleFocus);
}

export function get10TipsFromArticle(): void {
  const article: HTMLElement | null = document.querySelector('article');
  if (!article) return;
  const text: string = `Γράψε 10 tips από το παρακάτω κείμενο 60 με 90 χαρακτήρες το κάθε ένα${article.innerText}`;
  console.info("Focus the tab to copy article text to clipboard");
  const handleFocus = (): void => {
    copyToClipboard(text, `Tips copied ${Math.round(text.length / 1000)}kb`);
    window.removeEventListener('focus', handleFocus);
  };
  window.addEventListener('focus', handleFocus);
}

export const isTop: boolean = window.self === window.top;
export const isInIframe: boolean = !isTop;

const randomBlock = (): string => Number(Math.random().toString()
  .substring(2)).toString(16)
  .substring(0, 8);

export function guid(randomBlocks: number = 2): string {
  const datePart: string = (Date.now() * 3).toString(16);
  const timeZone: number = new Date().getTimezoneOffset();
  const timeZonePart: string = Number(`${timeZone < 0 ? "7" : "6"}${Math.abs(timeZone)}`).toString(16);
  const outputSize: number = (randomBlocks * 9) + 3 + 15;
  let output: string = "";
  for (let i = 0; i < randomBlocks; i++) {
    output += `${randomBlock()}-`;
  }
  output += timeZonePart + datePart;
  while (output.length < outputSize) output += randomBlock();
  return output.substring(0, outputSize);
}

let guidIndex: number = 0;
export function shortGuid(): string {
  return String(Date.now() * 3) + (guidIndex++);
}

export function getElementHash(container: Element, element: Element): string | null {
  if (!container || !element) return null;

  const getIndex = (node: Element): number => {
    let index: number = 0;
    let sibling: Element | null = node;
    while ((sibling = sibling.previousElementSibling)) {
      if (sibling.tagName === node.tagName) index++;
    }
    return index;
  };

  const path: string[] = [];
  let current: ElementOrParent = element;
  while (current && current !== container) {
    if (!current.tagName) return null;
    path.unshift(`${current.tagName}:${getIndex(current as Element)}`);
    current = current.parentElement;
  }

  if (current !== container) return null;
  const pathString: string = path.join('|');

  let hash: number = 5381;
  for (let i = 0; i < pathString.length; i++) {
    hash = ((hash << 5) + hash) + pathString.charCodeAt(i);
    hash = hash & 0xFFFFFFFF;
  }
  return "h" + hash.toString(36);
}

export const consoleDebugAdvanced = (): void => {
  if ((window as any).consoleDebugMocked) return;
  (window as any).consoleDebugAll = [];
  let lastTime: number = Date.now();
  const originalDebug: typeof console.debug = console.debug;

  const regExpIsTempVariable: RegExp = /^temp\d+$/;
  console.debug = function (...userArgs: any[]): void {
    const now: number = Date.now();
    let elapsed: string = String(now - lastTime);
    while (elapsed.length < 6) elapsed = ' ' + elapsed;
    const prefix: string = `🐝 ${elapsed}ms elapsed -`;
    lastTime = now;

    const consoleDebugAdvancedConfig: any = typeof userArgs.at(-1) === "object" &&
    userArgs.at(-1)?.consoleDebugAdvancedConfig === true ? userArgs.at(-1) : {};

    const args: any[] = consoleDebugAdvancedConfig.hardCopy
      ? userArgs.map(arg => typeof arg === "object" && arg !== null ? JSON.parse(JSON.stringify(arg)) : arg)
      : userArgs;

    originalDebug.call(console, prefix, ...args, {
      "00 label": "Export arguments tool",
      "01 hardCopied": !!consoleDebugAdvancedConfig.hardCopy,
      get "02 Export to arguments to temp1 --> click it"(): string {
        const currentTempVariables: number = Object.keys(window)
          .filter((key: string) => regExpIsTempVariable.test(key)).length;
        for (let i = currentTempVariables; i > 0; i--) {
          if ((window as any)[`temp${i}`]) {
            (window as any)[`temp${i + 1}`] = (window as any)[`temp${i}`];
          }
        }
        (window as any).temp1 = args.reduce((acc: any, arg: any, index: number) => {
          acc[`arg${index}`] = arg;
          return acc;
        }, {});
        return "Exported";
      },
      "03 help": [
        "# Console Debug Advanced Config",
        "Configure by passing {consoleDebugAdvancedConfig: true} as last arg to console.debug",
        "Access all logs: window.consoleDebugAll",
        "Hard copy: {consoleDebugAdvancedConfig: true, hardCopy: true}",
      ],
    });

    (window as any).consoleDebugAll!.push({
      ellapsed: prefix,
      label: args[0],
      args,
      date: new Date(),
    });
  };
  (window as any).consoleDebugMocked = true;
  console.debug('🐝 consoleDebugAdvanced APPLIED');
};
