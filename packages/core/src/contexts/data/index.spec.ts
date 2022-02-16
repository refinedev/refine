import { defaultDataProvider } from "./";

describe("context/defaultProvider", () => {
    const {
        create,
        createMany,
        custom,
        deleteMany,
        deleteOne,
        getApiUrl,
        getList,
        getMany,
        getOne,
        update,
        updateMany,
    } = defaultDataProvider().default;

    it("create", async () => {
        expect(await create()).toMatchInlineSnapshot(`
            Object {
              "data": Object {
                "id": 1,
              },
            }
        `);
    });

    it("createMany", async () => {
        expect(await createMany()).toMatchInlineSnapshot(`
            Object {
              "data": Array [],
            }
        `);
    });

    it("custom", async () => {
        expect(await custom()).toMatchInlineSnapshot(`
            Object {
              "data": Object {},
            }
        `);
    });

    it("deleteMany", async () => {
        expect(await deleteMany()).toMatchInlineSnapshot(`
            Object {
              "data": Array [],
            }
        `);
    });

    it("deleteOne", async () => {
        expect(await deleteOne()).toMatchInlineSnapshot(`
            Object {
              "data": Object {
                "id": 1,
              },
            }
        `);
    });

    it("getApiUrl", async () => {
        expect(await getApiUrl()).toMatchInlineSnapshot(`""`);
    });

    it("getList", async () => {
        expect(await getList()).toMatchInlineSnapshot(`
            Object {
              "data": Array [],
              "total": 0,
            }
        `);
    });

    it("getMany", async () => {
        expect(await getMany()).toMatchInlineSnapshot(`
            Object {
              "data": Array [],
            }
        `);
    });

    it("getOne", async () => {
        expect(await getOne()).toMatchInlineSnapshot(`
            Object {
              "data": Object {
                "id": 1,
              },
            }
        `);
    });

    it("update", async () => {
        expect(await update()).toMatchInlineSnapshot(`
            Object {
              "data": Object {
                "id": 1,
              },
            }
        `);
    });

    it("updateMany", async () => {
        expect(await updateMany()).toMatchInlineSnapshot(`
            Object {
              "data": Array [],
            }
        `);
    });
});
