import nock from "nock";
import { API_URL, createDataProvider } from ".";

const response: [] = [];

const queryParams = { ids: "1,2" };

nock(API_URL)
  .matchHeader("x-default-header", "deleteMany")
  .matchHeader("x-custom-header", "deleteMany")
  .delete("/deleteMany/bulk")
  .query(queryParams)
  .reply(200, response);

describe("deleteMany", () => {
  const dataProvider = createDataProvider(API_URL, {
    defaultHeaders: { "x-default-header": "deleteMany" },
  });

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
