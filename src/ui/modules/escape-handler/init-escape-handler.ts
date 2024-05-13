import { EscapeHandler } from "./escape-handler";

export function initEscapeHandler(): void {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      EscapeHandler.notifyListeners();
    }
  });
}
