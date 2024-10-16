import React from "react";
import type { AutoSaveIndicatorProps } from "@refinedev/core";
import type { ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const autoSaveIndicatorTests = (
  AutoSaveIndicator: React.ComponentType<AutoSaveIndicatorProps>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / AutoSaveIndicator", () => {
    it("should render success", async () => {
      const { findByText, getByText } = render(
        <AutoSaveIndicator status="success" />,
        {
          wrapper: TestWrapper?.({}),
        },
      );
      await findByText("saved");
      getByText("saved");
    });

    it("should render error", async () => {
      const { findByText, getByText } = render(
        <AutoSaveIndicator status="error" />,
        {
          wrapper: TestWrapper?.({}),
        },
      );

      await findByText("auto save failure");
      getByText("auto save failure");
    });

    it("should render idle", async () => {
      const { findByText, getByText } = render(
        <AutoSaveIndicator status="idle" />,
        {
          wrapper: TestWrapper?.({}),
        },
      );

      await findByText("waiting for changes");
      getByText("waiting for changes");
    });

    it("should render loading", async () => {
      const { findByText, getByText } = render(
        <AutoSaveIndicator status="loading" />,
        {
          wrapper: TestWrapper?.({}),
        },
      );

      await findByText("saving...");
      getByText("saving...");
    });
  });
};
