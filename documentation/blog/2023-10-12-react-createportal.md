---
title: A complete guide to the React createPortal API
description: We'll explore the React createPortal API, its advantages, disadvantages, and possible use cases.
slug: react-createportal
authors: joseph_mawa
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-10-12-react-createportal/social.png
hide_table_of_contents: false
---

## Introduction

The `createPortal` API is part of the React DOM. You can use it to flexibly render the children of a React component in another location in the DOM. Though you can render a portal in another location, it still behaves like any other React child component.

This behavior of the `createPortal` API makes it easy to create UIs such as tooltips, toasts, modals, and popups. This article will take a deep dive into the `createPortal` API. We will explore its advantages, disadvantages, and possible use cases.

Steps we'll cover:

- [Complete guide to the `createPortal` API](#complete-guide-to-the-createportal-api)
- [Pros of the `createPortal` API](#pros-of-the-createportal-api)
  - [Rendering an element in another location in the DOM](#rendering-an-element-in-another-location-in-the-dom)
  - [Integrating third-party packages into your project](#integrating-third-party-packages-into-your-project)
- [Cons of the `createPortal` API](#cons-of-the-createportal-api)
  - [CSS Inherited properties](#css-inherited-properties)
  - [Complex portals are difficult to maintain](#complex-portals-are-difficult-to-maintain)
  - [Accessibility issues](#accessibility-issues)
  - [Mismatch between location in the DOM and event bubbling](#mismatch-between-location-in-the-dom-and-event-bubbling)
- [Use cases of the `createPortal` API](#use-cases-of-the-createportal-api)

## Complete guide to the `createPortal` API

As explained above, the `createPortal` API is part of the React DOM API. Therefore, before using it, you need to import it from `react-dom` like so:

```tsx
import { createPortal } from "react-dom";
```

Ordinarily, a React component and its children have a parent-child relationship, and all the children are nested within their parent after rendering.

However, with the `createPortal` API, a React component can render all or some of its children in another location in the DOM rather than the parent. The code below shows its function signature.

```tsx
createPortal(children, domNode, key?)
```

The `children` parameter of the `createPortal` function must be a React component, JSX, React Fragment, string, number, or an array of these.

The `domNode` parameter is the DOM Node in which you want to render the `children`. You can use the `document.getElementById` method or any of the element-lookup methods of the `document` object.

The last parameter is an optional key. It is a unique string or number that will be used as the portal's key.

The `createPortal` function returns a React Node. Therefore, you can return it from a React component or render it inside another component's JSX, as in the example below.

```tsx
import { createPortal } from "react-dom";

export function PortalDemo() {
  return (
    <div>
      <p>This child is placed in the parent div.</p>
      {createPortal(<p>This child is placed in the document body.</p>, document.body)}
    </div>
  );
}
```

When you render a component using the `createPortal` API, only the rendering of the component in the DOM changes. Everything else remains the same. The events generated from the portal will bubble in the React Node hierarchy not in the DOM hierarchy.

Though a portal is rendered in a different location in the DOM, it is still a child of the parent React Component that renders it. It re-renders whenever the props or context passed to it changes, and its parent re-renders.

## Pros of the `createPortal` API

There are several benefits of the `createPortal` API. Below are some of these benefits.

### Rendering an element in another location in the DOM

The biggest benefit of the `createPortal` API is that it gives you the flexibility to render an element outside its parent in another DOM element therefore breaking out of the usual parent-child relationship between components.

This helps you to easily build certain UIs, such as tooltips and modals which might otherwise be difficult without portals.

### Integrating third-party packages into your project

More often than not, you may want to integrate third-party packages that do not use React in your React application. The `createPortal` API makes it easy because you can use it to render a React component anywhere in the DOM.

## Cons of the `createPortal` API

As hinted above, the `createPortal` API comes in handy when you're looking to render a component in a different location in the DOM. It is without doubt a very useful feature of the `react-dom` package and has very many useful applications.

However, the `createPortal` API is not without drawbacks. Let's explore its disadvantages in this section.

### CSS Inherited properties

Though a portal is still a child of its parent React component, it doesn't inherit CSS properties applied to its parent because it's rendered in a different location in the DOM. This may result in hard-to-find bugs, especially when dealing with complex portals.

In the example below, I'm applying `color: red` to the parent `div`. Ordinarily, the nested `p` elements inherit the `color` property from their parent. However, the `p` element rendered using `createPortal` won't because it is rendered in a different location in the DOM.

```tsx
import { createPortal } from "react-dom";

function PortalDemo() {
  return (
    <div style={{ color: "red" }}>
      <p>This will be red.</p>

      {createPortal(<p>This won't be red.</p>, document.getElementById("portal"))}
    </div>
  );
}
```

Such behavior may result in bugs that may be difficult to trace, especially when dealing with complex applications.

### Complex portals are difficult to maintain

Portals may become difficult to maintain if you're dealing with complex interdependent portals. Similarly, it is difficult to reason about the components and the application because of the mismatch between the location of the portal in the DOM and where it is rendered in the React component.

### Accessibility issues

As we will discuss in the next subsection, the most common use-cases of the `createPortal` API are for creating toasts, modals, and popups. You will need to go above and beyond to make them accessible.

### Mismatch between location in the DOM and event bubbling

When you render an element in the DOM using `createPortal`, the events bubble up the React tree, not the DOM tree. The mismatch between the location of a portal in the DOM and event bubbling may make debugging a little more difficult in complex applications.

## Use cases of the `createPortal` API

As hinted above, the most common use-case of the `createPortal` API is for building UIs such as modals, tooltips, popups, and toasts.

The example below shows how to use portals to implement a basic modal in React. You can also implement tooltips, popups, and toasts pretty much similarly.

The example below is a basic illustration of the `createPortal` API without styling.

```tsx
import { useState } from "react";
import { createPortal } from "react-dom";

function Modal({ onClose }) {
  return (
    <div className="modal">
      <p>This is a modal.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open modal.</button>
      {showModal && createPortal(<Modal onClose={() => setShowModal(false)} />, document.body)}
    </div>
  );
}

export default App;
```

Furthermore, it is also possible to use the `createPortal` API to integrate React in a static page or a non-react application because it enables rendering React components anywhere in the DOM.

## Conclusion

As explained above, the `createPortal` API is part of the React DOM API. It is for rendering the children of a React component in another location in the DOM.

Though a portal is rendered in another location, it behaves like any React child component. It re-renders when its state, props, or context changes and when the parent component re-renders.

The `createPortal` function takes the `children`, `domNode`, and an optional `key` as arguments and returns a React Node, which you can render in another React component or JSX.

You can use the `createPortal` API to create toasts, modals, tooltips, and popups such as cookie permissions popups. However, make sure any portal you create is accessible.
