import { renderHook } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";

import { useRedirectionAfterSubmission } from "../redirection";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

describe("redirectionAfterSubmission Hook", () => {
    const { result } = renderHook(() => useRedirectionAfterSubmission(), {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
        }),
    });

    it("redirect list", async () => {
        result.current({
            redirect: "list",
            resource: { route: "posts", name: "posts" },
            id: "1",
        });

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("redirect false", async () => {
        result.current({
            redirect: false,
            resource: { route: "posts", name: "posts" },
            id: "1",
        });

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("redirect show, canShow false", async () => {
        result.current({
            redirect: "show",
            resource: { canShow: false, route: "posts", name: "posts" },
            id: "1",
        });

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("redirect show, canShow true", async () => {
        result.current({
            redirect: "show",
            resource: { canShow: true, route: "posts", name: "posts" },
            id: "1",
        });

        expect(mHistory).toBeCalledWith("/posts/show/1");
    });

    it("redirect edit, canEdit true", async () => {
        result.current({
            redirect: "edit",
            resource: { canEdit: true, route: "posts", name: "posts" },
            id: "1",
        });

        expect(mHistory).toBeCalledWith("/posts/edit/1");
    });

    it("redirect edit, canEdit false", async () => {
        result.current({
            redirect: "edit",
            resource: { canEdit: false, route: "posts", name: "posts" },
            id: "1",
        });

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("redirect create, canCreate true", async () => {
        result.current({
            redirect: "create",
            resource: { canCreate: true, route: "posts", name: "posts" },
        });

        expect(mHistory).toBeCalledWith("/posts/create");
    });

    it("redirect create, canCreate false", async () => {
        result.current({
            redirect: "create",
            resource: { canCreate: false, route: "posts", name: "posts" },
        });

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("redirect edit, canEdit true, id null", async () => {
        result.current({
            redirect: "edit",
            resource: { canEdit: true, route: "posts", name: "posts" },
        });

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("redirect show, canShow true, id null", async () => {
        result.current({
            redirect: "show",
            resource: { canShow: true, route: "posts", name: "posts" },
        });

        expect(mHistory).toBeCalledWith("/posts");
    });
});
