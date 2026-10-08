import React from "react";
import { vi } from "vitest";

import { render } from "@test";
import { ErrorComponent } from "../error";

describe("AntdErrorComponent", () => {
  it("should render the error without antd deprecation warnings", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    const { getByText, getByRole } = render(
      <ErrorComponent error="Something <b>went</b> wrong" />,
    );

    expect(getByRole("alert")).toBeTruthy();
    expect(getByText("Error")).toBeTruthy();
    expect(getByText("went")).toBeTruthy();

    const antdWarnings = consoleErrorSpy.mock.calls.filter((args) =>
      args.some((arg) => String(arg).includes("[antd:")),
    );
    expect(antdWarnings).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  it("should render nothing when there is no error", () => {
    const { container } = render(<ErrorComponent error={undefined} />);

    expect(container.innerHTML).toBe("");
  });
});
