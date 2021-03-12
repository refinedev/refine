import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

import JsonServer from "@dataProviders/jsonServer";

export const posts = [
    {
        id: 1,
        title:
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        slug: "ut-ad-et",
        content:
            "Cupiditate labore quaerat cum incidunt vel et consequatur modi illo. Et maxime aut commodi occaecati omnis. Est voluptatem quibusdam aliquam. Esse tenetur omnis eaque. Consequatur necessitatibus illum ipsum aspernatur architecto qui. Ut temporibus qui nobis. Reiciendis est magnam ipsa quasi dolor ipsa error. Et eaque cumque est. Eos et odit corporis delectus aut corrupti tempora velit. Perferendis ratione voluptas corrupti id temporibus nam.",
        categoryId: 1,
        status: "active",
        userId: 5,
        tags: [16, 31, 45],
    },
    {
        id: 2,
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

export const categories = [
    {
        id: 8,
        title: "Account",
    },
    {
        id: 39,
        title: "Account Division Pci",
    },
    {
        id: 22,
        title: "Alarm Designer Enable",
    },
    {
        id: 28,
        title: "Analyst Com",
    },
];

export const MockJSONServer = JsonServer(
    "https://readmin-fake-rest.pankod.com",
);

export const createMockServer = (): SetupServerApi =>
    setupServer(
        rest.get(
            "https://readmin-fake-rest.pankod.com/posts",
            (_req, res, ctx) => {
                return res(
                    ctx.json(posts),
                    ctx.set("x-total-count", posts.length.toString()),
                );
            },
        ),
        rest.get(
            "https://readmin-fake-rest.pankod.com/posts/1",
            (_req, res, ctx) => {
                return res(
                    ctx.json(posts[0]),
                    ctx.set("x-total-count", posts.length.toString()),
                );
            },
        ),
        rest.get(
            "https://readmin-fake-rest.pankod.com/categories",
            (_req, res, ctx) => {
                return res(
                    ctx.json(categories),
                    ctx.set("x-total-count", categories.length.toString()),
                );
            },
        ),
        rest.post(
            "https://readmin-fake-rest.pankod.com/posts",
            (_req, res, ctx) => {
                return res(ctx.json(posts[0]));
            },
        ),
    );
