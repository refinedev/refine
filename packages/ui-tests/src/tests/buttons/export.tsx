import React from "react";
import {
  type RefineExportButtonProps,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import {
  type ITestWrapperProps,
  render,
  TestWrapper as DefaultTestWrapper,
} from "@test";

export const buttonExportTests = (
  ExportButton: React.ComponentType<RefineExportButtonProps<any, any>>,
  TestWrapper: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }> = DefaultTestWrapper,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Export Button", () => {
    beforeAll(() => {
      jest.spyOn(console, "warn").mockImplementation(jest.fn());
    });

    it("should render button successfuly", async () => {
      const { container, getByText } = render(<ExportButton />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
      getByText("Export");
    });

    it("should have the correct test-id", async () => {
      const { queryByTestId } = render(<ExportButton />, {
        wrapper: TestWrapper({}),
      });

      expect(queryByTestId(RefineButtonTestIds.ExportButton)).toBeTruthy();
    });

    it("should render text by children", async () => {
      const { container, getByText } = render(
        <ExportButton>refine</ExportButton>,
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(container).toBeTruthy();

      getByText("refine");
    });

    it("should render without text show only icon", async () => {
      const { container, queryByText } = render(<ExportButton hideText />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();

      expect(queryByText("Export")).not.toBeInTheDocument();
    });
  });
};
