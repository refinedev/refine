import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

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
                    cloudConfig: {
                        baseUrl: "demo.domain.com",
                        clientId: "test",
                    },
                }),
            },
        );

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await act(() => {});

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
