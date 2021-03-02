import * as React from "react";
import { fireEvent, render, TestWrapper } from "@test";
import { useSetLocale } from "@hooks";

describe("useSetLocale", () => {
    const TestComponent = () => {
        const setLocale = useSetLocale();
        return (
            <>
                <button onClick={() => setLocale("tr")}>Turkish</button>
            </>
        );
    };

    it("should trigger i18nProvider changeLocale method", async () => {
        const setLocale = jest.fn();

        const { getByText } = render(<TestComponent />, {
            wrapper: TestWrapper({
                resources: [{ name: "tests" }],
                i18nProvider: {
                    translate: () => "merhaba",
                    changeLocale: () => setLocale(),
                    getLocale: () => "tr",
                },
            }),
        });
        fireEvent.click(getByText("Turkish"));
        expect(setLocale).toHaveBeenCalledTimes(1);
    });
});
