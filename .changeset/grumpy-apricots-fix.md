---
"@refinedev/core": patch
---

BREAKING CHANGE fix: added required `key` prop to `<Auhtenticated />` component to resolve issues with its unmounting and remounting behavior.

Due to the [nature of react](https://react.dev/learn/rendering-lists#why-does-react-need-keys), `<Authenticated />` components are unmounted and remounted again when the route changes. This may cause unwanted behaviors on the rendering and redirections logic. To avoid such issues, You need to add `key` prop to `<Authenticated />` components if you have more than one `<Authenticated />` component in the same level.

```tsx
import { Refine, Authenticated, AuthPage } from "@refinedev/core";
import {
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Refine {/* ... */}>
        <Routes>
          <Route
            element={
              <Authenticated
                key="authenticated-routes"
                fallback={<CatchAllNavigate to="/login" />}
              >
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<h1>Dashboard Page</h1>} />
          </Route>

          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                <NavigateToResource resource="posts" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/register" element={<AuthPage type="register" />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```
