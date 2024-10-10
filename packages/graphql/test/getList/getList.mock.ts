import nock from "nock";

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: { filter: {}, paging: { limit: 10, offset: 0 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Minus et omnis praesentium nisi animi pariatur magnam.",
              status: "PUBLISHED",
            },
            {
              id: "2",
              title: "Cumque aliquam porro iure id reiciendis.",
              status: "REJECTED",
            },
            {
              id: "3",
              title:
                "Sit eligendi corrupti aliquid sunt corporis repellat soluta illum deleniti.",
              status: "DRAFT",
            },
            {
              id: "4",
              title: "Beatae quis laborum illo officiis facere.",
              status: "DRAFT",
            },
            {
              id: "5",
              title: "Rerum vitae soluta impedit id dicta nisi fugiat.",
              status: "REJECTED",
            },
            {
              id: "6",
              title:
                "Laudantium accusantium cum quasi vero odit deleniti ipsum.",
              status: "REJECTED",
            },
            {
              id: "7",
              title: "Placeat at perferendis tenetur voluptatibus doloremque.",
              status: "REJECTED",
            },
            {
              id: "8",
              title:
                "Inventore natus possimus quos dolores eveniet laborum beatae.",
              status: "DRAFT",
            },
            { id: "9", title: "Ullam iusto sunt deleniti.", status: "DRAFT" },
            {
              id: "10",
              title: "Exercitationem eius cum tempora quo itaque amet.",
              status: "DRAFT",
            },
          ],
          totalCount: 507,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "965",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:51 GMT",
      etag: 'W/"3c5-irDxNokQl6IVzWsK68tl3SsPe04"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: { filter: {}, paging: { limit: 10, offset: 10 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "11",
              title:
                "Eligendi voluptatem eius sed ullam consectetur dolorum occaecati cupiditate.",
              status: "REJECTED",
            },
            {
              id: "12",
              title:
                "Distinctio reiciendis quaerat cum possimus eligendi veniam laudantium debitis.",
              status: "REJECTED",
            },
            {
              id: "13",
              title: "Sunt ducimus autem voluptatibus veritatis itaque.",
              status: "DRAFT",
            },
            {
              id: "14",
              title: "Recusandae asperiores ea eos corrupti.",
              status: "REJECTED",
            },
            {
              id: "15",
              title: "Id perspiciatis minus sequi provident.",
              status: "REJECTED",
            },
            { id: "16", title: "Autem maxime nostrum.", status: "DRAFT" },
            {
              id: "17",
              title: "Recusandae debitis itaque et dicta vel magni veniam.",
              status: "REJECTED",
            },
            {
              id: "18",
              title: "Nam itaque modi ducimus nesciunt qui.",
              status: "PUBLISHED",
            },
            {
              id: "19",
              title: "Aliquam inventore neque deserunt dicta recusandae sequi.",
              status: "DRAFT",
            },
            { id: "20", title: "Hic eum nostrum.", status: "DRAFT" },
          ],
          totalCount: 507,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "932",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:51 GMT",
      etag: 'W/"3a4-As1kkl2Xws7gllCsOzKKRmzhzcI"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: { filter: {}, paging: { limit: 2, offset: 0 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Minus et omnis praesentium nisi animi pariatur magnam.",
              status: "PUBLISHED",
            },
            {
              id: "2",
              title: "Cumque aliquam porro iure id reiciendis.",
              status: "REJECTED",
            },
          ],
          totalCount: 507,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "231",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:51 GMT",
      etag: 'W/"e7-CtJAhqoT+xSRKnjLqXI0a0G72LU"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: { filter: {}, paging: { limit: 2147483647 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Minus et omnis praesentium nisi animi pariatur magnam.",
              status: "PUBLISHED",
            },
            {
              id: "2",
              title: "Cumque aliquam porro iure id reiciendis.",
              status: "REJECTED",
            },
            {
              id: "3",
              title:
                "Sit eligendi corrupti aliquid sunt corporis repellat soluta illum deleniti.",
              status: "DRAFT",
            },
            {
              id: "4",
              title: "Beatae quis laborum illo officiis facere.",
              status: "DRAFT",
            },
            {
              id: "5",
              title: "Rerum vitae soluta impedit id dicta nisi fugiat.",
              status: "REJECTED",
            },
            {
              id: "6",
              title:
                "Laudantium accusantium cum quasi vero odit deleniti ipsum.",
              status: "REJECTED",
            },
            {
              id: "7",
              title: "Placeat at perferendis tenetur voluptatibus doloremque.",
              status: "REJECTED",
            },
            {
              id: "8",
              title:
                "Inventore natus possimus quos dolores eveniet laborum beatae.",
              status: "DRAFT",
            },
            { id: "9", title: "Ullam iusto sunt deleniti.", status: "DRAFT" },
            {
              id: "10",
              title: "Exercitationem eius cum tempora quo itaque amet.",
              status: "DRAFT",
            },
            {
              id: "11",
              title:
                "Eligendi voluptatem eius sed ullam consectetur dolorum occaecati cupiditate.",
              status: "REJECTED",
            },
            {
              id: "12",
              title:
                "Distinctio reiciendis quaerat cum possimus eligendi veniam laudantium debitis.",
              status: "REJECTED",
            },
            {
              id: "13",
              title: "Sunt ducimus autem voluptatibus veritatis itaque.",
              status: "DRAFT",
            },
            {
              id: "14",
              title: "Recusandae asperiores ea eos corrupti.",
              status: "REJECTED",
            },
            {
              id: "15",
              title: "Id perspiciatis minus sequi provident.",
              status: "REJECTED",
            },
            { id: "16", title: "Autem maxime nostrum.", status: "DRAFT" },
            {
              id: "17",
              title: "Recusandae debitis itaque et dicta vel magni veniam.",
              status: "REJECTED",
            },
            {
              id: "18",
              title: "Nam itaque modi ducimus nesciunt qui.",
              status: "PUBLISHED",
            },
            {
              id: "19",
              title: "Aliquam inventore neque deserunt dicta recusandae sequi.",
              status: "DRAFT",
            },
            { id: "20", title: "Hic eum nostrum.", status: "DRAFT" },
            {
              id: "21",
              title:
                "Nobis ad eligendi perspiciatis tempora impedit temporibus eius.",
              status: "REJECTED",
            },
            { id: "22", title: "Vero asperiores natus.", status: "DRAFT" },
            {
              id: "23",
              title:
                "Sapiente error voluptatibus quasi in error assumenda suscipit nihil.",
              status: "PUBLISHED",
            },
            {
              id: "24",
              title: "Magnam odit fuga officia ipsam illum sunt similique.",
              status: "DRAFT",
            },
            {
              id: "25",
              title:
                "Consequatur debitis omnis corrupti provident doloremque consectetur.",
              status: "REJECTED",
            },
            {
              id: "26",
              title: "Laboriosam neque nisi a facere eum sint.",
              status: "DRAFT",
            },
            {
              id: "27",
              title: "Officiis quam quos ducimus.",
              status: "PUBLISHED",
            },
            {
              id: "28",
              title: "Quasi sequi sit sequi aspernatur.",
              status: "DRAFT",
            },
            {
              id: "29",
              title:
                "Ab consequatur ea repudiandae reiciendis qui et deleniti repudiandae quidem.",
              status: "DRAFT",
            },
            {
              id: "30",
              title:
                "Laboriosam corporis architecto incidunt eveniet omnis iusto dolor.",
              status: "REJECTED",
            },
            {
              id: "31",
              title: "In sequi neque aliquid cupiditate eaque nam.",
              status: "REJECTED",
            },
            {
              id: "32",
              title: "Dolorem accusantium dolorem.",
              status: "REJECTED",
            },
            {
              id: "33",
              title: "Odio exercitationem aliquam eum eaque aliquam.",
              status: "DRAFT",
            },
            {
              id: "34",
              title:
                "Illum iste error dolores asperiores eligendi commodi reiciendis quam.",
              status: "PUBLISHED",
            },
            {
              id: "35",
              title: "Cumque quidem corrupti eligendi atque quisquam ipsum.",
              status: "DRAFT",
            },
            {
              id: "36",
              title: "Similique eveniet ea cumque.",
              status: "DRAFT",
            },
            {
              id: "37",
              title:
                "Repudiandae vitae sequi ducimus libero velit maxime facere.",
              status: "DRAFT",
            },
            {
              id: "38",
              title: "Dolores vero distinctio libero porro soluta.",
              status: "PUBLISHED",
            },
            {
              id: "39",
              title: "Ex ea molestiae numquam nam.",
              status: "DRAFT",
            },
            {
              id: "40",
              title:
                "Sint molestias temporibus asperiores autem impedit perspiciatis.",
              status: "DRAFT",
            },
            {
              id: "41",
              title: "Quaerat expedita quo tenetur.",
              status: "REJECTED",
            },
            {
              id: "42",
              title: "Perspiciatis minus dignissimos doloremque consequuntur.",
              status: "DRAFT",
            },
            {
              id: "58",
              title: "Quasi rerum iure id atque iusto illo illo.",
              status: "DRAFT",
            },
            {
              id: "43",
              title:
                "Excepturi officiis perferendis dolore quas porro quo iusto.",
              status: "PUBLISHED",
            },
            { id: "44", title: "Maxime aut quas.", status: "DRAFT" },
            {
              id: "45",
              title: "Quibusdam enim eveniet quaerat.",
              status: "PUBLISHED",
            },
            {
              id: "46",
              title: "Voluptatem suscipit reiciendis accusantium porro.",
              status: "DRAFT",
            },
            {
              id: "47",
              title: "Laboriosam suscipit molestiae quibusdam et possimus.",
              status: "REJECTED",
            },
            { id: "48", title: "Quia quidem sunt.", status: "REJECTED" },
            {
              id: "49",
              title:
                "Consectetur tenetur fugit rem commodi eveniet itaque culpa facilis voluptatem.",
              status: "DRAFT",
            },
            {
              id: "50",
              title: "Consequuntur amet voluptas veniam.",
              status: "PUBLISHED",
            },
            {
              id: "51",
              title: "Maxime repellendus temporibus.",
              status: "PUBLISHED",
            },
            {
              id: "52",
              title: "Quas quam temporibus ratione porro minus culpa.",
              status: "REJECTED",
            },
            { id: "53", title: "Illo iste corporis iusto.", status: "DRAFT" },
            {
              id: "54",
              title:
                "Voluptatibus doloribus molestias quaerat veritatis animi.",
              status: "PUBLISHED",
            },
            {
              id: "55",
              title: "Quisquam deleniti libero.",
              status: "REJECTED",
            },
            { id: "56", title: "Quis at facere.", status: "DRAFT" },
            {
              id: "57",
              title:
                "Vero accusantium sint unde iure distinctio nisi laudantium laudantium enim.",
              status: "DRAFT",
            },
            {
              id: "59",
              title: "Officia eum iste inventore enim debitis incidunt veniam.",
              status: "REJECTED",
            },
            {
              id: "60",
              title: "Optio porro corrupti veniam culpa cumque.",
              status: "REJECTED",
            },
            {
              id: "61",
              title: "Reiciendis ab velit itaque ea nesciunt.",
              status: "DRAFT",
            },
            {
              id: "62",
              title:
                "Nulla repellat sapiente voluptatibus corporis nam doloremque.",
              status: "DRAFT",
            },
            {
              id: "63",
              title: "Ea sunt fugit iure eaque.",
              status: "PUBLISHED",
            },
            { id: "64", title: "Repellat sint cumque illo.", status: "DRAFT" },
            {
              id: "65",
              title: "Aperiam doloribus aliquid aut nesciunt.",
              status: "PUBLISHED",
            },
            {
              id: "66",
              title:
                "Iusto accusantium ea cupiditate sapiente cum iusto facilis quibusdam.",
              status: "PUBLISHED",
            },
            {
              id: "67",
              title: "Ad eaque ratione iure porro.",
              status: "REJECTED",
            },
            {
              id: "68",
              title: "Ducimus enim rem debitis cum fugit harum.",
              status: "DRAFT",
            },
            {
              id: "69",
              title:
                "Beatae maxime vitae aperiam nesciunt placeat quis consectetur mollitia.",
              status: "REJECTED",
            },
            {
              id: "70",
              title:
                "Odit doloremque ducimus voluptate enim adipisci temporibus delectus maxime.",
              status: "DRAFT",
            },
            {
              id: "71",
              title: "In repellendus illo voluptatibus accusamus.",
              status: "REJECTED",
            },
            {
              id: "72",
              title:
                "Expedita ratione delectus porro maxime totam necessitatibus odit reprehenderit.",
              status: "PUBLISHED",
            },
            {
              id: "73",
              title:
                "Consequuntur saepe enim ipsa dolorem quod cumque perspiciatis.",
              status: "REJECTED",
            },
            {
              id: "74",
              title: "Magni repudiandae rerum similique.",
              status: "DRAFT",
            },
            { id: "75", title: "Delectus atque debitis.", status: "DRAFT" },
            {
              id: "76",
              title:
                "Ex voluptates delectus incidunt error corrupti odio dolore.",
              status: "REJECTED",
            },
            {
              id: "77",
              title: "Rerum sit maiores corporis sed.",
              status: "DRAFT",
            },
            {
              id: "78",
              title:
                "Tempora aliquam accusamus magni nihil repudiandae corporis illum mollitia doloribus.",
              status: "REJECTED",
            },
            {
              id: "79",
              title: "Error similique enim dignissimos velit culpa eius.",
              status: "DRAFT",
            },
            {
              id: "80",
              title: "Maiores itaque aliquam aspernatur ad facere inventore.",
              status: "DRAFT",
            },
            {
              id: "81",
              title: "Ipsum aliquid delectus vero beatae natus amet.",
              status: "DRAFT",
            },
            {
              id: "82",
              title: "Possimus perferendis delectus rerum quaerat facere quia.",
              status: "REJECTED",
            },
            {
              id: "83",
              title: "Adipisci quasi repudiandae nesciunt odit ullam.",
              status: "PUBLISHED",
            },
            {
              id: "84",
              title:
                "Amet nesciunt laudantium quibusdam optio numquam placeat.",
              status: "PUBLISHED",
            },
            {
              id: "85",
              title:
                "Facilis delectus repellendus vitae dolores architecto quod assumenda.",
              status: "DRAFT",
            },
            { id: "86", title: "Debitis repellat dolorum.", status: "DRAFT" },
            {
              id: "87",
              title: "Quos ipsa libero libero ipsum sed occaecati fugit.",
              status: "DRAFT",
            },
            {
              id: "274",
              title: "Exercitationem iusto exercitationem illo enim.",
              status: "PUBLISHED",
            },
            {
              id: "88",
              title: "Facere accusamus culpa ea recusandae.",
              status: "PUBLISHED",
            },
            {
              id: "89",
              title: "Deleniti iste natus nobis nemo.",
              status: "PUBLISHED",
            },
            {
              id: "90",
              title: "Repudiandae numquam molestiae incidunt.",
              status: "PUBLISHED",
            },
            {
              id: "91",
              title: "Ipsum amet reprehenderit ullam ab dicta.",
              status: "DRAFT",
            },
            {
              id: "92",
              title: "Facere sequi accusantium nam.",
              status: "DRAFT",
            },
            { id: "93", title: "Suscipit quo eos.", status: "DRAFT" },
            {
              id: "94",
              title:
                "Itaque dolorum repellat dignissimos minima ex iure architecto.",
              status: "PUBLISHED",
            },
            {
              id: "95",
              title:
                "In exercitationem aut aliquid repellendus recusandae modi explicabo saepe sapiente.",
              status: "PUBLISHED",
            },
            {
              id: "96",
              title: "Qui laudantium non eveniet enim rem at sed minima.",
              status: "PUBLISHED",
            },
            {
              id: "97",
              title: "Eos aperiam eius minima alias.",
              status: "REJECTED",
            },
            {
              id: "98",
              title:
                "Numquam distinctio corrupti velit quam incidunt perspiciatis accusantium molestias.",
              status: "DRAFT",
            },
            {
              id: "99",
              title: "Numquam blanditiis voluptatum.",
              status: "DRAFT",
            },
            { id: "100", title: "Eaque odit eligendi.", status: "PUBLISHED" },
            {
              id: "101",
              title:
                "Quam blanditiis delectus quo dicta eius aspernatur dicta architecto.",
              status: "PUBLISHED",
            },
            { id: "505", title: "foo", status: "DRAFT" },
            {
              id: "102",
              title:
                "Repudiandae sunt cupiditate quas nemo distinctio officia.",
              status: "REJECTED",
            },
            {
              id: "103",
              title: "Assumenda excepturi maiores.",
              status: "REJECTED",
            },
            { id: "104", title: "Natus et alias.", status: "PUBLISHED" },
            {
              id: "105",
              title:
                "Dolorum numquam perspiciatis voluptatem rerum accusamus illum temporibus tempora.",
              status: "DRAFT",
            },
            {
              id: "106",
              title: "Esse assumenda nostrum tempora.",
              status: "DRAFT",
            },
            {
              id: "107",
              title:
                "Illo aspernatur dignissimos ex sapiente reiciendis porro quos corporis.",
              status: "DRAFT",
            },
            { id: "108", title: "Dolor unde eaque.", status: "DRAFT" },
            {
              id: "109",
              title:
                "Ipsam itaque impedit labore eligendi facere recusandae suscipit sed.",
              status: "PUBLISHED",
            },
            {
              id: "110",
              title:
                "In dolores aspernatur temporibus quasi non incidunt nulla temporibus incidunt.",
              status: "REJECTED",
            },
            {
              id: "111",
              title: "Libero ex commodi magni eius autem.",
              status: "REJECTED",
            },
            { id: "112", title: "Provident ea quos atque.", status: "DRAFT" },
            {
              id: "113",
              title: "Facere similique quia ipsa nobis.",
              status: "PUBLISHED",
            },
            {
              id: "114",
              title: "Natus molestiae ut quidem quia ut.",
              status: "PUBLISHED",
            },
            {
              id: "115",
              title: "Aperiam commodi ipsum repudiandae iste tempore.",
              status: "REJECTED",
            },
            { id: "506", title: "foo", status: "DRAFT" },
            {
              id: "116",
              title: "Consequatur optio harum fugit eius.",
              status: "REJECTED",
            },
            {
              id: "117",
              title: "Voluptatem distinctio dolore molestias.",
              status: "REJECTED",
            },
            {
              id: "118",
              title: "Deserunt ut quod temporibus perspiciatis.",
              status: "DRAFT",
            },
            {
              id: "119",
              title:
                "Deserunt eveniet nulla veritatis incidunt exercitationem voluptates totam itaque repellat.",
              status: "DRAFT",
            },
            {
              id: "120",
              title:
                "Delectus necessitatibus repellat ipsa molestiae magnam voluptate.",
              status: "DRAFT",
            },
            {
              id: "121",
              title: "Corporis voluptates fugit.",
              status: "PUBLISHED",
            },
            {
              id: "122",
              title:
                "Expedita distinctio voluptatum sit ducimus ab doloribus cupiditate.",
              status: "PUBLISHED",
            },
            {
              id: "123",
              title:
                "Quia dolor dolores quam libero labore rem sapiente magnam praesentium.",
              status: "DRAFT",
            },
            {
              id: "124",
              title: "Rerum nisi soluta neque placeat labore ea.",
              status: "DRAFT",
            },
            {
              id: "125",
              title:
                "Quisquam consequatur ullam optio et delectus iste eum veritatis.",
              status: "PUBLISHED",
            },
            {
              id: "126",
              title: "Quod explicabo ullam impedit.",
              status: "DRAFT",
            },
            {
              id: "127",
              title: "Laboriosam ipsam dolorem fuga.",
              status: "PUBLISHED",
            },
            { id: "128", title: "Adipisci ipsa tempore.", status: "DRAFT" },
            {
              id: "129",
              title: "Magnam sunt consequatur maiores velit inventore qui.",
              status: "REJECTED",
            },
            { id: "507", title: "foo", status: "DRAFT" },
            {
              id: "130",
              title:
                "Eum odio debitis omnis eius ipsum minus delectus dolores.",
              status: "REJECTED",
            },
            {
              id: "131",
              title: "Rem animi vitae fugiat qui.",
              status: "DRAFT",
            },
            {
              id: "132",
              title:
                "Laborum exercitationem iure voluptatum nihil maxime quos facilis.",
              status: "DRAFT",
            },
            {
              id: "133",
              title: "Minima ipsam voluptate.",
              status: "PUBLISHED",
            },
            {
              id: "134",
              title:
                "Laboriosam laudantium deleniti aspernatur delectus asperiores beatae.",
              status: "DRAFT",
            },
            {
              id: "135",
              title:
                "Explicabo consectetur alias velit corrupti voluptates voluptas repellat.",
              status: "PUBLISHED",
            },
            {
              id: "136",
              title:
                "Dolorum porro ullam saepe cumque earum deleniti esse debitis.",
              status: "REJECTED",
            },
            {
              id: "137",
              title:
                "Incidunt rem pariatur atque at iste optio necessitatibus similique.",
              status: "PUBLISHED",
            },
            {
              id: "138",
              title: "Aliquid iste ad quisquam repudiandae.",
              status: "PUBLISHED",
            },
            {
              id: "139",
              title: "Fuga vero non quia assumenda eaque est.",
              status: "DRAFT",
            },
            {
              id: "140",
              title:
                "Distinctio maxime praesentium autem consectetur dignissimos.",
              status: "DRAFT",
            },
            { id: "141", title: "Amet magni eius.", status: "PUBLISHED" },
            {
              id: "142",
              title:
                "Repudiandae dolorum earum quis asperiores neque quis tenetur architecto.",
              status: "REJECTED",
            },
            {
              id: "143",
              title: "Saepe necessitatibus sequi.",
              status: "DRAFT",
            },
            {
              id: "144",
              title: "Numquam odio laboriosam vel.",
              status: "DRAFT",
            },
            {
              id: "145",
              title: "Nihil laboriosam occaecati incidunt doloribus.",
              status: "DRAFT",
            },
            {
              id: "146",
              title:
                "Suscipit id magnam laboriosam laboriosam distinctio ipsum modi sint.",
              status: "REJECTED",
            },
            {
              id: "147",
              title: "Corrupti deleniti in iure porro dolore occaecati cum.",
              status: "REJECTED",
            },
            {
              id: "148",
              title: "Quidem impedit reiciendis animi sapiente perspiciatis.",
              status: "PUBLISHED",
            },
            {
              id: "149",
              title: "Ipsa natus consequuntur architecto corrupti fugit.",
              status: "DRAFT",
            },
            {
              id: "150",
              title: "Blanditiis earum delectus corporis sed eveniet.",
              status: "PUBLISHED",
            },
            {
              id: "151",
              title: "Quos fugit fugiat necessitatibus.",
              status: "DRAFT",
            },
            { id: "152", title: "Iusto hic eaque voluptas.", status: "DRAFT" },
            {
              id: "153",
              title: "Nam perspiciatis modi minus.",
              status: "PUBLISHED",
            },
            {
              id: "154",
              title:
                "Recusandae odit suscipit eius eveniet itaque nisi laboriosam optio quidem.",
              status: "PUBLISHED",
            },
            {
              id: "155",
              title: "Praesentium totam nisi vitae praesentium quisquam.",
              status: "PUBLISHED",
            },
            {
              id: "156",
              title:
                "Ex itaque veniam eveniet magnam accusamus quo cumque expedita.",
              status: "REJECTED",
            },
            {
              id: "157",
              title: "Dolore quaerat optio dolores eius non.",
              status: "DRAFT",
            },
            { id: "158", title: "Ad iusto odio minus.", status: "REJECTED" },
            {
              id: "159",
              title: "Numquam id perferendis totam ipsa.",
              status: "DRAFT",
            },
            {
              id: "160",
              title: "Alias tempora voluptate explicabo omnis explicabo.",
              status: "PUBLISHED",
            },
            {
              id: "161",
              title: "Ex temporibus quis quas.",
              status: "REJECTED",
            },
            {
              id: "162",
              title:
                "Modi expedita facilis esse necessitatibus praesentium asperiores natus sint unde.",
              status: "DRAFT",
            },
            {
              id: "163",
              title:
                "Cumque repudiandae dignissimos nobis quis reiciendis magni nam ex incidunt.",
              status: "REJECTED",
            },
            {
              id: "164",
              title:
                "Similique quaerat porro eos necessitatibus alias reiciendis.",
              status: "PUBLISHED",
            },
            {
              id: "165",
              title: "Dolores quibusdam dolorem sed et rerum officia quas.",
              status: "DRAFT",
            },
            {
              id: "166",
              title: "Possimus quo nostrum veritatis.",
              status: "DRAFT",
            },
            { id: "167", title: "Non illo facere.", status: "DRAFT" },
            {
              id: "168",
              title:
                "Animi est accusamus vel consequuntur aperiam aliquam fuga.",
              status: "REJECTED",
            },
            {
              id: "169",
              title: "Ratione praesentium deleniti enim.",
              status: "REJECTED",
            },
            {
              id: "170",
              title:
                "Necessitatibus voluptate iusto doloremque odio in soluta illum enim.",
              status: "DRAFT",
            },
            {
              id: "171",
              title: "Alias quidem id dolor eius optio.",
              status: "PUBLISHED",
            },
            {
              id: "172",
              title: "Minus molestias quasi blanditiis rem.",
              status: "PUBLISHED",
            },
            {
              id: "173",
              title:
                "Esse magnam quibusdam labore cumque corrupti placeat quidem dolore.",
              status: "DRAFT",
            },
            {
              id: "174",
              title: "Expedita libero natus quia libero.",
              status: "REJECTED",
            },
            {
              id: "175",
              title: "Est nemo temporibus eveniet debitis maiores velit aut.",
              status: "REJECTED",
            },
            {
              id: "176",
              title:
                "Nulla necessitatibus nulla cum amet nesciunt id nesciunt adipisci.",
              status: "PUBLISHED",
            },
            {
              id: "177",
              title: "Illum reiciendis neque natus ut id quod.",
              status: "PUBLISHED",
            },
            {
              id: "178",
              title: "Aliquid iste provident recusandae id.",
              status: "REJECTED",
            },
            {
              id: "179",
              title:
                "Omnis voluptate ipsum ullam officia quisquam perspiciatis distinctio tenetur.",
              status: "PUBLISHED",
            },
            {
              id: "180",
              title: "Beatae unde officiis numquam.",
              status: "PUBLISHED",
            },
            {
              id: "181",
              title:
                "Autem quidem doloribus laudantium quisquam autem explicabo consequuntur ipsam.",
              status: "PUBLISHED",
            },
            {
              id: "182",
              title:
                "Labore non nobis delectus minima alias amet dolorem sapiente esse.",
              status: "REJECTED",
            },
            {
              id: "183",
              title: "Vel sapiente ut quis et cupiditate inventore.",
              status: "PUBLISHED",
            },
            {
              id: "184",
              title:
                "Enim quisquam incidunt minus ex ratione odit excepturi pariatur molestias.",
              status: "DRAFT",
            },
            {
              id: "185",
              title: "Placeat architecto inventore.",
              status: "REJECTED",
            },
            {
              id: "186",
              title: "Eos accusantium ab exercitationem magnam.",
              status: "DRAFT",
            },
            {
              id: "187",
              title: "Autem omnis cupiditate rem harum voluptatem repellendus.",
              status: "DRAFT",
            },
            {
              id: "188",
              title: "Vel commodi fugit expedita excepturi.",
              status: "REJECTED",
            },
            {
              id: "189",
              title:
                "Odio porro ducimus eos deleniti quibusdam quod necessitatibus a nostrum.",
              status: "REJECTED",
            },
            {
              id: "190",
              title:
                "Reprehenderit nemo corporis harum voluptatem facere fugit.",
              status: "PUBLISHED",
            },
            { id: "191", title: "Rerum iste iste velit.", status: "DRAFT" },
            {
              id: "192",
              title: "Numquam perspiciatis ad accusantium voluptatibus.",
              status: "DRAFT",
            },
            {
              id: "193",
              title:
                "Impedit aut amet maiores nihil officia minus minus dolor commodi.",
              status: "REJECTED",
            },
            { id: "194", title: "Accusantium optio quos.", status: "REJECTED" },
            { id: "195", title: "Dolorum autem quae quia.", status: "DRAFT" },
            { id: "196", title: "Odit blanditiis repellat.", status: "DRAFT" },
            {
              id: "197",
              title:
                "Similique ipsam a incidunt placeat at necessitatibus magni.",
              status: "DRAFT",
            },
            {
              id: "198",
              title: "Consequatur fugiat ut assumenda veniam.",
              status: "PUBLISHED",
            },
            {
              id: "199",
              title: "Provident nesciunt expedita eveniet velit.",
              status: "REJECTED",
            },
            {
              id: "200",
              title: "Nisi aut provident deserunt.",
              status: "DRAFT",
            },
            {
              id: "201",
              title: "Accusantium odio laboriosam sequi.",
              status: "PUBLISHED",
            },
            {
              id: "202",
              title:
                "Nam laboriosam veritatis fugit omnis velit excepturi aliquid.",
              status: "REJECTED",
            },
            {
              id: "203",
              title:
                "Doloremque at ipsam harum voluptatum incidunt nesciunt tenetur.",
              status: "REJECTED",
            },
            {
              id: "204",
              title:
                "Ipsam id voluptatibus tempora repellat occaecati sapiente magnam cumque dolorem.",
              status: "REJECTED",
            },
            {
              id: "205",
              title:
                "Ipsum fugit quam ipsum reiciendis molestiae molestiae aspernatur.",
              status: "PUBLISHED",
            },
            {
              id: "206",
              title:
                "Minima error optio et reiciendis quo aut voluptatum maxime odit.",
              status: "PUBLISHED",
            },
            {
              id: "207",
              title: "Doloremque nisi necessitatibus explicabo libero esse.",
              status: "REJECTED",
            },
            {
              id: "208",
              title:
                "Dicta blanditiis ducimus tempora vitae magni consequatur similique ipsam.",
              status: "REJECTED",
            },
            {
              id: "209",
              title: "Sapiente unde vitae dicta dolore laudantium.",
              status: "PUBLISHED",
            },
            {
              id: "210",
              title: "Laborum cum magnam quas vero.",
              status: "DRAFT",
            },
            {
              id: "211",
              title: "Atque itaque nulla adipisci deserunt in ipsa ipsam.",
              status: "PUBLISHED",
            },
            {
              id: "212",
              title:
                "Recusandae dignissimos explicabo voluptate ut debitis nam.",
              status: "REJECTED",
            },
            {
              id: "213",
              title:
                "Quasi tempore laborum laborum corporis soluta nam porro maxime est.",
              status: "DRAFT",
            },
            { id: "214", title: "Nulla quas dolores quam.", status: "DRAFT" },
            {
              id: "215",
              title: "Placeat officia possimus sed minus aliquam illo sed.",
              status: "REJECTED",
            },
            {
              id: "245",
              title:
                "Voluptate placeat architecto similique fugit eaque sint asperiores.",
              status: "DRAFT",
            },
            {
              id: "216",
              title:
                "Voluptate optio consequuntur quibusdam maxime aliquid beatae.",
              status: "REJECTED",
            },
            {
              id: "217",
              title:
                "Molestiae ad assumenda non dicta eius reprehenderit repellendus culpa ipsam.",
              status: "DRAFT",
            },
            {
              id: "218",
              title: "Culpa excepturi iusto accusamus nam.",
              status: "REJECTED",
            },
            { id: "219", title: "A deserunt saepe.", status: "PUBLISHED" },
            {
              id: "220",
              title: "Laudantium pariatur ex ipsum dolores in a delectus.",
              status: "DRAFT",
            },
            {
              id: "221",
              title:
                "Repellendus nam molestiae cupiditate expedita inventore magni sunt non.",
              status: "PUBLISHED",
            },
            { id: "222", title: "Itaque dolores hic in.", status: "REJECTED" },
            {
              id: "223",
              title:
                "Doloremque perspiciatis voluptates animi praesentium libero eveniet possimus.",
              status: "REJECTED",
            },
            {
              id: "224",
              title: "Doloremque voluptatem harum corrupti ipsa ipsam quas.",
              status: "REJECTED",
            },
            {
              id: "225",
              title:
                "Delectus unde aspernatur quod quos nisi maxime quos deleniti possimus.",
              status: "PUBLISHED",
            },
            {
              id: "226",
              title: "Ab inventore nostrum odit quasi maxime qui.",
              status: "REJECTED",
            },
            {
              id: "227",
              title: "Similique quae a dolores.",
              status: "PUBLISHED",
            },
            {
              id: "228",
              title: "Architecto quae nisi a incidunt magni repellendus harum.",
              status: "DRAFT",
            },
            {
              id: "229",
              title: "Ipsam saepe ut qui cupiditate consectetur.",
              status: "PUBLISHED",
            },
            {
              id: "230",
              title: "Deserunt veniam temporibus accusantium velit.",
              status: "PUBLISHED",
            },
            {
              id: "231",
              title: "Minima quas nobis sint accusantium.",
              status: "DRAFT",
            },
            {
              id: "232",
              title:
                "Eligendi sit nulla porro modi totam ab nulla consequatur corrupti.",
              status: "REJECTED",
            },
            {
              id: "233",
              title:
                "Assumenda earum consequatur quibusdam illum nesciunt laborum aperiam consectetur eaque.",
              status: "PUBLISHED",
            },
            {
              id: "234",
              title:
                "Consequuntur suscipit numquam distinctio autem saepe deserunt impedit eius.",
              status: "REJECTED",
            },
            { id: "235", title: "Corporis eius dolore.", status: "PUBLISHED" },
            {
              id: "236",
              title:
                "Voluptatibus commodi corrupti est necessitatibus ab quam.",
              status: "DRAFT",
            },
            {
              id: "237",
              title: "Aperiam deleniti modi ab debitis possimus in odio.",
              status: "DRAFT",
            },
            {
              id: "238",
              title:
                "Cupiditate nulla sunt nostrum unde accusantium a repudiandae itaque.",
              status: "PUBLISHED",
            },
            {
              id: "239",
              title: "Iure maiores aliquam vero sapiente at blanditiis eos.",
              status: "DRAFT",
            },
            {
              id: "240",
              title:
                "Nulla nobis rem eligendi suscipit explicabo nesciunt laborum.",
              status: "PUBLISHED",
            },
            {
              id: "241",
              title:
                "Minima et enim consequatur inventore labore esse dignissimos laudantium.",
              status: "PUBLISHED",
            },
            {
              id: "242",
              title: "Libero impedit adipisci perferendis aperiam quidem enim.",
              status: "DRAFT",
            },
            {
              id: "243",
              title:
                "Inventore ipsam voluptatibus sed nobis velit dolorum sint quas sit.",
              status: "REJECTED",
            },
            {
              id: "244",
              title:
                "Cumque voluptatibus quam eum saepe provident consectetur tempora.",
              status: "REJECTED",
            },
            {
              id: "246",
              title:
                "Repellendus quas asperiores voluptatum possimus sequi maxime ratione natus laboriosam.",
              status: "REJECTED",
            },
            { id: "247", title: "Velit natus rem.", status: "PUBLISHED" },
            {
              id: "248",
              title: "Corporis id facere iure in recusandae quos dolore cum.",
              status: "REJECTED",
            },
            {
              id: "249",
              title: "Atque debitis cum nobis illo assumenda.",
              status: "PUBLISHED",
            },
            {
              id: "250",
              title:
                "Eaque quas quod cupiditate repudiandae nostrum repellat dicta aspernatur.",
              status: "PUBLISHED",
            },
            {
              id: "251",
              title: "Ea aperiam molestias laudantium.",
              status: "PUBLISHED",
            },
            {
              id: "252",
              title: "Aspernatur hic voluptate hic alias architecto.",
              status: "REJECTED",
            },
            {
              id: "253",
              title: "Natus est beatae minus doloremque.",
              status: "PUBLISHED",
            },
            {
              id: "254",
              title:
                "Quia in nobis molestias mollitia dignissimos molestiae doloribus.",
              status: "REJECTED",
            },
            {
              id: "255",
              title:
                "Odio maiores nobis commodi voluptas repellendus nisi totam.",
              status: "REJECTED",
            },
            {
              id: "256",
              title:
                "Eaque exercitationem consectetur perferendis voluptatem omnis nesciunt.",
              status: "REJECTED",
            },
            {
              id: "257",
              title: "Voluptates eum aliquam eos numquam et est.",
              status: "DRAFT",
            },
            {
              id: "258",
              title: "Illum iste rem ab blanditiis sint expedita.",
              status: "PUBLISHED",
            },
            {
              id: "259",
              title: "Assumenda similique pariatur aliquid.",
              status: "PUBLISHED",
            },
            {
              id: "260",
              title:
                "Nulla voluptatem consequatur sed culpa magni libero harum.",
              status: "REJECTED",
            },
            {
              id: "261",
              title: "Unde voluptates consequuntur delectus consequatur non.",
              status: "DRAFT",
            },
            {
              id: "262",
              title: "Excepturi dolore nobis unde labore repudiandae suscipit.",
              status: "REJECTED",
            },
            {
              id: "263",
              title: "Placeat facilis iste illum.",
              status: "PUBLISHED",
            },
            {
              id: "264",
              title: "Asperiores veniam nesciunt dolorum.",
              status: "REJECTED",
            },
            {
              id: "265",
              title: "Officiis molestias ullam.",
              status: "REJECTED",
            },
            {
              id: "266",
              title: "Minima eos eum in quibusdam quod explicabo.",
              status: "REJECTED",
            },
            {
              id: "267",
              title: "Soluta rem eius tempora quia.",
              status: "DRAFT",
            },
            {
              id: "268",
              title:
                "Quod necessitatibus quasi ipsum sint cum beatae quo aspernatur atque.",
              status: "REJECTED",
            },
            {
              id: "269",
              title: "Dolores eius modi possimus quo quibusdam dolores.",
              status: "PUBLISHED",
            },
            {
              id: "270",
              title:
                "Necessitatibus aspernatur aliquid doloribus omnis laudantium placeat exercitationem.",
              status: "REJECTED",
            },
            {
              id: "271",
              title: "Dolore ipsa ipsum alias accusantium pariatur nesciunt.",
              status: "REJECTED",
            },
            {
              id: "272",
              title:
                "Dolore in quis quos accusamus laborum commodi ab voluptate maiores.",
              status: "PUBLISHED",
            },
            {
              id: "273",
              title: "Vel facilis animi mollitia ipsa.",
              status: "DRAFT",
            },
            {
              id: "275",
              title:
                "Dolores quaerat molestias molestiae mollitia nemo facilis.",
              status: "DRAFT",
            },
            { id: "276", title: "Iste ea nam quas.", status: "PUBLISHED" },
            { id: "277", title: "Harum commodi placeat.", status: "REJECTED" },
            {
              id: "278",
              title: "Qui earum esse iste iure totam illum.",
              status: "PUBLISHED",
            },
            {
              id: "279",
              title: "Animi animi laborum placeat.",
              status: "REJECTED",
            },
            {
              id: "280",
              title: "Atque aliquid adipisci repellat.",
              status: "DRAFT",
            },
            {
              id: "281",
              title: "Non tempora labore architecto aliquid nam.",
              status: "PUBLISHED",
            },
            {
              id: "282",
              title: "Tempora maxime laboriosam.",
              status: "REJECTED",
            },
            {
              id: "283",
              title:
                "Assumenda officia error praesentium maxime error quia reiciendis voluptas atque.",
              status: "PUBLISHED",
            },
            {
              id: "284",
              title: "Libero saepe voluptates temporibus occaecati ut eum.",
              status: "REJECTED",
            },
            {
              id: "285",
              title:
                "Vero mollitia ipsam nobis exercitationem voluptatem tempora necessitatibus id.",
              status: "PUBLISHED",
            },
            { id: "286", title: "Quod in placeat.", status: "DRAFT" },
            {
              id: "287",
              title: "Vitae a aliquid dignissimos distinctio.",
              status: "REJECTED",
            },
            {
              id: "288",
              title:
                "Impedit ut quos accusantium laudantium reiciendis veritatis recusandae officiis.",
              status: "REJECTED",
            },
            {
              id: "289",
              title: "Voluptate a eaque repellendus.",
              status: "REJECTED",
            },
            {
              id: "290",
              title: "Repellendus corrupti beatae.",
              status: "REJECTED",
            },
            {
              id: "291",
              title: "Autem eos sunt facilis non reiciendis explicabo vitae.",
              status: "DRAFT",
            },
            {
              id: "292",
              title: "Provident ea repellendus repellat nihil.",
              status: "PUBLISHED",
            },
            { id: "293", title: "Ipsa nisi quia quam.", status: "PUBLISHED" },
            {
              id: "294",
              title: "Aperiam repellat illum tenetur autem natus.",
              status: "DRAFT",
            },
            {
              id: "295",
              title: "Voluptate fugiat nesciunt hic corrupti dicta.",
              status: "PUBLISHED",
            },
            { id: "296", title: "Maiores pariatur ipsa.", status: "REJECTED" },
            { id: "297", title: "Excepturi nemo modi.", status: "PUBLISHED" },
            {
              id: "298",
              title: "Voluptatem consequatur eum fugit cum sapiente.",
              status: "PUBLISHED",
            },
            {
              id: "299",
              title: "Accusamus distinctio odit.",
              status: "PUBLISHED",
            },
            { id: "300", title: "Architecto eaque quia.", status: "REJECTED" },
            { id: "301", title: "Et dicta harum nisi vel.", status: "DRAFT" },
            {
              id: "302",
              title: "Doloribus quam repudiandae aliquam quasi non voluptatem.",
              status: "REJECTED",
            },
            {
              id: "303",
              title: "Sed accusamus perspiciatis.",
              status: "DRAFT",
            },
            {
              id: "304",
              title: "Voluptatibus assumenda labore a.",
              status: "PUBLISHED",
            },
            { id: "305", title: "Cum officiis fugit.", status: "REJECTED" },
            {
              id: "306",
              title: "Eos quas provident optio.",
              status: "PUBLISHED",
            },
            {
              id: "307",
              title: "Recusandae nobis sit hic.",
              status: "PUBLISHED",
            },
            {
              id: "308",
              title:
                "Blanditiis totam quidem non accusamus molestiae sit libero esse.",
              status: "PUBLISHED",
            },
            {
              id: "309",
              title:
                "Vitae quasi labore libero iure quidem labore saepe consequuntur.",
              status: "DRAFT",
            },
            {
              id: "310",
              title: "Nemo molestiae veritatis voluptates nemo commodi non.",
              status: "DRAFT",
            },
            {
              id: "311",
              title: "Esse aliquam ipsa harum voluptas quo sit.",
              status: "DRAFT",
            },
            { id: "312", title: "Optio ea vitae.", status: "REJECTED" },
            {
              id: "313",
              title: "Quaerat culpa maxime totam magnam delectus.",
              status: "REJECTED",
            },
            {
              id: "314",
              title: "Mollitia delectus animi animi.",
              status: "DRAFT",
            },
            {
              id: "315",
              title:
                "Unde dignissimos minima facere numquam harum molestiae tenetur est.",
              status: "DRAFT",
            },
            {
              id: "316",
              title: "Delectus velit perspiciatis quas.",
              status: "PUBLISHED",
            },
            {
              id: "317",
              title: "Animi vero repudiandae aliquam.",
              status: "PUBLISHED",
            },
            {
              id: "318",
              title:
                "Corporis eius voluptatem officia voluptatum nemo sed rerum velit incidunt.",
              status: "DRAFT",
            },
            {
              id: "319",
              title: "Possimus asperiores rerum excepturi provident accusamus.",
              status: "DRAFT",
            },
            {
              id: "320",
              title: "Animi reprehenderit possimus vitae itaque laborum.",
              status: "REJECTED",
            },
            {
              id: "321",
              title: "Dignissimos saepe quibusdam.",
              status: "DRAFT",
            },
            { id: "322", title: "Iste quo delectus.", status: "REJECTED" },
            {
              id: "323",
              title: "Mollitia nemo tempora accusamus quasi.",
              status: "PUBLISHED",
            },
            {
              id: "324",
              title:
                "Unde recusandae eveniet iste voluptatum aspernatur consectetur.",
              status: "DRAFT",
            },
            {
              id: "325",
              title:
                "Perspiciatis amet possimus maiores vero doloremque officiis consequatur incidunt quaerat.",
              status: "DRAFT",
            },
            {
              id: "326",
              title: "Enim nemo molestias eos porro.",
              status: "DRAFT",
            },
            {
              id: "327",
              title: "Deserunt amet ab quibusdam sint aliquam aut unde libero.",
              status: "DRAFT",
            },
            {
              id: "328",
              title: "Nostrum cum soluta laborum quas optio.",
              status: "DRAFT",
            },
            {
              id: "329",
              title:
                "Est totam minima accusamus cupiditate fugiat aut eum unde natus.",
              status: "PUBLISHED",
            },
            {
              id: "330",
              title: "Dolore qui molestias et nostrum dolores.",
              status: "PUBLISHED",
            },
            {
              id: "331",
              title:
                "Itaque veniam assumenda dolorum sint corporis soluta alias.",
              status: "REJECTED",
            },
            {
              id: "332",
              title: "Omnis accusantium saepe quidem recusandae ad.",
              status: "DRAFT",
            },
            {
              id: "333",
              title: "Animi delectus labore quas dolores facere ut.",
              status: "REJECTED",
            },
            {
              id: "334",
              title:
                "Explicabo a ratione magnam iste repellendus voluptatibus perferendis corrupti.",
              status: "PUBLISHED",
            },
            {
              id: "335",
              title:
                "Ea aut pariatur earum tenetur impedit excepturi facilis maxime.",
              status: "PUBLISHED",
            },
            {
              id: "336",
              title:
                "Voluptatum voluptates ipsam eligendi deleniti adipisci voluptatem omnis eaque magnam.",
              status: "REJECTED",
            },
            {
              id: "337",
              title:
                "Dicta suscipit itaque harum veniam esse maiores porro doloribus.",
              status: "DRAFT",
            },
            {
              id: "338",
              title: "Id maxime ipsa minus reiciendis veniam.",
              status: "REJECTED",
            },
            {
              id: "339",
              title: "Sint minima dignissimos dolores.",
              status: "DRAFT",
            },
            {
              id: "340",
              title: "Voluptates ut similique id ipsam.",
              status: "PUBLISHED",
            },
            {
              id: "341",
              title: "Neque odio eveniet cupiditate.",
              status: "PUBLISHED",
            },
            {
              id: "342",
              title:
                "Reprehenderit magnam neque nulla similique blanditiis sint explicabo.",
              status: "PUBLISHED",
            },
            {
              id: "343",
              title:
                "Doloremque ut cumque amet fugiat officiis pariatur numquam.",
              status: "DRAFT",
            },
            {
              id: "344",
              title:
                "Iure assumenda ad autem sunt fugiat maxime nihil ratione impedit.",
              status: "REJECTED",
            },
            {
              id: "345",
              title: "Non reiciendis rerum debitis eligendi distinctio illum.",
              status: "DRAFT",
            },
            {
              id: "346",
              title:
                "Perferendis repudiandae architecto cumque officia consequuntur.",
              status: "REJECTED",
            },
            {
              id: "347",
              title: "Error eum assumenda quas porro sed.",
              status: "DRAFT",
            },
            {
              id: "348",
              title:
                "Corporis voluptate dolorum enim explicabo facere quaerat.",
              status: "REJECTED",
            },
            {
              id: "349",
              title: "Quae rem quo nisi possimus ipsam excepturi aut.",
              status: "REJECTED",
            },
            { id: "350", title: "Repudiandae debitis ea.", status: "DRAFT" },
            {
              id: "351",
              title: "Nihil beatae accusamus natus.",
              status: "DRAFT",
            },
            {
              id: "352",
              title: "Vel beatae veniam asperiores.",
              status: "DRAFT",
            },
            { id: "353", title: "Quia culpa mollitia.", status: "DRAFT" },
            {
              id: "354",
              title:
                "Atque dicta non cum tempore quidem quam occaecati in nesciunt.",
              status: "DRAFT",
            },
            {
              id: "355",
              title:
                "Officia illo excepturi dolor quasi aspernatur dicta mollitia nisi beatae.",
              status: "PUBLISHED",
            },
            {
              id: "356",
              title: "Corporis tempora adipisci provident minima facere nulla.",
              status: "DRAFT",
            },
            {
              id: "357",
              title:
                "Corrupti veniam itaque accusantium assumenda eligendi quis.",
              status: "REJECTED",
            },
            {
              id: "358",
              title:
                "Repudiandae natus a vero perspiciatis vitae quibusdam fugiat dignissimos consequuntur.",
              status: "DRAFT",
            },
            {
              id: "359",
              title: "Esse dignissimos possimus maxime occaecati consequatur.",
              status: "REJECTED",
            },
            {
              id: "360",
              title: "Dicta error similique odio occaecati.",
              status: "DRAFT",
            },
            {
              id: "361",
              title: "Sed unde voluptatum delectus saepe placeat saepe ipsum.",
              status: "PUBLISHED",
            },
            {
              id: "362",
              title: "Velit consectetur iure ducimus.",
              status: "DRAFT",
            },
            {
              id: "363",
              title: "Ratione dicta incidunt optio.",
              status: "DRAFT",
            },
            {
              id: "364",
              title:
                "Atque neque vitae laboriosam necessitatibus inventore dicta nemo nulla.",
              status: "PUBLISHED",
            },
            {
              id: "365",
              title: "Aut excepturi ratione quidem aspernatur odio quo.",
              status: "DRAFT",
            },
            {
              id: "366",
              title: "Minus possimus recusandae excepturi.",
              status: "REJECTED",
            },
            {
              id: "367",
              title:
                "Possimus magnam eos expedita nostrum vero cupiditate consequatur.",
              status: "PUBLISHED",
            },
            {
              id: "368",
              title: "Officiis a enim id laborum eius.",
              status: "PUBLISHED",
            },
            {
              id: "369",
              title: "Dignissimos iusto praesentium.",
              status: "DRAFT",
            },
            {
              id: "370",
              title:
                "Velit nobis illo dolores dolorum similique perspiciatis eius.",
              status: "DRAFT",
            },
            {
              id: "371",
              title: "Ad amet natus sit nesciunt.",
              status: "REJECTED",
            },
            {
              id: "372",
              title: "Consectetur ducimus similique.",
              status: "PUBLISHED",
            },
            {
              id: "373",
              title:
                "Laudantium commodi fugiat molestias pariatur blanditiis quod vel.",
              status: "DRAFT",
            },
            {
              id: "374",
              title:
                "Saepe totam officiis laboriosam fugit exercitationem quae quos.",
              status: "DRAFT",
            },
            {
              id: "375",
              title: "Molestias nihil ut maxime iusto maiores iusto.",
              status: "REJECTED",
            },
            { id: "376", title: "Nesciunt hic quo eius.", status: "DRAFT" },
            {
              id: "377",
              title: "Eveniet nam exercitationem temporibus velit.",
              status: "REJECTED",
            },
            {
              id: "378",
              title: "Unde molestias illo odio expedita enim.",
              status: "REJECTED",
            },
            {
              id: "379",
              title:
                "Quo architecto cupiditate saepe aperiam laboriosam voluptas ad.",
              status: "PUBLISHED",
            },
            { id: "380", title: "Labore veniam quibusdam.", status: "DRAFT" },
            {
              id: "381",
              title: "Tenetur mollitia natus.",
              status: "PUBLISHED",
            },
            { id: "382", title: "In vel aperiam nesciunt.", status: "DRAFT" },
            {
              id: "383",
              title:
                "Dolores ad dolores alias perspiciatis similique est dolores.",
              status: "DRAFT",
            },
            {
              id: "384",
              title: "Odit deleniti iusto laboriosam atque fugit dolore.",
              status: "REJECTED",
            },
            {
              id: "385",
              title:
                "In fugiat deleniti qui dolores dolore dolor laborum suscipit.",
              status: "PUBLISHED",
            },
            {
              id: "386",
              title: "Vitae officiis nesciunt porro laborum fugit accusantium.",
              status: "DRAFT",
            },
            { id: "387", title: "Nihil aliquid impedit.", status: "REJECTED" },
            {
              id: "388",
              title:
                "Suscipit saepe repudiandae voluptatibus delectus ipsam quas.",
              status: "REJECTED",
            },
            { id: "389", title: "Expedita excepturi maxime.", status: "DRAFT" },
            {
              id: "390",
              title: "Sit cupiditate quam possimus.",
              status: "REJECTED",
            },
            {
              id: "391",
              title:
                "Omnis corrupti harum omnis fugit earum sapiente numquam blanditiis deleniti.",
              status: "PUBLISHED",
            },
            {
              id: "392",
              title: "Quas magnam mollitia fuga ducimus.",
              status: "DRAFT",
            },
            { id: "393", title: "Maxime magni quod.", status: "REJECTED" },
            {
              id: "394",
              title: "Ratione aspernatur dolores alias.",
              status: "REJECTED",
            },
            {
              id: "395",
              title: "Exercitationem quas sapiente.",
              status: "DRAFT",
            },
            { id: "396", title: "Ea id illum dolorum.", status: "DRAFT" },
            { id: "397", title: "Recusandae tempore a.", status: "REJECTED" },
            { id: "398", title: "Illo voluptatum labore.", status: "REJECTED" },
            {
              id: "399",
              title:
                "Consequuntur debitis similique esse officia et velit libero dolor.",
              status: "PUBLISHED",
            },
            {
              id: "400",
              title:
                "Facilis tempora facere reiciendis recusandae aliquam doloribus.",
              status: "REJECTED",
            },
            {
              id: "401",
              title: "Hic error corrupti quam distinctio adipisci harum.",
              status: "PUBLISHED",
            },
            {
              id: "402",
              title: "Tempora corporis doloremque sit mollitia.",
              status: "PUBLISHED",
            },
            {
              id: "403",
              title:
                "Nostrum sapiente expedita sunt quaerat illum perferendis.",
              status: "PUBLISHED",
            },
            {
              id: "404",
              title: "Praesentium qui officiis.",
              status: "PUBLISHED",
            },
            {
              id: "405",
              title:
                "Eveniet accusantium praesentium rem repellat dolores consequatur.",
              status: "PUBLISHED",
            },
            {
              id: "406",
              title: "Quibusdam quisquam asperiores.",
              status: "DRAFT",
            },
            {
              id: "407",
              title:
                "Ratione ea accusantium alias doloribus unde neque distinctio.",
              status: "DRAFT",
            },
            {
              id: "408",
              title: "Laudantium dolore consequuntur.",
              status: "REJECTED",
            },
            {
              id: "409",
              title:
                "Sapiente temporibus repellendus quisquam corporis maiores id neque nulla.",
              status: "REJECTED",
            },
            {
              id: "410",
              title:
                "Atque exercitationem deserunt iste hic mollitia repudiandae consectetur animi.",
              status: "PUBLISHED",
            },
            {
              id: "411",
              title:
                "Eos optio reiciendis itaque quasi optio cum eaque cupiditate deserunt.",
              status: "PUBLISHED",
            },
            {
              id: "412",
              title: "Quasi molestias quas quos dolor rem totam.",
              status: "DRAFT",
            },
            {
              id: "413",
              title: "Totam saepe magnam deleniti.",
              status: "REJECTED",
            },
            {
              id: "414",
              title: "Ipsa sint dolores assumenda.",
              status: "DRAFT",
            },
            {
              id: "415",
              title:
                "Nisi consectetur quo quae harum dolor modi fugit sit molestiae.",
              status: "DRAFT",
            },
            {
              id: "416",
              title: "Ipsa totam a ullam ratione veniam.",
              status: "DRAFT",
            },
            {
              id: "417",
              title: "Provident sapiente ab nostrum dolore sit libero.",
              status: "DRAFT",
            },
            {
              id: "418",
              title:
                "Aspernatur hic tempora nulla sapiente harum facere eveniet nemo a.",
              status: "REJECTED",
            },
            {
              id: "419",
              title:
                "Quos iste voluptatibus officiis ab vero doloremque ipsam veniam dignissimos.",
              status: "DRAFT",
            },
            {
              id: "420",
              title:
                "Harum veritatis laudantium quia ab tempora perspiciatis voluptatum.",
              status: "PUBLISHED",
            },
            {
              id: "421",
              title: "Maxime quasi illum quibusdam aperiam quos.",
              status: "DRAFT",
            },
            {
              id: "422",
              title: "Cupiditate ex enim natus repellendus.",
              status: "REJECTED",
            },
            {
              id: "423",
              title: "Nam reprehenderit odit dicta illo nisi autem rerum.",
              status: "REJECTED",
            },
            { id: "424", title: "At repellat id.", status: "DRAFT" },
            {
              id: "425",
              title: "Sunt at voluptatem esse optio similique.",
              status: "REJECTED",
            },
            {
              id: "426",
              title:
                "Cumque temporibus itaque suscipit repellendus perspiciatis commodi veniam perferendis.",
              status: "DRAFT",
            },
            {
              id: "427",
              title: "Repellat quaerat quasi dolore culpa officia.",
              status: "PUBLISHED",
            },
            {
              id: "428",
              title: "Voluptatum expedita blanditiis.",
              status: "DRAFT",
            },
            {
              id: "429",
              title: "Tenetur id expedita temporibus.",
              status: "DRAFT",
            },
            {
              id: "430",
              title: "Praesentium enim saepe odit.",
              status: "PUBLISHED",
            },
            {
              id: "431",
              title:
                "Optio voluptate nam occaecati expedita expedita maiores cupiditate similique.",
              status: "REJECTED",
            },
            {
              id: "432",
              title: "Hic saepe ullam est cum quas suscipit quibusdam vel.",
              status: "REJECTED",
            },
            {
              id: "433",
              title: "Eveniet voluptate non consequuntur repellat.",
              status: "DRAFT",
            },
            {
              id: "434",
              title:
                "Eius reprehenderit aliquid autem voluptates dolorum aliquid inventore.",
              status: "PUBLISHED",
            },
            {
              id: "435",
              title:
                "Quod quam iste hic molestias temporibus rem nesciunt doloribus.",
              status: "PUBLISHED",
            },
            {
              id: "436",
              title:
                "Voluptatem neque laborum doloribus aliquam occaecati aliquid molestiae.",
              status: "PUBLISHED",
            },
            {
              id: "437",
              title: "Repellendus ratione itaque.",
              status: "REJECTED",
            },
            {
              id: "438",
              title: "Accusamus recusandae cumque earum maiores ab.",
              status: "DRAFT",
            },
            {
              id: "439",
              title: "Deleniti illo eos ex itaque eos vero quisquam.",
              status: "DRAFT",
            },
            {
              id: "440",
              title: "Quas suscipit praesentium nobis ex aperiam.",
              status: "DRAFT",
            },
            {
              id: "441",
              title: "Ipsam esse magni alias nostrum doloribus libero sequi.",
              status: "PUBLISHED",
            },
            {
              id: "442",
              title:
                "At consectetur assumenda architecto repellendus facilis quae.",
              status: "PUBLISHED",
            },
            {
              id: "443",
              title:
                "Accusamus ea natus reprehenderit excepturi doloremque eaque aut laborum.",
              status: "DRAFT",
            },
            {
              id: "444",
              title: "Sit praesentium error beatae eum dolorum maiores.",
              status: "PUBLISHED",
            },
            {
              id: "445",
              title:
                "Adipisci tenetur excepturi nesciunt amet optio consequuntur maxime repudiandae eveniet.",
              status: "PUBLISHED",
            },
            {
              id: "446",
              title:
                "Veniam quam accusantium corrupti reprehenderit similique ab sunt.",
              status: "PUBLISHED",
            },
            {
              id: "447",
              title: "Consequuntur laudantium voluptas beatae voluptatem.",
              status: "DRAFT",
            },
            {
              id: "448",
              title: "Eos quaerat provident ipsam natus magni.",
              status: "DRAFT",
            },
            {
              id: "449",
              title: "Deleniti in sequi illum nisi.",
              status: "DRAFT",
            },
            {
              id: "450",
              title: "Fugiat temporibus odio.",
              status: "PUBLISHED",
            },
            {
              id: "451",
              title:
                "Dignissimos sit deserunt tempore fugit vero et nemo dolores natus.",
              status: "REJECTED",
            },
            {
              id: "452",
              title: "Voluptatum ut minima veniam.",
              status: "REJECTED",
            },
            {
              id: "453",
              title: "Alias modi itaque rerum perspiciatis.",
              status: "REJECTED",
            },
            {
              id: "454",
              title:
                "Cupiditate provident animi iusto ducimus quibusdam iure nam accusantium aut.",
              status: "DRAFT",
            },
            {
              id: "455",
              title:
                "Ipsum dolorem tenetur veniam alias minus quo soluta neque voluptatem.",
              status: "REJECTED",
            },
            { id: "456", title: "Ad consequuntur maxime.", status: "REJECTED" },
            {
              id: "457",
              title: "Officiis numquam nulla maxime sunt temporibus.",
              status: "REJECTED",
            },
            {
              id: "458",
              title:
                "Veniam dolore voluptatum asperiores doloremque unde provident.",
              status: "PUBLISHED",
            },
            {
              id: "459",
              title: "Ullam repellat inventore in.",
              status: "DRAFT",
            },
            {
              id: "460",
              title: "Provident reiciendis ad fugit tempora et.",
              status: "PUBLISHED",
            },
            {
              id: "461",
              title: "Porro vitae voluptatum quisquam a aspernatur.",
              status: "REJECTED",
            },
            {
              id: "462",
              title: "Occaecati ut cum sit non magnam nam soluta magni.",
              status: "PUBLISHED",
            },
            {
              id: "463",
              title:
                "Temporibus quidem exercitationem omnis autem corporis ratione modi.",
              status: "PUBLISHED",
            },
            {
              id: "464",
              title:
                "Nulla sapiente quae minus earum maiores asperiores pariatur quam.",
              status: "DRAFT",
            },
            { id: "465", title: "Iusto consectetur ad.", status: "REJECTED" },
            {
              id: "466",
              title: "Sit voluptatem aut assumenda.",
              status: "DRAFT",
            },
            {
              id: "467",
              title:
                "Dolorum tempora in iste ea explicabo qui natus veritatis beatae.",
              status: "REJECTED",
            },
            {
              id: "468",
              title:
                "Sapiente nobis quidem ducimus saepe facere aspernatur optio minus praesentium.",
              status: "REJECTED",
            },
            {
              id: "469",
              title: "Qui incidunt eligendi tenetur quasi numquam maxime.",
              status: "DRAFT",
            },
            {
              id: "470",
              title: "Velit enim natus cumque non.",
              status: "REJECTED",
            },
            {
              id: "471",
              title: "Quisquam quasi sed earum distinctio praesentium.",
              status: "REJECTED",
            },
            {
              id: "472",
              title:
                "Nulla dignissimos saepe quae nemo laudantium voluptas officiis corporis vel.",
              status: "REJECTED",
            },
            {
              id: "473",
              title: "Eius voluptates commodi accusamus labore ducimus iusto.",
              status: "DRAFT",
            },
            {
              id: "474",
              title:
                "Mollitia dolorem modi nulla beatae sunt ducimus exercitationem.",
              status: "REJECTED",
            },
            {
              id: "475",
              title: "Vitae consequuntur iusto.",
              status: "REJECTED",
            },
            {
              id: "476",
              title: "Nisi debitis voluptatibus.",
              status: "PUBLISHED",
            },
            {
              id: "477",
              title:
                "Tenetur amet sint quo magni totam quo sunt quam voluptas.",
              status: "REJECTED",
            },
            {
              id: "478",
              title: "Nobis deleniti exercitationem laborum vitae quaerat.",
              status: "REJECTED",
            },
            {
              id: "479",
              title:
                "Rem facere amet saepe mollitia nemo alias voluptas quidem.",
              status: "REJECTED",
            },
            {
              id: "480",
              title: "Distinctio qui dolores dolores.",
              status: "PUBLISHED",
            },
            {
              id: "481",
              title: "Beatae dignissimos error ab.",
              status: "DRAFT",
            },
            {
              id: "482",
              title: "Quam eligendi reiciendis eaque dignissimos repudiandae.",
              status: "REJECTED",
            },
            {
              id: "483",
              title:
                "Tempore dolor dolore cumque voluptatem incidunt dolore reprehenderit nam architecto.",
              status: "DRAFT",
            },
            {
              id: "484",
              title: "Temporibus debitis quidem autem sapiente saepe.",
              status: "DRAFT",
            },
            {
              id: "485",
              title:
                "Nulla quisquam nesciunt laudantium distinctio cumque repellendus eveniet quae.",
              status: "REJECTED",
            },
            { id: "486", title: "Commodi impedit expedita.", status: "DRAFT" },
            {
              id: "487",
              title:
                "Doloremque quod voluptatibus accusantium aliquam tempora.",
              status: "REJECTED",
            },
            {
              id: "488",
              title: "Eos vero totam distinctio quidem vero blanditiis.",
              status: "PUBLISHED",
            },
            {
              id: "489",
              title:
                "Iure voluptatum minima perferendis aspernatur sunt optio perspiciatis.",
              status: "REJECTED",
            },
            {
              id: "490",
              title: "Aliquid cum soluta doloremque.",
              status: "REJECTED",
            },
            { id: "491", title: "Doloribus eius eaque.", status: "DRAFT" },
            {
              id: "492",
              title: "Nobis officiis libero unde amet debitis.",
              status: "REJECTED",
            },
            {
              id: "493",
              title:
                "Hic quisquam commodi rerum earum reprehenderit doloribus.",
              status: "DRAFT",
            },
            {
              id: "494",
              title: "Autem dolor ullam temporibus porro.",
              status: "DRAFT",
            },
            {
              id: "495",
              title:
                "Nisi quidem sint dolores sunt magnam expedita illum perspiciatis accusamus.",
              status: "DRAFT",
            },
            {
              id: "496",
              title: "Velit quisquam ipsum recusandae provident ab.",
              status: "PUBLISHED",
            },
            {
              id: "497",
              title: "Dolores itaque eveniet perferendis necessitatibus.",
              status: "DRAFT",
            },
            {
              id: "498",
              title: "Blanditiis voluptas explicabo fugiat nesciunt.",
              status: "PUBLISHED",
            },
            {
              id: "499",
              title: "Velit dolorum nobis architecto doloribus.",
              status: "PUBLISHED",
            },
            {
              id: "500",
              title: "Reprehenderit dolor tempora expedita aperiam dolor.",
              status: "REJECTED",
            },
            { id: "501", title: "fda", status: "PUBLISHED" },
            { id: "502", title: "sdasd", status: "PUBLISHED" },
            { id: "503", title: "dsadsad", status: "PUBLISHED" },
            { id: "504", title: "foo", status: "DRAFT" },
          ],
          totalCount: 507,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "45605",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:51 GMT",
      etag: 'W/"b225-FNJknXhweo1skmv6zFPnM4x9spk"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: { filter: {}, paging: { limit: 10, offset: 0 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Minus et omnis praesentium nisi animi pariatur magnam.",
              status: "PUBLISHED",
            },
            {
              id: "2",
              title: "Cumque aliquam porro iure id reiciendis.",
              status: "REJECTED",
            },
            {
              id: "3",
              title:
                "Sit eligendi corrupti aliquid sunt corporis repellat soluta illum deleniti.",
              status: "DRAFT",
            },
            {
              id: "4",
              title: "Beatae quis laborum illo officiis facere.",
              status: "DRAFT",
            },
            {
              id: "5",
              title: "Rerum vitae soluta impedit id dicta nisi fugiat.",
              status: "REJECTED",
            },
            {
              id: "6",
              title:
                "Laudantium accusantium cum quasi vero odit deleniti ipsum.",
              status: "REJECTED",
            },
            {
              id: "7",
              title: "Placeat at perferendis tenetur voluptatibus doloremque.",
              status: "REJECTED",
            },
            {
              id: "8",
              title:
                "Inventore natus possimus quos dolores eveniet laborum beatae.",
              status: "DRAFT",
            },
            { id: "9", title: "Ullam iusto sunt deleniti.", status: "DRAFT" },
            {
              id: "10",
              title: "Exercitationem eius cum tempora quo itaque amet.",
              status: "DRAFT",
            },
          ],
          totalCount: 507,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "965",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:51 GMT",
      etag: 'W/"3c5-irDxNokQl6IVzWsK68tl3SsPe04"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: {
      filter: {},
      paging: { limit: 10, offset: 0 },
      sorting: [{ direction: "DESC", field: "id" }],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "507", title: "foo", status: "DRAFT" },
            { id: "506", title: "foo", status: "DRAFT" },
            { id: "505", title: "foo", status: "DRAFT" },
            { id: "504", title: "foo", status: "DRAFT" },
            { id: "503", title: "dsadsad", status: "PUBLISHED" },
            { id: "502", title: "sdasd", status: "PUBLISHED" },
            { id: "501", title: "fda", status: "PUBLISHED" },
            {
              id: "500",
              title: "Reprehenderit dolor tempora expedita aperiam dolor.",
              status: "REJECTED",
            },
            {
              id: "499",
              title: "Velit dolorum nobis architecto doloribus.",
              status: "PUBLISHED",
            },
            {
              id: "498",
              title: "Blanditiis voluptas explicabo fugiat nesciunt.",
              status: "PUBLISHED",
            },
          ],
          totalCount: 507,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "650",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:52 GMT",
      etag: 'W/"28a-iyfSnTdKwdchbOzTvOcx/EZdscU"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: {
      filter: { status: { eq: "DRAFT" } },
      paging: { limit: 10, offset: 0 },
      sorting: [],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Sit eligendi corrupti aliquid sunt corporis repellat soluta illum deleniti.",
              status: "DRAFT",
            },
            {
              id: "4",
              title: "Beatae quis laborum illo officiis facere.",
              status: "DRAFT",
            },
            {
              id: "8",
              title:
                "Inventore natus possimus quos dolores eveniet laborum beatae.",
              status: "DRAFT",
            },
            { id: "9", title: "Ullam iusto sunt deleniti.", status: "DRAFT" },
            {
              id: "10",
              title: "Exercitationem eius cum tempora quo itaque amet.",
              status: "DRAFT",
            },
            {
              id: "13",
              title: "Sunt ducimus autem voluptatibus veritatis itaque.",
              status: "DRAFT",
            },
            { id: "16", title: "Autem maxime nostrum.", status: "DRAFT" },
            {
              id: "19",
              title: "Aliquam inventore neque deserunt dicta recusandae sequi.",
              status: "DRAFT",
            },
            { id: "20", title: "Hic eum nostrum.", status: "DRAFT" },
            { id: "22", title: "Vero asperiores natus.", status: "DRAFT" },
          ],
          totalCount: 193,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "863",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:52 GMT",
      etag: 'W/"35f-U58Bel8F42SzP1V03QMThB3G2Ew"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: {
      filter: { and: [{ id: { lt: 10 }, status: { eq: "DRAFT" } }] },
      paging: { limit: 10, offset: 0 },
      sorting: [],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Sit eligendi corrupti aliquid sunt corporis repellat soluta illum deleniti.",
              status: "DRAFT",
            },
            {
              id: "4",
              title: "Beatae quis laborum illo officiis facere.",
              status: "DRAFT",
            },
            {
              id: "8",
              title:
                "Inventore natus possimus quos dolores eveniet laborum beatae.",
              status: "DRAFT",
            },
            { id: "9", title: "Ullam iusto sunt deleniti.", status: "DRAFT" },
          ],
          totalCount: 4,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "409",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:52 GMT",
      etag: 'W/"199-N+AlnmwVau+eNFpIKYNyuY5f8o4"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n  blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n    nodes {\n      id\n      title\n      status\n    }\n    totalCount\n  }\n}",
    variables: {
      filter: { or: [{ status: { eq: "PUBLISHED" } }] },
      paging: { limit: 10, offset: 0 },
      sorting: [],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "1",
              title: "Minus et omnis praesentium nisi animi pariatur magnam.",
              status: "PUBLISHED",
            },
            {
              id: "18",
              title: "Nam itaque modi ducimus nesciunt qui.",
              status: "PUBLISHED",
            },
            {
              id: "23",
              title:
                "Sapiente error voluptatibus quasi in error assumenda suscipit nihil.",
              status: "PUBLISHED",
            },
            {
              id: "27",
              title: "Officiis quam quos ducimus.",
              status: "PUBLISHED",
            },
            {
              id: "34",
              title:
                "Illum iste error dolores asperiores eligendi commodi reiciendis quam.",
              status: "PUBLISHED",
            },
            {
              id: "38",
              title: "Dolores vero distinctio libero porro soluta.",
              status: "PUBLISHED",
            },
            {
              id: "43",
              title:
                "Excepturi officiis perferendis dolore quas porro quo iusto.",
              status: "PUBLISHED",
            },
            {
              id: "45",
              title: "Quibusdam enim eveniet quaerat.",
              status: "PUBLISHED",
            },
            {
              id: "50",
              title: "Consequuntur amet voluptas veniam.",
              status: "PUBLISHED",
            },
            {
              id: "51",
              title: "Maxime repellendus temporibus.",
              status: "PUBLISHED",
            },
          ],
          totalCount: 150,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "944",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Thu, 26 Sep 2024 11:58:52 GMT",
      etag: 'W/"3b0-qgXo+Kerm7YSeF7qrwCC23UkDDg"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
