import nock from "nock";
import { API_URL, createDataProvider } from ".";

const variables = { foo: "bar" };

const response = {
  createResult: {
    id: 1,
    ...variables,
  },
};

nock(API_URL)
  .matchHeader("x-custom-header", "create")
  .matchHeader("x-default-header", "create")
  .post("/create", variables)
  .query({ queryParams: variables })
  .reply(201, response);

describe("create", () => {
  const dataProvider = createDataProvider(API_URL, {
    defaultHeaders: { "x-default-header": "create" },
  });

  it("should return the data", async () => {
    const result = await dataProvider.create({
      resource: "create",
      variables,
      meta: {
        query: { queryParams: variables },
        headers: { "x-custom-header": "create" },
      },
    });

    expect(result).toEqual({ data: response });
  });
});
