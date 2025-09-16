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

describe("updateMany", () => {
  const dataProvider = createDataProvider(API_URL);

  describe("patch", () => {
    nock(API_URL).patch("/updateMany/1", variables).reply(200, response[0]);
    nock(API_URL).patch("/updateMany/2", variables).reply(200, response[1]);

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
      nock(API_URL).put("/updateMany/1", variables).reply(200, response[0]);
      nock(API_URL).put("/updateMany/2", variables).reply(200, response[1]);

      const dataProvider = createDataProvider(API_URL, {
        update: {
          getRequestMethod(params) {
            return "put";
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
      nock(API_URL).put("/updateMany/1", variables).reply(200, response[0]);
      nock(API_URL).put("/updateMany/2", variables).reply(200, response[1]);

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
