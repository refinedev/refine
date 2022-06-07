import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";
import { useLog } from ".";
import { LogParams } from "../../../interfaces";

const logEventMock = jest.fn();
const logRenameMock = jest.fn();

describe("useLog Hook", () => {
    describe("log callback", () => {
        beforeEach(() => {
            logEventMock.mockReset();
        });

        xit("should called logEvent if include permissions", async () => {
            const { result, waitForNextUpdate } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { auditLog: { permissions: ["create"] } },
                        },
                    ],
                    auditLogProvider: {
                        get: logEventMock,
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

            await waitForNextUpdate();

            expect(logEventMock).toBeCalledWith(logEventPayload);
            expect(logEventMock).toBeCalledTimes(1);
        });

        xit("should not called logEvent if no includes permissions", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { auditLog: { permissions: ["create"] } },
                        },
                    ],
                    auditLogProvider: {
                        get: logEventMock,
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

            expect(logEventMock).not.toBeCalled();
        });

        xit("should not called logEvent if no exist auditLogPermissions", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    auditLogProvider: {
                        get: logEventMock,
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

            expect(logEventMock).not.toBeCalled();
        });

        xit("should called logEvent every action if permisson is `*`", async () => {
            const { result, waitForNextUpdate } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { auditLog: { permissions: ["*"] } },
                        },
                    ],
                    auditLogProvider: {
                        get: logEventMock,
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

            await waitForNextUpdate();

            expect(logEventMock).toBeCalledWith(logEventPayload);
            expect(logEventMock).toBeCalledTimes(1);

            const logEventPayload2: LogParams = {
                action: "createMany",
                resource: "posts",
                data: { id: 2, title: "title2" },
                meta: { id: 1 },
            };

            log(logEventPayload2);

            await waitForNextUpdate();

            expect(logEventMock).toBeCalledWith(logEventPayload2);
            expect(logEventMock).toBeCalledTimes(2);
        });

        xit("should not called logEvent if resources no match", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "categories",
                            options: { auditLog: { permissions: ["update"] } },
                        },
                    ],
                    auditLogProvider: {
                        get: logEventMock,
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

            expect(logEventMock).not.toBeCalled();
        });
    });

    describe("rename mutation", () => {
        xit("succeed rename", async () => {
            const { result, waitForNextUpdate } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    auditLogProvider: {
                        update: logRenameMock,
                    },
                }),
            });

            const { rename } = result.current!;
            const { mutate } = rename;

            await mutate({ id: 1, name: "test name" });

            await waitForNextUpdate();

            expect(logRenameMock).toBeCalledWith({ id: 1, name: "test name" });
            expect(logRenameMock).toBeCalledTimes(1);
        });
    });
});
