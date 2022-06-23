import { renderHook } from "@testing-library/react-hooks";

import { useAuthConfig } from "./index";
import { TestWrapper } from "@test";

describe("useAuthConfig Hook", () => {
    it("get successfull auth configs", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useAuthConfig(),
            {
                wrapper: TestWrapper({
                    cloudConfig: {
                        baseUrl: "demo.domain.com",
                        clientId: "test",
                    },
                }),
            },
        );

        await waitForNextUpdate();

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
