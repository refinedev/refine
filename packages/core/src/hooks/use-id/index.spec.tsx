import React from "react";
import { renderHook, waitFor } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  act,
  mockLegacyRouterProvider,
} from "@test";

import {
  assertList,
  assertOne,
  renderUseList,
  renderUseMany,
  renderUseOne,
} from "@test/mutation-helpers";

import { useId } from ".";

import { posts } from "@test/dataMocks";
import { mockRouterBindings } from "@test";

const EditWrapper = TestWrapper({
  dataProvider: MockJSONServer,
  routerProvider: mockRouterBindings({
    resource: {
      name: "posts",
    },
    action: "edit",
    id: "1",
  }),
});

const CloneWrapper = TestWrapper({
  dataProvider: MockJSONServer,
  routerProvider: mockRouterBindings({
    resource: {
      name: "posts",
    },
    action: "clone",
    id: "1",
  }),
});

const EditWrapperWithRoute: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => <EditWrapper>{children}</EditWrapper>;

const CloneWrapperWithRoute: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => <CloneWrapper>{children}</CloneWrapper>;

describe("useId Hook", () => {
  it("returns id from props", () => {
    const { result } = renderHook(() => useId({ id: "123" }), {
      wrapper: TestWrapper({}),
    });

    const [id, _setId] = result.current;

    expect(id).toBe("123");
  });

  it("returns id from route", () => {
    const { result } = renderHook(() => useId(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterBindings({
          resource: {
            name: "posts",
          },
          id: "123",
        }),
      }),
    });

    const [id, _setId] = result.current;

    expect(id).toBe("123");
  });

  it("returns id from props when a different resource is passed", () => {
    const { result } = renderHook(
      () => useId({ id: "3", resource: "categories" }),
      {
        wrapper: TestWrapper({
          routerProvider: mockRouterBindings({
            resource: {
              name: "posts",
            },
            id: "123",
          }),
        }),
      },
    );

    const [id, _setId] = result.current;

    expect(id).toBe("3");
  });

  it("returns id from route when same resource is passed", () => {
    const { result } = renderHook(() => useId({ resource: "posts" }), {
      wrapper: TestWrapper({
        routerProvider: mockRouterBindings({
          resource: {
            name: "posts",
          },
          id: "123",
        }),
      }),
    });

    const [id, _setId] = result.current;

    expect(id).toBe("123");
  });

  it("returns new id when set with setId", async () => {
    const { result } = renderHook(() => useId({ id: "123" }), {
      wrapper: TestWrapper({}),
    });

    const [id, setId] = result.current;

    expect(id).toBe("123");

    act(() => {
      setId("456");
    });

    await waitFor(() => expect(result.current[0]).toBe("456"));
  });

  it("returns undefined when custom resource is passed without id", () => {
    const { result } = renderHook(() => useId({ resource: "categories" }), {
      wrapper: TestWrapper({
        routerProvider: mockRouterBindings({
          resource: {
            name: "posts",
          },
          id: "123",
        }),
      }),
    });

    const [id, _setId] = result.current;

    expect(id).toBeUndefined();
  });
});
