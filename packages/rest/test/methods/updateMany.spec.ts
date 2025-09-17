import nock from "nock";
import { API_URL, createDataProvider } from "..";

const variables = { foo: "bar" };

const response = [
  {
    id: 1,
    ...variables,
  },
  {
    id: 2,
    ...variables,
  },
];

describe("updateMany", () => {
  const dataProvider = createDataProvider(API_URL, {
    updateMany: {
      getEndpoint: (params) => `${params.resource}/bulk`,
      getRequestMethod: (params) => params.meta?.method || "patch",
      buildQueryParams: async (params) => ({ ids: params.ids.join(",") }),
      buildHeaders: async (params) => params.meta?.headers,
      buildBodyParams: async (params) => params.variables,
      mapResponse: async (response) => await response.json(),
    },
  });

  describe("patch", () => {
    nock(API_URL)
      .patch("/updateMany/bulk?ids=1,2", variables)
      .reply(200, response);

    it("should return the data", async () => {
      const result = await dataProvider.updateMany!({
        ids: [1, 2],
        resource: "updateMany",
        variables,
      });

      expect(result).toEqual({ data: response });
    });
  });

  describe("put", () => {
    describe("from dataprovider config", () => {
      it("should make request using PUT method", async () => {
        nock(API_URL)
          .put("/updateMany/bulk?ids=1,2", variables)
          .reply(200, response);

        const dataProvider = createDataProvider(API_URL, {
          updateMany: {
            getEndpoint: (params) => `${params.resource}/bulk`,
            getRequestMethod: () => "put",
            buildQueryParams: async (params) => ({ ids: params.ids.join(",") }),
            buildHeaders: async (params) => params.meta?.headers,
            buildBodyParams: async (params) => params.variables,
            mapResponse: async (response) => await response.json(),
          },
        });

        const result = await dataProvider.updateMany!({
          ids: [1, 2],
          resource: "updateMany",
          variables,
        });

        expect(result).toEqual({ data: response });
      });
    });

    describe('from "method" parameter', () => {
      nock(API_URL)
        .put("/updateMany/bulk?ids=1,2", variables)
        .reply(200, response);

      it("should make request using PUT method", async () => {
        const result = await dataProvider.updateMany!({
          ids: [1, 2],
          resource: "updateMany",
          variables,
          meta: {
            method: "put",
          },
        });

        expect(result).toEqual({ data: response });
      });
    });
  });
});
