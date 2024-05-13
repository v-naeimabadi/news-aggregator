import { parse } from "query-string";

export function getSearchParams() {
  return parse(window.location.search);
}
