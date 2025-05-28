import React, { type ReactNode } from "react";
import type { RefineFieldTextProps } from "@refinedev/ui-types";

import type { ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const fieldTextTests = (
  TextField: React.ComponentType<RefineFieldTextProps<ReactNode, any>>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Text Field", () => {
    it("renders text correctly", () => {
      const { getByText } = render(<TextField value="test" />, {
        wrapper: TestWrapper?.({}),
      });

      getByText("test");
    });
  });
};
