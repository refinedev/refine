import React, { useContext } from "react";
import { render, waitFor, screen } from "@testing-library/react";

import { ConnectContext, ConnectContextProvider } from "./";

describe("context/connect", () => {
    const TestComponent = () => {
        const { baseUrl, clientId } = useContext(ConnectContext);

        return (
            <>
                <span>{baseUrl}</span>
                <span>{clientId}</span>
            </>
        );
    };

    it("should get baseUrl and clientId", async () => {
        render(
            <ConnectContextProvider
                baseUrl="foo.domain.com"
                clientId="test-client-id"
            >
                <TestComponent />
            </ConnectContextProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText("foo.domain.com")).toBeTruthy();
            expect(screen.getByText("test-client-id")).toBeTruthy();
        });
    });
});
