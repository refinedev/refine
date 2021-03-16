import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useUpdateMany } from "./useUpdateMany";

describe("useUpdateMany Hook", () => {
    it("with rest json server", async () => {
        const { result, waitForNextUpdate, waitFor } = renderHook(
            () => useUpdateMany("posts"),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            id: ["1", "2"],
            values: { id: "1", title: "test" },
        });
        await waitForNextUpdate();

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { status, data } = result.current;

        expect(status).toBe("success");
        expect(data?.data.length).toBe(2);
        expect(data?.data[0].title).toBe("test");
        expect(data?.data[1].title).toBe("test");
    });
});
