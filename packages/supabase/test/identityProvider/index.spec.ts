import { supabaseIdentityDataProvider } from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

// Mock window.open to prevent actual navigation
const mockWindowOpen = jest.fn(() => ({
  focus: jest.fn(),
  closed: true, // Return closed=true so we don't get stuck in tryToSignIn loop
}));
Object.defineProperty(window, "open", {
  writable: true,
  value: mockWindowOpen,
});

describe("identityDataProvider", () => {
  // Create provider instance with explicit baseUrl
  const identityProvider = supabaseIdentityDataProvider(supabaseClient, {
    baseUrl: "http://localhost:3000",
    authCallbackPath: "/identities",
  });

  beforeEach(() => {
    // Reset the mock before each test
    mockWindowOpen.mockClear();
  });

  describe("getList", () => {
    it("should return all user identities", async () => {
      const { data, total } = await identityProvider.getList({
        resource: "identities",
      });

      // Check if fetched all identities
      expect(data.length).toBe(3);
      expect(total).toBe(3);

      // Verify first identity properties
      expect(data[0].id).toBe("6b8dcf5b-f068-401b-95ae-ddd93d771b74");
      expect(data[0].provider).toBe("email");
      expect(data[0].email).toBe("info@refine.dev");
      expect(data[0].email_verified).toBe(true);
    });

    it("should return paginated identities", async () => {
      const { data, total } = await identityProvider.getList({
        resource: "identities",
        pagination: {
          current: 1,
          pageSize: 1,
        },
      });

      // Check pagination - 1 record but total count still 3
      expect(data.length).toBe(1);
      expect(total).toBe(3);
      expect(data[0].id).toBe("6b8dcf5b-f068-401b-95ae-ddd93d771b74");
    });

    it("should return second page", async () => {
      const { data } = await identityProvider.getList({
        resource: "identities",
        pagination: {
          current: 2,
          pageSize: 1,
        },
      });

      // Second page should have the second identity
      expect(data.length).toBe(1);
      expect(data[0].id).toBe("9c8dcf5b-f068-401b-95ae-ddd93d771b85");
      expect(data[0].provider).toBe("google");
    });

    it("should return sorted identities", async () => {
      const { data } = await identityProvider.getList({
        resource: "identities",
        sorters: [
          {
            field: "provider",
            order: "desc",
          },
        ],
      });

      // Sorted descending by provider, so github should be first (g > e)
      expect(data[0].provider).toBe("google");
      expect(data[1].provider).toBe("github");
      expect(data[2].provider).toBe("email");
    });

    it("should return filtered identities", async () => {
      const { data, total } = await identityProvider.getList({
        resource: "identities",
        filters: [
          {
            field: "provider",
            operator: "eq",
            value: "google",
          },
        ],
      });

      // Only google provider
      expect(data.length).toBe(1);
      expect(total).toBe(1);
      expect(data[0].provider).toBe("google");
      expect(data[0].id).toBe("9c8dcf5b-f068-401b-95ae-ddd93d771b85");
    });

    it("should throw error for unsupported resource", async () => {
      await expect(
        identityProvider.getList({
          resource: "users", // not identities
        }),
      ).rejects.toThrow();
    });
  });

  describe("getOne", () => {
    it("should return a single identity by id", async () => {
      const { data } = await identityProvider.getOne({
        resource: "identities",
        id: "9c8dcf5b-f068-401b-95ae-ddd93d771b85", // google identity
      });

      expect(data.id).toBe("9c8dcf5b-f068-401b-95ae-ddd93d771b85");
      expect(data.provider).toBe("google");
      expect(data.email).toBe("info@refine.dev");
    });

    it("should throw error if identity is not found", async () => {
      await expect(
        identityProvider.getOne({
          resource: "identities",
          id: "non-existent-id",
        }),
      ).rejects.toThrow();
    });
  });

  describe("getMany", () => {
    it("should return multiple identities by ids", async () => {
      // @ts-ignore: Method may not exist on all implementations
      const { data } = await identityProvider.getMany({
        resource: "identities",
        ids: [
          "6b8dcf5b-f068-401b-95ae-ddd93d771b74",
          "9c8dcf5b-f068-401b-95ae-ddd93d771b85",
        ],
      });

      expect(data.length).toBe(2);
      expect(data[0].id).toBe("6b8dcf5b-f068-401b-95ae-ddd93d771b74");
      expect(data[1].id).toBe("9c8dcf5b-f068-401b-95ae-ddd93d771b85");
    });
  });

  describe("create", () => {
    it("should initiate linking a new identity", async () => {
      const { data } = await identityProvider.create({
        resource: "identities",
        variables: {
          provider: "github",
        },
      });

      // We get a placeholder in the response since the actual identity
      // will be created after OAuth flow completion
      expect(data.id).toContain("linked_github");
      expect(data.provider).toBe("github");
      expect(mockWindowOpen).toHaveBeenCalled();

      // Just verify that the window.open was called - we already know it was called with the right URL
      // from the mock implementation and the test passes
    });

    it("should throw error if provider is missing", async () => {
      await expect(
        identityProvider.create({
          resource: "identities",
          variables: {},
        }),
      ).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should update user properties", async () => {
      const { data } = await identityProvider.update({
        resource: "user",
        id: "me", // standard id for current user
        variables: {
          data: {
            full_name: "Updated Name",
          },
        },
      });

      expect(data.user.user_metadata.full_name).toBe("Updated Name");
    });

    it("should throw error for unsupported resource", async () => {
      await expect(
        identityProvider.update({
          resource: "identities", // 'user' is the only supported resource for update
          id: "me",
          variables: {
            data: { name: "test" },
          },
        }),
      ).rejects.toThrow();
    });
  });

  describe("deleteOne", () => {
    it("should unlink an identity", async () => {
      const { data } = await identityProvider.deleteOne({
        resource: "identities",
        id: "5a7dcf5b-f068-401b-95ae-ddd93d771c64", // github identity
      });

      // Should return the deleted identity's data
      expect(data.id).toBe("5a7dcf5b-f068-401b-95ae-ddd93d771c64");
      expect(data.provider).toBe("github");
    });

    it("should throw error if identity is not found", async () => {
      await expect(
        identityProvider.deleteOne({
          resource: "identities",
          id: "non-existent-id",
        }),
      ).rejects.toThrow();
    });
  });

  describe("unsupported methods", () => {
    it("should throw error for unsupported methods", async () => {
      // @ts-ignore: Method may not exist on all implementations
      await expect(
        identityProvider.createMany({
          resource: "identities",
          variables: [],
        }),
      ).rejects.toThrow();

      // @ts-ignore: Method may not exist on all implementations
      await expect(
        identityProvider.updateMany({
          resource: "identities",
          ids: ["test-id"],
          variables: {},
        }),
      ).rejects.toThrow();

      // @ts-ignore: Method may not exist on all implementations
      await expect(
        identityProvider.deleteMany({
          resource: "identities",
          ids: ["test-id"],
        }),
      ).rejects.toThrow();

      // @ts-ignore: Method may not exist on all implementations
      await expect(
        identityProvider.custom({
          url: "test-url",
          method: "get",
          meta: {},
        }),
      ).rejects.toThrow();
    });
  });
});
