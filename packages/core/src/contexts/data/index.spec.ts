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
            {
              "data": {
                "id": 1,
              },
            }
        `);
    });

    it("createMany", async () => {
        expect(await createMany()).toMatchInlineSnapshot(`
            {
              "data": [],
            }
        `);
    });

    it("custom", async () => {
        expect(await custom()).toMatchInlineSnapshot(`
            {
              "data": {},
            }
        `);
    });

    it("deleteMany", async () => {
        expect(await deleteMany()).toMatchInlineSnapshot(`
            {
              "data": [],
            }
        `);
    });

    it("deleteOne", async () => {
        expect(await deleteOne()).toMatchInlineSnapshot(`
            {
              "data": {
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
            {
              "data": [],
              "total": 0,
            }
        `);
    });

    it("getMany", async () => {
        expect(await getMany()).toMatchInlineSnapshot(`
            {
              "data": [],
            }
        `);
    });

    it("getOne", async () => {
        expect(await getOne()).toMatchInlineSnapshot(`
            {
              "data": {
                "id": 1,
              },
            }
        `);
    });

    it("update", async () => {
        expect(await update()).toMatchInlineSnapshot(`
            {
              "data": {
                "id": 1,
              },
            }
        `);
    });

    it("updateMany", async () => {
        expect(await updateMany()).toMatchInlineSnapshot(`
            {
              "data": [],
            }
        `);
    });
});
