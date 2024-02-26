import React from "react";
import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useWarnAboutChange } from ".";

describe("useWarnAboutChange Hook", () => {
  it("returns context value correctly", async () => {
    jest.spyOn(React, "useContext").mockReturnValue({
      warnWhenUnsavedChanges: false,
      warnWhen: false,
      setWarnWhen: (param: boolean) => param,
    });

    const { result } = renderHook(() => useWarnAboutChange(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    expect(result.current.warnWhenUnsavedChanges).toEqual(false);
    expect(result.current.setWarnWhen).toBeDefined();
    expect(result.current.setWarnWhen(false)).toEqual(false);
    expect(result.current.warnWhen).toEqual(false);
  });

  it("should setWarnWhen returns undefined when context not available", async () => {
    jest.spyOn(React, "useContext").mockReturnValue({
      warnWhenUnsavedChanges: false,
      warnWhen: false,
      setWarnWhen: undefined,
    });

    const { result } = renderHook(() => useWarnAboutChange(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    expect(result.current.warnWhenUnsavedChanges).toEqual(false);
    expect(result.current.warnWhen).toEqual(false);
    expect(result.current.setWarnWhen).toBeInstanceOf(Function);
    expect(result.current.setWarnWhen(true)).toBeUndefined();
  });
});
