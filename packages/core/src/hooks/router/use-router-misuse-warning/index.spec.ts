import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";
import * as checkRouterPropMisuse from "@definitions/helpers/check-router-prop-misuse";

import { useRouterMisuseWarning } from "./";

describe("useRouterMisuseWarning Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return routerProvider parse function result", () => {
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
    const checkRouterPropMisuseMock = jest.spyOn(
      checkRouterPropMisuse,
      "checkRouterPropMisuse",
    );

    const { rerender } = renderHook(() => useRouterMisuseWarning({}), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
      }),
    });

    // The function should be called during initial render
    expect(checkRouterPropMisuseMock).toHaveBeenCalled();

    // Clear calls before rerender to test the behavior
    checkRouterPropMisuseMock.mockClear();

    rerender();

    // Since the empty object doesn't trigger a warning, the ref doesn't get set to true,
    // so the function will be called again. This is expected behavior.
    expect(checkRouterPropMisuseMock).toHaveBeenCalledTimes(1);
  });
});
