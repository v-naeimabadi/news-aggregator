import { createContext } from "react";
import { CloseSource } from "../typings/close-source";

export const RequestCloseContext = createContext<
  undefined | ((source: CloseSource) => void)
>(undefined);
