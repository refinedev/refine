import { newModel, MemoryAdapter } from "casbin.js";

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
p, admin, posts, (list)|(create), allow
p, admin, posts/*, (edit)|(show)|(delete)|(field), allow

p, admin, users, (list)|(create), allow
p, admin, users/*, (edit)|(show)|(delete), allow

p, admin, categories, (list)|(create), allow
p, admin, categories/*, (edit)|(show)|(delete), allow

p, editor, posts, (list)|(create), allow
p, editor, posts/*, (edit)|(show), allow
p, editor, posts/hit, field, deny

p, editor, categories, list

`);
