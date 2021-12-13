import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useApiUrl } from "./";

describe("useApiUrl Hook", () => {
    it("returns context value", async () => {
        const { result } = renderHook(() => useApiUrl(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result.current).toBe("https://api.fake-rest.refine.dev");
    });
});
