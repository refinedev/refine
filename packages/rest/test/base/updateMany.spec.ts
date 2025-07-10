import nock from "nock";
import { API_URL, createDataProvider } from ".";

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

const queryParams = { ids: "1,2" };

describe("updateMany", () => {
  const dataProvider = createDataProvider(API_URL);

  describe("patch", () => {
    nock(API_URL)
      .patch("/updateMany/bulk", variables)
      .query(queryParams)
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
      nock(API_URL)
        .put("/updateMany/bulk", variables)
        .query(queryParams)
        .reply(200, response);

      const dataProvider = createDataProvider(API_URL, {
        updateMany: {
          getRequestMethod(params) {
            return "PUT";
          },
        },
      });

      it("should make request using PUT method", async () => {
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
        .put("/updateMany/bulk", variables)
        .query(queryParams)
        .reply(200, response);

      it("should make request using PUT method", async () => {
        const result = await dataProvider.updateMany!({
          ids: [1, 2],
          resource: "updateMany",
          variables,
          meta: {
            method: "PUT",
          },
        });

        expect(result).toEqual({ data: response });
      });
    });
  });
});
