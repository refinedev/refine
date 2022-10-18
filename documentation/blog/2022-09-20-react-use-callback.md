---
title: Memoization in React - How useCallback Works
description: Improve the APP performance with React useCallback() hook
slug: react-usecallback-guide
authors: abdullah_numan
tags: [react, memoization, usecallback, performance]
image: /img/blog/2022-09-20-react-use-callback/social.png
hide_table_of_contents: false
---

import usecallback1 from '@site/static/img/blog/2022-09-20-react-use-callback/usecallback1.png';
import usecallback2 from '@site/static/img/blog/2022-09-20-react-use-callback/usecallback2.png';



## Introduction
This post is about using the `useCallback()` hook in React. This is the third part of the series titled Memoization in React.

In React, callback functions like event handlers inside a component are re-created as unique function objects at every re-render of the component. When a callback is passed from a parent to a child as a prop, the child component re-renders just because of the absence of referential integrity of the callback. `useCallback()` helps maintain the callback's referential integrity and prevent these re-renders.

We'll look at the details of the `useCallback()` hook with an example demonstrated in the previous post titled [Memoization in React - How `useMemo()` Works](https://refine.dev/blog/react-usememo/). 

Steps we'll cover:
- [Pass Callback from Parent to Child](#pass-callback-from-parent-to-child)
- [Referential Integrity](#referential-integrity)
- [Memoizing Event Listeners with `useCallback()`](#memoizing-event-listeners-with-usecallback)
- [Other Cases](#other-cases)
  
### Project Content Overview

The app is based on the idea of a list of posts on a blog.

[The example app live code](#live-stackblitz-example)

The discussion of this article is focused on optimizing performance by memoizing callback functions that are passed as a prop from a parent component to a child. We are going to use the `useCallback()` hook for this.

## Pass Callback from Parent to Child
In this example, we'll consider the `<UserPostsIndex />`, `<UserPostsList />` and `<UserPosts />` components.

As you can see below, `<UserPostsIndex />` fetches and sets `userPosts` when the compnent renders:

```tsx title="components/UserPostIndex.jsx"
import React, { useEffect, useState } from "react";
import fetchUserPosts from "../fetch/fetchUserPosts";
import UserPostsList from "./UserPostsList";

const UserPostsIndex = ({ signedIn }) => {
  const [userPosts, setUserPosts] = useState([]);

  const deletePost = e => {
    const { postId } = e.currentTarget.dataset;
    const remainingPosts = userPosts.filter(post => post.id !== parseInt(postId));
    setUserPosts(remainingPosts);
  };

  useEffect(() => {
    const posts = fetchUserPosts();
    setUserPosts(posts);
  }, []);


  return (
    <div className="my-1 p-2 box">
      <div className="m-1 py-1">
        <h2 className="heading-md">Your Posts</h2>
        <p className="m-1 p-1">{signedIn ? `Signed in`: `Signed out `}</p>
        {
          userPosts &&
          (
            <div className="px-1">
              {
                <UserPostsList userPosts={userPosts}
                  deletePost={deletePost}
                />
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default React.memo(UserPostsIndex);
```

In the JSX, we have a `deletePost()` function passed on to `<UserPostsList />` component, along with `userPosts`. Prior to that, `<UserPostsIndex>` receives `signedIn` as a prop from `<Blog />`.

In the `<UserPostsList />` component, we receive `userPosts` and `deletePost()` function and display a `<UserPost />` for each post in `userPosts` array:

```tsx title="components/UserPostList.jsx"
import React from 'react';
import UserPost from './UserPost';

const UserPostsList = ({ userPosts, deletePost }) => {

  console.log('Rendering UserPostsList component');

  return (
    (
      <div className="px-1">
        {
          userPosts.map(post => (
            <div key={post.id} className="my-1 box flex-row">
              <UserPost post={post} />
              <button className="btn btn-danger" data-post-id={post.id} onClick={deletePost}>Delete</button>
            </div>
        ))
        }
      </div>
    )
  );
};

export default React.memo(UserPostsList);
```

Inside `<UserPostsList />`, `deletePost()` is used to remove an item from the list.

`<UserPost />` is just a presentational component where we display the title as a link. Feel free to go over it in your editor.

Now let's add following:

```tsx title="components/UserPostIndex.jsx"
console.log('Rendering UserPostsIndex component');
```

and this one in `<UserPostsList />`:

```tsx title="components/UserPostList.jsx"
console.log('Rendering UserPostsList component');
```

If we check our console, we can see the logs for the inital rendering of the components.  
Then if we click the `SignOut` button on the navbar, we see batches of renders from `<UserPostsIndex />`, `<UserPostsList />` and `<UserPost />`:

<div class="img-container" align-items="center" >
   <img style={{alignSelf:"center", width:"400px"}} src={usecallback1} alt="usecallback1" />
</div>

<br/>


We can account for the re-render of `<UserPostsIndex />` because the value of the `signedIn` prop changed. However, re-rendering `<UserPostsList />` does not make sense because `userPosts` does not change with the change in the value of `signedIn`.  

We already memoized `<UserPostsList />` with `React.memo()`. We don't see any reason why it should re-render due changes in any ancestor's state.

 Does `deletePost()` change ?

<br/>
<div>
<a href="https://github.com/pankod/refine">
  <img  src="https://refine.dev/img/github-support-banner.png" alt="github support banner" />
</a>
</div>

## Referential Integrity
Well, `deletePost()` changes, and it changes due to breaking of **referential integrity**. And this change triggers a re-render in `<UserPostsList />` which we don't expect to see.

In React, a function passed to a component as a prop fails to maintain referential integrity because a new function object is created at every render from a function declared inside a parent component. So the value of the prop in the receiver component is different at every re-render of the parent. As a result, the receiver also re-renders, unexpectedly.

In our example, `<UserPostsList />` is not expected to be re-rendered, but it does because referential integrity fails as `deletePost()` is a different function object at every re-render of `<UserPostsIndex />`, i.e. they are not equal. So, when we change `signedIn`, `<UserPostsIndex />` re-renders, and so `<UserPostsList />` also re-renders.

## Memoizing Event Listeners with `useCallback()`
Now, memoizing `deletePost()` produces the same function at every re-render. Let's memoize it with `useCallback()` by making the following changes in `<UserPostsIndex />`:

```tsx title="components/UserPostIndex.jsx"
  // highlight-next-line
import React, { useCallback, useEffect, useState } from "react";

const UserPostsIndex = ({ signedIn }) => {

// highlight-next-line
  const deletePost = useCallback(e => {
    const { postId } = e.currentTarget.dataset;
    const remainingPosts = userPosts.filter(post => post.id !== parseInt(postId));
    setUserPosts(remainingPosts);
    // highlight-next-line
  }, [userPosts]);

  ...

};

export default React.memo(UserPostsIndex);
```

Now, if we click the `Sign Out` button a few times, we'll see in the console that `<UserPostsIndex />` is re-rendered, but `<UserPostsList />` and `<UserPost />` is not:

<div class="img-container" align-items="center" >
   <img style={{alignSelf:"center", width:"400px"}}  src={usecallback2}  alt="usecallback2" />
</div>

<br/>

This is because `useCallback()` caches and produces the same copy of `deletePost()` at every render of `<UserPostsList />`, until its dependencies change. 

Here, a change in `userPosts` triggers renewal of the memo of the function, so everytime the value of `userPosts` changes, `<UserPostsList />` will be re-rendered.

## Other Cases
Memoized callbacks are very important to maintain referential integrity so that the same function object is made available every time a component re-renders. `useCallback()` is also used to cache callbacks in debouncing, as well as dependencies in hooks like `useEffect()`.

## Conclusion

In this article, we looked at how re-renders of a parent component lead to violation of referential integrity of callback functions passed in as props to child components, which causes unnecessary re-renders of a child. `useCallback()` helps us produce the same function object at every re-render of the parent, and be pass it to the child. This prevents the unnecessary re-renders of child components.


<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.dev/img/discord-banner.png" alt="discord banner" />
</a>
</div>


## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/blog/react-memoization-memo/?embed=1&view=preview&theme=dark&preset=node&ctl=1"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="react-memoization-memo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

---

## Build your React-based CRUD applications without constraints

Low-code React frameworks are great for gaining development speed but they often fall short of flexibility if you need extensive styling and customization for your project.

Check out [refine](https://github.com/pankod/refine),if you are interested in a headless framework you can use with any custom design or UI-Kit for 100% control over styling.


<div>
<a href="https://github.com/pankod/refine">
    <img  src="https://refine.dev/img/refine_blog_logo_1.png" alt="refine blog logo" />
</a>
</div>

<br/>

**refine** is an open-source React-based framework for building CRUD applications **without constraints.**
It can speed up your development time up to **3X** without compromising freedom on **styling**, **customization** and **project workflow.**

**refine** is headless by design and it connects **30+** backend services out-of-the-box including custom REST and GraphQL API’s.

Visit [refine GitHub repository](https://github.com/pankod/refine) for more information, demos, tutorials, and example projects.

