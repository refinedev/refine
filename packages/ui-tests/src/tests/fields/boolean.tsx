import React from "react";
import type { RefineFieldBooleanProps } from "@refinedev/ui-types";

import { act, fireEvent, type ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const fieldBooleanTests = (
  BooleanField: React.ComponentType<RefineFieldBooleanProps<unknown, any, any>>,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Boolean Field", () => {
    xit("should use prop for custom text", async () => {
      const baseDom = render(
        <BooleanField value={true} valueLabelTrue="test" />,
        { wrapper: TestWrapper?.({}) },
      );

      const booleanField = baseDom.getByTestId("custom-field");

      act(() => {
        fireEvent.mouseOver(booleanField);
      });

      expect(baseDom.getByLabelText("test")).toBeInTheDocument();
    });

    it("renders value with prop for custom icon", () => {
      const { getByTestId } = render(
        <div data-testid="custom-field">
          <BooleanField
            value={true}
            trueIcon={<div data-testid="icon-custom-element" />}
          />
        </div>,
        { wrapper: TestWrapper?.({}) },
      );

      expect(getByTestId("icon-custom-element")).toBeTruthy();
    });
  });
};
