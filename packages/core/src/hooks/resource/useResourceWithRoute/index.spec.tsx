import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useResourceWithRoute } from "./";

describe("useResourceWithRoute Hook", () => {
    it("returns context value", async () => {
        const { result } = renderHook(() => useResourceWithRoute(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [
                    { name: "posts", route: "posts" },
                    { name: "users", route: "users" },
                ],
            }),
        });

        expect(result.current("posts")).toEqual(
            expect.objectContaining({ name: "posts", route: "/posts" }),
        );
    });

    it("should match by route first", async () => {
        const { result } = renderHook(() => useResourceWithRoute(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [
                    { name: "posts", route: "posts" },
                    { name: "users", route: "custom-route" },
                ],
            }),
        });

        expect(result.current("custom-route")).toEqual(
            expect.objectContaining({ name: "users" }),
        );
    });
});
