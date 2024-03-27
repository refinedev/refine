import { renderHook } from "@testing-library/react";

import { useGetLocale } from "@hooks";
import { TestWrapper } from "@test";

describe("useGetLocale", () => {
  it("should get undefined value if i18n provider not defined", () => {
    const { result } = renderHook(() => useGetLocale());

    expect(result.current()).toBe(undefined);
  });

  it("should get locale value from i18nProvider getLocale method", () => {
    const { result } = renderHook(() => useGetLocale(), {
      wrapper: TestWrapper({
        resources: [{ name: "tests" }],
        i18nProvider: {
          translate: () => "merhaba",
          changeLocale: () => Promise.resolve(),
          getLocale: () => "tr",
        },
      }),
    });

    expect(result.current()).toBe("tr");
  });
});
