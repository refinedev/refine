import { dataProvider } from "../../src";
import supabaseClient from "../supabaseClient";
import "./index.mock";

describe("update", () => {
  it("correct response with `select`", async () => {
    const { data } = await dataProvider(supabaseClient).update({
      id: 1246,
      resource: "posts",
      variables: {
        title: "test",
        categoryId: 52,
        content: "test content",
      },
      meta: {
        select: "*",
      },
    });

    expect(data).toEqual(
      expect.objectContaining({
        id: 1246,
        title: "test",
        categoryId: 52,
        content: "test content",
      }),
    );
  });

  it("should change schema", async () => {
    const id = 1;

    const { data } = await dataProvider(supabaseClient).update({
      id,
      resource: "products",
      variables: {
        name: "IPhone 16",
      },
      meta: {
        select: "*",
      },
    });

    expect(data).toEqual({ id: 1, name: "IPhone 16" });

    try {
      await dataProvider(supabaseClient).update({
        id,
        resource: "products",
        variables: {
          name: "IPhone 16",
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
