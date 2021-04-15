import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useSelect } from "./";

describe("useSelect Hook", () => {
    it("default", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.loading;
        });

        const { options, loading } = result.current;

        expect(loading).toBeFalsy();
        expect(options).toHaveLength(2);
    });
});
