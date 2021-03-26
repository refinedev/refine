import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useResourceWithRoute } from "./";

describe("useResourceWithRoute Hook", () => {
    it("returns context value", async () => {
        const { result } = renderHook(() => useResourceWithRoute("posts"), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [
                    { name: "posts", route: "posts" },
                    { name: "users", route: "users" },
                ],
            }),
        });

        expect(result.current).toEqual({ name: "posts", route: "posts" });
    });
});
