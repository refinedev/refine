import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockLegacyRouterProvider } from "@test";

import { useNavigation } from ".";
import { IRouterContext } from "src/interfaces";

const legacyPushMock = jest.fn();
const legacyReplaceMock = jest.fn();
const legacyBackMock = jest.fn();

const legacyRouterProvider: IRouterContext = {
    ...mockLegacyRouterProvider(),
    useHistory: () => {
        return {
            push: legacyPushMock,
            replace: legacyReplaceMock,
            goBack: legacyBackMock,
        };
    },
};

describe("useNavigation Hook [legacy]", () => {
    beforeEach(() => {
        legacyBackMock.mockReset();
        legacyPushMock.mockReset();
        legacyReplaceMock.mockReset();
    });

    const { result } = renderHook(() => useNavigation(), {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [
                {
                    name: "posts",
                    route: "posts",
                    create: () => null,
                    list: () => null,
                    edit: () => null,
                    show: () => null,
                },
                {
                    name: "users",
                    route: "users-custom-route",
                    // options: {
                    //     route: "users-custom-route",
                    // },
                },
            ],
            legacyRouterProvider,
        }),
    });

    it("navigate to show with custom route", async () => {
        result.current.show("users", "1", "push");

        expect(legacyPushMock).toBeCalledWith("/users-custom-route/show/1");
    });

    it("navigation create with push", async () => {
        result.current.create("posts", "push");

        expect(legacyPushMock).toBeCalledWith("/posts/create");
    });

    it("navigation create with replace", async () => {
        result.current.create("posts", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts/create");
    });

    it("navigation edit with push", async () => {
        result.current.edit("posts", "1", "push");

        expect(legacyPushMock).toBeCalledWith("/posts/edit/1");

        legacyPushMock.mockReset();

        result.current.edit("posts", "foo/1", "push");

        expect(legacyPushMock).toBeCalledWith("/posts/edit/foo%2F1");
    });

    it("navigation edit with replace", async () => {
        result.current.edit("posts", "1", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts/edit/1");

        legacyReplaceMock.mockReset();
        result.current.edit("posts", "foo/1", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts/edit/foo%2F1");
    });

    it("navigation clone with push", async () => {
        result.current.clone("posts", "1", "push");

        expect(legacyPushMock).toBeCalledWith("/posts/clone/1");

        legacyPushMock.mockReset();
        result.current.clone("posts", "foo/1", "push");

        expect(legacyPushMock).toBeCalledWith("/posts/clone/foo%2F1");
    });

    it("navigation clone with replace", async () => {
        result.current.clone("posts", "1", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts/clone/1");

        legacyReplaceMock.mockReset();
        result.current.clone("posts", "foo/1", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts/clone/foo%2F1");
    });

    it("navigation show with push", async () => {
        result.current.show("posts", "1", "push");

        expect(legacyPushMock).toBeCalledWith("/posts/show/1");

        legacyPushMock.mockReset();
        result.current.show("posts", "foo/1", "push");

        expect(legacyPushMock).toBeCalledWith("/posts/show/foo%2F1");
    });

    it("navigation show with replace", async () => {
        result.current.show("posts", "1", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts/show/1");

        legacyReplaceMock.mockReset();
        result.current.show("posts", "foo/1", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts/show/foo%2F1");
    });

    it("navigation list with push", async () => {
        result.current.list("posts", "push");

        expect(legacyPushMock).toBeCalledWith("/posts");
    });

    it("navigation list with replace", async () => {
        result.current.list("posts", "replace");

        expect(legacyReplaceMock).toBeCalledWith("/posts");
    });

    it("navigation push", async () => {
        result.current.push("/posts");

        expect(legacyPushMock).toBeCalledWith("/posts");
    });

    it("navigation replace", async () => {
        result.current.replace("/posts");

        expect(legacyReplaceMock).toBeCalledWith("/posts");
    });

    it("navigation goBack", async () => {
        result.current.goBack();

        expect(legacyBackMock).toBeCalledTimes(1);
    });
});
