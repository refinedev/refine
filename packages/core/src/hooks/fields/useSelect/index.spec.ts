import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper, act } from "@test";

import { useSelect } from "./";

describe("useSelect Hook", () => {
    it("default", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.queryResult?.isLoading;
        });

        const { selectProps } = result.current;
        const { options } = selectProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("defaultValue", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: ["1", "2", "3", "4"],
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.queryResult.isLoading;
        });

        const { selectProps } = result.current;
        const { options } = selectProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("defaultValue is not an array", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: "1",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.queryResult.isLoading;
        });

        const { selectProps } = result.current;
        const { options } = selectProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("should success data with resource with optionLabel and optionValue", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect<{ id: string; slug: string }>({
                    resource: "posts",
                    optionLabel: "slug",
                    optionValue: "id",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.queryResult.isSuccess;
        });

        const { selectProps } = result.current;
        const { options } = selectProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            { label: "ut-ad-et", value: "1" },
            { label: "consequatur-molestiae-rerum", value: "2" },
        ]);
    });

    it("should success data with resource with filters", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect<{ id: string; slug: string }>({
                    resource: "posts",
                    filters: [
                        {
                            field: "slug",
                            operator: "ncontains",
                            value: "test",
                        },
                    ],
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.queryResult.isSuccess;
        });

        const { selectProps } = result.current;
        const { options } = selectProps;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("onSearch", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.queryResult?.isLoading;
        });

        const { selectProps } = result.current;

        act(() => {
            selectProps!.onSearch!("1");
        });
    });
});
