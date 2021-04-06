import nock from "nock";

nock("https://readmin-nestjs-crud.pankod.com:443", { encodedQueryParams: true })
    .patch("/posts/7810bbc3-b133-4f85-8c6b-d7806b329f17", {
        title: "updated-title-1",
        content: "updated-content",
        status: "draft",
        category: { id: "aafa2e39-fdba-4987-bfd3-77fca8f76e89" },
        user: { id: "c19675a7-ab4a-48c6-8d35-1d838da3a613" },
    })
    .reply(
        200,
        {
            id: "7810bbc3-b133-4f85-8c6b-d7806b329f17",
            title: "updated-title-1",
            content: "updated-content",
            slug: "updated-title-1",
            status: "draft",
            images: [
                {
                    uid: "rc-upload-mfj7h4fbd4",
                    name: "random-image.jpg",
                    url: "https://picsum.photos/800",
                    type: "image/jpeg",
                    size: 141940,
                    percent: 100,
                    status: "done",
                },
            ],
            createdAt: "2021-04-05T17:21:03.120Z",
            updatedAt: "2021-04-06T07:39:05.928Z",
            category: {
                id: "aafa2e39-fdba-4987-bfd3-77fca8f76e89",
                title: "Haptic Montserrat Automotive",
                createdAt: "2021-04-05T17:21:03.424Z",
                updatedAt: "2021-04-05T17:21:03.424Z",
            },
            user: {
                id: "c19675a7-ab4a-48c6-8d35-1d838da3a613",
                firstName: "Brenna",
                lastName: "Sauer",
                email: "brenna.Sauer0@yahoo.com",
                status: true,
                createdAt: "2021-04-05T17:21:03.040Z",
                updatedAt: "2021-04-05T17:21:03.040Z",
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Tue, 06 Apr 2021 07:40:51 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "778",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "X-Powered-By",
            "Express",
            "ETag",
            'W/"30a-+O2cDU6fSy9H45Vx9eKwD+PryaI"',
        ],
    );
