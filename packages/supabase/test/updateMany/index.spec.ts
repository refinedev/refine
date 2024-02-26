import { dataProvider } from "../../src/index";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("updateMany", () => {
  it("correct response with `select`", async () => {
    const { data } = await dataProvider(supabaseClient).updateMany!({
      resource: "posts",
      ids: [1246],
      variables: {
        title: "test",
        categoryId: 52,
        content: "test content",
      },
      meta: {
        select: "*",
      },
    });

    expect(data[0]).toEqual(
      expect.objectContaining({
        id: 1246,
        title: "test",
        categoryId: 52,
        content: "test content",
      }),
    );
  });

  it("should change schema", async () => {
    const { data } = await dataProvider(supabaseClient).updateMany({
      resource: "products",
      ids: [1, 2],
      variables: {
        name: "Samsung Galaxy S21",
      },
      meta: {
        schema: "public",
        select: "*",
      },
    });

    expect(data[0]).toEqual({ id: 1, name: "Samsung Galaxy S21" });
    expect(data[1]).toEqual({ id: 2, name: "Samsung Galaxy S21" });

    try {
      await dataProvider(supabaseClient).updateMany({
        resource: "products",
        ids: [1, 2],
        variables: {
          name: "foo",
        },
        meta: {
          schema: "private",
        },
      });
    } catch (error: any) {
      expect(error.code).toEqual("PGRST106");
    }
  });
});
