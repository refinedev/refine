import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useOne } from "./useOne";

describe("useOne Hook", () => {
    it("with rest json server", async () => {
        const { result, waitFor } = renderHook(
            () => useOne({ resource: "posts", id: "1" }),
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

        const { status, data } = result.current;

        expect(status).toBe("success");
        expect(data?.data.slug).toBe("ut-ad-et");
    });
});
