---
title: A Quick Start Guide to React Suspense
description: We will discuss how React Suspense works and common use cases
slug: react-suspense-guide
authors: joel_adewole
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-23-react-suspense/social.png
hide_table_of_contents: false
---

**_This article was last updated on February 5, 2024 to reorganize content for better understanding of React Suspense._**

## Introduction

React suspense is a built-in React component which lets you temporarily render a fallback UI while its children are still loading. Content delivery and site performance are important factors for web applications. You must deliver content quickly and effectively for better user experience.

Traditionally, you need to use state to manage the different stages when fetching data from an API. With React Suspense, you can suspend rendering a component that is still loading data and render a fallback UI. This improves both developer and user experience.

Similarly, you can use React suspense to split large React components into chunks and lazy load them to reduce the initial load time and bundle size.

In this article, we will discuss the React Suspense API and some of its common use cases. You must have a working knowledge of React and JavaScript to follow along.

Steps we'll cover:

- [What is React Suspense?](#what-is-react-suspense)
- [Comparing React Suspense to Transitions](#comparing-react-suspense-to-transitions)
- [Use cases of React Suspense](#use-cases-of-react-suspense)
  - [Fetch data using React suspense](#fetch-data-using-react-suspense)
  - [Lazy load components using React suspense](#lazy-load-components-using-react-suspense)
- [When to use React Suspense](#when-to-use-react-suspense)
- [React suspense and Error boundaries](#react-suspense-and-error-boundaries)
- [Common Mistakes When Using React Suspense](#common-mistakes-when-using-react-suspense)

## What is React Suspense?

React Suspense is a built-in React component that you can use to declaratively render a fallback UI until its children finish loading.

```tsx
<Suspense fallback={<FallbackUI />}>
  <MyComponent />
</Suspense>
```

It's a low-level implementation that tracks a component's lifecycle and delays rendering while required data pends. It improves user experience because users won't have to view a partially loaded component before data is fully fetched and rendered.

For instance, if the duration it takes for a table component to load data is long, users may initially see an empty table before the component rerenders and displays a fully loaded table.

The Suspense API acts as a wrapper around a component to be rendered and then provides a fallback that executes before the wrapped component renders.

As an example, we may use React Suspense to wrap the component that renders an image and specify a loading animation as the fallback option to prevent viewers from seeing blurry images that gradually change into the original picture after it loads from a CDN or cloud storage.

```tsx
// Logo is a component that fetches an image from a CDN
import Logo from "./Logo.js";

<Suspense fallback={<h1>Loading . . .</h1>}>
  <Logo />
</Suspense>;
```

## Comparing React Suspense to Transitions

Despite their similarities, do not use Suspense and Transition APIs interchangeably or in the same context.

React Suspense tracks a component's readiness before rendering it and only offers a deferred alternative until the original component is ready for rendering.

Transition, on the other hand, enables you to prioritize one event over another.

For instance, when adding a search feature, you might want to show the user what they are entering but wait to start the search until the user finishes typing.

```tsx
import { startTransition } from "react";

// Set the input value but don't initiate the search
setInputValue(input);

startTransition(() => {
  // Set the final search value, then initiate search
  setSearchQuery(input);
});
```

State updates tagged as non-urgent inside of `startTransition` are interrupted if an urgent update is made while the non-urgent state is still updating. This process continues until no new urgent updates are made.

## Use cases of React Suspense

As was discussed in the previous section, it is simple to mistake the React Suspense API for Transition and vice versa. Therefore, it's crucial to know when to use and when not to use them.

### Fetch data using React suspense

Traditionally, the fetch-on-render pattern is the commonest approach when fetching data from an API. With this pattern, you render the component, fetch data in a `useEffect` hook, update state, and the component re-renders to display the data.

Therefore, you need to declare state to manage the different data fetching stages. You need to display an appropriate UI when the data is still loading and an error message when an error occurs like in the example below.

```tsx
function MyComponent() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchData();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) return <div>Loading data...</div>;
  if (isError)
    return (
      <div>
        Oops failed to fetch data! <a href="/home">Home page</a>
      </div>
    );

  return (
    <ul>
      {data.map(({ id, name }) => {
        return <li key={id}>{name}</li>;
      })}
    </ul>
  );
}
```

The code above looks simple and easy to maintain. However, it can become complex pretty quickly in a real-world application where you fetch data from multiple data sources and work with several components concurrently. You can refactor the code above to use the Suspense API like in the example. You don't need to track the loading states manually. The temporary fallback UI is rendered while the data is still loading.

```tsx
import loadData from "./api/loadData.js";
const data = loadData("users.json");

<Suspense fallback={<h1>Loading . . .</h1>}>
  <Users />
</Suspense>;

function MyComponent() {
  const people = data.read();

  return (
    <div>
      {people.map(({ id, name }) => {
        <li key={id}>{name}</li>;
      })}
    </div>
  );
}
```

### Lazy load components using React suspense

Lazy loading is an optimization technique for improving the initial load time. For large applications, loading everything at once can lead to a performance hit on initial render. With lazy load, you can defer the initial load for certain components or modules until they're about to be rendered.

With lazy load, you can split code into small components and import only those components you need for initial render and defer loading others until the user interacts with the application.

You can use the built-in `lazy` function to lazy load a component. It takes a function or another thenable as argument. The function you pass to the `lazy` function should return a promise.

The `lazy` function returns a React component that you can render. While lazy-loading a component, attempting to render it will suspend. Therefore, you can use the `Suspense` component to render a lazy loaded component like so:

```js
import { lazy } from "react";
import Loading from "./Loading.js";

const MyComponent = lazy(() => import("./MyComponent.js"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <MyComponent />
    </Suspense>
  );
}
```

In the basic example above, React will import `MyComponent` when it's about to be rendered. While lazy-loading `MyComponent`, React renders the fallback `Loading` component.

## When to use React Suspense

You can use React Suspense to manage components that perform asynchronous operations such as fetching data from the server and lazy loading a component.

React pauses rendering a component wrapped in React suspense while it's performing an async operation and renders a temporary fallback UI until the operation is complete. This improves both developer and user experience.

React Suspense has several use cases:

1. **Data Fetching**: It allows components to wait for data before rendering. You can use libraries like Relay to integrate data fetching with Suspense.
2. **Code Splitting**: Suspense can dynamically load components with `React.lazy` and a dynamic `import()`, reducing the initial load time of your application.
3. **Resource Loading**: It can manage loading states for resources like images or scripts, improving the user experience during resource-intensive operations.
4. **Concurrency in React**: With the concurrent mode, Suspense can handle multiple tasks like data fetching, rendering, and user inputs simultaneously, making the app more responsive.

## React suspense and Error boundaries

In React , Error boundaries are components that you can use to catch errors in the application's component tree. If you don't handle it, an error in a single component can crash the entire application.

At the moment, you can define error boundaries using class components. A class component becomes an error boundary if it implements either the `static getDerivedStateFromError()` method or  the `componentDidCatch()` life cycle method or both as in the example below.

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error has occurred.</h1>;
    }

    return this.props.children;
  }
}
```

After that, you can wrap the `Suspense` component using the Error boundary like so:

```tsx
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <MyComponent />
  </Suspense>
</ErrorBoundary>
```

Instead of declaring an error boundary as in the example above, you can also use the [React error boundary](https://github.com/bvaughn/react-error-boundary) package. It's a popular React error boundary component. You can install it from the npm package registry using any package manager of choice.

The Refine blog also has an in-depth article about error boundaries. You can check it out [here](https://refine.dev/blog/react-error-boundaries/).

## Common Mistakes When Using React Suspense

It's not uncommon to misuse the Suspense API because of its similarity to Transition and other APIs. For illustration:

Using components that handle concurrency using `useEffect()` inside Suspense. The use of "useEffect", which is designed to manage concurrency, inside the Suspense API defeats the purpose of the API.

Relay uses Suspense, however, it doesn't perform the same functions as Relay. Some users mistake Suspense for a server API request tool like Axios or Relay.

Another mistake people make is using `catch()` to handle errors. This will cause the component to wait for the promise before rendering. Instead, use Error Boundary to handle rendering errors.

## Conclusion

React suspense API comes in handy for building performant and responsive web apps. As explained above, you can use React suspense to render a lazy loaded React component or render a fallback UI while fetching data from an API. The `Suspense` component will render a fallback UI while its children are loading.

As you use the suspense API, be aware that only suspense-enabled functionalities such as lazy loading will activate the Suspense component out of the box.

At the moment, React doesn't have out-of-the-box support for suspense-enabled data fetching. However, you can use React meta frameworks such as Next.js because they integrate suspense-enabled data fetching functionality for you.

Similarly, the `Suspense` component doesn't detect any data you load inside a `useEffect` hook or an event handler.

Suspense is easy to switch to; if you're interested in learning more about the API, check the [official React documentation](https://17.reactjs.org/docs/concurrent-mode-suspense.html).
