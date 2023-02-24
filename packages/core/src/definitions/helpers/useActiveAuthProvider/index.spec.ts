import { TestWrapper } from "@test/index";
import { renderHook } from "@testing-library/react";
import { useActiveAuthProvider } from ".";

/**
 * NOTE: Will be removed in v5
 */
describe("useActiveAuthProvider", () => {
    it("returns new authProvider", async () => {
        const { result } = renderHook(() => useActiveAuthProvider(), {
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

    it("returns v3LegacyAuthProviderCompatible authProvider", async () => {
        const { result } = renderHook(() => useActiveAuthProvider(), {
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

    it("returns new authProvider when both provided", async () => {
        const { result } = renderHook(() => useActiveAuthProvider(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                },
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

    it("returns null", async () => {
        const { result } = renderHook(() => useActiveAuthProvider(), {
            wrapper: TestWrapper({}),
        });

        expect(result.current).toBe(null);
    });
});
