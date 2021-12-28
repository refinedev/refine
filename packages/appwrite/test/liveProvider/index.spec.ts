import { Appwrite } from "appwrite";
import { liveProvider } from "../../src";

const mockClient: Appwrite = {
    subscribe: jest.fn(() => jest.fn()),
} as unknown as Appwrite;

const testDate = new Date().getTime();

afterEach(() => {
    jest.useRealTimers();
});

describe("liveProvider", () => {
    it("calls appwriteClient.subscribe with correct channel", () => {
        const provider = liveProvider(mockClient);
        const dummyCallback = () => undefined;

        provider?.subscribe({
            channel: "resources/testChannel",
            types: ["*"],
            callback: dummyCallback,
        });

        expect(mockClient.subscribe).toHaveBeenCalledWith(
            "collections.testChannel.documents",
            expect.any(Function),
        );
    });

    it("calls appwriteClient.subscribe with correct channel when specific ids given", () => {
        const provider = liveProvider(mockClient);
        const dummyCallback = () => undefined;

        provider?.subscribe({
            channel: "resources/testChannel",
            types: ["*"],
            callback: dummyCallback,
            params: {
                ids: ["a", "b"],
            },
        });

        expect(mockClient.subscribe).toHaveBeenCalledWith(
            ["documents.a", "documents.b"],
            expect.any(Function),
        );
    });

    it("calls appwriteClient.subscribe with correct channel when specific ids given", () => {
        jest.useFakeTimers();

        const mockClientWithEvent: Appwrite = {
            subscribe: jest.fn((channel, cb) => {
                setImmediate(() => {
                    cb({
                        event: "database.documents.create",
                        timestamp: testDate / 1000,
                        payload: "test",
                    });
                });
            }),
        } as unknown as Appwrite;

        const provider = liveProvider(mockClientWithEvent);
        const dummyCallback = jest.fn();

        provider?.subscribe({
            channel: "resources/testChannel",
            types: ["*"],
            callback: dummyCallback,
            params: {
                ids: ["a", "b"],
            },
        });

        jest.runAllTimers();

        expect(dummyCallback).toHaveBeenCalledWith({
            type: "created",
            channel: "resources/testChannel",
            date: new Date(testDate),
            payload: "test",
        });
    });

    it("runs given function to unsubscribe", () => {
        const provider = liveProvider(mockClient);
        const dummyCallback = jest.fn();

        const unsubscribeFunction = jest.fn();

        provider?.subscribe({
            channel: "resources/testChannel",
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
