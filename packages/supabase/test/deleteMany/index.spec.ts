import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("deleteMany", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(supabaseClient).deleteMany!({
      resource: "posts",
      ids: ["43"],
    });

    expect(data[0].id).toEqual(43);
    expect(data[0].title).toEqual("Hello World 2");
  });

  it("should change schema", async () => {
    const ids = [28];

    const { data } = await dataProvider(supabaseClient).deleteMany({
      resource: "products",
      ids,
    });

    expect(data[0]["id"]).toEqual(28);

    try {
      await dataProvider(supabaseClient).deleteMany({
        resource: "products",
        ids: [],
        meta: {
          schema: "private",
        },
      });
    } catch (error: any) {
      expect(error.code).toEqual("PGRST106");
    }
  });
});
