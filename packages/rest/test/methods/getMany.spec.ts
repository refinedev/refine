import nock from "nock";
import { API_URL, createDataProvider } from "..";

const response = [{ id: 1 }, { id: 2 }];
const queryParams = { ids: "1,2" };

nock(API_URL)
  .matchHeader("x-default-header", "getMany")
  .matchHeader("x-custom-header", "getMany")
  .get("/getMany")
  .query(queryParams)
  .reply(200, response);

describe("getMany", () => {
  const { dataProvider } = createDataProvider(
    API_URL,
    {},
    {
      headers: { "x-default-header": "getMany" },
    },
  );

  it("should return the data", async () => {
    const result = await dataProvider.getMany!({
      ids: [1, 2],
      resource: "getMany",
      meta: {
        headers: { "x-custom-header": "getMany" },
      },
    });

    expect(result).toEqual({ data: response });
  });
});
