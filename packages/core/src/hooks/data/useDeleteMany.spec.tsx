import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useDeleteMany } from "./useDeleteMany";

describe("useDeleteMany Hook", () => {
    it("should works with pessimistic update", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useDeleteMany(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            ids: ["1"],
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
            () => useDeleteMany(),
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
            ids: ["1"],
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
            () => useDeleteMany(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            mutationMode: "undoable",
            undoableTimeout: 0,
            ids: ["1"],
        });
        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });
});
