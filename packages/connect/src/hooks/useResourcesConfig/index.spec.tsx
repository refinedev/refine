import { renderHook, waitFor } from "@testing-library/react";

import { useResourcesConfig } from "./index";
import { TestWrapper } from "@test";

describe("useResourceConfig Hook", () => {
    it("get successfull resources configs", async () => {
        const { result } = renderHook(
            () =>
                useResourcesConfig({
                    resourceName: "dev",
                }),
            {
                wrapper: TestWrapper({
                    connectConfig: {
                        baseUrl: "demo.domain.com",
                        clientId: "test",
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual([
            {
                name: "posts",
                meta: {
                    auditLog: {
                        permissions: ["*"],
                    },
                },
            },
        ]);
    });
});
