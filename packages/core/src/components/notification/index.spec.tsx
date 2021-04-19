import React from "react";

import { render } from "@test";

import { Notification } from "./index";
import { userFriendlySecond } from "@definitions";

const mockNotification = [
    {
        id: "1",
        resource: "posts",
        cancelMutation: () => Promise.resolve(),
        seconds: 5000,
        isRunning: true,
    },
];

const mockSuccessNotification = [
    {
        id: "1",
        resource: "posts",
        cancelMutation: () => Promise.resolve(),
        seconds: 0,
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

    it("should render undo button successfuly", async () => {
        const { container, getByText } = render(
            <Notification notifications={mockNotification} />,
        );

        const button = container.querySelector("button");
        expect(button).toBeDefined();

        getByText("Undo");
    });

    it("should render Progress successfuly", async () => {
        const { getByRole } = render(
            <Notification notifications={mockNotification} />,
        );

        const icon = getByRole("alert");
        expect(
            icon.children[0].children[0].classList.contains(
                "ant-progress-circle",
            ),
        );
    });
});
