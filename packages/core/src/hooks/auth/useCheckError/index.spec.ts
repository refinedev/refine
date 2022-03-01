import { renderHook } from "@testing-library/react-hooks";
import ReactRouterDom from "react-router-dom";

import { act, TestWrapper } from "@test";

import { useCheckError } from "./";

const mHistory = {
    push: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("useCheckError Hook", () => {
    beforeEach(() => {
        mHistory.push.mockReset();
    });

    it("logout and redirect to login if check error rejected", async () => {
        const logoutMock = jest.fn();

        const { result, waitFor } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject(),
                    getPermissions: () => Promise.resolve(),
                    logout: logoutMock,
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutate: checkError } = result.current!;

        await checkError({});

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        expect(logoutMock).toBeCalledTimes(1);
        expect(mHistory.push).toBeCalledWith("/login", undefined);
    });

    it("logout and redirect to custom path if check error rejected", async () => {
        const { result, waitFor } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject("/customPath"),
                    getPermissions: () => Promise.resolve(),
                    logout: ({ redirectPath }) => {
                        return Promise.resolve(redirectPath);
                    },
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutate: checkError } = result.current!;

        await checkError({});

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory.push).toBeCalledWith("/customPath", undefined);
        });
    });
});
