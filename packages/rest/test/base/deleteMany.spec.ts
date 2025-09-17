import nock from "nock";
import { API_URL, createDataProvider } from ".";

const response: [] = [];

nock(API_URL)
  .matchHeader("x-default-header", "deleteMany")
  .matchHeader("x-custom-header", "deleteMany")
  .delete("/deleteMany/bulk?ids=1,2")
  .reply(200, response);

describe("deleteMany", () => {
  const dataProvider = createDataProvider(
    API_URL,
    {
      deleteMany: {
        getEndpoint: (params) => `${params.resource}/bulk`,
        buildHeaders: async (params) => params.meta?.headers,
        buildQueryParams: async (params) => ({
          ids: params.ids.join(","),
        }),
        mapResponse: async (response) => await response.json(),
      },
    },
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
