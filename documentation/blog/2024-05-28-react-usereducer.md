---
title: React useReducer Hook - The Basics
description: This post is about the useReducer() hook in React. We demonstrate with examples how to use it for action based state updates and discuss some safe practices.
slug: react-usereducer
authors: abdullah_numan
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-05-28-react-usereducer/social.png
hide_table_of_contents: false
---

## Introduction

React [`useReducer()`](https://react.dev/reference/react/useReducer) hook is a state hook used often as a versatile alternative to `useState()`. It helps aggregate multiple states of a component in one place, particularly in scenarios that involve the state's changes at multiple nesting levels, and originating from multiple action types and sources. `useReducer()` gives access to data and actions defined in a React reducer. It exposes the `state` for a component to consume, and a `dispatch()` function to invoke actions that alters the `state`.

In this post, we cover the basics of implementing consolidated state management with a reducer and the `useReducer()` hook, along with some essential good practices associated with writing efficient reducer functions.

We first spend time to understand what essentially makes a React reducer, how it works and when to use one. That it consists of a aggregated state, a set of action `type`s and a reducer function that defines and implements those action types. Then, with examples from a small demo **Posts** app, we explore how `useReducer()` is used to access a reducer `posts` state and its `dispatch()` function.

We demonstrate how to consume reducer data (stored as `posts`) and present them in JSX. While doing so, we also cover how to invoke actions with `dispatch()` by passing desired types to it (`like` and `unlike`). We discuss the importance of a reducer function and acknowledge the painstaking care necessary while writing one. We analyze relevant code snippets to show some good practices involved in efficiently composing React reducer functions that is used by a `useReducer()` hook. We spare time to understand the significance of initial reducer state and examine examples of how to pass one to `useReducer()`.

In the later half, we expand our example to demonstrate how `useReducer()` enables state updates on multiple nesting levels. We add `create` and `delete` action types to the topmost level of `posts` that allow creating and deleting a post respectively. We elucidate with an example how to use a state initializer function for enhancing performance of a reducer. Towards the end, discuss the benefits of using `useReducer()`, how reducers are vital in Redux and how `useReducer()` and Redux compare.

Steps we follow in this post are as follows:

- [What is React useReducer ?](#what-is-react-usereducer)
- [React State Manipulation with useReducer: A Demo Posts App](#react-state-manipulation-with-usereducer-a-demo-posts-app)
- [React useReducer: Action on Multiple Levels](#react-usereducer-action-on-multiple-levels)
- [React useReducer: Benefits and Comparison](#react-usereducer-benefits-and-comparison)

## What is React useReducer ?

`useReducer()` is a React state hook which promotes an "action" based state management paradigm that involves component state consolidated or **_reduced_** in a reducer object. The state is manipulated by dispatching different types of actions, contrary to using a single setter function typical of `useState()`. Using actions to change state of reducer makes it a versatile tool -- as doing so allows a myriad of actions to defined and performed on the aggregated state.

### React Reducers with useReducer

Reducers get their name because they accummulate data into one piece in a way similar to how the JavaScript `Array.prototype.reduce()` method does. Reducers make the heart of dedicated global state management solutions like [Redux](https://redux.js.org/introduction/getting-started) and [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query) (Redux Toolkit Query).

Reducers in plain React, though, are used for smaller scale local state management in components, as opposed to managing global state involving multiple entities and features of the app.

For setting up and handling plain React reducers, we use the `useReducer()` hook. It is important to note that in many scenarios, `useState()` can be used to manage trivial, one-off local states. Only when complexity of local state becomes unmanageable with `useState()`, yet tied together around one application entity or closely related actions, we think of using a reducer in conjunction with the `useReducer()` hook.

:::tip[Tip: When to Use React `useReducer()`]

Typical use cases of React `useReducer()` hook arise when we need more types of change in a component state -- such as types of `like`s in a post: `like`, `unlike`, `angry`, `happy`, `love`, `celebrate`, etc.

In general, we can use `useReducer()` in the following scenarios:

- When we initialize multiple states using `useState()`, but they seem to be related and can be grouped or aggregated into one.
- We have multiple types of actions for altering the state.
- We have multiple types of events that trigger those actions.
- We have multiple sources of those actions, such as from different components and different levels of the component hierarchy.
- We have actions on multiple nesting levels of the state object.
- We need to reuse and reinitialize the reducer in different components.
- We can reuse the reducer for similar application entities.

:::

### How React useReducer Works

The `useReducer()` hook in React accepts a reducer function and an initial state. It builds a reducer from these arguments and exposes the `state` and a `dispatch()` function for the component to use. For example, like this:

```js
// Inside a component

const [state, dispatch] = useReducer(postsReducer, initialPosts);

// Consume `state` in JSX
// Invoke `dispatch()` with action type passed in button clicks
```

The `dispatch()` function is used to dispatch action types invoked from an event handler, such as on an `onClick` event. `dispatch()` typically takes a `type` prop in an argument object passed to it. More details later in [this section](#react-usereducer-how-to-initialize-an-action-based-reducer).

### Reducer Functions in React

The specifics of a dispatched action type, its implementation and return values are declared in a React reducer function. A reducer function generally includes all actions related to a particular type of an application entity. For example, the following `postsReducer` function defines a couple of action `type`s for a `post` entity:

```js
export function postsReducer(posts, action) {
  const { type, payload } = action;
  const { id } = payload;

  switch (type) {
    // highlight-next-line
    case "like":
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes + 1,
          };
        } else {
          return p;
        }
      });

    // highlight-next-line
    case "unlike":
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes <= 0 ? p?.likes : p?.likes - 1,
          };
        } else {
          return p;
        }
      });

    default:
      return posts;
  }
}
```

The two actions we have are `like` and `unlike`, which are represented as two cases of the `switch` statement.

Notice, the reducer function takes in the `posts` state, along with an `action` as arguments. The passed in `posts` state represents the current state. It works on the current state according to the data sent with the `action` argument and sends out a new `posts` version. In other words, it acts directly on the state and returns an updated version.

Notice also that, the `action` consists of a `type` property and any specifics that describe the action: such as a `payload` with `id` and related data.

The initial state of this reducer must be present before hand. With `useReducer()`, state is initialized with the `initialState` or an `initializer` function as argument. More on this [here](#react-usereducer-passing-initial-state).

## React State Manipulation with useReducer: A Demo Posts App

In this section, we delve into the implementation of reducers and actions with React `useReducer()` hook in a demo Posts app. The app allows `like` and `unlike` actions on a post.

### Starter Files

The demo app is available in the repository [here](https://github.com/anewman15/hooks-user). Please feel free to get a copy of the `main` branch and run it locally by following these steps:

1. Clone [this repository](https://github.com/anewman15/hooks-user) to a directory of your choice.
2. Navigate to the app folder and run the server:

```bash
cd hooks-user
npm install
npm run start
```

This will get the app running on `http://localhost:3000`.

Please feel free to play around with the number of likes on each post, by liking and unliking them. Navigate around the code in your editor and try to make sense of what's going on.

### The `<Posts />` Component

The main action is happening in the `<Posts />` component. It looks like below:

<details>

<summary>Show `<Post />` component</summary>

```js
import React, { useReducer } from "react";
import { postsReducer, initialPosts } from "../reducers/postsReducer";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Posts() {
  // highlight-next-line
  const [posts, dispatch] = useReducer(postsReducer, initialPosts);

  return (
    <div className="container mx-auto my-16 rounded-lg bg-gray-100">
      <div className="ml-8 w-3/5 bg-inherit pt-8">
        <h2 className="title">All Posts</h2>
        {posts?.map((post) => {
          return (
            <div class="card">
              <div class="p-6">
                <div className="px-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 class="mb-1 text-xl font-medium leading-tight">
                        {post?.title}
                      </h5>
                      <h6 class="subtitle">{post?.subtitle}</h6>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <HeartIcon
                        height={32}
                        width={32}
                        className="fill-red-500 text-red-500"
                      />
                      <span className="absolute text-xs font-normal text-gray-50">
                        {post?.likes}
                      </span>
                    </div>
                  </div>
                </div>
                <p class="mb-4 bg-gray-50 p-2 text-base leading-normal">
                  {post?.content}
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    class="btn-like"
                    // highlight-next-line
                    onClick={() =>
                      dispatch({ type: "unlike", payload: { id: post?.id } })
                    }
                  >
                    <HandThumbDownIcon
                      height={20}
                      width={20}
                      className="text-red-400"
                    />
                  </button>
                  <button
                    type="button"
                    class="btn-like"
                    // highlight-next-line
                    onClick={() =>
                      dispatch({ type: "like", payload: { id: post?.id } })
                    }
                  >
                    <HandThumbUpIcon
                      height={20}
                      width={20}
                      className="text-blue-700"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

</details>

The JSX presents a list of post items in the `posts` array, by mapping each item into a card. Typical React stuff. Notice inside the `<button />` elements, we are invoking a `dispatch()` function to handle the `onClick` event.

Below, we explain `useReducer()` related concepts that underly `posts` and `dispatch` with relevant code snippets.

#### React useReducer: How to Initialize an Action Based Reducer

It's really easy to initialize a plain React reducer. Inside `<Posts />`, we initialized a reducer with the `useReducer()` hook:

```js
const [posts, dispatch] = useReducer(postsReducer, initialPosts);
```

The `useReducer()` hook must be passed a reducer function and an initial state. Here, we pass `postsReducer` as a reducer function and `initialPosts` as initial `posts` state.

With this, we make sure that for each change of state invoked, we'd receive the `posts` reducer state and the `dispatch` function. In other words, the `useReducer()` hook creates a reducer from the reducer function and an initial state. And it returns an updated state for us to present in our component. With the `dispatch` function, it particularly gives access to a set of actions and their implementations -- which we can execute to effectuate a desired change.

Actions, their types and implementations need to be defined ahead of time in a reducer function (`postsReducer` here), which we are going to see next.

### React useReducer: Anatomy of a Reducer Function

The reducer function we have for `posts` state here is `postsReducer`. It looks like this:

<details>

<summary>Show `postsReducer` code</summary>

```js
export const initialPosts = [
  {
    id: 3,
    title: "What's a Reducer Function ?",
    subtitle: "A function that defines the actions possible on a reducer state",
    content:
      "A reducer function declares what's possible on a reducer state. It defines all possible actions that can be performed on the reducer state and what to change when a particular action is dispatched.",
    likes: 5,
  },
  {
    id: 2,
    title: "What is a Reducer ?",
    subtitle: "State that acts as a single source of truth",
    content:
      "A reducer is composed of a state and a set of actions that can be dispatched to alter the state. It can be refactored and stored outside of a component. And can be used as a source of truth for multiple use cases.",
    likes: 4,
  },
  {
    id: 1,
    title: "The React useReducer Hook",
    subtitle: "State management with actions, instead of setters",
    content: `The useReducer hook is a more versatile alternative to useState. It introduces an "actions" based paradigm to state management - in contrast to setters that exists in useState. Actions are defined and dispatched to effectuate changes in a reducer state.`,
    likes: 2,
  },
];

export function postsReducer(posts, action) {
  const { type, payload } = action;
  const { id } = payload;

  switch (type) {
    case "like":
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes + 1,
          };
        } else {
          return p;
        }
      });

    case "unlike":
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes <= 0 ? p?.likes : p?.likes - 1,
          };
        } else {
          return p;
        }
      });

    default:
      return posts;
  }
}
```

</details>

#### A React Reducer Function Operates on State with Action Params

Notice the `posts` and `action` params taken by the `postsReducer` function. `posts` itself is the current reducer state. And the internals of `postsReducer` function case by case directly acts on the reducer state. Like what happens here:

```js
export function postsReducer(posts, action) {
  const { type, payload } = action;
  const { id } = payload;

  switch (type) {
    case "like":
      // highlight-start
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes + 1,
          };
        } else {
          return p;
        }
      });
    // highlight-end

    case "unlike":
      // highlight-start
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes <= 0 ? p?.likes : p?.likes - 1,
          };
        } else {
          return p;
        }
      });
    // highlight-end

    default:
      return posts;
  }
}
```

The reducer function acts on the current state based on the `action` parameters it would receive with a `dispatch()` invocation from inside a component.

#### React Reducer Function Action Types

The action params of a reducer, by convention, has a `type` property. The value of `type` is essentially a descriptive name for the action. It is used for identifying the related dispatched action.

In the reducer function, we have to define types for each possible action. And then implement changes to the state according to their needs. For example, we have two types of actions we want to perform on `posts` state. `like` and `unlike`:

```js
switch (type) {
  // highlight-next-line
  case "like":
    return posts.map((p) => {
      if (p?.id === id) {
        return {
          ...p,
          likes: p?.likes + 1,
        };
      } else {
        return p;
      }
    });

  // highlight-next-line
  case "unlike":
    return posts.map((p) => {
      if (p?.id === id) {
        return {
          ...p,
          likes: p?.likes <= 0 ? p?.likes : p?.likes - 1,
        };
      } else {
        return p;
      }
    });

  default:
    return posts;
}
```

`like` increases the current `likes` value of a `post` object by `+1`. And `unlike` decreases by `1`. Here, we are mapping over the items inside `posts` to find the `post` with an id of `id`, and then bringing necessary changes to its `likes`. Apparently, the implementation of action types vary according to what they represent. These actions are availed to a host component by `useReducer()` via its exposed `dispatch()` function.

#### React Reducer Function: How to Handle Action Based State Change

Notice, how we are handling changes related to each type. Most often, we accept related data as action parameters. As in our example, it is common to accept data in a `payload` property of the action. The `id` passed to `payload` property above is used to find the post with that `id`:

```js
const { type, payload } = action;
const { id } = payload;
```

As you can notice, we need to discretely handle each action type. Here we are using a `switch` statement to handle each state change.

:::tip[Tip: Prefer Using `switch` Statements in a Reducer Function]

It is cleaner to use `switch` statements for handling action types in a React reducer function. However, we can also use `if/else` and `if/else if/else` statements when they deem better options.

:::

For each state change, we are also using array destructuring with the spread operator `...`.

#### React Reducer Function: Importance of the Spread Operator

Notice we have destructured a post, `p` in both of our action types. For example, in the `like` action, we have iterated across `posts` to find a `p` post that matches its `p?.id` to `id` and then destructured it in order to alter its `likes` property.

The use of spread operator makes React reducer functions very versatile in altering properties deep inside a reducer state, i.e., inside nested objects. Reducers employ the spread operator extensively to create new copies, as the current state must be immutable in order to properly derive the next state.

However, array and object destructuring is painstaking and cumbersome. And meticulous care must be exercised while updating properties in deeply nested reducer objects.

:::tip[Tip: Use Dedicated Libraries for Implementing State Updates]

[Immerjs](https://immerjs.github.io/immer/) is an `npm` library that handles state updates brilliantly. It employs a proxy for efficiently handling state updates typical of nested reducers in React and Redux.

Immer's `produce()` and `draft()` APIs are central to defining and updating a reducer state. It implements immutability as one of its core principles. Feel free to explore its usage from the docs [here](https://immerjs.github.io/immer/).

:::

#### React Reducer Function: Returning Action Values

While implementing action types, we need to make sure we return the necessary object at each level of traversal.

For example in the `postsReducer` function above, we have returned at each level of traversal as needed:

```js
// highlight-next-line
return posts.map((p) => {
  if (p?.id === id) {
    // highlight-next-line
    return {
      ...p,
      likes: p?.likes + 1,
    };
  } else {
    // highlight-next-line
    return p;
  }
});
```

Without proper `return`s, we run the risk of encountering unexpected consequences -- like a different state updates, `undefined` or no update at all.

:::warning[Warning: Debugging Reducer Functions are Painstaking]

It is difficult to debug errors while composing a reducer function in React. We have to adhere to the common safety practices described in this section.

For more detailed explanations of these good practices, please check out [this section of the `useReducer()` docs](https://react.dev/reference/react/useReducer#writing-the-reducer-function).

:::

### React useReducer: Passing Initial State

The `useReducer()` hook has to be passed an initial state in order for it to get a initial current value. The initial state is passed as the second argument to `useReducer()`. In our example, the `initialPosts` argument is an array of `post` objects. It looks like this:

```js
[
  {
    id: 3,
    title: "What's a Reducer Function ?",
    subtitle: "A function that defines the actions possible on a reducer state",
    content:
      "A reducer function declares what's possible on a reducer state. It defines all possible actions that can be performed on the reducer state and what to change when a particular action is dispatched.",
    likes: 5,
  },
  {
    id: 2,
    title: "What is a Reducer ?",
    subtitle: "State that acts as a single source of truth",
    content:
      "A reducer is composed of a state and a set of actions that can be dispatched to alter the state. It can be refactored and stored outside of a component. And can be used as a source of truth for multiple use cases.",
    likes: 4,
  },
  {
    id: 1,
    title: "The React useReducer Hook",
    subtitle: "State management with actions, instead of setters",
    content: `The useReducer hook is a more versatile alternative to useState. It introduces an "actions" based paradigm to state management - in contrast to setters that exists in useState. Actions are defined and dispatched to effectuate changes in a reducer state.`,
    likes: 2,
  },
];
```

Once again, the initial state should directly produce the state itself, without being nested as property of any parent. Since, the reducer function performs its actions directly on it.

## React useReducer: Action on Multiple Levels

The action types above alter the state inside a `post` object. We can allocate action types for changes at other levels too. In this section, we add features of creating a `post` with a `create` type and deleting one with `delete` type.

Let's update the `postsReducer` function to below:

<details>

<summary>Show updated `postsReducer`</summary>

```js
export const initialPosts = [
  {
    id: 3,
    title: "What's a Reducer Function ?",
    subtitle: "A function that defines the actions possible on a reducer state",
    content:
      "A reducer function declares what's possible on a reducer state. It defines all possible actions that can be performed on the reducer state and what to change when a particular action is dispatched.",
    likes: 5,
  },
  {
    id: 2,
    title: "What is a Reducer ?",
    subtitle: "State that acts as a single source of truth",
    content:
      "A reducer is composed of a state and a set of actions that can be dispatched to alter the state. It can be refactored and stored outside of a component. And can be used as a source of truth for multiple use cases.",
    likes: 4,
  },
  {
    id: 1,
    title: "The React useReducer Hook",
    subtitle: "State management with actions, instead of setters",
    content: `The useReducer hook is a more versatile alternative to useState. It introduces an "actions" based paradigm to state management - in contrast to setters that exists in useState. Actions are defined and dispatched to effectuate changes in a reducer state.`,
    likes: 2,
  },
];

