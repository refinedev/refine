import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";
import { useLogEvent } from "./";
import { AuditLogEvent } from "../../../interfaces";

const logEventhMock = jest.fn();

describe("useLogEvent Hook", () => {
    beforeEach(() => {
        logEventhMock.mockReset();
    });

    it("should called logEvent if include permissions", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts", auditLogPermissions: ["create"] }],
                auditLogProvider: {
                    logEvent: logEventhMock,
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

        expect(logEventhMock).toBeCalledWith(logEventPayload);
        expect(logEventhMock).toBeCalledTimes(1);
    });

    it("should not called logEvent if no includes permissions", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts", auditLogPermissions: ["create"] }],
                auditLogProvider: {
                    logEvent: logEventhMock,
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

        expect(logEventhMock).not.toBeCalled();
    });

    it("should not called logEvent if no exist auditLogPermissions", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                auditLogProvider: {
                    logEvent: logEventhMock,
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

        expect(logEventhMock).not.toBeCalled();
    });

    it("should called logEvent every action if permisson is `*`", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts", auditLogPermissions: ["*"] }],
                auditLogProvider: {
                    logEvent: logEventhMock,
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

        expect(logEventhMock).toBeCalledWith(logEventPayload);
        expect(logEventhMock).toBeCalledTimes(1);

        const logEventPayload2: AuditLogEvent = {
            action: "createMany",
            resource: "posts",
            data: { id: 2, title: "title2" },
        };

        logEvent(logEventPayload2);

        expect(logEventhMock).toBeCalledWith(logEventPayload2);
        expect(logEventhMock).toBeCalledTimes(2);
    });

    it("should not called logEvent if resources no match", async () => {
        const { result } = renderHook(() => useLogEvent(), {
            wrapper: TestWrapper({
                resources: [
                    { name: "categories", auditLogPermissions: ["update"] },
                ],
                auditLogProvider: {
                    logEvent: logEventhMock,
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

        expect(logEventhMock).not.toBeCalled();
    });
});
