import React from "react";
import type { RefineLayoutTitleProps } from "@refinedev/ui-types";

import {
  render,
  TestWrapper as DefaultTestWrapper,
  type ITestWrapperProps,
} from "@test";

export const layoutTitleTests = (
  TitleElement: React.ComponentType<RefineLayoutTitleProps>,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Title Element", () => {
    it("should render successfully", async () => {
      const { container } = render(<TitleElement collapsed={false} />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });

    it("should use app name and icon from <Refine /> component", () => {
      const { getByTestId } = render(<TitleElement collapsed={false} />, {
        wrapper: TestWrapper({
          options: {
            title: {
              text: <div data-testid="my-company-name">My Company</div>,
              icon: <div data-testid="my-company-logo" />,
            },
          },
        }),
      });

      expect(getByTestId("my-company-name")).toBeInTheDocument();
      expect(getByTestId("my-company-logo")).toBeInTheDocument();
    });
  });
};
