import * as React from "react";

import { renderHook } from "@testing-library/react-hooks";
import { render } from "@test";
import { TranslationContextProvider } from "@contexts/translation";
import { useGetLocale } from "@hooks";

describe("TranslationContext", () => {
    const TestComponent = () => {
        const locale = useGetLocale();
        return <div>{`Current language: ${locale()}`}</div>;
    };

    const customRender = (ui: any, providerProps?: any) => {
        return render(
            <TranslationContextProvider {...providerProps}>
                {ui}
            </TranslationContextProvider>,
            providerProps,
        );
    };

    it("should get value from TranslationContext ", () => {
        const providerProps = {
            i18nProvider: {
                translate: () => "merhaba",
                changeLocale: () => Promise.resolve(),
                getLocale: () => "tr",
            },
        };

        const { getByText } = customRender(<TestComponent />, providerProps);

        expect(getByText("Current language: tr"));
    });
});
