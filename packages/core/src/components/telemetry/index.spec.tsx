import React from "react";
import { render, TestWrapper } from "@test";
import * as UseTelemetryData from "../../hooks/useTelemetryData";

import { Telemetry } from "./index";

describe("Telemetry", () => {
  const originalImage = global.Image;
  const originalFetch = global.fetch;

  const imageMock = jest.fn();
  global.Image = imageMock;

  const fetchMock = jest.fn();
  global.fetch = fetchMock;

  beforeEach(() => {
    global.Image = imageMock;
    global.fetch = fetchMock;

    jest.spyOn(UseTelemetryData, "useTelemetryData").mockReturnValue({
      providers: {},
      version: "1",
      resourceCount: 1,
    });
  });

  afterEach(() => {
    imageMock.mockClear();
    fetchMock.mockClear();
  });

  afterAll(() => {
    global.Image = originalImage;
    global.fetch = originalFetch;
  });

  it("should not crash", async () => {
    const { container } = render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(container).toBeTruthy();

    expect(imageMock).toBeCalledTimes(1);
    expect(fetchMock).not.toBeCalled();
  });

  it("should encode payload", async () => {
    const imageMockInstance = {} as any;

    imageMock.mockImplementation(() => imageMockInstance);

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).toBeCalledTimes(1);
    expect(fetchMock).not.toBeCalled();

    expect(imageMockInstance.src).toBe(
      "https://telemetry.refine.dev/telemetry?payload=eyJwcm92aWRlcnMiOnt9LCJ2ZXJzaW9uIjoiMSIsInJlc291cmNlQ291bnQiOjF9",
    );
  });

  it("should use fetch when image is undefined", async () => {
    global.Image = undefined as any;

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).not.toBeCalled();
    expect(fetchMock).toBeCalledTimes(1);
  });

  it("should encode payload when using fetch", async () => {
    global.Image = undefined as any;

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).not.toBeCalled();
    expect(fetchMock).toBeCalledTimes(1);

    expect(fetchMock).toBeCalledWith(
      "https://telemetry.refine.dev/telemetry?payload=eyJwcm92aWRlcnMiOnt9LCJ2ZXJzaW9uIjoiMSIsInJlc291cmNlQ291bnQiOjF9",
    );
  });

  it("should not call endpoints if encoding fails", async () => {
    const originalBtoa = global.btoa;

    global.btoa = () => {
      throw new Error("error");
    };

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).not.toBeCalled();
    expect(fetchMock).not.toBeCalled();

    global.btoa = originalBtoa;
  });
});
