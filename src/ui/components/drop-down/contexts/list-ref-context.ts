import { createContext, MutableRefObject } from "react";

export const ListRefContext = createContext<
  undefined | MutableRefObject<Array<HTMLLIElement | null>>
>(undefined);
