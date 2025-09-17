import nock from "nock";
import { API_URL, createDataProvider } from ".";

const variables = [{ foo: "bar" }, { bar: "baz" }];

const response = [
  {
    id: 1,
    ...variables[0],
  },
  {
    id: 2,
    ...variables[1],
  },
];

nock(API_URL)
  .matchHeader("x-custom-header", "createMany")
  .matchHeader("x-default-header", "createMany")
  .post("/createMany/bulk", variables)
  .reply(201, response);

describe("createMany", () => {
  const dataProvider = createDataProvider(
    API_URL,
    {
      createMany: {
        getEndpoint: (params) => `${params.resource}/bulk`,
        buildHeaders: async (params) => params.meta?.headers,
        buildBodyParams: async (params) => params.variables,
        mapResponse: async (response) => await response.json(),
      },
    },
    {
      headers: { "x-default-header": "createMany" },
    },
  );

  it("should return the data", async () => {
    const result = await dataProvider.createMany!({
      resource: "createMany",
      variables,
      meta: {
        headers: { "x-custom-header": "createMany" },
      },
    });

    expect(result).toEqual({ data: response });
  });
});
