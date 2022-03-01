import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useLiveMode } from "./";
import { IRefineContextProvider } from "../../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    syncWithLocation: false,
    undoableTimeout: 500,
};

describe("useLiveMode Hook", () => {
    it("context: auto, params: off -> returns off", async () => {
        const { result } = renderHook(() => useLiveMode("off"), {
            wrapper: TestWrapper({
                refineProvider: {
                    ...mockRefineProvider,
                    liveMode: "auto",
                },
            }),
        });

        expect(result.current).toBe("off");
    });

    it("returns context value", async () => {
        const { result } = renderHook(() => useLiveMode(undefined), {
            wrapper: TestWrapper({
                refineProvider: {
                    ...mockRefineProvider,
                    liveMode: "auto",
                },
            }),
        });

        expect(result.current).toBe("auto");
    });
});
