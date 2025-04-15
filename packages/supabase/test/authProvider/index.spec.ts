import "./index.mock";

import { createClient } from "@supabase/supabase-js";
import { createAuthProvider } from "../../src/authProvider";

describe("authProvider", () => {
  const mockWindow = window as any;
  const originalLocation = { ...window.location };

  beforeEach(() => {
    // Reset window.location
    Object.defineProperty(window, "location", {
      value: { ...originalLocation, origin: "http://localhost:3000" },
      writable: true,
    });
  });

  const supabaseClient = createClient(
    "https://iwdfzvfqbtokqetmbmbp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.ZopqoUt20nEV9cklpv9JA3C5XeRQNMIoV1_xFLjlh-E",
  );

  const authProvider = createAuthProvider(
    supabaseClient,
    {}, // Default provider options
    { baseUrl: "http://localhost:3000" }, // Explicitly set baseUrl in config
  );

  describe("login", () => {
    it("should login successfully with valid credentials", async () => {
      const result = await authProvider.login({
        email: "info@refine.dev",
        password: "refine-supabase",
      });

      expect(result).toEqual({
        success: true,
        redirectTo: "/",
      });
    });

    it("should return error with invalid credentials", async () => {
      try {
        await authProvider.login({
          email: "wrong@refine.dev",
          password: "wrong-password",
        });
      } catch (error: any) {
        expect(error.message).toBe("Invalid login credentials");
      }
    });
  });

  describe("logout", () => {
    it("should logout successfully", async () => {
      const result = await authProvider.logout({});

      expect(result).toEqual({
        success: true,
        redirectTo: "/login",
      });
    });
  });

  describe("check", () => {
    it("should return authenticated true when session exists", async () => {
      const result = await authProvider.check();

      expect(result).toEqual({
        authenticated: true,
      });
    });

    it("should redirect to login when no session exists", async () => {
      // Override the mock for this specific test
      jest.spyOn(supabaseClient.auth, "getSession").mockResolvedValueOnce({
        data: { session: null },
        error: null,
      });

      const result = await authProvider.check();

      expect(result).toEqual({
        authenticated: false,
        error: {
          message: "No active session found",
          name: "SessionNotFound",
        },
        logout: true,
        redirectTo: "/login",
      });
    });
  });

  describe("getPermissions", () => {
    it("should return user role from metadata", async () => {
      const result = (await authProvider.getPermissions?.()) || undefined;

      expect(result).toEqual("admin");
    });

    it("should return undefined when no role in metadata", async () => {
      // Override the mock to return a user without role
      jest.spyOn(supabaseClient.auth, "getUser").mockResolvedValueOnce({
        data: {
          user: {
            id: "user-id",
            app_metadata: {},
            user_metadata: {},
            aud: "authenticated",
            created_at: "2022-01-01T00:00:00Z",
          },
        },
        error: null,
      });

      const result = (await authProvider.getPermissions?.()) || undefined;

      expect(result).toBeUndefined();
    });
  });

  describe("getIdentity", () => {
    it("should return user identity", async () => {
      const result = await authProvider.getIdentity();

      expect(result).toEqual({
        id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
        fullName: "Test User",
        email: "info@refine.dev",
        avatar: undefined,
      });
    });

    it("should throw error when no user found", async () => {
      // Override the mock for this test
      jest.spyOn(supabaseClient.auth, "getUser").mockResolvedValueOnce({
        data: { user: null },
        error: null,
      } as any); // Use type assertion to bypass the type error

      try {
        await authProvider.getIdentity();
      } catch (error: any) {
        expect(error.message).toBe("User not found");
      }
    });
  });

  describe("forgotPassword", () => {
    it("should initiate password reset", async () => {
      const result = (await authProvider.forgotPassword?.({
        email: "info@refine.dev",
      })) || { success: false };

      expect(result).toEqual({
        success: true,
      });
    });
  });

  describe("updatePassword", () => {
    it("should update password successfully", async () => {
      const result = (await authProvider.updatePassword?.({
        password: "new-password",
      })) || { success: false };

      expect(result).toEqual({
        success: true,
        redirectTo: "/",
      });
    });
  });

  describe("register", () => {
    it("should register successfully", async () => {
      const result = (await authProvider.register?.({
        email: "new@refine.dev",
        password: "new-password",
      })) || { success: false };

      expect(result).toEqual({
        success: true,
        redirectTo: "/",
      });
    });
  });

  describe("onError", () => {
    it("should handle authentication errors", async () => {
      const result = await authProvider.onError({
        error: { message: "Session expired", statusCode: 401 },
      });

      expect(result).toEqual({
        error: {
          error: {
            message: "Session expired",
            statusCode: 401,
          },
        },
      });
    });

    it("should pass through other errors", async () => {
      const result = await authProvider.onError({
        error: { message: "Not found", statusCode: 404 },
      });

      expect(result).toEqual({
        error: {
          error: {
            message: "Not found",
            statusCode: 404,
          },
        },
      });
    });
  });

  describe("reset-password", () => {
    it("should parse reset password token from URL", async () => {
      // Set up a mock URL with token hash
      mockWindow.location.href =
        "http://localhost:3000/reset-password#type=recovery&token_hash=valid-token-hash";

      const authProviderWithReset = createAuthProvider(
        supabaseClient,
        {},
        { baseUrl: "http://localhost:3000" },
      );

      const result = await authProviderWithReset.check();

      expect(result).toEqual({
        authenticated: false,
        error: {
          message: "Reset password required",
          name: "Reset password",
        },
        logout: true,
        redirectTo: "/reset-password",
      });
    });

    it("should handle invalid recovery token", async () => {
      // Set up a mock URL with invalid token hash
      mockWindow.location.href =
        "http://localhost:3000/reset-password#type=recovery&token_hash=invalid-token-hash";

      try {
        const authProviderWithReset = createAuthProvider(
          supabaseClient,
          {},
          { baseUrl: "http://localhost:3000" },
        );

        await authProviderWithReset.check();
      } catch (error: any) {
        expect(error.message).toBe("Invalid token");
      }
    });
  });
});
