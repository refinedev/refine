import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerBindings from "@refinedev/tanstack-router";
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
} from "@tanstack/react-router";

// Root route
const rootRoute = createRootRoute({
  component: () => <div>Root Layout</div>,
});

// Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Welcome to Refine with TanStack Router!</div>,
});

// Posts routes
const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts",
  component: () => <PostsList />,
});

const postCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts/create",
  component: () => <div>Create Post</div>,
});

// Route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  postsRoute,
  postCreateRoute,
]);

// Router instance
const router = createRouter({ routeTree });

// Simple Posts List component
function PostsList() {
  return (
    <div>
      <h1>Posts</h1>
      <p>This is where the posts list would be displayed.</p>
      <a href="/posts/create">Create New Post</a>
    </div>
  );
}

function App() {
  return (
    <RouterProvider router={router}>
      <Refine
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        routerProvider={routerBindings}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
          },
        ]}
      />
    </RouterProvider>
  );
}

export default App;
