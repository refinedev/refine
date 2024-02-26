import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test/index";
import { useMediaQuery } from ".";

describe("useMediaQuery Helper Hook", () => {
  it("should return false if the media query does not match", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"), {
      wrapper: TestWrapper({}),
    });

    expect(result.current).toBe(false);
  });
  it("should return", () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== "(max-width: 1024px)",
      media: "",
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery("(max-width: 600px)"), {
      wrapper: TestWrapper({}),
    });

    expect(result.current).toBe(true);
  });
});
