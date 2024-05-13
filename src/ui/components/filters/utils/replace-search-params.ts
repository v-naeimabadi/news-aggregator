import { stringify } from "query-string";

export function replaceSearchParams<T>(searchParams: T) {
  const newURL = new URL(window.location.href);
  newURL.search = "?" + stringify(searchParams as Record<string, string>);
  window.history.replaceState("", "", newURL);
}
