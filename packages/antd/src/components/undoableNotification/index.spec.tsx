import React from "react";

import { fireEvent, render } from "@test";

import { UndoableNotification, type UndoableNotificationProps } from ".";

const cancelMutation = jest.fn();

const mockNotification: UndoableNotificationProps = {
  notificationKey: "notificationKey",
  message: "Test Notification Message",
  undoableTimeout: 3,
  cancelMutation,
};

describe("Cancel Notification", () => {
  it("should render undo notification message successfuly", async () => {
    const { getByText } = render(
      <UndoableNotification {...mockNotification} />,
    );

    getByText("Test Notification Message");
  });

  it("should click and render undo button successfuly", async () => {
    const { container } = render(
      <UndoableNotification {...mockNotification} />,
    );

    const button = container.querySelector("button");
    expect(button).toBeDefined();
    if (button) {
      fireEvent.click(button);
      expect(cancelMutation).toBeCalledTimes(1);
    }
  });

  it("should render Progress successfuly", async () => {
    const { container } = render(
      <UndoableNotification {...mockNotification} />,
    );

    expect(
      container.getElementsByClassName("ant-progress-circle").length,
    ).toBeDefined();
  });
});
