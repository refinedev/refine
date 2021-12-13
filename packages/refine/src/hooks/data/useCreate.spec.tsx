import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useCreate } from "./useCreate";

describe("useCreate Hook", () => {
    it("with rest json server", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useCreate(),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({ resource: "posts", values: { id: 1 } });

        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { status, data } = result.current;

        expect(status).toBe("success");
        expect(data?.data.slug).toBe("ut-ad-et");
    });

    describe("usePublish", () => {
        it("publish live event on success", async () => {
            const onPublishMock = jest.fn();

            const { result, waitForNextUpdate, waitFor } = renderHook(
                () => useCreate(),
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

            result.current.mutate({ resource: "posts", values: { id: 1 } });

            await waitForNextUpdate();

            await waitFor(() => {
                return result.current.isSuccess;
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "created",
                payload: {
                    ids: ["1"],
                },
            });
        });
    });
});
