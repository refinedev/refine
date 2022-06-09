import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

import { render, TestWrapper, ITestWrapperProps } from "@test";
import { Breadcrumb } from "./";

const renderBreadcrumb = (
    children: ReactNode,
    wrapperProps: ITestWrapperProps = {},
) => {
    return render(
        <Routes>
            <Route path="/:resource/:action" element={children} />
        </Routes>,
        {
            wrapper: TestWrapper(wrapperProps),
        },
    );
};

const DummyResourcePage = () => <div>Dummy</div>;
const DummyIcon = <div>Icon</div>;
const DummyDashboard = () => <div>Dashboard</div>;

describe("Breadcrumb", () => {
    it("should render successfuly", async () => {
        const { container } = renderBreadcrumb(<Breadcrumb />);

        expect(container).toBeTruthy();
    });

    it("should render breadcrumb items", async () => {
        const { getByText } = renderBreadcrumb(<Breadcrumb />, {
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/posts/create"],
        });

        getByText("Posts");
        getByText("Create");
    });

    it("should render breadcrumb items with link", async () => {
        const { container } = renderBreadcrumb(<Breadcrumb />, {
            resources: [{ name: "posts", list: DummyResourcePage }],
            routerInitialEntries: ["/posts/create"],
        });

        expect(container.querySelector("a")?.getAttribute("href")).toBe(
            "/posts",
        );
    });

    it("should render breadcrumb items with resource icon", async () => {
        const { getByText } = renderBreadcrumb(<Breadcrumb />, {
            resources: [{ name: "posts", icon: DummyIcon }],
            routerInitialEntries: ["/posts/create"],
        });

        getByText("Icon");
    });

    it("should render breadcrumb items without resource icon", async () => {
        const { queryByText } = renderBreadcrumb(<Breadcrumb hideIcons />, {
            resources: [{ name: "posts", icon: DummyIcon }],
            routerInitialEntries: ["/posts/create"],
        });

        expect(queryByText("Icon")).not.toBeInTheDocument();
    });

    it("should render home icon", async () => {
        const { container } = renderBreadcrumb(<Breadcrumb />, {
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/posts/create"],
            DashboardPage: DummyDashboard,
        });

        expect(container.querySelector("svg")).toBeTruthy();
    });

    it("should not render home icon with 'showhHome' props", async () => {
        const { container } = renderBreadcrumb(
            <Breadcrumb showHome={false} />,
            {
                resources: [{ name: "posts" }],
                routerInitialEntries: ["/posts/create"],
                DashboardPage: DummyDashboard,
            },
        );

        expect(container.querySelector("svg")).toBeFalsy();
    });
});
