import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("deleteOne", () => {
  it("correct response", async () => {
    const { data } = await dataProvider(supabaseClient).deleteOne({
      resource: "posts",
      id: "40",
    });

    expect(data.id).toEqual(40);
    expect(data.title).toEqual("Delete me");
  });

  it("should change schema", async () => {
    const id = 27;

    const { data } = await dataProvider(supabaseClient).deleteOne({
      resource: "products",
      id,
      meta: {
        schema: "public",
        select: "*",
      },
    });

    expect(data["name"]).toEqual("foo");

    try {
      await dataProvider(supabaseClient).deleteOne({
        resource: "products",
        id: 41,
        meta: {
          schema: "private",
          select: "*",
        },
      });
    } catch (error: any) {
      expect(error.code).toEqual("PGRST106");
    }
  });
});
