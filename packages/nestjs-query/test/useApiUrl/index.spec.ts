import dataProvider from "../../src/index";
import client, { API_URL } from "../gqlClient";

describe("getApiUrl", () => {
  describe("should return API URL from client", () => {
    it("correct response with query", async () => {
      const apiURL = dataProvider(client).getApiUrl();

      expect(apiURL).toEqual(API_URL);
    });
  });
});
