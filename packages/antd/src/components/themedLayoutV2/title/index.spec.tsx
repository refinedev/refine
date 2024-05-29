import React from "react";
import { render } from "@testing-library/react";
import { ThemedTitleV2 } from ".";
import { layoutTitleTests } from "@refinedev/ui-tests";

describe("Themed Title", () => {
  layoutTitleTests.bind(this)(ThemedTitleV2);

  test("should render default text", () => {
    const { getByText } = render(<ThemedTitleV2 collapsed={false} />);
    expect(getByText("Refine Project")).toBeInTheDocument();
  });

  test("should render custom text", () => {
    const { getByText } = render(
      <ThemedTitleV2 collapsed={false} text="Custom Title" />,
    );
    expect(getByText("Custom Title")).toBeInTheDocument();
  });

  test("should render default icon", () => {
    const { getByTestId } = render(<ThemedTitleV2 collapsed={false} />);
    expect(getByTestId("refine-logo")).toBeInTheDocument();
  });

  test("should render custom icon", () => {
    const { getByTestId } = render(
      <ThemedTitleV2
        collapsed={false}
        icon={<div data-testid="custom-icon" />}
      />,
    );
    expect(getByTestId("custom-icon")).toBeInTheDocument();
  });

  test("should not render text when collapsed true", () => {
    const { queryByText } = render(<ThemedTitleV2 collapsed={true} />);
    expect(queryByText("Refine Project")).not.toBeInTheDocument();
  });
});
