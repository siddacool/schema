export function debugLog(debug: boolean, ...args: unknown[]): void {
  if (debug) {
    console.log('%c[DEBUG]', 'color: #00a6f4; font-weight: bold;', ...args);
  }
}
