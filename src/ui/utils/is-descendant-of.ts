import { VirtualElement } from "@floating-ui/react";

export function isDescendantOf(
  child: Element | EventTarget,
  parent: Element | VirtualElement
): boolean {
  let x: null | ParentNode = child as Element;
  if (child && child === parent) return true;
  if (!x || typeof x !== "object") return false;
  while ((x = (x as ParentNode & { parentNode: ParentNode }).parentNode)) {
    if (x === parent) return true;
  }
  return false;
}
