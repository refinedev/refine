---
title: How to use Next.js API Routes?
description: We will deep dive into Next.js API Routes with Dynamic Routes.
slug: next-js-api-routes
authors: michael
tags: [nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-05-next-api-routes/social.png
hide_table_of_contents: false
---






## Introduction

Next.js is a React framework and platform for building production-grade, static and server-side rendered applications, with a lot of useful built-in features and the ability to fully customize your page requests.

Next.js has a page-based routing system, and an API route feature which allows you to create APIs endpoints in a pages directory as though you're writing backend code. **Next.js API Routes** let you combine backend code along with your frontend code, thereby eliminating the need for extra codebases. With Next.js, building your RESTful or GraphQL APIs has never been easier!

In this article, you'll learn how to set up Next.js API Routes and we'll explain some of their core features and how you can leverage them in your applications along the way. You'll also learn how to submit form data to an API route.  

Steps we'll cover:
- [What are Next.js API Routes?](#what-are-nextjs-api-routes)
- [How to create API Routes in Next.js](#how-to-create-api-routes-in-nextjs)
- [Dynamic API Routes](#dynamic-api-routes)
- [API Routes custom configuration](#api-routes-custom-configuration)
- [Typing API Routes with TypeScript](#typing-api-routes-with-typescript)
    - [Typing `request` and `response` objects](#typing-request-and-response-objects)
    - [Typing response data](#typing-response-data)

## What are Next.js API Routes?
Before you dive into **Next.js API Routes** let's provide a little background first. 

An Application Programming Interface (API) defines how two application or services communicate with each other using HTTP requests and responses. This communication usually involves the two applications exchanging data. For example a client-side web application requesting from a server application a list of users stored in a database. 

There are different methods of creating an API based on your requirements and use-cases. The most popular method around the web today is the Representational State Transfer (REST) method. The REST or *RESTful* method typically involves a client application sending a request - a request can either be for sending data (GET request), submitting data (PUT request), or updating data (UPDATE request) to a server. Some other methods of creating APIs include Simple Object Access Protocol (SOAP), GraphQL, and so on.

To build an application in which you need data and resources provided and stored by an external source, you'll need an API to request for those resources. Basically, you need two different applications that communicate with each other for exchange of data. In modern web development, this is typically done by creating two different applications (assuming you own the application that stores the data), a client-side application that runs in the browser and a server-side application that runs on the server.

In essence, **Next.js API Routes** eliminate the need for creating an additional backend server in your full-stack web applications. With **Next.js API Routes**, you can access or store data in your database like you would if you were using a separate backend application. We will discuss how you can begin using this straightforward approach Next.js provides developers in the next section.


## How to create API Routes in Next.js

Creating API Routes in Next.js is similar to how you'd create a page route in Next.js. The only difference being that these API Routes are created in the `api` folder found in the pages folder of your application and any file found in the `pages/api` folder will be treated as an API endpoint. That is, if you have a file named `example.js` in `pages/api`, you can access the API route in your code by making a request to `/api/example`.

Let's go through an example:

If you open the `pages` folder in your project root directory, you should see an `api` folder in it (assuming your project was bootstrapped with `create-next-app`. If not, you'll need to create this folder yourself). The `api` folder contains an example API route named `hello.js` with the following content:

```tsx title="pages/api/hello.js"
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
```

Navigating to `localhost:3000/api/hello` in the browser or making a `GET` request to it returns the following JSON response:


<div class="img-container" align-items="center" >
   <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-05-next-api-routes/response.png"  alt="response" />
</div>

<br/>


Here's an explanation for the above code sample.

Every API route or endpoint must export a default function that handles the requests made to that endpoint. The function receives two parameters:

`req`: An instance of [http.IncomingMessage](https://nodejs.org/api/http.html#class-httpincomingmessage) which also includes some built-in helpers - or middlewares - such as `req.body`, `req.query`, and so on, for parsing the incoming request

`res`: An instance of [http.ServerResponse](https://nodejs.org/api/http.html#class-httpserverresponse) which includes some Express.js-like helper methods such as `res.send`, `res.body`, and so on

These methods should be familiar if you've worked with Node.js and Express.js before.

In our example, we're exporting a default function named `handler` - of course this can be named anything you like - and then we're using the `res` server response object to return an HTTP status code and JSON data.  
  
By default, every HTTP request to the endpoint using any of the HTTP request methods (GET, PUT, DELETE, and so on) will return the same response. To handle different methods in an API route we can write the handler function with `switch` statement (you can also use methods like `if/else`- whichever works for you, no hard rules!), like so:

```tsx title="pages/api/hello.js"
export default function handler(req, res) {
  const requestMethod = req.method;
  const body = JSON.parse(req.body);
  switch (requestMethod) {
    case 'POST':
      res.status(200).json({ message: `You submitted the following data: ${body}` })
      
    // handle other HTTP methods
    default:
      res.status(200).json({ message: 'Welcome to API Routes!'})
  }
}
```

Here's another example showing how you can submit data from a form in your application and send it to an API route using a `POST` request method to save in a database.

The form in `pages/post.js` below sends a post data to an API route `api/post`.

```tsx title="pages/post.js"
import { useState } from "react";

const Post = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const postData = async () => {
      const data = {
        title: title,
        post: post,
      };

      const response = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then((data) => {
      alert(data.message);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="post">Post</label>
        <input
          id="post"
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Post;
```

With the following code in `pages/api/post.js`:

```tsx title="pages/api/post.js"
export default function handler(req, res) {
  const { title, post } = JSON.parse(req.body);

  // Then save the post data to a database
  res.status(200).json({ message: "Post created successfully" });
}
```
---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---
## Dynamic API Routes

API Routes in Next.js can also be dynamic. This is similar to how regular dynamic pages work in Next.js. You can read more about dynamic routes [here](https://nextjs.org/docs/routing/dynamic-routes) to understand their syntax.
Dynamic API Routes let us send response for different queries to an API endpoint. Let's go through an example.

Create a folder named `trivia` in the `/pages/api` folder of your application. Then in the `trivia` folder create a file named `[number].js`. Your folder structure looks like : `pages/api/trivia/[number].js`. 

In this example, we're going to return a random fact from an external API (http://numbersapi.com/) about every number query we receive on the API endpoint. We'll use [superagent](https://www.npmjs.com/package/superagent) as the HTTP client for making requests to the external API in our API route.

You can install it with the following command: 

```bash
npm install superagent
```

Next, add the following code to `[number].js`:

```tsx title="pages/api/trivia/[number].js"
const superagent = require("superagent");

export default function handler(req, res) {
    const number = Number(req.query.number);

  if (isNaN(number) || typeof number !== "number") {
    res.status(400).send("Invalid request!!");
  }
  superagent.get(`http://numbersapi.com/${number}`).then((response) => {
    res.status(200).send(response.text);
  });
}
```

Now if you navigate to `http://localhost:3000/api/trivia/34` or any other random number at the end of the URL a random trivia should be generated for that number and a `400` Bad Request will be returned if an invalid number is used. 

Here's a GIF showing an example:


<div class="img-container" align-items="center" >
   <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-05-next-api-routes/dynamic-routes.gif"  alt="dynamic API routes" />
</div>

<br/>

## API Routes custom configuration

In addition to the powerful features of API Routes, Next.js also allows for customization of their default configuration. The default configuration in every API route in Next.js can be customized by exporting a `config` object in the same file. `api` in the `config` object contains all configuration options that are specific to every API route.

```tsx title="pages/api/hello.js"
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export const config = {
  api: {
    bodyParser: false, // Defaults to true. Setting this to false disables body parsing and allows you to consume the request body as stream or raw-body.
    responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
    externalResolver: true, // Disables warnings for unresolved requests if the route is being handled by an external resolver like Express.js or Connect. Defaults to false.
  },
}
```

You can read more about other available configuration options [here](https://nextjs.org/docs/api-routes/request-helpers#custom-config).

## Typing API Routes with TypeScript

Next.js provides automatic types to ensure your API Routes are type-safe and involves zero configuration to set up. 

NOTE: You need to have integrated TypeScript in your Next.js project before using these features. Learn how to add TypeScript to your Next.js project [here](https://nextjs.org/docs/basic-features/typescript).

#### Typing `request` and `response` objects

Here's how to provide types for the request and response objects with `NextApiRequest` and `NextApiResponse` respectively:

```tsx  title=pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
}
```

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>




#### Typing response data

We can also type the response data returned from an API endpoint by adding types to `res: NextApiResponse`.

Using the example from dynamic routes section above, we can add types to the response from the API endpoint like below: 

```tsx title="pages/api/trivia/[number].ts"
import type { NextApiRequest, NextApiResponse } from 'next'
const superagent = require("superagent");

type ResponseData = string;

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const number = Number(req.query.number);

  if (isNaN(number) || typeof number !== "number") {
    res.status(400).send("Invalid request!!");
  }
  superagent.get(`http://numbersapi.com/${number}`).then((response) => {
    res.status(200).send(response.text);
  });
}
```

You can learn more about extending the `res` and `req` objects with TypeScript [here](https://nextjs.org/docs/api-routes/request-helpers#extending-the-reqres-objects-with-typescript).


## Conclusion

In this article we introduced you to **API Routes in Next.js** and how to use them to create API endpoints for your application. You learned how to add custom configurations to API Routes and also how to include typings among other things. Ready to get started with **API Routes** in your next project? Let's know what you build and feel free to reach out if you have any questions. Happy coding!



