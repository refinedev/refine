---
title: An Intro to Server Components in React
description: We will discuss what React server components are as well as how to incorporate them into building applications.
slug: react-server-components
authors: peter_osah
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-07-09-react-server-components/social.png
hide_table_of_contents: false
---

**_This article was last updated on January 25, 2024 to add new usecases and clear definition for React Server Components_**

## Introduction

There has been a lot of hype and excitement around React server components(RSCs) recently. This is largely because server components run exclusively on the server. Therefore, eliminating the need to bundle server components with client JavaScript. With RSCs, you can now have a mix of both server components and the traditional client components in a single application.

RSCs also improve page load time because you can prefetch data from the database or an API and prerender your UI on the server. In this article, we'll discuss React server components and how to start using them.

Steps we'll follow:

- [What are React server components?](#what-are-react-server-components)
- [Problems React server components attempt to solve](#problems-react-server-components-attempt-to-solve)
- [Differences between React server components and client components](#differences-between-react-server-components-and-client-components)
- [Differences between React server components and server-side rendering(SSR) in React](#differences-between-react-server-components-and-server-side-renderingssr-in-react)
- [Using server components in a React application](#using-server-components-in-a-react-application)
- [When to use React server components?](#when-to-use-react-server-components)
- [Using server components in a Next.js application](#using-server-components-in-a-nextjs-application)
- [Pros and Cons of React server components](#pros-and-cons-of-react-server-components)

## What are React server components?

React Server Components(RSCs) are a new addition to the React ecosystem. With RSCs, you can create components that run exclusively on the server side. These components are referred to as Server Components.

With RSCs, data fetching and all other side effects happen on the server and rendering happen at the component level. It eliminates round trips as with conventional rendering because of the proximity of the data fetching functionality to the database server or API.

Server components execute once at build time or on demand when a user hits an endpoint. You can fetch data from the database or API and render it once. The rendered data is locked. The code you write in a Server component remains on the server. It is not shipped to the front-end. Therefore, Server Components do not use React hooks and don't have access to web APIs.

## Problems React server components attempt to solve

In this section, we will explore real-world problems that RSCs attempt to solve.

As an illustration, let's assume the code below displays product details on a web app. The `ProductPage` component renders the `ProductDetails`, `ProductItem`, and `MatchedItems` components .

```tsx
const ProductPage = ({ productId }) => {
  return (
    <>
      <ProductDetails productId={productId}>
        <ProductItem productId={productId} />
        <MatchedItems productId={productId} />
      </ProductDetails>
    </>
  );
};
```

There are several ways you can fetch the data to display on the above page. We could fetch the data all at once in the `ProductPage` component as in the example below:

```tsx
const ProductPage = ({ productId }) => {
  const data = fetchContentsFromAPI();

  return (
    <>
      <ProductDetails details={data.details} productId={productId}>
        <ProductItem item={data.product} productId={productId} />
        <MatchedItems items={data.matchedItems} productId={productId} />
      </ProductDetails>
    </>
  );
};
```

The above approach works fine and has its advantage.

- It could provide a good user experience since all the components are rendered after fetching the data.

However, it may create some issues below.

- It creates a high level of coupling. The child components are tightly coupled with their parent. They also depend on the data the parent component provides. This makes it difficult to maintain them.
- It also goes against the idea of single responsibility. The child components aren't individually responsible for their data. They're dependent on the data from their parent.
- High load time. The parent component fetches all the data for all the components at once.

For the sake of single responsibility, we could refactor the parent component to render its children as follows:

```tsx
const ProductDetails = ({ productId, children }) => {
  const details = fetchProductDetails(productId);

  return <>{{ children }}</>;
};

const ProductItem = ({ productId }) => {
  const item = fetchProductItem(productId);

  return /*...*/;
};

const MatchedItems = ({ productId }) => {
  const items = fetchMatchedItems(productId);

  return /*...*/;
};

const ProductPage = ({ productId }) => {
  return (
    <>
      <ProductDetails productId={productId}>
        <ProductItem productId={productId} />
        <MatchedItems productId={productId} />
      </ProductDetails>
    </>
  );
};
```

The above refactor works fine and has its advantage:

- Single responsibility: Each component is responsible for its data.

However, it may create some issues:

- It may provide poor user experience. Any of the child components can be rendered before the other based on how fast the network requests resolve. Users will see sections of the page before the other.
- It will create a [network waterfall](https://nischithbm.medium.com/web-performance-optimizing-the-network-waterfall-8a65df932df6) problem because of sequential data fetching.

Each of the methods highlighted above have their pros and cons, however, they share a common limitation. Both approaches require making API calls to the server from the client. This can increase [latency](https://aws.amazon.com/what-is/latency/).

This limitation initially prompted the React team to introduce server components. Because server components execute on the server, they can make API calls and render faster than client components.

While it was initially created to address the limitation highlighted above, it had other benefits. Since server components execute on the server, they can access backend-only services easily.

## Differences between React server components and client components

A major distinction between server components and client components is that server components are rendered once on the server-side while client components are rendered on the client-side. Client components are re-rendered as the user interacts with the application.

Normally for a client-side react application, when a user requests a web page, the server sends an empty HTML file with one or more script tags for loading the React code and other project dependencies. The browser parses the HTML file, downloads the Javascript files, and uses the client JavaScript to render the web page.

Server components execute on the server-side. They are not included in the client JavaScript bundle. Thus, reducing the client JavaScript bundle size. Client components, on the other hand, are sent to the client and increases the bundle size of your application. A client component is a typical traditional React component.

Another distinction lies in their rendering environment which gives them different properties:

- A server component cannot use React hooks like `useState`, `useReducer`, and `useEffect`. This is because a server component is rendered once on the server and doesn't re-render. On the other hand, a client component is a normal React component with access to hooks and re-renders as the user interacts with the app.
- A server component does not have access to browser APIs such as `sessionStorage` and `localStorage`. On the other hand, a client component is a normal React component with access to all the browser APIs.
- Server components support async/await. You can use async/await to make AJAX requests and connect to databases and APIs in the component body. A client component cannot be asynchronous. You need to use React hooks for AJAX requests and other side effects.

## Differences between React server components and server-side rendering(SSR) in React

Server-side rendering (SSR) in the case of React refers to an application's ability to turn React components on the server into a fully rendered static HTML page for the client.
React Server Components, on the other hand, work with SSR via an intermediary structure(a protocol similar to that of a JSON format) to enable rendering without delivering any bundles to the client side.

## Using server components in a React application

Server components can be confusing at first sight. As explained above, a server component can be asynchronous and perform side effects within the function body.

Also note that in order to utilize `async/await` in a typescript component with `.tsx` file, you will need to update your typescript version to 5.1.1. Read [this article](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1/#decoupled-type-checking-between-jsx-elements-and-jsx-tag-types) for more.

Below is an example of a simple server component,

```tsx title="BlogPost.tsx"
// Server Component

const BlogPost = async ({ id, isEditing }) => {
  const post = await db.posts.get(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
    </div>
  );
};
```

A client component is a regular React component. However, you need to include the `'use client'` directive at the top of the component file. The `'use client'` directive is similar to the `'use strict'` directive for executing JavaScript code in strict mode.

```tsx title="PostEditor.tsx"
// A client component

"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PostEditor = ({ blogPost }) => {
  const [post, setPost] = useState<any>({
    id: uuidv4(),
    title: blogPost.title,
    content: blogPost.content,
  });

  const onChange = (type: any, value: any) => {
    switch (type) {
      case "title":
        setPost({ ...post, title: value });
        break;
      case "content":
        setPost({ ...post, content: value });
        break;
      default:
        break;
    }
  };

  const submitPost = () => {
    // save blog post
  };

  return (
    <div>
      <div className="md:mx-auto px-6 md:px-0 mt-10 md:w-9/12">
        <h1 className="my-4 text-center">Create Post</h1>

        <form onSubmit={submitPost}>
          <div className="mt-8">
            <label className="text-white mb-2"> Title </label>
            <input
              type="text"
              placeholder=""
              value={post.title}
              required
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>

          <div className="mt-8">
            <label className="text-white mb-2">Add your Blog content</label>
            <textarea
              value={post.content}
              required
              onChange={(e) => onChange("content", e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-4 py-4 bg-[#0e9f64] c-white border-radius"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
```

There are certain rules you need to follow when working with server and client components.

- Server components cannot be imported into client components but client components can be imported into server components. We will illustrate how to import a client component to a server component using our previous example:

```tsx title="BlogPost.tsx"
// Server Component

import db from "db";
import NoteEditor from "NoteEditor";

async function BlogPost({ id, isEditing }) {
  const post = await db.posts.get(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
      {isEditing ? <PostEditor blogPost={post} /> : null}
    </div>
  );
}
```

In the code above, we imported the `PostEditor` client component into the `BlogPost` server component.

- A server component can be passed as a child prop to a client component when the client component is rendered in a server component.

```tsx
const ServerComponent1 = () => {
  return (
    <ClientComponent>
      <ServerComponent2 />
    </ClientComponent>
  );
};
```

## When to use React server components?

- **Faster Initial Load Times:** React Server Components significantly reduce web app loading times, improving the user experience.
- **Ideal for Large-Scale Apps:** They shine in complex applications where handling client-side interactivity is challenging.
- **Reduced Client-Side Interactivity:** Use them for components not requiring immediate client-side interactions.
- **SEO Benefits:** Server-side rendering with React Server Components enhances SEO by providing pre-rendered content to search engines, boosting discoverability.

## Using server components in a Next.js application

At the time of writing this article, Next.js is the only stable implementation of React Server Components. In any Next.js project that uses App router, each component is a server component by default.

The code below shows what a simple Server component looks like in Next.js.

```tsx title="app/BlogPost.tsx"
// Server Component

const BlogPost = async ({ id, isEditing }) => {
  const post = await db.posts.get(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
    </div>
  );
};
```

On the other hand, a client component looks like a regular React component but has a `'use client'` directive at the top of the component file like so:

```tsx title="app/PostEditor.tsx"
// A client component

"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PostEditor = ({ blogPost }) => {
  const [post, setPost] = useState<any>({
    id: uuidv4(),
    title: blogPost.title,
    content: blogPost.content,
  });

  const onChange = (type: any, value: any) => {
    switch (type) {
      case "title":
        setPost({ ...post, title: value });
        break;
      case "content":
        setPost({ ...post, content: value });
        break;
      default:
        break;
    }
  };

  const submitPost = () => {
    // save blog post
  };

  return (
    <div>
      <div className="md:mx-auto px-6 md:px-0 mt-10 md:w-9/12">
        <h1 className="my-4 text-center">Create Post</h1>

        <form onSubmit={submitPost}>
          <div className="mt-8">
            <label className="text-white mb-2"> Title </label>
            <input
              type="text"
              placeholder=""
              value={post.title}
              required
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>

          <div className="mt-8">
            <label className="text-white mb-2">Add your Blog content</label>
            <textarea
              value={post.content}
              required
              onChange={(e) => onChange("content", e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-4 py-4 bg-[#0e9f64] c-white border-radius"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
```

## Pros and Cons of React server components

In this section, we will explore the pros and cons of React Server Components.

**Pros:**

- **Reduced bundle size**: Server components execute and remain on the server. They don't contribute to the front-end JavaScript bundle. You can use third-party packages in RSCs without worrying about their impact to your client bundle size.
- **Improved security**: Because server components execute on the server-side, you can securely access sensitive data such as API keys, database URI strings and endpoints, usernames, and passwords.
- **Reduced Latency**: You can delegate certain API calls to server components since they run on the server. Therefore, eliminating round trips as with client components.
- **Improved SEO**: Server components are executed on the server side and only the generated HTML is sent to the client side. This makes it easier for search engines to index your web page.
- **Improved performance**: We fetch data and render server components on the server. Therefore, improving performance.

**Cons:**

- You can only use React Server components with meta React frameworks. At the moment, you can only use it with Next.js. You can't use it with vanilla React.
- RSCs can be complex, unintuitive and difficult to get right. RSCs introduce a new mental model. The shift in paradigm comes with significant learning overhead.

## Conclusion.

In this article, we explored React server components and discussed its use and benefits. React server components enable us combine both client-side and server-side rendered components in React applications in a new way. I hope this article convinces you to test out React server components today.
