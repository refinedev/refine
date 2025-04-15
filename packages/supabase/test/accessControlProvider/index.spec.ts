import {
  createAuthProvider,
  accessControlProvider,
  SupabaseAuthProvider,
} from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

// Mock the authentication response - we'll control it in each test
const mockAuthGetIdentity = jest.fn();

// Create a mock auth provider that uses our controlled getIdentity
const mockAuthProvider: SupabaseAuthProvider = {
  getIdentity: mockAuthGetIdentity,
  // Other methods that might be needed by the accessControlProvider
  login: jest.fn(),
  logout: jest.fn(),
  check: jest.fn(),
  onError: jest.fn(),
  getPermissions: jest.fn(),
};

describe("accessControlProvider", () => {
  const acProvider = accessControlProvider(mockAuthProvider);

  beforeEach(() => {
    // Reset all mock functions before each test
    jest.clearAllMocks();
  });

  it("should deny access if authProvider is not defined", async () => {
    // Create provider with undefined authProvider
    // @ts-ignore - Intentionally passing undefined to test behavior
    const noAuthAcProvider = accessControlProvider(undefined);

    const result = await noAuthAcProvider.can({
      resource: "posts",
      action: "list",
    });

    expect(result.can).toBe(false);
    expect(result.reason).toContain("AuthProvider");
  });

  it("should deny access if user is not authenticated", async () => {
    // Mock getIdentity to return null (not authenticated)
    mockAuthGetIdentity.mockResolvedValue(null);

    const result = await acProvider.can({
      resource: "posts",
      action: "edit",
    });

    expect(result.can).toBe(false);
    expect(result.reason).toBe("User not authenticated");
    expect(mockAuthGetIdentity).toHaveBeenCalledTimes(1);
  });

  it("should allow access for admin users", async () => {
    // Mock admin user
    mockAuthGetIdentity.mockResolvedValue({
      id: "user-1",
      email: "admin@example.com",
      app_metadata: { role: "admin" },
    });

    const result = await acProvider.can({
      resource: "posts",
      action: "delete",
    });

    expect(result.can).toBe(true);
    expect(mockAuthGetIdentity).toHaveBeenCalledTimes(1);
  });

  it("should deny access for non-admin users", async () => {
    // Mock regular user
    mockAuthGetIdentity.mockResolvedValue({
      id: "user-2",
      email: "user@example.com",
      app_metadata: { role: "user" }, // Not admin
    });

    const result = await acProvider.can({
      resource: "posts",
      action: "delete",
    });

    expect(result.can).toBe(false);
    expect(result.reason).toBe("User not authorized");
    expect(mockAuthGetIdentity).toHaveBeenCalledTimes(1);
  });

  it("should handle missing app_metadata gracefully", async () => {
    // Mock user with no app_metadata
    mockAuthGetIdentity.mockResolvedValue({
      id: "user-3",
      email: "incomplete@example.com",
      // No app_metadata field
    });

    const result = await acProvider.can({
      resource: "posts",
      action: "create",
    });

    expect(result.can).toBe(false);
    expect(mockAuthGetIdentity).toHaveBeenCalledTimes(1);
  });

  it("should check options for default configuration", () => {
    // Check default options
    expect(acProvider.options.buttons.enableAccessControl).toBe(true);
    expect(acProvider.options.buttons.hideIfUnauthorized).toBe(false);
  });
});
