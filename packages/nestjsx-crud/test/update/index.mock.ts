import nock from "nock";

nock("https://readmin-nestjs-crud.pankod.com:443", { encodedQueryParams: true })
    .patch("/posts/6536e986-e500-4933-b154-b51d60d702c2", {
        title: "updated-title",
        content: "updated-content",
        status: "draft",
        category: { id: "ab50ed75-e3df-477c-a8f7-e41b59848e9e" },
        user: { id: "8a6066b6-8034-46a4-af6a-8a84035673c4" },
    })
    .reply(
        200,
        {
            id: "6536e986-e500-4933-b154-b51d60d702c2",
            title: "updated-title",
            content: "updated-content",
            slug: "updated-title",
            status: "draft",
            images: [
                {
                    uid: "rc-upload-gcyg2ny4hz",
                    name: "random-image.jpg",
                    url: "https://picsum.photos/800",
                    type: "image/jpeg",
                    size: 141940,
                    percent: 100,
                    status: "done",
                },
            ],
            createdAt: "2021-04-05T17:21:02.945Z",
            updatedAt: "2021-04-06T07:35:45.835Z",
            category: {
                id: "ab50ed75-e3df-477c-a8f7-e41b59848e9e",
                title: "South Carolina Refined Fresh Ball Channels",
                createdAt: "2021-04-05T17:21:02.998Z",
                updatedAt: "2021-04-05T17:21:02.998Z",
            },
            user: {
                id: "8a6066b6-8034-46a4-af6a-8a84035673c4",
                firstName: "Golda",
                lastName: "Weissnat",
                email: "golda_Weissnat0@hotmail.com",
                status: true,
                createdAt: "2021-04-05T17:21:02.758Z",
                updatedAt: "2021-04-05T17:21:02.758Z",
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Tue, 06 Apr 2021 07:35:45 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "794",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "X-Powered-By",
            "Express",
            "ETag",
            'W/"31a-hL133XV4pAjUOeJnc5calXmsyOg"',
        ],
    );
