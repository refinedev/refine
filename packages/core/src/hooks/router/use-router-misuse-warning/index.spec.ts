import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockLegacyRouterProvider } from "@test";
import * as checkRouterPropMisuse from "@definitions/helpers/check-router-prop-misuse";

import { useRouterMisuseWarning } from "./";

describe("useRouterMisuseWarning Hook", () => {
  it("should return routerProvider parse function result", () => {
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
    const checkRouterPropMisuseMock = jest.spyOn(
      checkRouterPropMisuse,
      "checkRouterPropMisuse",
    );

    const { rerender } = renderHook(
      () => useRouterMisuseWarning(mockLegacyRouterProvider()),
      {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
          dataProvider: MockJSONServer,
        }),
      },
    );

    expect(checkRouterPropMisuseMock).toBeCalledTimes(1);

    rerender();

    expect(checkRouterPropMisuseMock).toBeCalledTimes(1);
  });
});
