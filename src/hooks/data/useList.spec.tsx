import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";

import JsonServer from "@dataProviders/jsonServer";
import { TestWrapper } from "@test";

import { useList } from "./useList";
import { posts } from "./mocks";

const server = setupServer(
    rest.get("https://readmin-fake-rest.pankod.com/posts", (_req, res, ctx) => {
        return res(ctx.json(posts), ctx.set("x-total-count", "2"));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useList Hook", () => {
    it("with rest json server", async () => {
        const { result, waitFor } = renderHook(() => useList("posts"), {
            wrapper: TestWrapper({
                dataProvider: JsonServer(
                    "https://readmin-fake-rest.pankod.com",
                ),
                resources: ["posts"],
            }),
        });

        await waitFor(() => {
            return result.current.isSuccess;
        });

        const { data } = result.current;

        expect(data?.data).toHaveLength(2);
        expect(data?.total).toEqual(2);
    });
});
