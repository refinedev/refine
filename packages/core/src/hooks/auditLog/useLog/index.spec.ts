import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, mockAuthProvider, mockLegacyAuthProvider } from "@test";

import { useLog } from ".";
import type { LogParams } from "../../../contexts/auditLog/types";
import type { ResourceProps } from "../../../contexts/resource/types";
import * as hasPermission from "../../../definitions/helpers/hasPermission";

const auditLogProviderCreateMock = jest.fn();
const auditLogProviderUpdateMock = jest.fn();
const auditLogProviderGetMock = jest.fn();

const invalidateQueriesMock = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({
    ...jest.requireActual("@tanstack/react-query").useQueryClient(),
    invalidateQueries: invalidateQueriesMock,
  }),
}));

describe("useLog Hook", () => {
  beforeEach(() => {
    auditLogProviderCreateMock.mockReset();
    auditLogProviderUpdateMock.mockReset();
    auditLogProviderGetMock.mockReset();
    invalidateQueriesMock.mockReset();
  });

  describe("log callback", () => {
    it("should called logEvent empty permission", async () => {
      const { result } = renderHook(() => useLog(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
            },
          ],
          auditLogProvider: {
            create: auditLogProviderCreateMock,
          },
        }),
      });

      const { log } = result.current;

      const logEventPayload: LogParams = {
        action: "create",
        resource: "posts",
        data: { id: 1, title: "title" },
        meta: {
          id: 1,
        },
        author: {},
      };

      log.mutate(logEventPayload);

      await waitFor(() => {
        expect(result.current.log.isSuccess).toBeTruthy();
      });

      expect(auditLogProviderCreateMock).toBeCalledWith(logEventPayload);
      expect(auditLogProviderCreateMock).toBeCalledTimes(1);
    });

    it("should not called logEvent if no includes permissions", async () => {
      const { result } = renderHook(() => useLog(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
              meta: { auditLog: { permissions: ["create"] } },
            },
          ],
          auditLogProvider: {
            get: auditLogProviderGetMock,
          },
        }),
      });

      const { log } = result.current;

      const logEventPayload: LogParams = {
        action: "update",
        resource: "posts",
        data: { id: 1, title: "title" },
        meta: {
          id: 1,
        },
      };

      log.mutate(logEventPayload);

      await waitFor(() => {
        expect(result.current.log.isSuccess).toBeTruthy();
      });

      expect(auditLogProviderGetMock).not.toBeCalled();
    });

    it("should called logEvent if exist auditLogPermissions", async () => {
      const { result } = renderHook(() => useLog(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
              meta: { auditLog: { permissions: ["update"] } },
            },
          ],
          auditLogProvider: {
            create: auditLogProviderCreateMock,
          },
        }),
      });

      const { log } = result.current;

      const logEventPayload: LogParams = {
        action: "update",
        resource: "posts",
        data: { id: 1, title: "title" },
        meta: {
          id: 1,
        },
      };

      log.mutate(logEventPayload);

      await waitFor(() => {
        expect(result.current.log.isSuccess).toBeTruthy();
      });

      expect(auditLogProviderCreateMock).toBeCalled();
    });

    it("should not invoke `useGetIdentity` if `auditLogProvider.create` is not defined", async () => {
      const getUserIdentityMock = jest.fn();
      const { result } = renderHook(() => useLog(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
            },
          ],
          authProvider: {
            check: () => Promise.resolve({ authenticated: true }),
            login: () => Promise.resolve({ success: true }),
            logout: () => Promise.resolve({ success: true }),
            onError: () => Promise.resolve({}),
            getIdentity: getUserIdentityMock,
          },
          auditLogProvider: {},
        }),
      });

      const logEventPayload: LogParams = {
        action: "update",
        resource: "posts",
        data: { id: 1, title: "title" },
        meta: {
          id: 1,
        },
      };

      result.current.log.mutate(logEventPayload);

      await waitFor(() => {
        expect(result.current.log.isSuccess).toBeTruthy();
      });

      expect(getUserIdentityMock).not.toBeCalled();
    });

    it("should invoke `useGetIdentity` if `auditLogProvider.create` is defined", async () => {
      const getUserIdentityMock = jest.fn();
      const { result } = renderHook(() => useLog(), {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
            },
          ],
          authProvider: {
            check: () => Promise.resolve({ authenticated: true }),
            login: () => Promise.resolve({ success: true }),
            logout: () => Promise.resolve({ success: true }),
            onError: () => Promise.resolve({}),
            getIdentity: getUserIdentityMock,
          },
          auditLogProvider: {
            create: auditLogProviderCreateMock,
          },
        }),
      });

      const logEventPayload: LogParams = {
        action: "update",
        resource: "posts",
        data: { id: 1, title: "title" },
        meta: {
          id: 1,
        },
      };

      result.current.log.mutate(logEventPayload);

      await waitFor(() => {
        expect(result.current.log.isSuccess).toBeTruthy();
      });

      expect(getUserIdentityMock).toBeCalled();
    });

    it.each(["legacy", "new"])(
      "should work with %s auth provider",
      async (testCase) => {
        const isLegacy = testCase === "legacy";

        const authProvider = isLegacy
          ? {
              legacyAuthProvider: mockLegacyAuthProvider,
            }
          : { authProvider: mockAuthProvider };

        const { result } = renderHook(() => useLog(), {
          wrapper: TestWrapper({
            ...authProvider,
            resources: [
              {
                name: "posts",
                meta: { auditLog: { permissions: ["update"] } },
              },
            ],
            auditLogProvider: {
              create: auditLogProviderCreateMock,
            },
          }),
        });

        const { log } = result.current;

        const logEventPayload: LogParams = {
          action: "update",
          resource: "posts",
          data: { id: 1, title: "title" },
          meta: {
            id: 1,
          },
        };

        log.mutate(logEventPayload);

        await waitFor(() => {
          expect(result.current.log.isSuccess).toBeTruthy();
        });

        const author = isLegacy
          ? await mockLegacyAuthProvider.getUserIdentity?.()
          : await mockAuthProvider.getIdentity?.();

        expect(auditLogProviderCreateMock).toHaveBeenCalledWith({
          ...logEventPayload,
          author,
        });
      },
    );
  });

  it.each([
    "meta.audit",
    "options.audit", // deprecated value
    "options.audit.auditLog.permissions", // deprecated value
  ])("should work with %s values", async (testCase) => {
    // jest spyon hasPermission
    const hasPermissionSpy = jest.spyOn(hasPermission, "hasPermission");
    hasPermissionSpy.mockReturnValue(false);

    let resourceAudit: ResourceProps["meta"] = {};

    switch (testCase) {
      case "meta.audit":
        resourceAudit = {
          meta: { audit: ["create"] },
        };
        break;
      case "options.audit":
        resourceAudit = {
          options: { audit: ["create"] },
        };
        break;
      case "options.audit.auditLog.permissions":
        resourceAudit = {
          options: {
            auditLog: {
              permissions: ["create"],
            },
          },
        };
        break;
    }

    const { result } = renderHook(() => useLog(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            ...resourceAudit,
          },
        ],
        auditLogProvider: {
          create: auditLogProviderCreateMock,
        },
      }),
    });

    await result.current.log.mutateAsync({
      action: "create",
      resource: "posts",
      data: { id: 1, title: "title" },
      meta: {
        id: 1,
      },
    });

    expect(auditLogProviderCreateMock).not.toHaveBeenCalled();
  });

  it("should return undefined if logPermissions exist but hasPermission returns false", async () => {
    const { result } = renderHook(() => useLog(), {
      wrapper: TestWrapper({
        resources: [
          {
            name: "posts",
            meta: {
              audit: ["update"],
            },
          },
        ],
        auditLogProvider: {
          create: auditLogProviderCreateMock,
        },
      }),
    });

    await result.current.log.mutateAsync({
      action: "create",
      resource: "posts",
      data: { id: 1, title: "title" },
      meta: {
        id: 1,
      },
    });

    expect(auditLogProviderCreateMock).not.toHaveBeenCalled();
  });

  describe("rename mutation", () => {
    it("succeed rename", async () => {
      const { result } = renderHook(() => useLog(), {
        wrapper: TestWrapper({
          auditLogProvider: {
            update: auditLogProviderUpdateMock,
          },
        }),
      });
      const { rename } = result.current;
      const { mutate } = rename;

      auditLogProviderUpdateMock.mockResolvedValueOnce({
        id: 1,
        name: "test name",
        resource: "posts",
      });

      mutate({ id: 1, name: "test name" });

      await waitFor(() => {
        expect(result.current.rename.isSuccess).toBeTruthy();
      });

      expect(auditLogProviderUpdateMock).toBeCalledWith({
        id: 1,
        name: "test name",
      });
      expect(auditLogProviderUpdateMock).toBeCalledTimes(1);

      expect(invalidateQueriesMock).toBeCalledTimes(1);
      expect(invalidateQueriesMock).toBeCalledWith(["logList", "posts"]);
    });

    it("succeed rename should not call invalidateQueries if have not resource", async () => {
      const { result } = renderHook(() => useLog(), {
        wrapper: TestWrapper({
          auditLogProvider: {
            update: auditLogProviderUpdateMock,
          },
        }),
      });
      const { rename } = result.current;
      const { mutate } = rename;

      auditLogProviderUpdateMock.mockResolvedValueOnce({
        id: 1,
        name: "test name",
      });

      mutate({ id: 1, name: "test name" });

      await waitFor(() => {
        expect(result.current.rename.isSuccess).toBeTruthy();
      });

      expect(auditLogProviderUpdateMock).toBeCalledWith({
        id: 1,
        name: "test name",
      });
      expect(auditLogProviderUpdateMock).toBeCalledTimes(1);

      expect(invalidateQueriesMock).toBeCalledTimes(0);
    });
  });
});
