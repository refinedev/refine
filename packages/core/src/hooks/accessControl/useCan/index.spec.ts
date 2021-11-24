import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useCan } from "./";

describe("useCan Hook", () => {
    it("can should return the true ", async () => {
        const { result, waitFor } = renderHook(
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
                                params.id === 1
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
            return result.current?.isFetched;
        });

        expect(result.current?.data?.can).toBeTruthy();
        expect(result.current?.data?.reason).toBe("Access granted");
    });

    it("can should return the false ", async () => {
        const { result, waitFor } = renderHook(
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
                                params.id === 1
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
            return result.current?.isFetched;
        });

        expect(result.current?.data?.can).toBeFalsy();
        expect(result.current?.data?.reason).toBe("Access Denied");
    });
});
