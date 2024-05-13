import { render } from "@testing-library/react";
import { Label } from "./label.web";

describe("Label", () => {
  it("renders correctly", () => {
    expect(render(<Label>Title</Label>)).toMatchSnapshot();
  });

  it("renders children correctly", () => {
    const children = "Title";
    const { getByText } = render(<Label>{children}</Label>);
    expect(getByText(children)).toBeDefined();
  });

  test("required icon is shown", () => {
    const { getByTestId } = render(<Label required>Title</Label>);
    expect(getByTestId("label-required-icon")).toBeDefined();
  });
});
