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
        const { getByRole, debug } = render(
            <Notification notifications={mockNotification} />,
        );

        const icon = getByRole("alert");
        expect(
            icon.children[0].children[0].classList.contains(
                "ant-progress-circle",
            ),
        );
    });

    it("should click and render undo button successfuly", async () => {
        const { container, getByText } = render(
            <Notification notifications={mockNotification} />,
        );

        const button = container.querySelector("button");
        expect(button).toBeDefined();
        fireEvent.click(getByText("Undo"));
        expect(cancelMutation).toBeCalledTimes(1);

        getByText("Undo");
    });

    it("should call doMutation on seconds zero", async () => {
        mockNotification[0].seconds = 0;
        render(<Notification notifications={mockNotification} />);

        expect(doMutation).toBeCalledTimes(1);
    });
});
