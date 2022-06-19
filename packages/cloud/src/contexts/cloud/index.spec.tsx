import React, { useContext } from "react";
import { render, waitFor, screen } from "@testing-library/react";

import { CloudContext, CloudContextProvider } from "./";

describe("context/cloud", () => {
    const TestComponent = () => {
        const { baseUrl, clientId } = useContext(CloudContext);

        return (
            <>
                <span>{baseUrl}</span>
                <span>{clientId}</span>
            </>
        );
    };

    it("should get baseUrl and clientId", async () => {
        render(
            <CloudContextProvider
                baseUrl="foo.domain.com"
                clientId="test-client-id"
            >
                <TestComponent />
            </CloudContextProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("foo.domain.com")).toBeTruthy();
            expect(screen.getByText("test-client-id")).toBeTruthy();
        });
    });
});
