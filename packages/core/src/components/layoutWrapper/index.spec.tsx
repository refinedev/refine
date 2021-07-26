import React from "react";
import { LayoutWrapper } from "@components/layoutWrapper";
import { IRefineContextProvider } from "../../contexts/refine/IRefineContext";
import { render, screen, TestWrapper, MockJSONServer } from "@test";
import { Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { LayoutProps } from "src/interfaces";

const renderWithRefineContext = (
    children: React.ReactNode,
    refineProvider: IRefineContextProvider,
) => {
    return render(<Route path="/">{children}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/"],
            refineProvider,
        }),
    });
};

describe("LayoutWrapper", () => {
    test("LayoutWrapper renders the custom components if Layout is given as DefaultLayout", () => {
        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        // const customHeaderContent = "customHeaderContent";
        // const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        renderWithRefineContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Sider: CustomSider,
            // Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
        });

        expect(screen.getByText(customSiderContent));
        // expect(screen.getByText(customHeaderContent));
        expect(screen.getByText(customFooterContent));
        expect(screen.getByText(customOffLayoutAreaContent));
    });

    test("LayoutWrapper renders custom components if given custom Layout renders them", () => {
        const CustomLayout: React.FC<LayoutProps> = ({
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

        const { getByText } = renderWithRefineContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Layout: CustomLayout,
            Sider: CustomSider,
            Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
        });

        expect(getByText(customSiderContent));
        expect(getByText(customHeaderContent));
        expect(getByText(customFooterContent));
        expect(getByText(customOffLayoutAreaContent));
    });

    test("LayoutWrapper renders custom title if given default Sider", () => {
        const customTitleContent = "customTitleContent";
        const CustomTitle = () => <p>{customTitleContent}</p>;

        const { getByText } = renderWithRefineContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Title: CustomTitle,
        });

        expect(getByText(customTitleContent));
    });

    it("LayoutWrapper renders custom layout, sider, header, footer, title, offLayoutArea if given props", () => {
        const customTitleContent = "customTitleContent";
        const CustomTitle = () => <p>{customTitleContent}</p>;

        const CustomLayout: React.FC<LayoutProps> = ({
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
                <div>custom layout</div>
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

        const { getByText } = renderWithRefineContext(
            <LayoutWrapper
                Layout={CustomLayout}
                Title={CustomTitle}
                Sider={CustomSider}
                Header={CustomHeader}
                Footer={CustomFooter}
                OffLayoutArea={CustomOffLayoutArea}
            />,
            {
                warnWhenUnsavedChanges: false,
                mutationMode: "pessimistic",
                syncWithLocation: false,
                undoableTimeout: 5000,
                hasDashboard: false,
            },
        );

        expect(getByText(customSiderContent));
        expect(getByText(customHeaderContent));
        expect(getByText(customFooterContent));
        expect(getByText(customOffLayoutAreaContent));
        expect(getByText("custom layout"));
    });
});
