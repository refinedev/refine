import { renderHook } from "@testing-library/react-hooks";
import ReactRouterDom from "react-router-dom";

import { MockJSONServer, TestWrapper } from "@test";

import { useNavigation } from ".";

const mHistory = {
    push: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("useNavigation Hook", () => {
    const { result } = renderHook(() => useNavigation(), {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
        }),
    });

    it("navigation create with push", async () => {
        result.current.create("posts", "push");

        expect(mHistory.push).toBeCalledWith("/posts/create");
    });

    it("navigation create with replace", async () => {
        result.current.create("posts", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts/create");
    });

    it("navigation edit with push", async () => {
        result.current.edit("posts", "1", "push");

        expect(mHistory.push).toBeCalledWith("/posts/edit/1");

        mHistory.push.mockReset();
        result.current.edit("posts", "foo/1", "push");

        expect(mHistory.push).toBeCalledWith("/posts/edit/foo%2F1");
    });

    it("navigation edit with replace", async () => {
        result.current.edit("posts", "1", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts/edit/1");

        mHistory.replace.mockReset();
        result.current.edit("posts", "foo/1", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts/edit/foo%2F1");
    });

    it("navigation clone with push", async () => {
        result.current.clone("posts", "1", "push");

        expect(mHistory.push).toBeCalledWith("/posts/clone/1");

        mHistory.push.mockReset();
        result.current.clone("posts", "foo/1", "push");

        expect(mHistory.push).toBeCalledWith("/posts/clone/foo%2F1");
    });

    it("navigation clone with replace", async () => {
        result.current.clone("posts", "1", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts/clone/1");

        mHistory.replace.mockReset();
        result.current.clone("posts", "foo/1", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts/clone/foo%2F1");
    });

    it("navigation show with push", async () => {
        result.current.show("posts", "1", "push");

        expect(mHistory.push).toBeCalledWith("/posts/show/1");

        mHistory.push.mockReset();
        result.current.show("posts", "foo/1", "push");

        expect(mHistory.push).toBeCalledWith("/posts/show/foo%2F1");
    });

    it("navigation show with replace", async () => {
        result.current.show("posts", "1", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts/show/1");

        mHistory.replace.mockReset();
        result.current.show("posts", "foo/1", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts/show/foo%2F1");
    });

    it("navigation list with push", async () => {
        result.current.list("posts", "push");

        expect(mHistory.push).toBeCalledWith("/posts");
    });

    it("navigation list with replace", async () => {
        result.current.list("posts", "replace");

        expect(mHistory.replace).toBeCalledWith("/posts");
    });

    it("navigation push", async () => {
        result.current.push("/posts");

        expect(mHistory.push).toBeCalledWith("/posts");
    });

    it("navigation replace", async () => {
        result.current.replace("/posts");

        expect(mHistory.replace).toBeCalledWith("/posts");
    });

    it("navigation goBack", async () => {
        result.current.goBack();

        expect(mHistory.goBack).toBeCalledTimes(1);
    });
});
