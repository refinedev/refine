import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";
import { useLogEvent } from "./";
import { AuditLogEvent } from "../../../interfaces";

const logEventMock = jest.fn();
const logListMock = jest.fn();

describe("useLogEvent Hook", () => {
    beforeEach(() => {
        logEventMock.mockReset();
    });

    it("should called logEvent if include permissions", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        options: { auditLogPermissions: ["create"] },
                    },
                ],
                auditLogProvider: {
                    logEvent: logEventMock,
                    list: logListMock,
                },
            }),
        });

        const logEvent = result.current;

        const logEventPayload: AuditLogEvent = {
            action: "create",
            resource: "posts",
            data: { id: 1, title: "title" },
        };

        logEvent(logEventPayload);

        await waitForNextUpdate();

        expect(logEventMock).toBeCalledWith(logEventPayload);
        expect(logEventMock).toBeCalledTimes(1);
    });

    it("should not called logEvent if no includes permissions", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        options: { auditLogPermissions: ["create"] },
                    },
                ],
                auditLogProvider: {
                    logEvent: logEventMock,
                    list: logListMock,
                },
            }),
        });

        const logEvent = result.current;

        const logEventPayload: AuditLogEvent = {
            action: "update",
            resource: "posts",
            data: { id: 1, title: "title" },
        };

        logEvent(logEventPayload);

        expect(logEventMock).not.toBeCalled();
    });

    it("should not called logEvent if no exist auditLogPermissions", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                auditLogProvider: {
                    logEvent: logEventMock,
                    list: logListMock,
                },
            }),
        });

        const logEvent = result.current;

        const logEventPayload: AuditLogEvent = {
            action: "update",
            resource: "posts",
            data: { id: 1, title: "title" },
        };

        logEvent(logEventPayload);

        expect(logEventMock).not.toBeCalled();
    });

    it("should called logEvent every action if permisson is `*`", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [
                    { name: "posts", options: { auditLogPermissions: ["*"] } },
                ],
                auditLogProvider: {
                    logEvent: logEventMock,
                    list: logListMock,
                },
            }),
        });

        const logEvent = result.current;

        const logEventPayload: AuditLogEvent = {
            action: "update",
            resource: "posts",
            data: { id: 1, title: "title" },
        };

        logEvent(logEventPayload);

        await waitForNextUpdate();

        expect(logEventMock).toBeCalledWith(logEventPayload);
        expect(logEventMock).toBeCalledTimes(1);

        const logEventPayload2: AuditLogEvent = {
            action: "createMany",
            resource: "posts",
            data: { id: 2, title: "title2" },
        };

        logEvent(logEventPayload2);

        await waitForNextUpdate();

        expect(logEventMock).toBeCalledWith(logEventPayload2);
        expect(logEventMock).toBeCalledTimes(2);
    });

    it("should not called logEvent if resources no match", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "categories",
                        options: { auditLogPermissions: ["update"] },
                    },
                ],
                auditLogProvider: {
                    logEvent: logEventMock,
                    list: logListMock,
                },
            }),
        });

        const logEvent = result.current;

        const logEventPayload: AuditLogEvent = {
            action: "update",
            resource: "posts",
            data: { id: 1, title: "title" },
        };

        logEvent(logEventPayload);

        expect(logEventMock).not.toBeCalled();
    });
});
