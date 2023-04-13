import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useCustomMutation } from "./useCustomMutation";

describe("useCustomMutation Hook", () => {
    it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
        const customMock = jest.fn();

        const { result } = renderHook(() => useCustomMutation(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        custom: customMock,
                    },
                },
                routerProvider: mockRouterBindings({
                    params: { baz: "qux" },
                }),
                resources: [{ name: "posts", meta: { dip: "dop" } }],
            }),
        });

        result.current.mutate({
            method: "post",
            url: "/posts",
            values: {},
            meta: { foo: "bar" },
        });

        await waitFor(() => {
            expect(customMock).toBeCalled();
        });

        expect(customMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                }),
            }),
        );
    });
});
