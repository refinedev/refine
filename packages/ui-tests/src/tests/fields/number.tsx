import React, { type ReactChild } from "react";
import type { RefineFieldNumberProps } from "@refinedev/ui-types";

import type { ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const fieldNumberTests = (
  NumberField: React.ComponentType<RefineFieldNumberProps<ReactChild, any>>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Number Field", () => {
    it("renders numbers with given formatting", () => {
      const testPrice = 12345.6789;
      const options = {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      };
      const locale = "de-DE";

      const { getByText } = render(
        <NumberField value={testPrice} locale={locale} options={options} />,
        { wrapper: TestWrapper?.({}) },
      );

      const formattedTestPrice = testPrice
        .toLocaleString(locale, options)
        .replace(String.fromCharCode(160), " ");

      // node 14 uses non-breaking space resulting in imcompatibility
      getByText(formattedTestPrice);
    });

    it("should render NaN when value is undefined", () => {
      const { getByText } = render(<NumberField value={undefined} />, {
        wrapper: TestWrapper?.({}),
      });

      getByText("NaN");
    });

    it("should render NaN when value is string", () => {
      const { getByText } = render(<NumberField value={"not a number"} />, {
        wrapper: TestWrapper?.({}),
      });

      getByText("NaN");
    });
  });
};
