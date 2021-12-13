import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useDelete } from "./useDelete";

describe("useDelete Hook", () => {
    it("should works with pessimistic update", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useDelete(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            id: "1",
            resource: "posts",
            mutationMode: "pessimistic",
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
            () => useDelete(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            id: "1",
            resource: "posts",
            mutationMode: "optimistic",
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
            () => useDelete(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            id: "1",
            resource: "posts",
            mutationMode: "undoable",
            undoableTimeout: 0,
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
                () => useDelete(),
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
                id: "1",
                resource: "posts",
                mutationMode: "pessimistic",
            });
            await waitForNextUpdate();

            await waitFor(() => {
                return result.current.isSuccess;
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "deleted",
                payload: {
                    ids: ["1"],
                },
            });
        });
    });
});
