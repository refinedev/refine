import { handleNotification } from "@definitions";
import { notification } from "antd";

jest.mock("antd", () => ({
    notification: { open: jest.fn() },
}));

describe("handleNotification Helper", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call notification open when notification passed", async () => {
        const dummyNotification = {
            message: "test",
            description: "i am here!!",
        };
        handleNotification(dummyNotification);

        expect(notification.open).toHaveBeenCalledTimes(1);
        expect(notification.open).toHaveBeenCalledWith(dummyNotification);
    });

    it("should not call notification open when notification passed false", async () => {
        handleNotification(false);

        expect(notification.open).toHaveBeenCalledTimes(0);
    });

    it("should not call notification open when notification passed to false and passed a fallback notification", async () => {
        handleNotification(false, {
            message: "test",
        });

        expect(notification.open).toHaveBeenCalledTimes(0);
    });

    it("should work first notification when passed notification with fallback notification ", async () => {
        handleNotification(
            {
                message: "i am here!",
            },
            {
                message: "i am here too!",
            },
        );

        expect(notification.open).toHaveBeenCalledTimes(1);
        expect(notification.open).toHaveBeenCalledWith({
            message: "i am here!",
        });
    });

    it("should work fallback notification when not passed notification and passed fallback notification ", async () => {
        handleNotification(undefined, {
            message: "i am here too!",
        });

        expect(notification.open).toHaveBeenCalledTimes(1);
        expect(notification.open).toHaveBeenCalledWith({
            message: "i am here too!",
        });
    });
});
