import nock from "nock";
import { API_URL, createDataProvider } from ".";

const response: [] = [];

nock(API_URL)
  .matchHeader("x-default-header", "deleteMany")
  .matchHeader("x-custom-header", "deleteMany")
  .delete("/deleteMany/1")
  .reply(200, response);

nock(API_URL)
  .matchHeader("x-default-header", "deleteMany")
  .matchHeader("x-custom-header", "deleteMany")
  .delete("/deleteMany/2")
  .reply(200, response);

describe("deleteMany", () => {
  const dataProvider = createDataProvider(
    API_URL,
    {},
    {
      headers: { "x-default-header": "deleteMany" },
    },
  );

  it("should return the data", async () => {
    const result = await dataProvider.deleteMany!({
      ids: [1, 2],
      resource: "deleteMany",
      meta: {
        headers: { "x-custom-header": "deleteMany" },
      },
    });

    expect(result).toEqual({ data: response });
  });
});