export function postsReducer(posts, action) {
  const { type, payload } = action;
  const { id } = payload;

  switch (type) {
    case "create":
      // highlight-start
      return [payload, ...posts];
    // highlight-end
    case "delete":
      // highlight-start
      return posts?.filter((p) => p?.id !== id);
    // highlight-end

    case "like":
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes + 1,
          };
        } else {
          return p;
        }
      });

    case "unlike":
      return posts.map((p) => {
        if (p?.id === id) {
          return {
            ...p,
            likes: p?.likes <= 0 ? p?.likes : p?.likes - 1,
          };
        } else {
          return p;
        }
      });

    default:
      return posts;
  }
}
```

</details>

Notice, now the `create` and `delete` actions implement necessary changes on the topmost level -- at the array level, in order to add and filter out an item to/from the `posts` state.

In `<Posts />` component, we are going to add a form for creating a post. The form gathers a `post` data from input fields and dispatches the `create` action upon submission. The form is contained inside the `<CreatePostForm />` component. It looks like below:

<details>

<summary>Show `CreatePostForm />` component code</summary>

```js
import { useState } from "react";

export function CreatePostForm({ posts, dispatch }) {
  const initialFormData = {
    id: posts?.length + 1,
    title: "",
    subtitle: "",
    content: "",
    likes: 0,
  };
  const [postFormData, setPostFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setPostFormData({
      ...postFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // highlight-next-line
    dispatch({ type: "create", payload: postFormData });
    setPostFormData(initialFormData);
  };

  return (
    <div className="mx-auto">
      <h2 className="title">Create Post</h2>
      // highlight-next-line
      <form
        className="rounded-lg bg-white p-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="form-control">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-input"
            name="title"
            type="text"
            value={postFormData?.title}
            onChange={handleChange}
            placeholder="Add title"
          />
        </div>
        <div className="form-control">
          <label htmlFor="subtitle" className="form-label">
            Subtitle
          </label>
          <input
            className="form-input"
            name="subtitle"
            type="text"
            value={postFormData.subtitle}
            onChange={handleChange}
            placeholder="Add subtitle"
          />
        </div>
        <div className="form-control">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-textarea"
            name="content"
            rows={7}
            cols={15}
            value={postFormData?.content}
            onChange={handleChange}
            placeholder="Add content"
          ></textarea>
        </div>
        <button className="btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
```

</details>

Notice, we pass the `posts` array and the `dispatch` function to `<CreatePostForm />` and use them inside the JSX where necessary. A `create` action is dispatched with form data when the form is submitted:

```js
const handleSubmit = (e) => {
  e.preventDefault();
  // highlight-next-line
  dispatch({ type: "create", payload: postFormData });
  setPostFormData(initialFormData);
};
```

For each post in `<Posts />`, we'll add a `delete` button that dispatches the `delete` action type:

```js
<button
  class="btn-delete"
  onClick={() => dispatch({ type: "delete", payload: { id: post?.id } })}
>
  Delete
</button>
```

We'll add `<CreatePostForm />` inside `<Posts />`. So update the `<Posts />` component to below:

<details>

<summary>Show updated `<Posts />` component code</summary>

```js
import React, { useReducer } from "react";
// highlight-next-line
import { CreatePostForm } from "../components/create-post-form";
import { postsReducer, initialPosts } from "../reducers/postsReducer";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Posts() {
  const [posts, dispatch] = useReducer(postsReducer, initialPosts);

  return (
    <div className="container mx-auto my-16 rounded-lg bg-gray-100">
      <div className="flex items-start justify-start p-8">
        // highlight-start
        <div className="">
          <CreatePostForm posts={posts} dispatch={dispatch} />
        </div>
        // highlight-end
        <div className="ml-8 w-3/5 bg-inherit">
          <h2 className="title">All Posts</h2>
          {posts?.map((post) => {
            return (
              <div class="card">
                <div class="p-6">
                  <div className="px-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 class="mb-1 text-xl font-medium leading-tight">
                          {post?.title}
                        </h5>
                        <h6 class="subtitle">{post?.subtitle}</h6>
                      </div>
                      <div className="relative flex items-center justify-center">
                        <HeartIcon
                          height={32}
                          width={32}
                          className="fill-red-500 text-red-500"
                        />
                        <span className="absolute text-xs font-normal text-gray-50">
                          {post?.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p class="mb-4 bg-gray-50 p-2 text-base leading-normal">
                    {post?.content}
                  </p>
                  <div className="flex items-center justify-between px-2">
                    <div className="">
                      <button
                        class="btn-delete"
                        onClick={() =>
                          dispatch({
                            type: "delete",
                            payload: { id: post?.id },
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        class="btn-like"
                        onClick={() =>
                          dispatch({
                            type: "unlike",
                            payload: { id: post?.id },
                          })
                        }
                      >
                        <HandThumbDownIcon
                          height={20}
                          width={20}
                          className="text-red-400"
                        />
                      </button>
                      <button
                        type="button"
                        class="btn-like"
                        onClick={() =>
                          dispatch({ type: "like", payload: { id: post?.id } })
                        }
                      >
                        <HandThumbUpIcon
                          height={20}
                          width={20}
                          className="text-blue-700"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

</details>

With these changes, we should now be able to use the form fields to create a post and use the `delete` button to delete one.

### React useReducer: Using an Initializer Function

In the demo, we have passed the initial state of `posts` as a pre-declared array of objects. However, in a real application, the initial state comes from an API typically with a `fetch` call or any other third party library such as Axios or React Query.

So, we can expect the initial values to yield from an `async` function. In such a scenario, it is possible to pass an initial state by invoking the `async` function with necessary arguments. For example, like the `getInitialPosts` function below:

```js
const getInitialPosts = async (url) => getPosts(url);

// highlight-next-line
const [posts, dispatch] = useReducer(
  postsReducer,
  await getInitialPosts("/posts"),
);
// Invoking is not ideal
```

However, invoking an initializer is suboptimal, since `userReducer`'s initial state gets evaluated only during the reducer's initialization. And it does not get re-evaluated on state updates and subsequent renders. In other words re-evaluation of state initializer function is ignored despite it being called every time the component re-renders.

So, using an invoked initializer function with `useReducer()` wastes application resources.

We can instead pass the function itself as the third argument to `useReducer()`, and any of its own arguments as the second argument to `useReducer()`. Like so:

```js
const [posts, dispatch] = useReducer(postsReducer, "/posts", getInitialPosts);
// Initializer function passed as third argument, without being invoked
// Any argument of initializer function passed as second argument to `useReducer()`
```

This way, the initializer function (`getInitialPosts` here) passed its dependent arguments (`/posts` url) on the reducer's initialization. The initializer function now only gets invoked during that time. Any subsequent call is prevented. This helps optimize the component.

## React useReducer: Benefits and Comparison

In this section, we discuss the benefits of using `useReducer()` hook and how it compares to Redux which also uses reducers under the hood.

### Benefits of Using React useReducer Hook

Major benefits of using the `useReducer()` hook in React are:

- Helps consolidate related states in one place.
- Helps implement multiple actions on an application entity.
- Reducer state and functions can be refactored outside of a component.
- Reducer state and functions are reusable from multiple components.
- Reducer state and functions are reinitializable with different states for different components.
- The `dispatch` API allows us derive individual functions for handling action types.

### React useReducer Compared with Redux

Reducers form the backbone of [Redux](https://redux.js.org/introduction/getting-started) which is a lightweight client side state management solution for React. The idea of consolidating states into one is essential in both Redux and `useReducer()`, as well as the notion of action types and dispatching them with the `dispatch()` API. In addition, the structure of the reducer function is the same in both Redux and `useReducer()`.

However, Redux is tailored for managing client state globally, often over a vast majority of components in a React app. It uses a global store composed of individual reducer slices. Each slice would have its own reducer function, state and action types. And slices are combined to make up a global store. In contrast, `useReducer()` implements standalone reducers, which compare as single slices in a Redux store.

## Summary

In this post, explored with a demo app, how to use the React `userReducer()` for consolidating component state into a reducer. We learned that `useReducer()` initializes a React reducer with state and `dispatch()` function for invoking actions on the state. We followed examples from a `postsReducer` function to understand what constitutes a reducer function and discussed the good practices involved while writing efficient reducer function. We also explored how `useReducer()` with a reducer helps implement state actions at multiple levels of its nesting.

Towards the end, we outlined the benefits of using `useReducer()` and learned how it compares to global use of reducers in Redux.
