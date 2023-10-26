---
title: UI Libraries
---

refine offers seamless integration with popular UI libraries, allowing you to choose the one that suits your needs. These integrations don't constrain your application's logic. While they provide advantages, you can still create, extend, or mix components independently. refine's UI library integrations enhance the core functionality by exposing hooks and components, offering prebuilt UI elements with minimal additional, library-specific logic.

<!-- In every application, there is a need for a helping UI library. With refine, you can use any UI library you want, for some of the most popular UI libraries, refine already has integrations for you to work with ease.

refine's relation with UI libraries is not coupled with the logic of the application. This means while you'll have some advantages by using the UI integrations, you can still go on your own way and create your own components, extend the existing ones, or compose them with mixing different UI libraries.

refine's UI library integrations are built on top of the core functionalities of refine by exposing the necessary hooks and components. This means, these components composes the existing components and hooks of refine to provide a prebuilt UI elements with little to no extra logic other than the necessary -library specific- logic. -->

## Headless Architecture

refine's headless architecture offers the freedom to utilize any UI library or create custom UI integrations. It encapsulates application logic within hooks, helpers, and logical components, making them UI-agnostic and highly composable. With refine, you can seamlessly integrate with your preferred UI library without worrying about compatibility, thanks to the headless approach. Built-in support for the most popular UI libraries are made possible by composing the existing components and hooks of refine with the library components.

<!-- refine's headless architecture gives you the freedom to use any UI library or integration you want. The headless approach of refine aims to encapsulate the logic of the application into the hooks, helpers and logical components and expose them to the user in a way that they can use them with any UI library they want or create their own custom UI integrations.

While using refine, you won't have to worry about styling or using some components that is not compatible with your UI. All the hooks, components and helpers of refine are designed in a way that they are UI agnostic with firm encapsulation of the logic and composability. This is also taken advantage of in the UI integrations of refine, without having to write any additional complex logic, we've created UI components that are composed of the existing components and hooks of refine. -->

## UI Libraries

refine has out of the box support for the four libraries that are widely used in the React ecosystem. Each of these has their own composition of components and hooks that are designed to be used seamlessly with little to no effort.

-   [Ant Design with `@refinedev/antd`](ui-integrations/ant-design/introduction/index.md)
-   [Material UI with `@refinedev/mui`](ui-integrations/material-ui/introduction/index.md)
-   [Chakra UI with `@refinedev/chakra-ui`](ui-integrations/chakra-ui/introduction/index.md)
-   [Mantine with `@refinedev/mantine`](ui-integrations/mantine/introduction/index.md)

## Customization

While the exported components from the UI integrations mostly accept the props of the underlying UI components, there are some cases where you might want to customize these components to fit your needs on both logical and visual level. In these cases, you can use couple of different approaches to achieve your goal, from the most simple to the most complex, here are the options you have:

### Using the props

In many of these components, you'll be able to pass props to override or extend the existing styling and logic. While this is the most simple approach, it might not be enough for some cases. For example, if you want to change the styling of the `<EditButton>` component of a UI integration, you can easily pass props such as `prop`, `className` or any other prop that is accepted by the underlying component.

### Using the refine options

refine has the ability to change some configurations of the components and hooks globally through the `<Refine>` component. This will let the user to change the default logical and visual approaches made in the UI components. For example, if you want to change the `<Breadcrumb>` component that is used in all the basic view components, you can use the `breadcrumb` option of the `<Refine>` component to change the default component and it will change the component in all of the views.

[To learn more about the options, check out the `<Refine>` component documentation.](core/refine-component/index)

### Using the `swizzle` command

refine's CLI has this command called `swizzle` which lets you export the components of the UI integrations and use them in your application. This will let you to change the components in a granular level and use them in your application. For example, if you want to change the `<Layout>` component that is used in all the basic view components, you can use the `swizzle` command to export the `<Layout>` component and change it to your needs.

[To learn more about the `swizzle` command, check out the CLI documentation.](packages/cli/index)

## Layouts and Menus

Layouts and menus are one of the common elements of an application, this is why we're providing layout and menu components for the supported UI libraries. While these components are also a composition of the refine's core functionalities, they fit well with the design language of the UI libraries and provide a seamless integration.

These components are designed to fit the most common needs of an application with a flexibility to customize them to fit your needs. For example, a `<Sider>` component is available in all of the UI integrations which includes a navigation menu with a multi-level support, an authorization check for menu items and a logout button which leverages the `useLogout` hook of refine.

## Notifications <GuideBadge id="guides-concepts/notifications" />

One of the most important parts of an application is the notifications and the visual feedbacks. refine has this built-in notification integration that works automatically when it's needed in cases such as when a request fails or when a form is submitted.

While this integration is not coupled with the UI integrations, it will be a wise choice to use the one that is provided by the UI libraries for a consistent design language. This is why refine's UI integrations also provides a `notificationProvider` to be used with the notification integration of refine.

Using of the prebuilt notification providers are optional and can be customized, extended or even swapped with a custom implementation if needed.

## Custom Implementations

While there are integrations for the popular UI libraries, every app has its own needs and requirements. This is why refine is designed in a way that it can be used with any UI library or even without one. This is also true for the UI integrations, you can create your own custom UI integration for your needs.

If you've decided to create your own custom UI integration, the source code of the existing UI integrations will be a good starting point for you. You can check out the source code of the UI integrations from the [GitHub repository](https://github.com/refinedev/refine)
