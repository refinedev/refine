import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useUpdate } from "./useUpdate";

describe("useUpdate Hook", () => {
    it("should works with pessimistic update", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useUpdate(),
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
            id: "1",
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
            () => useUpdate(),
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
            id: "1",
            values: { id: "1", title: "optimistic test" },
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
            () => useUpdate(),
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
            id: "1",
            values: { id: "1", title: "undoable test" },
        });
        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    describe("usePublish", () => {
        it("publish live event on success", async () => {
            const onPublishMock = jest.fn();

            const { result, waitForNextUpdate, waitFor } = renderHook(
                () => useUpdate(),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: jest.fn(),
                            publish: onPublishMock,
                        },
                    }),
                },
            );

            result.current.mutate({
                resource: "posts",
                mutationMode: "undoable",
                undoableTimeout: 0,
                id: "1",
                values: { id: "1", title: "undoable test" },
            });
            await waitForNextUpdate();

            await waitFor(() => {
                return result.current.isSuccess;
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "updated",
                payload: {
                    ids: ["1"],
                },
            });
        });
    });
});
