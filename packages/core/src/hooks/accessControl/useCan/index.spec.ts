import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useCan } from "./";

describe("useCan Hook", () => {
    it("can should return the true ", async () => {
        const { result } = renderHook(
            () =>
                useCan({
                    action: "list",
                    resource: "posts",
                    params: { id: 1 },
                }),
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: ({ resource, action, params }) => {
                            if (
                                action === "list" &&
                                resource === "posts" &&
                                params?.id === 1
                            ) {
                                return Promise.resolve({
                                    can: true,
                                    reason: "Access granted",
                                });
                            }
                            return Promise.resolve({ can: false });
                        },
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current?.isFetched).toBeTruthy();
        });

        expect(result.current?.data?.can).toBeTruthy();
        expect(result.current?.data?.reason).toBe("Access granted");
    });

    it("can should return the false ", async () => {
        const { result } = renderHook(
            () =>
                useCan({
                    action: "list",
                    resource: "posts",
                    params: { id: 10 },
                }),
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: ({ resource, action, params }) => {
                            if (
                                action === "list" &&
                                resource === "posts" &&
                                params?.id === 1
                            ) {
                                return Promise.resolve({
                                    can: true,
                                    reason: "Access granted",
                                });
                            }
                            return Promise.resolve({
                                can: false,
                                reason: "Access Denied",
                            });
                        },
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current?.isFetched).toBeTruthy();
        });

        expect(result.current?.data?.can).toBeFalsy();
        expect(result.current?.data?.reason).toBe("Access Denied");
    });

    it("can should sanitize resource icon ", async () => {
        const mockFn = jest.fn();
        renderHook(
            () =>
                useCan({
                    action: "list",
                    resource: "posts",
                    params: { id: 1, resource: { icon: "test" } as any },
                }),
            {
                wrapper: TestWrapper({
                    accessControlProvider: {
                        can: mockFn,
                    },
                }),
            },
        );

        expect(mockFn).toBeCalledWith({
            action: "list",
            params: {
                id: 1,
            },
            resource: "posts",
        });
    });
});
