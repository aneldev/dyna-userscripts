declare global {
  interface Window {
    __consoleLogger_started: boolean;
    unsafeWindow?: Window;  // Optional for CRA context
  }
}

export const getActualWindowFromAnyContext = (): Window => {
  return typeof (window as any).unsafeWindow !== 'undefined'
    ? (window as any).unsafeWindow as Window
    : window;
};
