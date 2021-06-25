import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useUpdateMany } from "./useUpdateMany";

describe("useUpdateMany Hook", () => {
    it("with rest json server", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useUpdateMany(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });
        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { status } = result.current;

        expect(status).toBe("success");
    });

    it("should works with pessimistic update", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useUpdateMany(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            mutationMode: "pessimistic",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });
        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should works with optimistic update", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useUpdateMany(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            mutationMode: "optimistic",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });
        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should works with undoable update", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useUpdateMany(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            ids: ["1", "2"],
            resource: "posts",
            mutationMode: "undoable",
            undoableTimeout: 0,
            values: { id: "1", title: "test" },
        });
        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });
});
