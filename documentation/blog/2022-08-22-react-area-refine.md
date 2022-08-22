---
title: React Aria - Improve accessiblilty of React components in refine apps
description: We will be looking into ways to improve the accessibility and performance of refine app.
slug: react-area-refine
authors: ekekenta_clinton
tags: [react-aria, react, wai-aria]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import form from '@site/static/img/blog/2022-08-22-react-area-refine/form.png';
import openDialog from '@site/static/img/blog/2022-08-22-react-area-refine/open_dialog.png';



## Introduction

In this tutorial, we'll walk you through how to use React Aria to build a web application in a [refine](https://github.com/pankod/refine) application. You'll create components using React Aria and use them to build a demo application.
<!--truncate-->


Steps we'll cover includes:
- [Introduction](#introduction)
- [What is React Aria?](#what-is-react-aria)
- [Why use React Aria?](#why-use-react-aria)
- [Bootstrapping a refine app](#bootstrapping-a-refine-app)
- [Creating React components](#creating-react-components)
  - [Create Button component](#create-button-component)
  - [Create Input component](#create-input-component)
  - [Create Header Component](#create-header-component)
  - [Create Modal Component](#create-modal-component)
  - [Using React Aria components](#using-react-aria-components)
- [Adding Server side rendering](#adding-server-side-rendering)



## What is React Aria?

[React Aria](https://react-spectrum.adobe.com/react-aria/index.html) is a library of React Hooks that provides accessible UI primitives for your design system. It provides accessibility and behavior for many common UI components so you can focus on your unique design and styling. It implements adaptive interactions to ensure the best experience possible for all users, including support for mouse, touch, keyboard, and screen readers.

## Why use React Aria?
Here are some of the reasons you should consider using React Aria in  your web application

### It is easily accessible
React Aria offers complete screen reader and keyboard navigation support, as well as accessibility and behavior that adhere to WAI-ARIA Authoring Practices. To offer the greatest experience for every user, every component has been tested on a wide range of screen readers and devices.


### It is adaptive
No matter the UI, React Aria maintains consistent functionality. It enables interactions with the mouse, touch, keyboard, and screen reader that have been tried on a range of browsers, gadgets, and platforms.

### International
Over 30 languages are supported by React Aria, which also has right-to-left behavior and the internationalized date and number formatting, among other features.


### It is fully customizable
No rendering is implemented by React Aria, nor is a DOM structure, style approach, or design-specific information imposed. It enables interactions, behavior, and accessibility while letting you concentrate on your design.

## Bootstrapping a refine app
Now let's go ahead and set up a [refine](https://github.com/pankod/refine) project to create a component library using React Aria. To do that, run the command below.

```
npx superplate-cli -p refine-react component-library
```
The above command will prompt you to complete options for your project. Your selection should look like the screenshot below.

Then wait while refine installs the required packages for this project. Once that is done, let's install React Aria. React Aria published all components as a separate module for adoptable sake, so you can choose to install the components independently or as all the package.
> Eg `npm install @react-aria/button`]

To save our time, we'll install all the component which is packaged under the  @react-aria scope with the command below.

```shell=
yarn add react-aria
```
Now change the directory to the project folder and run the application with the command below.

```
cd component-library &&  yarn dev
```

## Creating React components
We'll use the React hooks provided by Aria to create component libraries for our Refine application. React Aria offers accessibility and behavior for React hooks. You must define the DOM structure for your component and send the DOM props supplied by each React Aria hook to the proper elements because it does not provide any rendering.

 Additionally, it allows you total control over the DOM by enabling you to add additional components for styling or layout control, such as CSS classes, inline styles, CSS-in-JS, etc. We'll explore some of them and how they work. To get started, create a **component** folder in the **src** folder of our React project to save the component libraries.

```
mkdir src/components
```

### Create Button component
Let's start with the button component, and we'll use the [useButton](https://react-spectrum.adobe.com/react-aria/useButton.html) hook. The `useButton` hook takes care of several cross-browser discrepancies in interactions and accessibility capabilities, so you can focus on the styling. 


Create a `Button.tsx` in the component folder and add the code snippet below.

```tsx title="Button.tsx"
import React, { ElementType, RefObject } from "react";
import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "react-aria";

export default function Button(props: AriaButtonProps<ElementType> | any) {
  let ref: RefObject<any> = React.useRef();
  let { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref} style={props.style}>
      {props.children}
    </button>
  );
}
```

In the above code snippet, we imported the `useButton` hook and called it, passing the `props` along with a `ref` to the DOM node for this component to get the `buttonProp` property. Then we spread the props returned from the hook into the **button** element that we want to render, passing the **ref** and the style props.

Now you can import and use this component, pass in the props you want, and add styles and event listeners.


```ts
<Button style={{backgroundColor:"red"}} onPress={()=>console.log('button clicked')}>click me</Button>
``` 

### Create Input component
Next, let's create the input component library using the [useFocus](https://react-spectrum.adobe.com/react-aria/useFocus.html) and [useTextField](https://react-spectrum.adobe.com/react-aria/useTextField.html) hooks. The `useTextField` hook offers a text field's behavior and accessibility implementation, while the `useFocus` hook handles focus events for the current target while ignoring events on the children of the focus element.

 Create an `Input.tsx` file in the component folder and add the code snippet below.

```tsx title="Input.tsx"
import React, { RefObject } from "react";
import { useFocus } from "@react-aria/interactions";
import { useTextField } from "@react-aria/textfield";
import { FocusProps } from "react-aria";

export default function Input(props: FocusProps| any) {
    let [value, setValue] = React.useState("");
    let { focusProps } = useFocus({
        onFocus: (e) => setValue((e.target as HTMLInputElement).value),
        onBlur: (e) => setValue((e.target as HTMLInputElement).value),
    });
    let { label } = props;
    let ref: RefObject<any> = React.useRef();
    let { labelProps, inputProps, errorMessageProps } =
        useTextField(props, ref);

  return (
    <div style={props.style}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} {...focusProps} ref={ref} />
      {value.length < 1 && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          All fields are required
        </div>
      )}
    </div>
  );
}
```

In the above code snippet, we imported the two Aria hooks. We created `setValue` state to get the value in the input field. The `setValue` state will enable users to know if the user has fielded the input field. Then we called the `useFocus` hook, which takes an object of event listeners as parameters. `useFocus` hook supports three event handlers.

- **onFocus**: This handler is called when the element receives focus.
- **onBlur**: This handler is called when the element loses focus.
- **onFocusChange**: This handler is called when the element's focus status changes.

We only need the onFocus and onBlur events to track the state of the input field when a user clicks in and out of it. Also, we called the `useTextField`, passing the props along with a `ref` to the DOM node for this component to get the `labelProps`, `inputProps`, and `errorMessageProps` properties. Then we spread the props returned from the hook into the `input` element that we want to render, passing the ref and the style props.

:::note
The`labelProps`, `inputProps`, and `errorMessageProps` handle the behavior of the input label, error message, and input properties.
:::

### Create Header Component
To create a Header component, we'll use the [`useHover`](https://react-spectrum.adobe.com/react-aria/useHover.html) hook. This hook handles the pointer hover interactions for an element. Create a `Header.tsx` file in the **component** directory and add the code snippet below.

```tsx title="Header.tsx"
import React, { ElementType } from "react";
import { useHover } from "@react-aria/interactions";
import { AriaButtonProps } from "react-aria";

export default function Header(props: AriaButtonProps<ElementType>| any) {
  let { hoverProps, isHovered } = useHover({});

  return (
    <div
      {...hoverProps}
      style={{
        background: isHovered ? "#167B73" : "#2D9E96",
        color: "white",
        padding: 4,
        cursor: "pointer",
        display: "block",
      }}
      tabIndex={0}
    >
      <div style={{display:"flex", justifyContent:"space-between", fontSize:"10px"}}>{props.children}</div>
    </div>
  );
}
```

In the above code snippet, we imported the two Aria `useFocus` hooks. We called it to get the `hoverProps` and `isHoverd` properties. We'll use the `isHovered` props to know when the mouse or pen goes over the element, and we will change the background color of the elements in the header. Then we spread the `hoverProps` into the **div** element that we want to render, passing an initial `tabIndex` of `0`. 

### Create Modal Component
We'll take advantage of the [`useDialog`](https://react-spectrum.adobe.com/react-aria/useDialog.html), `useFocusScope`, [`useOverlay`](https://react-spectrum.adobe.com/react-aria/useOverlay.html), [`useOverlayPreventScroll`](https://react-spectrum.adobe.com/react-aria/usePreventScroll.html), [`useModal`](https://react-spectrum.adobe.com/react-aria/useModal.html), `useOverlayContainer` and [`useButton`](https://react-spectrum.adobe.com/react-aria/useButton.html)n hooks.
 Create a `Modal.tsx` file in the component folder and add the code snippet below.

 ```tsx title="Modal.tsx"
import React, { ElementType, RefObject } from 'react';
import { useOverlayTriggerState } from '@react-stately/overlays';
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useButton } from '@react-aria/button';
import { AriaButtonProps, OverlayProvider } from 'react-aria';
import Button from './Button';

function ModalDialog(props: AriaButtonProps<ElementType> | any) {
  let { title, children } = props;
  let ref: RefObject<any> = React.useRef();
  let { overlayProps, underlayProps } = useOverlay(props, ref);

  usePreventScroll();
  let { modalProps } = useModal();
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          style={{
            background: 'white',
            color: 'black',
            padding: 30,
            width: '50%'
          }}>
          <h3
            {...titleProps}
            style={{ marginTop: 0 }}>
            {title}
          </h3>
          {children}
        </div>
      </FocusScope>
    </div>
  );
}

export default function Modal(props: AriaButtonProps<ElementType> | any) {
  let state = useOverlayTriggerState({});
  let ref: RefObject<any> = React.useRef();
  let { buttonProps } = useButton(props, ref);


  return <>
    <OverlayProvider>
      <Button onPress={state.open}>
        Open Dialog
      </Button>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title={props.title}
            isOpen
            onClose={state.close}
            isDismissable
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {props.children}
            </div>
          </ModalDialog>
        </OverlayContainer>
      )}
    </OverlayProvider>
  </>;
}
```

In the above code snippet, we imported the Aria hooks we need for this component, and we created a `ModalDialog` component to create a dialog for the modal. In the `ModalDialog`, we used the `useOverly` hook, which returns the `overlayProps` and `underlayProps` props to handle the user interactivity outside a dialog and to close the modal.


Then we used the `useDialog` hook, which returns `dialogProps` and `titleProps` to get the props of the dialogue and its title. Also, we used the FocusScope component to specify the focus area to be controlled by the dialog.

Next, we created the Modal component. Here we create the actual modal content. Here we used the `useButton` hook to ensure that focus management is handled correctly across all browsers. Focus is restored to the button once the dialog closes.


Lastly, we used the `ModalDialog` we created to create a dialog for the modal and pass in the required props. Also, we wrapped the application in an `OverlayProvider` hook so that it can be hidden from screen readers when a modal opens. 

You can learn more about creating a modal from this [link](https://react-spectrum.adobe.com/react-aria/useDialog.html).

### Using React Aria components
Now let's use the components libraries to create a small application. To do that, we'll create a `Layout.tsx` file in the components folder and add the code snippets below.

```tsx
import { useMenu, useNavigation, LayoutProps } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import Button from "./Button";
import Input from "./Input";
import Header from "./Header";
import Modal from "./Modal";


export const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className="App">
            <Header className="primary">
                <p>Formak</p>
                <p>Signup</p>
            </Header>
            <Modal title="Signup Form">
                <form>
                    <Input label="Name" />
                    <Input label="Email" />
                    <Input label="Password" type="password" />
                    <Button style={{ backgroundColor: "red" }} onPress={() => console.log('button clicked')}>Signup</Button>
                </form>
            </Modal>
        </div>

    );
};
```

In the above code snippet, we imported the component libraries and used them to create a small form application. Now update the `App.tsx` file with the code snippet below.

```tsx
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Layout } from "components/Layout";

function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
      resources={[{name:"dummy"}]}
      Dashboard={Layout}
    />
  );
}

export default App;
```

You should see the output below on the browser.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={openDialog} alt="refine open dialog" />
</div>

<br/>

Now if you click the `Open Dialog` you should see the form modal below.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={form} alt="refine open dialog" />
</div>

<br/>

You can use the tools like [Rollup.tsx](https://rolluptsx.org/guide/en/) to bundle the component library and share it with your friends.

## Adding Server side rendering
SSR, or server-side rendering, is the process of rendering components to HTML on the server as opposed to only on the client. A comparable strategy is static rendering, except instead of pre-rendering pages to HTML on each request but rather at build time. 

To make components using React Aria work with SSR, you will need to wrap your application in an SSRProvider. This signals to all nested React Aria hooks that they are being rendered in an SSR context. Update the `index.tsx` file with the code snippet below.

```tsx
...
import {SSRProvider} from '@react-aria/ssr';
...

...
ReactDOM.render(
  <SSRProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </SSRProvider>,
  document.getElementById("root")
);
...
```


## Conclusion
Throughout this tutorial, we’ve implemented how to create a component library in React using React Aria. We started by understanding what React Aria is and why you should consider using it for creating component libraries. Then we created some component libraries using React Aria and used it to build a signup form. You can learn more about React Aria from the official [docs](https://react-spectrum.adobe.com/react-aria/index.html).


## Build your React-based CRUD applications without constraints

Low-code React frameworks are great for gaining development speed but they often fall short of flexibility if you need extensive styling and customization for your project.

Check out [refine](https://github.com/pankod/refine), if you are interested in a headless framework you can use with any custom design or UI-Kit for 100% control over styling.

<div>
<a href="https://github.com/pankod/refine">
    <img  src="https://refine.dev/img/refine_blog_logo_1.png" alt="refine blog logo" />
</a>
</div>

<br/>

**refine** is an open source, React-based framework for building CRUD applications **without constraints.**
It can speed up your development time up to **3X** without compromising freedom on **styling**, **customization** and **project workflow.**

**refine** is headless by design and it connects **30+** backend services out-of-the-box including custom REST and GraphQL API’s.

Visit [refine GitHub repository](https://github.com/pankod/refine) for more information, demos, tutorials and example projects.