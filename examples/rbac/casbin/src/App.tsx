import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine/dist/styles.min.css";
import { newEnforcer, newModel, MemoryAdapter } from "casbin.js";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

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
p, user, posts, (list)|(delete)|(edit)

p, user, posts/10, delete
p, user, posts/9, edit

`);

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            accessControlProvider={{
                can: async ({ action, params, resource }) => {
                    const enforcer = await newEnforcer(model, adapter);
                    if (action === "delete" || action === "edit") {
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
                    canDelete: true,
                },
            ]}
        />
    );
};

export default App;
