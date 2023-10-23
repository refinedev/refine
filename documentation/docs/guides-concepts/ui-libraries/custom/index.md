---
title: Custom UI 🚧
---

introduction on how refine allows you to easily add custom UI implementations whether its css only or a full blown UI library.

this guide will include sections about how to implement a custom UI integration and what to pay attention to.

## Authorization

how refine's UI implementations comes with authorization logic (`useCan`) and prevents unauthorized access or actions.

## Authentication

how to implement a user login/logout bars or hide some logic behind authentication (`<Authenticated>`)

## Tables

how to implement tables or `useTable`. Deciding on whether to use a custom extension of core's `useTable` or using `@refinedev/react-table`'s `useTable` and what to pay attention to.

## Forms

how to implement forms or `useForm`. Deciding on whether to use a custom extension of core's `useForm` or using `@refinedev/react-hook-form`'s `useForm` and what to pay attention to.

## Menus

how refine's UI implementations implements menus using `useMenu` and tricks to make it flexible (such as nested, meta aware, etc.)

## Buttons and Fields

(apart from the buttons, i'm not sure if talking about fields is worth it, since they are not that complex and crucial to the UI implementations)

how to implement them what to consider and pay attention to.

## Basic Views

(not sure if this is worth it, since they are not that complex and crucial to the UI implementations)

how to implement basic views such as `List`, `Show`, `Edit`, `Create` and what to consider and pay attention to.

## Notifications

a brief introduction about notifications and links to the appropriate guides. We need to have this section because users might not be aware of the fact that `notificationProvider` can be a separate part of the app detached/loosely coupled from the UI implementations.

## A Custom Implementation with shadcn/ui and TailwindCSS

**ATTENTION**

I think we can move it to a separate document or have this implementation integrated in the above sections as a guide for the users.
