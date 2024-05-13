export function isSafariOnMacOs() {
  if (typeof window !== "undefined") {
    const ua = window.navigator.userAgent;

    // Chrome returns safari so check for that first
    if (
      ua.indexOf("Chrome") > -1 ||
      ua.indexOf("Safari") === -1 ||
      ua.indexOf("iPad") > -1 ||
      ua.indexOf("iPhone") > -1
    ) {
      return false;
    }

    // Recent iPadOS returns Macintosh as well, so we need to check for touchevent
    if (ua.indexOf("Macintosh") > -1) {
      try {
        document.createEvent("TouchEvent");
        return false;
      } catch (e) {
        //
      }
      return true;
    }

    return false;
  }
  return false;
}
