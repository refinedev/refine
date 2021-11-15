import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import { newEnforcer, newModel, MemoryAdapter } from "casbin.js";

import { PostList, PostCreate, PostEdit, PostShow } from "@components/posts";

import "@pankod/refine/dist/styles.min.css";

const API_URL = "https://api.fake-rest.refine.dev";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new MemoryAdapter(`
p, user, posts, (list)|(delete)|(create)|(show)

p, user, posts/10, delete
p, user, posts/*, edit

`);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            accessControlProvider={{
                can: async ({ action, params, resource }) => {
                    const enforcer = await newEnforcer(model, adapter);
                    if (
                        (action === "delete" || action === "edit") &&
                        !!params
                    ) {
                        return enforcer.enforce(
                            "user",
                            `${resource}/${params.id}`,
                            action,
                        );
                    }
                    return enforcer.enforce("user", `${resource}`, action);
                },
            }}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
