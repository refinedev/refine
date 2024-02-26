import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { usePublish } from "./";

const publishMock = jest.fn();
describe("usePublish Hook", () => {
  it("publish event", async () => {
    const { result } = renderHook(() => usePublish(), {
      wrapper: TestWrapper({
        liveProvider: {
          subscribe: () => jest.fn(),
          unsubscribe: () => jest.fn(),
          publish: publishMock,
        },
      }),
    });

    const publish = result.current;

    const publishPayload = {
      channel: "channel",
      date: new Date(),
      payload: { ids: ["1"] },
      type: "created",
    };
    publish?.(publishPayload);

    expect(publishMock).toBeCalledWith(publishPayload);
    expect(publishMock).toBeCalledTimes(1);
  });
});
