import React from "react";
import type { RefineReadyPageProps } from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  render,
  TestWrapper as DefaultTestWrapper,
} from "@test";

export const pageReadyTests = (
  ReadyPage: React.ComponentType<RefineReadyPageProps>,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Ready Page", () => {
    it("should render successfully", async () => {
      const { container } = render(<ReadyPage />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });
  });
};
