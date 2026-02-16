---
title: "Blog Post Template"
description: "Learn what admin panels are, how they differ from dashboards, and the best approaches to building them. Covers security, architecture, and build vs buy decisions."
slug: "blog-test"
tags: [guides, admin-panel, internal-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2026-02-16-what-is-an-admin-panel/what-is-an-admin-panel-banner.webp
hide_table_of_contents: false
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# H1 - Heading Test

Bu paragrafta inline `code`, [normal link](/core/docs), ve linked code [`useTable`](/core/docs/data/hooks/use-table/) var.

## H2 - Heading Test

### H3 - Heading Test

#### H4 - Heading Test

Bu bölüm uzun paragraf testi için eklendi. Admin panel geliştirme sürecinde ekipler genellikle aynı anda birden fazla ihtiyacı karşılamak zorunda kalır: kullanıcı yönetimi, rol bazlı yetkilendirme, veri listeleme, form tabanlı düzenleme, hatalı işlemleri geri alma, audit log takibi ve operasyon ekipleri için güvenli ama hızlı bir kullanım deneyimi. Bu yüzden içerik tarafında da uzun metinlerin satır yüksekliği, harf aralığı, link renkleri, inline `code` görünümü, linked code stilleri, listelerle birlikte akış ve dar ekranlardaki kırılma davranışı birlikte test edilmelidir; aksi durumda tek tek düzgün görünen parçalar gerçek bir blog yazısında bir araya geldiğinde görsel tutarsızlıklar ve okunabilirlik sorunları ortaya çıkar.

## Admonition Test

:::caution Caution

Bu bir `caution` admonition. Linked code örneği: [`CanParams`](/core/docs/core/interface-references#canparams). Normal link örneği: [Interface References](/core/docs/core/interface-references/).

- caution list item 1
- caution list item 2

:::

:::danger Danger

Bu bir `danger` admonition. Linked code örneği: [`CanResponse`](/core/docs/core/interface-references#canresponse). Normal link örneği: [Access Control Provider](/core/docs/authorization/access-control-provider/).

- danger list item 1
- danger list item 2

:::

:::info Information

Bu bir `info` admonition. Linked code örneği: [`AuthProvider`](/core/docs/authentication/auth-provider). Normal link örneği: [Authentication](/core/docs/authentication/auth-provider).

- info list item 1
- info list item 2

:::

:::info-tip Information Tip

Bu bir `info-tip` admonition. Linked code örneği: [`useList`](/core/docs/data/hooks/use-list/). Normal link örneği: [Data Hooks](/core/docs/data/hooks/use-list/).

- info-tip list item 1
- info-tip list item 2

:::

:::tip Tip

Bu bir `tip` admonition. Linked code örneği: [`useCreate`](/core/docs/data/hooks/use-create/). Normal link örneği: [Create Hook](/core/docs/data/hooks/use-create/).

- tip list item 1
- tip list item 2

:::

:::note Note

Bu bir `note` admonition. Linked code örneği: [`useUpdate`](/core/docs/data/hooks/use-update/). Normal link örneği: [Update Hook](/core/docs/data/hooks/use-update/).

- note list item 1
- note list item 2

:::

:::simple Interface References

- [`CanParams`](/core/docs/core/interface-references#canparams): Arguments for the `can` method.
- [`CanResponse`](/core/docs/core/interface-references#canresponse): Return type of the `can` method.
- [See all interface references](/core/docs/core/interface-references/): Normal link example.

:::

## List Test

Unordered list:

- item 1
- item 2
- item 3 with `inline-code`

Ordered list:

1. first
2. second
3. third

## Image Test

![Admin panel example banner](https://refine.ams3.cdn.digitaloceanspaces.com/blog/2026-02-16-what-is-an-admin-panel/what-is-an-admin-panel-banner.webp)

[![Linked image test](https://refine.ams3.cdn.digitaloceanspaces.com/blog/2026-02-16-what-is-an-admin-panel/what-is-an-admin-panel-banner.webp)](/core/docs)

## Table Test

| Area           | Capability             | Status      | Docs Link                                                                    | Linked Code                                                                  | Notes                                                 |
| -------------- | ---------------------- | ----------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| Access Control | RBAC checks            | Ready       | [Access Control Provider](/core/docs/authorization/access-control-provider/) | [`accessControlProvider`](/core/docs/authorization/access-control-provider/) | Policies include `can` and `canDelete`.               |
| Authentication | Login/logout/session   | In Progress | [Authentication](/core/docs/authentication/auth-provider)                    | [`authProvider`](/core/docs/authentication/auth-provider)                    | `checkAuth` + `checkError` testleri tamamlanmalı.     |
| Data Layer     | CRUD operations        | Ready       | [Data Provider](/core/docs/data/data-provider/)                              | [`dataProvider`](/core/docs/data/data-provider/)                             | `getList`, `getOne`, `create`, `update`, `deleteOne`. |
| List Views     | Pagination/filter/sort | Ready       | [useList](/core/docs/data/hooks/use-list/)                                   | [`useList`](/core/docs/data/hooks/use-list/)                                 | Server-side `pagination.mode = "server"`.             |
| Table Views    | Table state sync       | Ready       | [useTable](/core/docs/data/hooks/use-table/)                                 | [`useTable`](/core/docs/data/hooks/use-table/)                               | URL query sync aktif.                                 |
| Forms          | Create & edit forms    | Ready       | [useForm](/core/docs/data/hooks/use-form/)                                   | [`useForm`](/core/docs/data/hooks/use-form/)                                 | Validation + mutation mode birlikte test edildi.      |
| Mutations      | Create flow            | Ready       | [useCreate](/core/docs/data/hooks/use-create/)                               | [`useCreate`](/core/docs/data/hooks/use-create/)                             | Success notification bağlı.                           |
| Mutations      | Update flow            | Ready       | [useUpdate](/core/docs/data/hooks/use-update/)                               | [`useUpdate`](/core/docs/data/hooks/use-update/)                             | Optimistic update senaryosu eklendi.                  |
| Mutations      | Delete flow            | Planned     | [useDelete](/core/docs/data/hooks/use-delete/)                               | [`useDelete`](/core/docs/data/hooks/use-delete/)                             | Confirm modal + undo akışı bekliyor.                  |
| Routing        | Resource-based routing | Ready       | [Router Provider](/core/docs/routing/router-provider/)                       | [`routerProvider`](/core/docs/routing/router-provider/)                      | `list`, `create`, `edit`, `show` route’ları bağlı.    |
| Notifications  | User feedback          | In Progress | [Notification Provider](/core/docs/notification/notification-provider/)      | [`notificationProvider`](/core/docs/notification/notification-provider/)     | Error messages standardize edilecek.                  |
| Audit Logs     | Action tracking        | Planned     | [Audit Log Provider](/core/docs/audit-logs/audit-log-provider/)              | [`auditLogProvider`](/core/docs/audit-logs/audit-log-provider/)              | Sensitive events için zorunlu kayıt.                  |

## Code Block Test

```ts title="src/pages/posts/index.tsx"
type Post = {
  id: number;
  title: string;
  status: "draft" | "published";
};

const post: Post = {
  id: 1,
  title: "Hello Refine",
  status: "published",
};
```

```bash
npm install @refinedev/core @refinedev/react-router
npm run dev
```

## Tabs Test

<Tabs>
  <TabItem value="quick-start" label="Quick Start" default>

Hızlı başlangıç akışı. Önce [Quickstart](/core/docs/getting-started/quickstart/) bölümünü kontrol et, sonra linked code olarak [`useTable`](/core/docs/data/hooks/use-table/) ve [`useForm`](/core/docs/data/hooks/use-form/) örneklerini uygula.

Önerilen adımlar:

- Projeyi oluştur: `npm create refine-app@latest`
- Data katmanını bağla: [`dataProvider`](/core/docs/data/data-provider/)
- Auth katmanını bağla: [`authProvider`](/core/docs/authentication/auth-provider)
- Yetkilendirme ekle: [`accessControlProvider`](/core/docs/authorization/access-control-provider/)
- Liste ekranı kur: [`useList`](/core/docs/data/hooks/use-list/)
- Tablo ekranı kur: [`useTable`](/core/docs/data/hooks/use-table/)
- Form ekranı kur: [`useForm`](/core/docs/data/hooks/use-form/)
- Mutation test et: [`useCreate`](/core/docs/data/hooks/use-create/) ve [`useUpdate`](/core/docs/data/hooks/use-update/)

Kurulum komutları:

```bash
npm create refine-app@latest my-admin-app
cd my-admin-app
npm install
npm run dev
```

  </TabItem>
  <TabItem value="manual-setup" label="Manual Setup">

Manual kurulumda [router provider](/core/docs/routing/router-provider/) ve [notification provider](/core/docs/notification/notification-provider/) parçalarını ayrı ayrı bağlamak daha kontrollü olur.

Kurulum checklist:

- Temel paketleri ekle: `@refinedev/core`, `@refinedev/react-router`
- Uygun data adapter kur: örn. [simple-rest](/core/docs/data/packages/simple-rest/)
- Resource tanımlarını ekle: `posts`, `categories`, `users`
- Link ve linked code testleri yap: [`useNavigation`](/core/docs/routing/hooks/use-go/) ve [`routerProvider`](/core/docs/routing/router-provider/)
- Hata yönetimi için `onError` ve notification akışını doğrula

Örnek sağlayıcı bağlantısı:

```ts
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

export const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        { name: "posts", list: "/posts", create: "/posts/create" },
        { name: "categories", list: "/categories" },
      ]}
    />
  );
};
```

Ek kaynaklar:

- [Routing Guide](/core/docs/guides-concepts/routing/)
- [Data Fetching Guide](/core/docs/guides-concepts/data-fetching/)
- [Forms Guide](/core/docs/guides-concepts/forms/)

```bash
pnpm create refine-app@latest my-admin-app
pnpm install
pnpm dev
```

  </TabItem>
  <TabItem value="qa-checklist" label="QA Checklist">

Bu tab görsel/regresyon kontrolü için uzun bir test listesi içerir. Link, linked code, inline `code`, listeler ve snippet birlikte test edilir.

QA maddeleri:

- Heading hierarchy doğru mu (`h1`-`h6`)?
- Normal link rengi doğru mu? Örn: [Access Control](/core/docs/authorization/access-control-provider/)
- Linked code rengi doğru mu? Örn: [`useDelete`](/core/docs/data/hooks/use-delete/)
- Admonition içindeki link + linked code stilleri doğru mu?
- Table satırları desktop ve mobile’da taşmadan görünüyor mu?
- Code block içinde satır kırılımı ve font doğru mu?
- Tabs içinde aktif tab göstergesi doğru mu?
- Dark mode’da `inline code`, `linked code` ve `li::marker` renkleri okunabilir mi?
- TOC linkleri linked code stilinden etkileniyor mu (`refine-toc-item`)?
- `simple` admonition içinde `ul` margin/padding beklenen gibi mi?

Hızlı smoke command:

```bash
npm run start
```

Opsiyonel test snippet:

```json
{
  "scenario": "blog-style-regression",
  "checks": [
    "admonition-link-code-colors",
    "table-overflow",
    "tabs-content-layout",
    "image-radius-and-spacing",
    "toc-code-style-isolation"
  ],
  "status": "ready"
}
```

  </TabItem>
</Tabs>

<br />

## Login Page

We will create a simple login page to demonstrate the authentication flow. We will use the [`useLogin`](https://refine.dev/core/docs/api-reference/core/hooks/authentication/useLogin/) hook to handle the login process. This hook will call the `login` function that is defined in the `authProvider`.

Let's create a `<LoginPage />` component in the `src/pages/login/index.tsx` directory with the following code:

<details>
<summary>Login Page</summary>

```tsx title="src/pages/login/index.tsx"
import { useState } from "react";
import { useLogin } from "@refinedev/core";

import {
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
  Button,
} from "react95";

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [email, setemail] = useState("info@refine.dev");
  const [password, setPassword] = useState("refine-supabase");

  const { mutate: login } = useLogin<ILoginForm>();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "rgb(0, 128, 128)",
      }}
    >
      <Window>
        <WindowHeader active={true} className="window-header">
          <span> Refine Login</span>
        </WindowHeader>
        <div style={{ marginTop: 8 }}>
          <img
            src="https://raw.githubusercontent.com/refinedev/refine/main/logo.png"
            alt="Refine logo in login window"
            width={100}
          />
        </div>
        <WindowContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login({ email, password });
            }}
          >
            <div style={{ width: 500 }}>
              <div style={{ display: "flex" }}>
                <TextInput
                  placeholder="User Name"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <br />
              <TextInput
                placeholder="Password"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <Button type="submit" value="login">
                Sign in
              </Button>
            </div>
          </form>
        </WindowContent>
      </Window>
    </div>
  );
};
```

</details>

Now that we've created our Login page, but we need to add it as a route to our application. Let's add it in the `src/App.tsx` file.

<details>

<summary>src/App.tsx</summary>

```tsx title="src/App.tsx"
// ...

import { Refine, Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router-v6";
import { Outlet, Route, Routes } from "react-router-dom";

//highlight-next-line
import { LoginPage } from "./pages/login";

function App() {
    return (
        {/* ... */}
        <Refine
        // ...
        >
            <Routes>
                {/*highlight-start*/}
                <Route
                    element={
                        <Authenticated fallback={<Outlet />}>
                            <NavigateToResource />
                        </Authenticated>
                    }
                >
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                {/*highlight-end*/}
            </Routes>
            {/* ... */}
        </Refine>
        {/* ... */}
    );
}

export default App;
```

</details>
