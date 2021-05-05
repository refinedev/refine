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

        expect(mHistory.push).toBeCalledWith("/resources/posts/create");
    });

    it("navigation create with replace", async () => {
        result.current.create("posts", "replace");

        expect(mHistory.replace).toBeCalledWith("/resources/posts/create");
    });

    it("navigation edit with push", async () => {
        result.current.edit("posts", "push", 1);

        expect(mHistory.push).toBeCalledWith("/resources/posts/edit/1");
    });

    it("navigation edit with replace", async () => {
        result.current.edit("posts", "replace", 1);

        expect(mHistory.replace).toBeCalledWith("/resources/posts/edit/1");
    });

    it("navigation show with push", async () => {
        result.current.show("posts", "push", 1);

        expect(mHistory.push).toBeCalledWith("/resources/posts/show/1");
    });

    it("navigation show with replace", async () => {
        result.current.show("posts", "replace", 1);

        expect(mHistory.replace).toBeCalledWith("/resources/posts/show/1");
    });

    it("navigation list with push", async () => {
        result.current.list("posts", "push");

        expect(mHistory.push).toBeCalledWith("/resources/posts");
    });

    it("navigation list with replace", async () => {
        result.current.list("posts", "replace");

        expect(mHistory.replace).toBeCalledWith("/resources/posts");
    });

    it("navigation push", async () => {
        result.current.push("/resources/posts");

        expect(mHistory.push).toBeCalledWith("/resources/posts");
    });

    it("navigation replace", async () => {
        result.current.replace("/resources/posts");

        expect(mHistory.replace).toBeCalledWith("/resources/posts");
    });


    it("navigation goBack", async () => {
        result.current.goBack();

        expect(mHistory.goBack).toBeCalledTimes(1);
    });
});
