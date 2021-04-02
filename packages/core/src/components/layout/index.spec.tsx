import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { ComponentsContext } from "@contexts/components";
import { Layout } from "@components/layout";
import { IComponentsContext } from "../../contexts/components/IComponentsContext";
import "@testing-library/jest-dom/extend-expect";

const renderWithComponentsContext = (
    children: ReactNode,
    { components }: IComponentsContext,
) => {
    return render(
        <ComponentsContext.Provider value={{ components }}>
            {children}
        </ComponentsContext.Provider>,
    );
};

test("Layout renders the components passed by ComponentsContext", () => {
    const testContent = "Example component";

    renderWithComponentsContext(<Layout />, {
        components: <p>{testContent}</p>,
    });

    expect(screen.getByText(testContent));
});
