import React, { ReactNode } from "react";
import { ComponentsContext } from "@contexts/components";
import { Layout } from "@components/layout";
import { IComponentsContext } from "../../contexts/components/IComponentsContext";
import { render, screen, TestWrapper, MockJSONServer } from "@test";
import { Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const renderWithComponentsContext = (
    children: ReactNode,
    { components }: IComponentsContext,
) => {
    return render(<Route path="/">{children}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/"],
            components,
        }),
    });
};

describe("Layout", () => {
    test("Layout renders the components passed by ComponentsContext", () => {
        const testContent = "Example component content";

        renderWithComponentsContext(<Layout />, {
            components: <p>{testContent}</p>,
        });

        expect(screen.getByText(testContent));
    });

    test("Layout renders without components", () => {
        const result = renderWithComponentsContext(<Layout />, {
            components: undefined,
        });

        expect(result).toBeTruthy();
    });
});
