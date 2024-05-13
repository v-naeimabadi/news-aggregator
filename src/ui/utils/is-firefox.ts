export function isFirefox(): boolean {
  if (typeof window !== "undefined") {
    const ua = window.navigator.userAgent;
    return ua.toLowerCase().indexOf("firefox") > -1;
  }
  return false;
}
