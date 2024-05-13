import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

const context: { mql?: MediaQueryList } = {};

function createMql(width: number): MediaQueryList {
  if (context.mql) {
    if (!width || context.mql.media.includes(width.toString())) {
      return context.mql;
    }
  }

  context.mql = window.matchMedia(
    `(max-width: ${width ? width : MOBILE_BREAKPOINT}px)`,
  );
  return context.mql;
}

export function useIsMobile(width = 0): boolean {
  const mql = createMql(width);
  const [value, setValue] = useState(mql.matches);
  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => {
      setValue(e.matches);
    };
    mql.addEventListener("change", listener);
    return () => {
      mql.removeEventListener("change", listener);
    };
  }, [mql]);
  return value;
}
