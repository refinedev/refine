import { act, renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useUpdateMany } from "./useUpdateMany";

describe("useUpdateMany Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { status } = result.current;

        expect(status).toBe("success");
    });

    it("should works with pessimistic update", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            mutationMode: "pessimistic",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should works with optimistic update", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            mutationMode: "optimistic",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should works with undoable update", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            ids: ["1", "2"],
            resource: "posts",
            mutationMode: "undoable",
            undoableTimeout: 0,
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    describe("usePublish", () => {
        it("publish live event on success", async () => {
            const onPublishMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                    liveProvider: {
                        unsubscribe: jest.fn(),
                        subscribe: jest.fn(),
                        publish: onPublishMock,
                    },
                }),
            });

            result.current.mutate({
                resource: "posts",
                mutationMode: "undoable",
                undoableTimeout: 0,
                ids: ["1", "2"],
                values: { id: "1", title: "undoable test" },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "updated",
                payload: {
                    ids: ["1", "2"],
                },
            });
        });
    });
});
