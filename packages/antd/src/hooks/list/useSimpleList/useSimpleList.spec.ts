import { renderHook } from "@testing-library/react-hooks";

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
        const { result, waitFor } = renderHook(() => useSimpleList(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await waitFor(() => {
            return !result.current.listProps.loading;
        });

        const {
            listProps: { pagination, dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);
        expect(pagination).toEqual({
            ...defaultPagination,
            onChange: (pagination as any).onChange,
        });
    });

    it("with initial pagination parameters", async () => {
        const { result, waitFor } = renderHook(
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
            return !result.current.listProps.loading;
        });

        const {
            listProps: { pagination },
        } = result.current;

        expect(pagination).toEqual({
            ...customPagination,
            onChange: (pagination as any).onChange,
        });
    });

    it("with custom resource", async () => {
        const { result, waitFor } = renderHook(
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
            return !result.current.listProps.loading;
        });

        const {
            listProps: { dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);
    });
});
