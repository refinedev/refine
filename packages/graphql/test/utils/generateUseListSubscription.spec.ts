import {
    CrudFilters,
    CrudSorting,
    MetaQuery,
    Pagination,
} from "@refinedev/core";
import { generateUseListSubscription } from "../../src/utils";

describe("generateUseListSubscription", () => {
    const resource = "exampleResource";
    const meta: MetaQuery = {
        operation: "exampleOperation",
        fields: ["id", "name"],
    };
    const pagination: Pagination = { current: 1, pageSize: 10, mode: "server" };
    const sorters: CrudSorting = [{ field: "name", order: "asc" }];
    const filters: CrudFilters = [
        { field: "name", operator: "contains", value: "John" },
    ];

    it("should generate a subscription with the provided parameters", () => {
        const { query, variables, operation } = generateUseListSubscription({
            resource,
            meta,
            pagination,
            sorters,
            filters,
        });

        expect(operation).toEqual(meta.operation);

        expect(query).toContain(meta.operation);
        expect(query).toMatch(/id/);
        expect(query).toMatch(/name/);

        expect(variables).toEqual({
            sort: "name:asc",
            where: { name_contains: "John" },
            start: 0,
            limit: 10,
        });
    });

    it("should generate a subscription without pagination, sorters and filters", () => {
        const { query, variables, operation } = generateUseListSubscription({
            resource,
            meta,
        });

        expect(operation).toEqual(meta.operation);

        expect(query).toContain(meta.operation);
        expect(query).toMatch(/id/);
        expect(query).toMatch(/name/);

        expect(variables).toEqual({
            sort: undefined,
            where: {},
            start: 0,
            limit: 10,
        });
    });

    it("should generate a subscription without pagination when mode is client ", () => {
        const { variables } = generateUseListSubscription({
            resource,
            meta,
            pagination: { ...pagination, mode: "client" },
            sorters,
            filters,
        });

        expect(variables).toEqual({
            sort: "name:asc",
            where: { name_contains: "John" },
        });
    });

    it("should generate a subscription with resource when meta.operation is undefined", () => {
        const { query, operation } = generateUseListSubscription({
            resource: "example-resource",
            meta: { ...meta, operation: undefined },
            pagination,
            sorters,
            filters,
        });

        expect(operation).toEqual("exampleResource");
        expect(query).toContain("exampleResource");
    });
});
