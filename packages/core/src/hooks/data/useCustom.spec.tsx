import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useCustom } from "./useCustom";

describe("useCustom Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(
            () => useCustom({ url: "remoteUrl", method: "get" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { data } = result.current;

        expect(data?.data).toHaveLength(2);
    });
});
