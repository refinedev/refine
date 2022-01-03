import { renderHook } from "@testing-library/react-hooks";
import { TestWrapper } from "@test";

import { useHandleNotification } from "./";

describe("useHandleNotification Hook", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const openMock = jest.fn();
    const closeMock = jest.fn();

    const { result } = renderHook(() => useHandleNotification(), {
        wrapper: TestWrapper({
            notificationProvider: {
                open: openMock,
                close: closeMock,
            },
        }),
    });

    it("should call notification open when notification passed", async () => {
        const dummyNotification = {
            message: "test",
            description: "i am here!!",
        };
        result.current(dummyNotification);

        expect(openMock).toHaveBeenCalledTimes(1);
        expect(openMock).toHaveBeenCalledWith(dummyNotification);
    });

    it("should not call notification open when notification passed false", async () => {
        result.current(false);

        expect(openMock).toHaveBeenCalledTimes(0);
    });

    it("should not call notification open when notification passed to false and passed a fallback notification", async () => {
        result.current(false, {
            message: "test",
        });

        expect(openMock).toHaveBeenCalledTimes(0);
    });

    it("should work first notification when passed notification with fallback notification ", async () => {
        result.current(
            {
                message: "i am here!",
            },
            {
                message: "i am here too!",
            },
        );

        expect(openMock).toHaveBeenCalledTimes(1);
        expect(openMock).toHaveBeenCalledWith({
            message: "i am here!",
        });
    });

    it("should work fallback notification when not passed notification and passed fallback notification ", async () => {
        result.current(undefined, {
            message: "i am here too!",
        });

        expect(openMock).toHaveBeenCalledTimes(1);
        expect(openMock).toHaveBeenCalledWith({
            message: "i am here too!",
        });
    });
});
