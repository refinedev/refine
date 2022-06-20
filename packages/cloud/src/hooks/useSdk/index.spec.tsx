import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { useSdk } from "./index";
import { CloudContextProvider } from "../../contexts/cloud";

describe("useSdk Hook", () => {
    it("get successfull sdk", () => {
        const Wrapper: React.FC = ({ children }) => (
            <CloudContextProvider
                baseUrl="foo.domain.com"
                clientId="test-client-id"
            >
                {children}
            </CloudContextProvider>
        );

        const { result } = renderHook(() => useSdk(), {
            wrapper: Wrapper,
        });

        const { sdk } = result.current;

        expect(sdk).toBeTruthy();
    });
});
