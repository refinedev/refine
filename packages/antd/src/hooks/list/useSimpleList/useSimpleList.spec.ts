import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useSimpleList } from "./useSimpleList";

const defaultPagination = {
    pageSize: 10,
    current: 1,
    total: 2,
};

const customPagination = {
    current: 2,
    defaultCurrent: 2,
    defaultPageSize: 1,
    pageSize: 1,
    total: 2,
};

describe("useSimpleList Hook", () => {
    it("default", async () => {
        const { result } = renderHook(() => useSimpleList(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await waitFor(() => {
            expect(!result.current.listProps.loading).toBeTruthy();
        });

        const {
            listProps: { pagination, dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);
        expect(pagination).toEqual({
            ...defaultPagination,
            onChange: (pagination as any).onChange,
            itemRender: (pagination as any).itemRender,
            simple: true,
        });
    });

    it("with initial pagination parameters", async () => {
        const { result } = renderHook(
            () =>
                useSimpleList({
                    pagination: customPagination,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(!result.current.listProps.loading).toBeTruthy();
        });

        const {
            listProps: { pagination },
        } = result.current;

        expect(pagination).toEqual({
            ...customPagination,
            onChange: (pagination as any).onChange,
            itemRender: (pagination as any).itemRender,
            simple: true,
        });
    });

    it("with disabled pagination", async () => {
        const { result } = renderHook(
            () =>
                useSimpleList({
                    hasPagination: false,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            expect(!result.current.listProps.loading).toBeTruthy();
        });

        const {
            listProps: { pagination },
        } = result.current;

        expect(pagination).toBe(false);
    });

    it("with custom resource", async () => {
        const { result } = renderHook(
            () =>
                useSimpleList({
                    resource: "categories",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }, { name: "categories" }],
                }),
            },
        );

        await waitFor(() => {
            expect(!result.current.listProps.loading).toBeTruthy();
        });

        const {
            listProps: { dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);
    });
});
