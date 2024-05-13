export function isSafariOnIOs() {
  if (typeof window !== "undefined") {
    const ua = window.navigator.userAgent;

    // Chrome returns safari so check for that first
    if (ua.indexOf("Chrome") > -1 || ua.indexOf("Safari") === -1) {
      return false;
    }

    if (ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1) {
      return true;
    }

    // Recent iPadOS returns Macintosh as well, so we need to check for touchevent
    if (ua.indexOf("Macintosh") > -1) {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        //
      }
      return false;
    }

    return false;
  }
  return false;
}
