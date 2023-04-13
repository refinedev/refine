import dataProvider from "../../src/index";
import client from "../gqlClient";
import "./index.mock";

describe("createMany", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data[0]["title"]).toEqual(
            "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
        expect(data[0]["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );

        expect(data[1]["title"]).toEqual(
            "Etiam tincidunt ex ut auctor faucibus",
        );
        expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
        expect(data[1]["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    category_id: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        });

        expect(data[0]["id"]).toEqual("1b9cd474-eda2-47d4-ac58-8b7b59a91f1f");
        expect(data[1]["id"]).toEqual("62291ce3-5e88-43bb-ae78-cb65dcb143eb");
    });
});

describe("createMany with graphql naming convention", () => {
    it("correct response with meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
            meta: {
                fields: ["id", "title", "content", { category: ["id"] }],
            },
        });

        expect(data[0]["title"]).toEqual(
            "Aenean ultricies non libero sit amet pellentesque",
        );
        expect(data[0]["content"]).toEqual("Vestibulum vulputate sapien arcu.");
        expect(data[0]["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );

        expect(data[1]["title"]).toEqual(
            "Etiam tincidunt ex ut auctor faucibus",
        );
        expect(data[1]["content"]).toEqual("Aliquam nibh erat.");
        expect(data[1]["category"].id).toEqual(
            "317cea5e-fef3-4858-8043-4496e5c7f5ab",
        );
    });

    it("correct response without meta", async () => {
        const { data } = await dataProvider(client, {
            namingConvention: "graphql-default",
        }).createMany!({
            resource: "posts",
            variables: [
                {
                    content: "Vestibulum vulputate sapien arcu.",
                    title: "Aenean ultricies non libero sit amet pellentesque",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
                {
                    content: "Aliquam nibh erat.",
                    title: "Etiam tincidunt ex ut auctor faucibus",
                    categoryId: "317cea5e-fef3-4858-8043-4496e5c7f5ab",
                },
            ],
        });

        expect(data[0]["id"]).toEqual("1b9cd474-eda2-47d4-ac58-8b7b59a91f1f");
        expect(data[1]["id"]).toEqual("62291ce3-5e88-43bb-ae78-cb65dcb143eb");
    });
});
