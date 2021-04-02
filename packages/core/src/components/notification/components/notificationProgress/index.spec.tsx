import React from "react";
import { render } from "@test";

import { NotificationProgress } from "./";

const notificationDispatch = jest.fn();

const mockNotifications = {
    id: "1",
    resource: "posts",
    cancelMutation: () => Promise.resolve(),
    seconds: 5,
    isRunning: true,
};

jest.useFakeTimers();

describe("Cancel Notification", () => {
    it("should render cancel notification successfuly", () => {
        const { getByText } = render(
            <NotificationProgress
                dispatch={notificationDispatch}
                notificationItem={mockNotifications}
            />,
        );

        getByText(mockNotifications.seconds.toString());
        expect(notificationDispatch).not.toBeCalled();
    });

    it("should render cancel notification successfuly", () => {
        render(
            <NotificationProgress
                dispatch={notificationDispatch}
                notificationItem={mockNotifications}
            />,
        );

        jest.runAllTimers();

        expect(notificationDispatch).toBeCalled();
    });
});
