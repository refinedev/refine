import { renderHook } from "@testing-library/react-hooks";
import ReactRouterDom from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";

import { useRedirectionAfterSubmission } from "../redirection";

const mHistory = {
    push: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("redirectionAfterSubmission Hook", () => {
    const { result } = renderHook(() => useRedirectionAfterSubmission(), {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            routerInitialEntries: [
                "/resources/posts",
                "/resources/posts/create",
                "/resources/posts/edit/1",
                "/resources/posts/show/1",
            ],
        }),
    });

    it("redirect list", async () => {
        result.current({
            redirect: "list",
            resource: { route: "posts", name: "posts" },
            idFromRoute: "1",
        });

        expect(mHistory.push).toBeCalledWith("/resources/posts");
    });

    it("redirect false", async () => {
        result.current({
            redirect: false,
            resource: { route: "posts", name: "posts" },
            idFromRoute: "1",
        });

        expect(mHistory.push).toBeCalledWith("/resources/posts");
    });

    it("redirect show, canShow false", async () => {
        result.current({
            redirect: "show",
            resource: { canShow: false, route: "posts", name: "posts" },
            idFromRoute: "1",
        });

        expect(mHistory.push).toBeCalledWith("/resources/posts");
    });

    it("redirect show, canShow true", async () => {
        result.current({
            redirect: "show",
            resource: { canShow: true, route: "posts", name: "posts" },
            idFromRoute: "1",
        });

        expect(mHistory.push).toBeCalledWith("/resources/posts/show/1");
    });

    it("redirect edit, canEdit true", async () => {
        result.current({
            redirect: "edit",
            resource: { canEdit: true, route: "posts", name: "posts" },
            idFromRoute: "1",
        });

        expect(mHistory.push).toBeCalledWith("/resources/posts/edit/1");
    });

    it("redirect edit, canEdit false", async () => {
        result.current({
            redirect: "edit",
            resource: { canShow: false, route: "posts", name: "posts" },
            idFromRoute: "1",
        });

        expect(mHistory.push).toBeCalledWith("/resources/posts");
    });
});
