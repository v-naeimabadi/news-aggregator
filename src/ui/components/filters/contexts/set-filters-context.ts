import { createContext, Dispatch, SetStateAction } from "react";

export const SetFiltersContext = createContext<
  Dispatch<SetStateAction<unknown>> | undefined
>(undefined);
