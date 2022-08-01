import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act } from "@test";

import { useFileUploadState } from "./index";

describe("useFileUploadState Hook", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it("isLoading false", async () => {
        const { result } = renderHook(() => useFileUploadState(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        const { isLoading } = result.current;

        expect(isLoading).toEqual(false);
    });

    it("onChange and isLoading true", async () => {
        const { result } = renderHook(() => useFileUploadState(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        act(() => {
            result.current.onChange({
                file: {
                    uid: "1",
                    name: "aa",
                },
                fileList: [
                    {
                        uid: "1",
                        name: "test",
                        status: "uploading",
                    },
                ],
            });
        });

        expect(result.current.isLoading).toEqual(true);
    });
});
