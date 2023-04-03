import { renderHook } from "@testing-library/react";

import { useAuthProviderWithConnectConfig } from "./index";
import { TestWrapper } from "@test";

describe("useAuthProviderWithConnectConfig Hook", () => {
    const { result } = renderHook(() => useAuthProviderWithConnectConfig(), {
        wrapper: TestWrapper({
            connectConfig: {
                baseUrl: "demo.domain.com",
                clientId: "test",
            },
        }),
    });

    it("login", async () => {
        const { generateConnectAuthProvider } = result.current;
        const { login } = generateConnectAuthProvider();

        const response = await login({
            email: "test@mail.com",
            password: "test",
        });

        expect(response).toBeUndefined();
    });

    it("logout", async () => {
        const { generateConnectAuthProvider } = result.current;
        const { logout } = generateConnectAuthProvider();

        const response = logout;
        expect(response).toBeTruthy();
    });

    it("check error", async () => {
        const { generateConnectAuthProvider } = result.current;
        const { checkError } = generateConnectAuthProvider();

        const response = checkError;
        expect(response).toBeTruthy();
    });

    it("check auth", async () => {
        const { generateConnectAuthProvider } = result.current;
        const { checkAuth } = generateConnectAuthProvider();

        const response = await checkAuth();
        expect(response).toBeUndefined();
    });

    it("get permission", async () => {
        const { generateConnectAuthProvider } = result.current;
        const { getPermissions } = generateConnectAuthProvider();

        const response = await getPermissions?.();
        expect(response).toContain("admin");
    });

    it("get identity", async () => {
        const { generateConnectAuthProvider } = result.current;
        const { getUserIdentity } = generateConnectAuthProvider();

        const response = getUserIdentity ? await getUserIdentity() : undefined;
        expect(response.email).toBe("test@mail.com");
        expect(response.name).toBe("John Doe");
    });
});
