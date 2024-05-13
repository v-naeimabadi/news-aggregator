export type EventHandler = () =>
  | boolean
  | undefined
  | null
  | void
  | Promise<boolean | undefined | null | void>;

let initiated = false;

function initEscapeHandler(): void {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      EscapeHandler.notifyListeners();
    }
  });
}

export class EscapeHandler {
  private static _listeners: { [key: string]: EventHandler } = {};
  private static _key = 0;

  public static addEventListener(handler: EventHandler): () => void {
    if (!initiated) {
      initiated = true;
      initEscapeHandler();
    }
    const key = EscapeHandler._key.toString();
    EscapeHandler._key++;
    EscapeHandler._listeners[key] = handler;

    return () => {
      delete EscapeHandler._listeners[key];
    };
  }

  public static removeEventListener(handler: EventHandler): void {
    for (const prop in EscapeHandler._listeners) {
      if (
        Object.prototype.hasOwnProperty.call(EscapeHandler._listeners, prop)
      ) {
        if (EscapeHandler._listeners[prop] === handler) {
          delete EscapeHandler._listeners[prop];
          break;
        }
      }
    }
  }

  public static async notifyListeners(): Promise<void> {
    const listeners: EventHandler[] = [];
    for (const prop in EscapeHandler._listeners) {
      if (
        Object.prototype.hasOwnProperty.call(EscapeHandler._listeners, prop)
      ) {
        listeners.push(EscapeHandler._listeners[prop]);
      }
    }
    listeners.reverse();
    // Stops when one listener returns true
    for (const listener of listeners) {
      if (await Promise.resolve(listener())) {
        break;
      }
    }
  }
}
