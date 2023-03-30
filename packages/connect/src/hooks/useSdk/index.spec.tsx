import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";
import { useSdk } from "./index";

describe("useSdk Hook", () => {
    it("get successfull sdk", () => {
        const { result } = renderHook(() => useSdk(), {
            wrapper: TestWrapper({
                connectConfig: {
                    baseUrl: "demo.domain.com",
                    clientId: "test",
                },
            }),
        });

        const { sdk } = result.current;

        expect(sdk).toBeTruthy();
    });
});
