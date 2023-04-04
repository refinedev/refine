import { renderHook, waitFor } from "@testing-library/react";

import { useAuthConfig } from "./index";
import { TestWrapper } from "@test";

describe("useAuthConfig Hook", () => {
    it("get successfull auth configs", async () => {
        const { result } = renderHook(() => useAuthConfig(), {
            wrapper: TestWrapper({
                connectConfig: {
                    baseUrl: "demo.domain.com",
                    clientId: "test",
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual([
            {
                disableSignup: false,
                name: "database",
                type: "database",
            },
        ]);
    });
});
