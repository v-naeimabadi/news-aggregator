import { fireEvent } from "@testing-library/react";
import { EscapeHandler } from ".";

describe("EscapeHandler", () => {
  it("handlers get called", async () => {
    const fn = jest.fn();
    EscapeHandler.addEventListener(fn);
    EscapeHandler.addEventListener(() => {});
    await EscapeHandler.notifyListeners();
    expect(fn).toHaveBeenCalled();
  });

  it("handlers stop being notified once one handler returns true", async () => {
    const fn = jest.fn();
    EscapeHandler.addEventListener(fn);
    EscapeHandler.addEventListener(() => true);
    await EscapeHandler.notifyListeners();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("handler to be removed correctly", async () => {
    const fn = jest.fn();
    const remove = EscapeHandler.addEventListener(fn);
    remove();
    await EscapeHandler.notifyListeners();
    expect(fn).toHaveBeenCalledTimes(0);

    EscapeHandler.addEventListener(fn);
    EscapeHandler.removeEventListener(fn);
    await EscapeHandler.notifyListeners();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("expects handlers to be notified when escape key is pressed", () => {
    const fn = jest.fn();
    EscapeHandler.addEventListener(fn);
    fireEvent.keyDown(document, {
      key: "Escape",
    });
    expect(fn).toHaveBeenCalled();
  });
});
