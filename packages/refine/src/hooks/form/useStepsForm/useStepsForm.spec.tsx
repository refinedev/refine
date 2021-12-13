import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useStepsForm } from "./useStepsForm";

describe("useStepsForm Hook", () => {
    it("current form index", async () => {
        const { result, waitFor } = renderHook(
            () => useStepsForm({ resource: "posts" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            const { current } = result;
            expect(current.current).toEqual(0);
        });
    });

    it("goToStep", async () => {
        const { result, waitFor, waitForNextUpdate } = renderHook(
            () => useStepsForm({ resource: "posts" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts", route: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            result.current.gotoStep(1);
        });

        await waitForNextUpdate();
        expect(result.current.current).toEqual(1);
    });
});
