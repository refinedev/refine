import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useCustom } from "./useCustom";

describe("useCustom Hook", () => {
    it("with rest json server", async () => {
        const { result, waitFor } = renderHook(
            () => useCustom({ url: "remoteUrl", method: "get" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { data } = result.current;

        expect(data?.data).toHaveLength(2);
    });
});
