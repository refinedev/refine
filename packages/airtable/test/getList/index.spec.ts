import dataProvider from "../../src/index";
import "./index.mock";

describe("getList", () => {
    it("correct response", async () => {
        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
        });

        expect(response.data[0]["id"]).toBe("rec9GbXLzd6dxn4Il");
        expect(response.data[0]["title"]).toBe("Hello World 3!");
        expect(response.total).toBe(2);
    });

    it("correct sorting response", async () => {
        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            sort: [
                {
                    field: "title",
                    order: "desc",
                },
            ],
        });

        expect(response.data[0]["id"]).toBe("recLKRioqifTrPUIz");
        expect(response.data[0]["title"]).toBe("Hello World!");
        expect(response.total).toBe(2);
    });

    it("correct equals filter for strings", async () => {
        const filter = {
            operator: "eq",
            field: "title",
            value: "Hello World!",
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must equal exactly string
        expect(response.data[0]["query"]).toBe('AND({title}="Hello World!")');
    });

    it("correct equals filter for numbers", async () => {
        const filter = {
            operator: "eq",
            field: "age",
            value: 100,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must equal exactly number
        expect(response.data[0]["query"]).toBe("AND({age}=100)");
    });

    it("correct not equals filter for strings", async () => {
        const filter = {
            operator: "ne",
            field: "title",
            value: "Hello World!",
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must not equal exactly string
        expect(response.data[0]["query"]).toBe('AND({title}!="Hello World!")');
    });

    it("correct not equals filter for numbers", async () => {
        const filter = {
            operator: "ne",
            field: "age",
            value: 100,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must not equal exactly number
        expect(response.data[0]["query"]).toBe("AND({age}!=100)");
    });

    it("correct less than filter", async () => {
        const filter = {
            operator: "lt",
            field: "age",
            value: 10,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must be less than value (as number)
        expect(response.data[0]["query"]).toBe("AND({age}<10)");
    });

    it("correct less than or equal filter", async () => {
        const filter = {
            operator: "lte",
            field: "age",
            value: 10,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must be less than or equal value (as number)
        expect(response.data[0]["query"]).toBe("AND({age}<=10)");
    });

    it("correct greater than filter", async () => {
        const filter = {
            operator: "gt",
            field: "age",
            value: 10,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must be greater than value (as number)
        expect(response.data[0]["query"]).toBe("AND({age}>10)");
    });

    it("correct greater than or equal filter", async () => {
        const filter = {
            operator: "gte",
            field: "age",
            value: 10,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must be greater than or equal value (as number)
        expect(response.data[0]["query"]).toBe("AND({age}>=10)");
    });

    it("correct contains filter", async () => {
        const filter = {
            operator: "containss",
            field: "title",
            value: "Hello",
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // must find string in {field} - FIND returns non-zero value
        expect(response.data[0]["query"]).toBe('AND(FIND("Hello",{title})!=0)');
    });

    it("correct not contains filter", async () => {
        const filter = {
            operator: "ncontainss",
            field: "title",
            value: "Hello",
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // must not find string in {field} - FIND returns zero
        expect(response.data[0]["query"]).toBe('AND(FIND("Hello",{title})=0)');
    });

    it("correct case-insensitive contains filter", async () => {
        const filter = {
            operator: "contains",
            field: "title",
            value: "Hello",
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // must find lower-cased string in lower-cased {field} - lower-casing both values makes it case-insensitive
        expect(response.data[0]["query"]).toBe(
            'AND(FIND(LOWER("Hello"),LOWER({title}))!=0)',
        );
    });

    it("correct case-insensitive not contains filter", async () => {
        const filter = {
            operator: "ncontains",
            field: "title",
            value: "Hello",
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // must not find lower-cased string in lower-cased {field} - lower-casing both values makes it case-insensitive
        expect(response.data[0]["query"]).toBe(
            'AND(FIND(LOWER("Hello"),LOWER({title}))=0)',
        );
    });

    it("correct truthy null filter", async () => {
        const filter = {
            operator: "null",
            field: "title",
            value: true,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must be null (blank)
        expect(response.data[0]["query"]).toBe("AND({title}=BLANK())");
    });

    it("correct falsy null filter", async () => {
        const filter = {
            operator: "null",
            field: "title",
            value: false,
        } as const;

        const response = await dataProvider(
            "keywoytODSr6xAqfg",
            "appKYl1H4k9g73sBT",
        ).getList({
            resource: "posts",
            filters: [filter],
        });

        expect(response.total).toBe(1);
        // {field} must not be null (blank)
        expect(response.data[0]["query"]).toBe("AND({title}!=BLANK())");
    });
});
