---
"@refinedev/core": patch
---

### Breaking changes

fix: added required `key` prop to `<Auhtenticated />` component to resolve issues of rendering of the unwanted content and wrongful redirections. #4782

#### Why is it required?

Due to the [nature of React](https://react.dev/learn/rendering-lists#why-does-react-need-keys), components are not unmounted and remounted again if props are changed. While this is mostly a good practice for performance, in some cases you'll want your component to re-mount instead of updating; for example, if you don't want to use any of the previous states and effects initiated with the old props.

The `<Authenticated />` component has this kind of scenario when it's used for page-level authentication checks. If the previous check results were used for the rendering of the content (`fallback` or `children`) this may lead to unexpected behaviors and flashing of the unwanted content.

To avoid this, a key property must be set with different values for each use of the `<Authenticated />` components. This will make sure that React will unmount and remount the component instead of updating the props.

```tsx
import { Refine, Authenticated, AuthPage } from "@refinedev/core";
import {
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

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
              <Authenticated key="unauthenticated-routes" fallback={<Outlet />}>
                 <Navigate to="/" replace />
              </Authenticated>
            }
          >
            <Route path="/login" element={<AuthPage type="login" />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

In the example above, the `<Authenticated />` is rendered as the wrapper of both the `index` route and `/login` route. Without a `key` property, `<Authenticated />` will not be re-mounted and can result in rendering the content depending on the previous authentication check. This will lead to redirecting to `/login` when trying to access the `index` route instead of rendering the content of the `index` or navigating to `index` route instead of `/login` if the user just logged out.
