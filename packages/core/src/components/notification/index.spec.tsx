import React from "react";

import { render, fireEvent } from "@test";

import { Notification } from "./index";
import { userFriendlySecond } from "@definitions";

const doMutation = jest.fn();
const cancelMutation = jest.fn();

const mockNotification = [
    {
        id: "1",
        resource: "posts",
        cancelMutation,
        doMutation,
        seconds: 5000,
        isRunning: true,
        isSilent: false,
    },
];

describe("Cancel Notification", () => {
    it("should render cancel notification successfuly", async () => {
        const { getByText } = render(
            <Notification notifications={mockNotification} />,
        );

        const formattedSeconds = userFriendlySecond(
            mockNotification[0].seconds,
        );

        getByText(`You have ${formattedSeconds} seconds to undo`);
    });

    it("should render Progress successfuly", async () => {
        const { getByRole } = render(
            <Notification notifications={mockNotification} />,
        );

        const icon = getByRole("alert");
        expect(
            icon.children[1].children[0].children[0].classList.contains(
                "ant-progress-circle",
            ),
        );
    });

    it("should click and render undo button successfuly", async () => {
        const { container } = render(
            <Notification notifications={mockNotification} />,
        );

        const button = container.querySelector("button");
        expect(button).toBeDefined();
        if (button) {
            fireEvent.click(button);
            expect(cancelMutation).toBeCalledTimes(1);
        }
    });

    it("should call doMutation on seconds zero", async () => {
        mockNotification[0].seconds = 0;
        render(<Notification notifications={mockNotification} />);

        expect(doMutation).toBeCalledTimes(1);
    });
});
