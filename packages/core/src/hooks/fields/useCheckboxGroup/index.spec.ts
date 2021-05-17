import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useCheckboxGroup } from "./";

describe("render hook default options", () => {
    it("should success data with resource", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useCheckboxGroup({
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
            return result.current.queryResult.isSuccess;
        });

        const { checkboxGroupProps } = result.current;
        const { options } = checkboxGroupProps;

        expect(options).toHaveLength(2);
    });
});
