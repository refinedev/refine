---
title: React useMemo hook guide with examples
description: Improve the React app performance with useMemo() hook
slug: react-usememo
authors: abdullah_numan
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-16-react-use-memo/social.jpg
hide_table_of_contents: false
---







## Introduction
This post is about how to use the `useMemo()` hook in React.

`useMemo()` is a function that returns a memoized value of a passed in resource-intensive function. It is very useful in optimizing the performance of a React component by eliminating repeating heavy computations.


In this post, we dive into the details of the **useMemo** hook with an extension of the example demonstrated in the previous post titled [Memoization using React memo](https://refine.dev/blog/react-memo-guide/).

Steps we'll cover:
- [Resource Intensive Functions](#resource-intensive-functions)
- [Enter `useMemo()`](#enter-usememo)
- [useMemo Dependencies](#usememo-dependencies)
- [Conclusion](#conclusion)


### Project Content Overview

The example app is based on the idea of a list of posts on a blog. There are several components involving a user seeing the latest posts and a list of the user's posts. Allow yourself some time to understand the components individually, their relationships, their state changes, and how props are passed through. It is crucial to pay close attention to how the change of a parent's state triggers the re-render of its descendants.

[Here you can find the example app's live code](#live-stackblitz-example)

The discussion of this article is focused on optimizing performance by memoizing the value of resource-intensive functions, such as a sorting function. In React, we do this with the `useMemo()` hook.

## Resource Intensive Functions
We're going to jump back to the `<Blog />` component for this example:

```tsx title="src/components/Blog.jsx"
import React, { useEffect, useState } from 'react';
import fetchUpdatedPosts from '../fetch/fetchUpdatedPosts';
import allPosts from './../data/allPosts.json';
import sortPosts from '../utils/sortPosts';
import LatestPost from './LatestPost';
import UserPostsIndex from './UserPostsIndex';

const Blog = ({ signedIn }) => {
  const [updatedPosts, setUpdatedPosts] = useState(allPosts);
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());

  const getLatestPosts = () => {
    const posts = fetchUpdatedPosts();
    setUpdatedPosts(posts);
  };

 const sortedPosts = sortPosts(updatedPosts);

  useEffect(
    () => {
      const id = setInterval(
        () => setLocalTime(new Date().toLocaleTimeString()),
        1000
      );
      return () => clearInterval(id);
    },
    []
  );

  console.log('Rendering Blog component');

  return (
    <div className="container">
      <h1>Memoization in React</h1>
      <div>
        <div>
          { /* More JSX code here... */ }
          <LatestPost signedIn={signedIn} post={sortedPosts[0]} />
        </div>
        <UserPostsIndex signedIn={signedIn}/>
      </div>
    </div>
  );
};

export default React.memo(Blog);
```


We'd like to focus particularly on the `sortPosts()` utility function which can get expensive if passed a long array of posts. 

At the moment, we are only sorting 101 items returned from `fetchUpdatedPosts()`, but in an actual application, the number can be much higher and consume resources at scale. Thus it is an expensive function.

If we look inside the `useEffect()` hook, we are updating the locale time string and storing it in `localTime` for our clock. `localTime` updates every second, and at each state, change triggers a re-render of `<Blog />`. The clock does not represent a genuine UI feature for us here, but it is there to make a point about how frequent re-renders complicate things with expensive utility functions.

Our `sortPosts()` logs `Sorting posts...` to the console and returns a sorted array from the passed in an array:

```tsx title="src/utils/sortPosts"
const sortPosts = posts => {
  console.log('Sorting posts...');
  return posts.sort((a, b) => b.id - a.id);
};

export default sortPosts;
```


If we look at the console, we see that `Sorting posts...` is being logged at 1000ms intervals, i.e. with the tick of our clock:

<div  class="img-container" align-items="center" >
     <img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-16-react-use-memo/usememo1.png"  alt="usememo1" />
</div>

<br/>

This shows `sortPosts()` is called at every re-render of `<Blog />`. An expensive function, invoked every second for no obvious reason, is too much of an ask from the app. We don't want `sortPosts()` to be called if `updatedPosts` is not changed.


---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />

---

## Enter `useMemo()`
`useMemo()` helps us memoize the value of `sortPosts()` when `updatedPosts` doesn't change. Let's use the memoized function:

```diff title="src/components/Blog.jsx"
-- const sortedPosts = sortPosts(updatedPosts);
//highlight-next-line
++ const sortedPosts = useMemo(() => sortPosts(updatedPosts), [updatedPosts]);
```

Checking our console, we can see that `Sorting posts...` has been logged only once, indicating only one invocation of `sortPosts()`:


<div  class="img-container" align-items="center" >
     <img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-16-react-use-memo/usememo2.png"  alt="usememo2" />
</div>

<br/>

This gives us a huge performance gain.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>


## useMemo Dependencies
Notice the dependency of `useMemo()` as the second argument, `updatedPosts`. We are asking the hook to renew the memo when `updatedPosts` changes. Let's try to change the value of `updatedPosts`:

In the `<Blog/>` component, we have a `Get Latest Post` button, which is used to fetch latest posts on demand. Every time `Get Latest Post` button is clicked, `updatedPosts` is updated with the invocation of `getLatestPosts()`. 

If the state of `updatedPosts` is changed, a re-render of `<Blog />` is triggered, which leads to a call to `sortPosts()` with the new value of `updatedPosts` passed in.

If we check our console while clicking the button, we can clearly see `Sorting posts...` being logged for each click:

<br/>

<div class="img-container" align-items="center" >
    <img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-16-react-use-memo/usememo3.png" alt="usememo3" />
</div>

<br/>


:::info 
It is important to notice that, if we remove the dependency from `useMemo()`, `sortPosts()` will not be invoked when `updatedPosts` change:


```tsx
  const sortedPosts = useMemo(() => sortPosts(updatedPosts), []);
```

There is no sorting going on when we need it:

<div class="img-container" align-items="center" >
     <img style={{alignSelf:"center", width:"400px"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-16-react-use-memo/usememo4.png" alt="usememo4" />
</div>

<br/>
:::

<br/>

It is also important to know that **useMemo** returns a value, as opposed to a function. This is what differentiates it from the `useCallback()` hook, which returns a memoized function. So, `useMemo()` is preferred for memoizing a value rather than a callback function.

## Conclusion

In this article, we looked into the use of `useMemo()` hook and found out it plays a crucial role in optimizing the performance of our app by memoizing an expensive utility function. We saw that it is important to specify the dependency of **useMemo**  so that the memo is renewed when the state of dependency changes.

In the next post, we will demonstrate the use of `useCallback()` hook.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord-banner.png" alt="discord banner" />
</a>
</div>


## Example

<CodeSandboxExample path="blog-react-memoization-memo" />

