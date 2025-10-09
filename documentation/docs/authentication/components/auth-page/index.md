---
title: <AuthPage />
description: <AuthPage> component from Refine is an authentication page that can be used to login, register, forgot password, and update password.
source: packages/core/src/components/pages/auth/index.tsx
---

`<AuthPage>` component from Refine provides authentication pages for login, register, forgot password, and update password.

Before using `<AuthPage>` you need to add an [authProvider](/docs/authentication/auth-provider) to handle authentication.

```css live shared
body {
  background-color: #f5f5f5;
}
const { useLogout: useLogoutShared } = RefineCore;

window.__refineAuthStatus = false;

const authProvider = {
  login: async () => {
    window.__refineAuthStatus = true;
    return { success: true, redirectTo: "/" };
  },
  register: async () => ({ success: true }),
  forgotPassword: async () => ({ success: true }),
  updatePassword: async () => ({ success: true }),
  logout: async () => {
    window.__refineAuthStatus = false;
    return { success: true, redirectTo: "/login" };
  },
  check: async () => ({ authenticated: window.__refineAuthStatus }),
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => ["admin"],
  getIdentity: async () => null,
};

const DashboardPage = () => {
  const { mutate: logout } = useLogoutShared();
  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

const Wrapper = (children) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ width: "400px" }}>{children}</div>
  </div>
);
setInitialRoutes(["/login"]);

import { Refine, AuthPage, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { CatchAllNavigate } from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { authProvider } from "./authProvider";
import { DashboardPage } from "pages/dashboard";

const App = () => (
  <BrowserRouter>
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      routerProvider={routerProvider}
      authProvider={authProvider}
    >
      <Routes>
        <Route
          element={
            <Authenticated fallback={<CatchAllNavigate to="/login" />}>
              <Outlet />
            </Authenticated>
          }
        >
          <Route index element={<DashboardPage />} />
        </Route>
        <Route element={<Authenticated fallback={<Outlet />} />}>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage type="register" />} />
          <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
          <Route path="/update-password" element={<AuthPage type="updatePassword" />} />
        </Route>
      </Routes>
    </Refine>
  </BrowserRouter>
);
render(<App />);
<AuthPage
  type="login"
  hideForm={true}
  providers={[
    { name: "google", icon: GoogleIcon, label: "Sign in with Google" },
    { name: "github", icon: GithubIcon, label: "Sign in with GitHub" }
  ]}
/>
<AuthPage
  type="login"
  providers={[
    { name: "github", icon: <svg />, label: "Sign in with GitHub" },
    { name: "google", icon: <svg />, label: "Sign in with Google" },
  ]}
/>
<AuthPage
  type="login"
  rememberMe={
    <div style={{ border: "1px dashed cornflowerblue", padding: 3 }}>
      <input name="CustomRememberMe" type="checkbox" /> Custom remember me
    </div>
  }
/>
<AuthPage
  type="register"
  loginLink={<Link to="/login">Login</Link>}
/>

<AuthPage
  type="login"
  registerLink={<Link to="/register">Register</Link>}
  forgotPasswordLink={<Link to="/forgot-password">Forgot Password</Link>}
/>
<AuthPage
  type="login"
  wrapperProps={{
    style: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }}
/>
<AuthPage
  type="login"
  contentProps={{ style: { background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" } }}
/>
<AuthPage
  type="login"
  formProps={{
    onSubmit: (e) => {
      e.preventDefault();
      alert(JSON.stringify({ email: e.target.email.value, password: e.target.password.value }));
    },
  }}
/>
<AuthPage
  type="login"
  renderContent={(content) => (
    <div style={{ textAlign: "center" }}>
      <h1>Extra Header</h1>
      {content}
      <h2>Extra Footer</h2>
    </div>
  )}
/>
<AuthPage
  type="login"
  mutationVariables={{ foo: "bar", xyz: "abc" }}
/>
interface OAuthProvider {
  name: string;
  icon?: React.ReactNode;
  label?: string;
}
