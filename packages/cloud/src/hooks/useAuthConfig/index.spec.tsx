import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useAuthConfig } from "./index";
import { TestWrapper } from "@test";

describe("useAuthConfig Hook", () => {
    it("get successfull auth configs", async () => {
        const { result } = renderHook(() => useAuthConfig(), {
            wrapper: TestWrapper({
                cloudConfig: {
                    baseUrl: "demo.domain.com",
                    clientId: "test",
                },
            }),
        });

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await act(() => {});

        const { data } = result.current;

        expect(data).toEqual([
            {
                disableSignup: false,
                name: "database",
                type: "database",
            },
        ]);
    });
});
