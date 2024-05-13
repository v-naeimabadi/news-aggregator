import { useEffect, useState } from "react";

const TABLET_BREAKPOINT = 692;

const context: { mql?: MediaQueryList } = {};

function createMql(): MediaQueryList {
  if (context.mql) return context.mql;
  context.mql = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT + 1}px)`);
  return context.mql;
}

export function useIsTablet(): boolean {
  const mql = createMql();
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
