import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useWarnAboutChange } from ".";

describe("useWarnAboutChange Hook", () => {
    it("returns context value correctly", async () => {
        const { result } = renderHook(() => useWarnAboutChange(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result.current.warnWhenUnsavedChanges).toEqual(false);
        expect(result.current.setWarnWhen).toBeDefined();
        expect(result.current.warnWhen).toEqual(false);
    });
});
