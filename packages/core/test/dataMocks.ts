import { IDataContext, Revision } from "../src/interfaces";

export const posts = [
    {
        id: "1",
        title: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        slug: "ut-ad-et",
        content:
            "Cupiditate labore quaerat cum incidunt vel et consequatur modi illo. Et maxime aut commodi occaecati omnis. Est voluptatem quibusdam aliquam. Esse tenetur omnis eaque. Consequatur necessitatibus illum ipsum aspernatur architecto qui. Ut temporibus qui nobis. Reiciendis est magnam ipsa quasi dolor ipsa error. Et eaque cumque est. Eos et odit corporis delectus aut corrupti tempora velit. Perferendis ratione voluptas corrupti id temporibus nam.",
        categoryId: 1,
        status: "active",
        userId: 5,
        tags: [16, 31, 45],
    },
    {
        id: "2",
        title: "Recusandae consectetur aut atque est.",
        slug: "consequatur-molestiae-rerum",
        content:
            "Quia ut autem. Hic dolorum magni est quisquam. Modi est id et est. Est sapiente velit iure non voluptatem natus enim. Distinctio ipsa repellendus est. Sunt ipsam dignissimos vero error est cumque eaque. Consequatur voluptas suscipit optio incidunt doloremque quia harum harum. Totam voluptatibus aperiam quia. Est omnis deleniti et aut at fugit temporibus debitis modi. Magni aut vel quod magnam.",
        categoryId: 38,
        status: "active",
        userId: 36,
        tags: [16, 30, 46],
    },
];

const revisions: Revision[] = [
    {
        id: "1",
        action: "create",
        date: "2021-06-07T11:16:05.808Z",
        resource: "posts",
        user: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
        },
    },
    {
        id: "2",
        action: "edit",
        date: "2021-06-08T11:16:05.808Z",
        resource: "posts",
        user: {
            id: "2",
            firstName: "Jane",
            lastName: "Doe",
        },
    },
];

const MockDataProvider = () => {
    return {
        create: () => Promise.resolve({ data: posts[0] }),
        createMany: () => Promise.resolve({ data: posts }),
        deleteOne: () => Promise.resolve({ data: posts[0] }),
        deleteMany: () => Promise.resolve({ data: [] }),
        getList: () => Promise.resolve({ data: posts, total: 2 }),
        getMany: () => Promise.resolve({ data: [...posts] }),
        getOne: () => Promise.resolve({ data: posts[0] }),
        update: () => Promise.resolve({ data: posts[0] }),
        updateMany: () => Promise.resolve({ data: [] }),
        getApiUrl: () => "https://refine-fake-rest.pankod.com",
        custom: () => Promise.resolve({ data: [...posts] }),
        revisions: () => Promise.resolve({ data: [...revisions] }),
    };
};

export const MockJSONServer = MockDataProvider() as IDataContext;
