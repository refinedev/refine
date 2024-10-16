import React, { type ReactNode } from "react";
import type { RefineFieldEmailProps } from "@refinedev/ui-types";

import type { ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const fieldEmailTests = (
  EmailField: React.ComponentType<RefineFieldEmailProps<ReactNode, any, any>>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Email Field", () => {
    it("renders email with mailto href", () => {
      const { getByText } = render(<EmailField value="test@test.com" />, {
        wrapper: TestWrapper?.({}),
      });

      expect(getByText("test@test.com")).toHaveProperty(
        "href",
        "mailto:test@test.com",
      );
    });
  });
};
