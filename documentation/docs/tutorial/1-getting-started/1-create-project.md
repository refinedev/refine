---
id: create-project
title: 2.2. Creating your project using refine.new
tutorial:
    prev: tutorial/getting-started/index
    next: tutorial/getting-started/developing-locally
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this post, we initialize our app on **refine.new** platform and then navigate through the pages to experience the UI and functionalities implemented.

## Use refine.new to Initialize a refine App

**refine.new** is a quick way to initialize a **refine** app and deploy it instantly to the cloud. It is done from [https://refine.new](https://refine.new).

Before starting initialization, we are presented with options to choose the stacks we want to use in our app. We can choose from [Vite](https://vitejs.dev/guide/), [Next.js](https://nextjs.org) or [Remix](https://remix.run/docs/en/1.16.0/tutorials/blog) for project initialization; [**Material UI**](https://mui.com/material-ui/getting-started/overview/), [**Ant Design**](https://ant.design/components/overview) or [**Chakra UI**](https://chakra-ui.com) for the frontend; integrate with [**REST API**](https://github.com/refinedev/refine/tree/master/packages/simple-rest), [**Supabase**](https://supabase.com/docs/guides/getting-started) or [**Strapi**](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html) in the backend; and use auth providers such as Google Auth, a Custom Auth, etc.

We are using **Vite**, **Material UI**, a **Simple REST API** and **Custom refine Auth** for our app. So let's navigate to [**refine.new**](https://refine.new) and follow the steps as below:

1. Start the **refine CLI Wizard**  by clicking the `Let's Start` button. **refine.new** will present a step by step form with options to choose from:

![1-refine.new-lets-start](https://imgbox.com/Xaj65c42)

2. Choose the above options one by one, clicking `Continue` button after completing each section of the form.

![2-refine.new-choose-vite](https://imgbox.com/sGQvR7pv)

3. After completing and reviewing all steps, click the `Continue` button a final time and within a minute or so the **refine** app should be initialized, built and deployed in the cloud.

We should then be directed to the preview of an actual running instance of the app:

As we can see, the app is running smoothly on **refine.new** and we are presented with a choice to login with credentials:

![3-refine.new-google-login](https://imgbox.com/NT4LPgeG)

If we use our Google account to log in, we are able to access all parts via the **refine.new** UI interface:

![4-refine.new-app-preview](https://imgbox.com/oBF0yGk4)

Please feel free to navigate through the app and try out CRUD actions for blog and category items.

