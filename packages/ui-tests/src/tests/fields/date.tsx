import React from "react";
import type { ConfigType } from "dayjs";

import type { RefineFieldDateProps } from "@refinedev/ui-types";

import type { ITestWrapperProps } from "@test";

import "dayjs/locale/tr";
import { render } from "@testing-library/react";

export const fieldDateTests = (
  DateField: React.ComponentType<RefineFieldDateProps<ConfigType, any, any>>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Date Field", () => {
    it("renders date with default format", () => {
      const { getByText } = render(
        <DateField value={new Date("2021-05-20")} />,
        { wrapper: TestWrapper?.({}) },
      );

      getByText("05/20/2021");
    });

    it("renders date with given format", () => {
      const { getByText } = render(
        <DateField value={new Date("2021-05-20")} format="DD/MM/YYYY" />,
        { wrapper: TestWrapper?.({}) },
      );

      getByText("20/05/2021");
    });

    it("renders date with given  LocalizedFormat", () => {
      const { getByText, rerender } = render(
        <DateField value={new Date("2021-05-20")} format="l" locales="tr" />,
        { wrapper: TestWrapper?.({}) },
      );

      getByText("20.5.2021");

      rerender(<DateField value={new Date("2021-05-20")} format="l" />);

      getByText("5/20/2021");
    });

    it("renders empty with given null", () => {
      const { getByTestId } = render(
        <DateField value={null} data-testid="date-field" />,
        { wrapper: TestWrapper?.({}) },
      );

      expect(getByTestId("date-field").textContent).toBe("");
    });

    it("renders empty with given undefined", () => {
      const { getByTestId } = render(
        <DateField value={undefined} data-testid="date-field" />,
        { wrapper: TestWrapper?.({}) },
      );

      expect(getByTestId("date-field").textContent).toBe("");
    });

    it("renders invalid date with given incorrect date", () => {
      const { getByText } = render(<DateField value={new Date("test")} />, {
        ...(TestWrapper && { wrapper: TestWrapper({}) }),
      });

      getByText("Invalid Date");
    });
  });
};
