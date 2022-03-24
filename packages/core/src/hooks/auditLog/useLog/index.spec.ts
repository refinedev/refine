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

        it("should called logEvent if include permissions", async () => {
            const { result, waitForNextUpdate } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { auditLog: { permissions: ["create"] } },
                        },
                    ],
                    auditLogProvider: {
                        log: logEventMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "create",
                resource: "posts",
                data: { id: 1, title: "title" },
            };

            log(logEventPayload);

            await waitForNextUpdate();

            expect(logEventMock).toBeCalledWith(logEventPayload);
            expect(logEventMock).toBeCalledTimes(1);
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
                        log: logEventMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
            };

            log(logEventPayload);

            expect(logEventMock).not.toBeCalled();
        });

        it("should not called logEvent if no exist auditLogPermissions", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    auditLogProvider: {
                        log: logEventMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
            };

            log(logEventPayload);

            expect(logEventMock).not.toBeCalled();
        });

        it("should called logEvent every action if permisson is `*`", async () => {
            const { result, waitForNextUpdate } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { auditLog: { permissions: ["*"] } },
                        },
                    ],
                    auditLogProvider: {
                        log: logEventMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
            };

            log(logEventPayload);

            await waitForNextUpdate();

            expect(logEventMock).toBeCalledWith(logEventPayload);
            expect(logEventMock).toBeCalledTimes(1);

            const logEventPayload2: LogParams = {
                action: "createMany",
                resource: "posts",
                data: { id: 2, title: "title2" },
            };

            log(logEventPayload2);

            await waitForNextUpdate();

            expect(logEventMock).toBeCalledWith(logEventPayload2);
            expect(logEventMock).toBeCalledTimes(2);
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
                        log: logEventMock,
                    },
                }),
            });

            const { log } = result.current;

            const logEventPayload: LogParams = {
                action: "update",
                resource: "posts",
                data: { id: 1, title: "title" },
            };

            log(logEventPayload);

            expect(logEventMock).not.toBeCalled();
        });
    });

    describe("rename mutation", () => {
        it("succeed rename", async () => {
            const { result, waitForNextUpdate } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    auditLogProvider: {
                        rename: logRenameMock,
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

    describe("isConfigured", () => {
        it("should be false when auditlogProvider not defined", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({}),
            });

            const { isConfigured } = result.current!;

            expect(isConfigured).toBeFalsy();
        });

        it("should be true when auditlogProvider defined", async () => {
            const { result } = renderHook(() => useLog(), {
                wrapper: TestWrapper({
                    auditLogProvider: {
                        log: jest.fn(),
                    },
                }),
            });

            const { isConfigured } = result.current!;

            expect(isConfigured).toBeTruthy();
        });
    });
});
