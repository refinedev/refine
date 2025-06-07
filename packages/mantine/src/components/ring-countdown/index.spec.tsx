import React from "react";

import { render, TestWrapper } from "@test";
import { RingCountdown } from ".";

describe("Ring Countdown", () => {
  it("should render undoableTimeout count successfuly", async () => {
    const { container } = render(<RingCountdown undoableTimeout={5} />, {
      wrapper: TestWrapper({}),
    });

    expect(
      container.getElementsByClassName("mantine-Text-root")[0].innerHTML,
    ).toBe("5");
  });
});
