import React from "react";
import { renderHook } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";

import { TestWrapper, ITestWrapperProps } from "@test";
import { useBreadcrumb } from ".";

const renderWrapper = (
    wrapperProps: ITestWrapperProps = {},
    hasAction?: boolean,
) => {
    const Wrapper = TestWrapper(wrapperProps);

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
        children,
    }) => (
        <Wrapper>
            <Routes>
                <Route
                    path={hasAction ? "/:resource/:action" : "/:resource"}
                    element={children}
                />
            </Routes>
        </Wrapper>
    );

    return WrapperWith;
};

const DummyResourcePage = () => <div>resource page</div>;
const DummyIcon = <div>icon</div>;

describe("useBreadcrumb Hook", () => {
    it("Should only return `label` without `icon` and `href`", async () => {
        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: renderWrapper({
                resources: [{ name: "posts" }],
                routerInitialEntries: ["/posts"],
            }),
        });

        expect(result.current.breadcrumbs).toEqual([{ label: "Posts" }]);
    });

    it("Should return `label` and `icon` without `href`", async () => {
        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: renderWrapper({
                resources: [
                    {
                        name: "posts",
                        icon: DummyIcon,
                    },
                ],
                routerInitialEntries: ["/posts"],
            }),
        });

        expect(result.current.breadcrumbs).toEqual([
            { icon: <div>icon</div>, label: "Posts" },
        ]);
    });

    it("if resource has `list` resource page should successfully return `href`", async () => {
        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: renderWrapper({
                resources: [
                    {
                        name: "posts",
                        route: "posts",
                        list: DummyResourcePage,
                    },
                ],
                routerInitialEntries: ["/posts"],
            }),
        });

        expect(result.current.breadcrumbs).toEqual([
            { label: "Posts", href: "/posts" },
        ]);
    });

    it("if resource has custom `route` should shown with resource `label`", async () => {
        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: renderWrapper({
                resources: [
                    {
                        name: "posts",
                        label: "Hello",
                        route: "custom-route",
                    },
                ],
                routerInitialEntries: ["/custom-route"],
            }),
        });

        expect(result.current.breadcrumbs).toEqual([{ label: "Hello" }]);
    });

    it("if the user is on the resource action page, the action name should be last in the breadcrumbs", async () => {
        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: renderWrapper(
                {
                    resources: [
                        {
                            name: "posts",
                            route: "posts",
                            icon: DummyIcon,
                            list: DummyResourcePage,
                            create: DummyResourcePage,
                        },
                    ],
                    routerInitialEntries: ["/posts/create"],
                },
                true,
            ),
        });

        expect(result.current.breadcrumbs).toEqual([
            { icon: <div>icon</div>, label: "Posts", href: "/posts" },
            { label: "Create" },
        ]);
    });

    it("if resources has nested resources, `parentName` should come in breadcrumbs", async () => {
        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: renderWrapper(
                {
                    resources: [
                        {
                            name: "cms",
                        },
                        {
                            parentName: "cms",
                            name: "posts",
                            route: "cms/posts",
                            icon: DummyIcon,
                            list: DummyResourcePage,
                            create: DummyResourcePage,
                        },
                    ],
                    routerInitialEntries: ["/posts/create"],
                },
                true,
            ),
        });

        expect(result.current.breadcrumbs).toEqual([
            { label: "Cms" },
            { icon: <div>icon</div>, label: "Posts", href: "/cms/posts" },
            { label: "Create" },
        ]);
    });

    it("if resources has nested resources with custom `route`, `parentName` should come in breadcrumbs", async () => {
        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: renderWrapper(
                {
                    resources: [
                        {
                            name: "cms",
                        },
                        {
                            parentName: "cms",
                            name: "posts",
                            route: "custom-route",
                            icon: DummyIcon,
                            list: DummyResourcePage,
                            create: DummyResourcePage,
                        },
                    ],
                    routerInitialEntries: ["/posts/create"],
                },
                true,
            ),
        });

        expect(result.current.breadcrumbs).toEqual([
            { label: "Cms" },
            { icon: <div>icon</div>, label: "Posts", href: "/custom-route" },
            { label: "Create" },
        ]);
    });
});
