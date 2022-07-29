import { renderHook, waitFor } from "@testing-library/react";
import { TestWrapper } from "@test";

import { useLogList } from "./";

const auditLogProviderGetMock = jest.fn();

describe("useLogList Hook", () => {
    beforeEach(() => {
        auditLogProviderGetMock.mockReset();
    });

    it("useLogList should call the auditLogProvider's list method with same properties", async () => {
        const { result } = renderHook(
            () =>
                useLogList({
                    resource: "posts",
                    action: "list",
                    meta: { id: 1 },
                    metaData: { fields: ["id", "action", "data"] },
                }),
            {
                wrapper: TestWrapper({
                    auditLogProvider: {
                        get: auditLogProviderGetMock,
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isFetched).toBeTruthy();
        });

        expect(auditLogProviderGetMock).toBeCalledWith({
            resource: "posts",
            action: "list",
            meta: { id: 1 },
            metaData: { fields: ["id", "action", "data"] },
        });
    });

    it("useLogList should return data with 'posts' resource", async () => {
        const { result } = renderHook(() => useLogList({ resource: "posts" }), {
            wrapper: TestWrapper({
                auditLogProvider: {
                    get: ({ resource }) => {
                        if (resource === "posts") {
                            return Promise.resolve([
                                {
                                    id: 1,
                                    action: "create",
                                    data: { id: 1, title: "title" },
                                },
                            ]);
                        }
                        return Promise.resolve([]);
                    },
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isFetched).toBeTruthy();
        });

        expect(result.current?.data).toStrictEqual([
            {
                id: 1,
                action: "create",
                data: { id: 1, title: "title" },
            },
        ]);
    });
});
