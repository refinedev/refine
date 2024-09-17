import React, { type ReactNode } from "react";
import type { RefineFieldTagProps } from "@refinedev/ui-types";

import type { ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const fieldTagTests = (
  TagField: React.ComponentType<RefineFieldTagProps<ReactNode, any>>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Tag Field", () => {
    it("renders boolean values correctly", () => {
      const { getByText } = render(<TagField value={true} />, {
        wrapper: TestWrapper?.({}),
      });

      getByText("true");
    });

    it("renders boolean values correctly", () => {
      const { queryByText } = render(<TagField value={undefined} />, {
        wrapper: TestWrapper?.({}),
      });

      expect(queryByText("true")).toBeNull();
    });
  });
};
