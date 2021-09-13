import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useList } from "./useList";

describe("useList Hook", () => {
    it("with rest json server", async () => {
        const { result, waitFor } = renderHook(
            () => useList({ resource: "posts" }),
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
        expect(data?.total).toEqual(2);
    });
});
