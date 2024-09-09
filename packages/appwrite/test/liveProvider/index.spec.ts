import type { Client as Appwrite } from "appwrite";
import { liveProvider } from "../../src";

const mockClient: Appwrite = {
  subscribe: jest.fn(() => jest.fn()),
} as unknown as Appwrite;

const testDate = new Date().getTime();

describe("liveProvider", () => {
  it("calls appwriteClient.subscribe with correct channel", () => {
    const provider = liveProvider(mockClient);
    const dummyCallback = () => undefined;

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
    });

    expect(mockClient.subscribe).toHaveBeenCalledWith(
      "databases.default.collections.blog_posts.documents",
      expect.any(Function),
    );
  });

  it("calls appwriteClient.subscribe with correct channel when specific ids given", () => {
    const provider = liveProvider(mockClient);
    const dummyCallback = () => undefined;

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
      params: {
        ids: ["a", "b"],
      },
    });

    expect(mockClient.subscribe).toHaveBeenCalledWith(
      [
        "databases.default.collections.blog_posts.documents.a",
        "databases.default.collections.blog_posts.documents.b",
      ],
      expect.any(Function),
    );
  });

  it("calls appwriteClient.subscribe with correct channel when specific ids given", () => {
    jest.useFakeTimers();

    const mockClientWithEvent: Appwrite = {
      subscribe: jest.fn((channel, cb) => {
        setImmediate(() => {
          cb({
            events: ["database.documents.create"],
            timestamp: testDate / 1000,
            payload: "test",
          });
        });
      }),
    } as unknown as Appwrite;

    const provider = liveProvider(mockClientWithEvent);
    const dummyCallback = jest.fn();

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
      params: {
        ids: ["a", "b"],
      },
    });

    jest.runAllTimers();

    expect(dummyCallback).toHaveBeenCalledWith({
      type: "created",
      channel: "resources/blog_posts",
      date: new Date(testDate),
      payload: "test",
    });

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("runs given function to unsubscribe", () => {
    const provider = liveProvider(mockClient);
    const dummyCallback = jest.fn();

    const unsubscribeFunction = jest.fn();

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
      params: {
        ids: ["a", "b"],
      },
    });

    provider?.unsubscribe(unsubscribeFunction);

    expect(unsubscribeFunction).toHaveBeenCalled();
  });
});
