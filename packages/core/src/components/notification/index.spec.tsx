import React from "react";

import { render, TestWrapper } from "@test";

import { Notification } from "./index";

const doMutation = jest.fn();
const cancelMutation = jest.fn();

const openMock = jest.fn();
const closeMock = jest.fn();

const mockNotification = [
    {
        id: "1",
        resource: "posts",
        cancelMutation,
        doMutation,
        seconds: 5000,
        isRunning: true,
    },
];

describe("Cancel Notification", () => {
    it("should trigger notification open function", async () => {
        render(<Notification notifications={mockNotification} />, {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openMock,
                    close: closeMock,
                },
            }),
        });

        expect(openMock).toBeCalledWith({
            cancelMutation: cancelMutation,
            key: "1-posts-notification",
            message: "You have 5 seconds to undo",
            type: "progress",
            undoableTimeout: 5,
        });
    });

    it("should call doMutation on seconds zero", async () => {
        mockNotification[0].seconds = 0;
        render(<Notification notifications={mockNotification} />);

        expect(doMutation).toBeCalledTimes(1);
    });
});
