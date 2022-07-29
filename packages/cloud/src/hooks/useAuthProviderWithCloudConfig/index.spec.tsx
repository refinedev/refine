import { renderHook } from "@testing-library/react";

import { useAuthProviderWithCloudConfig } from "./index";
import { TestWrapper } from "@test";

describe("useAuthProviderWithCloudConfig Hook", () => {
    const { result } = renderHook(() => useAuthProviderWithCloudConfig(), {
        wrapper: TestWrapper({
            cloudConfig: {
                baseUrl: "demo.domain.com",
                clientId: "test",
            },
        }),
    });

    it("login", async () => {
        const { generateCloudAuthProvider } = result.current;
        const { login } = generateCloudAuthProvider();

        const response = await login({
            username: "test",
            password: "test",
        });

        expect(response).toBeUndefined();
    });

    it("logout", async () => {
        const { generateCloudAuthProvider } = result.current;
        const { logout } = generateCloudAuthProvider();

        const response = logout;
        expect(response).toBeTruthy();
    });

    it("check error", async () => {
        const { generateCloudAuthProvider } = result.current;
        const { checkError } = generateCloudAuthProvider();

        const response = checkError;
        expect(response).toBeTruthy();
    });

    it("check auth", async () => {
        const { generateCloudAuthProvider } = result.current;
        const { checkAuth } = generateCloudAuthProvider();

        const response = await checkAuth();
        expect(response).toBeUndefined();
    });

    it("get permission", async () => {
        const { generateCloudAuthProvider } = result.current;
        const { getPermissions } = generateCloudAuthProvider();

        const response = await getPermissions();
        expect(response).toContain("admin");
    });

    it("get identity", async () => {
        const { generateCloudAuthProvider } = result.current;
        const { getUserIdentity } = generateCloudAuthProvider();

        const response = getUserIdentity ? await getUserIdentity() : undefined;
        expect(response.email).toBe("test@mail.com");
        expect(response.name).toBe("John Doe");
    });
});
