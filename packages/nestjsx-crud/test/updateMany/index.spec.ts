import "./index.mock";
import { nestjsxTestDataProvider } from "../setup-data-provider";

describe("updateMany", () => {
  it("correct response", async () => {
    const { data } = await nestjsxTestDataProvider.updateMany!({
      resource: "posts",
      ids: ["f1d6e030-4d70-44d4-98dd-8786f197c640"],
      variables: {
        title: "updated-title-1",
      },
    });

    expect(data[0]["title"]).toBe("updated-title-1");
  });
});
