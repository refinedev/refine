import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";
import { useLog } from ".";
import { LogParams } from "../../../interfaces";

const auditLogProviderCreateMock = jest.fn();
const auditLogProviderUpdateMock = jest.fn();
const auditLogProviderGetMock = jest.fn();

describe("useLog Hook", () => {
    beforeEach(() => {
        auditLogProviderCreateMock.mockReset();
        auditLogProviderUpdateMock.mockReset();
        auditLogProviderGetMock.mockReset();
    });

    describe("log callback", () => {
        it("should called logEvent if include permissions", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: {
                                auditLog: {
                                    permissions: ["*"],
                                },
                            },
                        },
                    ],
                    auditLogProvider: {
                        create: auditLogProviderCreateMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "create",
                resource: "posts",
                data: { id: 1, title: "title" },
                meta: {
                    id: 1,
                },
            };

            log(logEventPayload);

            expect(auditLogProviderCreateMock).toBeCalledWith(logEventPayload);
            expect(auditLogProviderCreateMock).toBeCalledTimes(1);
        });

        it("should not called logEvent if no includes permissions", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { auditLog: { permissions: ["create"] } },
                        },
                    ],
                    auditLogProvider: {
                        get: auditLogProviderGetMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
                meta: {
                    id: 1,
                },
            };

            log(logEventPayload);

            expect(auditLogProviderGetMock).not.toBeCalled();
        });

        it("should not called logEvent if no exist auditLogPermissions", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    auditLogProvider: {
                        get: auditLogProviderGetMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
                meta: {
                    id: 1,
                },
            };

            log(logEventPayload);

            expect(auditLogProviderGetMock).not.toBeCalled();
        });

        it("should called logEvent every action if permisson is `*`", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { auditLog: { permissions: ["*"] } },
                        },
                    ],
                    auditLogProvider: {
                        create: auditLogProviderGetMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
                meta: { id: 1 },
            };

            log(logEventPayload);

            expect(auditLogProviderGetMock).toBeCalledWith(logEventPayload);
            expect(auditLogProviderGetMock).toBeCalledTimes(1);

            const logEventPayload2: LogParams = {
                action: "createMany",
                resource: "posts",
                data: { id: 2, title: "title2" },
                meta: { id: 1 },
            };

            log(logEventPayload2);

            expect(auditLogProviderGetMock).toBeCalledWith(logEventPayload2);
            expect(auditLogProviderGetMock).toBeCalledTimes(2);
        });

        it("should not called logEvent if resources no match", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "categories",
                            options: { auditLog: { permissions: ["update"] } },
                        },
                    ],
                    auditLogProvider: {
                        create: auditLogProviderCreateMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
                meta: { id: 1 },
            };

            log(logEventPayload);

            expect(auditLogProviderCreateMock).not.toBeCalled();
        });
    });

    describe("rename mutation", () => {
        it("succeed rename", async () => {
            const { result, waitForNextUpdate } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    auditLogProvider: {
                        update: auditLogProviderUpdateMock,
                    },
                }),
            });
            const { rename } = result.current;
            const { mutate } = rename;

            mutate({ id: 1, name: "test name" });

            await waitForNextUpdate();

            expect(auditLogProviderUpdateMock).toBeCalledWith({
                id: 1,
                name: "test name",
            });
            expect(auditLogProviderUpdateMock).toBeCalledTimes(1);
        });
    });
});
