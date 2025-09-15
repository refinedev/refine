import { simpleRestDataProvider } from "..";
import { createDataProvider } from "../../../src/index";
import "./index.mock";

describe("update", () => {
  it("correct response", async () => {
    const response = await simpleRestDataProvider.update({
      resource: "posts",
      id: "1000",
      variables: {
        id: 1001,
        title: "foo",
        content: "bar",
      },
    });

    const { data } = response;

    expect(data["id"]).toBe(1000);
    expect(data["title"]).toBe("foo");
    expect(data["content"]).toBe("bar");
  });
});
