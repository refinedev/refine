import { renderHook } from "@testing-library/react-hooks";
import { TestWrapper } from "@test";
import { useGetLocale } from "@hooks";

describe("useGetLocale", () => {
    it("should get default locale value if i18n provider not defined", () => {
        const { result } = renderHook(() => useGetLocale());

        expect(result.current()).toBe("en");
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
