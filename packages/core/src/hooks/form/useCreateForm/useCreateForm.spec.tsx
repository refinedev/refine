import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";
import { useCreateForm } from "./useCreateForm";

const Wrapper = TestWrapper({});

describe("useCreateForm Hook", () => {
    it("renders with form", async () => {
        const { result } = renderHook(
            () => useCreateForm({ resource: { name: "posts" } }),
            {
                wrapper: Wrapper,
            },
        );

        expect(result.current.form).toBeDefined();
    });
});
