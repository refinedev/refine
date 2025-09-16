import "./index.mock";
import { nestjsxTestDataProvider } from "../setup-data-provider";

describe("deleteMany", () => {
  it("correct response", async () => {
    const response = await nestjsxTestDataProvider.deleteMany!({
      resource: "posts",
      ids: ["0916d7a2-0675-44f7-af5e-183a701ce1d8"],
    });

    const { data } = response;

    expect(data).toEqual([""]);
  });
});
