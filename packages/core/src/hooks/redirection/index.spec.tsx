import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockLegacyRouterProvider } from "@test";

import type { LegacyRouterProvider } from "../../contexts/router/legacy/types";
import { useRedirectionAfterSubmission } from "../redirection";

const legacyPushMock = jest.fn();
const legacyReplaceMock = jest.fn();

const legacyRouterProvider: LegacyRouterProvider = {
  ...mockLegacyRouterProvider(),
  useHistory: () => {
    return {
      goBack: jest.fn(),
      push: legacyPushMock,
      replace: legacyReplaceMock,
    };
  },
};

describe("redirectionAfterSubmission Hook", () => {
  beforeEach(() => {
    legacyPushMock.mockReset();
    legacyReplaceMock.mockReset();
  });

  const { result } = renderHook(() => useRedirectionAfterSubmission(), {
    wrapper: TestWrapper({
      dataProvider: MockJSONServer,
      resources: [{ name: "posts", route: "posts" }],
      legacyRouterProvider,
    }),
  });

  it("redirect list", async () => {
    result.current({
      redirect: "list",
      resource: { route: "posts", name: "posts", list: () => null },
      id: "1",
    });

    expect(legacyPushMock).toBeCalledWith("/posts");
  });

  it("redirect false", async () => {
    result.current({
      redirect: false,
      resource: { route: "posts", name: "posts" },
      id: "1",
    });

    expect(legacyPushMock).not.toBeCalled();
  });

  it("redirect show, canShow false", async () => {
    result.current({
      redirect: "show",
      resource: {
        route: "posts",
        name: "posts",
        list: () => null,
      },
      id: "1",
    });

    expect(legacyPushMock).toBeCalledWith("/posts");
  });

  it("redirect show, canShow true", async () => {
    result.current({
      redirect: "show",
      resource: {
        canShow: true,
        route: "posts",
        name: "posts",
        show: () => null,
      },
      id: "1",
    });

    expect(legacyPushMock).toBeCalledWith("/posts/show/1");
  });

  it("redirect edit, canEdit true", async () => {
    result.current({
      redirect: "edit",
      resource: {
        canEdit: true,
        route: "posts",
        name: "posts",
        edit: () => null,
      },
      id: "1",
    });

    expect(legacyPushMock).toBeCalledWith("/posts/edit/1");
  });

  it("redirect edit, canEdit false", async () => {
    result.current({
      redirect: "edit",
      resource: {
        canEdit: false,
        route: "posts",
        name: "posts",
        list: () => null,
      },
      id: "1",
    });

    expect(legacyPushMock).toBeCalledWith("/posts");
  });

  it("redirect create, canCreate true", async () => {
    result.current({
      redirect: "create",
      resource: {
        canCreate: true,
        route: "posts",
        name: "posts",
        create: () => null,
      },
    });

    expect(legacyPushMock).toBeCalledWith("/posts/create");
  });

  it("redirect create, canCreate false", async () => {
    result.current({
      redirect: "create",
      resource: {
        canCreate: false,
        route: "posts",
        name: "posts",
        list: () => null,
      },
    });

    expect(legacyPushMock).toBeCalledWith("/posts");
  });

  it("redirect edit, canEdit true, id null", async () => {
    result.current({
      redirect: "edit",
      resource: {
        canEdit: true,
        route: "posts",
        name: "posts",
        list: () => null,
      },
    });

    expect(legacyPushMock).toBeCalledWith("/posts");
  });

  it("redirect show, canShow true, id null", async () => {
    result.current({
      redirect: "show",
      resource: {
        canShow: true,
        route: "posts",
        name: "posts",
        show: () => null,
        list: () => null,
      },
    });

    expect(legacyPushMock).toBeCalledWith("/posts");
  });
});
