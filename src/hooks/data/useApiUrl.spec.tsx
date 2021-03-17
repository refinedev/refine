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

        console.log(result.current);
        expect(result.current).toBe("https://readmin-fake-rest.pankod.com");
    });
});
