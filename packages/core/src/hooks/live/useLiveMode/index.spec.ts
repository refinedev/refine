import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useLiveMode } from "./";

describe("useLiveMode Hook", () => {
    it("context: auto, params: off -> returns off", async () => {
        const { result } = renderHook(() => useLiveMode("off"), {
            wrapper: TestWrapper({
                liveModeProvider: {
                    liveMode: "auto",
                },
            }),
        });

        expect(result.current).toBe("off");
    });

    it("returns context value", async () => {
        const { result } = renderHook(() => useLiveMode(undefined), {
            wrapper: TestWrapper({
                liveModeProvider: {
                    liveMode: "auto",
                },
            }),
        });

        expect(result.current).toBe("auto");
    });
});
