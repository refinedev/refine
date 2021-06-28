import nock from "nock";

nock("https://api.fake-rest.refine.dev:443", { encodedQueryParams: true })
    .get("/posts")
    .query({ id: ["1", "2", "3"] })
    .reply(
        200,
        [
            {
                id: 1,
                title: "Deleniti et quasi architecto hic quam et tempora vero quo.",
                slug: "nobis-aut-eligendi",
                content:
                    "Accusantium sed nam odio ut non qui. Maxime quaerat sed ducimus corrupti consequatur. Facere numquam ut reprehenderit quaerat quia. Recusandae quibusdam asperiores atque architecto quod praesentium sit non. Aut neque repellat veniam veritatis qui et vel alias debitis. Amet eius omnis dolores. Sint sed magni. Dolor eius maiores asperiores et. Et modi illum eius quisquam maxime at vel qui. Sit dolore officiis aliquid quia labore.",
                categoryId: 20,
                status: "active",
                userId: 16,
                tags: [15, 36, 46],
                image: [],
            },
            {
                id: 2,
                title: "Ea possimus ullam voluptatum blanditiis fugiat odit molestiae et.",
                slug: "excepturi-qui-sed",
                content:
                    "Omnis maiores qui voluptas nihil. Quo natus eum hic aut. Id sit sed sed ut. Ex temporibus autem omnis est quas pariatur. Itaque perferendis sequi nobis dolor rerum quidem qui nostrum nihil. Et debitis eveniet et. Perspiciatis id nobis ut sint voluptatem numquam tempora eveniet. Eius qui quidem temporibus qui explicabo impedit dolor. Fugiat itaque pariatur assumenda molestiae. Et deserunt quibusdam ut tenetur id officia et molestias facilis.",
                categoryId: 21,
                status: "draft",
                userId: 29,
                tags: [9, 34, 43],
                image: [],
            },
            {
                id: 3,
                title: "Debitis sit porro doloribus.",
                slug: "natus-ut-saepe",
                content:
                    "Officiis nostrum consectetur eum repudiandae vitae. Commodi vel atque et eos. Atque voluptas enim et soluta aut ut et natus. Consequatur est excepturi et veritatis rerum non laboriosam consequuntur. Aut dolorum maxime. Deleniti voluptas autem omnis non. Perspiciatis et sunt culpa et. Aperiam eveniet quae qui non explicabo facilis magnam unde non. Voluptatem id nemo ut. Laudantium dolor animi dolores fugit a.",
                categoryId: 11,
                status: "active",
                userId: 21,
                tags: [8, 25, 40],
                image: [],
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Tue, 30 Mar 2021 11:27:50 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "2097",
            "Connection",
            "close",
            "Vary",
            "Accept-Encoding",
            "X-Powered-By",
            "Express",
            "Vary",
            "Origin, Accept-Encoding",
            "Access-Control-Allow-Credentials",
            "true",
            "Cache-Control",
            "no-cache",
            "Pragma",
            "no-cache",
            "Expires",
            "-1",
            "X-Content-Type-Options",
            "nosniff",
            "ETag",
            'W/"831-+k38ZEvs2VHMaQxmi0F3CPf+cgU"',
        ],
    );
