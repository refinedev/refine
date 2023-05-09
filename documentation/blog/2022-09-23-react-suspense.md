---
title: A Quick Start Guide to React Suspense
description: We will discuss how React Suspense works and common use cases
slug: react-suspense-guide
authors: joel_adewole
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-23-react-suspense/social.png
hide_table_of_contents: false
---


## Introduction

Content delivery and site performance are important factors for web applications to achieve maximum user experience. Content must be delivered to users quickly and effectively. You want your site to function at its best performance to keep a decent dwell time. 

Before React 16, React had the `React.lazy()` method to allow developers to label a component as "lazy," causing it to be downloaded before being rendered. 

React 18 has made some changes and modifications to the React library, some of which were additions, removals, or deprecations, and enhancements to what was already there.

One of these enhancements involves React's "Suspense" functionality. The "Suspense" feature has been part of the library since React 16. With the recent release of React 18, the capability has been enhanced even better. 

In this article, we will discuss how "Suspense" works in React and some of its common use cases. 

You must have a working knowledge of React and JavaScript to follow along with this post.

Steps we'll cover:
- [What is Suspense?](#what-is-suspense)
- [Comparing Suspense to Transitions](#comparing-suspense-to-transitions)
- [Use cases of Suspense](#use-cases-of-suspense)
- [Common Mistakes Made When Using Suspense](#common-mistakes-made-when-using-suspense)


## What is Suspense?
The React Suspense API is a low-level interface that tracks a component's lifecycle and delays rendering while data required pends. User experience improves since users won't have to view a partially loaded component before data is eventually fetched and loaded fully. 

For instance, if the duration it takes for a table to load its data is not handled properly, users may initially see an empty table before the component rerenders and displays a fully loaded table.

The Suspense API acts as a wrapper around a component to be rendered and then provides a fallback that executes first before the main component renders.

Let's look at an example.
We may use React Suspense to wrap the component that renders an image and specify a spinner loader as the fallback option for the image to prevent viewers from seeing blurry images that gradually change into the original picture when an image is downloaded from a CDN or cloud storage.

```tsx
//Logo is a component that fetches an image from a CDN
import Logo from '.LoadLogo.js'

<Suspense fallback={<h1>Loading . . .</h1>}>
    <Logo />
</Suspense>
```

Let's examine a different scenario in which data loads from a JSON API, and we need to prevent the component from delivering an empty result.
```tsx
import loadData from './api/loadData.js';
const data = loadData('users.json');

<Suspense fallback={<h1>Loading . . .</h1>}>
    <Users />
</Suspense>

const Users = () => {
    const people = data.read();

    return (
        <div>
            {people.map(person => {
                <p key={person.id}>{person.name}</p>
            })}
        </div>
    );
};
```

<br/>
<div>
<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="github support banner" />
</a>
</div>
<br/>

## Comparing React Suspense to Transitions
Despite their similarities, Suspense and Transition APIs should not be used interchangeably or in the same context. 

React Suspense tracks a component's readiness before rendering it and only offers a deferred alternative until the original component prepares for rendering. 

Transition, on the other hand, enables you to prioritize one event over another. 
For instance, when adding a search feature, you might want to show the user what they are entering but wait to start the search until the user finishes typing.
```tsx
import {startTransition} from 'react';

// Set the input value but don't initiate the search
setInputValue(input);

startTransition(() => {
    // Set the final search value, then initiate search
    setSearchQuery(input);
});
```
States updates tagged as non-urgent inside of `startTransition` are interrupted if an urgent update is made while the non-urgent state is still updating. This process continues until no new urgent updates are made.

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />


---

## Use cases of Suspense
As was discussed in the previous section, it is simple to mistake the React Suspense API for Transition and vice versa. Therefore, it's crucial to know when to use and when to forgot them.

The following are some notable uses for the React Suspense API:
- Rendering media: Inadequate bandwidth could slow media download from an external server to be rendered on the client side. Suspense can provide a fallback option while waiting for the content to download, ensuring a smooth user experience.
- External Data Fetching: This case is similar to media downloading, except that we might be downloading data from databases and may need to tackle race conditions and concurrency issues. In this situation, suspense can be a huge asset.
- Code splitting: Suspense can execute content delivery in parallel or on demand.

## Common Mistakes Made When Using Suspense
Developers frequently misuse Suspense because of its similarity to Transition and other APIs. For illustration: 

Using components that handle concurrency using `useEffect()` inside Suspense. The use of "useEffect", which is designed to manage concurrency, inside the Suspense API defeats the purpose of the API. 

Relay uses Suspense, however, it doesn't perform the same functions as Relay. Some users mistake Suspense for a server API request tool like Axios or Relay.

Another mistake people make is using `catch()` to handle errors. This will cause the component to wait for the promise before rendering. Instead, Error Boundary can be used to handle rendering errors.

## Conclusion
Although Suspense has been a part of React since version 16, React 18's Concurrency concept makes the Suspense API's concept more effective and improved. 

Suspense is rather cheap and easy to switch to; if you're interested in learning more about the API, check the [official documentation](https://17.reactjs.org/docs/concurrent-mode-suspense.html).

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord-banner.png" alt="discord banner" />
</a>
</div>


