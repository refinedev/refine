import nock from "nock";

nock("https://refine-fake-rest.pankod.com:443", { encodedQueryParams: true })
    .get("/users")
    .query({ _order: "desc", _sort: "id" })
    .reply(
        200,
        [
            {
                id: 50,
                firstName: "Cortez",
                email: "rahul.damore39@yahoo.com",
                lastName: "Crooks",
                status: false,
                birthday: "2021-03-06T13:48:02.030Z",
                avatar: [
                    {
                        name: "Cortez.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/ff556a7e4fcbc159b55bde887e4669a1?s=300",
                    },
                ],
            },
            {
                id: 49,
                firstName: "Vita",
                email: "bernice_reichel@gmail.com",
                lastName: "Gottlieb",
                status: true,
                birthday: "2020-07-14T04:25:13.203Z",
                avatar: [
                    {
                        name: "Vita.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/65c2a79bd56b843604b7d1edace158f7?s=300",
                    },
                ],
            },
            {
                id: 48,
                firstName: "Elinore",
                email: "kyleigh_powlowski47@yahoo.com",
                lastName: "Padberg",
                status: true,
                birthday: "2021-03-16T12:56:08.925Z",
                avatar: [
                    {
                        name: "Elinore.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/8a3aff921b1286caef37c3a6ab8922ed?s=300",
                    },
                ],
            },
            {
                id: 47,
                firstName: "Greta",
                email: "gabriella_jacobson69@hotmail.com",
                lastName: "Shields",
                status: true,
                birthday: "2021-01-31T12:37:35.124Z",
                avatar: [
                    {
                        name: "Greta.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/96e99dd6d42919a5bbaa523e039ed505?s=300",
                    },
                ],
            },
            {
                id: 46,
                firstName: "Gerard",
                email: "virginie94@hotmail.com",
                lastName: "Wunsch",
                status: true,
                birthday: "2021-01-13T19:52:35.023Z",
                avatar: [
                    {
                        name: "Gerard.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/6c0a671f425be190610aaa5d9ee6b751?s=300",
                    },
                ],
            },
            {
                id: 45,
                firstName: "Dale",
                email: "katrine_stamm@gmail.com",
                lastName: "Kuphal",
                status: true,
                birthday: "2021-01-25T09:51:49.691Z",
                avatar: [
                    {
                        name: "Dale.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/d5b9d32f63315715a2ee7eec3537eefd?s=300",
                    },
                ],
            },
            {
                id: 44,
                firstName: "Eliane",
                email: "richie85@hotmail.com",
                lastName: "Prosacco",
                status: false,
                birthday: "2021-04-15T02:29:38.508Z",
                avatar: [
                    {
                        name: "Eliane.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/7c65b19b968806dfbba7e44d0bad0494?s=300",
                    },
                ],
            },
            {
                id: 43,
                firstName: "Lue",
                email: "beverly.hansen54@hotmail.com",
                lastName: "Flatley",
                status: true,
                birthday: "2020-08-30T15:25:14.041Z",
                avatar: [
                    {
                        name: "Lue.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/5e1173a26f4a76740220719def6f9ab0?s=300",
                    },
                ],
            },
            {
                id: 42,
                firstName: "Michele",
                email: "emil_west60@hotmail.com",
                lastName: "Towne",
                status: false,
                birthday: "2020-09-17T06:26:51.746Z",
                avatar: [
                    {
                        name: "Michele.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/c5b02ed347e4b3ab6d3dc9932b1fbeef?s=300",
                    },
                ],
            },
            {
                id: 41,
                firstName: "Araceli",
                email: "eden_koss@gmail.com",
                lastName: "Ankunding",
                status: false,
                birthday: "2021-03-23T13:12:26.611Z",
                avatar: [
                    {
                        name: "Araceli.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/7b3024ae9cd6a7250117a95359bf43bc?s=300",
                    },
                ],
            },
            {
                id: 40,
                firstName: "Rosalyn",
                email: "craig_ullrich@gmail.com",
                lastName: "Jerde",
                status: true,
                birthday: "2020-08-02T18:43:05.102Z",
                avatar: [
                    {
                        name: "Rosalyn.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/da9528699710c2687cd948037cf00498?s=300",
                    },
                ],
            },
            {
                id: 39,
                firstName: "Carleton",
                email: "kiarra.yundt@yahoo.com",
                lastName: "Funk",
                status: false,
                birthday: "2021-01-29T04:21:04.635Z",
                avatar: [
                    {
                        name: "Carleton.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/25ec66f243247df404cb71aa559fc56c?s=300",
                    },
                ],
            },
            {
                id: 38,
                firstName: "Selena",
                email: "oswaldo.lehner39@yahoo.com",
                lastName: "Harber",
                status: true,
                birthday: "2020-12-16T13:42:28.214Z",
                avatar: [
                    {
                        name: "Selena.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/6755fc9535dc2eec01fc979d7b2d5f0a?s=300",
                    },
                ],
            },
            {
                id: 37,
                firstName: "Braxton",
                email: "rosie51@gmail.com",
                lastName: "Schultz",
                status: false,
                birthday: "2020-07-03T04:20:45.542Z",
                avatar: [
                    {
                        name: "Braxton.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/a040a3b18fbd2e2c4dbe1013e03ed738?s=300",
                    },
                ],
            },
            {
                id: 36,
                firstName: "Raegan",
                email: "hallie84@hotmail.com",
                lastName: "Sipes",
                status: true,
                birthday: "2020-07-14T00:35:18.018Z",
                avatar: [
                    {
                        name: "Raegan.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/c865551aa5a6d03b9a4ff3ae53302fdc?s=300",
                    },
                ],
            },
            {
                id: 35,
                firstName: "Rosanna",
                email: "zander.rice@gmail.com",
                lastName: "Harvey",
                status: false,
                birthday: "2020-12-24T05:50:15.430Z",
                avatar: [
                    {
                        name: "Rosanna.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/8ec0d97bb36688e019d09a31db42d331?s=300",
                    },
                ],
            },
            {
                id: 34,
                firstName: "Christopher",
                email: "ova50@yahoo.com",
                lastName: "Haley",
                status: true,
                birthday: "2020-07-31T04:16:34.180Z",
                avatar: [
                    {
                        name: "Christopher.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/5802e68a71ba47365114e0541099e2a1?s=300",
                    },
                ],
            },
            {
                id: 33,
                firstName: "Vivien",
                email: "fletcher_ondricka@yahoo.com",
                lastName: "Maggio",
                status: true,
                birthday: "2021-03-16T03:12:41.357Z",
                avatar: [
                    {
                        name: "Vivien.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/114a641308b1ee3ae17186cbb49cd5d9?s=300",
                    },
                ],
            },
            {
                id: 32,
                firstName: "Kristy",
                email: "hermina_braun74@gmail.com",
                lastName: "Conn",
                status: false,
                birthday: "2020-07-12T16:55:23.038Z",
                avatar: [
                    {
                        name: "Kristy.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/919790033f0e32f6b5f3bb7d94f88e44?s=300",
                    },
                ],
            },
            {
                id: 31,
                firstName: "Neal",
                email: "art.homenick51@yahoo.com",
                lastName: "Donnelly",
                status: false,
                birthday: "2021-02-21T07:28:07.312Z",
                avatar: [
                    {
                        name: "Neal.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/62271034e565b3b20e748a1f8a72d145?s=300",
                    },
                ],
            },
            {
                id: 30,
                firstName: "Alvena",
                email: "blake_hauck74@hotmail.com",
                lastName: "Heathcote",
                status: true,
                birthday: "2021-03-11T12:01:07.013Z",
                avatar: [
                    {
                        name: "Alvena.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/2a58501ac239470777c68859063b521d?s=300",
                    },
                ],
            },
            {
                id: 29,
                firstName: "Tianna",
                email: "darron66@gmail.com",
                lastName: "Torphy",
                status: false,
                birthday: "2020-08-03T12:08:52.026Z",
                avatar: [
                    {
                        name: "Tianna.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/9d240c9bb208d6e5571753c62efe37fa?s=300",
                    },
                ],
            },
            {
                id: 28,
                firstName: "Rasheed",
                email: "norberto_kunde@hotmail.com",
                lastName: "Armstrong",
                status: true,
                birthday: "2021-05-02T00:47:18.955Z",
                avatar: [
                    {
                        name: "Rasheed.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/c8a6d08bf72b32b524e2522353acabd2?s=300",
                    },
                ],
            },
            {
                id: 27,
                firstName: "Claudia",
                email: "glennie.grant7@gmail.com",
                lastName: "Ruecker",
                status: false,
                birthday: "2020-09-09T00:39:53.169Z",
                avatar: [
                    {
                        name: "Claudia.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/0ea5ec952c455af5bfff5a53f4c07f28?s=300",
                    },
                ],
            },
            {
                id: 26,
                firstName: "Jolie",
                email: "haskell_emard70@hotmail.com",
                lastName: "Grant",
                status: false,
                birthday: "2020-11-27T05:13:22.904Z",
                avatar: [
                    {
                        name: "Jolie.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/aef9a3303f99b235364f9b96271d8507?s=300",
                    },
                ],
            },
            {
                id: 25,
                firstName: "Joel",
                email: "marcellus.connelly@gmail.com",
                lastName: "Kautzer",
                status: true,
                birthday: "2021-03-25T07:21:59.009Z",
                avatar: [
                    {
                        name: "Joel.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/1390de1dca31b92e27de74157c4940db?s=300",
                    },
                ],
            },
            {
                id: 24,
                firstName: "Layla",
                email: "adaline4@gmail.com",
                lastName: "Rippin",
                status: false,
                birthday: "2021-04-12T12:43:46.184Z",
                avatar: [
                    {
                        name: "Layla.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/88aa8e1438d1cd3146d33dc11154276a?s=300",
                    },
                ],
            },
            {
                id: 23,
                firstName: "Vincent",
                email: "edmund_hackett@hotmail.com",
                lastName: "Nitzsche",
                status: true,
                birthday: "2021-02-01T15:15:15.253Z",
                avatar: [
                    {
                        name: "Vincent.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/b535bc7eff03f2ba26fd6ae2bee84d45?s=300",
                    },
                ],
            },
            {
                id: 22,
                firstName: "Hailee",
                email: "brenden.raynor89@hotmail.com",
                lastName: "Bergstrom",
                status: false,
                birthday: "2020-08-04T11:59:47.700Z",
                avatar: [
                    {
                        name: "Hailee.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/183fe523c7619079c8f2054ce90114dd?s=300",
                    },
                ],
            },
            {
                id: 21,
                firstName: "Ruthe",
                email: "joesph.tillman@hotmail.com",
                lastName: "Jast",
                status: true,
                birthday: "2020-10-11T07:19:41.277Z",
                avatar: [
                    {
                        name: "Ruthe.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/8116f550d8d66fe7b2cd30112df89263?s=300",
                    },
                ],
            },
            {
                id: 20,
                firstName: "Jermaine",
                email: "yazmin48@gmail.com",
                lastName: "Macejkovic",
                status: true,
                birthday: "2021-01-11T12:33:09.024Z",
                avatar: [
                    {
                        name: "Jermaine.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/35579d77a7cc7d0bbd65b7603ac7d410?s=300",
                    },
                ],
            },
            {
                id: 19,
                firstName: "Brielle",
                email: "audreanne_king@gmail.com",
                lastName: "Goodwin",
                status: true,
                birthday: "2021-05-20T22:01:31.169Z",
                avatar: [
                    {
                        name: "Brielle.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/192c4704980eba2508a39436cd1b2c62?s=300",
                    },
                ],
            },
            {
                id: 18,
                firstName: "Gia",
                email: "rogelio.schuppe47@hotmail.com",
                lastName: "Wiza",
                status: true,
                birthday: "2020-12-11T23:03:57.591Z",
                avatar: [
                    {
                        name: "Gia.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/8cde85fdb968b67a102ff11344997731?s=300",
                    },
                ],
            },
            {
                id: 17,
                firstName: "Gudrun",
                email: "ressie35@hotmail.com",
                lastName: "O'Hara",
                status: false,
                birthday: "2021-01-27T09:20:49.675Z",
                avatar: [
                    {
                        name: "Gudrun.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/0a9dabe445777d0679cbe1bbfeadb128?s=300",
                    },
                ],
            },
            {
                id: 16,
                firstName: "Marlee",
                email: "tanya.casper@gmail.com",
                lastName: "McLaughlin",
                status: true,
                birthday: "2021-03-01T19:57:35.502Z",
                avatar: [
                    {
                        name: "Marlee.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/4ae191dc84be401952e693834513b11a?s=300",
                    },
                ],
            },
            {
                id: 15,
                firstName: "Christy",
                email: "zechariah.vonrueden@gmail.com",
                lastName: "Robel",
                status: true,
                birthday: "2021-03-05T01:11:43.467Z",
                avatar: [
                    {
                        name: "Christy.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/6fd104a5b6c336c8a94d014e962ca74f?s=300",
                    },
                ],
            },
            {
                id: 14,
                firstName: "Narciso",
                email: "mertie_toy@gmail.com",
                lastName: "Flatley",
                status: true,
                birthday: "2021-03-22T21:23:34.168Z",
                avatar: [
                    {
                        name: "Narciso.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/234e94d874cf6ac8141218bd1b80e5a2?s=300",
                    },
                ],
            },
            {
                id: 13,
                firstName: "Jayme",
                email: "august_armstrong@yahoo.com",
                lastName: "Predovic",
                status: false,
                birthday: "2021-03-30T18:43:00.405Z",
                avatar: [
                    {
                        name: "Jayme.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/b6a05bc5d1b1c26023910b7a6c7a6f3f?s=300",
                    },
                ],
            },
            {
                id: 12,
                firstName: "Roderick",
                email: "javonte.blick23@gmail.com",
                lastName: "Cremin",
                status: true,
                birthday: "2021-01-01T05:01:09.191Z",
                avatar: [
                    {
                        name: "Roderick.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/151501da9ce62922ac54390dc67c7fb6?s=300",
                    },
                ],
            },
            {
                id: 11,
                firstName: "Fidel",
                email: "dereck.predovic25@gmail.com",
                lastName: "Hahn",
                status: true,
                birthday: "2020-11-02T07:16:44.305Z",
                avatar: [
                    {
                        name: "Fidel.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/707f3742ad088234b67dff8b9c71cec4?s=300",
                    },
                ],
            },
            {
                id: 10,
                firstName: "Felicia",
                email: "cloyd_mckenzie@yahoo.com",
                lastName: "Veum",
                status: false,
                birthday: "2020-09-19T04:51:10.923Z",
                avatar: [
                    {
                        name: "Felicia.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/40b00cefdfc699a9cce8dd27b24a2501?s=300",
                    },
                ],
            },
            {
                id: 9,
                firstName: "Greta",
                email: "halie30@gmail.com",
                lastName: "O'Reilly",
                status: false,
                birthday: "2021-02-21T13:09:39.669Z",
                avatar: [
                    {
                        name: "Greta.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/8c76f628ab83a9d188c1c0c3aa238e8b?s=300",
                    },
                ],
            },
            {
                id: 8,
                firstName: "Demarco",
                email: "zakary_parker@gmail.com",
                lastName: "Davis",
                status: true,
                birthday: "2020-11-19T10:24:48.316Z",
                avatar: [
                    {
                        name: "Demarco.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/27e5fe54e2cfe16fae38c5185887e6ff?s=300",
                    },
                ],
            },
            {
                id: 7,
                firstName: "Delaney",
                email: "noelia77@gmail.com",
                lastName: "Funk",
                status: true,
                birthday: "2021-01-06T15:31:30.377Z",
                avatar: [
                    {
                        name: "Delaney.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/a54c750e8f6db6d35c493988f255d79a?s=300",
                    },
                ],
            },
            {
                id: 6,
                firstName: "Remington",
                email: "amely_sanford@yahoo.com",
                lastName: "Mohr",
                status: false,
                birthday: "2020-10-19T14:01:25.511Z",
                avatar: [
                    {
                        name: "Remington.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/8b4e222e397ed7ce70d22194384e221e?s=300",
                    },
                ],
            },
            {
                id: 5,
                firstName: "Kelly",
                email: "donald_quitzon@yahoo.com",
                lastName: "Feil",
                status: false,
                birthday: "2020-11-03T05:19:05.979Z",
                avatar: [
                    {
                        name: "Kelly.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/6513771a92fb224d8527c6b5d5943619?s=300",
                    },
                ],
            },
            {
                id: 4,
                firstName: "Judd",
                email: "berneice7@hotmail.com",
                lastName: "Kessler",
                status: true,
                birthday: "2020-09-25T04:47:38.690Z",
                avatar: [
                    {
                        name: "Judd.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/a54f466c8fc417424172963f365c8d17?s=300",
                    },
                ],
            },
            {
                id: 3,
                firstName: "Alexanne",
                email: "emmy.fisher@hotmail.com",
                lastName: "Farrell",
                status: true,
                birthday: "2021-05-11T14:56:17.106Z",
                avatar: [
                    {
                        name: "Alexanne.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/0f5ee1f86d5198a28fc25c932326c91f?s=300",
                    },
                ],
            },
            {
                id: 2,
                firstName: "Jacynthe",
                email: "jamel_ondricka95@gmail.com",
                lastName: "Waelchi",
                status: true,
                birthday: "2020-10-17T13:45:13.314Z",
                avatar: [
                    {
                        name: "Jacynthe.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/421cd73b438f4efe1c48dc5beaa7ee25?s=300",
                    },
                ],
            },
            {
                id: 1,
                firstName: "Camilla",
                email: "russel_medhurst82@gmail.com",
                lastName: "Reilly",
                status: false,
                birthday: "2020-10-18T15:07:56.404Z",
                avatar: [
                    {
                        name: "Camilla.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902154",
                        url:
                            "http://www.gravatar.com/avatar/e8a34e6383aa65933b5ad4587b116d0a?s=300",
                    },
                ],
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Fri, 21 May 2021 12:20:15 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "24079",
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
            "Access-Control-Allow-Origin",
            "*",
            "X-Content-Type-Options",
            "nosniff",
            "ETag",
            'W/"5e0f-qcCi0iGsUzFsO80aht3jS6SnvKA"',
        ],
    );

nock("https://refine-fake-rest.pankod.com:443", {
    encodedQueryParams: true,
})
    .get("/users")
    .query({
        _order: "desc",
        _sort: "id",
        email: "rahul.damore39%40yahoo.com",
    })
    .reply(
        200,
        [
            {
                id: 50,
                firstName: "Cortez",
                email: "rahul.damore39@yahoo.com",
                lastName: "Crooks",
                status: false,
                birthday: "2021-03-06T13:48:02.030Z",
                avatar: [
                    {
                        name: "Cortez.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/ff556a7e4fcbc159b55bde887e4669a1?s=300",
                    },
                ],
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Fri, 21 May 2021 12:22:54 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "484",
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
            "Access-Control-Allow-Origin",
            "*",
            "X-Content-Type-Options",
            "nosniff",
            "ETag",
            'W/"1e4-MWb0jWpd13gJe822Q84YKfWnZGQ"',
        ],
    );

nock("https://refine-fake-rest.pankod.com:443", {
    encodedQueryParams: true,
})
    .get("/users")
    .query({ _order: "asc", _sort: "id" })
    .reply(
        200,
        [
            {
                id: 1,
                firstName: "Camilla",
                email: "russel_medhurst82@gmail.com",
                lastName: "Reilly",
                status: false,
                birthday: "2020-10-18T15:07:56.404Z",
                avatar: [
                    {
                        name: "Camilla.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902154",
                        url:
                            "http://www.gravatar.com/avatar/e8a34e6383aa65933b5ad4587b116d0a?s=300",
                    },
                ],
            },
            {
                id: 2,
                firstName: "Jacynthe",
                email: "jamel_ondricka95@gmail.com",
                lastName: "Waelchi",
                status: true,
                birthday: "2020-10-17T13:45:13.314Z",
                avatar: [
                    {
                        name: "Jacynthe.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/421cd73b438f4efe1c48dc5beaa7ee25?s=300",
                    },
                ],
            },
            {
                id: 3,
                firstName: "Alexanne",
                email: "emmy.fisher@hotmail.com",
                lastName: "Farrell",
                status: true,
                birthday: "2021-05-11T14:56:17.106Z",
                avatar: [
                    {
                        name: "Alexanne.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/0f5ee1f86d5198a28fc25c932326c91f?s=300",
                    },
                ],
            },
            {
                id: 4,
                firstName: "Judd",
                email: "berneice7@hotmail.com",
                lastName: "Kessler",
                status: true,
                birthday: "2020-09-25T04:47:38.690Z",
                avatar: [
                    {
                        name: "Judd.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/a54f466c8fc417424172963f365c8d17?s=300",
                    },
                ],
            },
            {
                id: 5,
                firstName: "Kelly",
                email: "donald_quitzon@yahoo.com",
                lastName: "Feil",
                status: false,
                birthday: "2020-11-03T05:19:05.979Z",
                avatar: [
                    {
                        name: "Kelly.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/6513771a92fb224d8527c6b5d5943619?s=300",
                    },
                ],
            },
            {
                id: 6,
                firstName: "Remington",
                email: "amely_sanford@yahoo.com",
                lastName: "Mohr",
                status: false,
                birthday: "2020-10-19T14:01:25.511Z",
                avatar: [
                    {
                        name: "Remington.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902163",
                        url:
                            "http://www.gravatar.com/avatar/8b4e222e397ed7ce70d22194384e221e?s=300",
                    },
                ],
            },
            {
                id: 7,
                firstName: "Delaney",
                email: "noelia77@gmail.com",
                lastName: "Funk",
                status: true,
                birthday: "2021-01-06T15:31:30.377Z",
                avatar: [
                    {
                        name: "Delaney.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/a54c750e8f6db6d35c493988f255d79a?s=300",
                    },
                ],
            },
            {
                id: 8,
                firstName: "Demarco",
                email: "zakary_parker@gmail.com",
                lastName: "Davis",
                status: true,
                birthday: "2020-11-19T10:24:48.316Z",
                avatar: [
                    {
                        name: "Demarco.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/27e5fe54e2cfe16fae38c5185887e6ff?s=300",
                    },
                ],
            },
            {
                id: 9,
                firstName: "Greta",
                email: "halie30@gmail.com",
                lastName: "O'Reilly",
                status: false,
                birthday: "2021-02-21T13:09:39.669Z",
                avatar: [
                    {
                        name: "Greta.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/8c76f628ab83a9d188c1c0c3aa238e8b?s=300",
                    },
                ],
            },
            {
                id: 10,
                firstName: "Felicia",
                email: "cloyd_mckenzie@yahoo.com",
                lastName: "Veum",
                status: false,
                birthday: "2020-09-19T04:51:10.923Z",
                avatar: [
                    {
                        name: "Felicia.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/40b00cefdfc699a9cce8dd27b24a2501?s=300",
                    },
                ],
            },
            {
                id: 11,
                firstName: "Fidel",
                email: "dereck.predovic25@gmail.com",
                lastName: "Hahn",
                status: true,
                birthday: "2020-11-02T07:16:44.305Z",
                avatar: [
                    {
                        name: "Fidel.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/707f3742ad088234b67dff8b9c71cec4?s=300",
                    },
                ],
            },
            {
                id: 12,
                firstName: "Roderick",
                email: "javonte.blick23@gmail.com",
                lastName: "Cremin",
                status: true,
                birthday: "2021-01-01T05:01:09.191Z",
                avatar: [
                    {
                        name: "Roderick.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/151501da9ce62922ac54390dc67c7fb6?s=300",
                    },
                ],
            },
            {
                id: 13,
                firstName: "Jayme",
                email: "august_armstrong@yahoo.com",
                lastName: "Predovic",
                status: false,
                birthday: "2021-03-30T18:43:00.405Z",
                avatar: [
                    {
                        name: "Jayme.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/b6a05bc5d1b1c26023910b7a6c7a6f3f?s=300",
                    },
                ],
            },
            {
                id: 14,
                firstName: "Narciso",
                email: "mertie_toy@gmail.com",
                lastName: "Flatley",
                status: true,
                birthday: "2021-03-22T21:23:34.168Z",
                avatar: [
                    {
                        name: "Narciso.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/234e94d874cf6ac8141218bd1b80e5a2?s=300",
                    },
                ],
            },
            {
                id: 15,
                firstName: "Christy",
                email: "zechariah.vonrueden@gmail.com",
                lastName: "Robel",
                status: true,
                birthday: "2021-03-05T01:11:43.467Z",
                avatar: [
                    {
                        name: "Christy.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/6fd104a5b6c336c8a94d014e962ca74f?s=300",
                    },
                ],
            },
            {
                id: 16,
                firstName: "Marlee",
                email: "tanya.casper@gmail.com",
                lastName: "McLaughlin",
                status: true,
                birthday: "2021-03-01T19:57:35.502Z",
                avatar: [
                    {
                        name: "Marlee.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/4ae191dc84be401952e693834513b11a?s=300",
                    },
                ],
            },
            {
                id: 17,
                firstName: "Gudrun",
                email: "ressie35@hotmail.com",
                lastName: "O'Hara",
                status: false,
                birthday: "2021-01-27T09:20:49.675Z",
                avatar: [
                    {
                        name: "Gudrun.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/0a9dabe445777d0679cbe1bbfeadb128?s=300",
                    },
                ],
            },
            {
                id: 18,
                firstName: "Gia",
                email: "rogelio.schuppe47@hotmail.com",
                lastName: "Wiza",
                status: true,
                birthday: "2020-12-11T23:03:57.591Z",
                avatar: [
                    {
                        name: "Gia.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/8cde85fdb968b67a102ff11344997731?s=300",
                    },
                ],
            },
            {
                id: 19,
                firstName: "Brielle",
                email: "audreanne_king@gmail.com",
                lastName: "Goodwin",
                status: true,
                birthday: "2021-05-20T22:01:31.169Z",
                avatar: [
                    {
                        name: "Brielle.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/192c4704980eba2508a39436cd1b2c62?s=300",
                    },
                ],
            },
            {
                id: 20,
                firstName: "Jermaine",
                email: "yazmin48@gmail.com",
                lastName: "Macejkovic",
                status: true,
                birthday: "2021-01-11T12:33:09.024Z",
                avatar: [
                    {
                        name: "Jermaine.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/35579d77a7cc7d0bbd65b7603ac7d410?s=300",
                    },
                ],
            },
            {
                id: 21,
                firstName: "Ruthe",
                email: "joesph.tillman@hotmail.com",
                lastName: "Jast",
                status: true,
                birthday: "2020-10-11T07:19:41.277Z",
                avatar: [
                    {
                        name: "Ruthe.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/8116f550d8d66fe7b2cd30112df89263?s=300",
                    },
                ],
            },
            {
                id: 22,
                firstName: "Hailee",
                email: "brenden.raynor89@hotmail.com",
                lastName: "Bergstrom",
                status: false,
                birthday: "2020-08-04T11:59:47.700Z",
                avatar: [
                    {
                        name: "Hailee.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/183fe523c7619079c8f2054ce90114dd?s=300",
                    },
                ],
            },
            {
                id: 23,
                firstName: "Vincent",
                email: "edmund_hackett@hotmail.com",
                lastName: "Nitzsche",
                status: true,
                birthday: "2021-02-01T15:15:15.253Z",
                avatar: [
                    {
                        name: "Vincent.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/b535bc7eff03f2ba26fd6ae2bee84d45?s=300",
                    },
                ],
            },
            {
                id: 24,
                firstName: "Layla",
                email: "adaline4@gmail.com",
                lastName: "Rippin",
                status: false,
                birthday: "2021-04-12T12:43:46.184Z",
                avatar: [
                    {
                        name: "Layla.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/88aa8e1438d1cd3146d33dc11154276a?s=300",
                    },
                ],
            },
            {
                id: 25,
                firstName: "Joel",
                email: "marcellus.connelly@gmail.com",
                lastName: "Kautzer",
                status: true,
                birthday: "2021-03-25T07:21:59.009Z",
                avatar: [
                    {
                        name: "Joel.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/1390de1dca31b92e27de74157c4940db?s=300",
                    },
                ],
            },
            {
                id: 26,
                firstName: "Jolie",
                email: "haskell_emard70@hotmail.com",
                lastName: "Grant",
                status: false,
                birthday: "2020-11-27T05:13:22.904Z",
                avatar: [
                    {
                        name: "Jolie.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/aef9a3303f99b235364f9b96271d8507?s=300",
                    },
                ],
            },
            {
                id: 27,
                firstName: "Claudia",
                email: "glennie.grant7@gmail.com",
                lastName: "Ruecker",
                status: false,
                birthday: "2020-09-09T00:39:53.169Z",
                avatar: [
                    {
                        name: "Claudia.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902164",
                        url:
                            "http://www.gravatar.com/avatar/0ea5ec952c455af5bfff5a53f4c07f28?s=300",
                    },
                ],
            },
            {
                id: 28,
                firstName: "Rasheed",
                email: "norberto_kunde@hotmail.com",
                lastName: "Armstrong",
                status: true,
                birthday: "2021-05-02T00:47:18.955Z",
                avatar: [
                    {
                        name: "Rasheed.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/c8a6d08bf72b32b524e2522353acabd2?s=300",
                    },
                ],
            },
            {
                id: 29,
                firstName: "Tianna",
                email: "darron66@gmail.com",
                lastName: "Torphy",
                status: false,
                birthday: "2020-08-03T12:08:52.026Z",
                avatar: [
                    {
                        name: "Tianna.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/9d240c9bb208d6e5571753c62efe37fa?s=300",
                    },
                ],
            },
            {
                id: 30,
                firstName: "Alvena",
                email: "blake_hauck74@hotmail.com",
                lastName: "Heathcote",
                status: true,
                birthday: "2021-03-11T12:01:07.013Z",
                avatar: [
                    {
                        name: "Alvena.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/2a58501ac239470777c68859063b521d?s=300",
                    },
                ],
            },
            {
                id: 31,
                firstName: "Neal",
                email: "art.homenick51@yahoo.com",
                lastName: "Donnelly",
                status: false,
                birthday: "2021-02-21T07:28:07.312Z",
                avatar: [
                    {
                        name: "Neal.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/62271034e565b3b20e748a1f8a72d145?s=300",
                    },
                ],
            },
            {
                id: 32,
                firstName: "Kristy",
                email: "hermina_braun74@gmail.com",
                lastName: "Conn",
                status: false,
                birthday: "2020-07-12T16:55:23.038Z",
                avatar: [
                    {
                        name: "Kristy.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/919790033f0e32f6b5f3bb7d94f88e44?s=300",
                    },
                ],
            },
            {
                id: 33,
                firstName: "Vivien",
                email: "fletcher_ondricka@yahoo.com",
                lastName: "Maggio",
                status: true,
                birthday: "2021-03-16T03:12:41.357Z",
                avatar: [
                    {
                        name: "Vivien.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/114a641308b1ee3ae17186cbb49cd5d9?s=300",
                    },
                ],
            },
            {
                id: 34,
                firstName: "Christopher",
                email: "ova50@yahoo.com",
                lastName: "Haley",
                status: true,
                birthday: "2020-07-31T04:16:34.180Z",
                avatar: [
                    {
                        name: "Christopher.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/5802e68a71ba47365114e0541099e2a1?s=300",
                    },
                ],
            },
            {
                id: 35,
                firstName: "Rosanna",
                email: "zander.rice@gmail.com",
                lastName: "Harvey",
                status: false,
                birthday: "2020-12-24T05:50:15.430Z",
                avatar: [
                    {
                        name: "Rosanna.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/8ec0d97bb36688e019d09a31db42d331?s=300",
                    },
                ],
            },
            {
                id: 36,
                firstName: "Raegan",
                email: "hallie84@hotmail.com",
                lastName: "Sipes",
                status: true,
                birthday: "2020-07-14T00:35:18.018Z",
                avatar: [
                    {
                        name: "Raegan.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/c865551aa5a6d03b9a4ff3ae53302fdc?s=300",
                    },
                ],
            },
            {
                id: 37,
                firstName: "Braxton",
                email: "rosie51@gmail.com",
                lastName: "Schultz",
                status: false,
                birthday: "2020-07-03T04:20:45.542Z",
                avatar: [
                    {
                        name: "Braxton.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/a040a3b18fbd2e2c4dbe1013e03ed738?s=300",
                    },
                ],
            },
            {
                id: 38,
                firstName: "Selena",
                email: "oswaldo.lehner39@yahoo.com",
                lastName: "Harber",
                status: true,
                birthday: "2020-12-16T13:42:28.214Z",
                avatar: [
                    {
                        name: "Selena.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/6755fc9535dc2eec01fc979d7b2d5f0a?s=300",
                    },
                ],
            },
            {
                id: 39,
                firstName: "Carleton",
                email: "kiarra.yundt@yahoo.com",
                lastName: "Funk",
                status: false,
                birthday: "2021-01-29T04:21:04.635Z",
                avatar: [
                    {
                        name: "Carleton.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/25ec66f243247df404cb71aa559fc56c?s=300",
                    },
                ],
            },
            {
                id: 40,
                firstName: "Rosalyn",
                email: "craig_ullrich@gmail.com",
                lastName: "Jerde",
                status: true,
                birthday: "2020-08-02T18:43:05.102Z",
                avatar: [
                    {
                        name: "Rosalyn.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/da9528699710c2687cd948037cf00498?s=300",
                    },
                ],
            },
            {
                id: 41,
                firstName: "Araceli",
                email: "eden_koss@gmail.com",
                lastName: "Ankunding",
                status: false,
                birthday: "2021-03-23T13:12:26.611Z",
                avatar: [
                    {
                        name: "Araceli.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/7b3024ae9cd6a7250117a95359bf43bc?s=300",
                    },
                ],
            },
            {
                id: 42,
                firstName: "Michele",
                email: "emil_west60@hotmail.com",
                lastName: "Towne",
                status: false,
                birthday: "2020-09-17T06:26:51.746Z",
                avatar: [
                    {
                        name: "Michele.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/c5b02ed347e4b3ab6d3dc9932b1fbeef?s=300",
                    },
                ],
            },
            {
                id: 43,
                firstName: "Lue",
                email: "beverly.hansen54@hotmail.com",
                lastName: "Flatley",
                status: true,
                birthday: "2020-08-30T15:25:14.041Z",
                avatar: [
                    {
                        name: "Lue.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/5e1173a26f4a76740220719def6f9ab0?s=300",
                    },
                ],
            },
            {
                id: 44,
                firstName: "Eliane",
                email: "richie85@hotmail.com",
                lastName: "Prosacco",
                status: false,
                birthday: "2021-04-15T02:29:38.508Z",
                avatar: [
                    {
                        name: "Eliane.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/7c65b19b968806dfbba7e44d0bad0494?s=300",
                    },
                ],
            },
            {
                id: 45,
                firstName: "Dale",
                email: "katrine_stamm@gmail.com",
                lastName: "Kuphal",
                status: true,
                birthday: "2021-01-25T09:51:49.691Z",
                avatar: [
                    {
                        name: "Dale.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/d5b9d32f63315715a2ee7eec3537eefd?s=300",
                    },
                ],
            },
            {
                id: 46,
                firstName: "Gerard",
                email: "virginie94@hotmail.com",
                lastName: "Wunsch",
                status: true,
                birthday: "2021-01-13T19:52:35.023Z",
                avatar: [
                    {
                        name: "Gerard.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/6c0a671f425be190610aaa5d9ee6b751?s=300",
                    },
                ],
            },
            {
                id: 47,
                firstName: "Greta",
                email: "gabriella_jacobson69@hotmail.com",
                lastName: "Shields",
                status: true,
                birthday: "2021-01-31T12:37:35.124Z",
                avatar: [
                    {
                        name: "Greta.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/96e99dd6d42919a5bbaa523e039ed505?s=300",
                    },
                ],
            },
            {
                id: 48,
                firstName: "Elinore",
                email: "kyleigh_powlowski47@yahoo.com",
                lastName: "Padberg",
                status: true,
                birthday: "2021-03-16T12:56:08.925Z",
                avatar: [
                    {
                        name: "Elinore.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/8a3aff921b1286caef37c3a6ab8922ed?s=300",
                    },
                ],
            },
            {
                id: 49,
                firstName: "Vita",
                email: "bernice_reichel@gmail.com",
                lastName: "Gottlieb",
                status: true,
                birthday: "2020-07-14T04:25:13.203Z",
                avatar: [
                    {
                        name: "Vita.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/65c2a79bd56b843604b7d1edace158f7?s=300",
                    },
                ],
            },
            {
                id: 50,
                firstName: "Cortez",
                email: "rahul.damore39@yahoo.com",
                lastName: "Crooks",
                status: false,
                birthday: "2021-03-06T13:48:02.030Z",
                avatar: [
                    {
                        name: "Cortez.jpg",
                        percent: 100,
                        size: 40088,
                        status: "done",
                        type: "image/jpeg",
                        uid: "rc-upload-1621595902165",
                        url:
                            "http://www.gravatar.com/avatar/ff556a7e4fcbc159b55bde887e4669a1?s=300",
                    },
                ],
            },
        ],
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Fri, 21 May 2021 12:27:49 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "24079",
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
            "Access-Control-Allow-Origin",
            "*",
            "X-Content-Type-Options",
            "nosniff",
            "ETag",
            'W/"5e0f-Mda+l0GWKw7XFWneFgP2RUrwx7c"',
        ],
    );

nock("https://refine-fake-rest.pankod.com:443", {
    encodedQueryParams: true,
})
    .post("/users", {
        firstName: "test",
        lastName: "test",
        email: "test@mail.com",
        status: true,
    })
    .reply(
        201,
        {
            firstName: "test",
            lastName: "test",
            email: "test@mail.com",
            status: true,
            id: 51,
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Fri, 21 May 2021 12:30:07 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Content-Length",
            "105",
            "Connection",
            "close",
            "X-Powered-By",
            "Express",
            "Vary",
            "Origin, X-HTTP-Method-Override, Accept-Encoding",
            "Access-Control-Allow-Credentials",
            "true",
            "Cache-Control",
            "no-cache",
            "Pragma",
            "no-cache",
            "Expires",
            "-1",
            "Access-Control-Allow-Origin",
            "*",
            "Access-Control-Expose-Headers",
            "Location",
            "Location",
            "http://refine-fake-rest.pankod.com/users/51",
            "X-Content-Type-Options",
            "nosniff",
            "ETag",
            'W/"69-ZOo+LCFMeEdi+N0u0NisuFgdFO4"',
        ],
    );
