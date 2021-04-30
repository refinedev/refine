import React, { ReactNode, FC } from "react";
import { LayoutWrapper } from "@components/layoutWrapper";
import { Layout } from "@components/layoutWrapper/components";
import { IAdminContextProvider } from "../../contexts/admin/IAdminContext";
import { render, screen, TestWrapper, MockJSONServer } from "@test";
import { Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { LayoutProps } from "src/interfaces";

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

describe("LayoutWrapper", () => {
    test("LayoutWrapper renders the custom components if Layout is given as DefaultLayout", () => {
        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        const customHeaderContent = "customHeaderContent";
        const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        renderWithAdminContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            Layout,
            Sider: CustomSider,
            Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
        });

        expect(screen.getByText(customSiderContent));
        expect(screen.getByText(customHeaderContent));
        expect(screen.getByText(customFooterContent));
        expect(screen.getByText(customOffLayoutAreaContent));
    });

    test("LayoutWrapper renders custom components if given custom Layout renders them", () => {
        const CustomLayout: FC<LayoutProps> = ({
            Header,
            Sider,
            Footer,
            OffLayoutArea,
            children,
        }) => (
            <div>
                <Header />
                <Sider />
                {children}
                <Footer />
                <OffLayoutArea />
            </div>
        );

        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        const customHeaderContent = "customHeaderContent";
        const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        renderWithAdminContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            Layout: CustomLayout,
            Sider: CustomSider,
            Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
        });

        expect(screen.getByText(customSiderContent));
        expect(screen.getByText(customHeaderContent));
        expect(screen.getByText(customFooterContent));
        expect(screen.getByText(customOffLayoutAreaContent));
    });
});
