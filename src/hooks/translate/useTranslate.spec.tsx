import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { render, TestWrapper, MockJSONServer } from "@test";
import { useTranslate } from "@hooks";

describe("useTranslate", () => {
    const TestComponent = () => {
        const translate = useTranslate();
        return <div>{translate("undefined key", "hello test")}</div>;
    };

    it("works correctly without using i18n provider", () => {
        const { getByText } = render(<TestComponent />);

        getByText("hello test");
    });

    it("works with i18nprovider", () => {
        const { getByText } = render(<TestComponent />, {
            wrapper: TestWrapper({
                resources: [{ name: "tests" }],
                i18nProvider: {
                    translate: () => "merhaba",
                    changeLocale: () => Promise.resolve(),
                    getLocale: () => "tr",
                },
            }),
        });

        expect(getByText("merhaba")).toBeTruthy();
    });
});
