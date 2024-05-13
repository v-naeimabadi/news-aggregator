import { MutableRefObject, useEffect, useState } from "react";

interface ElementDimensions {
  width: number;
  height: number;
}

export function useElementDimensions<T extends HTMLElement>(
  ref?: MutableRefObject<T | null>,
): ElementDimensions | undefined {
  const [dimensions, setDimensions] = useState<ElementDimensions | undefined>();
  useEffect(() => {
    if (ref && ref.current) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        });
      });
      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }
    return;
  }, [ref]);
  return dimensions;
}
