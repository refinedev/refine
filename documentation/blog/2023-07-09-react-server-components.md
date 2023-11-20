---
title: An Intro to server components in React
description: We will discuss what React server components are as well as how to incorporate them into building applications.
slug: react-server-components  
authors: peter_osah
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-07-09-react-server-components/social.png
hide_table_of_contents: false
---


## Introduction
Recently, there has been a lot of hype and excitement about React server components. And this stems from the idea that React server components allow developers to outsource component-related tasks to the server. This eliminates the need to distribute bundled JavaScript and external API queries in order to hydrate the component, as well as eliminating scenarios that will lead to increased latency on the client application.
In this article, we'll discuss what React server components are as well as how to incorporate them into building applications.

Steps we'll follow:

- [What are server components?](#what-are-server-components)
- [Problem statement which introduced the idea of React server components](#problem-statement-which-introduced-the-idea-of-react-server-components)
- [Difference between React server components and client components](#difference-between-react-server-components-and-client-components)
- [Difference between React server components and server-side rendering(SSR) in React.](#difference-between-react-server-components-and-server-side-renderingssr-in-react)
- [Case study of Server components.](#case-study-of-server-components)
  - [Using server components in a React application.](#using-server-components-in-a-react-application)
  - [Using server components in a Next application.](#using-server-components-in-a-next-application)
- [Pros and Cons of React server components.](#pros-and-cons-of-react-server-components)

## What are server components?
The server component is a new feature introduced in React 18 and is the default in Next.js 13. A server component is essentially a component type that retrieves data from the server and renders it on the server. These contents are subsequently streamed into the client-side application in a format that the client-side application can render.
Server components render in a custom format that has no standard protocol but is akin to a JSON format. The react DOM recognizes this format and renders it appropriately once it is recognized.


## Problem statement which introduced the idea of React server components
 
We will create a scenario which will introduce the idea of server components.


We can structure the product page to be as follows: 

```tsx
const ProductPage = ({ productId })=> {
    return (
        <>
            <ProductDetails productId={productId}>    
                <ProductItem productId={productId} />
                <MatchedItems productId={ productId } />
            <ProductDetails>
        </>
    )
}
```

Now, there are various ways to implement a data-fetching solution for the API contents that will be rendered on this page. We could fetch the data to the components all in one go as shown below:


```tsx
const ProductPage = ({ productId })=> {
    const data = fetchContentsFromAPI();
    return (
        <>
            <ProductDetails details={data.details} productId={productId}>    
                <ProductItem item={data.product} productId={productId} />
                <MatchedItems items={data.matchedItems} productId={productId} />
            <ProductDetails>
        </>
    )
}
```



Using this method works fine and has its advantages like:
* It could be suitable for user experience as all the components are rendered on the client after the data is fetched.

However, it may create some issues such as:
* It creates a high level of coupling as it ties the contents of the data to the child components of the parent component. This could make these components difficult to maintain.
* It also goes against the idea of single responsibility as the child components aren't individually responsible for their data, and are therefore dependent on the data from the parent component.
* High load time as it fetches all the data for all the components at once.





For the sake of single responsibility, we could  restructure the parent component to display the components as follows:

```tsx
const ProductDetails = ({productId, children}) => {
    const details = fetchProductDetails(productId);
    return (
        <>
            {{ children }}
        </>
    )
}

const ProductItem = ({productId}) => {
    const item = fetchProductItem(productId);
    return (...)
}

const MatchedItems = ({productId}) => {
    const items = fetchMatchedItems(productId);
    return (...)
}


const ProductPage = ({ productId })=> {
    return (
        <>
            <ProductDetails productId={productId}>    
                <ProductItem productId={productId} />
                <MatchedItems productId={productId} />
            <ProductDetails>
        </>
    )
}
```

Using this method works fine and has its advantages like:
* Single responsibility: Each component is responsible for its own data.

However, it may create some issues such as:
* It may not be suitable for user experience as any of the child components can be rendered on the client before another based on the load time of their API calls thereby making users to see a section of the page before the other.
* It also will create a scenario of a [network waterfall](https://nischithbm.medium.com/web-performance-optimizing-the-network-waterfall-8a65df932df6) because of the sequential fetching of data as **ProductDetails** component will be rendered first before the child components (**ProductItem**, **MatchedItems**).


These methods have their pros and cons, however, there is one limitation shared between them. The limitation is that both methods require making API calls to the server from the **client** which can create a situation of high [latency](https://aws.amazon.com/what-is/latency/) between the client and the server.


This limitation is what initially prompted the React team to introduce server components: components on the server. Because server components exist on the server, they can make API calls faster and can be rendered quickly than components rendered on the client side of the application.

While it was initially created to address the high latency limitation, new applications arose. Since the components resides on the server, they were permitted to have access to server infastructure which implies that they could connect to databases and make queries to them.


## Difference between React server components and client components
A major distinction between server components and client components is that while server components render components on the server, client components render on the client.

Normally for a client-side react application, When a user request a web page from a server, the server responds by the page (Javascript file) to the browser. The browser downloads the data (Javascript file) and use that to construct the web page. 
For server components, no Javascript sent to the client thus reducing JavaScript bundle sent to the client. client components on the other hand are sent to the client and adds to the bundle size of the application(a client component is a typical, traditional React component).

Another distinction lies in their rendering environment which gives them different properties as explained below:

* A server component cannot use React hooks like `useState`, `useReducer`, `useEffect`, etc. This is because a server component is rendered on the server and do not have access to hooks that can affect the `DOM`(Document Object Model) which only exists on the client. On the other hand, a client component is a normal React component which still have access to hooks.
* A server component does not have access to browser APIs like `SessionStorage`, `localStorage` etc. On the other hand, a client component is a normal React component which still have access to browser APIs.
* A server component can use `async/await` for server-only data sources such as databases, internal services, filesystems, and so on while client components cannot access server-only data sources directly.





## Difference between React server components and server-side rendering(SSR) in React.

Server-side rendering (SSR) in the case of React in  refers to an application's ability to turn React components on the server into a fully rendered static HTML page for the client.
React Server Components, on the other hand, work with SSR via an intermediary structure(a protocol similar to that of a JSON format) to enable rendering without delivering any bundles to the client side.




## Case study of Server components.
We will illustrate how we can use server components in both a traditional React application and a Next.js Application.

### Using server components in a React application.
In a typical React application, a server component is like a regular React component.

Also note that in order to utilize `async/await` in a typescript component with `.tsx` file, you will need to update your typescript version to 5.1.1. To read more on this visit [here](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1/#decoupled-type-checking-between-jsx-elements-and-jsx-tag-types)


Below is an example of a server component,

```tsx title="BlogPost.tsx" 
// Server Component

 const BlogPost = async({id, isEditing}) => {
 const post = await db.posts.get(id);
 
  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
    </div>
  );
}
```


A client component looks like a regular React component but there is an addition of a directive `'use client'` on the component file. The  `'use client'` directive is technically a convention that declares a boundary between a server and client component.


```tsx title="PostEditor.tsx" 
// A client component

'use client'

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const PostEditor = ({ blogPost }) => {
  
  const [post, setPost] = useState<any>({
    id: uuidv4(),
    title: blogPost.title,
    content: blogPost.content,
  })

  const onChange = (type: any, value: any)=> {
    switch(type){
      case "title":
        setPost({...post, title: value})
        break;
      case "content":
        setPost({...post, content: value})
        break;
      default:
        break
    }
  }
  
  const submitPost = ()=> {
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
              type="text" placeholder="" 
              value={post.title}
              required 
              onChange={(e)=> onChange("title", e.target.value)}
            />
          </div>

          <div className="mt-8">
            <label className="text-white mb-2">
              Add your Blog content
            </label>
            <textarea
              value={post.content}
              required
              onChange={(e)=> onChange("content", e.target.value)}
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



There are certain rules to know when working with server and client components which are:
* Server components cannot be imported into client components but client components can be imported into server components. We will illustrate how to import a client component to a server component using our previous example shown below:

```tsx title="BlogPost.tsx" 
// Server Component

import db from 'db'; 
import NoteEditor from 'NoteEditor';

async function BlogPost({id, isEditing}) {
  const post = await db.posts.get(id);
 
  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
      {isEditing 
        ? <PostEditor blogPost={post} />
        : null
      }
    </div>
  );
}
```
in the code above, we imported `PostEditor` (a client component) to the server component.



* A server component can be passed as a child prop to a client component when the client component is inside a server component.

```tsx
const ServerComponent1 = () => {
    return (
        <ClientComponent>
            <ServerComponent2 />
        </ClientComponent>
    )
}
```



### Using server components in a Next application.
A server component by default is a regular React component created in the newly introduced `App` directory in `Next 13`.

```tsx title="app/BlogPost.tsx" 
// Server Component

 const BlogPost = async({id, isEditing}) => {
 const post = await db.posts.get(id);
 
  return (
    <div>
      <h1>{post.title}</h1>
      <section>{post.body}</section>
    </div>
  );
}


```



A client component in `Next 13` looks like a regular React component but there is an addition of a directive `'use client'` to the component file.

```tsx title="app/PostEditor.tsx" 
// A client component

'use client'

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const PostEditor = ({ blogPost }) => {
  
  const [post, setPost] = useState<any>({
    id: uuidv4(),
    title: blogPost.title,
    content: blogPost.content,
  })

  const onChange = (type: any, value: any)=> {
    switch(type){
      case "title":
        setPost({...post, title: value})
        break;
      case "content":
        setPost({...post, content: value})
        break;
      default:
        break
    }
  }
  
  const submitPost = ()=> {
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
              type="text" placeholder="" 
              value={post.title}
              required 
              onChange={(e)=> onChange("title", e.target.value)}
            />
          </div>

          <div className="mt-8">
            <label className="text-white mb-2">
              Add your Blog content
            </label>
            <textarea
              value={post.content}
              required
              onChange={(e)=> onChange("content", e.target.value)}
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



## Pros and Cons of React server components.
We will go through the advantages of including server components to development as well as the disadvantages that comes with utilizing it in development.

**Pros:**
* **Bundle Reduction**: Server components are "**zero bundle**" components as they do not add to the Javascript bundle size that will be rendered on the client.
* **Access to server Infrastructure**: With server components, there is seamless access in connecting to server infrastructure like Databases, filesystem, and many more.
* Reduced Latency on the client as one can delegate API calls to server components which run on the server.

**Cons:**
* Server components cannot access client-side features.
* Its adoption may not be quick as server components may provide almost same benefits as a regular SSR(server-side rendered) application and many are already accustomed to SSR.
* Since server components have access to server infrastructure, it may necessitate poor application design as it may encourage developers to evade the creation of APIs or even standalone backends to directly perform queries and connections to databases via server components.

## Conclusion.
In this article, we covered what server components in React are as well as discussed its use and benefits. React server components enable us to combine the finest of both client-side and server-side rendered components in React applications in a new way. I hope this article convinces you to test out React server components today.