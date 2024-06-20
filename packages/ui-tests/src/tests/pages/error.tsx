import React from "react";
import type { RefineErrorPageProps } from "@refinedev/ui-types";

import {
  fireEvent,
  mockLegacyRouterProvider,
  mockRouterBindings,
  render,
  TestWrapper,
  waitFor,
} from "@test";

export const pageErrorTests = (
  ErrorPage: React.ComponentType<RefineErrorPageProps>,
): void => {
  describe("[@refinedev/ui-tests] Common Tests / Error Page", () => {
    it("should render successfully", async () => {
      const { container } = render(<ErrorPage />, {
        wrapper: TestWrapper({}),
      });

      expect(container).toBeTruthy();
    });

    it("back home button should work with legacy router provider", async () => {
      const pushMock = jest.fn();

      const { getByText } = render(<ErrorPage />, {
        wrapper: TestWrapper({
          legacyRouterProvider: {
            ...mockLegacyRouterProvider(),
            useHistory: () => ({
              goBack: jest.fn(),
              push: pushMock,
              replace: jest.fn(),
            }),
          },
        }),
      });

      fireEvent.click(getByText("Back Home"));

      await waitFor(() => {
        expect(pushMock).toBeCalledTimes(1);
      });

      expect(pushMock).toBeCalledWith("/");
    });

    it("back home button should work with router provider", async () => {
      const goMock = jest.fn();

      const { getByText } = render(<ErrorPage />, {
        wrapper: TestWrapper({
          routerProvider: mockRouterBindings({
            fns: {
              go: () => goMock,
            },
          }),
        }),
      });

      fireEvent.click(getByText("Back Home"));

      await waitFor(() => {
        expect(goMock).toBeCalledTimes(1);
      });

      expect(goMock).toBeCalledWith({ to: "/" });
    });
  });
};
