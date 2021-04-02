import React, { useContext } from "react";

import { renderHook } from "@testing-library/react-hooks";
import { render } from "@test";
import { TranslationContextProvider } from "@contexts/translation";
import { useGetLocale } from "@hooks";
import { IComponentsContext } from "src/interfaces";
import { ComponentsContext, ComponentsContextProvider } from ".";

describe("ComponentsContext", () => {
    const TestComponent = () => {
        const { components } = useContext<IComponentsContext>(
            ComponentsContext,
        );

        return <>{components}</>;
    };

    it("should get value from ComponentsContext ", () => {
        const testContent = "Deneme";

        const { getByText } = render(
            <ComponentsContextProvider components={<p>{testContent}</p>}>
                <TestComponent />
            </ComponentsContextProvider>,
        );

        expect(getByText(testContent));
    });
});
