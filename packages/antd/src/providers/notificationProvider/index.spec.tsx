import React from "react";
import { OpenNotificationParams } from "@refinedev/core";
import { notification } from "antd";
import { UndoableNotification } from "@components/undoableNotification";

import { notificationProvider } from ".";

const mockNotification: OpenNotificationParams = {
    key: "test-notification",
    message: "Test Notification Message",
    type: "success",
};

const cancelMutation = jest.fn();

describe("Antd notificationProvider", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const notificationOpenSpy = jest.spyOn(notification, "open");
    const notificationCloseSpy = jest.spyOn(notification, "destroy");

    it("should render notification type succes notification", async () => {
        notificationProvider.open?.(mockNotification);

        expect(notificationOpenSpy).toBeCalledTimes(1);
        expect(notificationOpenSpy).toBeCalledWith({
            ...mockNotification,
            message: null,
            description: mockNotification.message,
        });
    });

    it("should render notification type error notification", async () => {
        notificationProvider.open?.({
            ...mockNotification,
            type: "error",
        });

        expect(notificationOpenSpy).toBeCalledTimes(1);
        expect(notificationOpenSpy).toBeCalledWith({
            ...mockNotification,
            message: null,
            description: mockNotification.message,
            type: "error",
        });
    });

    it("should render notification with description", async () => {
        notificationProvider.open?.({
            ...mockNotification,
            description: "Notification Description",
        });

        expect(notificationOpenSpy).toBeCalledTimes(1);
        expect(notificationOpenSpy).toBeCalledWith({
            ...mockNotification,
            message: "Notification Description",
            description: "Test Notification Message",
        });
    });

    it("should render notification type error notification", async () => {
        notificationProvider.open?.({
            ...mockNotification,
            type: "progress",
            cancelMutation,
            undoableTimeout: 5,
        });

        expect(notificationOpenSpy).toBeCalledTimes(1);
        expect(notificationOpenSpy).toBeCalledWith({
            key: "test-notification",
            message: null,
            closeIcon: <React.Fragment />,
            description: (
                <UndoableNotification
                    message="Test Notification Message"
                    notificationKey="test-notification"
                    cancelMutation={cancelMutation}
                    undoableTimeout={5}
                />
            ),
            duration: 0,
        });
    });

    it("should close notification", async () => {
        notificationProvider.close?.("notification-key");

        expect(notificationCloseSpy).toBeCalledTimes(1);
        expect(notificationCloseSpy).toBeCalledWith("notification-key");
    });
});
