import { renderHook } from "@testing-library/react-hooks";

import { useResourcesConfig } from "./index";
import { TestWrapper } from "@test";

describe("useResourceConfig Hook", () => {
    it("get successfull resources configs", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () =>
                useResourcesConfig({
                    resourceName: "dev",
                }),
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
                name: "posts",
                options: {
                    auditLog: {
                        permissions: ["*"],
                    },
                },
            },
        ]);
    });
});
