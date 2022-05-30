import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { Route, Routes } from "react-router-dom";

import { TestWrapper } from "@test";

import { useBreadcrumb } from ".";

const dummyIcon = <div>icon</div>;
const DummyResourcePage = () => <div>resource page</div>;

describe("useBreadcrumb Hook", () => {
    it("Should only return `label` without `icon` and `to`", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "users",
                    route: "users",
                },
            ],
            routerInitialEntries: ["/users"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );

        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: WrapperWith,
        });

        expect(result.current.breadcrumbs).toEqual([{ label: "Users" }]);
    });

    it("Should return `label` and `icon` without `to`", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "users",
                    route: "users",
                    icon: dummyIcon,
                },
            ],
            routerInitialEntries: ["/users"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );

        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: WrapperWith,
        });

        expect(result.current.breadcrumbs).toEqual([
            { icon: <div>icon</div>, label: "Users" },
        ]);
    });

    it("if resource has `list` resource page should successfully return `to`", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "users",
                    route: "users",
                    list: DummyResourcePage,
                },
            ],
            routerInitialEntries: ["/users"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );

        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: WrapperWith,
        });

        expect(result.current.breadcrumbs).toEqual([
            { label: "Users", to: "/users" },
        ]);
    });

    it("if resource has custom `route` should shown with resource `label`", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "users",
                    label: "Hello",
                    route: "custom-route",
                },
            ],
            routerInitialEntries: ["/custom-route"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );

        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: WrapperWith,
        });

        expect(result.current.breadcrumbs).toEqual([{ label: "Hello" }]);
    });

    it("if the user is on the resource action page, the action name should be last in the breadcrumbs", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "users",
                    route: "users",
                    icon: dummyIcon,
                    list: DummyResourcePage,
                    create: DummyResourcePage,
                },
            ],
            routerInitialEntries: ["/users/create"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource/:action" element={children} />
                </Routes>
            </Wrapper>
        );

        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: WrapperWith,
        });

        expect(result.current.breadcrumbs).toEqual([
            { icon: <div>icon</div>, label: "Users", to: "/users" },
            { label: "Create" },
        ]);
    });

    it("if resources has nested resources, `parentName` should come in breadcrumbs", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "cms",
                },
                {
                    parentName: "cms",
                    name: "users",
                    route: "cms/users",
                    icon: dummyIcon,
                    list: DummyResourcePage,
                    create: DummyResourcePage,
                },
            ],
            routerInitialEntries: ["/users/create"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource/:action" element={children} />
                </Routes>
            </Wrapper>
        );

        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: WrapperWith,
        });

        expect(result.current.breadcrumbs).toEqual([
            { label: "Cms" },
            { icon: <div>icon</div>, label: "Users", to: "/cms/users" },
            { label: "Create" },
        ]);
    });

    it("if resources has nested resources with custom `route`, `parentName` should come in breadcrumbs", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "cms",
                },
                {
                    parentName: "cms",
                    name: "users",
                    route: "custom-route",
                    icon: dummyIcon,
                    list: DummyResourcePage,
                    create: DummyResourcePage,
                },
            ],
            routerInitialEntries: ["/users/create"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource/:action" element={children} />
                </Routes>
            </Wrapper>
        );

        const { result } = renderHook(() => useBreadcrumb(), {
            wrapper: WrapperWith,
        });

        expect(result.current.breadcrumbs).toEqual([
            { label: "Cms" },
            { icon: <div>icon</div>, label: "Users", to: "/custom-route" },
            { label: "Create" },
        ]);
    });
});
