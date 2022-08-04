import { renderHook } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";

import { useNavigation } from ".";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

describe("useNavigation Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
    });
    const { result } = renderHook(() => useNavigation(), {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
        }),
    });

    it("navigation create with push", async () => {
        result.current.create("posts", "push");

        expect(mHistory).toBeCalledWith("/posts/create");
    });

    it("navigation create with replace", async () => {
        result.current.create("posts", "replace");

        expect(mHistory).toBeCalledWith("/posts/create", { replace: true });
    });

    it("navigation edit with push", async () => {
        result.current.edit("posts", "1", "push");

        expect(mHistory).toBeCalledWith("/posts/edit/1");

        mHistory.mockReset();
        result.current.edit("posts", "foo/1", "push");

        expect(mHistory).toBeCalledWith("/posts/edit/foo%2F1");
    });

    it("navigation edit with replace", async () => {
        result.current.edit("posts", "1", "replace");

        expect(mHistory).toBeCalledWith("/posts/edit/1", { replace: true });

        mHistory.mockReset();
        result.current.edit("posts", "foo/1", "replace");

        expect(mHistory).toBeCalledWith("/posts/edit/foo%2F1", {
            replace: true,
        });
    });

    it("navigation clone with push", async () => {
        result.current.clone("posts", "1", "push");

        expect(mHistory).toBeCalledWith("/posts/clone/1");

        mHistory.mockReset();
        result.current.clone("posts", "foo/1", "push");

        expect(mHistory).toBeCalledWith("/posts/clone/foo%2F1");
    });

    it("navigation clone with replace", async () => {
        result.current.clone("posts", "1", "replace");

        expect(mHistory).toBeCalledWith("/posts/clone/1", { replace: true });

        mHistory.mockReset();
        result.current.clone("posts", "foo/1", "replace");

        expect(mHistory).toBeCalledWith("/posts/clone/foo%2F1", {
            replace: true,
        });
    });

    it("navigation show with push", async () => {
        result.current.show("posts", "1", "push");

        expect(mHistory).toBeCalledWith("/posts/show/1");

        mHistory.mockReset();
        result.current.show("posts", "foo/1", "push");

        expect(mHistory).toBeCalledWith("/posts/show/foo%2F1");
    });

    it("navigation show with replace", async () => {
        result.current.show("posts", "1", "replace");

        expect(mHistory).toBeCalledWith("/posts/show/1", { replace: true });

        mHistory.mockReset();
        result.current.show("posts", "foo/1", "replace");

        expect(mHistory).toBeCalledWith("/posts/show/foo%2F1", {
            replace: true,
        });
    });

    it("navigation list with push", async () => {
        result.current.list("posts", "push");

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("navigation list with replace", async () => {
        result.current.list("posts", "replace");

        expect(mHistory).toBeCalledWith("/posts", { replace: true });
    });

    it("navigation push", async () => {
        result.current.push("/posts");

        expect(mHistory).toBeCalledWith("/posts");
    });

    it("navigation replace", async () => {
        result.current.replace("/posts");

        expect(mHistory).toBeCalledWith("/posts", { replace: true });
    });

    it("navigation goBack", async () => {
        result.current.goBack();

        expect(mHistory).toBeCalledWith(-1);
    });
});
