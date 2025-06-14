import React from "react";
import type { RefineFieldUrlProps } from "@refinedev/ui-types";

import type { ITestWrapperProps } from "@test";
import { render } from "@testing-library/react";

export const fieldUrlTests = (
  UrlField: React.ComponentType<
    RefineFieldUrlProps<string | undefined, any, any>
  >,
  TestWrapper?: (
    props: ITestWrapperProps,
  ) => React.FC<{ children?: React.ReactNode }>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Url Field", () => {
    const url = "https://www.google.com/";

    it("renders urlField with given value", () => {
      const { getByText } = render(<UrlField value={url} />, {
        wrapper: TestWrapper?.({}),
      });

      const link = getByText(url) as HTMLAnchorElement;
      expect(link.href).toBe(url);
      expect(link.tagName).toBe("A");
    });

    it("renders deep fields", () => {
      const record = { id: 1, source: { path: url } };

      const { getByText } = render(<UrlField value={record.source.path} />, {
        wrapper: TestWrapper?.({}),
      });

      const link = getByText(url) as HTMLAnchorElement;
      expect(link.href).toBe(url);
    });

    it("renders children element", () => {
      const { getByText } = render(
        <UrlField value={url}>Make this link</UrlField>,
        { wrapper: TestWrapper?.({}) },
      );

      const link = getByText("Make this link") as HTMLAnchorElement;
      expect(link.href).toBe(url);
    });
  });
};
