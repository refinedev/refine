import { renderHook } from "@testing-library/react";
import { useForm } from "./packages/core/src/hooks/form";

// Mock the dependencies
jest.mock("./packages/core/src/hooks", () => ({
  useMeta: () => () => ({}),
  useOne: jest.fn(),
  useCreate: () => ({ isLoading: false }),
  useUpdate: () => ({ isLoading: false }),
  useResourceParams: () => ({
    id: undefined,
    setId: jest.fn(),
    resource: { name: "posts" },
    identifier: "posts",
    formAction: "edit",
  }),
  useInvalidate: () => jest.fn(),
  useMutationMode: () => ({ mutationMode: "pessimistic" }),
  useRefineOptions: () => ({ redirect: "list" }),
  useLoadingOvertime: () => ({ elapsedTime: 0 }),
  useWarnAboutChange: () => ({ setWarnWhen: jest.fn() }),
  useRedirectionAfterSubmission: () => jest.fn(),
}));

describe("useForm enabled condition fix", () => {
  let mockUseOne: jest.Mock;

  beforeEach(() => {
    mockUseOne = require("./packages/core/src/hooks").useOne;
    mockUseOne.mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not enable query when id is undefined even if user passes enabled: true", () => {
    renderHook(() =>
      useForm({
        action: "edit",
        queryOptions: {
          enabled: true, // User tries to force enable
        },
      })
    );

    expect(mockUseOne).toHaveBeenCalledWith(
      expect.objectContaining({
        queryOptions: expect.objectContaining({
          enabled: false, // Should be false because id is undefined
        }),
      })
    );
  });

  it("should enable query when id is defined and user passes enabled: true", () => {
    // Mock useResourceParams to return a defined id
    const mockUseResourceParams = require("./packages/core/src/hooks").useResourceParams;
    mockUseResourceParams.mockReturnValue({
      id: "123",
      setId: jest.fn(),
      resource: { name: "posts" },
      identifier: "posts",
      formAction: "edit",
    });

    renderHook(() =>
      useForm({
        action: "edit",
        id: "123",
        queryOptions: {
          enabled: true,
        },
      })
    );

    expect(mockUseOne).toHaveBeenCalledWith(
      expect.objectContaining({
        queryOptions: expect.objectContaining({
          enabled: true, // Should be true because id is defined and user enabled is true
        }),
      })
    );
  });

  it("should not enable query when id is defined but user passes enabled: false", () => {
    // Mock useResourceParams to return a defined id
    const mockUseResourceParams = require("./packages/core/src/hooks").useResourceParams;
    mockUseResourceParams.mockReturnValue({
      id: "123",
      setId: jest.fn(),
      resource: { name: "posts" },
      identifier: "posts",
      formAction: "edit",
    });

    renderHook(() =>
      useForm({
        action: "edit",
        id: "123",
        queryOptions: {
          enabled: false, // User explicitly disables
        },
      })
    );

    expect(mockUseOne).toHaveBeenCalledWith(
      expect.objectContaining({
        queryOptions: expect.objectContaining({
          enabled: false, // Should be false because user disabled it
        }),
      })
    );
  });

  it("should not enable query for create action even if user passes enabled: true", () => {
    renderHook(() =>
      useForm({
        action: "create",
        queryOptions: {
          enabled: true, // User tries to force enable
        },
      })
    );

    expect(mockUseOne).toHaveBeenCalledWith(
      expect.objectContaining({
        queryOptions: expect.objectContaining({
          enabled: false, // Should be false because it's create action
        }),
      })
    );
  });
});