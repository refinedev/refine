---
title: Understanding the React useRef Hook
description: We will explain the differences between useRef and React ref
slug: react-useref-hook-and-ref
authors: joel_adewole
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-26-react-useref/social.png
hide_table_of_contents: false
---





## Introduction

Among the various JavaScript libraries and frameworks, React is recognized for its developer friendliness and support.

Most developers find React very comfortable and scalable because of its provision of hooks. Hooks are built-in APIs that come with React and allow developers to interact with React state and lifecycle features in React. Hooks do not work inside classes, so they can only be used inside functional components. Developers can also decide to create custom hooks.

React allows for developer discretion, and more so than most UI libraries, it enables you to rethink the standard approach to designing UI components, such as by creating views using React and JSX's abstraction mechanism rather than the typical DOM specification.

In this article, we will discuss the **React useRef** hook, using ref to access DOM and the **differences between ref and useRef**.

Steps we'll cover:
- [What is useRef?](#what-is-useref)
- [Using Ref to Access DOM Elements](#using-ref-to-access-dom-elements)
- [Difference between Ref and useRef](#difference-between-ref-and-useref)
- [Using Ref and useRef in an Application](#using-ref-and-useref-in-an-application)
- [Use-cases of Ref and useRef](#use-cases-of-ref-and-useref)


## What is useRef?
One of the various hooks included in React is the useRef hook; it is used to reference an object inside a functional component and preserves the referenced object's state between re-renders. 

**useRef** has a property called "current" used to retrieve the value of the referenced object at any time while also accepting an initial value as an argument. You can change the value of a referenced object by updating the `current` value.

Here is how to  create a referenced object:
```tsx
import { useRef } from ‘react’

const myComponent = () => {
         const refObj = useRef(initialValue)

    return (
    //…
    )
}
```

In the snippet above, we have an object `refObj` we want to reference in an application, to access the value or update the value, we can call the `current` property like this:
```tsx
// inside a function
const handleRefUpdate = () => {
    // accessing the referenced object’s value
    const value = refObj.current

    // updating the referenced object’s value
   refObj.current = newValue
}
```

You should take note that:
- The value of the referenced object remains the same between re-renders.
- Updating the value of the referenced object doesn’t trigger a re-render.
  

## Using Ref to Access DOM Elements

Having in mind that DOM elements are also objects, we can reference them using useRef. But now, we need to make use of another player called `ref`.  
`ref` is an HTML attribute that assigns a referenced object to a DOM element. Let’s see how this works:

```tsx
import {useRef} from ‘react’

const myComponent = () => {
         const elementRef = useRef()

    return (
        <input ref={elementRef} type=”text” />
    )
}
```
In the code snippet above, we created a new reference object, `elementRef` and assigned it to an input tag using the `ref` attribute. We can access the value of the input tag and update the value like this:

```tsx
const handleInput = () => {
    //accessing the input element value
   const textValue = elementRef.current.value


   // update the input element value
   elementRef.current.value = “Hello World”
}
```
In the code snippet above, we created a function that gets the current value of the input element and assigned it to `textValue`. We also updated the value of the input element to “Hello World”.

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />

---
## Difference between Ref and useRef
As discussed in the previous sections of this article, we can understand clearly that useRef is used to create a reference object, while `ref` is used to access and assign DOM nodes or react components inside the render method to a reference object.

Also, a `ref` can be created using the useRef hook or createRef function, which can’t be done the other way.

**useRef** can be used to reference any type of object, **React ref** is simply a DOM attribute used to reference DOM elements.

## Using Ref and useRef in an Application

Since we understand how `ref` and `useRef` work and their differences, let’s look at how we can use them in an actual application.
For instance, we want to implement a click-away event listener for a pop-up. We can make use of `ref` to access the DOM element of the pop-up and listen when a click is made outside the pop-up.

In your react application environment, you can create a folder called “hooks”, this folder will contain custom hooks.

Inside the folder create a new file `useClickAway`, and enter the following code into the file:
```tsx
import React, { useEffect} from 'react'
 
export default function useClickAway(ref: any, callback: Function) {
   useEffect(() => {
     function handleClickAway(event: any) {
       if (ref.current && !ref.current.contains(event.target)) {
         callback();
       }
     }
 document.addEventListener("mousedown", handleClickAway);
     return () => {
       document.removeEventListener("mousedown", handleClickAway);
     };
   }, [ref]);
 };
```
In the above code snippet, we created a custom hook that accepted a reference object as `ref` and a callback function, then we performed an event listener to check when the mouse is clicked, if the click is not on the current ref then we trigger the callback function.

Here is an implementation of the custom hook on a product page:
```tsx
import React, { useRef } from "react";
//.. Other importations
export default function Storefront() {
  const targetElement = useRef(null)
  const alertClickAway = () => {
   alert("Clicked outside product 1")
 }
 useClickAway(targetElement, alertClickAway)
 //.. Other functions
 return (
       {//.. Other parts of the application}
       <div className="gallery">
         <div className="col" ref={targetElement}>
           <img src="https://i.postimg.cc/G207QNV7/image.png" alt="Product 1" />
           <p>iWatch Series 6</p>
           <div className="btns">
             <button>
               <img src="https://api.iconify.design/flat-color-icons:like.svg?color=%23888888" alt="like" />
             </button>
             <button>
               <img 
                  src="https://api.iconify.design/icon-park:buy.svg?color=%23888888"
                  alt="add" />
            </button>
           </div>
         </div>
 )
}
```
In the code snippet above, we have a storefront component where we imported the custom hook `useClickAway`, we then created a new reference object `targetElement` and assigned it to a div inside a gallery of products, and then we created a callback function to alert whenever the mouse is clicked outside the product item with ref `targetElement`.

Now let’s see the output:


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-26-react-useref/useref.gif"  alt="useRef" />

</div>

<br />


## Use-cases of Ref and useRef
You now have enough understanding of what `ref` and `useRef` are and how they work. You may now be contemplating when to use and when to avoid using references. Both `ref` and `useRef` are quite easy to misuse, and doing so can be highly expensive.

The following are some uses for references:
- Interacting with input elements: Accessing input elements and performing functionality like focus, change tracking or auto-completion are made possible by using refs. 
- Interacting with third-party UI libraries: Ref can be used to interact with elements created by third-party UI libraries that might be tricky to access using standard DOM methods. For instance, if you use a third-party library to generate sliders, you can use ref to access the sliders' DOM element without being informed of the structure of the slider library's source code. 
- Media playback: You may also access media assets like images, audio, or videos using refs and interact with how they are rendered. For instance, auto-playing videos or lazy loading of images when an element enters the viewport.
- Complex animation triggering: Traditionally, CSS keyframes or a timeout are used to determine when to initiate animations. In some situations, which can be more complicated, you can use refs to observe DOM elements and determine when to start an animation.
- In some situations, such as the following, you shouldn't use references:
- Declarative cases: Even in situations with simple solutions where using refs works, there is no need to write more expensive code to do the same task. For instance, using conditional rendering to hide or show DOM elements instead of refs. 
- Elements affecting state: Occasionally, the concept of using refs is so intriguing that you overlook the impact of modifications made to an element on the application's lifecycle. You should have in mind that changes to refs do not cause re-rendering and that refs maintain the value of their objects across renderings. Therefore, it is advisable to avoid using refs in situations when state changes need to trigger a re-render.
 - Accessing functional components: DOM elements, which should not be mistaken for functional components, can be referenced using the Ref attribute. Because, unlike class components or DOM elements, functional components do not have instances. For example:
  
```tsx
import {useRef} from ‘react’

const FunctionalComponent = () => {
	return (
		<h1>Hello World<>
)
}

const myComponent = () => {
         const elementRef = useRef()

    return (
        <FunctionalComponent ref={elementRef} />
    )
}
```
Because the component `FunctionalComponent` does not have instances, the ref in the code snippet above will not work. Instead, we can convert the `FunctionalComponent` into a class component or use `forwardRef` in the `FunctionalComponent` component.

  <br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>



## Conclusion
In this article, we discussed how to create references using the useRef hook, which takes an initial value and modifies the value of the reference object's 'current' property to update its value. 

We saw how to use the 'current' value with 'ref' to access DOM elements and interact with their properties. 

We go over how to create a custom hook that accepts the reference DOM element and a callback function to use "ref" and "useRef" in the application to observe click events on DOM elements. 

Additionally, we talked about the use cases for "ref" and "useRef," when to use them and when not to.

Having seen how `ref` and `useRef` can be used to keep track of and update mutable values without re-rendering the parent components, you can explore more about them or learn more, by checking the React official documentation about [Refs](https://reactjs.org/docs/refs-and-the-dom.html) and [useRefs](https://reactjs.org/docs/hooks-reference.html#useref) and even try out other React hooks.

