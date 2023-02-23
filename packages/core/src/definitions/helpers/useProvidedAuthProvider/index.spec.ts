import { TestWrapper } from "@test/index";
import { renderHook } from "@testing-library/react";
import { useProvidedAuthProvider } from ".";

describe("useProvidedAuthProvider", () => {
    it("returns new authProvider", async () => {
        const { result } = renderHook(() => useProvidedAuthProvider(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        expect(result.current?.isLegacy).toBeFalsy();
    });

    it("returns legacy authProvider", async () => {
        const { result } = renderHook(() => useProvidedAuthProvider(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                },
            }),
        });

        expect(result.current?.isLegacy).toBeTruthy();
    });

    it("returns null", async () => {
        const { result } = renderHook(() => useProvidedAuthProvider(), {
            wrapper: TestWrapper({}),
        });

        expect(result.current).toBe(null);
    });
});
