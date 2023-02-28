import { getActionRoutesFromResource } from "../get-action-routes-from-resource";

describe("getActionRoutesFromResource", () => {
    it("should return empty array if no actions are found", () => {
        const result = getActionRoutesFromResource(
            {
                name: "users",
                meta: {},
            },
            [],
        );

        expect(result).toEqual([]);
    });

    it("should return the default routes for a given resource", () => {
        const result = getActionRoutesFromResource(
            {
                name: "users",
                meta: {},
                list: () => null,
                create: () => null,
                edit: () => null,
                show: () => null,
                clone: () => null,
            },
            [],
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    action: "list",
                    route: "/users",
                }),
                expect.objectContaining({
                    action: "create",
                    route: "/users/create",
                }),
                expect.objectContaining({
                    action: "edit",
                    route: "/users/edit/:id",
                }),
                expect.objectContaining({
                    action: "show",
                    route: "/users/show/:id",
                }),
                expect.objectContaining({
                    action: "clone",
                    route: "/users/clone/:id",
                }),
            ]),
        );
    });

    it("should return the default routes for a given resource with parent prefix [legacy]", () => {
        const result = getActionRoutesFromResource(
            {
                name: "users",
                meta: {
                    parent: "orgs",
                },
                edit: () => null,
            },
            [],
            true,
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    action: "edit",
                    route: "/orgs/users/edit/:id",
                }),
            ]),
        );
    });

    it("should return the default routes for a given resource without parent prefix", () => {
        const result = getActionRoutesFromResource(
            {
                name: "users",
                meta: {
                    parent: "orgs",
                },
                edit: () => null,
            },
            [],
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    action: "edit",
                    route: "/users/edit/:id",
                }),
            ]),
        );
    });

    it("should not include parent prefix if route is explicitly defined", () => {
        const result = getActionRoutesFromResource(
            {
                name: "users",
                meta: {
                    parent: "orgs",
                },
                edit: {
                    path: "edit/:id",
                    component: () => null,
                },
            },
            [],
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    action: "edit",
                    route: "/edit/:id",
                }),
            ]),
        );
    });

    it("should use deprecated route prop if legacy is set to true", () => {
        const result = getActionRoutesFromResource(
            {
                name: "users",
                parentName: "orgs",
                options: {
                    route: "custom-users",
                },
                list: () => null,
            },
            [],
            true,
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    action: "list",
                    route: "/orgs/custom-users",
                }),
            ]),
        );
    });

    it("should use the specific route instead of the default one with no component", () => {
        const result = getActionRoutesFromResource(
            {
                name: "users",
                meta: {},
                list: "/super-cool-nesting/users/list",
            },
            [],
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    action: "list",
                    route: "/super-cool-nesting/users/list",
                }),
            ]),
        );
    });
});
