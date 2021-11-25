import React, { useState } from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import { newEnforcer, newModel, MemoryAdapter } from "casbin.js";

import { Header } from "@components/header";
import { PostList, PostCreate, PostEdit, PostShow } from "@components/posts";
import {
    CategoryList,
    CategoryCreate,
    CategoryEdit,
    CategoryShow,
} from "@components/categories";
import { UserList, UserCreate, UserEdit, UserShow } from "@components/users";

import "@pankod/refine/dist/styles.min.css";

const API_URL = "https://api.fake-rest.refine.dev";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
p, admin, posts/*, (edit)|(show)|(delete)
p, admin, posts/*, field

p, admin, users, (list)|(create)
p, admin, users/*, (edit)|(show)|(delete)

p, admin, categories, (list)|(create)
p, admin, categories/*, (edit)|(show)|(delete)

p, editor, posts, (list)|(create)
p, editor, posts/*, (edit)|(show)
p, editor, posts/hit, field, deny

p, editor, categories, list

`);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    // const [role, setRole] = useState("admin");
    const role = "editor";

    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            accessControlProvider={{
                can: async ({ action, params, resource }) => {
                    const enforcer = await newEnforcer(model, adapter);
                    if (
                        action === "delete" ||
                        action === "edit" ||
                        action === "show"
                    ) {
                        return Promise.resolve({
                            can: await enforcer.enforce(
                                role,
                                `${resource}/${params.id}`,
                                action,
                            ),
                        });
                    }
                    if (action === "field") {
                        return Promise.resolve({
                            can: await enforcer.enforce(
                                role,
                                `${resource}/${params.field}`,
                                action,
                            ),
                        });
                    }
                    return Promise.resolve({
                        can: await enforcer.enforce(role, resource, action),
                    });
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
                {
                    name: "users",
                    list: UserList,
                    create: UserCreate,
                    edit: UserEdit,
                    show: UserShow,
                },
                {
                    name: "categories",
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    show: CategoryShow,
                },
            ]}
            // Header={() => <Header role={role} setRole={setRole} />}
        >
            <Component {...pageProps} />
        </Refine>
    );
}

export default MyApp;
