import React, { ReactNode } from "react";
import { LayoutWrapper } from "@components/layoutWrapper";
import { IAdminContextProvider } from "../../contexts/admin/IAdminContext";
import { render, screen, TestWrapper, MockJSONServer } from "@test";
import { Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const renderWithAdminContext = (
    children: ReactNode,
    adminProvider: IAdminContextProvider,
) => {
    return render(<Route path="/">{children}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/"],
            adminProvider,
        }),
    });
};

describe("Layout", () => {
    test("Layout renders the components passed by AdminContext", () => {
        const testContent = "Example component content";

        const CustomOffLayoutArea = () => <p>{testContent}</p>;

        renderWithAdminContext(<LayoutWrapper />, {
            OffLayoutArea: CustomOffLayoutArea,
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
        });

        expect(screen.getByText(testContent));
    });

    test("Layout renders without OffLayoutArea component", () => {
        const result = renderWithAdminContext(<LayoutWrapper />, {
            OffLayoutArea: undefined,
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
        });

        expect(result).toBeTruthy();
    });
});
