---
title: React Aria - Improve accessibility of React components in refine apps
description: We will be looking into ways to improve the accessibility and performance of refine app.
slug: react-aria-refine
authors: ekekenta_clinton
tags: [react-aria, react, wai-aria]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---

import list from '@site/static/img/blog/2022-08-22-react-area-refine/list.png';
import modal from '@site/static/img/blog/2022-08-22-react-area-refine/modal.png';
import cli from '@site/static/img/blog/2022-08-22-react-area-refine/cli.png';



## Introduction

In this tutorial, we'll walk you through how to use React Aria to build a web application in a [refine](https://github.com/pankod/refine) application. You'll create components using React Aria and use them to build a demo application.
<!--truncate-->


Steps we'll cover includes:
- [Introduction](#introduction)
- [What is React Aria?](#what-is-react-aria)
- [What is refine?](#what-is-refine)
- [Why use React Aria?](#why-use-react-aria)
- [Bootstrapping a refine app](#bootstrapping-a-refine-app)
- [Creating React components](#creating-react-components)
- [Adding Server side rendering](#adding-server-side-rendering)
- [Conclusion](#conclusion)
- [Build your React-based CRUD applications without constraints](#build-your-react-based-crud-applications-without-constraints)



## What is React Aria?

[React Aria](https://react-spectrum.adobe.com/react-aria/index.html) is a library of React Hooks that provides accessible UI primitives for your design system. It provides accessibility and behavior for many common UI components so you can focus on your unique design and styling. It implements adaptive interactions to ensure the best experience possible for all users, including support for mouse, touch, keyboard, and screen readers.

## What is refine?

 [refine](https://github.com/pankod/refine) is a a collection of helper hooks, components and providers that helps you build React-based CRUD apps like admin panels, dashboards and internal tools.It's a headless framwork and the core is fully independent of UI. The core components and hooks can be use without any UI dependency.



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

<div class="img-container">
    <img src={cli} alt="cli log" />
</div>

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

### Adding Tailwind CSS
We will use Tailwind CSS for the UI of the example app.

We will use Tailwind for the UI of the example app. You can prefer any UI library or design system since it's not affecting the usability.

Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

```
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Add the paths to all of your template files in your `tailwind.config.js` file.

```ts title="tailwind.config.js"
module.exports = {
    //highlight-next-line
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

Add the `@tailwind` directives for each of Tailwind’s layers to your `src/index.css` file.

```css title="src/index.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add css file import to `src/App.tsx`.

```ts title="App.tsx"
...

//highlight-next-line
import 'index.css';
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
import React, { ElementType, RefObject } from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from 'react-aria';

export default function Button(props: AriaButtonProps<ElementType> | any) {
    const ref: RefObject<any> = React.useRef();
    const { buttonProps } = useButton(props, ref);

    return (
        <button
            {...buttonProps}
            ref={ref}
            className="flex items-center self-end rounded-lg bg-indigo-500 mb-5 px-5 py-2.5 mt-3 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
        >
            {props.children}
        </button>
    );
}
```

In the above code snippet, we imported the `useButton` hook and called it, passing the `props` along with a `ref` to the DOM node for this component to get the `buttonProp` property. Then we spread the props returned from the hook into the **button** element that we want to render, passing the **ref** and the style props.

Now you can import and use this component, pass in the props you want, and add styles and event listeners.




### Create Input component
Next, let's create the input component library using the [`useTextField`](https://react-spectrum.adobe.com/react-aria/useTextField.html) hooks. The `useTextField` hook offers a text field's behavior and accessibility implementation.

 Create an `Input.tsx` file in the component folder and add the code snippet below.

```tsx title="Input.tsx"
import React, { RefObject } from 'react';
import { useTextField } from '@react-aria/textfield';
import { AriaTextFieldProps } from 'react-aria';

export default function Input(props: AriaTextFieldProps) {
    const ref: RefObject<any> = React.useRef();
    const {
        inputProps: { className, ...inputProps },
    } = useTextField(props, ref);

    return (
        <div className="w-full">
            <input
                {...inputProps}
                ref={ref}
                className={`border-2 border-slate-300 hover:border-sky-200 focus:border-sky-400 active:border-sky-400 rounded-md py-1.5 px-2.5 w-full ${className}`}
            />
        </div>
    );
}
```

We called the `useTextField`, passing the props along with a `ref` to the DOM node for this component to get the `inputProps` property. Then we spread the props returned from the hook into the `input` element that we want to render, passing the ref and the style props.



### Create Header Component
To create a Header component, we'll use the [`useHover`](https://react-spectrum.adobe.com/react-aria/useHover.html) hook. This hook handles the pointer hover interactions for an element. Create a `Header.tsx` file in the **component** directory and add the code snippet below.

```tsx title="Header.tsx"
import React, { ElementType } from 'react';
import { useHover } from '@react-aria/interactions';
import { AriaButtonProps } from 'react-aria';

export default function Header(props: AriaButtonProps<ElementType> | any) {
    let { hoverProps, isHovered } = useHover({});

    return (
        <div
            {...hoverProps}
            style={{
                background: isHovered ? '#167B73' : '#2D9E96',
                color: 'white',
                padding: 4,
                cursor: 'pointer',
                display: 'block',
            }}
            tabIndex={0}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '10px',
                }}
            >
                {props.children}
            </div>
        </div>
    );
}
```

We'll use the `isHovered` props to know when the mouse or pen goes over the element, and we will change the background color of the elements in the header. Then we spread the `hoverProps` into the **div** element that we want to render, passing an initial `tabIndex` of `0`. 

### Create Modal Component
We'll take advantage of the [`useDialog`](https://react-spectrum.adobe.com/react-aria/useDialog.html), [`useOverlay`](https://react-spectrum.adobe.com/react-aria/useOverlay.html), [`usePreventScroll`](https://react-spectrum.adobe.com/react-aria/usePreventScroll.html), and [`useModal`](https://react-spectrum.adobe.com/react-aria/useModal.html).


 Create a `Modal.tsx` file in the component folder and add the code snippet below.

 ```tsx title="Modal.tsx"
import React, { ElementType, RefObject, PropsWithChildren } from 'react';
import { AriaButtonProps, OverlayProvider } from 'react-aria';
import { OverlayTriggerState } from '@react-stately/overlays';
import {
    useOverlay,
    usePreventScroll,
    useModal,
    OverlayContainer,
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';

function ModalDialog(props: AriaButtonProps<ElementType> | any) {
    const { title, children } = props;
    const ref: RefObject<any> = React.useRef();
    const { overlayProps, underlayProps } = useOverlay(props, ref);

    usePreventScroll();
    const { modalProps } = useModal();
    const { dialogProps, titleProps } = useDialog(props, ref);

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
            {...underlayProps}
        >
            <FocusScope contain restoreFocus autoFocus>
                <div
                    {...overlayProps}
                    {...dialogProps}
                    {...modalProps}
                    ref={ref}
                    className="w-full bg-white text-black p-7 max-w-xl"
                >
                    <h3
                        {...titleProps}
                        className="mt-0 pb-4 border-b border-slate-200 border-solid text-xl mb-6 font-bold"
                    >
                        {title}
                    </h3>
                    {children}
                </div>
            </FocusScope>
        </div>
    );
}

type ModalProps = {
    title: string;
    overlayState: OverlayTriggerState;
};
export default function Modal(props: PropsWithChildren<ModalProps>) {
    const {
        title,
        overlayState: { close, isOpen },
        children,
    } = props;
    return (
        <OverlayProvider>
            {isOpen && (
                <OverlayContainer>
                    <ModalDialog
                        title={title}
                        isOpen
                        onClose={close}
                        isDismissable
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            {children}
                        </div>
                    </ModalDialog>
                </OverlayContainer>
            )}
        </OverlayProvider>
    );
}
```

In the above code snippet, we imported the Aria hooks we need for this component, and we created a `ModalDialog` component to create a dialog for the modal. In the `ModalDialog`, we used the `useOverlay` hook, which returns the `overlayProps` and `underlayProps` props to handle the user interactivity outside a dialog and to close the modal.


Then we used the `useDialog` hook, which returns `dialogProps` and `titleProps` to get the props of the dialogue and its title. Also, we used the FocusScope component to specify the focus area to be controlled by the dialog.


Lastly, we used the `ModalDialog` we created to create a dialog for the modal and pass in the required props. Also, we wrapped the application in an `OverlayProvider` hook so that it can be hidden from screen readers when a modal opens. 

You can learn more about creating a modal from this [link](https://react-spectrum.adobe.com/react-aria/useDialog.html).

### Using React Aria components
Now let's use the components libraries to create a small application. To do that, we'll create a `Layout.tsx` file in the components folder and add the code snippets below.

```tsx title="components/Layout"
import { useMenu, useNavigation, LayoutProps } from '@pankod/refine-core';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { menuItems } = useMenu();
    const { push } = useNavigation();
    return (
        <div className="App">
            <div className="flex min-h-screen flex-col">
                <div className="mb-2 border-b py-2">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-2">
                            <img
                                className="w-32"
                                src="https://refine.dev/img/refine_logo.png"
                                alt="Logo"
                            />
                            <ul>
                                {menuItems.map(
                                    ({ name, label, icon, route }) => (
                                        <li key={name} className="float-left">
                                            <a
                                                className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out hover:underline"
                                                onClick={() =>
                                                    push(route || '')
                                                }
                                            >
                                                {icon}
                                                <span>{label ?? name}</span>
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-white">{children}</div>
            </div>
        </div>
    );
};
```

We'll start connecting to our API by adding a resource to our application.

### Creating a List page

Firstly, we'll create a `CategoryList` page to show data from API in a table.

Now, create a new folder named `pages/category` under `/src`. Under that folder, create a `list.tsx` file with the following code:

```tsx title="pages/category/list.tsx"
import React from 'react';
import { useTable, ColumnDef, flexRender } from '@pankod/refine-react-table';
import { CategoryCreate } from './create';

export const CategoryList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: 'id',
                header: 'ID',
                accessorKey: 'id',
                width: 50,
            },
            {
                id: 'title',
                header: 'Title',
                accessorKey: 'title',
            },
        ],
        []
    );

    const { getHeaderGroups, getRowModel } = useTable<any>({
        columns,
    });
    return (
        <div className="container mx-auto pb-4 max-w-3xl w-full">
            <CategoryCreate />

            <table className="min-w-full table-fixed divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {getRowModel().rows.map((row) => {
                        return (
                            <tr
                                key={row.id}
                                className="transition hover:bg-gray-100"
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td
                                            key={cell.id}
                                            className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
```

[Refer to offical refine documentation for details about creating a list page](https://refine.dev/docs/core/tutorial/#creating-a-list-page)


We need to import and initialize the  `CategoryList` pages to `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-react-router-v6';
import dataProvider from '@pankod/refine-simple-rest';
import { Layout } from 'components/Layout';
import 'index.css';
//highlight-next-line
import { CategoryList } from 'pages/category/list';

function App() {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
            resources={[
                {
                    name: 'categories',
                    //highlight-next-line
                    list: CategoryList,
                },
            ]}
            Layout={({ children }) => <Layout> {children}</Layout>}
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
    <img src={list} alt="refine list page" />
</div>

<br/>

### Creating a record

We'll create a new `<CategoryCreate>` page responsible for creating a single record:

Until this point, we were basically working with reading operations such as fetching and displaying data from resources. Now we are going to start creating records by using [@pankod/refine-react-hook-form](https://refine.dev/docs/packages/react-hook-form/useForm/)

```tsx title="pages/category/create"
import { Controller, useForm } from '@pankod/refine-react-hook-form';
import { HttpError } from '@pankod/refine-core';
import { useOverlayTriggerState } from '@react-stately/overlays';

import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const CategoryCreate: React.FC = () => {
    const state = useOverlayTriggerState({});

    const {
        refineCore: { onFinish },
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ title: string }, HttpError, { title: string }>({
        refineCoreProps: {
            onMutationSuccess: () => {
                state.close();
            },
        },
    });

    return (
        <div className="container">
            <div className="w-full flex justify-end">
                <Button onPress={state.open}>Create</Button>
            </div>
            <Modal overlayState={state} title="Create a category">
                <form
                    onSubmit={handleSubmit(onFinish)}
                    className="w-full flex flex-col gap-4"
                >
                    <Controller
                        control={control}
                        name="title"
                        rules={{ required: 'field is required' }}
                        render={({ field }) => (
                            <>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="Title"
                                />
                                {errors?.title && (
                                    <div className="text-red-500 text-xs mt-1 font-semibold">
                                        {errors.title.message}
                                    </div>
                                )}
                            </>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    );
};
```

Let's import  `CategoryCreate` pages in the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from '@pankod/refine-core';
import routerProvider from '@pankod/refine-react-router-v6';
import dataProvider from '@pankod/refine-simple-rest';
import { Layout } from 'components/Layout';
import 'index.css';
import { CategoryList} from 'pages/category/list';
//highlight-next-line
import { CategoryCreate} from 'pages/category/create';

function App() {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
            resources={[
                {
                    name: 'categories',
                    list: CategoryList,
                    //highlight-next-line
                    create: CategoryCreate,
                },
            ]}
            Layout={({ children }) => <Layout> {children}</Layout>}
        />
    );
}

export default App;
```


:::note
`resources` is a property of `<Refine/>` representing API Endpoints. The name property of every single resource should match one of the endpoints in your API!
:::

Now if you click the `Create`  button you should see the form modal below. 

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={modal} alt="refine list page" />
</div>

<br/>

By now, we can add a new record to the category resource.

## Adding Server side rendering
SSR, or server-side rendering, is the process of rendering components to HTML on the server as opposed to only on the client. A comparable strategy is static rendering, except instead of pre-rendering pages to HTML on each request but rather at build time. 

To make components using React Aria work with SSR, you will need to wrap your application in an SSRProvider. This signals to all nested React Aria hooks that they are being rendered in an SSR context. Update the `index.tsx` file with the code snippet below.

```tsx
import {SSRProvider} from 'react-aria';

<SSRProvider>
  <App />
</SSRProvider>
```
## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//github/pankod/refine/tree/master/examples/blog/react-aria/?embed=1&view=preview&theme=dark&preset=node"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-aria-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

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