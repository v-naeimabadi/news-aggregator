export enum FocusSource {
  Keyboard = "Keyboard",
  Pointer = "Pointer",
}

const context: { focusSource: FocusSource } = {
  focusSource: FocusSource.Pointer,
};

export function focusSource(): FocusSource {
  return context.focusSource;
}

export function initFocusHandler() {
  const u = (focusSource: FocusSource) => () => {
    context.focusSource = focusSource;
  };

  const b = () => {
    if (
      context.focusSource === FocusSource.Pointer &&
      document.activeElement &&
      (document.activeElement.tagName === "A" ||
        document.activeElement.tagName === "BUTTON" ||
        document.activeElement.getAttribute("data-focus") === "true" ||
        (document.activeElement.tagName === "INPUT" &&
          document.activeElement.getAttribute("type") === "submit"))
    ) {
      (document.activeElement as unknown as HTMLAnchorElement).blur();
    }
  };

  document.addEventListener("mousedown", u(FocusSource.Pointer));
  document.addEventListener("dragstart", u(FocusSource.Pointer));
  document.addEventListener("click", u(FocusSource.Pointer));
  document.addEventListener("dblclick", u(FocusSource.Pointer));
  document.addEventListener("pointerdown", u(FocusSource.Pointer));
  document.addEventListener("touchstart", u(FocusSource.Pointer));

  document.addEventListener("keydown", u(FocusSource.Keyboard));

  document.addEventListener("mouseup", b);
  document.addEventListener("dragend", b);
  document.addEventListener("contextmenu", b);
}
