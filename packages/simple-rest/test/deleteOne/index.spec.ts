import axios from "axios";

import JsonServer from "../../src/index";

describe("deleteOne", () => {
  it("correct response", async () => {
    const response = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).deleteOne({ resource: "posts", id: "1" });

    const { data } = response;

    expect(data).toEqual({});
  });

  it("sends DELETE with variables as body and headers by default", async () => {
    const { data } = await JsonServer(
      "https://api.fake-rest.refine.dev",
      axios,
    ).deleteOne({
      resource: "posts",
      id: "2",
      variables: { reason: "spam" },
      meta: { headers: { "x-custom": "1" } },
    });

    expect(data).toEqual({ id: 2 });
  });

  it.each([
    ["post", "3"],
    ["put", "4"],
    ["patch", "5"],
  ])(
    "sends variables as body and headers with meta.method %s",
    async (method, id) => {
      const { data } = await JsonServer(
        "https://api.fake-rest.refine.dev",
        axios,
      ).deleteOne({
        resource: "posts",
        id,
        variables: { reason: "spam" },
        meta: { method, headers: { "x-custom": "1" } },
      });

      expect(data).toEqual({ id: Number(id) });
    },
  );
});
