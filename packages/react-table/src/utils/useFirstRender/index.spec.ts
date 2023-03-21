import { renderHook } from "@testing-library/react";

import { useFirstRender } from ".";

describe("useFirstRender hook", () => {
    it("should return true on first render", () => {
        const { result } = renderHook(() => useFirstRender());

        expect(result.current).toBe(true);
    });

    it("should return false on second render", () => {
        const { result, rerender } = renderHook(() => useFirstRender());

        rerender();

        expect(result.current).toBe(false);
    });

    it("should return false on multiple renders", () => {
        const { result, rerender } = renderHook(() => useFirstRender());

        rerender();
        rerender();
        rerender();

        expect(result.current).toBe(false);
    });
});
