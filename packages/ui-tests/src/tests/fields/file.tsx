import React from "react";
import type { RefineFieldFileProps } from "@refinedev/ui-types";

import type { ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const fieldFileTests = (
  FileField: React.ComponentType<RefineFieldFileProps<any, any>>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / File Field", () => {
    it("renders an anchor with file link", () => {
      const value = {
        title: "Test",
        src: "www.google.com",
      };

      const { getByTitle } = render(
        <FileField src={value.src} title={value.title} />,
        { wrapper: TestWrapper?.({}) },
      );

      expect(getByTitle(value.title)).toHaveAttribute("href", value.src);
    });

    it("renders an anchor with src", () => {
      const value = {
        src: "www.google.com",
      };

      const { getByText } = render(<FileField src={value.src} />, {
        wrapper: TestWrapper?.({}),
      });

      expect(getByText(value.src)).toHaveAttribute("href", value.src);
    });
  });
};
