import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useMenu } from ".";
import { IResourceItem } from "src/interfaces";
import { routeGenerator } from "@definitions/helpers";
import React from "react";

const prepareResources = (items: IResourceItem[]): IResourceItem[] => {
    const resources: IResourceItem[] = [];
    items?.map((resource) => {
        resources.push({
            key: resource.key,
            name: resource.name,
            label: resource.options?.label,
            icon: resource.icon,
            route: resource.options?.route ?? routeGenerator(resource, items),
            canCreate: !!resource.create,
            canEdit: !!resource.edit,
            canShow: !!resource.show,
            canDelete: resource.canDelete,
            create: resource.create,
            show: resource.show,
            list: resource.list,
            edit: resource.edit,
            options: resource.options,
            parentName: resource.parentName,
        });
    });
    return resources;
};

describe("useMenu Hook", () => {
    it("should be empty by default", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({}),
        });

        expect(result.current.menuItems).toEqual([]);
    });

    it("should be ignore when list is undefined", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                    },
                    {
                        name: "CMS",
                        key: "CMS",
                    },
                    {
                        name: "Posts",
                        parentName: "CMS",
                    },
                ],
            }),
        });

        expect(result.current.menuItems).toEqual([]);
    });

    it("should contain one item with label `Posts`", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        key: "posts",
                        label: "Posts",
                        list: function list() {
                            return <div>render me!</div>;
                        },
                    },
                ],
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ label: "Posts" }),
            ]),
        );
    });

    it("should have the selectedKey = `/posts/create`", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                routerInitialEntries: ["/posts/create"],
            }),
        });

        expect(result.current.selectedKey).toEqual("/posts/create");
    });

    it("should have the defaultOpenKeys = [/CMS]", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                routerInitialEntries: ["/CMS/posts"],
                resources: prepareResources([
                    {
                        name: "CMS",
                    },
                    {
                        name: "posts",
                        parentName: "CMS",
                        route: "asdasd",
                    },
                    {
                        name: "categories",
                        parentName: "CMS",
                    },
                    {
                        name: "posts",
                        parentName: "categories",
                        options: {
                            label: "else-new",
                            route: "else-new",
                        },
                        canDelete: true,
                    },
                ]),
            }),
        });

        expect(result.current.defaultOpenKeys).toEqual(
            expect.arrayContaining(["/CMS"]),
        );
    });

    it("should have the defaultOpenKeys = [/CMS]", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                routerInitialEntries: ["/else-new"],
                resources: prepareResources([
                    {
                        name: "CMS",
                    },
                    {
                        name: "posts",
                        parentName: "CMS",
                        route: "asdasd",
                    },
                    {
                        name: "categories",
                        parentName: "CMS",
                    },
                    {
                        name: "posts",
                        parentName: "categories",
                        options: {
                            label: "else-new",
                            route: "else-new",
                        },
                        canDelete: true,
                    },
                ]),
            }),
        });

        expect(result.current.defaultOpenKeys).toEqual(
            expect.arrayContaining(["/CMS", "/CMS/categories"]),
        );
    });

    it("should tree view render all except hide true", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                resources: prepareResources([
                    {
                        name: "visible",
                        list: function list() {
                            return <div>render me!</div>;
                        },
                    },
                    {
                        name: "hidden",
                        options: {
                            hide: true,
                        },
                    },
                    {
                        name: "hidden-parent-menu",
                        options: {
                            hide: true,
                        },
                    },
                    {
                        name: "hidden-child",
                        parentName: "hidden-parent-menu",
                    },
                    {
                        name: "CMS",
                    },
                    {
                        name: "Shop-1",
                        parentName: "CMS",
                        options: {
                            hide: true,
                        },
                    },
                    {
                        name: "posts",
                        parentName: "Shop-1",
                    },
                    {
                        name: "categories",
                        parentName: "Shop-1",
                    },
                    {
                        name: "visible-item-2",
                        list: function list() {
                            return <div>render me!</div>;
                        },
                    },
                ]),
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "visible" }),
                expect.objectContaining({ name: "visible-item-2" }),
            ]),
        );

        expect(result.current.menuItems).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({ name: "hidden" }),
                expect.objectContaining({ name: "posts" }),
            ]),
        );
    });

    it("should hide all necessary resources with nested structure", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                resources: prepareResources([
                    {
                        name: "visible",
                        list: function list() {
                            return <div>render me!</div>;
                        },
                    },
                    {
                        name: "hidden-level-1",
                        options: {
                            hide: true,
                        },
                    },
                    {
                        name: "hidden-child-level-2",
                        parentName: "hidden-parent-menu",
                    },
                    {
                        name: "hidden-parent-level-1",
                        options: {
                            hide: true,
                        },
                    },
                    {
                        name: "Shop-1",
                        parentName: "CMS",
                    },
                    {
                        name: "posts",
                        parentName: "Shop-1",
                    },
                    {
                        name: "categories",
                        parentName: "Shop-1",
                    },
                    {
                        name: "CMS",
                        options: {
                            hide: true,
                        },
                    },
                    {
                        name: "visible-item-2",
                        list: function list() {
                            return <div>render me!</div>;
                        },
                    },
                ]),
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "visible" }),
                expect.objectContaining({ name: "visible-item-2" }),
            ]),
        );

        expect(result.current.menuItems).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({
                    name: "hidden",
                }),
                expect.objectContaining({
                    name: "Shop-1",
                }),
                expect.objectContaining({
                    name: "posts",
                }),
                expect.objectContaining({
                    name: "categories",
                }),
            ]),
        );
    });
});
