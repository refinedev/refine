import React from "react";

import { UndoableQueueContext } from "@contexts/undoableQueue";
import { TestWrapper, render } from "@test";

import { UndoableQueue } from ".";

const doMutation = jest.fn();
const cancelMutation = jest.fn();

const openMock = jest.fn();
const closeMock = jest.fn();

const notificationDispatch = jest.fn();

const mockNotification = {
  id: "1",
  resource: "posts",
  cancelMutation,
  doMutation,
  seconds: 5000,
  isRunning: true,
  isSilent: false,
};
describe("Cancel Notification", () => {
  it("should trigger notification open function", async () => {
    jest.useFakeTimers();

    render(
      <UndoableQueueContext.Provider
        value={{
          notificationDispatch,
          notifications: [mockNotification],
        }}
      >
        <UndoableQueue notification={mockNotification} />
      </UndoableQueueContext.Provider>,
      {
        wrapper: TestWrapper({
          notificationProvider: {
            open: openMock,
            close: closeMock,
          },
        }),
      },
    );

    expect(openMock).toBeCalledTimes(1);
    expect(openMock).toBeCalledWith({
      cancelMutation: cancelMutation,
      key: "1-posts-notification",
      message: "You have 5 seconds to undo",
      type: "progress",
      undoableTimeout: 5,
    });

    jest.runAllTimers();

    expect(notificationDispatch).toBeCalledTimes(1);
    expect(notificationDispatch).toBeCalledWith({
      payload: {
        id: "1",
        resource: "posts",
        seconds: 5000,
      },
      type: "DECREASE_NOTIFICATION_SECOND",
    });

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should call doMutation on seconds zero", async () => {
    mockNotification.seconds = 0;
    render(<UndoableQueue notification={mockNotification} />);

    expect(doMutation).toBeCalledTimes(1);
  });
});
